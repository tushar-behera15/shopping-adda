import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request)
{
    const {title, description, price, stock, image, threshold,id}=await req.json();
    try{
        const result=await query(
            'UPDATE product SET title = $1, description = $2, price = $3, stock = $4, image = $5, threshold = $6 WHERE id = $7 RETURNING *',
            [title, description, price, stock, image, threshold,id]
        );
        return NextResponse.json(result.rows[0]);
    } 
    catch(err)
    {
        console.error(err);
        return NextResponse.json("Something wrong in update in database");
    }  
}