"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown } from "lucide-react";
import { claimRisks } from "@/lib/mock-data";
import { RiskCard } from "./risk-card";

export function ClaimReductionSection() {
  const highCount = claimRisks.filter((r) => r.severity === "high").length;
  const mediumCount = claimRisks.filter((r) => r.severity === "medium").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
            <TrendingDown size={15} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-gray-900 font-bold text-base leading-tight">
              Potential Claim Reductions
            </h2>
            <p className="text-gray-400 text-xs">
              Clauses that may reduce your payout
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {highCount > 0 && (
            <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              {highCount} HIGH
            </span>
          )}
          {mediumCount > 0 && (
            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
              {mediumCount} MED
            </span>
          )}
        </div>
      </div>

      {/* Alert banner */}
      <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 flex items-start gap-3 mb-3">
        <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-800 font-semibold text-sm">
            Action Required Before Hospitalization
          </p>
          <p className="text-red-600 text-xs mt-0.5 leading-relaxed">
            {highCount} critical clause{highCount !== 1 ? "s" : ""} detected that could significantly reduce your claim payout. Review each risk before admission.
          </p>
        </div>
      </div>

      {/* Risk cards */}
      <div className="space-y-3">
        {claimRisks.map((risk, i) => (
          <RiskCard key={risk.id} risk={risk} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-gray-400 text-xs mt-3 px-4">
        💡 Ask the AI Assistant below to understand any of these risks better
      </p>
    </motion.div>
  );
}
