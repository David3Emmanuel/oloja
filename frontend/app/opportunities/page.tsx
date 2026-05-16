"use client";

import React, { useState } from "react";
import { ArrowLeft, MapPin, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const TABS = ["Recents", "Applied", "Current", "Completed"];

const OPPORTUNITIES = [
  {
    id: 1,
    title: "Photographer",
    company: "Peirson studios",
    match: 95,
    location: "2.3 km",
    date: "July 5th",
    pay: "₦45,000/hr"
  },
  {
    id: 2,
    title: "Wedding Photographer",
    company: "Dalo Events",
    match: 88,
    location: "Victoria Island",
    date: "July 6th",
    pay: "₦38,000/hour"
  },
  {
    id: 3,
    title: "Wedding Photographer",
    company: "Dalo Events",
    match: 88,
    location: "Victoria Island",
    date: "July 6th",
    pay: "₦38,000/hour"
  },
  {
    id: 4,
    title: "Wedding Photographer",
    company: "Dalo Events",
    match: 88,
    location: "Victoria Island",
    date: "July 6th",
    pay: "₦38,000/hour"
  },
  {
    id: 5,
    title: "Wedding Photographer",
    company: "Dalo Events",
    match: 88,
    location: "Victoria Island",
    date: "July 6th",
    pay: "₦38,000/hour"
  }
];

export default function OpportunitiesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Recents");

  return (
    <div className="min-h-[100dvh] w-full bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-[#8b5cf6]/30 relative pb-10">
      <div className="flex-1 w-full h-full relative overflow-x-hidden">
        <div className="flex-1 flex flex-col h-full w-full max-w-2xl mx-auto">
          {/* Header */}
          <header className="flex items-center gap-4 p-6 pb-4">
            <button onClick={() => router.push('/dashboard')} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold flex-1 text-center pr-8">Opportunities</h1>
          </header>

          {/* Tabs */}
          <div className="flex px-6 mb-6 border-b border-zinc-800/50 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 font-medium text-sm whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? "text-[#8b5cf6]" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5cf6]" />
                )}
              </button>
            ))}
          </div>

          <div className="px-6">
            <h2 className="text-base font-semibold mb-4 text-zinc-100">Based on Your Profile</h2>
            
            <div className="space-y-4">
              {OPPORTUNITIES.map((job) => (
                <div key={job.id} className="bg-[#18181b] rounded-2xl p-5 border border-zinc-800/50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-zinc-100 text-[15px]">{job.title}</h3>
                      <p className="text-zinc-500 text-sm mt-0.5">{job.company}</p>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                      job.match >= 90 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-[#8b5cf6]/10 text-[#8b5cf6]'
                    }`}>
                      {job.match}% Match
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-zinc-400 mb-5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{job.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#8b5cf6]">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{job.pay}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
