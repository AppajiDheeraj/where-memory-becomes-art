// app/onboarding/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { OnboardingClient } from "@/modules/onboarding/ui/views/OnboardingClient";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("Onboarding");

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { user: authUser } = session;

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, authUser.id),
  });

  if (!currentUser) redirect("/sign-in");

  if (currentUser.onboardingCompleted) {
    redirect("/home");
  }

  // you can pass some initial props if needed later
  return <OnboardingClient />;
}
