"use client";

import { useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Mars, Venus, User, MapPin } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type OnboardingForm = {
  fullName: string;
  countryCode: string;
  phone: string;
  dob: Date | null;
  age: number | null;
  city: string;
  gender: "Male" | "Female" | "Prefer not to say" | "";
};

interface StepUserDetailsProps {
  form: OnboardingForm;
  setForm: React.Dispatch<React.SetStateAction<OnboardingForm>>;
}

const GENDERS = ["Male", "Female", "Prefer not to say"] as const;

const userDetailsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  countryCode: z.string(),
  phone: z.string().min(1, "Phone number is required"),
  dob: z.date().nullable(),
  age: z.number().nullable(),
  city: z.string().min(1, "City is required"),
  gender: z.enum(["Male", "Female", "Prefer not to say", ""]),
});

type UserDetailsValues = z.infer<typeof userDetailsSchema>;

interface PhoneInputData {
  name: string;
  dialCode: string;
  countryCode: string;
  format: string;
  priority: number;
}

export function StepUserDetails({ form: parentForm, setForm }: StepUserDetailsProps) {
  const form = useForm<UserDetailsValues>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: parentForm,
    mode: "onChange",
  });

  // Sync changes to parent state
  useEffect(() => {
    const subscription = form.watch((value) => {
      setForm((prev) => ({
        ...prev,
        ...value,
      } as OnboardingForm));
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setForm]);

  // Auto-calculate age
  useEffect(() => {
    const dob = form.getValues("dob");
    if (!dob) return;

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age !== form.getValues("age")) {
      form.setValue("age", age);
    }
  }, [form.watch("dob")]);

  return (
    <div className="mx-auto max-w-md space-y-6 sm:max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* STEP LABEL + TITLE */}
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Tell us about you
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto sm:mx-0">
          This helps LifeBuddy understand your story better.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          {/* Full name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="John Doe"
                      className="h-10 rounded-lg pl-9 bg-background border-input hover:border-primary/50 transition-colors"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="phone-input-container">
                    <PhoneInput
                      country={"in"}
                      value={form.getValues("countryCode") + field.value}
                      onChange={(phone, data: PhoneInputData) => {
                        form.setValue("countryCode", `+${data.dialCode}`);
                        field.onChange(phone.slice(data.dialCode.length));
                      }}
                      inputClass="!w-full !h-10 !text-sm !rounded-lg !border-input !bg-background hover:!border-primary/50 !transition-colors !pl-[48px]"
                      buttonClass="!rounded-l-lg !border-input !bg-muted/50 hover:!bg-muted"
                      dropdownClass="!rounded-lg !shadow-lg !border-border"
                      searchClass="!p-2"
                      enableSearch
                      disableSearchIcon
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DOB + Age */}
          <div className="grid grid-cols-[1fr_80px] gap-3">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                    Date of Birth
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left h-10 rounded-lg px-3 border-input hover:border-primary/50 hover:bg-background transition-all text-sm",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                          {field.value ? (
                            <span className="text-foreground font-medium">
                              {format(field.value, "PPP")}
                            </span>
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 rounded-xl shadow-xl border-border"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        defaultMonth={
                          field.value ||
                          new Date(new Date().getFullYear() - 20, 0, 1)
                        }
                        classNames={{
                          day_hidden: "invisible",
                          dropdown:
                            "px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                          caption_dropdowns: "flex gap-3",
                          vhidden: "hidden",
                          caption_label: "hidden",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                    Age
                  </FormLabel>
                  <div className="h-10 rounded-lg px-3 bg-muted/50 border border-input flex items-center justify-center font-semibold text-foreground/80 text-sm">
                    {field.value ?? "-"}
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                  City
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="New York, USA"
                      className="h-10 rounded-lg pl-9 bg-background border-input hover:border-primary/50 transition-colors"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                  Gender
                </FormLabel>
                <div className="grid grid-cols-3 gap-2">
                  {GENDERS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => field.onChange(g)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-lg border h-16 gap-1.5 transition-all duration-200 relative overflow-hidden",
                        field.value === g
                          ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                          : "border-input bg-background hover:bg-muted/50 hover:border-primary/50 text-muted-foreground"
                      )}
                    >
                      {g === "Male" && <Mars className="h-4 w-4" />}
                      {g === "Female" && <Venus className="h-4 w-4" />}
                      {g === "Prefer not to say" && <User className="h-4 w-4" />}
                      <span className="text-[10px] sm:text-xs font-medium text-center leading-tight px-1">
                        {g}
                      </span>
                    </button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
