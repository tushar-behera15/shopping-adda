import { query } from "./db";

export async function createProducts() {
    // 1. Create table
    await query(`
        CREATE TABLE IF NOT EXISTS product(
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            stock INTEGER NOT NULL,
            image TEXT,
            rating REAL DEFAULT 0,
            threshold INTEGER DEFAULT 5,
            category_id INTEGER REFERENCES category(id) ON DELETE SET NULL,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
    `);

    // 2. Create or replace trigger function
    await query(`
        CREATE OR REPLACE FUNCTION update_product_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    // 3. Drop existing trigger
    await query(`DROP TRIGGER IF EXISTS set_product_updated_at ON product;`);

    // 4. Create new trigger
    await query(`
        CREATE TRIGGER set_product_updated_at
        BEFORE UPDATE ON product
        FOR EACH ROW
        EXECUTE FUNCTION update_product_updated_at();
    `);
}
