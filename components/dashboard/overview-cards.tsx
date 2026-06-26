"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, ShieldCheck, AlertTriangle } from "lucide-react";
import { policyData } from "@/lib/mock-data";
import {
  formatCurrencyFull,
  getRiskColor,
  getRiskBgClass,
} from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" },
  }),
};

export function OverviewCards() {
  const utilizationPct = Math.round(
    (policyData.usedAmount / policyData.sumInsured) * 100
  );
  const circumference = 2 * Math.PI * 28;
  const strokeDash = ((100 - utilizationPct) / 100) * circumference;

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Card 1: Insurer */}
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl p-4 shadow-card col-span-1"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Building2 size={16} className="text-emerald-600" />
          </div>
          <span className="text-xs text-gray-400 font-medium">INSURER</span>
        </div>
        <p className="text-gray-900 font-bold text-sm leading-tight mt-2">
          {policyData.insurer}
        </p>
        <p className="text-gray-400 text-xs mt-1 font-medium">
          {policyData.policyType}
        </p>
      </motion.div>

      {/* Card 2: Expiry */}
      <motion.div
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl p-4 shadow-card col-span-1"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
            <Calendar size={16} className="text-blue-500" />
          </div>
          <span className="text-xs text-gray-400 font-medium">EXPIRY</span>
        </div>
        <p className="text-gray-900 font-bold text-sm leading-tight mt-2">
          {policyData.expiryDate}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <p className="text-amber-600 text-xs font-semibold">
            {policyData.daysLeft} days left
          </p>
        </div>
      </motion.div>

      {/* Card 3: Sum Insured */}
      <motion.div
        custom={2}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl p-4 shadow-card col-span-1"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
            <ShieldCheck size={16} className="text-purple-500" />
          </div>
          <span className="text-xs text-gray-400 font-medium">COVER</span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div>
            <p className="text-gray-900 font-bold text-sm leading-tight">
              ₹10,00,000
            </p>
            <p className="text-gray-400 text-xs mt-0.5 font-medium">
              {utilizationPct}% used
            </p>
          </div>
          {/* Circular ring */}
          <svg width="40" height="40" viewBox="0 0 64 64" className="-mr-1">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#2E7D5B"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${circumference - strokeDash} ${strokeDash}`}
              strokeDashoffset={circumference * 0.25}
              transform="rotate(-90 32 32)"
            />
            <text
              x="32"
              y="36"
              textAnchor="middle"
              fill="#2E7D5B"
              fontSize="14"
              fontWeight="700"
            >
              {utilizationPct === 0 ? "0" : utilizationPct}
            </text>
          </svg>
        </div>
      </motion.div>

      {/* Card 4: Claim Risk */}
      <motion.div
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl p-4 shadow-card col-span-1"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
            <AlertTriangle size={16} className="text-amber-500" />
          </div>
          <span className="text-xs text-gray-400 font-medium">RISK</span>
        </div>

        <div className="mt-1">
          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${getRiskBgClass(policyData.claimRisk)}`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: getRiskColor(policyData.claimRisk) }}
            />
            {policyData.claimRisk}
          </span>
          <p className="text-gray-500 text-xs mt-2 leading-tight">
            {policyData.claimRiskReason}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
