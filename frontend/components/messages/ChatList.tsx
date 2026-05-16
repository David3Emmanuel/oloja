import React from "react";
import { ArrowLeft, MessageSquareText } from "lucide-react";
import { Chat } from "@/app/messages/types";

interface ChatListProps {
  allChats: Chat[];
  filter: "all" | "unread";
  setFilter: (f: "all" | "unread") => void;
  handleMarkAllRead: () => void;
  onBack: () => void;
  onChatClick: (chatId: string, jobTitle: string) => void;
}

export function ChatList({
  allChats,
  filter,
  setFilter,
  handleMarkAllRead,
  onBack,
  onChatClick
}: ChatListProps) {
  const displayedChats = allChats.filter(chat => filter === "all" || chat.unread);

  return (
    <div className="min-h-[100dvh] w-full bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-[#8b5cf6]/30 relative pb-10">
      <div className="flex-1 w-full h-full relative overflow-x-hidden">
        <div className="flex-1 flex flex-col h-full w-full max-w-2xl mx-auto">
          <header className="flex items-center gap-4 p-6 pb-4">
            <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold flex-1 text-center pr-8">Messages</h1>
          </header>

          <div className="flex items-center justify-between px-6 mb-6 border-b border-zinc-800/50 pb-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === "all" 
                    ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" 
                    : "bg-zinc-800/50 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter("unread")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === "unread" 
                    ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" 
                    : "bg-zinc-800/50 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Unread
              </button>
            </div>
            <button 
              onClick={handleMarkAllRead}
              className="text-emerald-500 text-sm font-medium hover:text-emerald-400 transition-colors"
            >
              Mark all as read
            </button>
          </div>

          {displayedChats.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-20">
              <div className="mb-6">
                <MessageSquareText className="w-32 h-32 text-[#8b5cf6]" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight">No Messages at<br/>this time.</h2>
              <p className="text-zinc-500 text-base max-w-[280px]">
                Clients who discover your profile<br/>can message you here
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto w-full no-scrollbar px-6 space-y-3">
              {displayedChats.map(chat => {
                const lastMsg = chat.messages[chat.messages.length - 1];
                return (
                  <div 
                    key={chat.id} 
                    onClick={() => onChatClick(chat.id, chat.jobTitle)}
                    className="bg-[#18181b] border border-zinc-800/50 rounded-[20px] p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] font-bold text-lg shrink-0">
                      {chat.recipientName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h3 className="font-semibold text-white text-[15px] truncate">{chat.recipientName}</h3>
                        <span className="text-[11px] text-zinc-500 shrink-0 mt-0.5">{lastMsg?.time}</span>
                      </div>
                      <p className="text-[11px] text-[#8b5cf6] mb-1 font-medium truncate">{chat.jobTitle}</p>
                      <p className={`text-sm truncate ${chat.unread ? 'text-white font-medium' : 'text-zinc-500'}`}>
                        {lastMsg?.text}
                      </p>
                    </div>
                    {chat.unread && (
                      <div className="flex flex-col items-end justify-center shrink-0 pl-2">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
