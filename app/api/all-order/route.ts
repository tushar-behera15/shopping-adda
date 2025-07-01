import { createOrder } from "@/lib/create-order";
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await createOrder();
        const result = await query(
            `
            SELECT 
                o.id,
                o.totalAmount,
                o.user_id,
                u.name AS user_name,
                o.status,
                o.order_at,
                o.updated_at
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            ORDER BY o.order_at DESC
            `
        );

        return NextResponse.json(result.rows)

    }catch(err:any)
    {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}