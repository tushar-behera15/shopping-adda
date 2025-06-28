import { query } from "./db";

export async function CreateCategory(){
    const sql=`
    CREATE TABLE IF NOT EXISTS category(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
    )`

    await query(sql);
}