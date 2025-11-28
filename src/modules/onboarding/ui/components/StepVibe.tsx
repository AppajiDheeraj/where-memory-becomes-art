import { useState } from "react";
import { cn } from "@/lib/utils";

const vibes = [
  "Highly Energetic & playful",
  "Action Shonen",
  "Romantic",
  "Calm and Clear",
  "Sketch",
  "Moody & Atmospheric",
  "Cyberpunk / Sci-Fi",
  "Vintage / Retro",
  "Dreamy & Surreal",
  "Minimalist",
  "Dark Fantasy",
  "Watercolor",
];

export function StepVibe({ value, setValue }: { value: string; setValue: (v: string) => void }) {
  return (
    <div className="space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Choose Your Vibe</h1>
        <p className="text-muted-foreground text-sm">
          From calm to playful — choose what represents you
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
        {vibes.map((v) => (
          <button
            key={v}
            onClick={() => setValue(v)}
            className={cn(
              "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
              value === v
                ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                : "bg-card text-card-foreground border-border hover:border-primary/50 hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
