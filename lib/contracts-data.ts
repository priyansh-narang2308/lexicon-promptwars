import {
  AnalysisResult,
  ComparisonResult,
  ContractType,
  UserPersona,
} from "./types";

export interface SampleContract {
  id: string;
  title: string;
  type: ContractType;
  description: string;
  targetRole: string;
  text: string;
  precomputedAnalysis: AnalysisResult;
}

export const USER_PERSONAS: UserPersona[] = [
  {
    id: "persona-freelancer",
    name: "Alex Chen",
    role: "Freelance Product Designer",
    avatar: "🎨",
    scenario:
      "Reviewing an independent contractor agreement with a corporate client.",
    suggestedContractId: "freelance-predatory",
  },
  {
    id: "persona-tenant",
    name: "Sarah Jenkins",
    role: "Apartment Renter & Student",
    avatar: "🏠",
    scenario:
      "Evaluating a 12-month residential lease with suspicious repair charges.",
    suggestedContractId: "residential-lease",
  },
  {
    id: "persona-employee",
    name: "David Kumar",
    role: "Senior Software Engineer",
    avatar: "💻",
    scenario:
      "Navigating a startup employment offer with restrictive IP terms.",
    suggestedContractId: "tech-employment",
  },
  {
    id: "persona-founder",
    name: "Marcus Vance",
    role: "Startup Founder & IT Buyer",
    avatar: "🏢",
    scenario:
      "Negotiating an enterprise SaaS agreement with AI data training risks.",
    suggestedContractId: "saas-msa",
  },
];

export const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    id: "freelance-predatory",
    title: "Independent Contractor & Design Agreement",
    type: "freelance",
    description:
      "A seemingly standard design contract packed with predatory non-compete terms, delayed payment traps, and unlimited IP assignment.",
    targetRole: "Freelancers, Creators & Agencies",
    text: `INDEPENDENT CONTRACTOR SERVICES AGREEMENT

This Agreement is made between Apex Global Media LLC ("Client") and the undersigned independent specialist ("Contractor").

1. SCOPE OF SERVICES & REVISIONS
Contractor agrees to provide UI/UX design, brand identity, and front-end implementation assets as directed by Client. Contractor agrees to perform unlimited revisions at no additional charge until Client provides final written satisfaction.

2. COMPENSATION & PAYMENT TERMS
Client shall compensate Contractor a fixed fee upon full delivery of all approved deliverables. Payments shall be disbursed on a Net-90 payment schedule following formal written acceptance. If Client determines at its sole discretion that the deliverables are unsatisfactory, Client reserves the right to withhold up to 100% of the agreed compensation.

3. INTELLECTUAL PROPERTY & MORAL RIGHTS
Contractor unconditionally assigns, transfers, and conveys to Client all rights, title, and interest in and to all intellectual property, concepts, designs, code, preliminary sketches, and inventions created by Contractor during the term of this Agreement, whether created during business hours, on personal equipment, or on Contractor's personal time. Contractor explicitly waives all moral rights and the right to showcase any works in Contractor's professional portfolio without prior written consent.

4. NON-COMPETITION & CLIENT NON-SOLICITATION
During the term of this Agreement and for a period of twenty-four (24) months following termination for any reason, Contractor shall not directly or indirectly provide design, consulting, software, or advisory services to any business or entity operating in the same industry as Client anywhere globally.

5. INDEMNIFICATION & LIABILITY
Contractor shall defend, indemnify, and hold harmless Client, its officers, directors, and affiliates from and against any and all claims, damages, liabilities, losses, and legal costs (including uncapped attorney fees) arising from Contractor's work, deliverables, or any alleged breach of warranty, regardless of negligence or fault. Contractor's liability under this Agreement shall be uncapped.

6. TERMINATION
Client may terminate this Agreement at any time without cause upon immediate written notice. Upon termination, Contractor shall immediately deliver all work-in-progress to Client and shall forfeit any entitlement to compensation for uncompleted milestones. Contractor may only terminate upon sixty (60) days advance notice.

7. GOVERNING LAW & ARBITRATION
This Agreement shall be governed by the laws of the State of Delaware. Any dispute shall be resolved through binding private arbitration in Wilmington, Delaware. The prevailing party shall NOT be entitled to legal fee recovery, and Contractor agrees to waive all rights to a jury trial or class action participation.`,
    precomputedAnalysis: {
      contractTitle:
        "Independent Contractor & Design Agreement (Apex Global Media)",
      contractType: "freelance",
      riskScore: 88,
      riskRating: "Critical Risk",
      executiveSummary:
        "This contract is heavily one-sided and poses severe financial, legal, and operational risks. It mandates unlimited free revisions, delays payment up to 90 days with unilateral withholding rights, seizes personal intellectual property created outside work hours, and imposes an unenforceable 2-year worldwide non-compete.",
      keyRisks: [
        "Uncapped personal indemnity exposing you to bankruptcy-level legal fees.",
        "Worldwide 2-year non-compete effectively barring you from your design profession.",
        "IP clause seizes works created on personal time and personal devices.",
        "Net-90 payment with unilateral right for client to withhold 100% of fees.",
        "Unlimited revisions clause destroys project profitability.",
      ],
      keyObligations: [
        "Deliver unlimited revisions until client is subjectively satisfied.",
        "Provide 60 days advance notice before terminating, while client can terminate immediately.",
        "Surrender all portfolio rights unless client gives written permission.",
        "Pay for your own travel and arbitration costs in Delaware.",
      ],
      predatoryCount: 4,
      fairnessBenchmark:
        "Severe Outlier (Score: 12/100). Standard freelance agreements cap revisions at 2 rounds, Net-30 pay, mutual indemnity capped at fees paid, and zero non-competes.",
      actionChecklist: [
        {
          id: "act-1",
          task: "Strike out Section 4 (Non-Competition) entirely — freelancers cannot legally be barred from practicing their trade.",
          priority: "high",
          completed: false,
        },
        {
          id: "act-2",
          task: "Cap revisions in Section 1 to maximum 2 rounds; additional rounds billed at hourly rate ($85/hr).",
          priority: "high",
          completed: false,
        },
        {
          id: "act-3",
          task: "Change Section 2 payment terms from Net-90 to Net-15 with a 50% upfront deposit requirement.",
          priority: "high",
          completed: false,
        },
        {
          id: "act-4",
          task: "Limit IP transfer strictly to finalized deliverables upon full receipt of payment (exclude tools, preliminary sketches & personal time).",
          priority: "medium",
          completed: false,
        },
        {
          id: "act-5",
          task: "Add mutual portfolio rights to showcase non-confidential artwork.",
          priority: "low",
          completed: false,
        },
      ],
      readingTimeMinutes: 4,
      wordCount: 420,
      timestamp: "2026-09-13T12:00:00Z",
      clauses: [
        {
          id: "cl-1",
          title: "Section 1: Unlimited Free Revisions",
          originalText:
            "Contractor agrees to perform unlimited revisions at no additional charge until Client provides final written satisfaction.",
          plainEnglish:
            "The client can keep asking you to redo the work over and over forever, without paying you a single cent more.",
          riskLevel: "critical",
          category: "Payment & Fees",
          explanation:
            "Creates indefinite scope creep. You could spend 6 months redesigning without being paid.",
          predatoryFlag: true,
          recommendation:
            "Replace with: 'Contractor includes up to two (2) rounds of revisions. Further revisions shall be billed at the agreed hourly rate.'",
        },
        {
          id: "cl-2",
          title: "Section 2: Net-90 Payment & Unilateral Withholding",
          originalText:
            "Payments shall be disbursed on a Net-90 payment schedule... If Client determines at its sole discretion that the deliverables are unsatisfactory, Client reserves the right to withhold up to 100% of the agreed compensation.",
          plainEnglish:
            "You have to wait 3 whole months after finishing to get paid, and if the client subjectively dislikes the result, they can legally refuse to pay you anything at all.",
          riskLevel: "critical",
          category: "Payment & Fees",
          explanation:
            "Grants client unilateral discretion to accept work without paying, turning your contracted labor into volunteer work.",
          predatoryFlag: true,
          recommendation:
            "Insist on 50% upfront deposit, Net-15 balance, and objective acceptance criteria within 7 business days.",
        },
        {
          id: "cl-3",
          title: "Section 3: Worldwide IP Seizure on Personal Time",
          originalText:
            "Contractor unconditionally assigns... all intellectual property, concepts, designs, code... whether created during business hours, on personal equipment, or on Contractor's personal time. Contractor explicitly waives all moral rights and portfolio rights.",
          plainEnglish:
            "The client claims ownership of everything you design or code — even on your own laptop, on weekends, for other projects. You aren't even allowed to put the work in your portfolio.",
          riskLevel: "critical",
          category: "Intellectual Property",
          explanation:
            "Extremely predatory reach extending beyond project deliverables into your independent creative assets and past IP.",
          predatoryFlag: true,
          recommendation:
            "Amend to: 'IP transfer is strictly limited to final accepted deliverables, conditional upon 100% full payment, retaining standard portfolio display rights.'",
        },
        {
          id: "cl-4",
          title: "Section 4: 24-Month Global Non-Compete",
          originalText:
            "During the term... and for a period of twenty-four (24) months following termination... Contractor shall not directly or indirectly provide design, consulting, software, or advisory services to any business or entity operating in the same industry as Client anywhere globally.",
          plainEnglish:
            "For two years after you stop working with them, you are legally forbidden from taking any design or tech clients in their entire industry worldwide.",
          riskLevel: "critical",
          category: "Restrictive Covenants",
          explanation:
            "Restraints of trade on independent contractors are illegal in many jurisdictions (e.g., FTC ruling and California), but signing this can lead to weaponized cease-and-desist letters.",
          predatoryFlag: true,
          recommendation:
            "Strike out this section entirely. Independent contractors cannot be subjected to non-compete clauses.",
        },
        {
          id: "cl-5",
          title: "Section 5: Uncapped Indemnity & Attorney Fees",
          originalText:
            "Contractor shall defend, indemnify, and hold harmless Client... regardless of negligence or fault. Contractor's liability under this Agreement shall be uncapped.",
          plainEnglish:
            "If someone sues the client over the project, you have to pay all their legal fees out of your own pocket, even if the mistake was not your fault.",
          riskLevel: "high",
          category: "Liability & Indemnity",
          explanation:
            "You become an unpaid insurance policy for the client with unlimited personal liability.",
          predatoryFlag: false,
          recommendation:
            "Cap liability to the total fees actually received under the contract, and restrict indemnification strictly to proven intentional misconduct or copyright infringement.",
        },
        {
          id: "cl-6",
          title: "Section 6: Unilateral Immediate Termination",
          originalText:
            "Client may terminate this Agreement at any time without cause upon immediate written notice... Contractor may only terminate upon sixty (60) days advance notice.",
          plainEnglish:
            "They can fire you on 1 second's notice with zero compensation, but you are trapped for 2 months if you want to leave.",
          riskLevel: "medium",
          category: "Termination & Notice",
          explanation:
            "Asymmetrical termination terms leave you with zero runway while locking in your availability.",
          predatoryFlag: false,
          recommendation:
            "Make notice mutual (14 business days for either party) with payment guaranteed for all hours or milestones completed.",
        },
      ],
    },
  },
  {
    id: "residential-lease",
    title: "Urban Residential Tenancy & Lease Agreement",
    type: "lease",
    description:
      "A standard-looking residential apartment lease hiding maintenance shifting, automatic deposit forfeiture, and rent inflation triggers.",
    targetRole: "Tenants, Students & Roommates",
    text: `STANDARD RESIDENTIAL APARTMENT LEASE AGREEMENT

Premises: Unit 4B, 742 Evergreen Terrace, Metropolis.
Landlord: Metro Real Estate Holdings Ltd. ("Landlord")
Tenant: The undersigned resident ("Tenant")

1. TERM & RENT
The term shall commence on October 1, 2026 and continue for twelve (12) consecutive months. Monthly rent shall be $2,400 payable on the first day of each month. Any payment received after the 2nd day shall incur an automatic administrative late fee of $150 plus $25 per consecutive day until satisfied.

2. SECURITY DEPOSIT & RESTORATION
Tenant shall deposit $4,800 as security. Tenant acknowledges that upon vacation of Premises, Landlord shall deduct a mandatory non-refundable turnover and sanitization fee of $950 regardless of condition. If Tenant fails to give written renewal notice precisely one hundred and twenty (120) days prior to lease expiration, Tenant forfeits the entire remaining security deposit as liquidated damages.

3. REPAIRS, HVAC & APPLIANCE MAINTENANCE
Tenant shall be solely responsible for all maintenance, repairs, and replacements of plumbing fixtures, electrical switches, major kitchen appliances, and the HVAC cooling/heating system. If the central HVAC unit requires repair or replacement during the term, Tenant shall bear the full cost of certified contractor repair up to $3,500.

4. LANDLORD ACCESS & SURVEILLANCE
Landlord and its designated contractors reserve the right to enter the Premises at any time, day or night, with or without prior notice, for inspection, maintenance, prospective buyer tours, or arbitrary compliance checks. Tenant waives any right to quiet enjoyment or trespass claims.

5. GUEST RESTRICTIONS & PENALTIES
No overnight guest may remain in the Premises for more than two (2) consecutive nights without Landlord's written approval. Any unauthorized guest presence beyond forty-eight (48) hours shall incur an additional occupancy charge of $100 per night, billed automatically to Tenant.

6. AUTOMATIC RENEWAL & ESCALATION
Unless Tenant provides certified written notice of termination 120 days in advance, this Lease shall automatically renew for an additional 12-month term at a monthly rent escalating by twenty percent (20%) over the previous rate.`,
    precomputedAnalysis: {
      contractTitle: "Urban Residential Tenancy & Lease (Unit 4B)",
      contractType: "lease",
      riskScore: 82,
      riskRating: "Critical Risk",
      executiveSummary:
        "This lease contains unlawful provisions that shift structural landlord responsibilities (like $3,500 HVAC replacements) onto the tenant, imposes an illegal $950 automatic deposit forfeiture, eliminates tenant privacy via warrantless entry, and traps the tenant in a 20% rent escalation with an unreasonable 120-day notice window.",
      keyRisks: [
        "Financial liability for landlord capital assets (HVAC repair up to $3,500).",
        "Warrantless landlord entry at any hour violating local tenant rights and quiet enjoyment.",
        "Automatic forfeiture of $4,800 security deposit for missing a 120-day notice deadline.",
        "Automatic 20% rent hike with aggressive renewal trap.",
        "Extreme late fees ($150 + $25/day) often exceeding statutory legal maximums.",
      ],
      keyObligations: [
        "Give written notice 120 days (4 months) before moving out.",
        "Pay for professional HVAC service and all appliance repairs.",
        "Seek landlord permission for any guest staying more than 48 hours.",
      ],
      predatoryCount: 3,
      fairnessBenchmark:
        "Severe Outlier (Score: 18/100). Standard leases require landlord to maintain appliances/HVAC, mandate 24-48 hr entry notice, and cap notice windows at 30-60 days.",
      actionChecklist: [
        {
          id: "lease-1",
          task: "Remove Section 3 HVAC maintenance obligation. Capital heating/cooling is strictly the landlord's statutory duty.",
          priority: "high",
          completed: false,
        },
        {
          id: "lease-2",
          task: "Demand 24-hour advance written notice for Landlord entry (Section 4), except in bona fide emergencies.",
          priority: "high",
          completed: false,
        },
        {
          id: "lease-3",
          task: "Reduce termination notice window from 120 days to standard 60 days, and eliminate the automatic deposit forfeiture.",
          priority: "high",
          completed: false,
        },
        {
          id: "lease-4",
          task: "Eliminate the $950 mandatory non-refundable turnover deduction; deposits must be returned in full minus verified damage.",
          priority: "medium",
          completed: false,
        },
      ],
      readingTimeMinutes: 3,
      wordCount: 360,
      timestamp: "2026-09-13T12:00:00Z",
      clauses: [
        {
          id: "cl-l1",
          title: "Section 2: $950 Mandatory Deduction & Forfeiture Trap",
          originalText:
            "Landlord shall deduct a mandatory non-refundable turnover and sanitization fee of $950 regardless of condition. If Tenant fails to give written renewal notice precisely one hundred and twenty (120) days prior... Tenant forfeits the entire remaining security deposit.",
          plainEnglish:
            "They will steal $950 from your deposit even if you leave the apartment spotless. And if you forget to notify them 4 months before your lease ends, they take your entire $4,800 deposit.",
          riskLevel: "critical",
          category: "Payment & Fees",
          explanation:
            "Security deposits by law are for documented damage beyond normal wear and tear. Mandatory non-refundable fees and forfeiture penalties violate tenancy acts in almost all jurisdictions.",
          predatoryFlag: true,
          recommendation:
            "Refuse this clause. Insist on 100% refundable deposit subject only to legitimate itemized damage repairs.",
        },
        {
          id: "cl-l2",
          title: "Section 3: Shifting HVAC & Capital Maintenance to Tenant",
          originalText:
            "Tenant shall be solely responsible for all maintenance, repairs, and replacements of plumbing fixtures... and the HVAC cooling/heating system... up to $3,500.",
          plainEnglish:
            "If the building's air conditioner or furnace breaks down through age, you have to pay up to $3,500 to fix the landlord's property.",
          riskLevel: "critical",
          category: "Liability & Indemnity",
          explanation:
            "Landlords are legally required under the Warranty of Habitability to maintain heating, plumbing, and major structural utilities at landlord's expense.",
          predatoryFlag: true,
          recommendation:
            "Strike out tenant responsibility for HVAC and major appliances. Tenant should only be liable for damage caused by tenant misuse.",
        },
        {
          id: "cl-l3",
          title: "Section 4: Warrantless Entry & Surveillance",
          originalText:
            "Landlord... reserve the right to enter the Premises at any time, day or night, with or without prior notice... Tenant waives any right to quiet enjoyment.",
          plainEnglish:
            "The landlord can unlock your door at 2:00 AM while you are sleeping without warning, and you agree you can't complain.",
          riskLevel: "critical",
          category: "Privacy & Data",
          explanation:
            "Gross violation of the statutory Covenant of Quiet Enjoyment. Landlords must give at least 24 to 48 hours advance notice before entering residential premises.",
          predatoryFlag: true,
          recommendation:
            "Modify to: 'Landlord shall provide at least twenty-four (24) hours advance written notice prior to entry, between 9:00 AM and 5:00 PM, except in life-threatening emergencies.'",
        },
        {
          id: "cl-l4",
          title: "Section 6: Automatic 20% Rent Escalation",
          originalText:
            "Unless Tenant provides certified written notice... 120 days in advance, this Lease shall automatically renew... at a monthly rent escalating by twenty percent (20%).",
          plainEnglish:
            "If you miss the 4-month deadline, you are trapped in the apartment for another full year with your rent jumping from $2,400 to $2,880/mo.",
          riskLevel: "high",
          category: "Termination & Notice",
          explanation:
            "A punitive auto-renewal clause with an abnormally long notice window designed to catch tenants off-guard.",
          predatoryFlag: false,
          recommendation:
            "Change to standard 30 or 60 days notice, transitioning to a month-to-month tenancy upon lease end.",
        },
      ],
    },
  },
  {
    id: "tech-employment",
    title: "Senior Software Engineer Employment Agreement",
    type: "employment",
    description:
      "A tech offer letter containing an aggressive weekend moonlighting ban, clawback provisions on vested equity, and overreaching intellectual property assignments.",
    targetRole: "Software Engineers, Tech Leads & Founders",
    text: `EMPLOYMENT & PROPRIETARY INFORMATION AGREEMENT

Company: NovaTech Systems Inc. ("Company")
Employee: The undersigned employee ("Employee")
Position: Senior Systems Engineer

1. EXCLUSIVE SERVICE & MOONLIGHTING RESTRICTIONS
Employee agrees to devote 100% of productive professional energies to Company. During the term of employment, Employee shall not, directly or indirectly, engage in any outside consulting, open-source software contribution, advisory services, or commercial enterprise, whether or not for compensation, without unanimous prior written consent from the Board of Directors.

2. COMPREHENSIVE INVENTION ASSIGNMENT
Employee acknowledges that all ideas, algorithms, patents, trade secrets, software code, and creative expressions authored, conceived, or reduced to practice by Employee—either alone or with others, during the term of employment—shall be the sole and exclusive property of Company. This applies whether developed during working hours, on personal equipment, at home on weekends, or completely unrelated to Company's business.

3. POST-TERMINATION NON-SOLICITATION & NON-COMPETITION
For a period of twelve (12) months following termination of employment for any reason, Employee shall not accept employment, consulting, or equity participation with any entity competing with Company in cloud infrastructure, AI tooling, or distributed systems within North America and Europe.

4. EQUITY GRANT CLAWBACK PROVISION
In the event Employee voluntarily resigns or is terminated for any reason within thirty-six (36) months of commencing employment, Company reserves the unilateral right to repurchase all vested stock options and equity grants at their original par value ($0.0001 per share), effectively canceling all accumulated equity value.`,
    precomputedAnalysis: {
      contractTitle: "Senior Systems Engineer Employment Agreement (NovaTech)",
      contractType: "employment",
      riskScore: 76,
      riskRating: "High Risk",
      executiveSummary:
        "While offering senior compensation, this agreement attempts an illegal equity clawback on vested shares, seizes personal software projects built entirely outside work hours, and prohibits even unpaid open-source contributions without Board of Directors approval.",
      keyRisks: [
        "Equity clawback renders your stock options practically worthless if you leave before 3 years.",
        "Overbroad invention assignment claims ownership over your weekend personal projects.",
        "Strict moonlighting ban prevents writing code for open source or personal hobby apps.",
        "1-year non-compete across two continents limits your next career move.",
      ],
      keyObligations: [
        "Surrender all personal intellectual property created while employed.",
        "Refrain from all outside tech work, including open source.",
        "Forfeit vested equity at par value ($0.0001) if departing before 36 months.",
      ],
      predatoryCount: 2,
      fairnessBenchmark:
        "Moderate Outlier (Score: 35/100). Standard tech agreements allow personal projects on personal equipment, protect vested equity, and limit restrictions to direct business competition.",
      actionChecklist: [
        {
          id: "emp-1",
          task: "Strike Section 4 Equity Clawback. Vested equity earned through service must never be repurchased at par value upon voluntary resignation.",
          priority: "high",
          completed: false,
        },
        {
          id: "emp-2",
          task: "Add Exhibit A (Prior Inventions) and carve out personal hobby projects developed on personal time/laptops.",
          priority: "high",
          completed: false,
        },
        {
          id: "emp-3",
          task: "Permit open-source contributions and non-competitive personal projects in Section 1.",
          priority: "medium",
          completed: false,
        },
      ],
      readingTimeMinutes: 3,
      wordCount: 310,
      timestamp: "2026-09-13T12:00:00Z",
      clauses: [
        {
          id: "cl-e1",
          title: "Section 2: Weekend & Personal Projects IP Seizure",
          originalText:
            "All ideas, algorithms... software code... authored... by Employee... shall be the sole and exclusive property of Company... whether developed during working hours, on personal equipment, at home on weekends, or completely unrelated to Company's business.",
          plainEnglish:
            "If you build a weekend iPhone game or a personal recipe app on your own laptop at home, the company owns it 100% and can sue you if you sell it.",
          riskLevel: "critical",
          category: "Intellectual Property",
          explanation:
            "Directly violates state labor codes (e.g. California Labor Code § 2870, Illinois, Washington) which explicitly protect employee inventions created on personal time without company resources.",
          predatoryFlag: true,
          recommendation:
            "Add standard statutory carve-out: 'Excludes inventions developed entirely on employee's own time without company equipment, supplies, facilities, or trade secret information.'",
        },
        {
          id: "cl-e2",
          title: "Section 4: 36-Month Vested Equity Clawback",
          originalText:
            "In the event Employee voluntarily resigns... within thirty-six (36) months... Company reserves the unilateral right to repurchase all vested stock options and equity grants at their original par value ($0.0001 per share).",
          plainEnglish:
            "Even if you work hard for 2.5 years and legally vest 60% of your stock options, if you decide to take another job, the company will seize your equity back for a few pennies.",
          riskLevel: "critical",
          category: "Payment & Fees",
          explanation:
            "Subverts the legal definition of 'vesting'. Vested equity is earned compensation and cannot be forfeited upon normal resignation without cause.",
          predatoryFlag: true,
          recommendation:
            "Strike this clawback completely. Repurchase rights at par value should only ever apply to unvested shares or termination for severe criminal cause.",
        },
      ],
    },
  },
  {
    id: "saas-msa",
    title: "B2B SaaS Master Services Agreement",
    type: "saas",
    description:
      "An enterprise vendor contract with automatic 15% price escalation, unilateral SLA waivers, and one-sided data ownership.",
    targetRole: "Business Buyers, Startups & IT Managers",
    text: `CLOUD SOFTWARE MASTER SERVICES AGREEMENT

Vendor: CloudMatrix Enterprise Solutions ("Vendor")
Customer: The subscribing corporate entity ("Customer")

1. SUBSCRIPTION TERM & AUTOMATIC RENEWAL
The initial term shall be twenty-four (24) months. The subscription shall automatically renew for successive 24-month periods unless Customer provides certified cancellation notice at least ninety (90) days prior to expiration. Upon each renewal, subscription fees shall automatically increase by fifteen percent (15%) or the prevailing CPI + 10%, whichever is greater.

2. SERVICE LEVEL AGREEMENT & EXCLUSION OF REMEDIES
Vendor shall endeavor to maintain 99.5% service availability. In the event of system outages exceeding four consecutive hours, Customer's sole and exclusive remedy shall be service credits not to exceed 5% of monthly fees. Customer expressly waives any right to terminate for breach or seek monetary damages for business downtime or lost data.

3. DATA USAGE & AI MODEL TRAINING
Customer grants Vendor an irrevocable, perpetual, royalty-free license to access, process, aggregate, and utilize all Customer data, confidential documents, and workflow telemetry to train, fine-tune, and improve Vendor's proprietary machine learning and AI foundational models, without obligation of anonymization or confidentiality.

4. LIMITATION OF LIABILITY
Vendor's total cumulative liability for any and all claims shall be capped at the total amount paid by Customer in the preceding one (1) month. Customer's liability for any breach or indemnity shall remain completely uncapped.`,
    precomputedAnalysis: {
      contractTitle: "B2B SaaS Master Services Agreement (CloudMatrix)",
      contractType: "saas",
      riskScore: 79,
      riskRating: "High Risk",
      executiveSummary:
        "This enterprise SaaS contract claims an unrestricted perpetual license to ingest your company's proprietary data to train AI models without anonymization, traps you in 24-month renewal locks with guaranteed 15% price hikes, and caps vendor liability at a microscopic 1-month fee while customer liability remains uncapped.",
      keyRisks: [
        "Confidential company data ingested to train vendor AI models without confidentiality.",
        "24-month automatic renewal locks with automatic 15% fee inflation.",
        "Microscopic vendor liability cap (1 month of fees) even if customer data is destroyed.",
        "SLA downtime remedies limited to 5% service credit with no right to terminate.",
      ],
      keyObligations: [
        "Provide 90 days certified notice before the 2-year renewal triggers.",
        "Assume unlimited financial liability while vendor risks virtually nothing.",
      ],
      predatoryCount: 2,
      fairnessBenchmark:
        "Severe Outlier (Score: 24/100). Standard enterprise SaaS agreements protect customer data confidentiality, exclude customer data from AI training, and provide mutual 12-month liability caps.",
      actionChecklist: [
        {
          id: "saas-1",
          task: "Strike Section 3 AI Model Training immediately. Customer data must remain confidential and strictly excluded from model training.",
          priority: "high",
          completed: false,
        },
        {
          id: "saas-2",
          task: "Make the liability cap mutual (12 months of paid fees) and carve out data breaches and confidentiality violations.",
          priority: "high",
          completed: false,
        },
        {
          id: "saas-3",
          task: "Cap annual price renewal increases at standard CPI or max 3-5%.",
          priority: "medium",
          completed: false,
        },
      ],
      readingTimeMinutes: 3,
      wordCount: 290,
      timestamp: "2026-09-13T12:00:00Z",
      clauses: [
        {
          id: "cl-s1",
          title: "Section 3: Unrestricted Customer Data AI Training",
          originalText:
            "Customer grants Vendor an irrevocable, perpetual, royalty-free license to access... and utilize all Customer data, confidential documents... to train, fine-tune, and improve Vendor's proprietary machine learning and AI foundational models, without obligation of anonymization or confidentiality.",
          plainEnglish:
            "The vendor is allowed to read your private business documents, trade secrets, and customer data, and feed them into their AI models without hiding your company's private info.",
          riskLevel: "critical",
          category: "Privacy & Data",
          explanation:
            "Major enterprise compliance and GDPR/HIPAA risk. Once data is baked into an LLM's weights, it cannot be deleted or unlearned.",
          predatoryFlag: true,
          recommendation:
            "Replace with strict data protection guarantee: 'Vendor shall not use Customer Data for machine learning, AI training, or benchmarking without explicit prior written opt-in.'",
        },
        {
          id: "cl-s2",
          title: "Section 4: 1-Month Microscopic Liability Cap",
          originalText:
            "Vendor's total cumulative liability... shall be capped at the total amount paid by Customer in the preceding one (1) month. Customer's liability... shall remain completely uncapped.",
          plainEnglish:
            "If the vendor leaks all your confidential data or shuts down your business operations, the most you can get back is 1 month of software subscription fees.",
          riskLevel: "critical",
          category: "Liability & Indemnity",
          explanation:
            "Grossly asymmetrical liability structure where the customer bears 99% of systemic business risk.",
          predatoryFlag: true,
          recommendation:
            "Standardize to mutual liability cap equal to 12 months fees paid, with standard carve-outs for gross negligence and confidentiality breach.",
        },
      ],
    },
  },
];

export const SAMPLE_COMPARISON_PAIR: {
  titleA: string;
  titleB: string;
  contractA: string;
  contractB: string;
  precomputedDiff: ComparisonResult;
} = {
  titleA: "Original NDA v1.0 (Standard Mutual)",
  titleB: "Counterparty Proposed NDA v2.0 (Redlined)",
  contractA: `1. CONFIDENTIAL INFORMATION: Both parties agree to protect proprietary technical and business data disclosed during discussions.
2. DURATION: Confidentiality obligations shall endure for two (2) years from the date of disclosure.
3. REMEDIES: Either party may seek injunctive relief in a court of competent jurisdiction.
4. JURISDICTION: Mutual dispute resolution in the defendant's home jurisdiction.
5. NON-SOLICITATION: Neither party shall actively solicit each other's engineering personnel for 12 months.`,
  contractB: `1. CONFIDENTIAL INFORMATION: Only Disclosing Party's data shall be considered confidential. Receiving party's information is not protected.
2. DURATION: Receiving Party's obligations shall endure in perpetuity (forever) without expiration.
3. REMEDIES: Disclosing party may seek immediate liquidated damages of $100,000 per breach, plus uncapped attorney fees.
4. JURISDICTION: Exclusive jurisdiction in New York County, with Receiving Party waiving all forum non conveniens defenses.
5. NON-SOLICITATION: Receiving Party shall not hire, contract with, or employ any current or past employee of Disclosing Party for 36 months, with a $50,000 penalty per hire.`,
  precomputedDiff: {
    titleA: "Original NDA v1.0 (Mutual)",
    titleB: "Counterparty Redline v2.0 (One-Sided)",
    summary:
      "Version 2.0 transforms a standard mutual non-disclosure agreement into a highly aggressive, one-sided trap. It removes confidentiality protections for your own data, extends your liability to perpetuity, adds a $100,000 automatic liquidated damages penalty, and triples the non-solicitation term to 36 months with a $50,000 penalty per hire.",
    winner: "Contract A",
    winnerReason:
      "Version 1.0 is fair and balanced with reciprocal protections. Version 2.0 stripped away all protections for you while multiplying your financial and operational liabilities.",
    scoreA: 25,
    scoreB: 85,
    keyTakeaway:
      "Reject Version 2.0 redlines. Revert to the bilateral mutual terms in Version 1.0.",
    changes: [
      {
        id: "diff-1",
        category: "Confidentiality Mutuality",
        clauseA:
          "Both parties agree to protect proprietary data disclosed during discussions.",
        clauseB:
          "Only Disclosing Party's data shall be protected. Receiving party's information is not protected.",
        difference:
          "Shifted from bilateral mutual confidentiality to one-sided protection favoring counterparty only.",
        impact: "unfavorable_to_user",
        severity: "high",
      },
      {
        id: "diff-2",
        category: "Obligation Duration",
        clauseA: "Endures for two (2) years from the date of disclosure.",
        clauseB:
          "Obligations shall endure in perpetuity (forever) without expiration.",
        difference: "Duration increased from standard 2 years to infinity.",
        impact: "unfavorable_to_user",
        severity: "high",
      },
      {
        id: "diff-3",
        category: "Penalties & Damages",
        clauseA:
          "Either party may seek injunctive relief in a court of competent jurisdiction.",
        clauseB:
          "Disclosing party may seek immediate liquidated damages of $100,000 per breach, plus uncapped attorney fees.",
        difference:
          "Introduced a harsh $100,000 automatic liquidated damages penalty without proving actual loss.",
        impact: "unfavorable_to_user",
        severity: "high",
      },
      {
        id: "diff-4",
        category: "Non-Solicitation Scope",
        clauseA:
          "Neither party shall actively solicit engineering personnel for 12 months.",
        clauseB:
          "Receiving Party shall not hire any current or past employee for 36 months with $50,000 penalty per hire.",
        difference:
          "Tripled timeframe from 12 to 36 months, converted mutual ban to one-way ban, and attached $50k penalty.",
        impact: "unfavorable_to_user",
        severity: "medium",
      },
    ],
  },
};
