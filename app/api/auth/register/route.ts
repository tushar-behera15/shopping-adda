import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        // 1. Validate input
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // 2. Check if user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Insert new user
        const result = await query(
            `INSERT INTO users (name, email, password, role) 
             VALUES ($1, $2, $3, $4) 
             RETURNING name, email, password, role`,
            [name, email, hashedPassword, 'user']
        );
        const newUser = result.rows[0];

        // 5. Create JWT token (auto login after register)
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        // 6. Set cookie with token
        const response = NextResponse.json({ message: 'User registered successfully', user: newUser });
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
