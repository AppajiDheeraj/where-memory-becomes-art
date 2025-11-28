import { emailLayout } from "./layout";
import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Meet.AI" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);
};

export const sendMagicLinkEmail = async ({
  to,
  magicLink,
}: {
  to: string;
  magicLink: string;
}) => {
  const html = emailLayout({
    title: "🔐 Magic Link Login",
    subtitle: "Click below to sign in securely",
    content: `
      <p>Hi there,</p>
      <p>Click the button below to log in to your Meet.AI account:</p>
      <div style="margin: 16px 0;">
        <a href="${magicLink}" style="display: inline-block; padding: 10px 18px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
          Login to Meet.AI
        </a>
      </div>
      <p>If you did not request this, please ignore this email.</p>
    `,
    timestamp: new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }),
  });

  await sendEmail({
    to,
    subject: "🔑 Your Magic Link to Meet.AI",
    html,
  });
};

export * from "./send-welcome";