import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="rounded-xl border border-dashed bg-white p-10 text-center">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <Button href={actionHref} className="mt-4">
        {actionLabel}
      </Button>
    </div>
  );
}
