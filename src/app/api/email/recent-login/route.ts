import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { EmailTemplates } from "@/emails";
import { transporter } from "@/server/mail/transporter";

export async function POST(req: Request) {
  try {
    const { to, location } = await req.json();

    if (!to || !location) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const html = await render(EmailTemplates.LoginAlertEmail({ location }));

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "New Login Detected",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
