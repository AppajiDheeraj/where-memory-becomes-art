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
    Row,
    Column,
} from "@react-email/components";
import tailwindConfig from "../email-tailwind.config";

export interface WelcomeEmailProps {
    name?: string;
    ctaUrl?: string;
    logoUrl?: string;
}

const DEFAULT_LOGO = process.env.EMAIL_LOGO_URL ?? "/mnt/data/LifeBuddy-AI.pdf";

export default function WelcomeEmail({
    name = "Friend",
    ctaUrl = "https://yourapp.com/home",
    logoUrl = DEFAULT_LOGO,
}: WelcomeEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind config={tailwindConfig}>
                <Body className="bg-gray-50 font-sans text-slate-900">
                    <Preview>Welcome to LifeBuddy AI</Preview>
                    <Container className="mx-auto my-6 p-6 bg-white rounded-lg shadow-sm">
                        <Section className="flex justify-center py-4">
                            <Img src={logoUrl} alt="Logo" width="130" height="42" />
                        </Section>

                        <Section className="px-4">
                            <Heading className="text-lg font-semibold mb-2">
                                Welcome aboard, {name}!
                            </Heading>

                            <Text className="text-sm text-slate-700 mb-4">
                                Thanks for joining LifeBuddy. We're excited to start turning your
                                moments into stories. Here are a few quick ways to get started.
                            </Text>

                            <Section className="grid grid-cols-1 gap-3">
                                <Text className="text-sm font-semibold">1. Connect a source</Text>
                                <Text className="text-xs text-slate-600 mb-2">
                                    Link Gmail, WhatsApp, or upload photos to begin building your
                                    LifeGraph.
                                </Text>

                                <Text className="text-sm font-semibold">2. Customize your avatar</Text>
                                <Text className="text-xs text-slate-600 mb-2">
                                    Upload a profile photo and choose an art style for consistent
                                    character creation.
                                </Text>
                            </Section>

                            <Section className="text-center my-4">
                                <Button
                                    className="bg-slate-900 text-white rounded-md py-3 px-5"
                                    href={ctaUrl}
                                >
                                    Go to your dashboard
                                </Button>
                            </Section>

                            <Row className="mt-4">
                                <Column>
                                    <Text className="text-xs text-slate-500">Need help?</Text>
                                </Column>
                                <Column>
                                    <Text className="text-xs text-right text-slate-500">
                                        support@lifebuddy.ai
                                    </Text>
                                </Column>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

WelcomeEmail.PreviewProps = {
    name: "Dheeraj",
    ctaUrl: "https://yourapp.com/dashboard",
    logoUrl: DEFAULT_LOGO,
} satisfies WelcomeEmailProps;
