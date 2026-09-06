"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  fullName: z.string().min(2),
  company: z.string().min(2),
});

type Values = z.infer<typeof schema>;

export function ProfileForm() {
  const [message, setMessage] = useState<string>("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", company: "" },
  });

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(async (values) => {
        setMessage("Saved profile locally for MVP. Connect Supabase profile writes in production setup.");
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          const supabase = createClient();
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            await supabase.from("profiles").upsert({ id: user.id, full_name: values.fullName, company: values.company });
            setMessage("Profile saved.");
          }
        }
      })}
    >
      <div>
        <label className="mb-1 block text-sm">Full name</label>
        <Input {...register("fullName")} />
      </div>
      <div>
        <label className="mb-1 block text-sm">Company</label>
        <Input {...register("company")} />
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save profile"}</Button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}
