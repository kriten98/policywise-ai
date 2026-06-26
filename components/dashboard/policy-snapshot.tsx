"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, FileText } from "lucide-react";
import { coverageItems } from "@/lib/mock-data";

export function PolicySnapshot() {
  const covered = coverageItems.filter((i) => i.covered);
  const notCovered = coverageItems.filter((i) => !i.covered);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-white rounded-2xl shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-50 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
          <FileText size={16} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-gray-900 font-bold text-base">Policy Snapshot</h2>
          <p className="text-gray-400 text-xs">What&apos;s in and out of coverage</p>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Covered */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                Covered
              </span>
            </div>
            <ul className="space-y-2">
              {covered.map((item) => (
                <li key={item.id} className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-gray-800 text-xs font-medium leading-tight">
                      {item.label}
                    </p>
                    {item.notes && (
                      <p className="text-gray-400 text-[10px] mt-0.5">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Covered */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                Excluded
              </span>
            </div>
            <ul className="space-y-2">
              {notCovered.map((item) => (
                <li key={item.id} className="flex items-start gap-2">
                  <XCircle
                    size={14}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-gray-800 text-xs font-medium leading-tight">
                      {item.label}
                    </p>
                    {item.notes && (
                      <p className="text-gray-400 text-[10px] mt-0.5">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Policy number */}
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
          <span className="text-gray-400 text-xs">Policy No.</span>
          <span className="text-gray-600 text-xs font-mono font-medium">
            P/211211/01/2024/019283
          </span>
        </div>
      </div>
    </motion.div>
  );
}
