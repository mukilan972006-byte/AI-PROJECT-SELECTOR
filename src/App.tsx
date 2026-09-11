import React, { useState } from 'react';
import { USE_CASES } from './data/projectData';
import { Header } from './components/Header';
import { BestPickHero } from './components/BestPickHero';
import { TopicComparisonGrid } from './components/TopicComparisonGrid';
import { CodeWorkspace } from './components/CodeWorkspace';
import { LiveSimulator } from './components/LiveSimulator';
import { RoadmapView } from './components/RoadmapView';
import { VivaPrep } from './components/VivaPrep';
import { Bot, Sparkles, Code, Play, CheckCircle2, Award, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'simulator' | 'roadmap' | 'viva'>('overview');
  const [selectedTopicId, setSelectedTopicId] = useState<number>(2); // Default to #2: AI HR Recruitment Assistant
  const [lang, setLang] = useState<'en' | 'ta'>('ta'); // Default to Tanglish/Tamil friendly as requested

  const selectedProject = USE_CASES.find((u) => u.id === selectedTopicId) || USE_CASES[0];
  const bestProject = USE_CASES.find((u) => u.isBestPick) || USE_CASES[0];

  const handleSelectTopic = (id: number) => {
    setSelectedTopicId(id);
    // If user clicks a topic from the grid, switch to code or overview
    setActiveTab('code');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Alert if looking at non-default topic */}
        {selectedTopicId !== 2 && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-indigo-500/40 text-xs">
            <span className="text-slate-300">
              Viewing Topic #{selectedProject.id}: <strong className="text-white">{selectedProject.title}</strong>
            </span>
            <button
              onClick={() => setSelectedTopicId(2)}
              className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
            >
              Switch back to #1 Recommended (AI HR Assistant)
            </button>
          </div>
        )}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <BestPickHero
              project={bestProject}
              onSelectCode={() => {
                setSelectedTopicId(2);
                setActiveTab('code');
              }}
              onSelectSimulator={() => setActiveTab('simulator')}
              lang={lang}
            />

            <TopicComparisonGrid
              topics={USE_CASES}
              selectedTopicId={selectedTopicId}
              onSelectTopic={handleSelectTopic}
              lang={lang}
            />
          </div>
        )}

        {/* Tab 2: Python Code */}
        {activeTab === 'code' && (
          <CodeWorkspace
            project={selectedProject}
            lang={lang}
          />
        )}

        {/* Tab 3: Interactive Live Simulator */}
        {activeTab === 'simulator' && (
          <LiveSimulator lang={lang} />
        )}

        {/* Tab 4: 5-Day Roadmap */}
        {activeTab === 'roadmap' && (
          <RoadmapView
            project={selectedProject}
            lang={lang}
          />
        )}

        {/* Tab 5: Viva Preparation */}
        {activeTab === 'viva' && (
          <VivaPrep
            project={selectedProject}
            lang={lang}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Agent 5-Day Workshop Companion & Code Generator</span>
          <span className="text-slate-400">
            Selected Winner: <strong>#2 AI HR Recruitment Assistant</strong> (Agent + Tools + RAG)
          </span>
        </div>
      </footer>
    </div>
  );
}
