import React from "react";
import { ArrowLeft, Eye, Download, Send, Plus, PiggyBank, BarChart3, ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";

interface WalletScreenProps {
  onBack: () => void;
}

export function WalletScreen({ onBack }: WalletScreenProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white">
      {/* Header */}
      <header className="flex items-center gap-4 p-6 pb-4">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 text-center pr-8">My Wallet</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 no-scrollbar w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Main Wallet Card */}
            <div className="bg-[#8b5cf6] rounded-2xl p-6 relative overflow-hidden h-[240px] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2 relative z-10">
                <span className="text-zinc-600 dark:text-white/80 text-sm">Available Balance</span>
                <button className="text-zinc-600 dark:text-white/80 hover:text-white transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <div className="text-5xl font-bold tracking-tight mb-8 relative z-10 text-white">
                ₦12,450.00
              </div>
              
              <div className="flex gap-3 relative z-10">
                <button className="flex-1 bg-black/10 dark:bg-white/20 hover:bg-black/20 dark:bg-white/30 transition-colors rounded-xl py-3 flex flex-col items-center justify-center gap-1 text-xs font-medium text-white">
                  <Download className="w-4 h-4 mb-1" /> Withdraw
                </button>
                <button className="flex-1 bg-black/10 dark:bg-white/20 hover:bg-black/20 dark:bg-white/30 transition-colors rounded-xl py-3 flex flex-col items-center justify-center gap-1 text-xs font-medium text-white">
                  <Send className="w-4 h-4 mb-1" /> Send
                </button>
                <button className="flex-1 bg-white text-[#8b5cf6] hover:bg-white/90 transition-colors rounded-xl py-3 flex flex-col items-center justify-center gap-1 text-xs font-medium shadow-lg shadow-[#8b5cf6]/20">
                  <Plus className="w-4 h-4 mb-1" /> Save
                </button>
              </div>
              
              {/* Decorative background circle */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Savings Progress */}
              <div className="bg-zinc-50 dark:bg-[#13101c] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <PiggyBank className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Savings Progress</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs">Building your future</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-500 font-bold text-sm">₦8,200</div>
                    <div className="text-zinc-500 text-[10px]">Total saved</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3 mt-auto">
                  <div className="h-1.5 flex-[4] bg-emerald-500 rounded-full"></div>
                  <div className="h-1.5 flex-[6] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px] max-w-[180px] leading-relaxed">
                    Complete 2 more jobs to unlock 8% monthly interest on savings
                  </p>
                  <button className="text-[#8b5cf6] text-[11px] font-medium hover:underline">
                    Learn more
                  </button>
                </div>
              </div>

              {/* Financial Activity */}
              <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Financial Activity</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs">Last 30 days</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Total Earned</span>
                    <span className="font-medium text-emerald-500">₦45,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Total Saved</span>
                    <span className="font-medium text-[#8b5cf6]">₦8,200</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-500 dark:text-zinc-400">Available Now</span>
                    <span className="font-bold">₦12,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Transactions */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 h-full">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-lg font-bold">Recent Transactions</h2>
                <button className="text-[#8b5cf6] text-sm hover:underline">See all</button>
              </div>
              
              <div className="space-y-4">
                <div className="text-zinc-500 text-xs font-medium">Today</div>
                <Transaction
                  icon={<ArrowDownLeft className="w-4 h-4 text-emerald-500" />}
                  iconBg="bg-emerald-500/10"
                  title="Job Payment - Fashion..."
                  time="10:30 AM"
                  amount="+₦45,000"
                  status="Completed"
                  statusColor="text-emerald-500"
                />
                <Transaction
                  icon={<ArrowUpRight className="w-4 h-4 text-[#8b5cf6]" />}
                  iconBg="bg-[#8b5cf6]/10"
                  title="Savings Transfer"
                  time="9:15 AM"
                  amount="-₦5,000"
                  status="Completed"
                  statusColor="text-emerald-500"
                />
                
                <div className="text-zinc-500 text-xs font-medium mt-6">May 12</div>
                <Transaction
                  icon={<ArrowUpRight className="w-4 h-4 text-[#8b5cf6]" />}
                  iconBg="bg-[#8b5cf6]/10"
                  title="Withdrawal Request"
                  time="Yesterday"
                  amount="-₦20,000"
                  status="Pending"
                  statusColor="text-[#8b5cf6]"
                  statusIcon={<Clock className="w-3 h-3 mr-1" />}
                />

                <div className="text-zinc-500 text-xs font-medium mt-6">May 10</div>
                <Transaction
                  icon={<ArrowDownLeft className="w-4 h-4 text-emerald-500" />}
                  iconBg="bg-emerald-500/10"
                  title="Job Payment - Textile W"
                  time="2:45 PM"
                  amount="+₦38,000"
                  status="Completed"
                  statusColor="text-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TransactionProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  time: string;
  amount: string;
  status: string;
  statusColor: string;
  statusIcon?: React.ReactNode;
}

function Transaction({ icon, iconBg, title, time, amount, status, statusColor, statusIcon }: TransactionProps) {
  return (
    <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate mb-1">{title}</h4>
        <div className="text-zinc-500 text-xs">{time}</div>
      </div>
      <div className="text-right shrink-0">
        <div className={`font-medium text-sm mb-1 ${amount.startsWith('+') ? 'text-emerald-500' : 'text-zinc-600 dark:text-zinc-300'}`}>
          {amount}
        </div>
        <div className={`text-xs flex items-center justify-end ${statusColor}`}>
          {statusIcon || <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
          {status}
        </div>
      </div>
    </div>
  );
}
