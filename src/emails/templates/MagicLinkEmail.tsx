import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
  Heading,
} from "@react-email/components";
import tailwindConfig from "../email-tailwind.config";

export interface MagicLinkEmailProps {
  name?: string;
  magicLink: string;
  expiresIn?: string;
  logoUrl?: string;
}

const DEFAULT_LOGO = process.env.EMAIL_LOGO_URL ?? "/mnt/data/LifeBuddy-AI.pdf";

export default function MagicLinkEmail({
  name ,
  magicLink,
  expiresIn = "15 minutes",
  logoUrl = DEFAULT_LOGO,
}: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-gray-50 font-sans text-slate-900">
          <Preview>Your secure sign-in link</Preview>
          <Container className="mx-auto my-6 p-6 bg-white rounded-lg shadow-sm">
            <Section className="flex justify-center py-4">
              <Img src={logoUrl} alt="Logo" width="120" height="40" />
            </Section>

            <Section className="px-4">
              <Heading className="text-lg font-semibold mb-2">
                Sign in to your account
              </Heading>

              <Text className="text-sm text-slate-700 mb-4">
                Hello {name}, click the button below to sign in. This link
                expires in {expiresIn}.
              </Text>

              <Section className="text-center my-4">
                <Button
                  className="bg-slate-900 text-white rounded-md py-3 px-5"
                  href={magicLink}
                >
                  Sign in to LifeBuddy
                </Button>
              </Section>

              <Text className="text-xs text-slate-500 mt-4">
                If the button doesn't work, copy and paste this link into your
                browser:
              </Text>
              <Text className="text-xs text-slate-500 break-words">
                <a href={magicLink}>{magicLink}</a>
              </Text>

              <Text className="text-sm text-slate-600 mt-4">
                If you didn't request this sign-in link, you can safely ignore
                this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

MagicLinkEmail.PreviewProps = {
  name: "Dheeraj",
  magicLink: "https://yourapp.com/magic?token=abc123",
  expiresIn: "15 minutes",
  logoUrl: DEFAULT_LOGO,
} satisfies MagicLinkEmailProps;
