import React from 'react';
import { X, MapPin, Phone, User, Calendar, ThumbsUp, Trash2, Building2, ExternalLink } from 'lucide-react';
import { PriorityBadge, StatusBadge, CategoryBadge } from '../common/Badge';
import { MUNICIPAL_DEPARTMENTS, ISSUE_STATUSES } from '../../data/initialIssues';

export const IssueDetailModal = ({
  issue,
  onClose,
  onStatusChange,
  onDepartmentChange,
  onDelete
}) => {
  if (!issue) return null;

  const formattedDate = new Date(issue.createdAt).toLocaleString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                #{issue.id}
              </span>
              <CategoryBadge category={issue.category} />
              <PriorityBadge priority={issue.priority} />
            </div>
            <h2 className="text-xl font-bold text-slate-100">{issue.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Photo & Location */}
          <div className="space-y-4">
            <div className="relative h-56 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <img src={issue.image} alt={issue.title} className="h-full w-full object-cover" />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md p-2 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Community Upvotes</span>
                <span className="font-bold text-blue-400 flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5" /> {issue.upvotes} Citizens
                </span>
              </div>
            </div>

            {/* Location Box */}
            <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800 space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-blue-400" /> Geolocation Coordinates
              </h4>
              <p className="text-xs text-slate-200">{issue.location.address}</p>
              <p className="text-[11px] font-mono text-slate-400">
                Lat: {issue.location.lat}, Lng: {issue.location.lng}
              </p>
              <a
                href={`https://maps.google.com/?q=${issue.location.lat},${issue.location.lng}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:underline pt-1"
              >
                Open in External Maps <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Triage Controls & Info */}
          <div className="space-y-5">
            
            {/* Triage Controls Box */}
            <div className="rounded-2xl bg-indigo-950/30 p-4 border border-indigo-500/20 space-y-4">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                ⚡ Municipal Dispatch & Status Control
              </h4>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Current Status
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={issue.status}
                    onChange={(e) => onStatusChange(issue.id, e.target.value)}
                    className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-100 focus:border-indigo-500 focus:outline-none"
                  >
                    {ISSUE_STATUSES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <StatusBadge status={issue.status} />
                </div>
              </div>

              {/* Worker Department Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-indigo-400" /> Assign Municipal Department
                </label>
                <select
                  value={issue.assignedDept || 'Unassigned'}
                  onChange={(e) => onDepartmentChange(issue.id, e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-100 focus:border-indigo-500 focus:outline-none"
                >
                  {MUNICIPAL_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-1">Description</h4>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {issue.description}
              </p>
            </div>

            {/* Reporter Information */}
            <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <User className="h-3.5 w-3.5" /> Reporter:
                </span>
                <span className="font-semibold text-slate-200">{issue.reporterName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="h-3.5 w-3.5" /> Contact Phone:
                </span>
                <span className="font-mono text-slate-200">{issue.reporterPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="h-3.5 w-3.5" /> Reported Time:
                </span>
                <span className="text-slate-400 text-[11px]">{formattedDate}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this civic report?')) {
                onDelete(issue.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Report</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
