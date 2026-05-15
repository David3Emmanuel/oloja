"use client";

import React from "react";
import { JobDetailsScreen } from "@/components/dashboard/JobDetailsScreen";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

export default function OpportunitiesPage() {
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] w-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#8b5cf6]/30 relative">
      <ThemeToggle />
      <div className="flex-1 w-full h-full relative overflow-x-hidden">
        <div className="flex-1 flex flex-col h-full w-full max-w-3xl mx-auto">
          <JobDetailsScreen onBack={() => router.push('/dashboard')} />
        </div>
      </div>
    </div>
  );
}
