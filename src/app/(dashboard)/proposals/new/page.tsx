"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, ArrowLeft, Save } from "lucide-react";

const mockClients = [
  { id: "client-1", name: "Acme Corp" },
  { id: "client-2", name: "TechStart Inc" },
  { id: "client-3", name: "GreenLeaf Studios" },
  { id: "client-4", name: "Nexus Solutions" },
];

const aiGeneratedContent = {
  title: "Full-Stack Web Application Development",
  description:
    "We propose to design, develop, and deploy a modern full-stack web application tailored to your business requirements. The solution will leverage cutting-edge technologies to ensure scalability, performance, and maintainability.",
  services:
    "- UI/UX Design & Prototyping\n- Frontend Development (React/Next.js)\n- Backend API Development (Node.js/Express)\n- Database Design & Implementation (PostgreSQL)\n- Authentication & Authorization\n- Third-party API Integrations\n- Cloud Deployment & DevOps (AWS)\n- QA Testing & Quality Assurance\n- Post-launch Support (3 months)",
  price: 35000,
  timeline: "12 weeks",
  requirements:
    "Client to provide access to existing systems, brand guidelines, and a dedicated point of contact. Weekly sync meetings required. Milestone-based approvals at weeks 4, 8, and 11.",
};

export default function NewProposalPage() {
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [timeline, setTimeline] = useState("");
  const [requirements, setRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setTitle(aiGeneratedContent.title);
    setDescription(aiGeneratedContent.description);
    setServices(aiGeneratedContent.services);
    setPrice(aiGeneratedContent.price);
    setTimeline(aiGeneratedContent.timeline);
    setRequirements(aiGeneratedContent.requirements);
    setIsGenerating(false);
    setShowPreview(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Create New Proposal" description="Draft a new proposal for your client">
        <Link href="/proposals">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Proposal Details</CardTitle>
                <Button
                  variant="outline"
                  onClick={handleGenerateWithAI}
                  disabled={isGenerating}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate with AI"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Website Redesign Project"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project goals and objectives..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">Services Included</Label>
                <Textarea
                  id="services"
                  placeholder="List the services you will provide..."
                  rows={6}
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value ? Number(e.target.value) : "")
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    placeholder="e.g. 8 weeks"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Additional Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Any special requirements or notes..."
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-end gap-3">
                <Link href="/proposals">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Proposal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className={showPreview ? "" : "opacity-50"}>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {!showPreview && !title ? (
                <p className="text-muted-foreground text-center py-8">
                  Fill in the form or use &quot;Generate with AI&quot; to preview
                  your proposal.
                </p>
              ) : (
                <>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Client
                    </p>
                    <p className="font-medium">
                      {mockClients.find((c) => c.id === clientId)?.name ||
                        "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Project
                    </p>
                    <p className="font-semibold text-base">{title || "—"}</p>
                  </div>

                  {description && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Description
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  )}

                  {services && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Services
                      </p>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {services}
                      </p>
                    </div>
                  )}

                  {(price || timeline) && (
                    <div className="grid grid-cols-2 gap-3">
                      {price && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                            Investment
                          </p>
                          <p className="font-semibold text-primary">
                            ${Number(price).toLocaleString()}
                          </p>
                        </div>
                      )}
                      {timeline && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                            Timeline
                          </p>
                          <p className="font-medium">{timeline}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {requirements && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Requirements
                      </p>
                      <p className="text-muted-foreground">{requirements}</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
