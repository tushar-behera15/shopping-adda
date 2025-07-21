import { CreateCategory } from "@/lib/create-category";
import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(req: NextRequest) {
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

export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {

        const result=await query(
            "DELETE FROM category WHERE id = $1",
            [id]
        );
        return NextResponse.json(result);
    }
    catch(err){
        console.error(err);
        return NextResponse.json("Error to delete the category");
    }
}