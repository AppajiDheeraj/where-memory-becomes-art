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

  if (!session) {
    redirect("/sign-in");
  }

  const { user: authUser } = session;

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, authUser.id),
  });

  if (!currentUser) {
    redirect("/sign-in");
  }

  if (!currentUser.onboardingCompleted) {
    redirect("/onboarding");
  }

  return <HomeView />;
};

export default Page;