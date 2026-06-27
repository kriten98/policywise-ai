"use client";

import { motion } from "framer-motion";
import { policyData, healthScoreBreakdown } from "@/lib/mock-data";
import { getScoreColor } from "@/lib/utils";

function RadialGauge({ score }: { score: number }) {
  const radius = 52;
  const cx = 70;
  const cy = 70;
  const startAngle = -220;
  const endAngle = 40;
  const totalAngle = endAngle - startAngle;
  const progressAngle = startAngle + (score / 100) * totalAngle;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (start: number, end: number) => {
    const x1 = cx + radius * Math.cos(toRad(start));
    const y1 = cy + radius * Math.sin(toRad(start));
    const x2 = cx + radius * Math.cos(toRad(end));
    const y2 = cy + radius * Math.sin(toRad(end));
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const needleX = cx + (radius - 8) * Math.cos(toRad(progressAngle));
  const needleY = cy + (radius - 8) * Math.sin(toRad(progressAngle));
  const scoreColor = getScoreColor(score);

  return (
    <svg width="140" height="100" viewBox="0 0 140 100">
      {/* Background arc */}
      <path
        d={arcPath(startAngle, endAngle)}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Zone arcs */}
      <path
        d={arcPath(startAngle, startAngle + totalAngle * 0.33)}
        fill="none"
        stroke="#FEE2E2"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d={arcPath(startAngle + totalAngle * 0.33, startAngle + totalAngle * 0.66)}
        fill="none"
        stroke="#FEF3C7"
        strokeWidth="10"
      />
      <path
        d={arcPath(startAngle + totalAngle * 0.66, endAngle)}
        fill="none"
        stroke="#D1FAE5"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Progress arc */}
      <motion.path
        d={arcPath(startAngle, progressAngle)}
        fill="none"
        stroke={scoreColor}
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />

      {/* Dot indicator */}
      <motion.circle
        cx={needleX}
        cy={needleY}
        r="5"
        fill={scoreColor}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
      />

      {/* Score text */}
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fontSize="22"
        fontWeight="800"
        fill={scoreColor}
      >
        {score}
      </text>
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fontSize="9"
        fill="#9ca3af"
        fontWeight="500"
      >
        out of 100
      </text>


    </svg>
  );
}

export function PolicyHealthScore() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-card overflow-hidden"
    >
      {/* Header */}
      <div
        className="px-4 py-4"
        style={{
          background: "linear-gradient(135deg, #f0faf5 0%, #e8f5ee 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 font-bold text-base">
              Policy Health Score
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              AI-assessed coverage quality
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
            {policyData.healthScoreLabel}
          </span>
        </div>

        {/* Gauge */}
        <div className="flex justify-center mt-2">
          <RadialGauge score={policyData.healthScore} />
        </div>
      </div>

      {/* Breakdown */}
      <div className="px-4 py-4 space-y-3">
        {healthScoreBreakdown.map((item, i) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-gray-600 text-xs font-medium">
                {item.label}
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: item.color }}
              >
                {item.score}/100
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-4 pb-4">
        <p className="text-xs text-gray-400 text-center bg-gray-50 rounded-xl px-3 py-2">
          Score improves when you upgrade room rent limit or remove co-pay
        </p>
      </div>
    </motion.div>
  );
}
