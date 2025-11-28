"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { runConfetti } from "@/lib/runConfetti";

const STEPS = [
  { id: 1, label: "Welcome" },
  { id: 2, label: "Discovery" },
  { id: 3, label: "Personal details" },
  { id: 4, label: "Usage" },
];

export default function OnboardingClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    source: "",
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    usage: "",
  });

  const currentStep = step;
  const isLast = currentStep === STEPS.length - 1;

  const handleNext = async () => {
    if (isLast) {
      // call API + confetti + redirect
      runConfetti();
      await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setTimeout(() => router.push("/home"), 800);
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setStep((s) => s - 1);
  };

  // ---- STEP CONTENTS ----

  const Step1 = (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Welcome to Money Matters 👋
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
        This is a short onboarding to make your experience personalized. Answer a few
        quick questions so we can tailor insights, dashboards, and suggestions just for you.
      </p>
      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleNext}>
          Start
        </Button>
      </div>
    </div>
  );

  const sources = [
    "Twitter (X)",
    "Google search",
    "Friend / colleague",
    "LinkedIn",
    "College",
    "Other",
  ];

  const Step2 = (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Where did you find us?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          This helps us understand which channels actually work and improve the product.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, source: s }))}
            className={[
              "flex flex-col items-start justify-center rounded-xl border px-4 py-3 text-left text-sm sm:text-base transition",
              form.source === s
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/70 hover:bg-muted",
            ].join(" ")}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!form.source}>
          Continue
        </Button>
      </div>
    </div>
  );

  const Step3 = (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Who exactly are you?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Just a few details to keep things personalised and secure.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="e.g. John Smith"
            value={form.fullName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />
        </div>

        <div className="space-y-1.5">
          <Label>Gender</Label>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Male", "Female", "Prefer not to say"].map((g) => (
              <Button
                key={g}
                type="button"
                size="sm"
                variant={form.gender === g ? "default" : "outline"}
                onClick={() => setForm((prev) => ({ ...prev, gender: g }))}
              >
                {g}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="dob">Date of birth</Label>
          <Input
            id="dob"
            type="date"
            value={form.dob}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleBack}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!form.fullName || !form.gender}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const usages = [
    {
      label: "Budgeting",
      desc: "Track income vs expenses and stay on top of monthly budgets.",
    },
    {
      label: "Investment tracking",
      desc: "Monitor stocks, mutual funds, and long-term positions.",
    },
    {
      label: "Bills & expenses",
      desc: "Never miss a bill; keep recurring payments organised.",
    },
    {
      label: "Financial planning",
      desc: "Plan goals like emergency funds, travel, or education.",
    },
    {
      label: "Learning & insights",
      desc: "Understand patterns in your spending and behaviour.",
    },
    {
      label: "Just exploring",
      desc: "I’m playing around and seeing what’s possible.",
    },
  ];

  const Step4 = (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">
          What will you use Money Matters for?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          This helps us prioritise the right features and defaults for you.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {usages.map((u) => (
          <button
            key={u.label}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, usage: u.label }))}
            className={[
              "flex flex-col items-start rounded-xl border px-4 py-3 text-left text-sm transition",
              form.usage === u.label
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/70 hover:bg-muted",
            ].join(" ")}
          >
            <span className="font-medium">{u.label}</span>
            <span className="text-xs text-muted-foreground mt-1">
              {u.desc}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!form.usage}>
          Finish
        </Button>
      </div>
    </div>
  );

  const stepContent = [Step1, Step2, Step3, Step4][currentStep];

  return (
    <div className="w-full min-h-svh bg-[#f5f5f7] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* TOP STEPPER */}
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          {STEPS.map((s, idx) => {
            const completed = idx < currentStep;
            const active = idx === currentStep;

            return (
              <div key={s.id} className="flex-1 flex items-center gap-2">
                <div
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                    completed
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : active
                      ? "bg-primary text-white border-primary"
                      : "bg-muted text-muted-foreground border-transparent",
                  ].join(" ")}
                >
                  {completed ? "✓" : s.id}
                </div>
                <span
                  className={[
                    "text-xs sm:text-sm font-medium",
                    active
                      ? "text-foreground"
                      : completed
                      ? "text-muted-foreground"
                      : "text-muted-foreground/70",
                  ].join(" ")}
                >
                  {s.label}
                </span>
                {idx < STEPS.length - 1 && (
                  <div className="hidden sm:block flex-1 h-px bg-muted ml-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl border shadow-sm px-6 py-6 sm:px-10 sm:py-8">
          {stepContent}
        </div>
      </div>
    </div>
  );
}
