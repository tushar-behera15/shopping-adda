import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, id } = await req.json();
        const result = await query(
            "UPDATE category SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );
        return NextResponse.json(result.rows[0]);
    }
    catch(err)
    {
        console.error("Error updating user:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}