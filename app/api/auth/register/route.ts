import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);
        console.log(expiry);
        // 1. Validate input
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // 2. Check if user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            const user = existingUser.rows[0];

            if (user.is_verified) {
                return NextResponse.json({ error: 'User already exists and is verified' }, { status: 400 });
            } else {
                const hashedotp = await bcrypt.hash(otp, 10);

                await query(
                    `UPDATE users SET otp = $1, otp_expires_at= $2, name = $3, password = $4 WHERE email = $5`,
                    [hashedotp,expiry, name, await bcrypt.hash(password, 10),email]
                );

                const emailResponse = await sendVerificationEmail(email, name, otp);
                if (!emailResponse.success) {
                    return NextResponse.json({ error: 'Error in sending email for verification' }, { status: 500 });
                }

                return NextResponse.json({ message: 'Verification email resent. Please verify your account.' });
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const hashedotp = await bcrypt.hash(otp, 10);

            const result = await query(
                `INSERT INTO users (name, email, password, role, otp, is_verified, otp_expires_at) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 RETURNING id, name, email, role`,
                [name, email, hashedPassword, 'user', hashedotp, false, expiry]
            );

            const newUser = result.rows[0];

            const emailResponse = await sendVerificationEmail(email, name, otp);
            if (!emailResponse.success) {
                return NextResponse.json({ error: 'Error in sending email for verification' }, { status: 500 });
            }

            // Create JWT token
            const token = jwt.sign(
                { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
                process.env.JWT_SECRET!,
                { expiresIn: '7d' }
            );

            const response = NextResponse.json({ message: 'User registered successfully. Please verify email.', user: newUser });
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return response;
        }

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
