import { query } from "@/lib/db";
import { NextResponse } from "next/server";

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