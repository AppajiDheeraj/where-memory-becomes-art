"use client";

import NumberFlow from "@number-flow/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const plans = [
  {
    id: "beta",
    name: "Beta Access",
    price: {
      monthly: "Free for first 100 users",
      yearly: "Free for first 100 users",
    },
    description:
      "Experience the world’s first AI Biographer — completely free during the beta.",
    features: [
      "Lifetime free access (first 100 users)",
      "Early access to AI story engine",
      "Manga story episodes",
      "Character creation",
      "Emotional insights",
    ],
    cta: "Join Waitlist",
    popular: true,
  },
  {
    id: "creator",
    name: "Creator",
    price: {
      monthly: 299,
      yearly: 249,
    },
    description:
      "Perfect for Gen Z, creators, and students who want beautiful story chapters weekly.",
    features: [
      "Unlimited story generations",
      "Personalized LifeGraph insights",
      "High-quality manga chapters",
      "Reels & highlight generation",
      "Priority early features",
    ],
    cta: "Coming Soon",
  },
  {
    id: "film",
    name: "Film Add-on",
    price: {
      monthly: "Coming Soon",
      yearly: "Coming Soon",
    },
    description:
      "Turn your memories into cinematic AI short films. (Releasing after beta)",
    features: [
      "AI short film generation",
      "Consistent character LoRA",
      "Scene-by-scene film builder",
      "Voice + emotion synthesis",
      "Export in HD",
    ],
    cta: "Coming Soon",
  },
];

const Example = () => {
  const [frequency, setFrequency] = useState<string>("monthly");

  return (
    <div className="not-prose @container flex flex-col gap-16 px-8 py-24 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="mb-0 text-balance font-medium text-5xl tracking-tighter!">
          LifeBuddy AI Pricing
        </h1>
        <p className="mx-auto mt-0 mb-0 max-w-2xl text-balance text-lg text-muted-foreground">
          LifeBuddy AI is coming soon. Be among the first 100 to receive lifetime
          free access and help shape the world’s first AI Biographer.
        </p>

        <Tabs defaultValue={frequency} onValueChange={setFrequency}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly
              <Badge variant="secondary">Save 20%</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-8 grid w-full max-w-4xl @2xl:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card
              className={cn(
                "relative w-full text-left",
                plan.popular && "ring-2 ring-primary"
              )}
              key={plan.id}
            >
              {plan.popular && (
                <Badge className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full">
                  Popular
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="font-medium text-xl">
                  {plan.name}
                </CardTitle>
                <CardDescription>
                  <p>{plan.description}</p>

                  {typeof plan.price[frequency as keyof typeof plan.price] ===
                  "number" ? (
                    <NumberFlow
                      className="font-medium text-foreground mt-2"
                      format={{
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }}
                      suffix={`/month`}
                      value={
                        plan.price[
                          frequency as keyof typeof plan.price
                        ] as number
                      }
                    />
                  ) : (
                    <span className="font-medium text-foreground mt-2">
                      {plan.price[frequency as keyof typeof plan.price]}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-2">
                {plan.features.map((feature, index) => (
                  <div
                    className="flex gap-2 text-muted-foreground text-sm"
                    key={index}
                  >
                    <BadgeCheck className="h-[1lh] w-4 flex-none" />
                    {feature}
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "secondary"}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Example;
