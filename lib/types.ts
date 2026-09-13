export type ContractType =
  | "freelance"
  | "employment"
  | "lease"
  | "nda"
  | "saas"
  | "general";

export type RiskSeverity = "critical" | "high" | "medium" | "low" | "safe";

export type ClauseCategory =
  | "Intellectual Property"
  | "Termination & Notice"
  | "Liability & Indemnity"
  | "Payment & Fees"
  | "Restrictive Covenants"
  | "Dispute Resolution"
  | "Privacy & Data"
  | "General";

export interface ClauseAnalysis {
  id: string;
  title: string;
  originalText: string;
  plainEnglish: string;
  riskLevel: RiskSeverity;
  category: ClauseCategory;
  explanation: string;
  predatoryFlag: boolean;
  recommendation: string;
  impactScore?: number; // 1 - 10
}

export interface ActionChecklistItem {
  id: string;
  task: string;
  priority: "high" | "medium" | "low";
  deadline?: string;
  category?: string;
  completed: boolean;
}

export interface AnalysisResult {
  contractTitle: string;
  contractType: ContractType;
  riskScore: number; // 0 (safest) to 100 (extreme danger)
  riskRating: "Low Risk" | "Moderate Risk" | "High Risk" | "Critical Risk";
  executiveSummary: string;
  keyRisks: string[];
  keyObligations: string[];
  predatoryCount: number;
  clauses: ClauseAnalysis[];
  fairnessBenchmark: string;
  actionChecklist: ActionChecklistItem[];
  readingTimeMinutes?: number;
  wordCount?: number;
  timestamp: string;
}

export interface ComparisonChange {
  id: string;
  category: string;
  clauseA: string;
  clauseB: string;
  difference: string;
  impact: "favorable_to_user" | "unfavorable_to_user" | "neutral";
  severity: "high" | "medium" | "low";
}

export interface ComparisonResult {
  titleA: string;
  titleB: string;
  summary: string;
  winner: "Contract A" | "Contract B" | "Neutral / Trade-offs";
  winnerReason: string;
  scoreA: number;
  scoreB: number;
  changes: ComparisonChange[];
  keyTakeaway: string;
}

export interface CounterProposal {
  clauseId: string;
  clauseTitle: string;
  originalText: string;
  balancedOption: string;
  userFavorableOption: string;
  lightweightOption: string;
  rationale: string;
  emailDraft: string;
}

export interface LawyerBrief {
  contractTitle: string;
  clientPersona: string;
  overview: string;
  topRedFlags: {
    title: string;
    clauseRef: string;
    concern: string;
    suggestedQuestion: string;
  }[];
  keyDatesAndDeadlines: string[];
  prioritizedAttorneyQuestions: string[];
  consultationGoal: string;
  estimatedHoursSaved?: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  citations?: {
    clauseTitle: string;
    quote: string;
  }[];
  timestamp: string;
}

export interface UserPersona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  scenario: string;
  suggestedContractId: string;
}
