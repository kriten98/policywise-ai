"use client";

import { Bell, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onAvatarClick: () => void;
  onChatOpen: () => void;
}

export function Header({ onAvatarClick, onChatOpen }: HeaderProps) {
  return (
    <header
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a5c41 0%, #2E7D5B 45%, #4CAF7D 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-10"
        style={{ background: "rgba(255,255,255,0.3)" }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />

      <div className="relative z-10 px-4 pt-12 pb-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo + Name */}
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L4 6V12C4 16.42 7.46 20.55 12 22C16.54 20.55 20 16.42 20 12V6L12 2Z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight tracking-tight">
                PolicyWise AI
              </p>
              <p className="text-white/65 text-xs font-medium">
                Insurance Intelligence
              </p>
            </div>
          </motion.div>

          {/* Right actions */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Chat button */}
            <button
              onClick={onChatOpen}
              className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/25 transition-colors"
              aria-label="Open AI Chat"
            >
              <MessageCircle size={17} className="text-white" />
            </button>

            {/* Notifications */}
            <button
              className="relative w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/25 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={17} className="text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full border border-white/50" />
            </button>

            {/* Avatar */}
            <button
              onClick={onAvatarClick}
              className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white/30 hover:border-white/60 transition-colors"
              aria-label="Open profile"
            >
              <div className="w-full h-full bg-gradient-to-br from-emerald-300 to-teal-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RS</span>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Welcome row */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <p className="text-white/75 text-sm font-medium">Good morning, Rajesh 👋</p>
          <p className="text-white text-xl font-semibold mt-0.5">
            Your Policy Dashboard
          </p>
        </motion.div>
      </div>
    </header>
  );
}
