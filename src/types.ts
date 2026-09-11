export interface PythonFile {
  filename: string;
  description: string;
  code: string;
  language: string;
}

export interface DayMilestone {
  day: number;
  title: string;
  focus: string;
  tasks: string[];
  deliverable: string;
  codeHook: string;
}

export interface VivaQuestion {
  question: string;
  answerEn: string;
  explanationTa: string; // Tanglish / Tamil explanation
  proTip: string;
}

export interface UseCaseProject {
  id: number;
  title: string;
  tagline: string;
  originalDescription: string;
  capabilities: string;
  isBestPick: boolean;
  score: number; // e.g. 9.8
  demoRating: number;
  vivaRating: number;
  complexityRating: number;
  whyBest: string;
  whyBestTa: string;
  architectureSummary: string;
  pythonFiles: PythonFile[];
  roadmap: DayMilestone[];
  vivaQuestions: VivaQuestion[];
}

export interface SampleCandidate {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  skills: string[];
  resumeSummary: string;
  education: string;
}

export interface SampleJob {
  id: string;
  title: string;
  experienceRequired: number;
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
}

export interface ScreeningReport {
  candidateName: string;
  jobTitle: string;
  matchScore: number;
  status: 'Strong Hire' | 'Shortlist for Interview' | 'Under Review' | 'Not a Fit';
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: boolean;
  experienceComment: string;
  strengths: string[];
  areasOfConcern: string[];
  interviewQuestions: {
    type: 'Technical' | 'RAG/Agent' | 'Behavioral' | 'Coding';
    question: string;
    expectedAnswerKey: string;
  }[];
  agentThoughtTrace: {
    step: number;
    action: string;
    toolCalled: string;
    detail: string;
  }[];
}
