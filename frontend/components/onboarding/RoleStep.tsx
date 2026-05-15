import React from "react";
import { ArrowRight, Briefcase, Store } from "lucide-react";
import { PaginationDots } from "./PaginationDots";
import { Role } from "./types";

interface RoleStepProps {
  role: Role;
  setRole: (role: Role) => void;
  onNext: () => void;
}

export function RoleStep({ role, setRole, onNext }: RoleStepProps) {
  return (
    <div className="flex-1 flex flex-col px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">How would you like to use the platform?</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Choose the option that best describes you</p>
      </div>

      <div className="space-y-4 flex-1">
        <button
          onClick={() => setRole("find_jobs")}
          className={`w-full text-left p-6 rounded-2xl border transition-all ${
            role === "find_jobs"
              ? "bg-zinc-50 dark:bg-[#18181b] border-[#8b5cf6]"
              : "bg-zinc-50 dark:bg-[#18181b] border-transparent hover:border-zinc-700"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
            role === "find_jobs" ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" : "bg-zinc-200 dark:bg-[#27272a] text-zinc-500 dark:text-zinc-400"
          }`}>
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Find Jobs and Opportunities</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Find work opportunities that match your skills and build your financial identity through employment.
          </p>
        </button>

        <button
          onClick={() => setRole("hire_services")}
          className={`w-full text-left p-6 rounded-2xl border transition-all ${
            role === "hire_services"
              ? "bg-zinc-50 dark:bg-[#18181b] border-[#8b5cf6]"
              : "bg-zinc-50 dark:bg-[#18181b] border-transparent hover:border-zinc-700"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
            role === "hire_services" ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" : "bg-zinc-200 dark:bg-[#27272a] text-zinc-500 dark:text-zinc-400"
          }`}>
            <Store className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Hire Services or Skilled Workers</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Connect with skilled workers and service providers for tasks and projects.
          </p>
        </button>
      </div>

      <div className="mt-8 pt-4">
        <button
          onClick={onNext}
          disabled={!role}
          className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
            role
              ? "bg-[#18181b] dark:bg-[#18181b] text-white hover:bg-zinc-800 dark:hover:bg-zinc-800 active:scale-[0.98]"
              : "bg-[#18181b]/50 dark:bg-[#18181b]/50 text-zinc-500 cursor-not-allowed"
          }`}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
        <PaginationDots total={3} current={2} />
      </div>
    </div>
  );
}
