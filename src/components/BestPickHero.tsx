import React from 'react';
import { UseCaseProject } from '../types';
import { Award, CheckCircle2, ArrowRight, Play, FileCode, Layers, ShieldCheck, Flame } from 'lucide-react';

interface BestPickHeroProps {
  project: UseCaseProject;
  onSelectCode: () => void;
  onSelectSimulator: () => void;
  lang: 'en' | 'ta';
}

export const BestPickHero: React.FC<BestPickHeroProps> = ({
  project,
  onSelectCode,
  onSelectSimulator,
  lang
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border-2 border-indigo-500/40 p-6 md:p-8 shadow-2xl shadow-indigo-950/50">
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{lang === 'ta' ? "Top Recommendation - #1 Best Choice" : "#1 Best Pick For Maximum Marks & Impact"}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Evaluator Score:</span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
              ★ 9.8 / 10
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Use Case #{project.id}: {project.title}
          </h1>
          <p className="text-sm sm:text-base text-indigo-200/90 mt-1 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Slide Requirement & Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 mb-6">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Slide Task:</div>
            <div className="text-xs text-slate-200 mt-0.5">{project.originalDescription}</div>
          </div>
          <div>
            <div className="text-[11px] text-indigo-400 uppercase font-bold tracking-wider">Key Agent Capabilities:</div>
            <div className="text-xs font-semibold text-indigo-200 mt-0.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>{project.capabilities}</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-emerald-400 uppercase font-bold tracking-wider">5-Day Feasibility:</div>
            <div className="text-xs font-semibold text-emerald-300 mt-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Complete & Ready to Run</span>
            </div>
          </div>
        </div>

        {/* Why this is the best topic */}
        <div className="bg-indigo-950/40 rounded-xl p-4 border border-indigo-500/30 mb-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-amber-400" />
            {lang === 'ta' 
              ? "Yen Intha Topic Select Panna Vendiyadhu? (Why this is the Winner):" 
              : "Why AI HR Recruitment Assistant is the Strongest Choice:"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ta' ? project.whyBestTa : project.whyBest}
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Instant Visual Impact:</strong> ATS percentage score gauge</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Full Agentic Pillars:</strong> ReAct Loop + Tools + Vector RAG</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Real World Hiring Value:</strong> Resume portfolio booster</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="hero-btn-code"
            onClick={onSelectCode}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileCode className="w-4 h-4" />
            <span>{lang === 'ta' ? "Python Code Paarkavum (Full Code)" : "View Complete Python Code"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-btn-simulator"
            onClick={onSelectSimulator}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{lang === 'ta' ? "Live Agent Simulator Test Panna" : "Try Interactive Simulator Demo"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
