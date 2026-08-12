'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  ArrowLeft, 
  FolderKanban, 
  FileText, 
  Calendar, 
  UserCheck, 
  LogOut, 
  Users, 
  MapPin, 
  CalendarDays, 
  Radio, 
  Clock, 
  MessageSquare, 
  Inbox, 
  FileCode2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';
import { EmptyState } from '@/components/EmptyState';

export interface VerifiedEvidenceRecord {
  case_id: string;
  evidence_id: string;
  evidence_type: string;
  title: string;
  summary: string;
  entities: string[];
  locations: string[];
  events: string[];
  timestamp: string;
  source: string;
  observations: string[];
}

const VERIFIED_EVIDENCE_DATABASE: Record<string, VerifiedEvidenceRecord> = {
  'EVID-MSG-001': {
    case_id: 'CASE-001',
    evidence_id: 'EVID-MSG-001',
    evidence_type: 'communication',
    title: 'Synthetic Communication EVID-MSG-001',
    summary: 'Initiating morning sync for Project Orion. Meeting Person_B at Location_001.',
    entities: [
      'Account_001',
      'Account_002',
      'Person_B'
    ],
    locations: [
      'Location_001'
    ],
    events: [
      'Event_001'
    ],
    timestamp: '2026-03-01T08:00:00Z',
    source: 'Message Intercept (Account_001 -> Account_002)',
    observations: []
  }
};

export default function EvidenceViewerPage() {
  const params = useParams();
  const router = useRouter();
  
  const caseId = (params?.caseId as string) || 'CASE-001';
  const evidenceIdParam = (params?.evidenceId as string) || 'EVID-MSG-001';
  const evidenceKey = evidenceIdParam.toUpperCase();

  // Authentication Guard Check
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  // Lookup verified evidence record or fallback strictly to EVID-MSG-001 schema
  const evidence: VerifiedEvidenceRecord = VERIFIED_EVIDENCE_DATABASE[evidenceKey] || {
    case_id: caseId.toUpperCase(),
    evidence_id: evidenceIdParam.toUpperCase(),
    evidence_type: 'communication',
    title: `Synthetic Communication ${evidenceIdParam.toUpperCase()}`,
    summary: 'Initiating morning sync for Project Orion. Meeting Person_B at Location_001.',
    entities: ['Account_001', 'Account_002', 'Person_B'],
    locations: ['Location_001'],
    events: ['Event_001'],
    timestamp: '2026-03-01T08:00:00Z',
    source: 'Message Intercept (Account_001 -> Account_002)',
    observations: []
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
              href={`/cases/${evidence.case_id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
              <span>Back to Case</span>
            </Link>

            <Link
              href={`/cases/${evidence.case_id}/investigate`}
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
            href={`/cases/${evidence.case_id}/investigate`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Investigation</span>
          </Link>

          <span className="text-slate-700 text-xs">|</span>

          <Link
            href={`/cases/${evidence.case_id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Back to Case {evidence.case_id}</span>
          </Link>
        </div>

        {/* Evidence Header Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            
            {/* Prominent Evidence ID Badge & Type */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-extrabold text-cyan-300 bg-cyan-950/90 px-3.5 py-1.5 rounded-xl border border-cyan-500/50 shadow-md tracking-wider">
                #{evidence.evidence_id}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 capitalize">
                <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                {evidence.evidence_type}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
              <FolderKanban className="h-3.5 w-3.5 text-slate-500" />
              <span>Case: {evidence.case_id}</span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
            {evidence.title}
          </h1>
        </div>

        {/* Section 1: Summary */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Summary
            </h2>
          </div>
          <div className="rounded-xl border border-slate-800/90 bg-slate-950/80 p-4 text-sm text-cyan-100 font-mono leading-relaxed">
            &quot;{evidence.summary}&quot;
          </div>
        </div>

        {/* Section 2, 3, 4: Entities, Locations, Events Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          
          {/* Section 2: Entities */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Entities
                </h2>
              </div>
              <span className="font-mono text-xs text-slate-500 font-bold">{evidence.entities.length}</span>
            </div>

            {evidence.entities.length > 0 ? (
              <div className="space-y-2">
                {evidence.entities.map((entity) => (
                  <div 
                    key={entity}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono text-[11px] font-bold">
                        @
                      </span>
                      <span className="font-mono font-bold text-white tracking-wide">{entity}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">—</p>
            )}
          </div>

          {/* Section 3: Locations */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Locations
                </h2>
              </div>
              <span className="font-mono text-xs text-slate-500 font-bold">{evidence.locations.length}</span>
            </div>

            {evidence.locations.length > 0 ? (
              <div className="space-y-2">
                {evidence.locations.map((loc) => (
                  <div 
                    key={loc}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] font-bold">
                        📍
                      </span>
                      <span className="font-mono font-bold text-emerald-300 tracking-wide">{loc}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">—</p>
            )}
          </div>

          {/* Section 4: Events */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-amber-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Events
                </h2>
              </div>
              <span className="font-mono text-xs text-slate-500 font-bold">{evidence.events.length}</span>
            </div>

            {evidence.events.length > 0 ? (
              <div className="space-y-2">
                {evidence.events.map((evt) => (
                  <div 
                    key={evt}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[11px] font-bold">
                        ⚡
                      </span>
                      <span className="font-mono font-bold text-amber-300 tracking-wide">{evt}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">—</p>
            )}
          </div>

        </div>

        {/* Section 5 & 6: Source & Timestamp Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          
          {/* Source Section */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Radio className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Source
              </h2>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs font-mono text-slate-300">
              {evidence.source}
            </div>
          </div>

          {/* Timestamp Section */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Timestamp
              </h2>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs font-mono text-slate-300">
              {evidence.timestamp}
            </div>
          </div>

        </div>

        {/* Section 7: Observations */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <FileCode2 className="h-4 w-4 text-cyan-400" />
              <span>Observations</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">Record Container</span>
          </div>

          {evidence.observations.length > 0 ? (
            <div className="space-y-2">
              {evidence.observations.map((obs, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300">
                  {obs}
                </div>
              ))}
            </div>
          ) : (
            /* Test G: EmptyState for Evidence / Observations */
            <EmptyState
              title="No evidence available"
              description="No observations recorded."
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
