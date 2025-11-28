import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { HomeView } from "@/modules/home/ui/views/home-view"
import { redirect } from "next/navigation";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not signed in → sign in
  if (!session) {
    redirect("/sign-in");
  }

  const { user: authUser } = session;

  // Fetch DB user to inspect onboarding flag
  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, authUser.id),
  });

  if (!currentUser) {
    redirect("/sign-in");
  }

  // If onboarding not completed → onboarding
  if (!currentUser.onboardingCompleted) {
    redirect("/onboarding");
  }

  return <HomeView />;
};

export default Page;