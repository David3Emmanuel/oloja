"use client";

import React from "react";
import { ArrowLeft, Briefcase, CheckCircle2, Star, PiggyBank, Calendar, TrendingUp, Lock, Award } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GrowthPage() {
  const router = useRouter();
  const score = 320;
  const maxScore = 1000;
  const percentage = (score / maxScore) * 100;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-[100dvh] w-full bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-[#8b5cf6]/30 relative pb-20">
      <div className="flex-1 w-full h-full relative overflow-x-hidden">
        <div className="flex-1 flex flex-col h-full w-full max-w-2xl mx-auto">
          <header className="flex items-center gap-4 p-6 pb-4">
            <button onClick={() => router.push('/dashboard')} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold flex-1 text-center pr-8">Growth</h1>
          </header>
          
          <div className="px-6 space-y-8">
            {/* Score Card */}
            <div className="bg-[#18181b] border border-zinc-800/50 rounded-3xl p-8 flex flex-col items-center text-center">
              <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-zinc-800" />
                  <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="text-emerald-500 transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{score}</span>
                  <span className="text-xs text-zinc-500">of {maxScore}</span>
                </div>
              </div>
              <div className="bg-[#8b5cf6]/20 text-[#8b5cf6] px-5 py-2 rounded-full text-sm font-medium mb-4 border border-[#8b5cf6]/20">
                Trust Score
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-[250px]">
                Complete more opportunities to unlock financial services
              </p>
            </div>

            {/* Breakdown */}
            <div>
              <h2 className="text-sm font-semibold mb-3">Breakdown</h2>
              <div className="space-y-3">
                <BreakdownItem icon={<Briefcase className="w-4 h-4 text-[#8b5cf6]" />} title="Opportunity History" subtitle="2 opportunities completed" points={120} />
                <BreakdownItem icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} title="Transaction Activity" subtitle="Regular activity" points={80} />
                <BreakdownItem icon={<Star className="w-4 h-4 text-[#8b5cf6]" />} title="Payment Consistency" subtitle="On-time record" points={60} />
                <BreakdownItem icon={<PiggyBank className="w-4 h-4 text-[#8b5cf6]" />} title="Savings Behavior" subtitle="Regular contributions" points={120} />
                <BreakdownItem icon={<Calendar className="w-4 h-4 text-[#8b5cf6]" />} title="Overall Platform Activity" subtitle="2 months active" points={60} />
              </div>
            </div>

            {/* Economic Growth Insights */}
            <div>
              <h2 className="text-sm font-semibold mb-3">Economic Growth Insights</h2>
              <div className="bg-[#18181b] border border-zinc-800/50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">Your Progress</h3>
                    <p className="text-zinc-500 text-xs">Building financial access</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Earnings This Month</span>
                    <span className="text-emerald-500 font-medium">₦45,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Total Saved</span>
                    <span className="text-[#8b5cf6] font-medium">₦8,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Potential with Matched Jobs</span>
                    <span className="text-[#8b5cf6] font-medium">₦187,000/mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Unlock Other Financial Services */}
            <div>
              <h2 className="text-sm font-semibold mb-3">Unlock Other Financial Services</h2>
              <div className="space-y-3">
                <ServiceCard 
                  icon={<Lock className="w-5 h-5 text-[#8b5cf6]" />}
                  title="Savings Account"
                  description="Complete 2 more opportunities to unlock 8% annual interest savings account"
                  progress={60}
                />
                <ServiceCard 
                  icon={<Lock className="w-5 h-5 text-[#8b5cf6]" />}
                  title="Credit Access"
                  description="Reach 500 points to unlock micro-credit opportunities up to ₦25,000"
                />
                <ServiceCard 
                  icon={<Lock className="w-5 h-5 text-[#8b5cf6]" />}
                  title="Insurance Programs"
                  description="Reach 700 points to access affordable health and income protection insurance"
                />
              </div>
            </div>

            {/* Growth Recommendations */}
            <div>
              <h2 className="text-sm font-semibold mb-3">Growth Recommendations</h2>
              <div className="bg-[#18181b] border border-zinc-800/50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">Next Milestone: 500 Points</h3>
                    <p className="text-zinc-500 text-xs">Unlock savings account and credit access</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#8b5cf6] rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs text-zinc-400 mb-3">Ways to increase your score:</h4>
                  <ul className="space-y-2">
                    <RecommendationItem text="Complete 2 more opportunities (+120 points)" />
                    <RecommendationItem text="Save regularly to your wallet (+40 points)" />
                    <RecommendationItem text="Maintain on-time payments (+20 points)" />
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function BreakdownItem({ icon, title, subtitle, points }: { icon: React.ReactNode; title: string; subtitle: string; points: number }) {
  return (
    <div className="bg-[#18181b] border border-zinc-800/50 rounded-2xl p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-sm text-zinc-200">{title}</h3>
          <p className="text-zinc-500 text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="text-right shrink-0 ml-2">
        <div className="text-emerald-500 font-medium text-sm">{points}</div>
        <div className="text-zinc-600 text-[10px]">points</div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description, progress }: { icon: React.ReactNode; title: string; description: string; progress?: number }) {
  return (
    <div className="bg-[#18181b] border border-zinc-800/50 rounded-2xl p-5">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1 text-zinc-200">{title}</h3>
          <p className="text-zinc-400 text-xs leading-relaxed mb-3">{description}</p>
          {progress !== undefined && (
            <div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-[#8b5cf6] rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-[10px] text-[#8b5cf6]">{progress}% complete</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecommendationItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-xs text-zinc-300">
      <div className="w-1 h-1 rounded-full bg-[#8b5cf6] mt-1.5 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
