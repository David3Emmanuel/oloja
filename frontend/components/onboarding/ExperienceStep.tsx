import React from "react";
import { ArrowRight, ArrowLeft, Activity, Zap } from "lucide-react";
import { ExperienceLevel, JobType, WorkType } from "./types";

interface ExperienceStepProps {
  experience: ExperienceLevel;
  setExperience: (exp: ExperienceLevel) => void;
  jobType: JobType;
  setJobType: (type: JobType) => void;
  workType: WorkType;
  setWorkType: (type: WorkType) => void;
  workDistance: string;
  setWorkDistance: (distance: string) => void;
  onComplete: () => void;
  isSubmitting?: boolean;
  onBack: () => void;
}

export function ExperienceStep({
  experience, setExperience, jobType, setJobType, workType, setWorkType, workDistance, setWorkDistance, onComplete, isSubmitting, onBack
}: ExperienceStepProps) {
  
  const experienceOptions: { id: ExperienceLevel; label: string; desc: string }[] = [
    { id: "beginner", label: "Beginner", desc: "Just starting out or learning" },
    { id: "intermediate", label: "Intermediate", desc: "1-3 years of experience" },
    { id: "expert", label: "Expert", desc: "3+ years of professional experience" },
  ];

  const jobTypeOptions: { id: JobType; label: string }[] = [
    { id: "one_time", label: "One time/Gig" },
    { id: "full_time", label: "Full time" },
    { id: "contract", label: "Contract" },
    { id: "flexible", label: "Flexible" },
  ];

  const workTypeOptions: { id: WorkType; label: string }[] = [
    { id: "remote", label: "Remote" },
    { id: "onsite", label: "Onsite" },
    { id: "hybrid", label: "Hybrid" },
  ];

  return (
    <div className="flex-1 flex flex-col px-6 py-12">
      <button onClick={onBack} className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 text-sm mb-4 w-fit transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Your experience level</h1>
        <p className="text-zinc-500 dark:text-zinc-400">This helps us match you with suitable jobs</p>
      </div>

      <div className="flex gap-1 mb-8">
        <div className="h-1 flex-1 bg-[#8b5cf6] rounded-full" />
        <div className="h-1 flex-1 bg-[#8b5cf6] rounded-full" />
        <div className="h-1 flex-1 bg-[#8b5cf6] rounded-full" />
      </div>

      <div className="space-y-8 flex-1">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-4 text-zinc-800 dark:text-zinc-200">
            <Activity className="w-4 h-4 text-[#8b5cf6]" />
            Experience Level
          </label>
          <div className="space-y-3">
            {experienceOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setExperience(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  experience === opt.id
                    ? "bg-[#8b5cf6]/20 border-[#8b5cf6] text-zinc-900 dark:text-white"
                    : "bg-zinc-50 dark:bg-[#18181b] border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="font-semibold">{opt.label}</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-4 block text-zinc-800 dark:text-zinc-200">Preferred Job type</label>
          <div className="space-y-3">
            {jobTypeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setJobType(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  jobType === opt.id
                    ? "bg-[#8b5cf6]/20 border-[#8b5cf6] text-zinc-900 dark:text-white font-medium"
                    : "bg-zinc-50 dark:bg-[#18181b] border-zinc-200 dark:border-zinc-800 font-medium"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-4 block text-zinc-800 dark:text-zinc-200">Preferred Work type</label>
          <div className="space-y-3">
            {workTypeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWorkType(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  workType === opt.id
                    ? "bg-[#8b5cf6]/20 border-[#8b5cf6] text-zinc-900 dark:text-white font-medium"
                    : "bg-zinc-50 dark:bg-[#18181b] border-zinc-200 dark:border-zinc-800 font-medium"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-4 block text-zinc-800 dark:text-zinc-200">Preferred Work Distance(Optional)</label>
          <input
            type="text"
            value={workDistance}
            onChange={(e) => setWorkDistance(e.target.value)}
            placeholder="Describe how far you can commute for a job"
            className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6] rounded-xl py-4 px-4 outline-none transition-all"
          />
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 text-center mt-6">
          <div className="w-10 h-10 bg-[#8b5cf6]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-5 h-5 text-[#8b5cf6] fill-[#8b5cf6]" />
          </div>
          <h3 className="text-white font-semibold mb-2">AI-Powered Matching</h3>
          <p className="text-sm text-zinc-400">
            Our AI will analyze your skills and experience to match you with the best job opportunities near you. You'll get personalized recommendations that fit your profile.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-4">
        <button
          onClick={onComplete}
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all bg-[#8b5cf6] dark:bg-[#8b5cf6] text-white hover:bg-[#8b5cf6]/70 active:scale-[0.98] disabled:opacity-70"
        >
          {isSubmitting ? "Completing..." : "Complete Setup"} <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex justify-center items-center gap-2 mt-6">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="w-6 h-1.5 rounded-full bg-[#8b5cf6]" />
        </div>
      </div>
    </div>
  );
}
