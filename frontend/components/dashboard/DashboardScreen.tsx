import React from "react";
import { Menu, User, Wallet, Shield, ChevronRight, MapPin, Clock, TrendingUp, PiggyBank } from "lucide-react";

interface DashboardScreenProps {
  onOpenMenu: () => void;
  onViewWallet: () => void;
  onViewJob: (id: string) => void;
}

export function DashboardScreen({ onOpenMenu, onViewWallet, onViewJob }: DashboardScreenProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 pb-2">
        <button onClick={onOpenMenu} className="p-2 -ml-2 text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#8b5cf6]">
          <User className="w-5 h-5" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 no-scrollbar w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 tracking-tight">Good morning, Gemini</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Here are your opportunities today</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* AI Opportunities */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-bold">AI Recommended Opportunities</h2>
                <button className="text-[#8b5cf6] text-sm flex items-center hover:underline">
                  See all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <JobCard
                  title="Fashion Designer"
                  company="Alaro Fashion House"
                  match="95%"
                  distance="2.3 km"
                  duration="6 months"
                  pay="₦45,000/week"
                  onClick={() => onViewJob("job-1")}
                />
                <JobCard
                  title="Textile Specialist"
                  company="Balogun Textiles"
                  match="88%"
                  distance="5.7 km"
                  duration="3 months"
                  pay="₦38,000/week"
                  onClick={() => onViewJob("job-2")}
                />
                {/* Additional empty slots for extra wide screens could go here, handled by grid */}
              </div>
            </div>
            
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {/* Financial Growth (Desktop moved here for balance) */}
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Financial Growth</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs">Your earning potential</p>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">Estimated Monthly</span>
                  <span className="text-lg font-bold text-emerald-500">₦187,000</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">With matched jobs</span>
                  <span className="text-sm font-medium text-[#8b5cf6]">+42%</span>
                </div>
              </div>

              {/* Savings (Desktop moved here for balance) */}
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <PiggyBank className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Savings Eligibility</h3>
                  </div>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-4 leading-relaxed">
                  Complete 2 more jobs to unlock savings account with 8% annual interest
                </p>
                <div className="flex gap-1 mb-2">
                  <div className="h-1.5 flex-[3] bg-emerald-500 rounded-full"></div>
                  <div className="h-1.5 flex-[2] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">60% complete</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Wallet Card */}
            <button 
              onClick={onViewWallet}
              className="w-full text-left bg-[#8b5cf6] rounded-2xl p-6 relative overflow-hidden transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                <Wallet className="w-4 h-4" />
                Your Wallet
              </div>
              <div className="text-4xl font-bold tracking-tight mb-4 text-white">
                ₦12,450.00
              </div>
              <div className="text-white/80 text-xs mb-4">Available balance</div>
              <div className="flex items-center text-sm font-medium text-white">
                View transactions <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </button>

            {/* Trust Score */}
            <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Trust Score</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">Building your identity</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-500 mb-1">320</div>
                <button className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors">View</button>
              </div>
            </div>

            {/* Mobile-only view for Financial Growth and Savings since they moved to the left col on desktop */}
            <div className="lg:hidden space-y-6">
              {/* Financial Growth */}
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Financial Growth</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs">Your earning potential</p>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">Estimated Monthly</span>
                  <span className="text-lg font-bold text-emerald-500">₦187,000</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">With matched jobs</span>
                  <span className="text-sm font-medium text-[#8b5cf6]">+42%</span>
                </div>
              </div>

              {/* Savings */}
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <PiggyBank className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Savings Eligibility</h3>
                  </div>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-4 leading-relaxed">
                  Complete 2 more jobs to unlock savings account with 8% annual interest
                </p>
                <div className="flex gap-1 mb-2">
                  <div className="h-1.5 flex-[3] bg-emerald-500 rounded-full"></div>
                  <div className="h-1.5 flex-[2] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">60% complete</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

interface JobCardProps {
  title: string;
  company: string;
  match: string;
  distance: string;
  duration: string;
  pay: string;
  onClick: () => void;
}

function JobCard({ title, company, match, distance, duration, pay, onClick }: JobCardProps) {
  return (
    <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{company}</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20 text-xs font-medium">
          {match} Match
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {distance}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {duration}
        </div>
        <div className="flex items-center gap-1 text-[#8b5cf6]">
          <TrendingUp className="w-3 h-3" /> {pay}
        </div>
      </div>
      <button
        onClick={onClick}
        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        Quick Apply <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// Ensure you have ArrowRight from lucide-react if JobCard uses it
import { ArrowRight } from "lucide-react";
