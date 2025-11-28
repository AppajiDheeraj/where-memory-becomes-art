import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.update(user)
        .set({ onboardingCompleted: true })
        .where(eq(user.id, session.user.id));

    // NextResponse.redirect requires an absolute URL when used in this context.
    // Use the incoming request URL as the base to build an absolute URL.
    return NextResponse.redirect(new URL("/home", request.url));
}
