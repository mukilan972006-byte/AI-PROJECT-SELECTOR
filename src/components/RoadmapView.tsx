import React from 'react';
import { UseCaseProject } from '../types';
import { Calendar, CheckCircle, Code, Award, ArrowRight, Clock, Target } from 'lucide-react';

interface RoadmapViewProps {
  project: UseCaseProject;
  lang: 'en' | 'ta';
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ project, lang }) => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>{lang === 'ta' ? "5-Day Project Roadmap (Day 1 to Day 5)" : "5-Day Project Milestone Roadmap"}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ta'
                ? "Slide-la keta maathiri Day 1-la start panni Day 5-la final submission mudikira step-by-step schedule."
                : "Structured daily deliverables to develop this use case into your final workshop project across all 5 days."}
            </p>
          </div>
          <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
            {project.title}
          </span>
        </div>
      </div>

      {/* Daily Milestones */}
      <div className="space-y-4">
        {project.roadmap.map((day) => (
          <div
            key={day.day}
            className="relative bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Day Badge */}
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Day</span>
                  <span className="text-lg font-black text-white">{day.day}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{day.title}</span>
                  </h3>
                  <p className="text-xs text-indigo-300/90 mt-0.5 font-medium">
                    {day.focus}
                  </p>

                  {/* Tasks List */}
                  <div className="mt-3 space-y-1.5">
                    {day.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deliverable & Code Hook */}
              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-5 min-w-[240px] space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Target className="w-3 h-3 text-emerald-400" />
                    Day {day.day} Deliverable:
                  </span>
                  <p className="text-xs text-emerald-300 font-semibold mt-1">
                    {day.deliverable}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Code className="w-3 h-3 text-indigo-400" />
                    Key Script:
                  </span>
                  <code className="text-xs text-indigo-300 font-mono bg-slate-950 px-2 py-1 rounded block mt-1 border border-slate-800">
                    {day.codeHook}
                  </code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
