import { EmailTemplates } from "@/emails"
import { render } from "@react-email/render";
import { transporter } from "@/server/mail/transporter";

export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
    
  const html = await render(EmailTemplates.WelcomeEmail({ name }));

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Welcome to Money Matters 🎉",
    html,
  });
}
