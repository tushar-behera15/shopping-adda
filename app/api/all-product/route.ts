import { createProducts } from "@/lib/create-product";
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await createProducts();
        const result = await query(
            `
            SELECT 
                p.id,
                p.title,
                p.description,
                p.price,
                p.stock,
                p.image,
                p.rating,
                p.threshold,
                p.category_id,
                c.name AS category_name,
                p.created_at,
                p.updated_at
            FROM product p
            LEFT JOIN category c ON p.category_id = c.id
            ORDER BY p.created_at DESC
            `
        );
        return NextResponse.json(result.rows);
    }
    catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title, description, price, stock, image, rating, threshold, category_id } = await req.json();

        const result = await query(
            `
            INSERT INTO product (
                title,
                description,
                price,
                stock,
                image,
                rating,
                threshold,
                category_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
            `,
            [
                title,
                description,
                price,
                stock,
                image,
                rating || 0,
                threshold || 5,
                category_id
            ]
        );
        return NextResponse.json(result.rows[0]);
    }
    catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}