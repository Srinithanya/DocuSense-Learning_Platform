/**
 * DocuSense - Learner Profile, Target Exam Selection & Recommended Learning Materials
 */

const EXAM_RECOMMENDATIONS = {
  "UPSC Civil Services": {
    id: "upsc",
    name: "UPSC Civil Services",
    tagline: "Prelims GS-I, Mains Answer Framing & Analytical Depth",
    focusPill: "General Studies & Governance",
    recommendedDocs: [
      {
        id: "rec-upsc-polity",
        title: "Indian Polity & Constitutional Governance",
        source: "M. Laxmikanth / NCERT Standard",
        badge: "High Yield",
        badgeClass: "badge-danger",
        pages: "48 Pages",
        estTime: "3.5 hrs",
        summary: "Comprehensive coverage of Constitutional Framework, Fundamental Rights (Art 12-35), Directive Principles, Parliamentary system, Emergency provisions, and Supreme Court landmark verdicts.",
        keyTopics: ["Fundamental Rights & Writs", "Directive Principles of State Policy", "Parliamentary Procedure & Bills", "Judicial Review & Basic Structure"],
        starterText: `
Study Guide: Indian Polity & Constitutional Governance
Chapter 1: Constitutional Framework & Salient Features
The Constitution of India is the supreme law of the land. It provides a comprehensive framework for governance, enshrines fundamental rights, establishes institutional checks and balances, and defines federal relations with a strong unitary bias.

Chapter 2: Fundamental Rights (Articles 12 to 35)
Part III of the Constitution embodies the Magna Carta of India.
- Article 14: Equality before law and equal protection of laws. Reasonableness test under Article 14 prohibits arbitrariness in state action.
- Article 19: Protection of six fundamental freedoms including speech, peaceful assembly, association, movement, residence, and profession, subject to reasonable restrictions.
- Article 21: Protection of life and personal liberty. Interpreted broadly in Maneka Gandhi vs Union of India (1978) to incorporate procedural due process and dignity.
- Article 32: Right to Constitutional Remedies. Dr. B.R. Ambedkar termed it the heart and soul of the Constitution. Empowering the Supreme Court to issue writs of Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari.

Chapter 3: Directive Principles of State Policy (Part IV)
Articles 36 to 51 embody non-justiciable socialist, Gandhian, and liberal-intellectual guidelines for establishing a socio-economic welfare state. The harmony between Fundamental Rights and Directive Principles forms the basic structure (Minerva Mills case, 1980).

Chapter 4: The Union Parliament and Judiciary
Parliament comprises the President, Council of States (Rajya Sabha), and House of the People (Lok Sabha). Judicial independence is preserved through Collegium appointments and constitutional protection against executive encroachments.
        `
      },
      {
        id: "rec-upsc-history",
        title: "Modern Indian History & National Movement",
        source: "Bipin Chandra / Spectrum Digest",
        badge: "Core Syllabus",
        badgeClass: "badge-primary",
        pages: "38 Pages",
        estTime: "2.5 hrs",
        summary: "Chronological synthesis of the 1857 revolt, socio-religious reform movements (Raja Ram Mohan Roy, Jyotirao Phule), Gandhian mass satyagrahas, and constitutional milestones leading to independence in 1947.",
        keyTopics: ["1857 Uprising & British Raj", "Socio-Religious Reform Movements", "Non-Cooperation & Civil Disobedience", "Constitutional Acts (1909-1935)"],
        starterText: `
Study Guide: Modern Indian History & National Movement
Chapter 1: The Revolt of 1857 and Administrative Transition
The revolt of 1857 marked a turning point in colonial governance. The Government of India Act 1858 transferred control from the British East India Company to the British Crown, establishing the Secretary of State for India and the Viceroyalty.

Chapter 2: Socio-Religious Reform Movements (19th Century)
Reforms fought against caste discrimination, sati, child marriage, and promoted women education. Key reformers included Raja Ram Mohan Roy (Brahmo Samaj), Ishwar Chandra Vidyasagar, Swami Vivekananda (Ramakrishna Mission), and Jyotirao Phule (Satyashodhak Samaj).

Chapter 3: The Gandhian Era of Mass Struggle (1919 - 1942)
Mahatma Gandhi transformed the freedom struggle into a mass movement through Satyagraha and Ahimsa.
- Non-Cooperation Movement (1920-1922): Boycott of foreign cloth, courts, and educational institutions. Suspended after the Chauri Chaura incident.
- Civil Disobedience Movement (1930-1934): Launched with the historic Dandi March to break the salt law.
- Quit India Movement (1942): Passed at the Bombay Session with the rallying call Do or Die, leading to spontaneous national resistance.

Chapter 4: Constitutional Acts & Transfer of Power
From the Morley-Minto Reforms (1909) introducing separate electorates, to the Montagu-Chelmsford Reforms (1919) establishing dyarchy, and the Government of India Act 1935 laying the institutional foundation for independent India's Constitution.
        `
      },
      {
        id: "rec-upsc-economy",
        title: "Macroeconomics & Indian Economic Survey",
        source: "NCERT Macro / Ministry of Finance",
        badge: "High Weightage",
        badgeClass: "badge-accent",
        pages: "34 Pages",
        estTime: "2.5 hrs",
        summary: "Systematic breakdown of national income accounting (GDP vs GVA), fiscal deficit parameters, RBI monetary policy instruments (Repo, Reverse Repo, CRR, SLR), inflation metrics, and external trade balances.",
        keyTopics: ["Monetary Policy & Inflation Targeting", "Fiscal Deficit & FRBM Framework", "Balance of Payments & Forex Reserves", "Banking Reforms & NPA Resolutions"],
        starterText: `
Study Guide: Macroeconomics & Indian Economic Survey
Chapter 1: National Income Accounting
Gross Domestic Product (GDP) measures the monetary value of final goods and services produced within a country's geographical borders during a financial year. Gross Value Added (GVA) measures sector-specific contribution to economic output.

Chapter 2: Monetary Policy and RBI Framework
The Reserve Bank of India operates under a flexible inflation targeting mandate (4% +/- 2% CPI).
- Quantitative Tools: Repo Rate (rate at which RBI lends short-term funds to commercial banks), Reverse Repo Rate, Cash Reserve Ratio (CRR), and Statutory Liquidity Ratio (SLR).
- Qualitative Tools: Margin requirements, selective credit controls, and moral suasion.

Chapter 3: Fiscal Policy and Government Budgeting
Revenue deficit vs Fiscal deficit. The Fiscal Responsibility and Budget Management (FRBM) Act provides statutory guardrails to contain fiscal imbalances while maintaining capital expenditure for long-term infrastructure.

Chapter 4: External Sector and Balance of Payments
Current Account encompasses trade balance and invisibles (services, remittances). Capital Account includes Foreign Direct Investment (FDI), Foreign Portfolio Investment (FPI), and external commercial borrowings.
        `
      }
    ],
    ideas: {
      roadmap: [
        {
          step: 1,
          phase: "Syllabus Reconnaissance",
          desc: "Memorize the Prelims GS-I syllabus and past 5 years' question themes to filter noise from daily reading."
        },
        {
          step: 2,
          phase: "Foundation Text Synthesis",
          desc: "Load core standard references into DocuSense to generate structured topic summaries and key takeaway facts."
        },
        {
          step: 3,
          phase: "Active Recall MCQ Drills",
          desc: "Attempt a 10-15 question challenge test within 24 hours of finishing every chapter to cement retention."
        },
        {
          step: 4,
          phase: "Gap-Targeted Review",
          desc: "Review missed questions in DocuSense test review, revisit weak topics, and retest until mastery exceeds 80%."
        }
      ],
      starterTactics: [
        {
          icon: "⚖️",
          title: "The 80/20 High-Yield Strategy",
          text: "Focus 60% of early preparation on Polity, Modern History, and Economy—these three areas reliably generate over half of Prelims GS-I cut-off marks."
        },
        {
          icon: "🔍",
          title: "Reverse Engineering PYQs",
          text: "Skim 5 previous year exam questions before reading any chapter to prime your attention for specific clauses, dates, and exceptions."
        },
        {
          icon: "🧠",
          title: "Active Retrieval over Highlighting",
          text: "Avoid passive reading. After reading a concept, close the tab and write 3 summary bullets from memory before taking the practice test."
        }
      ]
    }
  },

  "SSC CGL / CHSL": {
    id: "ssc",
    name: "SSC CGL / CHSL",
    tagline: "Speed Calculation, English Accuracy & Tier-I/II Question Drills",
    focusPill: "Speed, Accuracy & Formula Recall",
    recommendedDocs: [
      {
        id: "rec-ssc-quant",
        title: "Quantitative Aptitude & Speed Math Formulas",
        source: "Kiran SSC / R.S. Aggarwal Standard",
        badge: "High Yield • 50 Marks",
        badgeClass: "badge-danger",
        pages: "42 Pages",
        estTime: "3 hrs",
        summary: "Speed calculation methods, percentage-to-fraction conversions, profit and loss shortcuts, time-work efficiency equations, and advanced geometry/algebra theorems.",
        keyTopics: ["Percentage & Profit/Loss Shortcuts", "Time, Speed, Distance & Work", "Algebra Identities & Polynomials", "Geometry Theorems & Circles"],
        starterText: `
Study Guide: Quantitative Aptitude & Speed Math Formulas
Chapter 1: Speed Arithmetic & Fraction Conversion Tables
High-speed computation requires memorization of fraction equivalents:
- 1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%, 1/12 = 8.33%, 1/14 = 7.14%, 1/15 = 6.66%.
Using fractional multipliers converts complex multiplication into rapid two-step division.

Chapter 2: Profit, Loss and Discount Formulas
- Profit % = (Profit / Cost Price) * 100
- Marked Price and Successive Discounts: Single equivalent discount for d1 and d2 = (d1 + d2 - (d1 * d2)/100)%.
- Dishonest Dealer Shortcuts: If a seller uses a false weight of w instead of W, Profit % = [(W - w) / w] * 100.

Chapter 3: Time, Work and Pipes
Work is universally treated as the LCM of individual time units.
- Total Work Units = LCM(t1, t2, t3).
- Individual Efficiency = Total Work / Days taken.
- Combined Days = Total Work / Sum of Efficiencies.

Chapter 4: Advanced Algebra & Geometry Identities
- (a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca).
- If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc.
- Circle Tangent Theorem: The angle subtended by an arc at the center is double the angle subtended at the circumference.
        `
      },
      {
        id: "rec-ssc-english",
        title: "100 Golden Rules of English Grammar & Error Detection",
        source: "Neetu Singh / SP Bakshi Digest",
        badge: "High Accuracy",
        badgeClass: "badge-primary",
        pages: "30 Pages",
        estTime: "2 hrs",
        summary: "Essential rules governing Subject-Verb Agreement, Pronoun cases, Conditional sentences, Prepositional idioms, and active/passive voice transformation rules.",
        keyTopics: ["Subject-Verb Agreement Rules", "Conditional Sentence Tenses", "Common Prepositional Errors", "Active & Passive Transformation"],
        starterText: `
Study Guide: 100 Golden Rules of English Grammar & Error Detection
Chapter 1: Subject-Verb Agreement (Rules 1 to 20)
- Rule 1: Two singular subjects joined by 'and' require a plural verb. However, if they express a singular composite idea (e.g., 'Bread and butter is my favorite breakfast'), use a singular verb.
- Rule 2: When two subjects are connected by 'as well as', 'with', 'along with', 'together with', 'accompanied by', the verb agrees with the FIRST subject.
- Rule 3: When subjects are connected by 'either...or', 'neither...nor', 'not only...but also', the verb agrees with the NEAREST subject.

Chapter 2: Pronoun Cases and Antecedents
- Rule 4: Pronouns following comparative 'than' or 'as' take the nominative case when comparing subjects (e.g., 'He is taller than I', not 'than me').
- Rule 5: 'Each other' is used strictly for two entities; 'one another' is used for more than two entities.

Chapter 3: Conditional Sentences
- Zero Conditional: If + Present Simple, Present Simple (Scientific facts).
- First Conditional: If + Present Simple, will + base verb (Likely future).
- Second Conditional: If + Past Simple, would + base verb (Hypothetical).
- Third Conditional: If + Past Perfect, would have + past participle (Unfulfilled past).
        `
      },
      {
        id: "rec-ssc-gk",
        title: "General Awareness & Static GK Factbook",
        source: "Lucent / DocuSense High-Yield GK",
        badge: "Score Booster",
        badgeClass: "badge-accent",
        pages: "36 Pages",
        estTime: "2 hrs",
        summary: "High-yield factual compendium covering National Parks, River Systems, Major Classical Dances, Constitutional Amendments, and Scientific Units.",
        keyTopics: ["Indian Rivers, Tributaries & Dams", "National Parks & UNESCO Sites", "Constitutional Articles & Amendments", "Important Inventions & Discoveries"],
        starterText: `
Study Guide: General Awareness & Static GK Factbook
Chapter 1: Indian Drainage System & Major Dams
- Himalayan Rivers: Indus (originates at Mansarovar, tributaries Jhelum, Chenab, Ravi, Beas, Sutlej), Ganga (originates at Gangotri/Bhagirathi, joined by Alaknanda at Devprayag), Brahmaputra (Tsangpo in Tibet).
- Peninsular Rivers: Godavari (longest peninsular river, Dakshin Ganga), Krishna, Kaveri, Mahanadi (all east-flowing into Bay of Bengal). Narmada and Tapi (west-flowing through rift valleys into Arabian Sea).
- Key Dams: Tehri Dam (Bhagirathi, highest), Hirakud Dam (Mahanadi, longest), Bhakra Nangal (Sutlej).

Chapter 2: Art, Culture & Classical Dances of India
Eight Classical Dance forms recognized by Sangeet Natak Akademi:
- Bharatanatyam (Tamil Nadu)
- Kathak (Uttar Pradesh / North India)
- Kathakali (Kerala)
- Kuchipudi (Andhra Pradesh)
- Odissi (Odisha)
- Sattriya (Assam)
- Manipuri (Manipur)
- Mohiniyattam (Kerala)

Chapter 3: Important Constitutional Amendments
- 42nd Amendment (1976): Added Socialist, Secular, Integrity to Preamble; added Fundamental Duties. Known as the 'Mini-Constitution'.
- 44th Amendment (1978): Removed Right to Property from Fundamental Rights; safeguards on Emergency powers.
- 73rd & 74th Amendments (1992): Constitutionalized Panchayati Raj and Municipalities.
        `
      }
    ],
    ideas: {
      roadmap: [
        {
          step: 1,
          phase: "Speed Calculation Conditioning",
          desc: "Dedicate the first 20 minutes of your day to mental multiplication, tables up to 30, and fraction tables."
        },
        {
          step: 2,
          phase: "Grammar & Vocab Internalization",
          desc: "Study 10 golden grammar rules daily and take a 10-question MCQ quiz immediately to verify pattern recognition."
        },
        {
          step: 3,
          phase: "Timed Sectional Quizzes",
          desc: "Target completing 25 questions in under 18 minutes to train the reflex needed for Tier-I examinations."
        },
        {
          step: 4,
          phase: "Negative Marking Control",
          desc: "Analyze wrong answers in DocuSense review mode to identify where you second-guessed and eliminate blind guessing."
        }
      ],
      starterTactics: [
        {
          icon: "⚡",
          title: "Unit Digit & Elimination Shortcuts",
          text: "Never solve full arithmetic calculations when the 4 answer choices end with distinct unit digits. Calculate the last digit to answer in 10 seconds."
        },
        {
          icon: "🎯",
          title: "The 30-Second Question Rule",
          text: "If an arithmetic or reasoning problem cannot be formulated within 30 seconds during practice, skip it, bookmark it, and revisit after the full set."
        },
        {
          icon: "📅",
          title: "Spaced Review for Static GK",
          text: "Static GK facts fade rapidly without reinforcement. Use DocuSense practice tests every 48 hours to lock facts into long-term recall."
        }
      ]
    }
  },

  "Banking / IBPS PO": {
    id: "banking",
    name: "Banking / IBPS PO",
    tagline: "High-Level DI, Analytical Puzzles & Financial Awareness",
    focusPill: "Reasoning & Banking Awareness",
    recommendedDocs: [
      {
        id: "rec-bank-awareness",
        title: "Banking & Financial Awareness Core Handbook",
        source: "RBI Guidelines & Indian Financial System Standard",
        badge: "Must Read",
        badgeClass: "badge-danger",
        pages: "36 Pages",
        estTime: "2.5 hrs",
        summary: "Crucial concepts for Prelims, Mains, and Interviews: RBI policy tools (Repo, Reverse Repo, SDF, MSF), Basel III framework, Priority Sector Lending (PSL), and NPA management.",
        keyTopics: ["RBI Monetary Policy & Inflation", "Basel III Norms & Capital Adequacy", "Priority Sector Lending Targets", "Insolvency & Bankruptcy Code (IBC)"],
        starterText: `
Study Guide: Banking & Financial Awareness Core Handbook
Chapter 1: The Reserve Bank of India & Monetary Policy
The Reserve Bank of India (established 1935 under RBI Act 1934) regulates India's financial system and currency issuance.
- Policy Repo Rate: Key benchmark interest rate at which commercial banks borrow short-term funds against government securities.
- Standing Deposit Facility (SDF): Liquidity absorption tool that does not require collateral from the RBI.
- Marginal Standing Facility (MSF): Penal rate for emergency overnight liquidity above the repo corridor.
- Cash Reserve Ratio (CRR): Percentage of Net Demand and Time Liabilities (NDTL) banks must hold in cash reserves with the RBI without earning interest.

Chapter 2: Basel III Framework & Capital Adequacy
Basel III regulations establish global prudential standards:
- Minimum Capital Adequacy Ratio (CAR / CRAR) of 9% (11.5% including Capital Conservation Buffer).
- Tier 1 Capital: Core equity capital providing highest loss-absorption capability.
- Tier 2 Capital: Supplementary capital including subordinated debt.

Chapter 3: Priority Sector Lending (PSL) Norms
Domestic scheduled commercial banks must allocate 40% of Adjusted Net Bank Credit (ANBC) to designated priority sectors:
- Agriculture: 18% target (with 10% sub-target for small and marginal farmers).
- Micro Enterprises: 7.5% target.
- Weaker Sections: 12% target.
- Education, Housing, Social Infrastructure, Renewable Energy, and Export Credit.

Chapter 4: Asset Quality, NPAs & Insolvency
Non-Performing Assets (NPA) are loans where principal or interest remains overdue for >90 days. Classification includes Sub-Standard, Doubtful, and Loss assets. The Insolvency and Bankruptcy Code (IBC) provides time-bound 180-day corporate resolution.
        `
      },
      {
        id: "rec-bank-di",
        title: "Data Interpretation & Caselet Mastery Guide",
        source: "Arun Sharma / Advanced Quant Analytics",
        badge: "High Weightage",
        badgeClass: "badge-primary",
        pages: "40 Pages",
        estTime: "3 hrs",
        summary: "Step-by-step methodologies to decode Complex Tabular DI, Radar/Spider Charts, Missing Variable Sets, and Paragraph Caselets with high speed.",
        keyTopics: ["Complex Tabular DI Decoding", "Missing Data Computation", "Caselet Parsing Techniques", "Ratio & Percentage Application"],
        starterText: `
Study Guide: Data Interpretation & Caselet Mastery Guide
Chapter 1: Foundational Arithmetic for High-Yield DI
Every Data Interpretation question tests three arithmetic primitives:
1. Percentage change: ((Final - Initial) / Initial) * 100.
2. What percent of A is B: (B / A) * 100.
3. Ratios and proportion scaling.
Never calculate exact decimal figures unless the options differ by less than 2%. Use approximation techniques to cancel terms.

Chapter 2: Deciphering Missing Data DI Tables
When variables are missing from a table, formulate linear equations before looking at individual questions:
- Sum of row/column totals = Given total.
- Compute the missing constant once; reuse it across all 5 associated questions.

Chapter 3: Caselet Paragraph Extraction
Paragraph caselets require converting unstructured narrative text into a structured Venn diagram or matrix:
- Read the entire passage once without writing to identify the universe and categories.
- Step 2: Draw the grid with labeled rows and columns.
- Step 3: Insert definite values first; write algebraic variables (x, y) for linked parameters.
        `
      },
      {
        id: "rec-bank-reasoning",
        title: "Floor Puzzles, Seating & Syllogism Blueprint",
        source: "Analytical Reasoning Standard",
        badge: "Game Changer",
        badgeClass: "badge-accent",
        pages: "38 Pages",
        estTime: "3 hrs",
        summary: "Proven templates for Circular and Linear seating arrangements with dual attributes, Floor-Flat puzzles, and Reverse Syllogisms with 'Only a few' logic.",
        keyTopics: ["Dual-Variable Circular Arrangements", "Floor & Flat Grid Blueprinting", "'Only a Few' Syllogism Rules", "Blood Relations & Direction Vectors"],
        starterText: `
Study Guide: Floor Puzzles, Seating & Syllogism Blueprint
Chapter 1: Multi-Possibility Grid Construction for Puzzles
Never attempt a complex banking puzzle in a single sketch. Maintain 2 to 3 simultaneous possibility cases:
- Case 1 and Case 2: As conditions eliminate contradictory possibilities, one case will naturally violate a constraint, leaving the unique correct arrangement.

Chapter 2: 'Only a Few' and 'Some Not' Syllogism Logic
- 'Only a few A are B' means two distinct statements simultaneously:
  1. 'Some A are B' (Positive relationship exists).
  2. 'Some A are NOT B' (A definite subset of A can never overlap with B).
- Therefore, the possibility 'All A can be B' is ALWAYS FALSE.
- However, the reverse possibility 'All B can be A' can be TRUE unless restricted by another premise.

Chapter 3: Dual-Row Linear Seating Arrangements
For 12 persons seated in two parallel rows facing North and South:
- Fix persons with known corner placements first.
- Note that for persons facing South, their 'Left' is the observer's 'Right'.
        `
      }
    ],
    ideas: {
      roadmap: [
        {
          step: 1,
          phase: "Master DI Base Calculations",
          desc: "Cement Percentages, Averages, and Ratios—these three topics account for 90% of Data Interpretation calculations."
        },
        {
          step: 2,
          phase: "Puzzle Blueprinting Practice",
          desc: "Practice drawing parallel possibility tables for floor/seating puzzles in under 90 seconds."
        },
        {
          step: 3,
          phase: "Current Financial Awareness",
          desc: "Read banking summaries and test RBI circulars weekly to secure effortless marks in the Mains General Awareness section."
        },
        {
          step: 4,
          phase: "Accuracy Prioritization",
          desc: "Target 95%+ accuracy on easy and moderate question sets before attempting high-complexity mains caselets."
        }
      ],
      starterTactics: [
        {
          icon: "🧩",
          title: "The 90-Second Puzzle Rule",
          text: "If you cannot establish a definite starting point for a puzzle within 90 seconds, mark it for review and move to arithmetic or syllogisms."
        },
        {
          icon: "📊",
          title: "Approximation Shortcuts",
          text: "Round numbers to nearest tens or hundreds when options have more than 5% separation. Never calculate 3 decimal places."
        },
        {
          icon: "🔍",
          title: "Diagnostic Test Review",
          text: "After every DocuSense test, spend twice as long reviewing wrong answers as you spent taking the quiz."
        }
      ]
    }
  },

  "GATE CSE": {
    id: "gate",
    name: "GATE CSE",
    tagline: "Algorithms, Operating Systems, Networks & Discrete Mathematics",
    focusPill: "Technical Rigor & Mathematical Proofs",
    recommendedDocs: [
      {
        id: "rec-gate-algo",
        title: "Data Structures & Asymptotic Algorithm Design",
        source: "Cormen, Leiserson, Rivest, Stein (CLRS) Core",
        badge: "High Yield • 12-15 Marks",
        badgeClass: "badge-danger",
        pages: "52 Pages",
        estTime: "4 hrs",
        summary: "Rigorous treatment of Asymptotic notation (Big-O, Omega, Theta), Master Theorem, Dynamic Programming, Greedy choice properties, and Graph traversals (BFS, DFS, Dijkstra, Bellman-Ford).",
        keyTopics: ["Asymptotic Bounds & Recurrences", "Divide and Conquer & Master Theorem", "Dynamic Programming & Memoization", "Graph Algorithms & Shortest Path"],
        starterText: `
Study Guide: Data Structures & Asymptotic Algorithm Design
Chapter 1: Asymptotic Notations & Growth of Functions
- Big-O (O): Asymptotic upper bound. f(n) = O(g(n)) iff there exist positive constants c and n0 such that 0 <= f(n) <= c*g(n) for all n >= n0.
- Big-Omega (Ω): Asymptotic lower bound. f(n) = Ω(g(n)) iff 0 <= c*g(n) <= f(n) for all n >= n0.
- Theta (Θ): Asymptotically tight bound. Holds iff f(n) is both O(g(n)) and Ω(g(n)).
- Little-o and Little-omega: Strictly non-tight upper and lower bounds.

Chapter 2: Solving Recurrence Relations & Master Theorem
Master Theorem form: T(n) = a*T(n/b) + f(n), where a >= 1, b > 1:
- Case 1: If f(n) = O(n^(log_b(a) - ε)) for some ε > 0, then T(n) = Θ(n^(log_b(a))).
- Case 2: If f(n) = Θ(n^(log_b(a)) * log^k(n)), then T(n) = Θ(n^(log_b(a)) * log^(k+1)(n)).
- Case 3: If f(n) = Ω(n^(log_b(a) + ε)) and regularity condition holds, then T(n) = Θ(f(n)).

Chapter 3: Graph Traversal & Minimum Spanning Trees
- BFS uses a FIFO Queue; time complexity O(V + E); finds unweighted single-source shortest path.
- DFS uses a LIFO Stack; discovers tree edges, back edges (cycle detection in directed graphs), forward edges, and cross edges.
- Prim's Algorithm vs Kruskal's Algorithm (with Disjoint Set Union find-by-rank): Both find Minimum Spanning Tree with O(E log V) complexity.
        `
      },
      {
        id: "rec-gate-os",
        title: "Operating Systems, Concurrency & Virtual Memory",
        source: "Silberschatz, Galvin & Gagne Standard",
        badge: "Core Technical",
        badgeClass: "badge-primary",
        pages: "44 Pages",
        estTime: "3.5 hrs",
        summary: "Process scheduling algorithms, counting and binary semaphores, Banker's deadlock avoidance algorithm, paging mathematics, inverted page tables, and TLB hit ratios.",
        keyTopics: ["Process Synchronization & Semaphores", "Deadlock Characterization & Banker's Algorithm", "Paging, Multi-Level Tables & TLB", "Disk Scheduling & File Systems"],
        starterText: `
Study Guide: Operating Systems, Concurrency & Virtual Memory
Chapter 1: Process Synchronization & Critical Section Problem
A valid solution to the Critical Section problem must satisfy three mandatory criteria:
1. Mutual Exclusion: At most one process executing inside the critical section.
2. Progress: If no process is in critical section and some wish to enter, selection cannot be postponed indefinitely.
3. Bounded Waiting: Bound on the number of times other processes are allowed to enter after a process has made a request.
Semaphores: Integer variables accessed only through atomic wait() (P) and signal() (V) operations.

Chapter 2: Deadlock Avoidance & Banker's Algorithm
Four necessary Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.
- Banker's Algorithm tests whether allocating resources leaves the system in a 'Safe State'—meaning there exists at least one sequence <P1, P2, ... Pn> where each process can satisfy maximum needs and terminate.

Chapter 3: Virtual Memory & Page Table Mathematics
- Virtual Address = Page Number (p) + Offset (d).
- Effective Memory Access Time (EMAT) with TLB:
  EMAT = TLB_hit_ratio * (TLB_access_time + Memory_access_time) + (1 - TLB_hit_ratio) * (TLB_access_time + 2 * Memory_access_time).
- For an n-level page table, a TLB miss requires (n + 1) memory references.
        `
      },
      {
        id: "rec-gate-cn",
        title: "Computer Networks & Layered Architecture",
        source: "Kurose & Ross / Tanenbaum Digest",
        badge: "High Weightage",
        badgeClass: "badge-accent",
        pages: "40 Pages",
        estTime: "3 hrs",
        summary: "Sliding window protocol efficiency formulas (Stop & Wait, Go-Back-N, Selective Repeat), IPv4 CIDR subnetting, TCP 3-way handshake, congestion control, and routing algorithms.",
        keyTopics: ["Sliding Window Efficiency Formulas", "IPv4 CIDR Subnetting Calculations", "TCP Flow & Congestion Control", "Dijkstra Link-State & Bellman-Ford"],
        starterText: `
Study Guide: Computer Networks & Layered Architecture
Chapter 1: Data Link Layer & Sliding Window Protocols
- Transmission Time (Tt) = Packet_Size / Bandwidth.
- Propagation Time (Tp) = Distance / Propagation_Speed.
- Parameter 'a' = Tp / Tt.
- Stop-and-Wait Efficiency = 1 / (1 + 2a).
- Go-Back-N (GBN) Window Size: Sender window Ws = N, Receiver window Wr = 1. Efficiency = N / (1 + 2a). Minimum sequence numbers required = N + 1.
- Selective Repeat (SR): Sender window Ws = 2^(k-1), Receiver window Wr = 2^(k-1). Efficiency = Ws / (1 + 2a). Minimum sequence numbers required = 2 * Ws.

Chapter 2: Network Layer & CIDR Subnetting
An IPv4 address comprises 32 bits. Subnet mask defines network prefix and host bits.
- Number of usable hosts in a /n network = 2^(32 - n) - 2 (subtracting Network ID and Directed Broadcast Address).
- Longest Prefix Match rule: Routers forward packets matching the most specific (longest) subnet prefix in the routing table.

Chapter 3: Transport Layer & TCP Congestion Control
TCP provides reliable, ordered byte-stream delivery.
- Three-Way Handshake: SYN -> SYN-ACK -> ACK.
- Slow Start: Congestion Window (cwnd) doubles every RTT until threshold (ssthresh).
- Congestion Avoidance: cwnd grows linearly (+1 MSS per RTT).
- On 3 Duplicate ACKs (Fast Retransmit): ssthresh = cwnd / 2; cwnd = ssthresh + 3 MSS.
        `
      }
    ],
    ideas: {
      roadmap: [
        {
          step: 1,
          phase: "Discrete Math Foundation",
          desc: "Ensure Set Theory, Combinatorics, Graph Theory, and Propositional Logic are rock-solid before tackling Algorithms."
        },
        {
          step: 2,
          phase: "Derive Before Memorizing",
          desc: "Derive every formula (TLB EMAT, sliding window efficiency, page size) from first principles so corner cases never confuse you."
        },
        {
          step: 3,
          phase: "Corner-Case Code Dry Runs",
          desc: "Test boundary conditions: n=0, n=1, empty graph, single-node tree, disconnected components, and null pointers."
        },
        {
          step: 4,
          phase: "DocuSense Practice Mode",
          desc: "Take challenge quizzes on each topic to test conceptual depth and eliminate misconceptions."
        }
      ],
      starterTactics: [
        {
          icon: "💻",
          title: "Boundary Conditions & NATs",
          text: "GATE Numerical Answer Type (NAT) questions offer no options to guide you. Double-check units (bits vs bytes, ms vs seconds) and boundary edges."
        },
        {
          icon: "📐",
          title: "Formula & Edge-Case Log",
          text: "Maintain a dedicated digital note in DocuSense for algorithmic recurrences, memory address structures, and protocol parameters."
        },
        {
          icon: "⏱️",
          title: "Speed vs Proof Balance",
          text: "Spend the first 45 seconds of any technical question verifying assumptions (e.g. directed vs undirected graph, 0-indexed vs 1-indexed)."
        }
      ]
    }
  },

  "University / College Exams": {
    id: "college",
    name: "University / College Exams",
    tagline: "Semester Syllabus Modules, Model Papers & Viva Preparation",
    focusPill: "Semester Curriculum & Model Answers",
    recommendedDocs: [
      {
        id: "rec-college-theory",
        title: "Semester Foundation & Modular Theory Guide",
        source: "Department Prescribed Standard Summaries",
        badge: "Core Curriculum",
        badgeClass: "badge-primary",
        pages: "36 Pages",
        estTime: "2.5 hrs",
        summary: "Modular synthesis of foundational definitions, formal proofs, structural diagrams, and standard university lecture syllabus units.",
        keyTopics: ["Unit 1 & 2 Core Foundations", "Unit 3 Theoretical Frameworks", "Standard Derivations & Proofs", "Applied Case Studies"],
        starterText: `
Study Guide: Semester Foundation & Modular Theory Guide
Chapter 1: Foundational Theoretical Frameworks
Every undergraduate curriculum establishes rigorous conceptual baselines.
- Definition: A formal theoretical model provides mathematical abstraction, bounded constraints, and reproducible principles across all operational conditions.
- Primary Objectives: Ensure internal consistency, modular separation of concerns, and verifiable compliance with official engineering and scientific rubrics.

Chapter 2: Structural Architecture & Derivations
Step-by-step mathematical proofs require explicitly stating:
1. Initial Assumptions and boundary conditions.
2. Intermediate transformation steps with justification for each substitution.
3. Final invariant verification and physical interpretation of constant parameters.

Chapter 3: Comparative Analysis & Trade-Offs
Examiners frequently request comparative tables between competing frameworks. Ensure every comparative answer includes at least 5 structured parameters: Architecture, Computational Complexity, Scalability, Fault Tolerance, and Ideal Use Cases.
        `
      },
      {
        id: "rec-college-pyq",
        title: "Previous 5-Year Question Papers & Solved Model Answers",
        source: "University Examination Archives",
        badge: "High Yield • 80% Weight",
        badgeClass: "badge-danger",
        pages: "46 Pages",
        estTime: "3.5 hrs",
        summary: "Curated compendium of recurring 10-mark and 5-mark subjective questions with structured marking schemes, introduction-body-conclusion templates, and diagrams.",
        keyTopics: ["Recurring 10-Mark Question Blueprints", "5-Mark Short Concept Explanations", "Diagrammatic Representation Templates", "Step-Marking Rubric Strategies"],
        starterText: `
Study Guide: Previous 5-Year Question Papers & Solved Model Answers
Chapter 1: The Anatomy of a High-Scoring 10-Mark Answer
University evaluators review hundreds of answer scripts rapidly. Structure your response into 4 distinct visual segments:
1. Definition & Introduction (3-4 crisp sentences defining key terminology).
2. Labeled Conceptual Diagram (neatly sketched with annotations).
3. Core Mechanisms & Sub-headings (numbered bullet points with bold keywords).
4. Real-world Applications & Conclusion (demonstrating practical relevance).

Chapter 2: Frequently Repeated Question Blueprints
Historical analysis reveals that over 70% of semester external exam questions repeat from a pool of 20 core topics.
- Blueprint 1: Explain the fundamental architecture and working principles with a block diagram.
- Blueprint 2: Differentiate between two core methodologies with a comparative table.
- Blueprint 3: Derive the governing equations under ideal operating conditions.
        `
      },
      {
        id: "rec-college-viva",
        title: "Viva-Voce & Lab Practical Oral Defense Handbook",
        source: "Lab Manual & Faculty Lecture Insights",
        badge: "Practical Prep",
        badgeClass: "badge-accent",
        pages: "24 Pages",
        estTime: "1.5 hrs",
        summary: "Bite-sized, high-confidence answers for lab viva voce evaluations, project defense cross-examinations, and practical error troubleshooting questions.",
        keyTopics: ["Principles of Laboratory Experiments", "Key Governing Formulas & SI Units", "Expected Experimental Errors", "Project Defense Question Bank"],
        starterText: `
Study Guide: Viva-Voce & Lab Practical Oral Defense Handbook
Chapter 1: Preparing for the Oral Viva Examination
External examiners test conceptual fundamentals rather than memorized paragraphs.
- Principle: Always state the core governing law within the first 10 seconds of answering.
- Units & Constants: Always state standard SI units without waiting for the examiner to ask.

Chapter 2: Handling Unknown Questions Gracefully
If you encounter a question outside your immediate recall:
- Do not make wild, unverified guesses.
- Politely clarify: "While I do not recall the exact constant, the underlying mechanism operates on [state related fundamental principle]."
- Ground your defense in foundational first principles.
        `
      }
    ],
    ideas: {
      roadmap: [
        {
          step: 1,
          phase: "Identify Module Weightages",
          desc: "Check previous question papers to pinpoint which 3 syllabus units account for 75% of external marks."
        },
        {
          step: 2,
          phase: "Convert Lecture Slides to Notes",
          desc: "Upload lecture PDFs or syllabus notes into DocuSense to auto-generate concise, exam-oriented study summaries."
        },
        {
          step: 3,
          phase: "Practice Diagram Sketching",
          desc: "Examiners award top marks for clean, labeled diagrams. Practice drawing every major architecture from memory."
        },
        {
          step: 4,
          phase: "Self-Test Conceptual Definitions",
          desc: "Use DocuSense challenge tests to verify conceptual accuracy before the external oral viva or written test."
        }
      ],
      starterTactics: [
        {
          icon: "✏️",
          title: "Draw Labeled Diagrams First",
          text: "Evaluators scan drawings before reading paragraphs. A well-labeled diagram guarantees at least 60% of available marks immediately."
        },
        {
          icon: "📑",
          title: "5-Bullet Structure Rule",
          text: "Always break complex concepts into 5 distinct, numbered points with clear headings rather than unbroken walls of text."
        },
        {
          icon: "🤝",
          title: "Peer Diagnostic Quizzing",
          text: "Generate DocuSense tests from your uploaded notes and test your study group to uncover hidden conceptual blind spots."
        }
      ]
    }
  },

  "Self-Paced Learning": {
    id: "custom",
    name: "Self-Paced Learning",
    tagline: "Lifelong Mastery, Mental Models & Accelerated Retention",
    focusPill: "Cognitive Science & Deep Skill Building",
    recommendedDocs: [
      {
        id: "rec-self-deepwork",
        title: "Deep Work & High-Retention Learning Systems",
        source: "Cognitive Science & Deliberate Practice Standard",
        badge: "Must Read",
        badgeClass: "badge-danger",
        pages: "32 Pages",
        estTime: "2 hrs",
        summary: "Evidence-based meta-learning principles: Deliberate practice protocols, the Feynman Technique, spaced repetition intervals, and overcoming the forgetting curve.",
        keyTopics: ["Deliberate Practice & Feedback Loops", "The Feynman Technique", "Spaced Repetition & Retention Curves", "Attention Management & Deep Work"],
        starterText: `
Study Guide: Deep Work & High-Retention Learning Systems
Chapter 1: The Architecture of Deliberate Practice
Unfocused repetition does not produce expertise. Deliberate practice requires four foundational pillars:
1. Highly specific micro-goals targeted just outside your current comfort zone.
2. Unbroken concentration free from digital distractions and context switching.
3. Immediate, unambiguous error feedback.
4. Iterative refinement until the correct mental model is internalized.

Chapter 2: The Feynman Technique for Conceptual Mastery
To truly master any concept:
- Step 1: Choose a concept and write its name at the top of a page.
- Step 2: Explain it as if teaching a 12-year-old child, using simple language without jargon.
- Step 3: Identify points where you hesitate, use buzzwords, or struggle to explain smoothly.
- Step 4: Return to the source material to resolve those exact gaps until your explanation is effortless.

Chapter 3: Active Retrieval vs The Illusion of Competence
Re-reading and passive highlighting create an illusion of fluency. True learning occurs when the brain strains to retrieve information from memory without cues. Testing yourself is not an assessment—it is the single most powerful learning event.
        `
      },
      {
        id: "rec-self-mentalmodels",
        title: "Mental Models & Critical Thinking Playbook",
        source: "Decision Science & First Principles Compendium",
        badge: "Core Foundations",
        badgeClass: "badge-primary",
        pages: "38 Pages",
        estTime: "2.5 hrs",
        summary: "Universal mental models for analytical thinkers: First Principles reasoning, Inversion, Second-Order Thinking, Hanlon's Razor, and probabilistic reasoning.",
        keyTopics: ["First Principles Thinking", "Inversion: Solving Backwards", "Second-Order & Long-Term Effects", "Occam's & Hanlon's Razors"],
        starterText: `
Study Guide: Mental Models & Critical Thinking Playbook
Chapter 1: First Principles Reasoning
First principles reasoning is the practice of actively breaking down a problem to its most fundamental truths that cannot be deduced any further, and building a conclusion upwards from there.
- Contrast with reasoning by analogy: Analogy copies what others have done with minor tweaks; first principles builds novel solutions from basic axioms.

Chapter 2: Inversion (Solving Backwards)
Instead of asking how to achieve success, ask: "How could this guaranteed to fail?"
- By systematically identifying and eliminating all pathways to failure, you protect yourself against catastrophic blind spots.
- In learning: Instead of "How do I remember everything?", ask "What makes me forget?" (Distraction, lack of testing, cramming) and systematically eliminate those habits.

Chapter 3: Second-Order Thinking
First-order thinking asks: "What is the immediate result?" Second-order thinking asks: "And then what?"
- Every decision has cascading consequences that frequently contradict immediate, short-term benefits.
        `
      },
      {
        id: "rec-self-notes",
        title: "Knowledge Synthesis & Atomic Note Architecture",
        source: "Smart Notes & Information Processing Standard",
        badge: "High Impact",
        badgeClass: "badge-accent",
        pages: "28 Pages",
        estTime: "2 hrs",
        summary: "How to read actively, transform raw information into evergreen atomic notes, connect disparate ideas, and build lasting intellectual capital.",
        keyTopics: ["Active Reading Strategies", "Atomic Evergreen Notes", "Building Associative Knowledge Webs", "Creative Synthesis & Output"],
        starterText: `
Study Guide: Knowledge Synthesis & Atomic Note Architecture
Chapter 1: The Problem with Passive Consumption
Collecting bookmarks and saving PDFs is not learning. Without active synthesis, 80% of absorbed knowledge dissolves within 48 hours.
- Active synthesis requires translating raw information into your own words before filing it away.

Chapter 2: Writing Atomic Notes
An atomic note contains exactly one single idea expressed clearly with full context.
- Modular: Can be linked and rearranged with other ideas across domains.
- Self-Contained: Understandable months later without needing to re-read the original book or paper.
- Connected: Linked to at least one related concept to foster unexpected creative insights.

Chapter 3: Turning Knowledge into Tangible Output
Knowledge is only solidified when put to use. Always conclude a study session with a small deliverable: a test score, a written summary, or an actionable experiment.
        `
      }
    ],
    ideas: {
      roadmap: [
        {
          step: 1,
          phase: "Clarify Learning Objective",
          desc: "Define the exact skill or conceptual threshold you want to achieve this month."
        },
        {
          step: 2,
          phase: "Feed Curated Material into DocuSense",
          desc: "Upload whitepapers, books, or articles to auto-generate summaries and key topic breakdowns."
        },
        {
          step: 3,
          phase: "Teach It (Feynman Technique)",
          desc: "Explain the key takeaways in simple language without referring back to the source text."
        },
        {
          step: 4,
          phase: "Test Retrieval Regularly",
          desc: "Take challenge quizzes every few days to reinforce neural pathways and combat the forgetting curve."
        }
      ],
      starterTactics: [
        {
          icon: "⏱️",
          title: "The 25-Minute Focus Sprint",
          text: "Commit to 25 uninterrupted minutes of deep reading, followed immediately by a 5-minute active recall practice test."
        },
        {
          icon: "❓",
          title: "Question Everything",
          text: "Never accept facts passively. Ask: 'Why is this true?', 'Under what conditions does this break?', and 'How can I apply this today?'"
        },
        {
          icon: "🚀",
          title: "Actionable Synthesis",
          text: "Turn every key insight into at least one concrete real-world test or written reflection before moving to new material."
        }
      ]
    }
  }
};

const ProfileView = {
  render() {
    const container = document.getElementById('view-profile');
    if (!container) return;

    const user = appState.user;
    const exams = appState.targetExams;
    const activeExamName = user.targetExam || "UPSC Civil Services";
    const currentRec = EXAM_RECOMMENDATIONS[activeExamName] || EXAM_RECOMMENDATIONS["UPSC Civil Services"];

    container.innerHTML = `
      <div>
        <div class="view-section-header">
          <div>
            <h1 style="font-size: 1.6rem; margin-bottom: 0.25rem;">Learner Profile & Goals</h1>
            <p style="font-size: 0.875rem; color: var(--text-secondary);">
              Manage your academic goals, curated exam recommendations, study roadmaps, and personalization settings.
            </p>
          </div>
        </div>

        <div class="profile-grid">
          <!-- Left Column: Learner Profile Card -->
          <div class="profile-card-left">
            <div class="profile-avatar-lg">${user.avatar}</div>
            <h2 style="font-size: 1.35rem; margin-bottom: 0.2rem;">${user.name}</h2>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${user.email}</div>
            
            <div class="badge badge-primary" style="margin-bottom: 1.5rem;">
              Level ${user.level} &bull; ${user.levelTitle}
            </div>

            <!-- XP Progress to next level -->
            <div style="text-align: left; margin-bottom: 1.75rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 0.35rem;">
                <span>Level Progress</span>
                <span style="color: var(--primary);">${user.xp} / ${user.xpNextLevel} XP</span>
              </div>
              <div class="progress-track lg">
                <div class="progress-fill gradient" style="width: ${Math.round((user.xp / user.xpNextLevel) * 100)}%;"></div>
              </div>
              <span style="font-size: 0.72rem; color: var(--text-muted); display: block; margin-top: 0.35rem;">
                ${user.xpNextLevel - user.xp} XP needed to reach Level ${user.level + 1}
              </span>
            </div>

            <!-- Quick Stats List -->
            <div style="display: flex; flex-direction: column; gap: 0.85rem; text-align: left; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
                <span style="color: var(--text-muted);">Current Streak</span>
                <strong style="color: #ea580c;">🔥 ${user.streakDays} Day${user.streakDays === 1 ? '' : 's'}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
                <span style="color: var(--text-muted);">Tests Completed</span>
                <strong>${user.testsCompleted} tests</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
                <span style="color: var(--text-muted);">Average Accuracy</span>
                <strong style="color: var(--success);">${user.testsCompleted > 0 ? `${user.averageScore}%` : '--'}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
                <span style="color: var(--text-muted);">Active Target</span>
                <strong style="color: var(--primary);">${user.targetExam}</strong>
              </div>
            </div>
          </div>

          <!-- Right Column: Target Exam Selection, Recommended Documents & Starter Ideas -->
          <div>
            <!-- Section 1: Target Exam Selection -->
            <div class="goal-selection-box">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.2rem;">
                    Target Examination & Learning Goal
                  </h3>
                  <p style="font-size: 0.8125rem; color: var(--text-muted);">
                    Select your target exam below to automatically load curated documents, high-yield syllabi, and starter ideas.
                  </p>
                </div>
                <span class="badge badge-accent">Adaptive Engine</span>
              </div>

              <div class="goals-grid">
                ${exams.map(exam => `
                  <button class="goal-option-btn ${user.targetExam === exam.name ? 'active' : ''}" 
                          onclick="ProfileView.selectExam('${exam.name}')">
                    <strong style="display: block; font-size: 0.9rem; margin-bottom: 0.2rem;">${exam.name}</strong>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">${exam.tag}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Section 2: Recommended Study Documents (Replaces Earned Badges) -->
            <div class="goal-selection-box" id="recommended-documents-box">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
                    <h3 style="font-size: 1.15rem; color: var(--text-primary); margin: 0;">
                      Recommended Documents for ${currentRec.name}
                    </h3>
                  </div>
                  <p style="font-size: 0.8125rem; color: var(--text-muted); margin: 0;">
                    ${currentRec.tagline}. Curated standard references with ready-to-study notes and practice questions.
                  </p>
                </div>
                <span class="rec-badge-tag">🎯 Curated for ${currentRec.name}</span>
              </div>

              <!-- Recommended Documents Grid -->
              <div class="rec-docs-grid">
                ${currentRec.recommendedDocs.map((doc, idx) => `
                  <div class="rec-doc-card">
                    <div>
                      <div class="rec-doc-header">
                        <div class="rec-doc-icon">📄</div>
                        <span class="badge ${doc.badgeClass}">${doc.badge}</span>
                      </div>
                      
                      <div class="rec-doc-title">${doc.title}</div>
                      <div class="rec-doc-source">
                        <span>📚 ${doc.source}</span>
                      </div>
                      
                      <p class="rec-doc-desc">${doc.summary}</p>
                      
                      <div class="rec-topics-wrap">
                        ${doc.keyTopics.map(topic => `
                          <span class="rec-topic-pill">${topic}</span>
                        `).join('')}
                      </div>
                    </div>

                    <div class="rec-doc-footer">
                      <div class="rec-meta-info">
                        <span>⏱️ ${doc.estTime}</span>
                        <span>&bull;</span>
                        <span>${doc.pages}</span>
                      </div>

                      <div class="rec-doc-actions">
                        <button class="btn btn-primary btn-sm" onclick="ProfileView.loadRecommendedDocument('${currentRec.name}', ${idx})" title="Load into workspace and start studying">
                          ⚡ Start Learning
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="ProfileView.uploadForExam('${currentRec.name}')" title="Upload your own notes for this subject">
                          📤 Upload
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Section 3: Ideas & Strategic Roadmap to Start Learning -->
            <div class="goal-selection-box" id="learning-ideas-box">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.2rem;">
                    Ideas & Strategic Roadmap to Start Learning
                  </h3>
                  <p style="font-size: 0.8125rem; color: var(--text-muted);">
                    Follow this proven 4-phase learning workflow and tactical habits designed for ${currentRec.name}.
                  </p>
                </div>
                <span class="badge badge-accent">4-Phase Blueprint</span>
              </div>

              <!-- 4-Phase Roadmap Steps -->
              <div class="roadmap-steps-grid">
                ${currentRec.ideas.roadmap.map(item => `
                  <div class="roadmap-step-card">
                    <span class="roadmap-step-num">${item.step}</span>
                    <div class="roadmap-step-phase">${item.phase}</div>
                    <div class="roadmap-step-desc">${item.desc}</div>
                  </div>
                `).join('')}
              </div>

              <!-- 3 Starter Tactics & Ideas -->
              <div style="margin-top: 1.5rem;">
                <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.75rem; font-weight: 700;">
                  💡 Tactical Starter Ideas & High-Yield Habits
                </h4>
                <div class="starter-tactics-grid">
                  ${currentRec.ideas.starterTactics.map(tactic => `
                    <div class="starter-tactic-card">
                      <div class="starter-tactic-icon">${tactic.icon}</div>
                      <div>
                        <div class="starter-tactic-title">${tactic.title}</div>
                        <div class="starter-tactic-desc">${tactic.text}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Quick Launch Action Bar -->
              <div class="quick-launcher-banner">
                <div>
                  <strong style="color: var(--primary); font-size: 0.92rem; display: block; margin-bottom: 0.2rem;">
                    🚀 Ready to kickstart your preparation for ${currentRec.name}?
                  </strong>
                  <span style="font-size: 0.8rem; color: var(--text-secondary);">
                    Load the top recommended guide with one click or upload your own course syllabus.
                  </span>
                </div>
                <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                  <button class="btn btn-primary" onclick="ProfileView.loadRecommendedDocument('${currentRec.name}', 0)">
                    ⚡ Quick-Start Top Guide
                  </button>
                  <button class="btn btn-outline" onclick="ProfileView.uploadForExam('${currentRec.name}')">
                    📄 Upload Your Notes
                  </button>
                </div>
              </div>
            </div>

            <!-- Section 4: Platform Preferences -->
            <div class="goal-selection-box">
              <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 1rem;">
                Platform Preferences
              </h3>

              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <strong style="font-size: 0.9rem; color: var(--text-primary); display: block;">Audio Feedback & Chimes</strong>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">Play pleasant audio tones for correct and incorrect answers</span>
                  </div>
                  <input type="checkbox" id="pref-audio" ${appState.soundEnabled ? 'checked' : ''} onchange="ProfileView.toggleSound(event)" style="transform: scale(1.2); cursor: pointer;">
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.85rem;">
                  <div>
                    <strong style="font-size: 0.9rem; color: var(--text-primary); display: block;">Daily Practice Reminders</strong>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">Keep your 7-day learning streak active</span>
                  </div>
                  <input type="checkbox" checked style="transform: scale(1.2); cursor: pointer;">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  selectExam(examName) {
    appState.setTargetExam(examName);
    UI.playSound('xp');
    UI.showToast(`Target goal updated to ${examName}! Recommended documents & learning roadmap refreshed.`, 'success');
    this.render();
  },

  loadRecommendedDocument(examName, docIndex) {
    const examData = EXAM_RECOMMENDATIONS[examName] || EXAM_RECOMMENDATIONS["UPSC Civil Services"];
    const docData = examData.recommendedDocs[docIndex];
    if (!docData) return;

    // Check if document already loaded into appState.documents
    let existingDoc = appState.documents.find(d => 
      d.id === docData.id || d.title === `${docData.title}.pdf` || d.subject === docData.title
    );
    
    if (!existingDoc) {
      // Synthesize using AIAnalyzer
      const synthesized = AIAnalyzer.analyzeDocument(
        `${docData.title}.pdf`,
        docData.pages || "3.5 MB",
        docData.starterText
      );
      synthesized.id = docData.id;
      synthesized.category = examName;
      synthesized.subject = docData.title;
      
      appState.documents.unshift(synthesized);
      existingDoc = synthesized;
      appState.user.documentsCount = appState.documents.length;
    }

    appState.activeDocId = existingDoc.id;
    appState.saveToStorage();
    UI.playSound('correct');
    UI.showToast(`Loaded "${docData.title}"! Starting study session...`, 'success');
    appState.setView('study', { docId: existingDoc.id, topicId: existingDoc.topics[0]?.id });
  },

  uploadForExam(examName) {
    appState.setView('upload');
    UI.showToast(`Ready to upload your study notes for ${examName}`, 'info');
  },

  toggleSound(e) {
    appState.soundEnabled = e.target.checked;
    if (appState.soundEnabled) {
      UI.playSound('correct');
      UI.showToast('Audio effects enabled', 'info');
    } else {
      UI.showToast('Audio effects muted', 'info');
    }
  }
};
