import React from "react";
import { ArrowRight, User, Phone, MapPin } from "lucide-react";
import { PaginationDots } from "./PaginationDots";
import { TopProgressBar } from "./TopProgressBar";

interface PersonalInfoStepProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  location: string;
  setLocation: (loc: string) => void;
  onNext: () => void;
}

export function PersonalInfoStep({
  name,
  setName,
  phone,
  setPhone,
  location,
  setLocation,
  onNext,
}: PersonalInfoStepProps) {
  return (
    <div className="flex-1 flex flex-col px-6 py-12">
      <div className="mb-8">
        <TopProgressBar step={1} />
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Let&apos;s get to know you</h1>
        <p className="text-zinc-500 dark:text-zinc-400">We&apos;ll use this to connect you with the right opportunities</p>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2">
            <User className="w-4 h-4 text-[#8b5cf6]" /> Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2">
            <Phone className="w-4 h-4 text-[#8b5cf6]" /> Phone Number
          </label>
          <input
            type="tel"
            placeholder="080 1234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2">
            <MapPin className="w-4 h-4 text-[#8b5cf6]" /> Your Location
          </label>
          <input
            type="text"
            placeholder="e.g., Ikeja, Lagos"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
          />
        </div>
      </div>

      <div className="mt-8 pt-4">
        <button
          onClick={onNext}
          disabled={!name || !phone || !location}
          className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
            name && phone && location
              ? "bg-zinc-50 dark:bg-[#18181b] text-zinc-900 dark:text-white hover:bg-zinc-200 dark:bg-zinc-800 active:scale-[0.98]"
              : "bg-zinc-50 dark:bg-[#18181b]/50 text-zinc-600 cursor-not-allowed"
          }`}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
        <PaginationDots total={3} current={2} />
      </div>
    </div>
  );
}
