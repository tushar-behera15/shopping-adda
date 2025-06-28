import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
