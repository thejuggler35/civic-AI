import React from 'react';

export const PriorityBadge = ({ priority }) => {
  const styles = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    High: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    Emergency: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse font-bold'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[priority] || styles.Medium}`}>
      {priority === 'Emergency' && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-1.5 animate-ping" />}
      {priority}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const styles = {
    Open: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    Assigned: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    'In Progress': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Resolved: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || styles.Open}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'Resolved' ? 'bg-emerald-400' :
        status === 'In Progress' ? 'bg-amber-400' :
        status === 'Assigned' ? 'bg-sky-400' : 'bg-rose-400'
      }`} />
      {status}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
      {category}
    </span>
  );
};
