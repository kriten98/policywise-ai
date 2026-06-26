import type {
  PolicyData,
  ClaimRisk,
  CoverageItem,
  HealthScoreBreakdown,
  SuggestionChip,
  ChartDataPoint,
} from "@/types";

export const policyData: PolicyData = {
  id: "POL-2024-SH-00192",
  insurer: "Star Health Insurance",
  policyType: "Family Floater",
  policyNumber: "P/211211/01/2024/019283",
  holderName: "Rajesh Sharma",
  expiryDate: "15 Mar 2026",
  daysLeft: 245,
  sumInsured: 1000000,
  usedAmount: 0,
  claimRisk: "MEDIUM",
  claimRiskReason: "Room rent cap detected",
  healthScore: 82,
  healthScoreLabel: "Good Protection",
  roomRentLimit: 5000,
  icuCovered: true,
  coPay: 10,
  waitingPeriodYears: 2,
};

export const claimRisks: ClaimRisk[] = [
  {
    id: "risk-1",
    title: "Room Rent Capped at ₹5,000/day",
    severity: "high",
    shortDescription:
      "Choosing a higher room category triggers deductions across all bills.",
    fullExplanation:
      "Your policy caps room rent at ₹5,000 per day. If you choose a room that costs more — say ₹8,000/day — the insurer applies a proportionate deduction across almost all hospital expenses (doctor fees, nursing charges, OT charges). A 60% room rent breach can reduce your total claim payout by 30–40%, even if your sum insured is untouched.",
    impact: "Can reduce total claim by 30–40%",
    category: "Room Rent",
  },
  {
    id: "risk-2",
    title: "Proportionate Deduction Applicable",
    severity: "high",
    shortDescription:
      "Exceeding any sub-limit proportionally reduces all related expenses.",
    fullExplanation:
      "This clause means the insurer doesn't just cut the excess — it recalculates your entire claim proportionately. If your room rent exceeds the cap, every ancillary charge (doctor visits, lab tests, nursing) is also reduced in the same ratio. This is one of the most misunderstood clauses and leads to the largest unexpected claim shortfalls.",
    impact: "Multiplies the impact of any sub-limit breach",
    category: "Deduction Clause",
  },
  {
    id: "risk-3",
    title: "Cataract Treatment Capped at ₹40,000",
    severity: "medium",
    shortDescription:
      "Both eyes combined are capped. Modern phaco surgery often costs more.",
    fullExplanation:
      "Cataract surgery using modern phacoemulsification technique at a mid-range hospital in metros can cost ₹50,000–₹80,000 per eye. Your policy allows ₹40,000 total (both eyes combined), which means you'd pay the difference out-of-pocket. Plan for a top-up or choose a network hospital with negotiated rates.",
    impact: "Out-of-pocket gap of ₹20,000–₹80,000",
    category: "Sub-limit",
  },
  {
    id: "risk-4",
    title: "Knee Replacement Capped at ₹1,00,000",
    severity: "medium",
    shortDescription:
      "Actual cost is ₹2–4 lakh. Significant out-of-pocket exposure.",
    fullExplanation:
      "Total knee replacement surgery in a private hospital costs ₹2,00,000 to ₹4,00,000 per knee, including implants, OT charges, and physiotherapy. Your policy sub-limit of ₹1,00,000 means you'd bear 50–75% of the actual cost. Consider a top-up policy if anyone in your family is at risk for joint conditions.",
    impact: "Out-of-pocket gap of ₹1–3 lakh per knee",
    category: "Sub-limit",
  },
  {
    id: "risk-5",
    title: "2-Year Waiting Period Active",
    severity: "low",
    shortDescription:
      "Pre-existing diseases not covered until March 2026 completion.",
    fullExplanation:
      "Your policy has a 2-year waiting period for pre-existing diseases (PEDs) that started when the policy was issued. This means any condition you had before buying the policy — diabetes, hypertension, thyroid disorders — will not be covered for claims filed before the waiting period expires. Your waiting period ends around March 2026, aligning with your renewal date.",
    impact: "PED claims rejected until Mar 2026",
    category: "Waiting Period",
  },
];

export const coverageItems: CoverageItem[] = [
  { id: "cov-1", label: "ICU Charges", covered: true },
  { id: "cov-2", label: "Ambulance (up to ₹2,000)", covered: true },
  { id: "cov-3", label: "Day Care Procedures", covered: true, notes: "540+ listed" },
  { id: "cov-4", label: "Organ Donor Expenses", covered: true },
  { id: "cov-5", label: "AYUSH Treatments", covered: true, notes: "Ayurveda, Yoga, Unani" },
  { id: "cov-6", label: "Pre & Post Hospitalisation", covered: true, notes: "30 & 60 days" },
  { id: "cov-7", label: "Cosmetic Surgery", covered: false },
  { id: "cov-8", label: "Dental Procedures", covered: false, notes: "Unless accidental" },
  { id: "cov-9", label: "Experimental Treatments", covered: false },
  { id: "cov-10", label: "Self-inflicted Injuries", covered: false },
];

export const healthScoreBreakdown: HealthScoreBreakdown[] = [
  {
    label: "Coverage Quality",
    score: 88,
    maxScore: 100,
    color: "#2E7D5B",
  },
  {
    label: "Claim Friendliness",
    score: 72,
    maxScore: 100,
    color: "#4CAF7D",
  },
  {
    label: "Risk Exposure",
    score: 65,
    maxScore: 100,
    color: "#F59E0B",
  },
];

export const suggestionChips: SuggestionChip[] = [
  {
    id: "chip-1",
    label: "What is my room rent limit?",
    query: "What is my room rent limit?",
    response:
      "Your policy allows a maximum room rent of **₹5,000 per day** for a normal ward. Here's what you need to know:\n\n• **Normal ward**: ₹5,000/day\n• **ICU**: Covered fully (no sub-limit)\n• **Single AC Room**: Not recommended — will trigger proportionate deduction\n\n⚠️ **Important**: If you choose a room above ₹5,000/day, Star Health will apply proportionate deduction — reducing ALL your hospital expenses (doctor fees, nursing, OT, medicines) in the same ratio. Always ask the hospital for the eligible room category before admission.",
  },
  {
    id: "chip-2",
    label: "Explain proportionate deduction",
    query: "Explain proportionate deduction in simple terms",
    response:
      "Proportionate deduction is one of the most important clauses in your policy. Here's a simple example:\n\n**Your room rent cap**: ₹5,000/day\n**You choose a room at**: ₹8,000/day\n**Breach ratio**: 5,000 ÷ 8,000 = 62.5%\n\nNow the insurer applies this ratio to ALL your expenses:\n• Doctor fees of ₹20,000 → Insurer pays only ₹12,500\n• Nursing charges of ₹10,000 → Insurer pays only ₹6,250\n• OT charges of ₹50,000 → Insurer pays only ₹31,250\n\n**Total loss**: You could lose 37.5% of your entire claim just because of room selection. Always choose a room within the limit.",
  },
  {
    id: "chip-3",
    label: "Am I covered for ICU?",
    query: "Am I covered for ICU charges?",
    response:
      "✅ **Yes, ICU charges are fully covered** under your Star Health Family Floater policy.\n\nKey details:\n• **No sub-limit** on ICU room charges\n• ICU charges are covered up to your sum insured of ₹10,00,000\n• Doctor visit charges in ICU are also covered\n• Monitoring equipment charges are included\n\n💡 **Good news**: Even if the ICU costs ₹25,000/day, you won't face proportionate deduction on ICU stays — the room rent cap applies only to normal ward rooms. This is a valuable benefit in your policy.",
  },
  {
    id: "chip-4",
    label: "What diseases have sub-limits?",
    query: "What diseases or treatments have sub-limits in my policy?",
    response:
      "Your policy has the following sub-limits that cap payouts for specific conditions:\n\n| Treatment | Sub-limit |\n|-----------|----------|\n| Cataract (both eyes) | ₹40,000 |\n| Knee Replacement | ₹1,00,000/knee |\n| Hip Replacement | ₹1,00,000/hip |\n| Hernia | ₹60,000 |\n| Piles/Fissure/Fistula | ₹30,000 |\n| Varicose Veins | ₹30,000 |\n| Skin Disorders | ₹25,000 |\n\n⚠️ These sub-limits apply regardless of your total sum insured of ₹10,00,000. Plan accordingly if any family member may need these treatments.",
  },
  {
    id: "chip-5",
    label: "What is my waiting period?",
    query: "What is the waiting period in my policy?",
    response:
      "Your policy has the following waiting periods:\n\n**1. Initial Waiting Period**: 30 days\n• No claims for any illness in first 30 days\n• Accidents are covered from Day 1\n\n**2. Pre-existing Disease (PED) Waiting Period**: 2 Years\n• Conditions like diabetes, hypertension, thyroid disorders not covered\n• Your PED period ends: ~March 2026\n• After that, all pre-existing conditions are fully covered\n\n**3. Specific Disease Waiting Period**: 2 Years\n• Applies to: Cataract, Hernia, Kidney Stones, Joint Replacements, etc.\n• These are covered after 2 years from policy start\n\n📅 You are approaching the end of your waiting periods — plan any elective procedures accordingly.",
  },
  {
    id: "chip-6",
    label: "Am I covered for 3-day hospitalization?",
    query: "Am I covered if I'm hospitalized for 3 days?",
    response:
      "✅ **Yes, a 3-day hospitalization is covered** under your policy.\n\nRequirements met for coverage:\n• **Minimum stay**: Your policy requires at least 24 hours of continuous hospitalization ✓\n• **3 days** clearly exceeds this threshold ✓\n\nWhat gets covered during a 3-day stay:\n• Room rent: Up to ₹5,000/day → ₹15,000 covered\n• Doctor visits and consultations\n• Nursing charges\n• Medicines and consumables\n• Diagnostic tests (if related to the condition)\n• Pre-hospitalization (30 days before admission)\n• Post-hospitalization (60 days after discharge)\n\n💡 **Tip**: Always get cashless pre-authorization before planned admissions. For emergencies, inform Star Health within 24 hours of admission.",
  },
];

export const coverageDistributionData: ChartDataPoint[] = [
  { name: "Hospitalization", value: 55, color: "#2E7D5B" },
  { name: "Pre/Post Hospital", value: 15, color: "#4CAF7D" },
  { name: "Day Care", value: 12, color: "#86efac" },
  { name: "Critical Illness", value: 10, color: "#F59E0B" },
  { name: "AYUSH", value: 5, color: "#6366f1" },
  { name: "Others", value: 3, color: "#e2e8f0" },
];

export const riskFactorData = [
  { name: "Room Rent Cap", risk: 85, fill: "#EF4444" },
  { name: "Proportionate Ded.", risk: 80, fill: "#EF4444" },
  { name: "Cataract Limit", risk: 60, fill: "#F59E0B" },
  { name: "Waiting Period", risk: 45, fill: "#F59E0B" },
  { name: "Co-payment", risk: 35, fill: "#4CAF7D" },
  { name: "Knee Replacement", risk: 70, fill: "#F59E0B" },
];

export const benefitCategoryData = [
  { name: "Inpatient Care", covered: 95, label: "₹9.5L" },
  { name: "Day Care", covered: 80, label: "₹8L" },
  { name: "AYUSH", covered: 30, label: "₹3L" },
  { name: "Ambulance", covered: 2, label: "₹2,000" },
  { name: "Organ Donor", covered: 50, label: "₹5L" },
];
