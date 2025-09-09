import { smtpTransporter, resend, getProvider } from "@/lib/mail";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "@/emails/VerificationEmail";
import { render } from "@react-email/render";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifycode: string
): Promise<ApiResponse> {
  try {
    const html = await render(VerificationEmail({ username, otp: verifycode }));

    if (getProvider() === "smtp") {
      // ✅ Send via SMTP
      smtpTransporter.sendMail({
            from: `"Shopping Adda" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Shopping Adda | Verification Code",
            html,
        });
    } else {
      // ✅ Send via Resend
      await resend.emails.send({
        from: "Shopping Adda <onboarding@resend.dev>", // replace with custom domain in production
        to: email,
        subject: "Shopping Adda | Verification Code",
        react: VerificationEmail({ username, otp: verifycode }),
      });
    }

    return { success: true, message: "Verification sent successfully" };
  } catch (err) {
    console.error("Error sending email", err);
    return { success: false, message: "Failed to send email" };
  }
}
