import React from 'react';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div
      className={`my-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-10 text-center backdrop-blur-sm ${className}`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-500 shadow-inner">
        {icon || <Inbox className="h-7 w-7" />}
      </div>

      <h3 className="text-base font-bold text-white tracking-tight sm:text-lg">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-md text-xs text-slate-400 leading-relaxed">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
