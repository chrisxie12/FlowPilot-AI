import { ProfileForm } from "@/components/forms/profile-form";
import { SignOutButton } from "@/components/forms/signout-button";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage account details and workspace preferences." />
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader><CardTitle>Account</CardTitle></CardHeader>
        <CardContent>
          <SignOutButton />
        </CardContent>
      </Card>
    </div>
  );
}
