import { createOrderitem } from "@/lib/create-orderItems";
import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await createOrderitem();
        const { id } = await params;
        const result = await query(
            `
            SELECT 
                oi.id,
                oi.order_id,
                oi.product_id,
                oi.quantity,
                oi.price,
                p.title AS product_name,
                p.image,
                p.category_id,
                p.description,
                c.name AS category_name,
                u.name AS user_name,
                u.email AS user_email
            FROM order_items oi
            LEFT JOIN orders o ON oi.order_id = o.id
            LEFT JOIN product p ON oi.product_id = p.id
            LEFT JOIN users u ON o.user_id = u.id
            LEFT JOIN category c ON p.category_id = c.id
            WHERE oi.order_id = $1
            `,
            [id]
        );

        return NextResponse.json(result.rows)

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

