/**
 * DocuSense - Fresh State Data Template
 * ZERO pre-populated sample files: all documents, summaries, topics,
 * notes, and test questions are generated dynamically when the learner uploads their PDF.
 */

const DOCUSENSE_DATA = {
  // Initial user details (Clean starting slate)
  user: {
    name: "Alex Sharma",
    avatar: "AS",
    email: "alex.sharma@aspirant.edu",
    targetExam: "UPSC Civil Services",
    level: 1,
    levelTitle: "Curious Learner",
    xp: 0,
    xpNextLevel: 500,
    streakDays: 0,
    testsCompleted: 0,
    documentsCount: 0,
    averageScore: 0,
    readinessScore: 0
  },

  // Available Target Exams for learner selection
  targetExams: [
    { id: "upsc", name: "UPSC Civil Services", tag: "Most Popular", desc: "General Studies & Optional focus" },
    { id: "ssc", name: "SSC CGL / CHSL", tag: "High Speed", desc: "Quantitative Aptitude & GS" },
    { id: "banking", name: "Banking / IBPS PO", tag: "Aptitude Focus", desc: "Reasoning & Financial Awareness" },
    { id: "gate", name: "GATE CSE", tag: "Technical", desc: "Algorithms, OS, Networks & Discrete Math" },
    { id: "college", name: "University / College Exams", tag: "Semester", desc: "Syllabus-aligned preparation" },
    { id: "custom", name: "Self-Paced Learning", tag: "Custom", desc: "General knowledge & professional skills" }
  ],

  // Documents start completely empty - populated ONLY when the learner uploads their PDF
  documents: [],

  // Study content starts null - generated dynamically from uploaded PDF
  studyContent: null,

  // Question bank starts empty - generated dynamically from uploaded PDF
  questionsBank: [],

  // Adaptive practice set starts empty - generated dynamically from uploaded PDF
  adaptivePracticeBank: [],

  // Test history starts empty - populated when user finishes tests on their uploaded material
  testHistory: [],

  // Achievements template
  achievements: [
    { id: "ach-1", title: "Document Explorer", desc: "Uploaded first study material for AI processing", icon: "📄", unlocked: false, unlockedDate: "Locked" },
    { id: "ach-2", title: "Test Champion", desc: "Completed first challenge test on study material", icon: "🏆", unlocked: false, unlockedDate: "Locked" },
    { id: "ach-3", title: "Sharp Thinker", desc: "Achieved over 80% accuracy in a challenge test", icon: "⚡", unlocked: false, unlockedDate: "Locked" },
    { id: "ach-4", title: "Deep Reader", desc: "Studied AI-generated summary and notes", icon: "📚", unlocked: false, unlockedDate: "Locked" },
    { id: "ach-5", title: "Weakness Slayer", desc: "Retested and improved a weak topic to >80%", icon: "🎯", unlocked: false, unlockedDate: "Locked" },
    { id: "ach-6", title: "Streak Master", desc: "Maintain daily study consistency for 7 days", icon: "🔥", unlocked: false, unlockedDate: "Locked" }
  ]
};
