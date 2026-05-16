import React from "react";
import { ArrowLeft, Star, MapPin, Clock, Calendar, TrendingUp, ShieldCheck, CheckCircle2, Building2, Zap, Award } from "lucide-react";

interface JobDetailsScreenProps {
  onBack: () => void;
}

export function JobDetailsScreen({ onBack }: JobDetailsScreenProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090b] text-zinc-100 relative">
      {/* Header */}
      <header className="flex items-center gap-4 p-6 pb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 text-center pr-8">Job Details</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar w-full max-w-2xl mx-auto space-y-6">
        
        {/* Title Section */}
        <div>
          <div className="flex flex-wrap justify-between items-start gap-4 mb-1">
            <h2 className="text-[22px] font-bold">Wedding Photography</h2>
            <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-medium shrink-0">
              95% Match
            </div>
          </div>
          <p className="text-zinc-500 text-sm">Full-time position</p>
        </div>

        {/* Company Card */}
        <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-[#8b5cf6]" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-0.5">Dalo Events</h3>
                <p className="text-zinc-500 text-xs">Victoria Island, Lagos</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Star className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            <span className="font-semibold text-emerald-500">4.8</span>
            <span className="text-zinc-500">(124 reviews)</span>
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<TrendingUp className="w-4 h-4" />} title="Payment" value="₦45,000" subtitle="Full day" />
          <StatCard icon={<MapPin className="w-4 h-4" />} title="Distance" value="2.3 km" subtitle="from you" />
          <StatCard icon={<Clock className="w-4 h-4" />} title="Duration" value="One day" subtitle="Gig" />
          <StatCard icon={<Calendar className="w-4 h-4" />} title="Date" value="July 6th" subtitle="2026" />
        </div>

        {/* About Job */}
        <div>
          <h3 className="font-semibold text-sm mb-3">About the Job</h3>
          <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 text-zinc-400 text-xs leading-relaxed">
            Luminary Events is seeking an experienced wedding photographer for a full-day bridal celebration on July 8th, 2025, at a premium venue in Victoria Island, Lagos. Coverage starts from bridal preparation through to the reception. The client expects warm, candid storytelling alongside formal portraits. RAW files and 200+ edited images are required within 7 days of the shoot.
          </div>
        </div>

        {/* Required Skills */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            <SkillTag label="Photography" />
            <SkillTag label="Event Coverage" />
            <SkillTag label="Weddings Coverage" />
          </div>
        </div>

        {/* Why this matches you */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Why This Matches You</h3>
          <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 space-y-5">
            <MatchPoint 
              icon={<Zap className="w-4 h-4 text-[#8b5cf6]" />}
              title="AI-Powered Match"
              description="Your tailoring and pattern making skills align perfectly with this role's requirements"
            />
            <MatchPoint 
              icon={<MapPin className="w-4 h-4 text-emerald-500" />}
              title="Convenient Location"
              description="Only 2.3 km from your location - easy commute saves time and money"
            />
            <MatchPoint 
              icon={<Award className="w-4 h-4 text-[#8b5cf6]" />}
              title="Experience Match"
              description="Your intermediate skill level matches the position requirements"
            />
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Earnings Breakdown</h3>
          <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Base Pay</span>
              <span className="font-medium text-white">₦40,000</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Performance Bonus</span>
              <span className="font-medium text-emerald-500">₦5,000</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-zinc-800/50 pt-4">
              <span className="font-semibold text-white">Total Pay</span>
              <span className="font-bold text-[#8b5cf6]">₦45,000</span>
            </div>
          </div>
        </div>

        {/* Safety & Trust */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Safety & Trust</h3>
          <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 space-y-4">
            <SafetyPoint title="Verified Employer" desc="Identity and business documents confirmed" />
            <SafetyPoint title="Secure Payment" desc="Weekly payments protected by Oloja" />
            <SafetyPoint title="Work Agreement" desc="Digital contract protects both parties" />
          </div>
        </div>

      </div>

      {/* Apply Button Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent pt-12 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-black/50">
            <CheckCircle2 className="w-5 h-5" /> Apply Now
          </button>
        </div>
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
    <div className="bg-[#18181b] border border-zinc-800/50 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
        <span className="text-[#8b5cf6]">{icon}</span> {title}
      </div>
      <div className="font-semibold text-base mb-0.5 text-white">{value}</div>
      <div className="text-[10px] text-zinc-500">{subtitle}</div>
    </div>
  );
}

function SkillTag({ label }: { label: string }) {
  return (
    <div className="px-3 py-1.5 rounded-[10px] border border-[#8b5cf6]/30 bg-[#8b5cf6]/5 text-[11px] font-medium text-white">
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
    <div className="flex gap-4">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <h4 className="text-[13px] font-semibold mb-1 text-white">{title}</h4>
        <p className="text-[11px] text-zinc-500 leading-relaxed pr-4">{description}</p>
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
      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      </div>
      <div>
        <h4 className="text-[13px] font-medium mb-0.5 text-white">{title}</h4>
        <p className="text-[11px] text-zinc-500">{desc}</p>
      </div>
    </div>
  );
}
