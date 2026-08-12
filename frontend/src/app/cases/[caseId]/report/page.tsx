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
  Printer, 
  Clock, 
  Users, 
  MapPin, 
  Zap, 
  Radio, 
  Inbox, 
  Target, 
  Award,
  ShieldAlert
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';

export interface FinalReportRecord {
  case_id: string;
  case_title: string;
  status: string;
  objective: string;
  executive_summary: string;
  evidence_id: string;
  evidence_title: string;
  evidence_type: string;
  timestamp: string;
  source: string;
  findings: string;
  entities: string[];
  location: string;
  event_reference: string;
  confidence_status: string;
  confidence_note: string;
  limitations: string[];
  observations: string;
}

const CASE_REPORT_DATABASE: Record<string, FinalReportRecord> = {
  'CASE-001': {
    case_id: 'CASE-001',
    case_title: 'Project Orion Investigation',
    status: 'Active',
    objective: 'Search for evidence related to Account_001 and retrieve the details of EVID-MSG-001.',
    executive_summary: 'The available evidence records a communication from Account_001 to Account_002 at 2026-03-01T08:00:00Z concerning a morning synchronization for Project Orion. The communication references Person_B, Location_001, and Event_001.',
    evidence_id: 'EVID-MSG-001',
    evidence_title: 'Synthetic Communication EVID-MSG-001',
    evidence_type: 'Communication',
    timestamp: '2026-03-01T08:00:00Z',
    source: 'Message Intercept (Account_001 -> Account_002)',
    findings: 'Communication identified: EVID-MSG-001 records a communication from Account_001 to Account_002 at 2026-03-01T08:00:00Z concerning a morning synchronization for Project Orion involving Person_B at Location_001.',
    entities: ['Account_001', 'Account_002', 'Person_B'],
    location: 'Location_001',
    event_reference: 'Event_001',
    confidence_status: 'Confidence: Not yet calculated',
    confidence_note: 'The available evidence provides explicit references to the listed accounts, person, location, event, timestamp, and source. However, the evidence alone does not establish whether the referenced meeting occurred or whether subsequent actions took place.',
    limitations: [
      'Whether the meeting actually occurred.',
      'Whether Person_B attended.',
      'Whether subsequent activity took place.',
      'Whether Account_001 is the project lead.',
      'Whether the communication indicates wrongdoing.'
    ],
    observations: 'No observations recorded.'
  }
};

export default function FinalReportPage() {
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

  // Lookup report record (Strict Grounding: Zero fake assumptions or percentages created)
  const report: FinalReportRecord = CASE_REPORT_DATABASE[caseKey] || {
    case_id: caseIdParam.toUpperCase(),
    case_title: 'Project Orion Investigation',
    status: 'Active',
    objective: 'Search for evidence related to Account_001 and retrieve the details of EVID-MSG-001.',
    executive_summary: 'The available evidence records a communication from Account_001 to Account_002 at 2026-03-01T08:00:00Z concerning a morning synchronization for Project Orion. The communication references Person_B, Location_001, and Event_001.',
    evidence_id: 'EVID-MSG-001',
    evidence_title: 'Synthetic Communication EVID-MSG-001',
    evidence_type: 'Communication',
    timestamp: '2026-03-01T08:00:00Z',
    source: 'Message Intercept (Account_001 -> Account_002)',
    findings: 'Communication identified: EVID-MSG-001 records a communication from Account_001 to Account_002 at 2026-03-01T08:00:00Z concerning a morning synchronization for Project Orion involving Person_B at Location_001.',
    entities: ['Account_001', 'Account_002', 'Person_B'],
    location: 'Location_001',
    event_reference: 'Event_001',
    confidence_status: 'Confidence: Not yet calculated',
    confidence_note: 'The available evidence provides explicit references to the listed accounts, person, location, event, timestamp, and source. However, the evidence alone does not establish whether the referenced meeting occurred or whether subsequent actions took place.',
    limitations: [
      'Whether the meeting actually occurred.',
      'Whether Person_B attended.',
      'Whether subsequent activity took place.',
      'Whether Account_001 is the project lead.',
      'Whether the communication indicates wrongdoing.'
    ],
    observations: 'No observations recorded.'
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased print:bg-white print:text-black">
      
      {/* Top Header (Hidden on Print) */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md print:hidden">
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
              href={`/cases/${report.case_id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
              <span>Back to Case</span>
            </Link>

            <Link
              href={`/cases/${report.case_id}/investigate`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Back to Investigation</span>
            </Link>

            <Link
              href={`/cases/${report.case_id}/evidence/${report.evidence_id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FileText className="h-3.5 w-3.5 text-blue-400" />
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
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 print:p-0 print:max-w-none">
        
        {/* Navigation Controls & Print Bar (Hidden on Print) */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/cases/${report.case_id}/investigate`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Investigation</span>
            </Link>

            <span className="text-slate-700 text-xs">|</span>

            <Link
              href={`/cases/${report.case_id}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span>Back to Case {report.case_id}</span>
            </Link>

            <span className="text-slate-700 text-xs">|</span>

            <Link
              href={`/cases/${report.case_id}/evidence/${report.evidence_id}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>View Evidence (#{report.evidence_id})</span>
            </Link>
          </div>

          {/* Print Report Button */}
          <button
            onClick={handlePrint}
            aria-label="Print Final Investigation Report"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-950/50 hover:from-cyan-500 hover:to-blue-500 transition-all active:scale-95"
          >
            <Printer className="h-4 w-4" />
            <span>Print Report</span>
          </button>
        </div>

        {/* Report Document Canvas */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 sm:p-12 backdrop-blur-xl shadow-2xl space-y-8 print:border-none print:shadow-none print:bg-white print:p-0 print:text-black">
          
          {/* Report Document Header */}
          <div className="border-b border-slate-800 print:border-black/20 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 print:border-black/30 print:bg-slate-100 print:text-black">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-slate-700">
                    Official Investigation Document
                  </span>
                  <h1 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight print:text-black">
                    Final Investigation Report
                  </h1>
                </div>
              </div>

              <span className="font-mono text-xs text-slate-400 border border-slate-800 bg-slate-950 px-3 py-1.5 rounded-lg print:border-black/20 print:bg-slate-100 print:text-black">
                Status: {report.status}
              </span>
            </div>

            {/* Case Info Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 print:text-slate-800">
              <div><span className="text-slate-500 print:text-slate-600 font-normal">Case ID:</span> <strong>{report.case_id}</strong></div>
              <span className="text-slate-700 print:text-slate-400">|</span>
              <div><span className="text-slate-500 print:text-slate-600 font-normal">Title:</span> <strong>{report.case_title}</strong></div>
              <span className="text-slate-700 print:text-slate-400">|</span>
              <div><span className="text-slate-500 print:text-slate-600 font-normal">Mode:</span> <span>Synthetic Verification</span></div>
            </div>
          </div>

          {/* Section 1: Investigation Objective */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2 print:text-slate-800">
              <Target className="h-4 w-4 text-cyan-400 print:text-slate-700" />
              <span>1. Investigation Objective</span>
            </h2>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs font-mono text-slate-200 leading-relaxed print:bg-slate-50 print:border-slate-300 print:text-black">
              &quot;{report.objective}&quot;
            </div>
          </div>

          {/* Section 2: Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2 print:text-slate-800">
              <FileText className="h-4 w-4 text-cyan-400 print:text-slate-700" />
              <span>2. Executive Summary</span>
            </h2>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs font-mono text-cyan-100 leading-relaxed print:bg-slate-50 print:border-slate-300 print:text-black">
              &quot;{report.executive_summary}&quot;
            </div>
          </div>

          {/* Section 3: Evidence References */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2 print:text-slate-800">
              <FileCheck className="h-4 w-4 text-cyan-400 print:text-slate-700" />
              <span>3. Evidence References</span>
            </h2>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs font-mono text-slate-200 print:bg-slate-50 print:border-slate-300 print:text-black">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {/* Clickable Evidence ID navigating to Evidence Viewer */}
                  <Link
                    href={`/cases/${report.case_id}/evidence/${report.evidence_id}`}
                    className="font-mono font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-500/40 hover:text-white print:border-slate-400 print:bg-slate-200 print:text-black"
                  >
                    #{report.evidence_id}
                  </Link>
                  <span className="font-bold text-white print:text-black">{report.evidence_title}</span>
                </div>
                <span className="text-[11px] text-cyan-400 print:text-slate-700">Type: {report.evidence_type}</span>
              </div>
              <div className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
                Timestamp: {report.timestamp}
              </div>
            </div>
          </div>

          {/* Section 4: Timeline */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2 print:text-slate-800">
              <Clock className="h-4 w-4 text-cyan-400 print:text-slate-700" />
              <span>4. Timeline</span>
            </h2>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs font-mono text-slate-200 print:bg-slate-50 print:border-slate-300 print:text-black">
              <div className="flex items-center gap-3">
                <span className="font-bold text-cyan-400 print:text-slate-800">{report.timestamp}</span>
                <span className="text-slate-600">|</span>
                <span className="font-bold text-slate-300 print:text-black">#{report.evidence_id}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 print:text-slate-700">{report.evidence_title}</span>
              </div>
            </div>
          </div>

          {/* Section 5: Findings */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2 print:text-slate-800">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 print:text-slate-700" />
              <span>5. Findings</span>
            </h2>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs font-mono text-slate-200 leading-relaxed print:bg-slate-50 print:border-slate-300 print:text-black">
              &quot;{report.findings}&quot;
            </div>
          </div>

          {/* Section 6, 7, 8: Entities, Location, Event Reference Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            
            {/* Entities */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs print:bg-slate-50 print:border-slate-300">
              <h3 className="font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 print:text-slate-800">
                <Users className="h-3.5 w-3.5 text-blue-400 print:text-slate-700" />
                <span>6. Entities</span>
              </h3>
              <div className="space-y-1 font-mono font-bold text-white print:text-black">
                {report.entities.map((e) => (
                  <div key={e} className="flex items-center gap-1">
                    <span className="text-blue-400 print:text-slate-600">@</span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs print:bg-slate-50 print:border-slate-300">
              <h3 className="font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 print:text-slate-800">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 print:text-slate-700" />
                <span>7. Location</span>
              </h3>
              <div className="font-mono font-bold text-emerald-300 print:text-black flex items-center gap-1">
                <span>📍</span>
                <span>{report.location}</span>
              </div>
            </div>

            {/* Event Reference */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs print:bg-slate-50 print:border-slate-300">
              <h3 className="font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 print:text-slate-800">
                <Zap className="h-3.5 w-3.5 text-amber-400 print:text-slate-700" />
                <span>8. Event Reference</span>
              </h3>
              <div className="font-mono font-bold text-amber-300 print:text-black flex items-center gap-1">
                <span>⚡</span>
                <span>{report.event_reference}</span>
              </div>
            </div>

          </div>

          {/* Section 9 & 10: Source & Observations */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            
            {/* Source */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs print:bg-slate-50 print:border-slate-300">
              <h3 className="font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 print:text-slate-800">
                <Radio className="h-3.5 w-3.5 text-cyan-400 print:text-slate-700" />
                <span>9. Source</span>
              </h3>
              <div className="font-mono text-slate-200 print:text-black">
                {report.source}
              </div>
            </div>

            {/* Observations */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs print:bg-slate-50 print:border-slate-300">
              <h3 className="font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 print:text-slate-800">
                <Inbox className="h-3.5 w-3.5 text-slate-400 print:text-slate-700" />
                <span>10. Observations</span>
              </h3>
              <div className="font-mono text-slate-300 print:text-black">
                {report.observations}
              </div>
            </div>

          </div>

          {/* Section 11: Confidence & Reliability */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 text-xs print:bg-slate-50 print:border-slate-300">
            <h2 className="font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2 print:text-slate-800">
              <ShieldAlert className="h-4 w-4 text-cyan-400 print:text-slate-700" />
              <span>11. Confidence &amp; Reliability</span>
            </h2>
            <div className="font-mono font-bold text-cyan-300 mb-2 print:text-black">
              {report.confidence_status}
            </div>
            <p className="font-mono text-slate-300 leading-relaxed print:text-slate-800">
              &quot;{report.confidence_note}&quot;
            </p>
          </div>

          {/* Section 12: Evidence Limitations */}
          <div className="rounded-xl border border-amber-500/30 bg-slate-950/80 p-5 text-xs print:bg-slate-50 print:border-slate-300">
            <h2 className="font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-2 print:text-slate-800">
              <AlertTriangle className="h-4 w-4 text-amber-400 print:text-slate-700" />
              <span>12. Evidence Limitations</span>
            </h2>
            <p className="text-slate-400 mb-3 font-mono text-[11px] print:text-slate-600">
              The available evidence does NOT establish:
            </p>
            <ul className="space-y-2 font-mono text-slate-200 print:text-black">
              {report.limitations.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold print:text-slate-700">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Report Footer / Signature Line */}
          <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-500 print:border-black/20 print:text-slate-700">
            <div>Hack&apos;up Investigation Platform &copy; 2026. Synthetic Evidence Mode.</div>
            <div>Document Ref: REPO-CASE-001-V1</div>
          </div>

        </div>

      </main>

      {/* Footer (Hidden on Print) */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 print:hidden">
        <p>Hack&apos;up Investigation Platform &copy; 2026. Authorized Personnel Only • Synthetic System Mode.</p>
      </footer>
    </div>
  );
}
