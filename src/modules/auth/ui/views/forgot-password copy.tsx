"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
});

export const ForgotPasswordView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setPending(true);
    setError(null);

    const response = await authClient.signIn.magicLink({
      email: formData.email,
      callbackURL: "/meetings",
    });

    setPending(false);

    if (response.error) {
      const msg = response.error.message || "Magic link failed to send.";
      toast.error(msg);
      setError(msg);
      return;
    }

    toast.success(`Magic link sent to ${formData.email}. Check your inbox!`);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 p-6 md:p-2">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full p-8 max-w-lg">
            <Form {...form}>
              <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">

                  {/* Heading */}
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl font-bold">Login via Magic Link</h1>
                    <p className="text-muted-foreground text-sm mt-2">
                      We will send a login link to your email.
                    </p>
                  </div>

                  {/* Input */}
                  <div className="grid gap-3 px-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="h-10 rounded-xl px-6"
                              placeholder="Enter email address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end text-xs px-1">
                      <Link
                        href="/sign-in"
                        className="text-muted-foreground hover:text-primary underline underline-offset-4"
                      >
                        Remember your password?
                      </Link>
                    </div>
                  </div>

                  {/* Error */}
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon className="h-4 w-4 text-destructive" />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    disabled={pending}
                    className="h-12 rounded-full mx-2"
                    type="submit"
                  >
                    {pending ? (
                      <div className="flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      "Send Magic Link"
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      or
                    </span>
                  </div>

                  {/* Bottom link */}
                  <div className="text-center text-sm text-muted-foreground">
                    Want to sign in another way?{" "}
                    <Link href="/sign-in" className="underline underline-offset-4">
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
