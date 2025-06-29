import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE=async(req:Request,{params}:{params:Promise<{id:string}>})=>{
    const {id}=await params;
    try{
        const result=await query(
            "DELETE FROM product WHERE id = $1",
            [id]
        );
        return NextResponse.json(result);
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json("Problem in delete api");
    }
}