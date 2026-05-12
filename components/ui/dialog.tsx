import React from 'react';

export function Dialog({ open, children }: { open?: boolean; children: React.ReactNode; onOpenChange?: (v: boolean) => void }) {
  if (!open) return null;
  return <>{children}</>;
}

export function DialogContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40`}><div className={`w-full max-w-2xl bg-white rounded-lg p-4 ${className}`}>{children}</div></div>;
}
