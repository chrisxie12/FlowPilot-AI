import { PageHeader } from "@/components/layout/page-header";
import { ProposalGeneratorForm } from "@/components/forms/proposal-generator-form";

export default function ProposalNewPage() {
  return (
    <div>
      <PageHeader title="New Proposal" description="Use AI to generate a professional proposal, then edit and share." />
      <ProposalGeneratorForm />
    </div>
  );
}
