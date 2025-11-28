import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
  Row,
  Column,
  Hr,
} from "@react-email/components";
import tailwindConfig from "../email-tailwind.config";

export interface VerificationEmailProps {
  code?: string;
  name?: string;
  supportEmail?: string;
  logoUrl?: string;
}

const DEFAULT_LOGO = process.env.EMAIL_LOGO_URL ?? "/mnt/data/LifeBuddy-AI.pdf";

export default function VerificationEmail({
  code = "596853",
  name = "Friend",
  supportEmail = "support@lifebuddy.ai",
  logoUrl = DEFAULT_LOGO,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-gray-50 font-sans text-slate-900">
          <Preview>Your verification code</Preview>
          <Container className="mx-auto my-6 p-6 bg-white rounded-lg shadow-sm">
            <Section className="flex justify-center py-4">
              <Img src={logoUrl} alt="Logo" width="120" height="40" />
            </Section>

            <Section className="px-4">
              <Heading className="text-lg font-semibold mb-2">
                Verify your email address
              </Heading>

              <Text className="text-sm text-slate-700 mb-4">
                Hi {name}, please use the code below to confirm your email.
                This code will expire in 10 minutes.
              </Text>

              <Section className="flex items-center justify-center my-4">
                <Text className="text-3xl font-bold tracking-widest py-3 px-6 bg-slate-100 rounded">
                  {code}
                </Text>
              </Section>

              <Text className="text-sm text-slate-600 mt-4">
                If you didn't request this, you can ignore this email or contact{" "}
                <strong>{supportEmail}</strong>.
              </Text>
            </Section>

            <Hr className="my-4" />

            <Row>
              <Column>
                <Text className="text-xs text-slate-500">
                  © {new Date().getFullYear()} LifeBuddy AI — All rights reserved.
                </Text>
              </Column>
              <Column>
                <Text className="text-xs text-right text-slate-500">
                  Privacy · Terms
                </Text>
              </Column>
            </Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

VerificationEmail.PreviewProps = {
  code: "596853",
  name: "Dheeraj",
  supportEmail: "help@lifebuddy.ai",
  logoUrl: DEFAULT_LOGO,
} satisfies VerificationEmailProps;
