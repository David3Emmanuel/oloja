import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { PaginationDots } from "./PaginationDots";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col px-6 pb-8 pt-20">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-[#8b5cf6] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#8b5cf6]/20">
          <Zap className="w-10 h-10 text-white fill-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Oloja</h1>
        <h2 className="text-xl font-medium mb-3">
          Opportunities. Identity.<br />Financial Growth.
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-[280px]">
          Access opportunities, grow your income, and unlock financial inclusion.
        </p>
      </div>
      <div className="mt-auto">
        <button
          onClick={onNext}
          className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
        <PaginationDots total={3} current={0} />
      </div>
    </div>
  );
}
