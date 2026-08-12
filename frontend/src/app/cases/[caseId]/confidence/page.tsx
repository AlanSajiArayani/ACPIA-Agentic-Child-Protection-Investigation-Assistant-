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
  Gauge, 
  Info, 
  ShieldAlert,
  Clock
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';

export interface ConfidenceRecord {
  case_id: string;
  evidence_id: string;
  confidence_status: string;
  explanation: string;
  verified_characteristics: string[];
  reliability_notes: string;
}

const CASE_CONFIDENCE_DATABASE: Record<string, ConfidenceRecord> = {
  'CASE-001': {
    case_id: 'CASE-001',
    evidence_id: 'EVID-MSG-001',
    confidence_status: 'Confidence: Not yet calculated',
    explanation: 'A confidence score will be calculated when the investigation results are connected to the backend investigation pipeline.',
    verified_characteristics: [
      'Evidence ID is present.',
      'Timestamp is present.',
      'Source is present.',
      'Entities are explicitly referenced.',
      'Location is explicitly referenced.',
      'Event reference is explicitly present.'
    ],
    reliability_notes: 'The available evidence provides explicit references to the listed accounts, person, location, event, timestamp, and source. However, the evidence alone does not establish whether the referenced meeting occurred or whether subsequent actions took place.'
  }
};

export default function ConfidencePage() {
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

  // Lookup verified confidence record (Strict constraint: NO fake percentage)
  const confidenceData: ConfidenceRecord = CASE_CONFIDENCE_DATABASE[caseKey] || {
    case_id: caseIdParam.toUpperCase(),
    evidence_id: 'EVID-MSG-001',
    confidence_status: 'Confidence: Not yet calculated',
    explanation: 'A confidence score will be calculated when the investigation results are connected to the backend investigation pipeline.',
    verified_characteristics: [
      'Evidence ID is present.',
      'Timestamp is present.',
      'Source is present.',
      'Entities are explicitly referenced.',
      'Location is explicitly referenced.',
      'Event reference is explicitly present.'
    ],
    reliability_notes: 'The available evidence provides explicit references to the listed accounts, person, location, event, timestamp, and source. However, the evidence alone does not establish whether the referenced meeting occurred or whether subsequent actions took place.'
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
              href={`/cases/${confidenceData.case_id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
              <span>Back to Case</span>
            </Link>

            <Link
              href={`/cases/${confidenceData.case_id}/investigate`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Back to Investigation</span>
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
            href={`/cases/${confidenceData.case_id}/investigate`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Investigation</span>
          </Link>

          <span className="text-slate-700 text-xs">|</span>

          <Link
            href={`/cases/${confidenceData.case_id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Back to Case {confidenceData.case_id}</span>
          </Link>
        </div>

        {/* Page Header Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/40 shadow-sm">
                {confidenceData.case_id}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-500/20">
                <Gauge className="h-3.5 w-3.5 text-cyan-400" />
                Reliability Metrics
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
              <FileCheck className="h-3.5 w-3.5 text-slate-500" />
              <span>Evidence Basis: {confidenceData.evidence_id}</span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
            Confidence &amp; Reliability
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Evidence verification characteristics &amp; confidence metric calculation status for Case {confidenceData.case_id}.
          </p>
        </div>

        {/* Section 1: Primary Confidence Status Banner */}
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Gauge className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Confidence Score Status
                </span>
                <span className="font-mono text-base font-bold text-cyan-300">
                  {confidenceData.confidence_status}
                </span>
              </div>
            </div>

            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1 text-xs font-mono text-slate-400 border border-slate-800">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              Backend Pipeline Integration Pending (Step 8.13)
            </span>
          </div>

          {/* Explanatory Message */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 font-mono leading-relaxed flex items-start gap-3">
            <Info className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
            <span>{confidenceData.explanation}</span>
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
              href={`/cases/${confidenceData.case_id}/evidence/${confidenceData.evidence_id}`}
              className="inline-flex items-center gap-2 font-mono font-bold text-sm text-cyan-300 bg-cyan-950/90 px-4 py-2 rounded-xl border border-cyan-500/40 hover:bg-cyan-900/60 hover:text-white transition-all shadow-md group"
              aria-label={`Open Evidence Viewer for ${confidenceData.evidence_id}`}
            >
              <span>#{confidenceData.evidence_id}</span>
              <ExternalLink className="h-4 w-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="text-xs text-slate-400">Click to inspect complete raw evidence record in Evidence Viewer</span>
          </div>
        </div>

        {/* Two-Column Grid: Verified Characteristics vs Reliability Notes */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Section 3: Verified Evidence Characteristics */}
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-emerald-500/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
                  Verified Evidence Characteristics
                </h2>
                <p className="text-[11px] text-slate-400">Explicit characteristics present in {confidenceData.evidence_id}</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs">
              {confidenceData.verified_characteristics.map((char, idx) => (
                <li key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-slate-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span className="leading-relaxed font-mono">{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Reliability Notes */}
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/60 p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-amber-500/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  Reliability Notes
                </h2>
                <p className="text-[11px] text-slate-400">Assessment bounds &amp; verification limitations</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 font-mono leading-relaxed">
              &quot;{confidenceData.reliability_notes}&quot;
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-[11px] text-slate-400 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <span>Evidence alone does not imply conclusive proof of outcome beyond verified record fields.</span>
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
