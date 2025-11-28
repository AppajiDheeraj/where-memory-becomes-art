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
  Button,
  Row,
  Column,
} from "@react-email/components";
import tailwindConfig from "../email-tailwind.config";

export interface LoginAlertEmailProps {
  ip?: string;
  location?: string;
  device?: string;
  time?: string;
  logoUrl?: string;
}

const DEFAULT_LOGO = process.env.EMAIL_LOGO_URL ?? "/mnt/data/LifeBuddy-AI.pdf";

export default function LoginAlertEmail({
  ip = "0.0.0.0",
  location = "Unknown",
  device = "Unknown",
  time = new Date().toUTCString(),
  logoUrl = DEFAULT_LOGO,
}: LoginAlertEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-gray-50 font-sans text-slate-900">
          <Preview>New sign-in detected</Preview>
          <Container className="mx-auto my-6 p-6 bg-white rounded-lg shadow-sm">
            <Section className="flex justify-center py-4">
              <Img src={logoUrl} alt="Logo" width="120" height="40" />
            </Section>

            <Section className="px-4">
              <Heading className="text-lg font-semibold mb-2">
                New sign-in to your account
              </Heading>

              <Text className="text-sm text-slate-700 mb-3">
                We detected a sign-in to your account. If this was you, no action
                is needed. If not, please secure your account immediately.
              </Text>

              <Section className="mb-3">
                <Text className="text-sm">
                  <strong>Time:</strong> {time}
                </Text>
                <Text className="text-sm">
                  <strong>Location:</strong> {location}
                </Text>
                <Text className="text-sm">
                  <strong>Device:</strong> {device}
                </Text>
                <Text className="text-sm">
                  <strong>IP:</strong> {ip}
                </Text>
              </Section>

              <Section className="text-center mt-4">
                <Button
                  className="bg-slate-900 text-white rounded-md py-3 px-5"
                  href="https://yourapp.com/security"
                >
                  Secure your account
                </Button>
              </Section>
            </Section>

            <Row className="mt-4">
              <Column>
                <Text className="text-xs text-slate-500">
                  If you don't recognize this activity, change your password and
                  enable 2FA.
                </Text>
              </Column>
              <Column>
                <Text className="text-xs text-right text-slate-500">
                  support@lifebuddy.ai
                </Text>
              </Column>
            </Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

LoginAlertEmail.PreviewProps = {
  ip: "103.22.211.16",
  location: "Bengaluru, India",
  device: "Chrome on Windows",
  time: new Date().toUTCString(),
  logoUrl: "/mnt/data/LifeBuddy-AI.pdf",
} satisfies LoginAlertEmailProps;
