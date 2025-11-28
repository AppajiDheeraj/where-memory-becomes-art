import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { user as userTable, session, account, verification } from "@/db/schema";
import { magicLink } from "better-auth/plugins";
import { eq, type InferSelectModel } from "drizzle-orm";

type User = InferSelectModel<typeof userTable>;

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  // =====================================================
  // SOCIAL PROVIDERS
  // =====================================================
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbacks: {
        async onSignIn({ user: u, req }: { user: User; req: Request }) {
          const existing = await db.query.user.findFirst({
            where: eq(userTable.email, u.email),
          });

          if (!existing) {
            // SEND WELCOME EMAIL via your existing API route
            await fetch(new URL("/api/email/welcome", req.url), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: u.email!,
                name: u.name ?? "there",
              }),
            });
          }

          return true;
        },

        async redirect({ user }: { user: User }) {
          // NEW USER → ONBOARDING
          if (!user.onboardingCompleted) return "/onboarding";
          return "/home";
        },
      },
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbacks: {
        async onSignIn({ user: u, req }: { user: User; req: Request }) {
          const existing = await db.query.user.findFirst({
            where: eq(userTable.email, u.email),
          });

          if (!existing) {
            await fetch(new URL("/api/email/welcome", req.url), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: u.email!,
                name: u.name ?? "there",
              }),
            });
          }

          return true;
        },

        async redirect({ user }: { user: User }) {
          if (!user.onboardingCompleted) return "/onboarding";
          return "/home";
        },
      },
    },
  },

  // =====================================================
  // DATABASE
  // =====================================================
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userTable,
      session,
      account,
      verification,
    },
  }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://fun-cattle-normally.ngrok-free.app",
  ],

  appName: "Money Matters",

  // =====================================================
  // MAGIC LINK PLUGIN
  // =====================================================
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log("📩 Magic Link:", url);

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email/magic-link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: email, magicLink: url }),
        });
      },
    }),
  ],

  // =====================================================
  // EMAIL + PASSWORD SIGNUP
  // =====================================================
  callbacks: {
    async onUserCreate({ user: u, req }: { user: User; req: Request }) {
      // Only email/password users reach here
      await fetch(new URL("/api/email/welcome", req.url), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: u.email!,
          name: u.name ?? "there",
        }),
      });

      return true;
    },

    async redirect({ user }: { user: User }) {
      if (!user.onboardingCompleted) return "/onboarding";
      return "/home";
    },
  },
});
