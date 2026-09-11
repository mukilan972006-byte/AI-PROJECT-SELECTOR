import React from 'react';
import { UseCaseProject } from '../types';
import { Award, CheckCircle, ArrowRight, Zap, Star } from 'lucide-react';

interface TopicComparisonGridProps {
  topics: UseCaseProject[];
  selectedTopicId: number;
  onSelectTopic: (id: number) => void;
  lang: 'en' | 'ta';
}

export const TopicComparisonGrid: React.FC<TopicComparisonGridProps> = ({
  topics,
  selectedTopicId,
  onSelectTopic,
  lang
}) => {
  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{lang === 'ta' ? "Slide-la ulla 5 Topics Comparison" : "All 5 Topics From Workshop Slide"}</span>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
              Students select 1 on Day 1
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'ta' 
              ? "Ungaluku thevaiyana topic-a click panni athoda code & architecture-a paarkalam" 
              : "Compare scores, agent capabilities, and viva difficulty across all 5 choices"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((t) => {
          const isSelected = t.id === selectedTopicId;
          const isWinner = t.isBestPick;

          return (
            <div
              key={t.id}
              onClick={() => onSelectTopic(t.id)}
              className={`group relative rounded-xl p-5 cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between ${
                isWinner
                  ? 'bg-gradient-to-b from-indigo-950/70 via-slate-900 to-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/50'
                  : isSelected
                  ? 'bg-slate-800/80 border-slate-600 ring-1 ring-slate-400'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Winner Tag */}
              {isWinner && (
                <div className="absolute -top-3 left-4 inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                  <Award className="w-3 h-3" />
                  <span>#1 Best Choice</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold flex items-center justify-center text-slate-300">
                      #{t.id}
                    </span>
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                      {t.capabilities}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{t.score}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                  {t.originalDescription}
                </p>

                {/* Score meters */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Live Demo Impact:</span>
                    <span className="font-semibold text-slate-200">{t.demoRating} / 10</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Viva & Scoring Impression:</span>
                    <span className="font-semibold text-slate-200">{t.vivaRating} / 10</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200">
                  {t.pythonFiles.length} Python File{t.pythonFiles.length > 1 ? 's' : ''}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors ${
                  isWinner ? 'text-indigo-300' : 'text-slate-400 group-hover:text-indigo-400'
                }`}>
                  <span>{isSelected ? 'Selected' : 'View Code'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
