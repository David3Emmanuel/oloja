import React from "react";
import { ArrowLeft, Star, MapPin, Clock, Calendar, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";

interface JobDetailsScreenProps {
  onBack: () => void;
}

export function JobDetailsScreen({ onBack }: JobDetailsScreenProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white">
      {/* Header */}
      <header className="flex items-center gap-4 p-6 pb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 text-center pr-8">Job Details</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-32 lg:pb-8 no-scrollbar w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-1">
          <h2 className="text-2xl font-bold">Fashion Designer</h2>
          <div className="bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded border border-emerald-500/20 text-xs font-medium shrink-0">
            95% Match
          </div>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">Full-time position</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Company Card */}
            <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center shrink-0">
                <div className="w-6 h-6 bg-[#8b5cf6] rounded-md flex items-center justify-center text-white text-[10px] font-bold">A</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <h3 className="font-semibold truncate">Alaro Fashion House</h3>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap shrink-0">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </div>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Ikeja, Lagos</p>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                  <span className="font-medium">4.8</span>
                  <span className="text-zinc-500">(124 reviews)</span>
                </div>
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={<TrendingUp className="w-4 h-4" />} title="Payment" value="₦45,000" subtitle="per week" />
              <StatCard icon={<MapPin className="w-4 h-4" />} title="Distance" value="2.3 km" subtitle="from you" />
              <StatCard icon={<Clock className="w-4 h-4" />} title="Duration" value="6 months" subtitle="contract" />
              <StatCard icon={<Calendar className="w-4 h-4" />} title="Start Date" value="May 20" subtitle="2026" />
            </div>

            {/* About Job */}
            <div>
              <h3 className="font-semibold text-sm mb-3">About the Job</h3>
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                We are looking for a talented fashion designer to join our growing team. You will be responsible for creating custom garments, working with clients on designs, and managing production timelines. Experience with traditional and modern techniques is preferred.
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                <SkillTag label="Tailoring" />
                <SkillTag label="Pattern Making" />
                <SkillTag label="Machine Operation" />
              </div>
            </div>

            {/* Why this matches you */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Why This Matches You</h3>
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-4">
                <MatchPoint 
                  icon={<TrendingUp className="w-4 h-4 text-[#8b5cf6]" />}
                  title="AI-Powered Match"
                  description="Your tailoring and pattern making skills align perfectly with this role's requirements"
                />
                <MatchPoint 
                  icon={<MapPin className="w-4 h-4 text-emerald-500" />}
                  title="Convenient Location"
                  description="Only 2.3 km from your location - easy commute saves time and money"
                />
                <MatchPoint 
                  icon={<ShieldCheck className="w-4 h-4 text-[#8b5cf6]" />}
                  title="Experience Match"
                  description="Your intermediate skill level matches the position requirements"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Financial Growth Potential */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Financial Growth Potential</h3>
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Earning Potential</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs">Build your financial identity</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Weekly Earnings</span>
                    <span className="font-medium text-emerald-500">₦45,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Monthly Potential</span>
                    <span className="font-medium text-emerald-500">₦180,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">6-Month Total</span>
                    <span className="font-bold text-[#8b5cf6] text-lg">₦1,080,000</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 flex items-start gap-2 leading-relaxed border-t border-zinc-200 dark:border-zinc-800/50 pt-3">
                  <TrendingUp className="w-4 h-4 text-[#8b5cf6] shrink-0" /> 
                  This opportunity increases your trust score and unlocks savings account access
                </p>
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Earnings Breakdown</h3>
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Base Pay</span>
                  <span className="font-medium">₦40,000</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Performance Bonus</span>
                  <span className="font-medium text-emerald-500">₦5,000</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-zinc-200 dark:border-zinc-800 pt-3">
                  <span className="font-semibold">Total Weekly Pay</span>
                  <span className="font-bold text-[#8b5cf6]">₦45,000</span>
                </div>
              </div>
            </div>

            {/* Safety & Trust */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Safety & Trust</h3>
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4">
                <SafetyPoint title="Verified Employer" desc="Identity and business documents confirmed" />
                <SafetyPoint title="Secure Payment" desc="Weekly payments protected by EcoMatch" />
                <SafetyPoint title="Work Agreement" desc="Digital contract protects both parties" />
              </div>
            </div>

            {/* Apply Button (Desktop) */}
            <div className="hidden lg:block pt-4">
              <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                <CheckCircle2 className="w-5 h-5" /> Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Button Footer (Mobile) */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white dark:from-[#09090b] dark:via-[#09090b] to-transparent pt-12">
        <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          <CheckCircle2 className="w-5 h-5" /> Apply Now
        </button>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

function StatCard({ icon, title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-2">
        <span className="text-[#8b5cf6]">{icon}</span> {title}
      </div>
      <div className="font-bold text-lg mb-0.5">{value}</div>
      <div className="text-[10px] text-zinc-500">{subtitle}</div>
    </div>
  );
}

function SkillTag({ label }: { label: string }) {
  return (
    <div className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181b] text-xs text-zinc-600 dark:text-zinc-300">
      {label}
    </div>
  );
}

interface MatchPointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function MatchPoint({ icon, title, description }: MatchPointProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <h4 className="text-sm font-semibold mb-1">{title}</h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

interface SafetyPointProps {
  title: string;
  desc: string;
}

function SafetyPoint({ title, desc }: SafetyPointProps) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-0.5">{title}</h4>
        <p className="text-xs text-zinc-500">{desc}</p>
      </div>
    </div>
  );
}
