'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  ArrowLeft, 
  FileText, 
  FolderKanban, 
  Target, 
  Play, 
  Users, 
  FileCode2, 
  FileCheck,
  UserCheck, 
  LogOut, 
  Clock, 
  Loader2, 
  Sparkles,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';

export type InvestigationStatus = 'Ready' | 'Running' | 'Completed' | 'Failed';

export interface CaseTargetData {
  case_id: string;
  title: string;
  objective: string;
  target_entity: string;
  target_evidence: string;
}

const CASE_TARGETS: Record<string, CaseTargetData> = {
  'CASE-001': {
    case_id: 'CASE-001',
    title: 'Project Orion Investigation',
    objective: 'Search for evidence related to Account_001 and retrieve the details of EVID-MSG-001.',
    target_entity: 'Account_001',
    target_evidence: 'EVID-MSG-001',
  },
  'CASE-002': {
    case_id: 'CASE-002',
    title: 'Operation Nexus Link Analysis',
    objective: 'Perform link analysis across cross-platform account handles and verify location intersections.',
    target_entity: 'Account_002',
    target_evidence: 'EVID-DOC-001',
  },
};

export default function InvestigationScreenPage() {
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

  // Lookup target data or fallback strictly to provided CASE-001 fields
  const caseData: CaseTargetData = CASE_TARGETS[caseKey] || {
    case_id: caseIdParam.toUpperCase(),
    title: 'Project Orion Investigation',
    objective: 'Search for evidence related to Account_001 and retrieve the details of EVID-MSG-001.',
    target_entity: 'Account_001',
    target_evidence: 'EVID-MSG-001',
  };

  // Investigation Execution State (Default: 'Ready')
  const [status, setStatus] = useState<InvestigationStatus>('Ready');

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  // Structured execution handler (simulates running -> completion / retry testing)
  const handleRunInvestigation = () => {
    if (status === 'Running') return;

    setStatus('Running');
    
    // Simulate investigation execution lifecycle
    setTimeout(() => {
      // Complete execution state demonstration
      setStatus('Ready');
    }, 2800);
  };

  const handleSimulateFailure = () => {
    setStatus('Failed');
  };

  const handleRetry = () => {
    handleRunInvestigation();
  };

  // Status Badge Rendering Component
  const renderStatusBadge = () => {
    switch (status) {
      case 'Ready':
        return (
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
            <div>
              <span className="text-sm font-bold text-cyan-300">Ready to investigate</span>
              <p className="text-xs text-slate-400 mt-0.5">System standing by to initiate execution pipeline</p>
            </div>
          </div>
        );
      case 'Running':
        return (
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
            <div>
              <span className="text-sm font-bold text-amber-300">Running Investigation...</span>
              <p className="text-xs text-slate-400 mt-0.5">Gathering and analyzing evidence</p>
            </div>
          </div>
        );
      case 'Completed':
        return (
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <div>
              <span className="text-sm font-bold text-emerald-300">Investigation execution finished</span>
              <p className="text-xs text-slate-400 mt-0.5">All agent tasks completed successfully</p>
            </div>
          </div>
        );
      case 'Failed':
        return (
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <div>
              <span className="text-sm font-bold text-red-300">Investigation Failed</span>
              <p className="text-xs text-slate-400 mt-0.5">We couldn&apos;t complete the investigation</p>
            </div>
          </div>
        );
    }
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
              href={`/cases/${caseData.case_id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
              <span>Back to Case</span>
            </Link>

            <Link
              href={`/cases/${caseData.case_id}/timeline`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>Timeline</span>
            </Link>

            <Link
              href={`/cases/${caseData.case_id}/findings`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <span>Findings</span>
            </Link>

            <Link
              href={`/cases/${caseData.case_id}/ai-results`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span>AI Results</span>
            </Link>

            <Link
              href={`/cases/${caseData.case_id}/relationships`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FileCode2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>Relationships</span>
            </Link>

            <Link
              href={`/cases/${caseData.case_id}/report`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FileCheck className="h-3.5 w-3.5 text-cyan-400" />
              <span>Report</span>
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
        
        {/* Navigation Control: Back to Case */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/cases/${caseData.case_id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Case {caseData.case_id}</span>
          </Link>

          {/* Demo Error Trigger Switch for Step 8.12 ErrorState Testing */}
          <div className="flex items-center gap-2">
            {status === 'Failed' ? (
              <button
                onClick={() => setStatus('Ready')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950 px-3 py-1 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-900 transition-colors shadow-sm"
              >
                <span>Reset to Ready Standby</span>
              </button>
            ) : (
              <button
                onClick={handleSimulateFailure}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/60 px-3 py-1 text-xs font-mono font-bold text-red-300 hover:bg-red-900/80 transition-colors shadow-sm"
                title="Test ErrorState component (Step 8.12)"
              >
                <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                <span>Simulate Error State</span>
              </button>
            )}
          </div>
        </div>

        {/* Case & Objective Header Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/40">
                {caseData.case_id}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                Investigation Screen
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>Mode: Execution Pipeline</span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
            {caseData.title}
          </h1>

          {/* Objective Box */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Investigation Objective
              </span>
            </div>
            <p className="text-sm font-mono text-cyan-200 leading-relaxed">
              &quot;{caseData.objective}&quot;
            </p>
          </div>
        </div>

        {/* Target Parameters Bar */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
          
          {/* Target Entity */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">Target Entity</span>
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-base font-mono font-bold text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs">
                @
              </span>
              {caseData.target_entity}
            </div>
          </div>

          {/* Target Evidence */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">Target Evidence</span>
              <FileCode2 className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-base font-mono font-bold text-cyan-300 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs">
                #
              </span>
              {caseData.target_evidence}
            </div>
          </div>

        </div>

        {/* Action & Status Controls Section */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Status Indicator Area */}
            <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Execution Status
              </span>
              {renderStatusBadge()}
            </div>

            {/* Run Investigation Button */}
            <button
              onClick={handleRunInvestigation}
              disabled={status === 'Running'}
              aria-label="Run Investigation"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-cyan-950/50 hover:from-cyan-500 hover:to-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
            >
              {status === 'Running' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                  <span>Gathering and Analyzing Evidence...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 fill-current" />
                  <span>Run Investigation</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Investigation Results Display Area (Renders LoadingState, ErrorState, or EmptyState) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
            <h2 className="text-base font-bold text-white tracking-tight">
              Investigation Results
            </h2>
            <span className="text-xs font-mono text-slate-500">Output Container</span>
          </div>

          {/* Conditional UI State Rendering */}
          {status === 'Running' ? (
            
            /* Test C: LoadingState */
            <LoadingState 
              title="Running Investigation..."
              description="Gathering and analyzing evidence."
            />

          ) : status === 'Failed' ? (
            
            /* Test D: ErrorState */
            <ErrorState
              title="Investigation Failed"
              description="We couldn't complete the investigation."
              onRetry={handleRetry}
              retryText="Try Again"
              onBack={() => router.push(`/cases/${caseData.case_id}`)}
              backText="Back to Case"
            />

          ) : (
            
            /* Test B: EmptyState */
            <EmptyState
              title="No investigation results yet"
              description={`Click "Run Investigation" to trigger the autonomous multi-agent execution pipeline for target entity ${caseData.target_entity} and evidence ${caseData.target_evidence}.`}
            />

          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Hack&apos;up Investigation Platform &copy; 2026. Authorized Personnel Only • Synthetic System Mode.</p>
      </footer>
    </div>
  );
}
