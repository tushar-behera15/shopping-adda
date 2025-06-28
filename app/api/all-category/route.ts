import { CreateCategory } from "@/lib/create-category";
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await CreateCategory();
        const result = await query(
            "SELECT id,name,created_at FROM category ORDER BY created_at DESC"
        )
        return NextResponse.json(result.rows);
    }
    catch (err: any) {
        console.error("Error in route", err);
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { name } = body;
        const result = await query(
            "INSERT INTO category(name) VALUES ($1) RETURNING *",
            [name]
        )
        return NextResponse.json(result.rows[0]);
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}