import React from 'react';
import { Loader2, Cpu } from 'lucide-react';

export interface LoadingStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'Running Investigation...',
  description = 'Gathering and analyzing evidence.',
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`my-8 flex flex-col items-center justify-center rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-10 text-center backdrop-blur-xl shadow-xl ${className}`}
    >
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
        <Loader2 className="h-7 w-7 animate-spin" />
        <Cpu className="absolute h-3.5 w-3.5 text-cyan-300" />
      </div>

      <h3 className="text-base font-bold text-white tracking-tight sm:text-lg">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-md text-xs text-slate-400 leading-relaxed font-mono">
          {description}
        </p>
      )}

      {/* Accessible Screen Reader Status Text */}
      <span className="sr-only">Loading in progress. Please wait.</span>
    </div>
  );
};
