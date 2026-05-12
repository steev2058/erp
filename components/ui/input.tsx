import React from 'react';

export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full border border-slate-300 rounded-md px-3 py-2 ${className}`} {...props} />;
}
