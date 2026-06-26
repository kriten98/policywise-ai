# PolicyWise AI

> AI-powered Health Insurance Intelligence Platform

A production-ready Next.js 15 dashboard that helps users understand their health insurance policies, detect claim risks, and get AI-powered guidance before hospitalization.

## Features

- **Policy Dashboard** — Instant overview of insurer, expiry, sum insured, and claim risk
- **Claim Reduction Intelligence** — Identifies policy clauses that may reduce claim payouts
- **AI Insurance Assistant** — Chat interface with pre-loaded policy context
- **Policy Health Score** — Radial gauge scoring coverage quality, claim friendliness, and risk
- **Analytics** — Coverage distribution pie chart, risk factor bar chart, and benefit category bars
- **Upload Flow** — Drag-and-drop PDF upload with simulated AI processing stages
- **Profile Sidebar** — Slide-out navigation drawer

## Tech Stack

- **Next.js 15** — App Router, TypeScript
- **TailwindCSS** — Utility-first styling with custom design tokens
- **Framer Motion** — Page transitions and micro-animations
- **Recharts** — Data visualization
- **Lucide React** — Icon system

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design System

| Token | Value |
|-------|-------|
| Primary Green | `#2E7D5B` |
| Accent Green | `#4CAF7D` |
| Background | `#F6F8F7` |
| Card | `#FFFFFF` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Border Radius | `20px+` |

## Project Structure

```
policywise-ai/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat/
│   │   └── ai-chat.tsx
│   ├── dashboard/
│   │   ├── analytics-section.tsx
│   │   ├── claim-reduction-section.tsx
│   │   ├── overview-cards.tsx
│   │   ├── policy-health-score.tsx
│   │   ├── policy-snapshot.tsx
│   │   └── risk-card.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   └── profile-sidebar.tsx
│   └── upload/
│       └── upload-modal.tsx
├── lib/
│   ├── mock-data.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Mock Policy Data

The app ships with a realistic Star Health Family Floater policy:

- **Insurer**: Star Health Insurance
- **Policy Type**: Family Floater
- **Sum Insured**: ₹10,00,000
- **Expiry**: 15 Mar 2026
- **Room Rent Cap**: ₹5,000/day
- **Co-pay**: 10%
- **Waiting Period**: 2 years
- **Claim Risk**: MEDIUM
- **Health Score**: 82/100
