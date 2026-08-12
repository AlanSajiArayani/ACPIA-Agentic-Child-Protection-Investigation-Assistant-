'use client';

import React, { useState, useEffect } from 'react';
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
  Users, 
  MapPin, 
  CalendarDays, 
  Network, 
  Info, 
  X, 
  User, 
  Zap,
  LayoutGrid,
  List
} from 'lucide-react';
import { isAuthenticated, logoutUser } from '@/lib/auth';

export type NodeType = 'Evidence' | 'Account' | 'Person' | 'Location' | 'Event';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  description?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

export interface CaseGraphData {
  case_id: string;
  central_evidence_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const CASE_GRAPH_DATABASE: Record<string, CaseGraphData> = {
  'CASE-001': {
    case_id: 'CASE-001',
    central_evidence_id: 'EVID-MSG-001',
    nodes: [
      { id: 'EVID-MSG-001', label: 'EVID-MSG-001', type: 'Evidence' },
      { id: 'Account_001', label: 'Account_001', type: 'Account' },
      { id: 'Account_002', label: 'Account_002', type: 'Account' },
      { id: 'Person_B', label: 'Person_B', type: 'Person' },
      { id: 'Location_001', label: 'Location_001', type: 'Location' },
      { id: 'Event_001', label: 'Event_001', type: 'Event' }
    ],
    edges: [
      { source: 'EVID-MSG-001', target: 'Account_001', label: 'links' },
      { source: 'EVID-MSG-001', target: 'Account_002', label: 'links' },
      { source: 'EVID-MSG-001', target: 'Person_B', label: 'links' },
      { source: 'EVID-MSG-001', target: 'Location_001', label: 'links' },
      { source: 'EVID-MSG-001', target: 'Event_001', label: 'links' }
    ]
  }
};

export default function RelationshipsPage() {
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

  // Selected Entity Node for Detail Panel Modal
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');

  // Lookup case graph data strictly adhering to hub-and-spoke model (EVID-MSG-001 as hub)
  const graphData: CaseGraphData = CASE_GRAPH_DATABASE[caseKey] || {
    case_id: caseIdParam.toUpperCase(),
    central_evidence_id: 'EVID-MSG-001',
    nodes: [
      { id: 'EVID-MSG-001', label: 'EVID-MSG-001', type: 'Evidence' },
      { id: 'Account_001', label: 'Account_001', type: 'Account' },
      { id: 'Account_002', label: 'Account_002', type: 'Account' },
      { id: 'Person_B', label: 'Person_B', type: 'Person' },
      { id: 'Location_001', label: 'Location_001', type: 'Location' },
      { id: 'Event_001', label: 'Event_001', type: 'Event' }
    ],
    edges: [
      { source: 'EVID-MSG-001', target: 'Account_001', label: 'links' },
      { source: 'EVID-MSG-001', target: 'Account_002', label: 'links' },
      { source: 'EVID-MSG-001', target: 'Person_B', label: 'links' },
      { source: 'EVID-MSG-001', target: 'Location_001', label: 'links' },
      { source: 'EVID-MSG-001', target: 'Event_001', label: 'links' }
    ]
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const handleNodeClick = (node: GraphNode) => {
    if (node.type === 'Evidence') {
      router.push(`/cases/${graphData.case_id}/evidence/${node.id}`);
    } else {
      setSelectedNode(node);
    }
  };

  // Node Type Styling Helper
  const getNodeStyles = (type: NodeType) => {
    switch (type) {
      case 'Evidence':
        return {
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          circleBg: 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-cyan-950/80',
          icon: <FileText className="h-5 w-5 text-cyan-400" />,
          tag: 'Hub Evidence'
        };
      case 'Account':
        return {
          badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
          circleBg: 'bg-slate-900 border-blue-500/60 text-blue-300 shadow-blue-950/40',
          icon: <User className="h-4 w-4 text-blue-400" />,
          tag: 'Account'
        };
      case 'Person':
        return {
          badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
          circleBg: 'bg-slate-900 border-indigo-500/60 text-indigo-300 shadow-indigo-950/40',
          icon: <Users className="h-4 w-4 text-indigo-400" />,
          tag: 'Person'
        };
      case 'Location':
        return {
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          circleBg: 'bg-slate-900 border-emerald-500/60 text-emerald-300 shadow-emerald-950/40',
          icon: <MapPin className="h-4 w-4 text-emerald-400" />,
          tag: 'Location'
        };
      case 'Event':
        return {
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          circleBg: 'bg-slate-900 border-amber-500/60 text-amber-300 shadow-amber-950/40',
          icon: <Zap className="h-4 w-4 text-amber-400" />,
          tag: 'Event'
        };
    }
  };

  const entityNodes = graphData.nodes.filter((n) => n.type !== 'Evidence');
  const centralNode = graphData.nodes.find((n) => n.type === 'Evidence') || graphData.nodes[0];

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
              href={`/cases/${graphData.case_id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
              <span>Back to Case</span>
            </Link>

            <Link
              href={`/cases/${graphData.case_id}/investigate`}
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
            href={`/cases/${graphData.case_id}/investigate`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Investigation</span>
          </Link>

          <span className="text-slate-700 text-xs">|</span>

          <Link
            href={`/cases/${graphData.case_id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Back to Case {graphData.case_id}</span>
          </Link>
        </div>

        {/* Page Header Banner & View Mode Toggle */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/40 shadow-sm">
                {graphData.case_id}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20">
                <Network className="h-3.5 w-3.5 text-cyan-400" />
                Hub &amp; Spoke Topology
              </span>
            </div>

            {/* View Mode Toggle (Graph Canvas vs Responsive List) */}
            <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
              <button
                onClick={() => setViewMode('graph')}
                aria-label="Graph Canvas View"
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewMode === 'graph'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Graph View</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="Responsive Relationship List View"
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <List className="h-3.5 w-3.5" />
                <span>List View</span>
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
            Entity &amp; Evidence Relationships
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Evidence-grounded relationship map for Project Orion. Central evidence hub: <code className="font-mono text-cyan-300">{graphData.central_evidence_id}</code>.
          </p>
        </div>

        {/* Legend Bar */}
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Info className="h-3.5 w-3.5 text-cyan-400" />
            <span>Node Types Legend</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-950 px-2.5 py-1 font-mono text-cyan-300 border border-cyan-500/40">
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              Evidence (Hub)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-blue-300 border border-blue-500/30">
              <User className="h-3.5 w-3.5 text-blue-400" />
              Account
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-indigo-300 border border-indigo-500/30">
              <Users className="h-3.5 w-3.5 text-indigo-400" />
              Person
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-emerald-300 border border-emerald-500/30">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              Location
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-amber-300 border border-amber-500/30">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              Event Reference
            </span>
          </div>
        </div>

        {/* Display Container: Visual Graph vs Responsive List */}
        {viewMode === 'graph' ? (
          
          /* Visual Hub & Spoke Graph Canvas */
          <div className="relative min-h-[460px] sm:min-h-[520px] w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-6 backdrop-blur-xl shadow-2xl overflow-hidden flex items-center justify-center">
            
            {/* Background Grid Pattern & Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Central Evidence Hub Node */}
            <div className="relative z-20 flex flex-col items-center">
              <button
                onClick={() => handleNodeClick(centralNode)}
                aria-label={`Open Evidence Viewer for ${centralNode.id}`}
                className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-cyan-400 bg-cyan-950/90 p-5 shadow-2xl shadow-cyan-950/80 transition-all hover:scale-105 hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 mb-2">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="font-mono text-sm font-extrabold text-cyan-200 tracking-wider">
                  #{centralNode.id}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-300">
                  Central Evidence Hub
                </span>
                <span className="mt-2 text-[10px] text-cyan-400/80 flex items-center gap-1 group-hover:text-cyan-200">
                  <span>Click to view evidence</span>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </button>
            </div>

            {/* Connected Spoke Nodes Layout (Circle around central hub) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              
              {/* Connected Spoke Items (5 items) */}
              <div className="relative w-full max-w-2xl h-full flex items-center justify-center pointer-events-auto">
                
                {entityNodes.map((node, index) => {
                  const total = entityNodes.length;
                  // Calculate positioning around center
                  const angle = (index * (2 * Math.PI)) / total - Math.PI / 2;
                  const radiusX = 170; // Horizontal radius in px
                  const radiusY = 150; // Vertical radius in px
                  const x = Math.cos(angle) * radiusX;
                  const y = Math.sin(angle) * radiusY;

                  const styles = getNodeStyles(node.type);

                  return (
                    <div
                      key={node.id}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className="absolute transition-all duration-300"
                    >
                      {/* SVG Line Connector from Center to Spoke Node */}
                      <svg 
                        className="absolute top-1/2 left-1/2 -z-10 overflow-visible pointer-events-none"
                        style={{
                          transform: 'translate(-50%, -50%)',
                          width: '400px',
                          height: '400px',
                        }}
                      >
                        <line
                          x1="200"
                          y1="200"
                          x2={200 - x}
                          y2={200 - y}
                          stroke="#0891b2"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          className="opacity-40"
                        />
                      </svg>

                      {/* Spoke Node Button */}
                      <button
                        onClick={() => handleNodeClick(node)}
                        aria-label={`View detail panel for ${node.id} (${node.type})`}
                        className={`group flex items-center gap-2.5 rounded-xl border p-3 shadow-lg backdrop-blur-md transition-all hover:scale-105 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 ${styles.circleBg}`}
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-xs font-mono font-bold">
                          {styles.icon}
                        </div>
                        <div className="text-left">
                          <span className="font-mono text-xs font-bold text-slate-100 group-hover:text-cyan-300 block">
                            {node.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            {node.type}
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>

        ) : (

          /* Responsive Relationship List (Fallback for Mobile & Accessible View) */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Network className="h-4 w-4 text-cyan-400" />
                <span>Evidence-Grounded Connections List</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">{entityNodes.length} Linked Nodes</span>
            </div>

            <div className="space-y-3">
              {entityNodes.map((node) => {
                const styles = getNodeStyles(node.type);
                return (
                  <div
                    key={node.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800/90 bg-slate-950/70 p-4 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      
                      {/* Evidence Link */}
                      <Link
                        href={`/cases/${graphData.case_id}/evidence/${graphData.central_evidence_id}`}
                        className="font-mono font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-500/40 hover:text-white"
                      >
                        #{graphData.central_evidence_id}
                      </Link>

                      <span className="text-slate-600 font-mono">↔</span>

                      {/* Entity Badge */}
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono font-bold border ${styles.badgeBg}`}>
                          {styles.icon}
                          {node.id}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">({node.type})</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleNodeClick(node)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-cyan-400 transition-colors self-start sm:self-auto"
                    >
                      <span>View Node Details</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        )}

        {/* Small Detail Panel Modal for Clicked Entity Node */}
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl text-slate-100">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Entity Details
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  aria-label="Close detail panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Node Attribute Information (Strictly Identifier and Type) */}
              <div className="space-y-4 text-xs font-mono">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Identifier</span>
                  <span className="text-base font-bold text-cyan-300">{selectedNode.id}</span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Node Type</span>
                  <span className="text-sm font-semibold text-slate-200">{selectedNode.type}</span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Evidence Connection Hub</span>
                  <Link
                    href={`/cases/${graphData.case_id}/evidence/${graphData.central_evidence_id}`}
                    className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>#{graphData.central_evidence_id}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Footer Close */}
              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

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
