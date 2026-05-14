import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Wallet, Shield, User, X } from "lucide-react";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export function MenuDrawer({ isOpen, onClose, onNavigate }: MenuDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 z-40"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="absolute top-0 bottom-0 left-0 w-[280px] bg-zinc-50 dark:bg-[#18181b] z-50 flex flex-col border-r border-zinc-200 dark:border-zinc-800"
          >
            <div className="p-6 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800/50">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Menu</h2>
              <button onClick={onClose} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 py-4 space-y-1">
              <MenuItem
                icon={<Home className="w-5 h-5" />}
                label="Home"
                onClick={() => { onNavigate("dashboard"); onClose(); }}
              />
              <MenuItem
                icon={<Briefcase className="w-5 h-5" />}
                label="Opportunities"
                onClick={() => { onClose(); }}
              />
              <MenuItem
                icon={<Wallet className="w-5 h-5" />}
                label="Wallet"
                onClick={() => { onNavigate("wallet"); onClose(); }}
              />
              <MenuItem
                icon={<Shield className="w-5 h-5" />}
                label="Trust"
                onClick={() => { onClose(); }}
              />
              <MenuItem
                icon={<User className="w-5 h-5" />}
                label="Profile"
                onClick={() => { onClose(); }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-6 py-4 text-left text-zinc-900 dark:text-white hover:bg-zinc-200 dark:bg-zinc-800/50 transition-colors"
    >
      <div className="text-[#8b5cf6]">{icon}</div>
      <span className="font-medium text-lg">{label}</span>
    </button>
  );
}
