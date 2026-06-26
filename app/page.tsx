"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ProfileSidebar } from "@/components/layout/profile-sidebar";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { ClaimReductionSection } from "@/components/dashboard/claim-reduction-section";
import { PolicySnapshot } from "@/components/dashboard/policy-snapshot";
import { PolicyHealthScore } from "@/components/dashboard/policy-health-score";
import { AnalyticsSection } from "@/components/dashboard/analytics-section";
import { AIChat } from "@/components/chat/ai-chat";
import { UploadModal } from "@/components/upload/upload-modal";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col">
      <Header
        onAvatarClick={() => setSidebarOpen(true)}
        onChatOpen={() => setChatOpen(true)}
      />

      <main
        className="flex-1 px-4 pb-32 pt-4 w-full"
        style={{ paddingBottom: chatOpen ? "420px" : "100px" }}
      >
        {/* Overview Cards */}
        <section className="mb-5">
          <OverviewCards />
        </section>

        {/* CLAIM REDUCTION RISKS — Most important, largest section */}
        <section className="mb-5">
          <ClaimReductionSection />
        </section>

        {/* Policy Snapshot */}
        <section className="mb-5">
          <PolicySnapshot />
        </section>

        {/* Policy Health Score */}
        <section className="mb-5">
          <PolicyHealthScore />
        </section>

        {/* Analytics */}
        <section className="mb-5">
          <AnalyticsSection />
        </section>
      </main>

      {/* Sticky AI Chat */}
      <AIChat isOpen={chatOpen} onToggle={() => setChatOpen((v) => !v)} />

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onUploadClick={() => {
          setSidebarOpen(false);
          setUploadOpen(true);
        }}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </div>
  );
}
