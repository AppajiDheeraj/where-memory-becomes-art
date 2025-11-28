"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  showContinue?: boolean;
  showBack?: boolean;
  nextLabel?: string;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isLastStep,
  showContinue = true,
  showBack = true,
  nextLabel = "Continue",
}: OnboardingLayoutProps) {
  return (
    <div className="w-full h-svh lg:grid lg:grid-cols-2 overflow-hidden">
      {/* Left Panel (Desktop Only) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-zinc-900 text-white relative overflow-hidden h-full">
        {/* Background Pattern/Gradient */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black" />

        {/* Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              LB
            </div>
            LifeBuddy AI
          </div>
        </div>


        {/* Footer */}
        <div className="relative z-10 text-sm text-zinc-500">
          <blockquote className="
      text-lg
      text-italic 
      font-normal 
      leading-relaxed 
      text-white/70
      mb-2
    ">
            Your life is a story waiting to be told.
            Let’s capture your memories and turn them into something timeless.
          </blockquote>
          © 2025 LifeBuddy AI. All rights reserved.
        </div>
      </div>

      {/* Right Panel (Content) */}
      <div className="flex flex-col bg-background text-foreground px-6 py-6 lg:px-12 lg:justify-center relative h-full overflow-y-auto">

        {/* Mobile Header (Logo) - Optional if you want it */}
        <div className="lg:hidden mb-6 shrink-0">
          <div className="flex items-center gap-2 font-bold">
            LB LifeBuddy
          </div>
        </div>

        <div className="w-full max-w-md mx-auto flex flex-col h-full lg:h-auto min-h-[500px] justify-between lg:justify-center gap-6">

          {/* Progress Header */}
          <div className="space-y-2 shrink-0">
            <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Animated step container */}
          <div className="flex-1 flex items-center justify-center w-full py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 shrink-0">
            {showBack && currentStep > 0 ? (
              <Button
                variant="outline"
                onClick={onBack}
                className="text-muted-foreground hover:text-foreground"
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {showContinue && (
              <Button
                onClick={onNext}
                className="rounded-full px-8 font-semibold min-w-[120px]"
              >
                {isLastStep ? "Finish" : nextLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}