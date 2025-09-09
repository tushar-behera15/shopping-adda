import { query } from "./db";

export async function createUser() {
    await query(`
    DO $$
    BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'user');
    END IF;
    END$$;
`);

    const sql = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role user_role NOT NULL DEFAULT 'user',
        otp TEXT DEFAULT NULL,
        otp_expires_at TIMESTAMPTZ,
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT now()
)`
    await query(sql);
}