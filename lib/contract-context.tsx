"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AnalysisResult,
  ComparisonResult,
  ContractType,
  ChatMessage,
  CounterProposal,
  LawyerBrief,
} from "./types";
import {
  SAMPLE_CONTRACTS,
  SAMPLE_COMPARISON_PAIR,
  SampleContract,
} from "./contracts-data";
import {
  analyzeContractText,
  compareContracts,
  chatWithContract,
  generateCounterProposal,
  generateLawyerBrief,
} from "./gemini";
import { useAuth } from "./auth-context";

export type StudioTab =
  | "scanner"
  | "compare"
  | "chat"
  | "negotiate"
  | "handoff"
  | "checklist";

interface ContractContextType {
  // State
  activeContract: SampleContract | null;
  customContractText: string;
  contractTitle: string;
  contractType: ContractType;
  analysisResult: AnalysisResult | null;
  comparisonResult: ComparisonResult | null;
  activeTab: StudioTab;
  isAnalyzing: boolean;
  isComparing: boolean;
  isChatting: boolean;
  chatHistory: ChatMessage[];
  counterProposals: Record<string, CounterProposal>;
  lawyerBrief: LawyerBrief | null;

  // Actions
  selectPresetContract: (contractId: string) => void;
  setCustomText: (text: string, title?: string, type?: ContractType) => void;
  setActiveTab: (tab: StudioTab) => void;
  runAnalysis: (
    overrideText?: string,
    overrideType?: ContractType,
  ) => Promise<void>;
  runComparison: (
    textA?: string,
    textB?: string,
    titleA?: string,
    titleB?: string,
  ) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  generateCounterForClause: (
    clauseId: string,
    clauseTitle: string,
    originalText: string,
    goal?: string,
  ) => Promise<CounterProposal>;
  toggleChecklistItem: (itemId: string) => void;
  resetWorkspace: () => void;
}

const ContractContext = createContext<ContractContextType | undefined>(
  undefined,
);

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // Active document state
  const [activeContract, setActiveContract] = useState<SampleContract | null>(
    SAMPLE_CONTRACTS[0],
  );
  const [customContractText, setCustomContractText] = useState<string>(
    SAMPLE_CONTRACTS[0].text,
  );
  const [contractTitle, setContractTitle] = useState<string>(
    SAMPLE_CONTRACTS[0].title,
  );
  const [contractType, setContractType] = useState<ContractType>(
    SAMPLE_CONTRACTS[0].type,
  );

  // Intelligence results
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    SAMPLE_CONTRACTS[0].precomputedAnalysis,
  );
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(SAMPLE_COMPARISON_PAIR.precomputedDiff);
  const [counterProposals, setCounterProposals] = useState<
    Record<string, CounterProposal>
  >({});
  const [lawyerBrief, setLawyerBrief] = useState<LawyerBrief | null>(null);

  // Studio UI state
  const [activeTab, setActiveTab] = useState<StudioTab>("scanner");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [isChatting, setIsChatting] = useState<boolean>(false);

  // Grounded Chat state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "initial-msg",
      role: "assistant",
      content:
        "Hello! I am your Grounded Legal Copilot. Ask me any question regarding this agreement (e.g. 'Can I work side jobs?', 'What are my liabilities?'), and I will provide answers with exact clause citations.",
      timestamp: "Just now",
    },
  ]);

  // Load attorney brief whenever analysisResult changes
  useEffect(() => {
    if (analysisResult) {
      generateLawyerBrief(contractTitle, user?.role || "Client", analysisResult)
        .then(setLawyerBrief)
        .catch(console.warn);
    }
  }, [analysisResult, contractTitle, user?.role]);

  // Select Preset Contract
  const selectPresetContract = (contractId: string) => {
    const found =
      SAMPLE_CONTRACTS.find((c) => c.id === contractId) || SAMPLE_CONTRACTS[0];
    setActiveContract(found);
    setCustomContractText(found.text);
    setContractTitle(found.title);
    setContractType(found.type);
    setAnalysisResult(found.precomputedAnalysis);
    setChatHistory([
      {
        id: "msg-" + Date.now(),
        role: "assistant",
        content: `Loaded ${found.title}. Ready to answer questions or generate counter-clauses.`,
        timestamp: "Just now",
      },
    ]);
  };

  // Set Custom Input (Live typing or file upload)
  const setCustomText = (text: string, title?: string, type?: ContractType) => {
    setActiveContract(null);
    setCustomContractText(text);
    if (title) setContractTitle(title);
    if (type) setContractType(type);
  };

  // Run Analysis on active text
  const runAnalysis = async (
    overrideText?: string,
    overrideType?: ContractType,
  ) => {
    const textToScan = overrideText || customContractText;
    const typeToScan = overrideType || contractType;
    setIsAnalyzing(true);
    try {
      const result = await analyzeContractText(
        textToScan,
        typeToScan,
        contractTitle,
      );
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis execution failed:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run Bilateral Comparison
  const runComparison = async (
    textA?: string,
    textB?: string,
    titleA?: string,
    titleB?: string,
  ) => {
    setIsComparing(true);
    try {
      const contractA = textA || SAMPLE_COMPARISON_PAIR.contractA;
      const contractB = textB || SAMPLE_COMPARISON_PAIR.contractB;
      const res = await compareContracts(
        contractA,
        contractB,
        titleA || SAMPLE_COMPARISON_PAIR.titleA,
        titleB || SAMPLE_COMPARISON_PAIR.titleB,
      );
      setComparisonResult(res);
    } catch (err) {
      console.error("Comparison failed:", err);
    } finally {
      setIsComparing(false);
    }
  };

  // Send message in Grounded Chat
  const sendMessage = async (userQuery: string) => {
    if (!userQuery.trim()) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: userQuery.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const newHistory = [...chatHistory, userMsg];
    setChatHistory(newHistory);
    setIsChatting(true);

    try {
      const assistantMsg = await chatWithContract(
        customContractText,
        newHistory,
        userQuery,
      );
      setChatHistory((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsChatting(false);
    }
  };

  // Generate Counter-Draft
  const generateCounterForClause = async (
    clauseId: string,
    clauseTitle: string,
    originalText: string,
    goal: string = "Make it fair, mutual, and standard",
  ): Promise<CounterProposal> => {
    if (counterProposals[clauseId]) {
      return counterProposals[clauseId];
    }
    const proposal = await generateCounterProposal(
      clauseTitle,
      originalText,
      goal,
    );
    setCounterProposals((prev) => ({ ...prev, [clauseId]: proposal }));
    return proposal;
  };

  // Toggle checklist item
  const toggleChecklistItem = (itemId: string) => {
    if (!analysisResult) return;
    setAnalysisResult((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        actionChecklist: prev.actionChecklist.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item,
        ),
      };
    });
  };

  // Reset workspace
  const resetWorkspace = () => {
    selectPresetContract(SAMPLE_CONTRACTS[0].id);
    setActiveTab("scanner");
  };

  return (
    <ContractContext.Provider
      value={{
        activeContract,
        customContractText,
        contractTitle,
        contractType,
        analysisResult,
        comparisonResult,
        activeTab,
        isAnalyzing,
        isComparing,
        isChatting,
        chatHistory,
        counterProposals,
        lawyerBrief,
        selectPresetContract,
        setCustomText,
        setActiveTab,
        runAnalysis,
        runComparison,
        sendMessage,
        generateCounterForClause,
        toggleChecklistItem,
        resetWorkspace,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
}
