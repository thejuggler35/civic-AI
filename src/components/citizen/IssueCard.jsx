import React from 'react';
import { ThumbsUp, MapPin, Calendar, Building2, User } from 'lucide-react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';

export const IssueCard = ({ issue, onUpvote, onSelect }) => {
  const formattedDate = new Date(issue.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-md transition-all duration-200 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-950/60">
      
      {/* Image Header with Badge Overlays */}
      <div 
        onClick={() => onSelect && onSelect(issue)}
        className="relative h-44 w-full overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img
          src={issue.image}
          alt={issue.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
        
        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <PriorityBadge priority={issue.priority} />
          <StatusBadge status={issue.status} />
        </div>

        {/* Ticket ID Tag */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-800">
          #{issue.id}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <CategoryBadge category={issue.category} />
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar className="h-3 w-3 text-slate-500" /> {formattedDate}
          </span>
        </div>

        <h3 
          onClick={() => onSelect && onSelect(issue)}
          className="text-base font-bold text-slate-100 hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer"
        >
          {issue.title}
        </h3>

        <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {issue.description}
        </p>

        {/* Location Info */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-300">
          <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
          <span className="truncate">{issue.location.address}</span>
        </div>

        {/* Department Info if assigned */}
        {issue.assignedDept && issue.assignedDept !== 'Unassigned' && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-lg">
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Assigned to: <strong className="font-semibold">{issue.assignedDept}</strong></span>
          </div>
        )}

        {/* Card Footer: Reporter & Upvote Button */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <User className="h-3.5 w-3.5 text-slate-500" />
            <span className="truncate max-w-[110px]">{issue.reporterName}</span>
          </div>

          <button
            onClick={() => onUpvote(issue.id)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
              issue.hasUpvoted
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm shadow-blue-500/20'
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ThumbsUp className={`h-3.5 w-3.5 ${issue.hasUpvoted ? 'fill-blue-400 text-blue-400' : ''}`} />
            <span>{issue.upvotes} Upvotes</span>
          </button>
        </div>

      </div>

    </div>
  );
};
