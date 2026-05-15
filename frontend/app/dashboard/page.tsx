"use client";

import React, { useState } from "react";
import { DashboardScreen } from "@/components/dashboard/DashboardScreen";
import { MenuDrawer } from "@/components/dashboard/MenuDrawer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] w-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#8b5cf6]/30 relative">
      <ThemeToggle />
      <div className="flex-1 w-full h-full relative overflow-x-hidden">
        <div className="flex-1 flex flex-col h-full">
          <DashboardScreen
            onOpenMenu={() => setIsMenuOpen(true)}
            onViewWallet={() => router.push("/wallet")}
            onViewJob={(id) => router.push("/opportunities")}
          />
        </div>
        <MenuDrawer 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
      </div>
    </div>
  );
}
