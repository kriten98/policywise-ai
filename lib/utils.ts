import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatCurrencyFull(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getRiskColor(risk: "LOW" | "MEDIUM" | "HIGH"): string {
  switch (risk) {
    case "LOW":
      return "#22C55E";
    case "MEDIUM":
      return "#F59E0B";
    case "HIGH":
      return "#EF4444";
    default:
      return "#6b7280";
  }
}

export function getRiskBgClass(risk: "LOW" | "MEDIUM" | "HIGH"): string {
  switch (risk) {
    case "LOW":
      return "bg-green-50 text-green-700 border-green-200";
    case "MEDIUM":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "HIGH":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export function getSeverityColor(
  severity: "high" | "medium" | "low"
): string {
  switch (severity) {
    case "high":
      return "#EF4444";
    case "medium":
      return "#F59E0B";
    case "low":
      return "#22C55E";
    default:
      return "#6b7280";
  }
}

export function getSeverityBadgeClass(
  severity: "high" | "medium" | "low"
): string {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-amber-100 text-amber-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}
