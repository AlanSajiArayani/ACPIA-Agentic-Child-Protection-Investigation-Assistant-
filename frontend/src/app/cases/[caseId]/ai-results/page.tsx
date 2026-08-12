'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  ArrowLeft, 
  FolderKanban, 
  FileText, 
  UserCheck, 
  LogOut, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Bot,
  BrainCircuit,
  Eye,
  Info
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';

export interface AIResultRecord {
  case_id: string;
  evidence_id: string;
  ai_analysis: string;
  key_facts: string[];
  ai_limitations: string;
}

const CASE_AI_RESULTS_DATABASE: Record<string, AIResultRecord> = {
  'CASE-001': {
    case_id: 'CASE-001',
    evidence_id: 'EVID-MSG-001',
    ai_analysis: 'The available evidence indicates that Account_001 communicated with Account_002 at 2026-03-01T08:00:00Z regarding a morning synchronization for Project Orion. The communication references Person_B, Location_001, and Event_001.',
    key_facts: [
      'Account_001 communicated with Account_002.',
      'Timestamp: 2026-03-01T08:00:00Z.',
      'Project Orion is referenced.',
      'Person_B is referenced.',
      'Location_001 is referenced.',
      'Event_001 is referenced.'
    ],
    ai_limitations: 'The available evidence does not establish whether the referenced meeting actually occurred, whether Person_B attended, or whether any subsequent activity took place.'
  }
};

export default function AIResultsPage() {
  const params = useParams();
  const router = useRouter();
  
  const caseIdParam = (params?.caseId as string) || 'CASE-001';
  const caseKey = caseIdParam.toUpperCase();

  // Authentication Guard Check
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  // Lookup verified AI results record or fallback strictly to CASE-001 schema (n8n Report Generator output structure ready)
  const aiData: AIResultRecord = CASE_AI_RESULTS_DATABASE[caseKey] || {
    case_id: caseIdParam.toUpperCase(),
    evidence_id: 'EVID-MSG-001',
    ai_analysis: 'The available evidence indicates that Account_001 communicated with Account_002 at 2026-03-01T08:00:00Z regarding a morning synchronization for Project Orion. The communication references Person_B, Location_001, and Event_001.',
    key_facts: [
      'Account_001 communicated with Account_002.',
      'Timestamp: 2026-03-01T08:00:00Z.',
      'Project Orion is referenced.',
      'Person_B is referenced.',
      'Location_001 is referenced.',
      'Event_001 is referenced.'
    ],
    ai_limitations: 'The available evidence does not establish whether the referenced meeting actually occurred, whether Person_B attended, or whether any subsequent activity took place.'
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 text-cyan-400 shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">Hack&apos;up</span>
                <span className="text-slate-600 text-xs">|</span>
                <span className="text-xs font-medium text-cyan-400/90 font-mono tracking-wide uppercase">Investigation Platform</span>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href={`/cases/${aiData.case_id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
              <span>Back to Case</span>
            </Link>

            <Link
              href={`/cases/${aiData.case_id}/investigate`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Back to Investigation</span>
            </Link>

            <Link
              href={`/cases/${aiData.case_id}/evidence/${aiData.evidence_id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Eye className="h-3.5 w-3.5 text-blue-400" />
              <span>View Evidence</span>
            </Link>
          </nav>

          {/* User Info & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
              <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-mono text-slate-400">investigator</span>
            </div>
            
            <button
              onClick={handleLogout}
              aria-label="Logout of Hack'up"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-red-500/40 hover:bg-red-950/30 hover:text-red-300 transition-all focus:outline-none focus:ring-1 focus:ring-red-500/50"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Navigation Controls Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Link
            href={`/cases/${aiData.case_id}/investigate`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Investigation</span>
          </Link>

          <span className="text-slate-700 text-xs">|</span>

          <Link
            href={`/cases/${aiData.case_id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Back to Case {aiData.case_id}</span>
          </Link>

          <span className="text-slate-700 text-xs">|</span>

          <Link
            href={`/cases/${aiData.case_id}/evidence/${aiData.evidence_id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View Evidence (#{aiData.evidence_id})</span>
          </Link>
        </div>

        {/* AI Results Header Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/40 shadow-sm">
                {aiData.case_id}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/30">
                <BrainCircuit className="h-3.5 w-3.5 text-purple-400" />
                AI Model Synthesis
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
              <FileCheck className="h-3.5 w-3.5 text-slate-500" />
              <span>Evidence Basis: {aiData.evidence_id}</span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
            AI-Generated Investigation Results
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Autonomous evidence synthesis &amp; objective fact extraction for Case {aiData.case_id}.
          </p>
        </div>

        {/* Section 1: AI Analysis */}
        <div className="rounded-2xl border border-purple-500/30 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 relative">
          
          {/* Section Label Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-purple-300">
                AI Analysis
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-950/80 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-mono text-purple-300 uppercase tracking-wider">
              AI-Generated Analysis • Not Raw Evidence Record
            </span>
          </div>

          {/* Analysis Text Box */}
          <div className="rounded-xl border border-purple-500/20 bg-slate-950/90 p-5 text-sm text-purple-100 font-mono leading-relaxed shadow-inner">
            &quot;{aiData.ai_analysis}&quot;
          </div>
        </div>

        {/* Section 2: Evidence Basis */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="h-4 w-4 text-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Evidence Basis
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/cases/${aiData.case_id}/evidence/${aiData.evidence_id}`}
              className="inline-flex items-center gap-2 font-mono font-bold text-sm text-cyan-300 bg-cyan-950/90 px-4 py-2 rounded-xl border border-cyan-500/40 hover:bg-cyan-900/60 hover:text-white transition-all shadow-md group"
              aria-label={`Open Evidence Viewer for ${aiData.evidence_id}`}
            >
              <span>#{aiData.evidence_id}</span>
              <ExternalLink className="h-4 w-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="text-xs text-slate-400">Click to view complete raw evidence record in Evidence Viewer</span>
          </div>
        </div>

        {/* Two-Column Grid: Key Facts vs AI Limitations */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Section 3: Key Facts */}
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-emerald-500/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
                  Key Facts
                </h2>
                <p className="text-[11px] text-slate-400">Supported explicitly by raw evidence</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs">
              {aiData.key_facts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-slate-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span className="leading-relaxed font-mono">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: AI Limitations */}
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/60 p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-amber-500/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  AI Limitations
                </h2>
                <p className="text-[11px] text-slate-400">Analysis boundary &amp; unestablished scope</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 font-mono leading-relaxed">
              &quot;{aiData.ai_limitations}&quot;
            </div>

            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/20 p-3 text-[11px] text-amber-300/90 flex items-start gap-2">
              <Info className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <span>AI analysis does not establish intent or wrongdoing beyond explicit evidence statements.</span>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Hack&apos;up Investigation Platform &copy; 2026. Authorized Personnel Only • Synthetic System Mode.</p>
      </footer>
    </div>
  );
}
