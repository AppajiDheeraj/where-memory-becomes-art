"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { OctagonAlertIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { StatefulButton, ButtonStatus } from "@/components/ui/stateful-button";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data => data.password === data.confirmPassword), {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const sendWelcomeEmail = async (email: string, name: string) => {
    try {
        await fetch("/api/email/welcome", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: email, name }),
        });
    } catch (err) {
        console.error("Failed to send welcome email:", err);
    }
};

const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
];

export const SignUpView = () => {
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<ButtonStatus>("idle");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);
        setSubmitStatus("loading");
        authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/home"
        },
            {
                onSuccess: async () => {
                    setSubmitStatus("success");
                    setPending(false);

                    // send welcome email
                    await sendWelcomeEmail(data.email, data.name);

                    setTimeout(() => {
                        // redirect to onboarding
                        router.push("/onboarding");
                    }, 1000);
                },

                onError: ({ error }) => {
                    setSubmitStatus("error");
                    setPending(false);
                    setError(error.message);
                    setTimeout(() => setSubmitStatus("idle"), 3000);
                }
            });
    }

    const onSocial = (provider: "github" | "google") => {
        setError(null);
        setPending(true);
        authClient.signIn.social({
            provider: provider,
            callbackURL: "/home"
        },
            {
                onSuccess: () => {
                    setPending(false);
                },

                onError: ({ error }) => {
                    setPending(false);
                    setError(error.message);
                }
            });
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-2">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full p-8 max-w-lg">
                        <Form {...form}>
                            <form className="md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-3xl font-bold">
                                            Create your free account
                                        </h1>
                                        <p className="text-muted-foreground text-balance text-sm mt-2">
                                            Create your free account to create beautiful memories of your life. No credit card required.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2 px-2">
                                        <Button
                                            variant="outline"
                                            type="button"
                                            disabled={pending}
                                            onClick={() => onSocial("google")}
                                            className="
                                                w-full h-10 rounded-full
                                                flex items-center justify-center gap-3
                                                border border-border
                                                bg-background
                                                hover:bg-accent
                                                transition
                                            "
                                        >
                                            <img
                                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                                alt="Google"
                                                className="w-5 h-5"
                                            />
                                            <span className="font-medium">Continue with Google</span>
                                        </Button>

                                        <Button
                                            variant="outline"
                                            type="button"
                                            disabled={pending}
                                            onClick={() => { onSocial("github") }}
                                            className="
                                                w-full h-10 rounded-full
                                                flex items-center justify-center gap-3
                                                border border-border
                                                bg-background
                                                hover:bg-accent
                                                transition
                                            "
                                        >
                                            <FaGithub className="size-5" />
                                            <span className="font-medium">Continue with Github</span>
                                        </Button>
                                    </div>
                                    {!!error && (
                                        <Alert className="bg-destructive/10 border-none ">
                                            <OctagonAlertIcon className="h-4 w-4 !text-destructive " />
                                            <AlertTitle>{error}</AlertTitle>
                                        </Alert>
                                    )}

                                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ">
                                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                                            or
                                        </span>
                                    </div>
                                    <div className="grid gap-3 px-2">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input className="h-10 rounded-xl px-6" type="text" placeholder="Enter your name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input className="h-10 rounded-xl px-6" placeholder="Enter email address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                className="h-10 rounded-xl px-6"
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Password"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOffIcon className="w-4 h-4" />
                                                                ) : (
                                                                    <EyeIcon className="w-4 h-4" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                className="h-10 rounded-xl px-6"
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Confirm Password"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOffIcon className="w-4 h-4" />
                                                                ) : (
                                                                    <EyeIcon className="w-4 h-4" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-3 px-2 w-full">
                                        <StatefulButton
                                            status={submitStatus}
                                            disabled={pending}
                                            type="submit"
                                            className="w-full h-12 rounded-full font-medium transition"
                                            loadingText="Creating account..."
                                            successText="Account created"
                                            errorText="Failed to create account"
                                        >
                                            Continue
                                        </StatefulButton>

                                        <p className="text-xs text-muted-foreground text-center">
                                            By continuing, you agree to Lifebuddy's{" "}
                                            <a href="/terms" className="underline">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="/privacy" className="underline">
                                                Privacy Policy
                                            </a>.
                                        </p>
                                    </div>

                                    <div className="text-center text-sm">
                                        Already have an account?{" "} <Link href={"/sign-in"} className="underline underline-offset-4">
                                            Sign in
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <ThreeDMarquee className="absolute inset-0 h-full w-full" images={images} />
            </div>
        </div>
    )
}
