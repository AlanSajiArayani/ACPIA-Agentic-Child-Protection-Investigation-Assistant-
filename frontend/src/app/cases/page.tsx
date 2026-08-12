'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  Search, 
  Filter, 
  FolderKanban, 
  FileText, 
  Calendar, 
  ArrowRight, 
  LogOut, 
  UserCheck, 
  SearchX, 
  LayoutGrid, 
  List, 
  Clock,
  Sparkles
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';
import { EmptyState } from '@/components/EmptyState';

export interface CaseItem {
  case_id: string;
  title: string;
  status: 'Active' | 'Completed' | 'Archived';
  evidence_count: number;
  last_updated: string;
  description?: string;
}

export const INITIAL_MOCK_CASES: CaseItem[] = [
  {
    case_id: 'CASE-001',
    title: 'Project Orion Investigation',
    status: 'Active',
    evidence_count: 1,
    last_updated: '2026-03-01',
    description: 'Synthetic evidence cross-correlation and account identifier correlation for Project Orion.',
  },
  {
    case_id: 'CASE-002',
    title: 'Operation Nexus Link Analysis',
    status: 'Active',
    evidence_count: 5,
    last_updated: '2026-02-28',
    description: 'Multi-platform account handle matching and geographic location verification.',
  },
  {
    case_id: 'CASE-003',
    title: 'Synthetic Communication Audit Alpha',
    status: 'Completed',
    evidence_count: 12,
    last_updated: '2026-02-15',
    description: 'Completed investigation audit of message intercepts and event alignment.',
  },
  {
    case_id: 'CASE-004',
    title: 'Legacy Dataset Verification Beta',
    status: 'Archived',
    evidence_count: 8,
    last_updated: '2026-01-10',
    description: 'Archived synthetic test dataset from early prototype benchmark runs.',
  },
];

type StatusFilter = 'All' | 'Active' | 'Completed' | 'Archived';
type ViewMode = 'grid' | 'table';

export default function CasesPage() {
  const router = useRouter();

  // Authentication Guard Check
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  // Filter & View State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter Logic (Search by Case ID or Title + Status Filter)
  const filteredCases = useMemo(() => {
    return INITIAL_MOCK_CASES.filter((item) => {
      const matchesSearch = 
        item.case_id.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
      
      const matchesStatus = 
        statusFilter === 'All' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Counts for status filters
  const counts = useMemo(() => {
    return {
      All: INITIAL_MOCK_CASES.length,
      Active: INITIAL_MOCK_CASES.filter((c) => c.status === 'Active').length,
      Completed: INITIAL_MOCK_CASES.filter((c) => c.status === 'Completed').length,
      Archived: INITIAL_MOCK_CASES.filter((c) => c.status === 'Archived').length,
    };
  }, []);

  const handleOpenCase = (caseId: string) => {
    router.push(`/cases/${caseId}`);
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const getStatusBadge = (status: CaseItem['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Completed
          </span>
        );
      case 'Archived':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-2.5 py-0.5 text-xs font-semibold text-slate-400 border border-slate-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
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
          
          {/* Brand */}
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

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1">
            <span className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 text-xs font-semibold text-cyan-300">
              <FolderKanban className="h-4 w-4 text-cyan-400" />
              Cases
            </span>
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

      {/* Main Body Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Page Title Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Cases
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-mono text-cyan-400">
                <Sparkles className="h-3 w-3" />
                Synthetic System
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Manage and investigate assigned cases.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 self-start rounded-lg border border-slate-800 bg-slate-900/60 p-1 sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Switch to Grid View"
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              aria-label="Switch to Table View"
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              id="case-search"
              aria-label="Search cases by case ID or title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-cyan-500/70 focus:outline-none focus:ring-1 focus:ring-cyan-500/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-500 hover:text-slate-300"
                aria-label="Clear search query"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Status:
            </span>
            {(['All', 'Active', 'Completed', 'Archived'] as StatusFilter[]).map((tab) => {
              const isActive = statusFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  aria-label={`Filter cases by ${tab} status`}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {counts[tab]}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Case List Display */}
        {filteredCases.length === 0 ? (
          
          /* Test A: EmptyState for Case List */
          <EmptyState
            title="No cases found"
            description={`No assigned cases were found matching "${searchQuery || statusFilter}". Try adjusting your search query or clearing status filters.`}
            icon={<SearchX className="h-7 w-7" />}
            action={
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
              >
                Reset All Filters
              </button>
            }
          />

        ) : viewMode === 'grid' ? (
          
          /* Grid Card View */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((c) => (
              <div
                key={c.case_id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Card Header: Case ID + Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                      {c.case_id}
                    </span>
                    {getStatusBadge(c.status)}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {c.title}
                  </h3>

                  {/* Description */}
                  {c.description && (
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                  )}
                </div>

                {/* Card Footer Details */}
                <div className="mt-6 border-t border-slate-800/80 pt-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{c.evidence_count} {c.evidence_count === 1 ? 'Evidence Item' : 'Evidence Items'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{c.last_updated}</span>
                    </div>
                  </div>

                  {/* Open Case Button */}
                  <button
                    onClick={() => handleOpenCase(c.case_id)}
                    aria-label={`Open Case details for ${c.case_id} ${c.title}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700/60 py-2.5 text-xs font-semibold text-slate-200 transition-all group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md"
                  >
                    <span>Open Case</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        ) : (
          
          /* Table View */
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">Case ID</th>
                    <th scope="col" className="px-6 py-3.5">Title</th>
                    <th scope="col" className="px-6 py-3.5">Status</th>
                    <th scope="col" className="px-6 py-3.5">Evidence Count</th>
                    <th scope="col" className="px-6 py-3.5">Last Updated</th>
                    <th scope="col" className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredCases.map((c) => (
                    <tr 
                      key={c.case_id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                        {c.case_id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {c.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(c.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-slate-400" />
                          {c.evidence_count}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-500" />
                          {c.last_updated}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleOpenCase(c.case_id)}
                          aria-label={`Open Case details for ${c.case_id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-cyan-600 hover:text-white transition-colors"
                        >
                          <span>Open Case</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
