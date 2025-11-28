import { ForgotPasswordView } from "@/modules/auth/ui/views/forgot-password copy";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("Forget Password");

const Page = async () => {
  return (
    <ForgotPasswordView />
  );
}

export default Page;  