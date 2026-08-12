'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  ArrowLeft, 
  FolderKanban, 
  FileText, 
  Clock, 
  UserCheck, 
  LogOut, 
  Users, 
  MapPin, 
  CalendarDays, 
  MessageSquare, 
  ExternalLink, 
  Sparkles, 
  Inbox, 
  History 
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';
import { EmptyState } from '@/components/EmptyState';

export interface TimelineEventRecord {
  case_id: string;
  evidence_id: string;
  timestamp: string;
  title: string;
  type: string;
  summary: string;
  connections: {
    entities: string[];
    locations: string[];
    events: string[];
  };
}

const CASE_TIMELINE_DATABASE: Record<string, TimelineEventRecord[]> = {
  'CASE-001': [
    {
      case_id: 'CASE-001',
      evidence_id: 'EVID-MSG-001',
      timestamp: '2026-03-01T08:00:00Z',
      title: 'Synthetic Communication EVID-MSG-001',
      type: 'Communication',
      summary: 'Initiating morning sync for Project Orion. Meeting Person_B at Location_001.',
      connections: {
        entities: ['Account_001', 'Account_002', 'Person_B'],
        locations: ['Location_001'],
        events: ['Event_001']
      }
    }
  ]
};

export default function TimelinePage() {
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

  // Lookup verified timeline records for case (Strict Grounding: Only explicit timestamped evidence records)
  const timelineEvents: TimelineEventRecord[] = CASE_TIMELINE_DATABASE[caseKey] || [
    {
      case_id: caseIdParam.toUpperCase(),
      evidence_id: 'EVID-MSG-001',
      timestamp: '2026-03-01T08:00:00Z',
      title: 'Synthetic Communication EVID-MSG-001',
      type: 'Communication',
      summary: 'Initiating morning sync for Project Orion. Meeting Person_B at Location_001.',
      connections: {
        entities: ['Account_001', 'Account_002', 'Person_B'],
        locations: ['Location_001'],
        events: ['Event_001']
      }
    }
  ];

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
              href={`/cases/${caseKey}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
              <span>Back to Case</span>
            </Link>

            <Link
              href={`/cases/${caseKey}/investigate`}
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
            href={`/cases/${caseKey}/investigate`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Investigation</span>
          </Link>

          <span className="text-slate-700 text-xs">|</span>

          <Link
            href={`/cases/${caseKey}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Back to Case {caseKey}</span>
          </Link>
        </div>

        {/* Timeline Header Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-10 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/40 shadow-sm">
                {caseKey}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20">
                <History className="h-3.5 w-3.5 text-cyan-400" />
                Chronological Stream
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>{timelineEvents.length} {timelineEvents.length === 1 ? 'Event Record' : 'Event Records'}</span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
            Investigation Timeline
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Chronological evidence stream for case {caseKey}.
          </p>
        </div>

        {/* Timeline Content View */}
        {timelineEvents.length === 0 ? (
          
          /* Test E: EmptyState for Timeline */
          <EmptyState
            title="No timeline events"
            description={`Events will automatically populate here as timestamped evidence items are discovered and verified in case ${caseKey}.`}
          />

        ) : (

          /* Chronological Timeline Axis View */
          <div className="relative pl-6 md:pl-10 space-y-12 before:absolute before:left-3 md:before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/50 before:via-blue-500/30 before:to-slate-800">
            
            {timelineEvents.map((item, idx) => (
              <div key={item.evidence_id} className="relative group">
                
                {/* Timeline Axis Node Icon */}
                <div className="absolute -left-6 md:-left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border-2 border-cyan-400 text-cyan-400 shadow-md shadow-cyan-950">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                {/* Event Timestamp Display */}
                <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 text-xs font-mono font-bold text-cyan-300 shadow-sm backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{item.timestamp}</span>
                </div>

                {/* Timeline Event Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-xl transition-all duration-200 hover:border-cyan-500/40">
                  
                  {/* Card Header: Evidence ID link & Type */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      
                      {/* Clickable Evidence ID navigating to Evidence Viewer */}
                      <Link
                        href={`/cases/${item.case_id}/evidence/${item.evidence_id}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-extrabold text-cyan-300 bg-cyan-950/90 px-3 py-1 rounded-lg border border-cyan-500/40 hover:bg-cyan-900/60 hover:text-white transition-all group/link"
                        aria-label={`Open Evidence Viewer for ${item.evidence_id}`}
                      >
                        <span>#{item.evidence_id}</span>
                        <ExternalLink className="h-3 w-3 text-cyan-400 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
                        <MessageSquare className="h-3 w-3 text-blue-400" />
                        {item.type}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500">
                      Chronological Index #{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-3.5 text-xs text-slate-200 font-mono leading-relaxed mb-5">
                    &quot;{item.summary}&quot;
                  </div>

                  {/* Relevant Connections Section */}
                  <div className="border-t border-slate-800/80 pt-4">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Relevant Connections
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      
                      {/* Entities */}
                      {item.connections.entities.map((entity) => (
                        <span
                          key={entity}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-mono font-bold text-white"
                        >
                          <span className="text-blue-400">@</span>
                          {entity}
                        </span>
                      ))}

                      {/* Locations */}
                      {item.connections.locations.map((loc) => (
                        <span
                          key={loc}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-mono font-bold text-emerald-300"
                        >
                          <span>📍</span>
                          {loc}
                        </span>
                      ))}

                      {/* Event Reference */}
                      {item.connections.events.map((evt) => (
                        <span
                          key={evt}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-mono font-bold text-amber-300"
                          title="Identified Event Reference"
                        >
                          <span>⚡</span>
                          {evt}
                          <span className="text-[9px] font-sans text-slate-500 font-normal uppercase">(Reference)</span>
                        </span>
                      ))}

                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Hack&apos;up Investigation Platform &copy; 2026. Authorized Personnel Only • Synthetic System Mode.</p>
      </footer>
    </div>
  );
}
