"use client";

import React from "react";
import { ArrowLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] w-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#8b5cf6]/30 relative">
      <div className="flex-1 w-full h-full relative overflow-x-hidden">
        <div className="flex-1 flex flex-col h-full w-full max-w-2xl mx-auto">
          <header className="flex items-center gap-4 p-6 pb-4">
            <button onClick={() => router.push('/dashboard')} className="p-2 -ml-2 text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold flex-1 text-center pr-8">Profile</h1>
          </header>
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] mb-6">
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Profile</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Profile settings and information will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
