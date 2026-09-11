import React from 'react';
import { Sparkles, Code, Bot, Calendar, HelpCircle, Award, Languages } from 'lucide-react';

interface HeaderProps {
  activeTab: 'overview' | 'code' | 'simulator' | 'roadmap' | 'viva';
  setActiveTab: (tab: 'overview' | 'code' | 'simulator' | 'roadmap' | 'viva') => void;
  lang: 'en' | 'ta';
  setLang: (l: 'en' | 'ta') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, lang, setLang }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">AI Agent Project Hub</span>
                <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full font-medium border border-indigo-500/30">
                  5-Day Workshop
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'ta' 
                  ? "Ungalukaana Best Topic & Full Python Code Ready!"
                  : "Topic Evaluator & Full Python Code Generator"}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? "Best Topic" : "Best Topic"}</span>
            </button>

            <button
              id="tab-code"
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? "Python Code (Ready)" : "Python Code"}</span>
            </button>

            <button
              id="tab-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? "Live Demo Test" : "Live Simulator"}</span>
            </button>

            <button
              id="tab-roadmap"
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? "Day 1-5 Plan" : "5-Day Plan"}</span>
            </button>

            <button
              id="tab-viva"
              onClick={() => setActiveTab('viva')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'viva'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? "Viva Q&A" : "Viva Prep"}</span>
            </button>
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              id="btn-lang-toggle"
              onClick={() => setLang(lang === 'ta' ? 'en' : 'ta')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Toggle Tanglish / English Explanations"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'ta' ? 'தமிழ் / Tanglish' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 bg-slate-950 border-t border-slate-800 gap-2 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Best Topic
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Python Code
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'simulator' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
        >
          Live Simulator
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'roadmap' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          5-Day Plan
        </button>
        <button
          onClick={() => setActiveTab('viva')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'viva' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Viva Q&A
        </button>
      </div>
    </header>
  );
};
