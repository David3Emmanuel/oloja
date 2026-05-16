import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, User, Wallet, Shield, ChevronRight, MapPin, Clock, TrendingUp, PiggyBank, ArrowRight } from "lucide-react";
import { useUser } from "@/context/UserContext";

const API_BASE = "https://oloja-production.up.railway.app";

interface DashboardScreenProps {
  onOpenMenu: () => void;
  onViewWallet: () => void;
  onViewJob: (id: string) => void;
}

export function DashboardScreen({ onOpenMenu, onViewWallet, onViewJob }: DashboardScreenProps) {
  const { user } = useUser();

  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [isLoadingTrust, setIsLoadingTrust] = useState(true);

  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [isLoadingOpps, setIsLoadingOpps] = useState(true);

  // Fetch trust score using the user's actual virtual account number
  useEffect(() => {
    const fetchTrustScore = async () => {
      const acctNum = user?.virtualAccount?.virtual_account_number;
      if (!acctNum) {
        // Fall back to the trust score stored during onboarding
        setTrustScore(user?.trustScore ?? null);
        setIsLoadingTrust(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE}/api/trust/${acctNum}`);
        if (!response.ok) throw new Error('Failed to fetch trust score');
        const data = await response.json();
        setTrustScore(data.trustScore);
        setTransactionCount(data.transactionCount ?? 0);
      } catch (err) {
        console.error(err);
        // Fall back to context value
        setTrustScore(user?.trustScore ?? null);
      } finally {
        setIsLoadingTrust(false);
      }
    };
    fetchTrustScore();
  }, [user]);

  // Fetch matched opportunities using the user's profile data, fallback to dummy data
  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoadingOpps(true);
      try {
        const queryParams = new URLSearchParams({
          skills: user?.skills?.join(',') || '',
          location: user?.location || '',
          languages: user?.languages?.join(',') || '',
        });
        const res = await fetch(`${API_BASE}/api/opportunities/match?${queryParams}`);
        if (!res.ok) throw new Error('Failed to fetch opportunities');
        const data = await res.json();
        const matches = data.matches || [];
        if (matches.length > 0) {
          setOpportunities(matches);
        } else {
          // Simulate a small delay for dummy data
          const { DUMMY_OPPORTUNITIES } = await import("@/data/dummyOpportunities");
          setOpportunities(DUMMY_OPPORTUNITIES as any[]);
        }
      } catch (err) {
        console.error(err);
        // Fallback to dummy data on error
        const { DUMMY_OPPORTUNITIES } = await import("@/data/dummyOpportunities");
        setOpportunities(DUMMY_OPPORTUNITIES as any[]);
      } finally {
        setIsLoadingOpps(false);
      }
    };
    fetchOpportunities();
  }, [user]);

  // Derive a time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 pb-2">
        <button onClick={onOpenMenu} className="p-2 -ml-2 text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        {/* <Link href="/profile" className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#8b5cf6] hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
          <User className="w-5 h-5" />
        </Link> */}
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 no-scrollbar w-full max-w-7xl mx-auto">
        <div className="mb-6 max-w-2xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-1 tracking-tight">{getGreeting()}, {user?.firstName || "there"}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Here are your opportunities today</p>
        </div>

        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
          {/* Top Section: Wallet & Stats */}
          <div className="space-y-6 w-full">
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
                ₦0.00
              </div>
              <div className="text-white/80 text-xs mb-4">Available balance</div>
              <div className="flex items-center text-sm font-medium text-white">
                View transactions <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </button>

            {/* Trust Score */}
            <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex justify-between items-center w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Trust Score</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    {transactionCount > 0 ? `Based on ${transactionCount} transactions` : "Building your identity"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-500 mb-1">
                  {isLoadingTrust ? "..." : trustScore !== null ? trustScore : "N/A"}
                </div>
                <button className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors">View</button>
              </div>
            </div>

            {/* Financial Growth */}
            <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 w-full">
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
                <span className="text-lg font-bold text-emerald-500">
                  {opportunities.length > 0
                    ? `₦${opportunities.reduce((sum: number, o: any) => sum + (o.pay || 0), 0).toLocaleString()}`
                    : "₦0"}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">With matched jobs</span>
                <span className="text-sm font-medium text-[#8b5cf6]">
                  {opportunities.length > 0 ? `${opportunities.length} found` : "—"}
                </span>
              </div>
            </div>

            {/* Savings Eligibility */}
            <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 w-full">
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

          {/* Bottom Section: Opportunities */}
          <div className="space-y-6 w-full">
            {/* AI Opportunities */}
            <div className="w-full">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-bold">AI Recommended Opportunities</h2>
                <button onClick={() => onViewJob("/")} className="text-[#8b5cf6] text-sm flex items-center hover:underline">
                  See all <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {isLoadingOpps && (
                <div className="text-center text-zinc-500 py-8 text-sm">Loading recommendations...</div>
              )}

              {!isLoadingOpps && opportunities.length === 0 && (
                <div className="text-center text-zinc-500 py-8 bg-zinc-50 dark:bg-[#18181b] rounded-2xl border border-zinc-200 dark:border-zinc-800 text-sm">
                  No matched opportunities yet. Complete your profile to get personalised recommendations.
                </div>
              )}

              <div className="flex flex-col gap-4 w-full">
                {!isLoadingOpps && opportunities.slice(0, 3).map((job: any) => (
                  <JobCard
                    key={job.id}
                    title={job.title}
                    company={job.postedBy || job.category || ""}
                    match={`${job.matchPercentage ?? 0}%`}
                    distance={job.distance || job.location || "Remote"}
                    duration={job.duration || "N/A"}
                    pay={`₦${(job.pay || 0).toLocaleString()}/${job.payFrequency?.replace('_', ' ') || 'job'}`}
                    onClick={() => onViewJob(job.id)}
                  />
                ))}
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
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        <div className="flex items-center gap-1 shrink-0">
          <MapPin className="w-3 h-3" /> {distance}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Clock className="w-3 h-3" /> {duration}
        </div>
        <div className="flex items-center gap-1 text-[#8b5cf6] shrink-0">
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
