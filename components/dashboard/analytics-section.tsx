"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  coverageDistributionData,
  riskFactorData,
  benefitCategoryData,
} from "@/lib/mock-data";
import { BarChart2 } from "lucide-react";

export function AnalyticsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="space-y-3"
    >
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
          <BarChart2 size={15} className="text-blue-500" />
        </div>
        <h2 className="text-gray-900 font-bold text-base">Analytics</h2>
      </div>

      {/* Chart 1: Coverage Distribution */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <p className="text-gray-800 font-semibold text-sm mb-1">
          Coverage Distribution
        </p>
        <p className="text-gray-400 text-xs mb-4">How your ₹10L is allocated</p>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie
                data={coverageDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {coverageDistributionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex-1 space-y-1.5">
            {coverageDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600 text-xs flex-1 leading-tight">
                  {item.name}
                </span>
                <span className="text-gray-700 text-xs font-semibold">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 2: Risk Factors */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <p className="text-gray-800 font-semibold text-sm mb-1">Risk Factors</p>
        <p className="text-gray-400 text-xs mb-4">
          Risk score per clause (higher = more risk)
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            data={riskFactorData}
            layout="vertical"
            margin={{ left: 0, right: 8, top: 0, bottom: 0 }}
          >
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis
              type="category"
              dataKey="name"
              width={108}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [`${v}/100`, "Risk Score"]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #f1f5f9",
                fontSize: 12,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            />
            <Bar dataKey="risk" radius={[0, 6, 6, 0]} barSize={12}>
              {riskFactorData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Benefit Categories */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <p className="text-gray-800 font-semibold text-sm mb-1">
          Benefit Categories
        </p>
        <p className="text-gray-400 text-xs mb-4">
          Effective coverage per benefit type
        </p>
        <div className="space-y-3">
          {benefitCategoryData.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-xs font-medium">
                  {item.name}
                </span>
                <span className="text-gray-500 text-xs">{item.label}</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #2E7D5B, #4CAF7D)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.covered}%` }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
