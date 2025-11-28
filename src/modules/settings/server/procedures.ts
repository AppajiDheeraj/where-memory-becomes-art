import { protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { account, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter } from "@/trpc/init";
import { settingsUpdateSchema } from "../schema";

export const settingsRouter = createTRPCRouter({
  updateSettings: protectedProcedure
    .input(settingsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { fullName, phone, location } = input;

      const [updated] = await db
        .update(user)
        .set({
          name: fullName,
          phone,
          location,
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.auth.user.id))
        .returning();

      return updated;
    }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const [u] = await db
      .select()
      .from(user)
      .where(eq(user.id, ctx.auth.user.id));

    const [a] = await db
      .select({ password: account.password })
      .from(account)
      .where(eq(account.userId, ctx.auth.user.id));

    return {
      ...u,
      hasPassword: !!a?.password,
    };
  }),
});
