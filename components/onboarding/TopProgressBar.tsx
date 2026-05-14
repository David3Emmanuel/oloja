import React from "react";

interface TopProgressBarProps {
  step: 1 | 2 | 3;
}

export function TopProgressBar({ step }: TopProgressBarProps) {
  return (
    <div className="flex gap-2 mb-8">
      <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-[#8b5cf6]" : "bg-zinc-200 dark:bg-zinc-800"}`}></div>
      <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-[#8b5cf6]" : "bg-zinc-200 dark:bg-zinc-800"}`}></div>
      <div className={`h-1 flex-1 rounded-full ${step >= 3 ? "bg-[#8b5cf6]" : "bg-zinc-200 dark:bg-zinc-800"}`}></div>
    </div>
  );
}
