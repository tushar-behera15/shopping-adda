import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createUser } from "@/lib/create-user";
export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();
        const hashedPassword= await bcrypt.hash(password,10);
        const result = await query(
            "INSERT INTO users(name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
            [name, email, hashedPassword, role]
        );
        return NextResponse.json({ users: result.rows[0] }, { status: 201 });
    }
    catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await createUser();
        const result = await query(
            "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
        )

        return NextResponse.json(result.rows);
    }
    catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}