import { query } from "./db";

export async function createOrder() {
    await query(`
        CREATE TABLE IF NOT EXISTS "orders" (
            id SERIAL PRIMARY KEY,
            totalAmount NUMERIC(10, 2) NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            status TEXT DEFAULT 'pending',
            order_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
    `);
        console.log("Executing SQL:", query);
    // 2. Create or replace function for updating `updated_at`
    await query(`
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    // 3. Drop existing trigger on orders table
    await query(`
        DROP TRIGGER IF EXISTS update_order_updated_at ON "orders";
    `);

    // 4. Create the trigger on orders table
    await query(`
        CREATE TRIGGER update_order_updated_at
        BEFORE UPDATE ON "orders"
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
}
