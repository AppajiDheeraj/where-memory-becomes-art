import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import MagicLinkEmail from "@/emails/templates/MagicLinkEmail";
import { transporter } from "@/server/mail/transporter";
import React from "react";
import EmailTemplates from "@/emails";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("MAGIC LINK BODY RECEIVED:", body);

    const { to, name, magicLink } = body;

    if (!to || !magicLink) {
      return NextResponse.json(
        { error: "Missing fields", received: body },
        { status: 400 }
      );
    }

      const html = await render(EmailTemplates.MagicLinkEmail({ name, magicLink }));

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Your Magic Login Link",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("MagicLinkEmail error:", e);
    return NextResponse.json({ error: "Email failed", details: e.message }, { status: 500 });
  }
}
