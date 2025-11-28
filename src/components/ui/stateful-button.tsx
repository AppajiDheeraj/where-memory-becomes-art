"use client";

import * as React from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type ButtonStatus = "idle" | "loading" | "success" | "error";

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

interface StatefulButtonProps extends ButtonProps {
    status: ButtonStatus;
    loadingText?: string;
    successText?: string;
    errorText?: string;
    idleText?: string;
}

export const StatefulButton = React.forwardRef<HTMLButtonElement, StatefulButtonProps>(
    (
        {
            children,
            status,
            loadingText = "Loading...",
            successText = "Success",
            errorText = "Error",
            idleText,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <Button
                ref={ref}
                disabled={status === "loading" || disabled}
                className={cn(
                    "transition-all duration-300",
                    status === "success" &&
                    "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 hover:border-emerald-700",
                    status === "error" &&
                    "bg-rose-600 hover:bg-rose-700 text-white border-rose-600 hover:border-rose-700",
                    className
                )}
                {...props}
            >
                {status === "loading" && (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {loadingText}
                    </>
                )}
                {status === "success" && (
                    <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        {successText}
                    </>
                )}
                {status === "error" && (
                    <>
                        <XCircle className="mr-2 h-4 w-4" />
                        {errorText}
                    </>
                )}
                {status === "idle" && (idleText || children)}
            </Button>
        );
    }
);

StatefulButton.displayName = "StatefulButton";
