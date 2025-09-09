import nodemailer from "nodemailer";
import { Resend } from "resend";

const emailProvider = process.env.EMAIL_PROVIDER || "resend";

// ✅ Configure Nodemailer for SMTP
export const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ Configure Resend
export const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Helper function to decide provider
export function getProvider() {
  return emailProvider.toLowerCase();
}