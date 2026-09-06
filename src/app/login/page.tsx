import Link from "next/link";
import { AuthForm } from "@/components/forms/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your FlowPilot workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" />
          <p className="mt-4 text-sm text-slate-500">
            Don&apos;t have an account? <Link className="underline" href="/signup">Create one</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
