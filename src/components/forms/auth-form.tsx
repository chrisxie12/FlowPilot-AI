"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSuccessMessage(null);

    const supabase = createClient();
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setServerError("Supabase environment variables are not set.");
      return;
    }

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp(values);
      if (error) {
        setServerError(error.message);
        return;
      }
      setSuccessMessage("Account created. Check your email for verification, then sign in.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      setServerError(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-xs text-red-600">Password must be at least 8 characters.</p>}
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}
      {successMessage && <p className="text-sm text-emerald-700">{successMessage}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
      </Button>
    </form>
  );
}
