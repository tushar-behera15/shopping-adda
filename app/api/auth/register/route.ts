import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        const htmlTemplate = ({ otp, name }: { otp: string; name: string }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OTP Verification</title>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f4f7;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 30px auto;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    padding: 30px;
    text-align: center;
  }
  h1 {
    color: #333333;
    font-size: 24px;
  }
  p {
    color: #555555;
    font-size: 16px;
    line-height: 1.5;
  }
  .otp {
    display: inline-block;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    background-color: #0070f3;
    padding: 15px 25px;
    border-radius: 8px;
    letter-spacing: 4px;
    margin: 20px 0;
  }
  .footer {
    font-size: 12px;
    color: #999999;
    margin-top: 30px;
  }
  a.button {
    display: inline-block;
    background-color: #0070f3;
    color: #ffffff;
    text-decoration: none;
    padding: 12px 25px;
    border-radius: 5px;
    margin-top: 20px;
    font-weight: bold;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Hello ${name || 'User'},</h1>
    <p>We received a request to verify your email address. Use the following OTP to complete your registration. This OTP is valid for 5 minutes.</p>
    <div class="otp">${otp}</div>
    <p>If you did not request this, please ignore this email.</p>
    <a class="button" href="#">Go to Website</a>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Shopping Adda. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);
        console.log(expiry);
        // 1. Validate input
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // 2. Check if user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            const user = existingUser.rows[0];

            if (user.is_verified) {
                return NextResponse.json({ error: 'User already exists and is verified' }, { status: 400 });
            } else {
                const hashedotp = await bcrypt.hash(otp, 10);

                await query(
                    `UPDATE users SET otp = $1, otp_expires_at= $2, name = $3, password = $4 WHERE email = $5`,
                    [hashedotp, expiry, name, await bcrypt.hash(password, 10), email]
                );

                const emailResponse = await fetch("https://email-service-j8ns.onrender.com/api/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            "subject": "Shopping Adda | Verification Code",
                            "to": email,
                            "text": otp,
                            "html": htmlTemplate({ name, otp })
                        }
                    ),
                })
                if (!emailResponse.ok) {
                    return NextResponse.json({ error: 'Error in sending email for verification' }, { status: 500 });
                }

                return NextResponse.json({ message: 'Verification email resent. Please verify your account.' });
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const hashedotp = await bcrypt.hash(otp, 10);

            const result = await query(
                `INSERT INTO users (name, email, password, role, otp, is_verified, otp_expires_at) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 RETURNING id, name, email, role`,
                [name, email, hashedPassword, 'user', hashedotp, false, expiry]
            );

            const newUser = result.rows[0];

            const emailResponse = await fetch("https://email-service-j8ns.onrender.com/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "subject": "Shopping Adda | Verification Code",
                        "to": email,
                        "text": otp,
                        "html": htmlTemplate({ name, otp })
                    }
                ),
            })
            if (!emailResponse.ok) {
                return NextResponse.json({ error: 'Error in sending email for verification' }, { status: 500 });
            }

            // Create JWT token
            const token = jwt.sign(
                { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
                process.env.JWT_SECRET!,
                { expiresIn: '7d' }
            );

            const response = NextResponse.json({ message: 'User registered successfully. Please verify email.', user: newUser });
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return response;
        }

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
