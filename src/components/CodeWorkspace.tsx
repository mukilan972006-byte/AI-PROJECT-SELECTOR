import React, { useState } from 'react';
import { UseCaseProject, PythonFile } from '../types';
import { Copy, Check, Download, Terminal, BookOpen, Layers, Sparkles, ExternalLink } from 'lucide-react';

interface CodeWorkspaceProps {
  project: UseCaseProject;
  lang: 'en' | 'ta';
}

export const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({ project, lang }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const activeFile: PythonFile = project.pythonFiles[selectedFileIndex] || project.pythonFiles[0];

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAllZipOrText = () => {
    project.pythonFiles.forEach((file) => {
      const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">
              {project.title} - {lang === 'ta' ? "Complete Python Code" : "Production Python Code"}
            </h2>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono border border-indigo-500/30">
              Python 3.10+
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ta' 
              ? "Keezhe ulla files-a copy panni unga system-la run pannalam. Fully working and tested!"
              : "Modular, well-commented files ready to paste into your VS Code or Google Colab."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadAllZipOrText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === 'ta' ? "All Files Download" : "Download All Files"}</span>
          </button>
        </div>
      </div>

      {/* Main Code Box with Tabs */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        {/* File Tabs */}
        <div className="flex items-center justify-between bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 overflow-x-auto">
          <div className="flex items-center space-x-1">
            {project.pythonFiles.map((file, idx) => {
              const isActive = idx === selectedFileIndex;
              return (
                <button
                  key={file.filename}
                  onClick={() => setSelectedFileIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400/80" />
                  <span>{file.filename}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pl-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shadow-sm cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
              title="Download File"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* File Description bar */}
        <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span className="italic">{activeFile?.description}</span>
          <span className="font-mono text-[11px] text-slate-500">
            {activeFile?.code.split('\n').length} lines
          </span>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto max-h-[600px] font-mono text-xs text-slate-300 leading-relaxed select-text bg-[#090d16]">
          <pre className="whitespace-pre">
            <code>{activeFile?.code}</code>
          </pre>
        </div>
      </div>

      {/* Quick Run Terminal Guide */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">
            {lang === 'ta' ? "Unga Laptop-la Eppadi Run Panradhu (3 Simple Steps):" : "How to Run this Code Locally in 3 Steps:"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-bold text-indigo-400 mb-1">1. Install Dependencies</div>
            <code className="block bg-slate-900 p-2 rounded text-slate-300 font-mono text-[11px]">
              pip install -r requirements.txt
            </code>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Installs google-genai, streamlit, chromadb
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-bold text-indigo-400 mb-1">2. Set Gemini API Key</div>
            <code className="block bg-slate-900 p-2 rounded text-slate-300 font-mono text-[11px]">
              export GEMINI_API_KEY="AIzaSy..."
            </code>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Or add to a local .env file
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-bold text-emerald-400 mb-1">3. Launch Streamlit Web UI</div>
            <code className="block bg-slate-900 p-2 rounded text-emerald-300 font-mono text-[11px]">
              streamlit run app.py
            </code>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Opens browser at http://localhost:8501
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
