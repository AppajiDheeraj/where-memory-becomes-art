// modules/onboarding/ui/OnboardingClient.tsx
"use client";

import { useState } from "react";
import { OnboardingLayout } from "@/modules/onboarding/ui/components/OnboardingLayout";
import { StepWelcome } from "@/modules/onboarding/ui/components/StepWelcome";
import { StepUserDetails } from "@/modules/onboarding/ui/components/StepUserDetails";
import { StepAvatar } from "@/modules/onboarding/ui/components/StepAvatar";
import { StepVibe } from "@/modules/onboarding/ui/components/StepVibe";
import { StepFinal } from "@/modules/onboarding/ui/components/StepFinal";
import { StepVerifyOtp } from "@/modules/onboarding/ui/components/StepVerifyOtp";

type OnboardingForm = {
  fullName: string;
  countryCode: string;
  phone: string;
  dob: Date | null;
  age: number | null;
  city: string;
  gender: "Male" | "Female" | "Prefer not to say" | "";
};

export function OnboardingClient() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<OnboardingForm>({
    fullName: "",
    countryCode: "+91",
    phone: "",
    dob: null,
    age: null,
    city: "",
    gender: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [vibe, setVibe] = useState("");

  const steps = [
    <StepWelcome key="welcome" />,
    <StepVerifyOtp key="verify-otp" />,
    <StepUserDetails key="user-details" form={form} setForm={setForm} />,
    <StepAvatar key="avatar" files={files} setFiles={setFiles} />,
    <StepVibe key="vibe" value={vibe} setValue={setVibe} />,
    <StepFinal key="final" />,
  ];

  const isLastStep = step === steps.length - 1;

  const next = () => {
    if (!isLastStep) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const finish = async () => {
    await fetch("/api/onboarding/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    window.location.href = "/home";
  };

  return (
    <OnboardingLayout
      currentStep={step}
      totalSteps={steps.length}
      onNext={next}
      onBack={back}
      isLastStep={isLastStep}
    >
      {steps[step]}
    </OnboardingLayout>
  );
}
