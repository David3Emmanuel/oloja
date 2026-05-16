"use client";

import React, { useState } from "react";
import { ArrowLeft, MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MessagesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  return (
    <div className="min-h-[100dvh] w-full bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-[#8b5cf6]/30 relative pb-10">
      <div className="flex-1 w-full h-full relative overflow-x-hidden">
        <div className="flex-1 flex flex-col h-full w-full max-w-2xl mx-auto">
          {/* Header */}
          <header className="flex items-center gap-4 p-6 pb-4">
            <button onClick={() => router.push('/dashboard')} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold flex-1 text-center pr-8">Messages</h1>
          </header>

          {/* Filters & Actions */}
          <div className="flex items-center justify-between px-6 mb-8 border-b border-zinc-800/50 pb-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === "all" 
                    ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" 
                    : "bg-zinc-800/50 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter("unread")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === "unread" 
                    ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" 
                    : "bg-zinc-800/50 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Unread
              </button>
            </div>
            <button className="text-emerald-500 text-sm font-medium hover:text-emerald-400 transition-colors">
              Mark all as read
            </button>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center -mt-20">
            <div className="mb-6">
              <MessageSquareText className="w-32 h-32 text-[#8b5cf6]" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold mb-3 tracking-tight">No Messages at<br/>this time.</h2>
            <p className="text-zinc-500 text-base max-w-[280px]">
              Clients who discover your profile<br/>can message you here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}