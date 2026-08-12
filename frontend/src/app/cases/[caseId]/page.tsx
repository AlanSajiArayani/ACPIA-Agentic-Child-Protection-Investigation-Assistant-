'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  ArrowLeft, 
  FolderKanban, 
  FileText, 
  FileCheck,
  Calendar, 
  Sparkles, 
  UserCheck, 
  LogOut, 
  Target, 
  Play, 
  Users, 
  Info, 
  FileCode2, 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';

export interface CaseDetailData {
  case_id: string;
  title: string;
  status: 'Active' | 'Completed' | 'Archived';
  evidence_count: number;
  target_entities: string[];
  target_evidence: string[];
  objective: string;
  last_updated: string;
}

const CASE_DATABASE: Record<string, CaseDetailData> = {
  'CASE-001': {
    case_id: 'CASE-001',
    title: 'Project Orion Investigation',
    status: 'Active',
    evidence_count: 1,
    target_entities: ['Account_001'],
    target_evidence: ['EVID-MSG-001'],
    objective: 'Search for evidence related to Account_001 and retrieve the details of EVID-MSG-001.',
    last_updated: '2026-03-01',
  },
  'CASE-002': {
    case_id: 'CASE-002',
    title: 'Operation Nexus Link Analysis',
    status: 'Active',
    evidence_count: 5,
    target_entities: ['Account_002', 'Person_B'],
    target_evidence: ['EVID-DOC-001', 'EVID-MSG-002'],
    objective: 'Perform link analysis across cross-platform account handles and verify location intersections.',
    last_updated: '2026-02-28',
  },
  'CASE-003': {
    case_id: 'CASE-003',
    title: 'Synthetic Communication Audit Alpha',
    status: 'Completed',
    evidence_count: 12,
    target_entities: ['Account_003'],
    target_evidence: ['EVID-MSG-003'],
    objective: 'Audit message intercepts and verify event timeline alignment.',
    last_updated: '2026-02-15',
  },
  'CASE-004': {
    case_id: 'CASE-004',
    title: 'Legacy Dataset Verification Beta',
    status: 'Archived',
    evidence_count: 8,
    target_entities: ['Account_004'],
    target_evidence: ['EVID-DOC-004'],
    objective: 'Archived benchmark test dataset verification.',
    last_updated: '2026-01-10',
  },
};

export default function CaseDetailsPage() {
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

  // Lookup case data or fallback strictly to provided fields without inventing unverified facts
  const caseData: CaseDetailData = CASE_DATABASE[caseKey] || {
    case_id: caseIdParam.toUpperCase(),
    title: 'Project Orion Investigation',
    status: 'Active',
    evidence_count: 1,
    target_entities: ['Account_001'],
    target_evidence: ['EVID-MSG-001'],
    objective: 'Search for evidence related to Account_001 and retrieve the details of EVID-MSG-001.',
    last_updated: '2026-03-01',
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const handleStartInvestigation = () => {
    router.push(`/cases/${caseData.case_id}/investigate`);
  };

  const getStatusBadge = (status: CaseDetailData['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Completed
          </span>
        );
      case 'Archived':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-400 border border-slate-500/20">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            Archived
          </span>
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
              href="/cases"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
              <span>Back to Cases</span>
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
              <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
              <span>Relationships</span>
            </Link>

            <Link
              href={`/cases/${caseData.case_id}/confidence`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Confidence</span>
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
        
        {/* Navigation Control: Back to Cases */}
        <div className="mb-6">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Cases</span>
          </Link>
        </div>

        {/* Case Header Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-cyan-400">
            <Shield className="h-32 w-32" />
          </div>

          <div className="relative z-10">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/40 shadow-sm">
                  {caseData.case_id}
                </span>
                {getStatusBadge(caseData.status)}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span>Last Updated: {caseData.last_updated}</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl tracking-tight">
              {caseData.title}
            </h1>

            {/* Primary Action Button: Start Investigation */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Ready to initiate automated multi-agent evidence correlation pipeline for this case.
              </p>
              
              <button
                onClick={handleStartInvestigation}
                aria-label={`Start Investigation for case ${caseData.case_id}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-950/50 hover:from-cyan-500 hover:to-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-[0.99] shrink-0"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Start Investigation</span>
              </button>
            </div>

          </div>
        </div>

        {/* Summary Cards Section (Status, Evidence Count, Target Entity Count) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          
          {/* Card 1: Status */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">Status</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              {caseData.status}
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Case lifecycle state</p>
          </div>

          {/* Card 2: Evidence Count */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">Evidence Count</span>
              <FileText className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono">
              {caseData.evidence_count}
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Associated evidence items</p>
          </div>

          {/* Card 3: Target Entity Count */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">Target Entity Count</span>
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono">
              {caseData.target_entities.length}
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Identified target entities</p>
          </div>

        </div>

        {/* Sections Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Section 1: Investigation Objective */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Investigation Objective
              </h2>
            </div>
            <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-4 text-sm text-slate-200 leading-relaxed font-mono">
              &quot;{caseData.objective}&quot;
            </div>
          </div>

          {/* Section 2: Case Information */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Case Information
              </h2>
            </div>

            <div className="divide-y divide-slate-800/80 text-xs">
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Case ID</span>
                <span className="font-mono font-bold text-cyan-400">{caseData.case_id}</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Title</span>
                <span className="font-semibold text-white">{caseData.title}</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Status</span>
                <span>{getStatusBadge(caseData.status)}</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Evidence Count</span>
                <span className="font-mono text-slate-200">{caseData.evidence_count}</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Last Updated</span>
                <span className="font-mono text-slate-400">{caseData.last_updated}</span>
              </div>
            </div>
          </div>

          {/* Section 3 & 4 Right Column Stack */}
          <div className="space-y-6">
            
            {/* Section 3: Target Entities */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-blue-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Target Entities
                </h2>
              </div>

              {caseData.target_entities.length > 0 ? (
                <div className="space-y-2">
                  {caseData.target_entities.map((entity) => (
                    <div 
                      key={entity}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono text-[11px] font-bold">
                          @
                        </span>
                        <span className="font-mono font-bold text-white">{entity}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Target Entity</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-mono">—</p>
              )}
            </div>

            {/* Section 4: Target Evidence */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileCode2 className="h-4 w-4 text-cyan-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Target Evidence
                </h2>
              </div>

              {caseData.target_evidence.length > 0 ? (
                <div className="space-y-2">
                  {caseData.target_evidence.map((evId) => (
                    <Link
                      key={evId}
                      href={`/cases/${caseData.case_id}/evidence/${evId}`}
                      className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs transition-all hover:border-cyan-500/40 hover:bg-slate-950 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-[11px] font-bold">
                          #
                        </span>
                        <div>
                          <span className="font-mono font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors block">
                            {evId}
                          </span>
                          <span className="text-[10px] text-slate-500">Clickable evidence item</span>
                        </div>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-mono">—</p>
              )}
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
