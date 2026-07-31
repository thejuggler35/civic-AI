import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const typeMap = {
    success: {
      bg: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400'
    },
    error: {
      bg: 'bg-rose-950/90 border-rose-500/40 text-rose-200',
      icon: AlertCircle,
      iconColor: 'text-rose-400'
    },
    info: {
      bg: 'bg-blue-950/90 border-blue-500/40 text-blue-200',
      icon: Info,
      iconColor: 'text-blue-400'
    }
  };

  const style = typeMap[type] || typeMap.success;
  const Icon = style.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md transition-all duration-300 max-w-sm">
      <div className={`flex items-center gap-3 ${style.bg}`}>
        <Icon className={`h-5 w-5 ${style.iconColor} shrink-0`} />
        <p className="text-xs font-medium text-slate-100">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-slate-400 hover:text-slate-200 p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
