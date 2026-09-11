import React, { useState } from 'react';
import { UseCaseProject } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Lightbulb, MessageSquareQuote, ShieldAlert, Award } from 'lucide-react';

interface VivaPrepProps {
  project: UseCaseProject;
  lang: 'en' | 'ta';
}

export const VivaPrep: React.FC<VivaPrepProps> = ({ project, lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>{lang === 'ta' ? "Viva & Review Defense Questions (Examiner Enna Keppaanga?)" : "Viva Defense & Examiner Questions"}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ta'
                ? "Final day review / viva presentation-la faculty & external examiners kekka koodiya top questions and perfect answers."
                : "Top questions frequently asked by review panels during Day 5 project presentations, complete with pro-tips."}
            </p>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-semibold">
            Day 5 Presentation Prep
          </span>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {project.vivaQuestions.map((q, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    Q{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {q.question}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-4 pt-0 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                  {/* English Technical Answer */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Formal Answer (For Examiner):</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {q.answerEn}
                    </p>
                  </div>

                  {/* Tanglish Explanation */}
                  <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs">
                    <div className="font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Purinjuka Tanglish Explanation (Quick Concept):</span>
                    </div>
                    <p className="text-indigo-200/90 leading-relaxed font-sans">
                      {q.explanationTa}
                    </p>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>Pro Tip for Marks:</strong> {q.proTip}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
