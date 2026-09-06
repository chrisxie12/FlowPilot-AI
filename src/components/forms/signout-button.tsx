"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          await createClient().auth.signOut();
        }
        window.location.href = "/login";
      }}
    >
      Sign out
    </Button>
  );
}
