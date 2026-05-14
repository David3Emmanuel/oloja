import React from "react";
import { ArrowRight, Globe, Briefcase, Scissors, ChefHat, Sparkles, Car, Wrench, Paintbrush, Zap, Hammer, ShoppingBag, Camera, Package, GraduationCap, Flame, UtensilsCrossed, MoreHorizontal } from "lucide-react";
import { PaginationDots } from "./PaginationDots";
import { TopProgressBar } from "./TopProgressBar";

interface SkillsStepProps {
  languages: string[];
  setLanguages: React.Dispatch<React.SetStateAction<string[]>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  onNext: () => void;
}

const AVAILABLE_SKILLS = [
  { name: "Tailoring", icon: Scissors },
  { name: "Cooking", icon: ChefHat },
  { name: "Cleaning", icon: Sparkles },
  { name: "Driving", icon: Car },
  { name: "Plumbing", icon: Wrench },
  { name: "Painting", icon: Paintbrush },
  { name: "Electrical Work", icon: Zap },
  { name: "Carpentry", icon: Hammer },
  { name: "Hair Styling", icon: Scissors },
  { name: "Sales", icon: ShoppingBag },
  { name: "Makeup", icon: Sparkles },
  { name: "Photography", icon: Camera },
  { name: "Delivery", icon: Package },
  { name: "Teaching", icon: GraduationCap },
  { name: "Welding", icon: Flame },
  { name: "Catering", icon: UtensilsCrossed },
  { name: "Other", icon: MoreHorizontal },
];

export function SkillsStep({ languages, setLanguages, skills, setSkills, onNext }: SkillsStepProps) {
  return (
    <div className="flex-1 flex flex-col px-6 py-12">
      <div className="mb-6">
        <TopProgressBar step={2} />
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Tell us about your skills</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Select all the skills you have experience with</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 no-scrollbar pb-10">
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-4">
            <Globe className="w-4 h-4 text-[#8b5cf6]" /> Preferred Language
          </label>
          <div className="flex flex-wrap gap-3">
            {["English", "Yoruba", "Igbo", "Hausa", "Pidgin"].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguages((prev) =>
                    prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
                  );
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  languages.includes(lang)
                    ? "bg-[#8b5cf6]/20 text-white border border-[#8b5cf6]/50"
                    : "bg-zinc-50 dark:bg-[#18181b] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-4">
            <Briefcase className="w-4 h-4 text-[#8b5cf6]" /> Your Skills
          </label>
          <div className="flex flex-wrap gap-3">
            {AVAILABLE_SKILLS.map((skill, index) => {
              const Icon = skill.icon;
              const isSelected = skills.includes(skill.name);
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSkills((prev) =>
                      prev.includes(skill.name)
                        ? prev.filter((s) => s !== skill.name)
                        : [...prev, skill.name]
                    );
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-[#8b5cf6]/20 text-white border border-[#8b5cf6]/50"
                      : "bg-zinc-50 dark:bg-[#18181b] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-[#8b5cf6]" : "text-zinc-500"}`} />
                  {skill.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 bg-white dark:bg-[#09090b] relative z-10">
        <button
          onClick={onNext}
          disabled={skills.length === 0}
          className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
            skills.length > 0
              ? "bg-zinc-50 dark:bg-[#18181b] text-zinc-900 dark:text-white hover:bg-zinc-200 dark:bg-zinc-800 active:scale-[0.98]"
              : "bg-zinc-50 dark:bg-[#18181b]/50 text-zinc-600 cursor-not-allowed"
          }`}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
        <PaginationDots total={3} current={1} />
      </div>
    </div>
  );
}
