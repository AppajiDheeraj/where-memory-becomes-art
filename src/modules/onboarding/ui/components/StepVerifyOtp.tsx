import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

interface StepVerifyOtpProps {
    onNext?: () => void;
}

export function StepVerifyOtp({ onNext }: StepVerifyOtpProps) {
    const [value, setValue] = useState("");

    return (
        <div className="space-y-8 text-center flex flex-col items-center">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Verify Account</h1>
                <p className="text-muted-foreground text-sm">
                    Enter the 6 digit OTP sent to your mobile number +91 xxxxxxxx19
                </p>
            </div>

            <div className="flex justify-center">
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-12 h-12 text-xl" />
                        <InputOTPSlot index={1} className="w-12 h-12 text-xl" />
                        <InputOTPSlot index={2} className="w-12 h-12 text-xl" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} className="w-12 h-12 text-xl" />
                        <InputOTPSlot index={4} className="w-12 h-12 text-xl" />
                        <InputOTPSlot index={5} className="w-12 h-12 text-xl" />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <div className="text-sm text-muted-foreground">
                Did not receive OTP?{" "}
                <button className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                    Resend
                </button>
            </div>
        </div>
    );
}
