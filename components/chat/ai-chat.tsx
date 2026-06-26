"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ChevronDown,
  Bot,
  User,
  Sparkles,
} from "lucide-react";
import { suggestionChips } from "@/lib/mock-data";
import type { ChatMessage } from "@/types";
import { generateId } from "@/lib/utils";

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
        <Bot size={13} className="text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 pulse-dot" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 pulse-dot" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 pulse-dot" />
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>")
      .replace(/\|(.*?)\|/g, (match) => {
        const cells = match
          .split("|")
          .filter((c) => c.trim())
          .map((c) => `<td>${c.trim()}</td>`)
          .join("");
        return `<tr>${cells}</tr>`;
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 px-4 py-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5 ${
          isUser
            ? "bg-gradient-to-br from-emerald-400 to-teal-500"
            : "bg-gradient-to-br from-emerald-500 to-green-600"
        }`}
      >
        {isUser ? (
          <User size={13} className="text-white" />
        ) : (
          <Bot size={13} className="text-white" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed chat-content ${
          isUser
            ? "bg-emerald-600 text-white rounded-2xl rounded-br-sm"
            : "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm"
        }`}
        dangerouslySetInnerHTML={{
          __html: `<p>${formatContent(msg.content)}</p>`,
        }}
      />
    </motion.div>
  );
}

const WELCOME_MSG: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm your PolicyWise AI assistant. I've analyzed your Star Health Family Floater policy. Ask me anything about your coverage, claim risks, or what to do before hospitalization.",
  timestamp: new Date(),
};

export function AIChat({ isOpen, onToggle }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setChipsVisible(false);

    // Find matching chip response or generate generic
    const chip = suggestionChips.find(
      (c) =>
        c.query.toLowerCase() === text.trim().toLowerCase() ||
        c.label.toLowerCase() === text.trim().toLowerCase()
    );

    const responseText =
      chip?.response ||
      `I understand you're asking about "${text.trim()}". Based on your Star Health Family Floater policy:\n\n**Policy Details:**\n• Sum Insured: ₹10,00,000\n• Room Rent Cap: ₹5,000/day\n• ICU: Fully covered\n• Co-pay: 10%\n• Waiting Period: 2 years\n\nFor more specific information about this query, I recommend checking with Star Health's customer care at 1800-425-2255 or reviewing your policy document directly. Is there anything specific from your policy you'd like me to clarify?`;

    // Simulate typing delay
    const delay = Math.min(responseText.length * 12, 2500);
    await new Promise((r) => setTimeout(r, delay));

    setIsTyping(false);

    const aiMsg: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleChipClick = (chip: (typeof suggestionChips)[0]) => {
    sendMessage(chip.query);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 max-w-2xl mx-auto"
      style={{ touchAction: "none" }}
    >
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 380, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="bg-white border-t border-gray-100 overflow-hidden flex flex-col"
            style={{ boxShadow: "0 -8px 32px rgba(0,0,0,0.08)" }}
          >
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto py-3 min-h-0">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion chips */}
            <AnimatePresence>
              {chipsVisible && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="px-3 pb-2"
                >
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {suggestionChips.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => handleChipClick(chip)}
                        className="flex-shrink-0 text-xs font-medium px-3 py-2 rounded-full border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors whitespace-nowrap"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input row */}
            <div className="px-3 pb-safe-bottom pb-3 border-t border-gray-50 pt-2">
              <div className="flex items-end gap-2 bg-gray-50 rounded-2xl px-3 py-2.5 border border-gray-100">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your policy..."
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none leading-relaxed"
                  rows={1}
                  style={{ maxHeight: 80 }}
                  disabled={isTyping}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors"
                >
                  <Send size={14} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle bar */}
      <div
        className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 cursor-pointer"
        onClick={onToggle}
        style={{ boxShadow: isOpen ? "none" : "0 -4px 16px rgba(0,0,0,0.06)" }}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
          <Sparkles size={15} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-gray-900 font-semibold text-sm leading-tight">
            AI Insurance Assistant
          </p>
          <p className="text-gray-400 text-xs">
            Ask anything about your policy
          </p>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-gray-400" />
        </motion.div>
      </div>
    </div>
  );
}
