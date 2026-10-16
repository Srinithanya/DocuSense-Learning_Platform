# DocuSense — AI-Powered Educational Web Application (Frontend)

**"Turn Your Documents Into Your Learning Journey."**  
*AI-powered personalized learning and assessment platform from your own study materials.*

---

## 🌟 Overview & Concept

**DocuSense** is a modern, light-theme educational SaaS frontend designed specifically for college students and competitive-exam aspirants (UPSC, GATE, SSC, Banking, etc.). 

Unlike generic ChatGPT clones, DocuSense is a dedicated **learning and assessment engine** that structures raw study materials (PDFs, notes, textbooks) into:
1. **Executive AI Study Summaries** with syllabus-aligned takeaways.
2. **Identified Important Topics** ranked by importance and past exam weighting.
3. **Distraction-Free Study Mode** with structured notes, key concepts, exam facts, and real-world examples.
4. **Gamified Challenge Mode Tests** with XP, streaks, levels, and badges.
5. **Mandatory In-Depth Explanations** shown after **every single question** (both correct and incorrect) highlighting *"Why this matters for your exam"*.
6. **Granular Topic Performance** identifying 🟢 Strong Areas, 🟡 Needs Practice, and 🔴 Weak Areas.
7. **Personalized Adaptive Recommendations** providing instant 5-question targeted practice to close mastery gaps.
8. **Visual Learning Analytics & Readiness Meters** to track progress toward the student's target exam.

---

## 🎨 Design System & Aesthetics (Strict Light Mode SaaS)

DocuSense follows a clean, academic, modern light-theme SaaS aesthetic:
- **Background**: Very light blue-gray (`#f8fafc`, `#f1f5f9`).
- **Cards**: Pure white (`#ffffff`) with 12–18px border radius, thin subtle borders (`#e2e8f0`), and soft shadows.
- **Primary Brand**: Calm Blue (`#2563eb`, `#1d4ed8`).
- **Secondary**: Soft Indigo (`#4f46e5`).
- **Accent**: Mint / Teal (`#0d9488`).
- **Feedback**:
  - Success: Soft Green (`#10b981`, `#ecfdf5`)
  - Warning: Soft Amber (`#f59e0b`, `#fffbeb`)
  - Danger: Soft Red (`#ef4444`, `#fef2f2`)
- **Typography**: Google Fonts **Plus Jakarta Sans** and **Inter** for crisp academic legibility.
- **Micro-Audio**: Non-blocking pleasant audio synthesizer via native browser **Web Audio API** (subtle cheerful chimes for correct answers and XP sparkles, gentle tone for incorrect answers, with mute toggle).

---

## 📂 Project Architecture (Zero External Build Steps Required)

Built purely with modern semantic HTML5, Vanilla CSS3 with custom properties, and modular JavaScript:

```
minidocusense/
├── index.html                # Single-page application entry point
├── README.md                 # Complete documentation & user journey guide
├── css/
│   ├── main.css              # Reset, typography, design tokens, sidebar & header layout
│   ├── components.css        # Buttons, cards, stat widgets, badges, progress bars, toasts, modals
│   ├── views.css             # Page-specific styles (Dashboard, Upload, Analysis, Study, Test, Results, etc.)
│   └── responsive.css        # Responsive breakpoints, mobile drawer, and mobile bottom navigation
└── js/
    ├── data.js               # Initial datasets and fallback reference banks
    ├── ai-analyzer.js        # Client-side PDF/text extractor, dynamic summarizer, and MCQ generator
    ├── state.js              # Central reactive state manager & test session tracker
    ├── ui.js                 # Web Audio API synthesizer, toast manager, modals, mobile navigation
    ├── app.js                # App router, global event delegation, search & keyboard shortcuts
    └── views/
        ├── dashboard.js      # Welcome hero, 4 statistics cards, continue learning, recommended topics
        ├── upload.js         # Drag & drop upload, sample notes loaders, animated 5-step AI pipeline
        ├── analysis.js       # Document overview, AI Study Summary, identified important topics
        ├── study.js          # Distraction-free reader, concept boxes, exam facts, progress tracker
        ├── test.js           # Gamified test interface with mandatory instant explanation card
        ├── results.js        # Score /100, topic performance bars (Strong/Weak), personalized recommendations
        ├── history.js        # Past test records, scores, accuracy, and review links
        ├── progress.js       # SVG accuracy trend chart, 7-day streak heatmap, exam readiness meter
        ├── documents.js      # My Documents library, search, filter tabs, card actions, empty state
        └── profile.js        # Target exam selector (UPSC/GATE/SSC/etc.), recommended documents & starter learning roadmap
```

---

## 🚀 How to Run the Project

No Node.js, npm, or build tools are required.

Simply double-click or open `index.html` in any modern web browser:
```
c:\Users\Dell\OneDrive\Desktop\minidocusense\index.html
```

Or open with any local server if preferred:
```bash
# Python
python -m http.server 3000

# Node
npx serve .
```

---

## 🧭 Complete User Journey Walkthrough

1. **Dashboard**:
   - Greeted by **"Good Morning, Learner 👋"** with target exam badge (*UPSC Civil Services*).
   - View 4 clean stat cards: Documents (12), Tests Completed (24), Average Score (82%), Study Streak (7 days 🔥).
   - Browse **Continue Learning** cards (*Indian Polity, Data Structures, Operating Systems, Computer Networks, General Aptitude*).
   - Check **Recommended Topics** with visual indicators (*Fundamental Rights - Mastered vs Directive Principles - Needs Practice ⚠️*).

2. **Upload & AI Processing**:
   - Click **"+ Upload Study Material"**.
   - Drag and drop any PDF/DOCX/TXT file, or click any of the **Quick Load Sample** buttons (*Indian Polity, Data Structures, Operating Systems*).
   - Experience the **animated 5-step AI pipeline**:
     1. *Reading document*
     2. *Understanding content*
     3. *Identifying topics*
     4. *Creating study material*
     5. *Preparing practice questions*

3. **Document Analysis**:
   - Inspect the metadata: *120 Pages, 18 Topics identified, 7 High-Yield Topics*.
   - Read the **Executive AI Study Summary** and high-yield core concepts.
   - Review the identified topics with importance dots (*High, Medium, Normal*).
   - Click **"Start Learning"** or **"Take Practice Test"**.

4. **Study Mode**:
   - Read distraction-free structured notes on *Fundamental Rights (Articles 12-35)*.
   - Interact with formatted **Concept Boxes**, **Exam Fact Banners**, **Real-world Scenarios**, and highlighted terms.
   - Adjust font sizes or bookmark topics.
   - Track progress on the sticky right-hand panel (72% progress, 8/12 topics, 14 key concepts).

5. **Gamified Practice Test (Challenge Mode)**:
   - Topic: *Fundamental Rights*, Question X of 10, animated timer and progress bar.
   - Select option cards using mouse or keyboard (**1, 2, 3, 4** or **A, B, C, D**).
   - Instant visual feedback and audio chime.
   - **Mandatory Explanation Panel**:
     - ✅ Correct or ❌ Incorrect status banner.
     - Direct comparison: **Your Answer** vs **Correct Answer**.
     - **Conceptual Explanation** explaining the legal/technical rationale.
     - **Why this matters for your exam** exam context.
     - Press **Enter** / **Space** or click **"Next Question →"** to advance.

6. **Test Results & Topic Performance**:
   - Big celebration banner: **Test Completed 🎉** with score (**82 / 100**).
   - Metrics: Correct answers (8/10), Incorrect answers (2/10), Accuracy (80%), Time taken (06:45), XP earned (+95 XP).
   - **Topic Performance Breakdown**:
     - *Fundamental Rights*: 🟢 90% (Strong Area)
     - *Union Parliament*: 🟢 80% (Strong Area)
     - *Directive Principles*: 🟡 60% (Needs Practice)
     - *Fundamental Duties*: 🔴 50% (Weak Area)

7. **Personalized Recommendations**:
   - ⚠️ Notice: *You need more practice in: Directive Principles*.
   - Click **"Take 5-Question Practice Test"** to immediately launch targeted adaptive practice questions on Directive Principles!
   - View prioritized **Keep Improving** study sequence.

8. **Test History & Visual Analytics**:
   - **Test History**: Filterable log of previous tests with scores, accuracy, and date.
   - **Progress & Insights**: Smooth SVG accuracy trend line chart, 7-day study consistency heatmap, and target exam readiness gauge (78%).

9. **My Documents & Profile**:
   - **My Documents**: Filter by *All, Recently Added, In Progress, Completed*, search by keyword, view page counts, or trigger Open, Study, Practice, Delete (includes empty state demo toggle).
   - **Profile**: Switch target exams (*UPSC, SSC, Banking, GATE, College, Custom*) to explore curated recommended documents, syllabus weighting, tactical starter roadmaps & ideas to begin learning, and manage audio/reminder preferences.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Context |
|---|---|---|
| `1` or `A` | Select Option A | Test Mode |
| `2` or `B` | Select Option B | Test Mode |
| `3` or `C` | Select Option C | Test Mode |
| `4` or `D` | Select Option D | Test Mode |
| `Enter` or `Space` | Next Question / View Results | Test Mode (after answering) |
| `Ctrl + K` or `Cmd + K` | Focus Global Search Bar | Anywhere |
| `Escape` | Close Modal / Mobile Menu | Anywhere |

---
## Running with backend + database (login)

1. Install Python 3.8+ and Ollama (`ollama pull llama3.2`).
2. In the project folder:
   ```
   pip install -r backend/requirements.txt
   python backend/main.py
   ```
3. Open http://localhost:8000 , create an account and log in.

Data is stored per user in `backend/docusense.db` (SQLite): users, documents, bookmarks, test history.
Keep `backend/secret.key` private (it signs login tokens). AI calls still go from the browser to Ollama.
