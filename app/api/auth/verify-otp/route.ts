import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { otp } = await req.json();

    if (!otp) {
      return NextResponse.json({ error: "OTP is required" }, { status: 400 });
    }

    const result = await query("SELECT * FROM users WHERE otp IS NOT NULL");

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "No pending OTP verification found" }, { status: 404 });
    }

    const user = result.rows[0];

    if (!user.otp_expires_at || new Date(user.otp_expires_at).getTime() < Date.now()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // ✅ Check OTP
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // ✅ Mark as verified
    await query(
      "UPDATE users SET is_verified = true, otp = NULL, otp_expires_at = NULL WHERE id = $1",
      [user.id]
    );

    return NextResponse.json({ message: "User verified successfully!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
