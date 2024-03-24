import { env } from "@/env";
import nodemailer from "nodemailer";

// Create a transporter with your email service provider's details
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL,
    pass: env.PASSWORD,
  },
});

// Define the email content and send it
export function sendOtpMail({ email, otp }: { email: string; otp: string }) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    transporter.sendMail({
      from: '"Bhanu Kushwah" <sunnykb65@gmail.com>',
      to: email,
      subject: "Your email otp to Login",
      html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Email OTP to Login</title>
  </head>
  <body style="font-family: Arial, sans-serif;">

    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <h1 style="margin: 0;">Your OTP</h1>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <p style="margin: 0;">Here is your OTP:</p>
          <h2 style="margin: 10px 0; font-size: 28px;">${otp}</h2>
          <p style="margin: 0;">Please use this OTP to verify your identity.</p>
        </td>
      </tr>
    </table>

  </body>
  </html>
  `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
