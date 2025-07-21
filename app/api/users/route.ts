import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
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

export async function PUT(req: NextRequest) {
    try {
        const { name, email, role, id } = await req.json();
        const result = await query(
            "UPDATE users SET name = $1 , email = $2, role = $3 WHERE id = $4 RETURNING *",
            [name, email, role, id]
        );
        return NextResponse.json({ result: result.rows[0] });
    }
    catch (err) {
        console.error("Error updating user:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export const DELETE = async (req: Request, { params }:{params:Promise<{id:string}>}) => {
    const { id } = await params;
    try {
        const result=await query(
            `DELETE FROM users WHERE id = $1`,
            [id]
        )
        return NextResponse.json(result);
    }
    catch (err: any) {
        console.error(err);
        return NextResponse.json('Error to delete user');
    }
}

