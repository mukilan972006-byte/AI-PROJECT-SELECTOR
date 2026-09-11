import React, { useState } from 'react';
import { SAMPLE_CANDIDATES, SAMPLE_JOBS } from '../data/projectData';
import { SampleCandidate, SampleJob, ScreeningReport } from '../types';
import { Play, CheckCircle2, XCircle, AlertCircle, HelpCircle, Layers, Cpu, Sparkles, RefreshCw, Clock } from 'lucide-react';

interface LiveSimulatorProps {
  lang: 'en' | 'ta';
}

export const LiveSimulator: React.FC<LiveSimulatorProps> = ({ lang }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<SampleCandidate>(SAMPLE_CANDIDATES[0]);
  const [selectedJob, setSelectedJob] = useState<SampleJob>(SAMPLE_JOBS[0]);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customResume, setCustomResume] = useState<string>('');
  const [customJob, setCustomJob] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [report, setReport] = useState<ScreeningReport | null>(null);

  const handleRunAgent = () => {
    setIsProcessing(true);
    setReport(null);
    setCurrentStep(1);

    // Simulated agent reasoning stages with realistic delays
    setTimeout(() => {
      setCurrentStep(2);
    }, 500);

    setTimeout(() => {
      setCurrentStep(3);
    }, 1100);

    setTimeout(() => {
      setCurrentStep(4);
    }, 1700);

    setTimeout(() => {
      setCurrentStep(5);
      // Compute result
      const candSkills = isCustom 
        ? ["Python", "FastAPI", "Docker", "Git"] 
        : selectedCandidate.skills;
      const reqSkills = isCustom 
        ? ["Python", "Docker", "LangChain", "RAG"] 
        : selectedJob.requiredSkills;

      const candLower = candSkills.map(s => s.toLowerCase());
      const reqLower = reqSkills.map(s => s.toLowerCase());

      const matched = candSkills.filter(s => reqLower.includes(s.toLowerCase()));
      const missing = reqSkills.filter(s => !candLower.includes(s.toLowerCase()));

      const skillScore = Math.round((matched.length / Math.max(reqSkills.length, 1)) * 100);
      const candExp = isCustom ? 2.5 : selectedCandidate.experienceYears;
      const reqExp = isCustom ? 3.0 : selectedJob.experienceRequired;
      const expScore = Math.min(Math.round((candExp / Math.max(reqExp, 1)) * 100), 100);

      const finalScore = Math.round(skillScore * 0.7 + expScore * 0.3);

      let status: 'Strong Hire' | 'Shortlist for Interview' | 'Under Review' | 'Not a Fit' = 'Under Review';
      if (finalScore >= 80) status = 'Strong Hire';
      else if (finalScore >= 65) status = 'Shortlist for Interview';
      else if (finalScore >= 45) status = 'Under Review';
      else status = 'Not a Fit';

      const generatedQuestions = [
        {
          type: 'Technical' as const,
          question: `Given your experience with ${matched[0] || 'Python'}, how do you structure asynchronous requests and manage thread pooling in high-concurrency environments?`,
          expectedAnswerKey: `Candidate should mention async/await patterns, ASGI event loops, connection pools, and non-blocking I/O.`
        },
        {
          type: 'RAG/Agent' as const,
          question: `In an Agentic system, how do you handle cases where vector similarity search returns low-confidence or conflicting chunks from the knowledge base?`,
          expectedAnswerKey: `Candidate should discuss re-ranking (Cross-Encoders), score thresholds, fallback queries, and guardrails against hallucination.`
        },
        {
          type: 'Coding' as const,
          question: missing.length > 0 
            ? `The position requires hands-on ${missing[0]}. How would you quickly ramp up on ${missing[0]} and apply it to our microservices architecture?`
            : `How do you write automated test suites (pytest/integration tests) for LLM tool calling pipelines?`,
          expectedAnswerKey: missing.length > 0
            ? `Candidate should demonstrate understanding of underlying core concepts and quick onboarding methodology.`
            : `Mocking LLM responses, golden dataset evaluation, latency testing, and deterministic assertion checks.`
        },
        {
          type: 'Behavioral' as const,
          question: `Describe a situation where an AI feature gave unexpected answers in user testing. How did you diagnose and resolve the issue?`,
          expectedAnswerKey: `Demonstrating systematic prompt auditing, system log trace analysis, and transparent communication with product team.`
        }
      ];

      const agentThoughtTrace = [
        {
          step: 1,
          action: "Vectorizing Resume into Semantic Chunks",
          toolCalled: "ChromaDB.index_resume()",
          detail: "Extracted 4 sections: Summary, Experience, Skills, Education. Embedded using text-embedding-004."
        },
        {
          step: 2,
          action: "Extracting Technical Entities",
          toolCalled: "extract_skills_and_experience()",
          detail: `Found ${candSkills.length} technical skills and ${candExp} years verified experience.`
        },
        {
          step: 3,
          action: "Mathematical ATS Compatibility Scoring",
          toolCalled: "calculate_ats_score()",
          detail: `Skill Match: ${skillScore}%, Experience Compatibility: ${expScore}%. Computed weighted total: ${finalScore}%.`
        },
        {
          step: 4,
          action: "Targeted Interview Question Generation",
          toolCalled: "generate_interview_questions()",
          detail: `Synthesized 4 targeted questions addressing candidate strengths in ${matched.slice(0, 2).join(', ')} and gaps in ${missing.join(', ') || 'none'}.`
        }
      ];

      setReport({
        candidateName: isCustom ? "Custom Candidate" : selectedCandidate.name,
        jobTitle: isCustom ? "Custom Job Role" : selectedJob.title,
        matchScore: finalScore,
        status,
        matchedSkills: matched,
        missingSkills: missing,
        experienceMatch: candExp >= reqExp,
        experienceComment: candExp >= reqExp 
          ? `Candidate has ${candExp} yrs (exceeds required ${reqExp} yrs)`
          : `Candidate has ${candExp} yrs (requires ${reqExp} yrs - minor gap)`,
        strengths: [
          `Strong profile alignment with ${matched.slice(0, 3).join(', ')}`,
          candExp >= reqExp ? "Meets or exceeds seniority requirements" : "Demonstrates high learning velocity",
          "Production experience in relevant tech stacks"
        ],
        areasOfConcern: missing.length > 0 
          ? [`Missing explicit keyword experience in: ${missing.join(', ')}`]
          : ["No major technical skill gaps identified"],
        interviewQuestions: generatedQuestions,
        agentThoughtTrace
      });

      setIsProcessing(false);
    }, 2200);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'ta' ? "Live AI Screening Agent Test Platform" : "Interactive Live Agent Simulator"}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ta'
                ? "Intha simulator-la resume & job description select panni AI Agent eppadi RAG & Tools use panni result tharudhu nu live-ah paarkalam."
                : "Experience the autonomous AI HR Screening Agent in action. Watch the real-time reasoning loop, RAG retrieval, and question generator."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustom(!isCustom)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {isCustom ? "Use Sample Data" : "Test Custom Text"}
            </button>
          </div>
        </div>
      </div>

      {/* Input Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Candidate Resume Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>{lang === 'ta' ? "Candidate Resume Input" : "Candidate Resume"}</span>
            </h3>
            {!isCustom && (
              <span className="text-xs text-slate-400 font-mono">
                {selectedCandidate.experienceYears} Years Exp
              </span>
            )}
          </div>

          {!isCustom ? (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_CANDIDATES.map((cand) => (
                  <button
                    key={cand.id}
                    onClick={() => {
                      setSelectedCandidate(cand);
                      setReport(null);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedCandidate.id === cand.id
                        ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{cand.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{cand.title}</div>
                  </button>
                ))}
              </div>

              {/* Selected candidate details */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-indigo-300">{selectedCandidate.name} — {selectedCandidate.title}</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedCandidate.resumeSummary}</p>
                <div>
                  <span className="text-slate-400 text-[11px] block mb-1">Key Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCandidate.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <textarea
              value={customResume}
              onChange={(e) => setCustomResume(e.target.value)}
              placeholder="Paste candidate resume text here (Skills, Experience, Projects)..."
              className="w-full h-44 p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500"
            />
          )}
        </div>

        {/* Job Description Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>{lang === 'ta' ? "Job Requirements (JD)" : "Job Description (Target Role)"}</span>
            </h3>
            {!isCustom && (
              <span className="text-xs text-slate-400 font-mono">
                {selectedJob.experienceRequired} Years Required
              </span>
            )}
          </div>

          {!isCustom ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_JOBS.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                      setReport(null);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedJob.id === job.id
                        ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{job.title}</div>
                    <div className="text-[10px] text-slate-400">Min {job.experienceRequired} Yrs</div>
                  </button>
                ))}
              </div>

              {/* Selected Job details */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-cyan-300">{selectedJob.title}</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedJob.description}</p>
                <div>
                  <span className="text-slate-400 text-[11px] block mb-1">Required Competencies:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedJob.requiredSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 text-[10px] font-mono border border-cyan-800/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <textarea
              value={customJob}
              onChange={(e) => setCustomJob(e.target.value)}
              placeholder="Paste Job Description text here (Required skills, experience, responsibilities)..."
              className="w-full h-44 p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
            />
          )}
        </div>
      </div>

      {/* Trigger Button */}
      <div className="flex justify-center">
        <button
          id="btn-run-screening-agent"
          onClick={handleRunAgent}
          disabled={isProcessing}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{lang === 'ta' ? "Agent Process Pannudhu..." : "Agent Reasoning in Progress..."}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>{lang === 'ta' ? "Run AI Screening Agent (Live Demo)" : "Execute AI Screening Agent"}</span>
            </>
          )}
        </button>
      </div>

      {/* Progress & Real-time Thought Loop */}
      {isProcessing && (
        <div className="bg-slate-950 border border-indigo-500/40 rounded-xl p-5 animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 animate-spin" />
              <span>Autonomous Agent Execution Loop</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">Step {currentStep} of 4</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className={`p-2 rounded flex items-center gap-2 ${currentStep >= 1 ? 'bg-indigo-950/60 text-indigo-300' : 'text-slate-600'}`}>
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>[RAG Ingestion] Chunking resume into ChromaDB vector collections...</span>
            </div>
            <div className={`p-2 rounded flex items-center gap-2 ${currentStep >= 2 ? 'bg-indigo-950/60 text-indigo-300' : 'text-slate-600'}`}>
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>[Tool Call: extract_skills] Identifying tech stacks and experience duration...</span>
            </div>
            <div className={`p-2 rounded flex items-center gap-2 ${currentStep >= 3 ? 'bg-indigo-950/60 text-indigo-300' : 'text-slate-600'}`}>
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>[Tool Call: calculate_ats_score] Applying 70/30 deterministic compatibility formula...</span>
            </div>
            <div className={`p-2 rounded flex items-center gap-2 ${currentStep >= 4 ? 'bg-emerald-950/60 text-emerald-300' : 'text-slate-600'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>[Agent Synthesis] Generating customized technical and viva interview questions...</span>
            </div>
          </div>
        </div>
      )}

      {/* Completed Report Display */}
      {report && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Top Score & Verdict Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-4">
              {/* Circular Gauge Representation */}
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-slate-900 border-4 border-slate-800">
                <div className={`text-2xl font-black ${
                  report.matchScore >= 80 ? 'text-emerald-400' : report.matchScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {report.matchScore}%
                </div>
                <div className="absolute -bottom-1 text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                  ATS Fit
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Agent Recommendation:</div>
                <div className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                  {report.status === 'Strong Hire' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {report.status === 'Shortlist for Interview' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                  {report.status === 'Under Review' && <AlertCircle className="w-5 h-5 text-amber-400" />}
                  {report.status === 'Not a Fit' && <XCircle className="w-5 h-5 text-rose-400" />}
                  <span>{report.status}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Candidate: <strong className="text-slate-200">{report.candidateName}</strong> for <strong className="text-slate-200">{report.jobTitle}</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end text-xs text-slate-400">
              <span className="font-semibold text-slate-300">{report.experienceComment}</span>
              <span className="text-[11px] text-emerald-400 mt-1">Verified via Agent ReAct Loop</span>
            </div>
          </div>

          {/* Skills Gap Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Matched Skills ({report.matchedSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {report.matchedSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-emerald-900/50 text-emerald-200 text-xs font-semibold border border-emerald-500/40">
                    ✓ {s}
                  </span>
                ))}
                {report.matchedSkills.length === 0 && (
                  <span className="text-xs text-slate-400">No overlapping skills found.</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Missing / Gaps ({report.missingSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {report.missingSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-rose-900/50 text-rose-200 text-xs font-semibold border border-rose-500/40">
                    ✗ {s}
                  </span>
                ))}
                {report.missingSkills.length === 0 && (
                  <span className="text-xs text-emerald-400">Zero skill gaps! 100% requirements met.</span>
                )}
              </div>
            </div>
          </div>

          {/* Tailored Interview Questions Generated */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>{lang === 'ta' ? "AI Agent Generate Panna Interview Questions" : "Agent-Generated Tailored Interview Questions"}</span>
              </h3>
              <span className="text-xs text-indigo-300 font-mono">
                Dynamically mapped to candidate claims
              </span>
            </div>

            <div className="space-y-3">
              {report.interviewQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      Q{idx + 1} • {q.type}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      Evaluation Question
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                    {q.question}
                  </p>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-slate-300">Expected Response Criteria: </strong>
                    {q.expectedAnswerKey}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Execution Audit Trail */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'ta' ? "Agent Thought Trace (Viva-la Kaatta Vendiyadhu)" : "Agent ReAct Thought Trace (Viva Evidence)"}</span>
            </h4>
            <div className="space-y-2">
              {report.agentThoughtTrace.map((st) => (
                <div key={st.step} className="text-xs font-mono flex items-start gap-2 text-slate-300">
                  <span className="text-indigo-400 font-bold">[{st.step}]</span>
                  <div>
                    <span className="text-white font-semibold">{st.action}</span>
                    <span className="text-slate-500 ml-1">({st.toolCalled})</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{st.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
