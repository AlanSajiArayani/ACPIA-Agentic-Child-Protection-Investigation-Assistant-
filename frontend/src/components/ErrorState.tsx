import React from 'react';
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
  onBack?: () => void;
  backText?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Investigation Failed',
  description = "We couldn't complete the investigation.",
  onRetry,
  retryText = 'Try Again',
  onBack,
  backText = 'Back to Case',
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`my-8 flex flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-slate-900/80 p-10 text-center backdrop-blur-xl shadow-xl ${className}`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400">
        <AlertCircle className="h-7 w-7" />
      </div>

      <h3 className="text-base font-bold text-white tracking-tight sm:text-lg">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-md text-xs text-slate-300 leading-relaxed font-mono">
          {description}
        </p>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-950/50 hover:from-red-500 hover:to-rose-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50 active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{retryText}</span>
          </button>
        )}

        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{backText}</span>
          </button>
        )}
      </div>
    </div>
  );
};
