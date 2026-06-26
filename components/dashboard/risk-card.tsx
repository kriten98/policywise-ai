"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertTriangle, Info, CheckCircle } from "lucide-react";
import type { ClaimRisk } from "@/types";
import { getSeverityBadgeClass } from "@/lib/utils";

interface RiskCardProps {
  risk: ClaimRisk;
  index: number;
}

const severityIcons = {
  high: AlertTriangle,
  medium: Info,
  low: CheckCircle,
};

const severityColors = {
  high: {
    border: "border-red-100",
    icon: "text-red-500",
    bg: "bg-red-50",
    dot: "bg-red-500",
    label: "HIGH RISK",
  },
  medium: {
    border: "border-amber-100",
    icon: "text-amber-500",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
    label: "MEDIUM",
  },
  low: {
    border: "border-green-100",
    icon: "text-green-500",
    bg: "bg-green-50",
    dot: "bg-green-500",
    label: "LOW",
  },
};

export function RiskCard({ risk, index }: RiskCardProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const colors = severityColors[risk.severity];
  const Icon = severityIcons[risk.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className={`bg-white rounded-2xl border ${colors.border} shadow-card overflow-hidden`}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left"
      >
        <div className="px-4 py-4 flex items-start gap-3">
          {/* Icon */}
          <div
            className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
          >
            <Icon size={17} className={colors.icon} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${getSeverityBadgeClass(risk.severity)}`}
              >
                {colors.label}
              </span>
              <span className="text-xs text-gray-400">{risk.category}</span>
            </div>
            <p className="text-gray-900 font-semibold text-sm leading-snug">
              ⚠ {risk.title}
            </p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">
              {risk.shortDescription}
            </p>
          </div>

          {/* Expand chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown size={16} className="text-gray-400" />
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`mx-4 mb-4 p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
              {/* AI explanation */}
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">AI</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  AI Explanation
                </span>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                {risk.fullExplanation}
              </p>

              {/* Impact badge */}
              <div className="mt-3 flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Potential impact:</span>
                <span
                  className={`text-xs font-semibold ${getSeverityBadgeClass(risk.severity)} px-2 py-0.5 rounded-full`}
                >
                  {risk.impact}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
