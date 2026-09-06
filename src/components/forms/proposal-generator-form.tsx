"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateProposal } from "@/lib/ai";
import { demoClients } from "@/lib/data";

const schema = z.object({
  clientId: z.string().min(1),
  projectTitle: z.string().min(3),
  projectDescription: z.string().min(10),
  services: z.string().min(3),
  priceUsd: z.coerce.number().positive(),
  timeline: z.string().min(2),
  additionalRequirements: z.string().optional(),
});

type ProposalForm = z.infer<typeof schema>;

export function ProposalGeneratorForm() {
  const [generated, setGenerated] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProposalForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: ProposalForm) => {
    const client = demoClients.find((c) => c.id === values.clientId);
    if (!client) {
      return;
    }

    const proposal = await generateProposal({
      clientName: client.name,
      projectTitle: values.projectTitle,
      projectDescription: values.projectDescription,
      services: values.services.split(",").map((service) => service.trim()),
      priceUsd: values.priceUsd,
      timeline: values.timeline,
      additionalRequirements: values.additionalRequirements,
    });

    setGenerated(proposal);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <form className="space-y-3 rounded-xl border bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-semibold">Proposal Input</h2>
        <div>
          <label className="mb-1 block text-sm">Client</label>
          <Select {...register("clientId")}>
            <option value="">Select client</option>
            {demoClients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </Select>
          {errors.clientId && <p className="text-xs text-red-600">Select a client.</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm">Project title</label>
          <Input {...register("projectTitle")} />
        </div>
        <div>
          <label className="mb-1 block text-sm">Project description</label>
          <Textarea {...register("projectDescription")} />
        </div>
        <div>
          <label className="mb-1 block text-sm">Services (comma-separated)</label>
          <Input {...register("services")} />
        </div>
        <div>
          <label className="mb-1 block text-sm">Price (USD)</label>
          <Input type="number" {...register("priceUsd")} />
        </div>
        <div>
          <label className="mb-1 block text-sm">Timeline</label>
          <Input {...register("timeline")} />
        </div>
        <div>
          <label className="mb-1 block text-sm">Additional requirements</label>
          <Textarea {...register("additionalRequirements")} />
        </div>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Generating..." : "Generate Proposal"}</Button>
      </form>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold">Generated Proposal</h2>
        {generated ? <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{generated}</pre> : <p className="mt-3 text-sm text-slate-500">Generate to preview executive summary, scope, timeline, investment, terms, and next steps.</p>}
      </div>
    </div>
  );
}
