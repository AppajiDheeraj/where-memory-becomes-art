import { SignUpView } from "@/modules/auth/ui/views/sign-up-view copy";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("Sign Up");

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!!session) {
        redirect('/');
    }
    return <SignUpView />
}

export default Page;