import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { PaginationDots } from "./PaginationDots";
import { TopProgressBar } from "./TopProgressBar";
import { ExperienceLevel } from "./types";

interface ExperienceStepProps {
  experience: ExperienceLevel;
  setExperience: (exp: ExperienceLevel) => void;
  onComplete: () => void;
}

export function ExperienceStep({ experience, setExperience, onComplete }: ExperienceStepProps) {
  return (
    <div className="flex-1 flex flex-col px-6 py-12">
      <div className="mb-6">
        <TopProgressBar step={3} />
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Your experience level</h1>
        <p className="text-zinc-500 dark:text-zinc-400">This helps us match you with suitable jobs</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 no-scrollbar space-y-4 pb-4">
        <button
          onClick={() => setExperience("beginner")}
          className={`w-full text-left p-5 rounded-2xl border transition-all ${
            experience === "beginner"
              ? "bg-zinc-50 dark:bg-[#18181b] border-[#8b5cf6]"
              : "bg-zinc-50 dark:bg-[#18181b] border-transparent hover:border-zinc-700"
          }`}
        >
          <h3 className="text-lg font-semibold mb-1">Beginner</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Just starting out or learning</p>
        </button>

        <button
          onClick={() => setExperience("intermediate")}
          className={`w-full text-left p-5 rounded-2xl border transition-all ${
            experience === "intermediate"
              ? "bg-zinc-50 dark:bg-[#18181b] border-[#8b5cf6]"
              : "bg-zinc-50 dark:bg-[#18181b] border-transparent hover:border-zinc-700"
          }`}
        >
          <h3 className="text-lg font-semibold mb-1">Intermediate</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">1-3 years of experience</p>
        </button>

        <button
          onClick={() => setExperience("expert")}
          className={`w-full text-left p-5 rounded-2xl border transition-all ${
            experience === "expert"
              ? "bg-zinc-50 dark:bg-[#18181b] border-[#8b5cf6]"
              : "bg-zinc-50 dark:bg-[#18181b] border-transparent hover:border-zinc-700"
          }`}
        >
          <h3 className="text-lg font-semibold mb-1">Expert</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">3+ years of professional experience</p>
        </button>

        <div className="mt-6 bg-zinc-50 dark:bg-[#13101c] border border-[#8b5cf6]/20 p-6 rounded-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8b5cf6]/10 to-transparent pointer-events-none" />
          <div className="w-12 h-12 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-xl flex items-center justify-center mx-auto mb-4 relative z-10">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h3 className="text-lg font-semibold mb-3 relative z-10">AI-Powered Matching</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed relative z-10 px-2">
            Our AI will analyze your skills and experience to match you with the best job opportunities near you. You&apos;ll get personalized recommendations that fit your profile.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 bg-white dark:bg-[#09090b] relative z-10">
        <button
          onClick={onComplete}
          disabled={!experience}
          className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
            experience
              ? "bg-zinc-50 dark:bg-[#18181b] text-zinc-900 dark:text-white hover:bg-zinc-200 dark:bg-zinc-800 active:scale-[0.98]"
              : "bg-zinc-50 dark:bg-[#18181b]/50 text-zinc-600 cursor-not-allowed"
          }`}
        >
          Complete Setup <ArrowRight className="w-5 h-5" />
        </button>
        <PaginationDots total={3} current={2} />
      </div>
    </div>
  );
}
