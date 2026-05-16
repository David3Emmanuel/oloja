import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, MapPin, Clock, Calendar, TrendingUp, ShieldCheck, CheckCircle2, Building2, Zap, Award, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DUMMY_OPPORTUNITIES, Opportunity } from "@/data/dummyOpportunities";

interface JobDetailsScreenProps {
  jobId?: string;
  onBack: () => void;
}

export function JobDetailsScreen({ jobId, onBack }: JobDetailsScreenProps) {
  const router = useRouter();
  const [job, setJob] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching job details from an API
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = DUMMY_OPPORTUNITIES.find((o) => o.id === jobId);
      setJob(found || DUMMY_OPPORTUNITIES[0]);
      setIsLoading(false);
    }, 800); // Simulated network delay

    return () => clearTimeout(timer);
  }, [jobId]);

  const handleApply = () => {
    if (!job) return;
    const recipient = encodeURIComponent(job.postedBy);
    const jobTitle = encodeURIComponent(job.title);
    const date = encodeURIComponent(job.date);
    router.push(`/messages?recipient=${recipient}&job=${jobTitle}&date=${date}`);
  };

  const getMatchIcon = (type: string) => {
    switch (type) {
      case "ai": return <Zap className="w-4 h-4 text-[#8b5cf6]" />;
      case "location": return <MapPin className="w-4 h-4 text-emerald-500" />;
      case "experience": return <Award className="w-4 h-4 text-[#8b5cf6]" />;
      default: return <Zap className="w-4 h-4 text-[#8b5cf6]" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col h-full bg-[#09090b] text-zinc-100">
        <header className="flex items-center gap-4 p-6 pb-2">
          <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center pr-8">Job Details</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-[#8b5cf6] animate-spin" />
          <p className="text-zinc-500 text-sm">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) return null;

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
            <h2 className="text-[22px] font-bold">{job.title}</h2>
            <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-medium shrink-0">
              {job.matchPercentage}% Match
            </div>
          </div>
          <p className="text-zinc-500 text-sm">{job.category} · {job.payFrequency}</p>
        </div>

        {/* Company Card */}
        <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-[#8b5cf6]" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-0.5">{job.postedBy}</h3>
                <p className="text-zinc-500 text-xs">{job.companyLocation}</p>
              </div>
            </div>
            {job.verified && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Star className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            <span className="font-semibold text-emerald-500">{job.rating}</span>
            <span className="text-zinc-500">({job.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<TrendingUp className="w-4 h-4" />} title="Payment" value={`₦${job.pay.toLocaleString()}`} subtitle={job.payFrequency} />
          <StatCard icon={<MapPin className="w-4 h-4" />} title="Distance" value={job.distance} subtitle="from you" />
          <StatCard icon={<Clock className="w-4 h-4" />} title="Duration" value={job.duration} subtitle="Gig" />
          <StatCard icon={<Calendar className="w-4 h-4" />} title="Date" value={job.date} subtitle={job.dateYear} />
        </div>

        {/* About Job */}
        <div>
          <h3 className="font-semibold text-sm mb-3">About the Job</h3>
          <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 text-zinc-400 text-xs leading-relaxed">
            {job.description}
          </div>
        </div>

        {/* Required Skills */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </div>

        {/* Why this matches you */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Why This Matches You</h3>
          <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 space-y-5">
            {job.matchReasons.map((reason, i) => (
              <MatchPoint 
                key={i}
                icon={getMatchIcon(reason.type)}
                title={reason.title}
                description={reason.description}
              />
            ))}
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Earnings Breakdown</h3>
          <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Base Pay</span>
              <span className="font-medium text-white">₦{job.basePay.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Performance Bonus</span>
              <span className="font-medium text-emerald-500">₦{job.bonus.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-zinc-800/50 pt-4">
              <span className="font-semibold text-white">Total Pay</span>
              <span className="font-bold text-[#8b5cf6]">₦{job.pay.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Safety & Trust */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Safety & Trust</h3>
          <div className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-5 space-y-4">
            <SafetyPoint title="Verified Employer" desc="Identity and business documents confirmed" />
            <SafetyPoint title="Secure Payment" desc="Payments protected by Oloja escrow system" />
            <SafetyPoint title="Work Agreement" desc="Digital contract protects both parties" />
          </div>
        </div>

      </div>

      {/* Apply Button Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent pt-12 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button onClick={handleApply} className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-black/50">
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
