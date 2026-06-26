export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface PolicyData {
  id: string;
  insurer: string;
  policyType: string;
  policyNumber: string;
  holderName: string;
  expiryDate: string;
  daysLeft: number;
  sumInsured: number;
  usedAmount: number;
  claimRisk: RiskLevel;
  claimRiskReason: string;
  healthScore: number;
  healthScoreLabel: string;
  roomRentLimit: number;
  icuCovered: boolean;
  coPay: number;
  waitingPeriodYears: number;
}

export interface ClaimRisk {
  id: string;
  title: string;
  severity: "high" | "medium" | "low";
  shortDescription: string;
  fullExplanation: string;
  impact: string;
  category: string;
}

export interface CoverageItem {
  id: string;
  label: string;
  covered: boolean;
  notes?: string;
}

export interface HealthScoreBreakdown {
  label: string;
  score: number;
  maxScore: number;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface SuggestionChip {
  id: string;
  label: string;
  query: string;
  response: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface UploadState {
  stage:
    | "idle"
    | "preview"
    | "confirm"
    | "processing"
    | "complete"
    | "error";
  fileName?: string;
  fileSize?: number;
  progress: number;
  currentStep?: string;
}
