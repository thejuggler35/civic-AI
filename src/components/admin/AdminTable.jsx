import React from 'react';
import { Eye, MapPin, ThumbsUp, Trash2, Building2 } from 'lucide-react';
import { PriorityBadge, StatusBadge, CategoryBadge } from '../common/Badge';
import { MUNICIPAL_DEPARTMENTS, ISSUE_STATUSES } from '../../data/initialIssues';

export const AdminTable = ({
  issues,
  onStatusChange,
  onDepartmentChange,
  onSelectIssue,
  onDeleteIssue
}) => {
  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
        <span className="text-4xl mb-3">📋</span>
        <h3 className="text-lg font-bold text-slate-200">No complaints matching filter</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          Adjust priority, category, or search filters to display registered civic issues.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl backdrop-blur-md">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
          <tr>
            <th scope="col" className="py-3.5 px-4">Ticket ID</th>
            <th scope="col" className="py-3.5 px-4">Issue / Category</th>
            <th scope="col" className="py-3.5 px-4">Location</th>
            <th scope="col" className="py-3.5 px-4">Priority</th>
            <th scope="col" className="py-3.5 px-4">Upvotes</th>
            <th scope="col" className="py-3.5 px-4">Status Action</th>
            <th scope="col" className="py-3.5 px-4">Assigned Dept</th>
            <th scope="col" className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80">
          {issues.map((issue) => (
            <tr key={issue.id} className="hover:bg-slate-800/40 transition-colors group">
              
              {/* Ticket ID */}
              <td className="py-4 px-4 font-mono font-bold text-indigo-400">
                #{issue.id}
              </td>

              {/* Title & Category */}
              <td className="py-4 px-4 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <CategoryBadge category={issue.category} />
                </div>
                <p
                  onClick={() => onSelectIssue(issue)}
                  className="font-bold text-slate-100 line-clamp-1 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {issue.title}
                </p>
                <p className="text-[11px] text-slate-400">Reporter: {issue.reporterName}</p>
              </td>

              {/* Location */}
              <td className="py-4 px-4 max-w-[180px]">
                <div className="flex items-center gap-1 text-slate-300 truncate">
                  <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{issue.location.address}</span>
                </div>
              </td>

              {/* Priority Badge */}
              <td className="py-4 px-4">
                <PriorityBadge priority={issue.priority} />
              </td>

              {/* Upvote Counter */}
              <td className="py-4 px-4 font-semibold text-blue-400">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{issue.upvotes}</span>
                </div>
              </td>

              {/* Status Action Dropdown */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <select
                    value={issue.status}
                    onChange={(e) => onStatusChange(issue.id, e.target.value)}
                    className="rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-100 focus:border-indigo-500 focus:outline-none cursor-pointer"
                  >
                    {ISSUE_STATUSES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </td>

              {/* Worker Department Dropdown */}
              <td className="py-4 px-4 max-w-[160px]">
                <select
                  value={issue.assignedDept || 'Unassigned'}
                  onChange={(e) => onDepartmentChange(issue.id, e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-300 focus:border-indigo-500 focus:outline-none cursor-pointer truncate"
                >
                  {MUNICIPAL_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </td>

              {/* Actions */}
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onSelectIssue(issue)}
                    title="Inspect Ticket Details"
                    className="p-1.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ticket #${issue.id}?`)) {
                        onDeleteIssue(issue.id);
                      }
                    }}
                    title="Delete Ticket"
                    className="p-1.5 rounded-lg border border-slate-700 bg-slate-950 text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
