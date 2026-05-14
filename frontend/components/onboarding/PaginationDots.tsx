import React from "react";

interface PaginationDotsProps {
  total: number;
  current: number;
}

export function PaginationDots({ total, current }: PaginationDotsProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current ? "w-6 bg-[#8b5cf6]" : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}
