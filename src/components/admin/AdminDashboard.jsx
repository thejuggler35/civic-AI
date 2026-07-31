import React, { useState } from 'react';
import { AlertCircle, Clock, CheckCircle2, ShieldAlert, FileText } from 'lucide-react';
import { StatsCard } from '../common/StatsCard';
import { AdminFilters } from './AdminFilters';
import { AdminTable } from './AdminTable';
import { IssueDetailModal } from './IssueDetailModal';

export const AdminDashboard = ({
  issues,
  onStatusChange,
  onDepartmentChange,
  onDeleteIssue
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [inspectIssue, setInspectIssue] = useState(null);

  // Compute Stat Metrics
  const totalCount = issues.length;
  const pendingCount = issues.filter((i) => i.status === 'Open' || i.status === 'Assigned' || i.status === 'In Progress').length;
  const emergencyCount = issues.filter((i) => i.priority === 'Emergency' && i.status !== 'Resolved').length;
  const resolvedCount = issues.filter((i) => i.status === 'Resolved').length;

  // Filter Issues
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || issue.category === selectedCategory;
    const matchesPriority = selectedPriority === 'All' || issue.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'All' || issue.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Municipal Command Center</h2>
            <span className="rounded bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              LIVE TRIAGE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time municipal operations table for department heads, dispatchers, and field crews.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldAlert className="h-4 w-4 text-indigo-400" />
          <span>City Sector 1-5 Operations</span>
        </div>
      </div>

      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Complaints"
          value={totalCount}
          subtext="Logged in system"
          icon={FileText}
          color="blue"
          trend={{ label: 'Weekly volume', value: '+14%', positive: true }}
        />

        <StatsCard
          title="Pending Operations"
          value={pendingCount}
          subtext="Open / Assigned / In Progress"
          icon={Clock}
          color="amber"
          trend={{ label: 'Active dispatch', value: `${pendingCount} active`, positive: false }}
        />

        <StatsCard
          title="Critical Emergencies"
          value={emergencyCount}
          subtext="High-risk water/sewage/road"
          icon={AlertCircle}
          color="rose"
          trend={{ label: 'Action required', value: emergencyCount > 0 ? 'Urgent' : 'Clear', positive: emergencyCount === 0 }}
        />

        <StatsCard
          title="Avg Resolution Time"
          value="1.8 Days"
          subtext={`${resolvedCount} resolved tickets`}
          icon={CheckCircle2}
          color="emerald"
          trend={{ label: 'Target < 2.0 days', value: 'On Track', positive: true }}
        />
      </div>

      {/* Filter Control Bar */}
      <AdminFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onResetFilters={handleResetFilters}
      />

      {/* Management Table */}
      <AdminTable
        issues={filteredIssues}
        onStatusChange={onStatusChange}
        onDepartmentChange={onDepartmentChange}
        onSelectIssue={(issue) => setInspectIssue(issue)}
        onDeleteIssue={onDeleteIssue}
      />

      {/* Ticket Inspector Modal */}
      {inspectIssue && (
        <IssueDetailModal
          issue={inspectIssue}
          onClose={() => setInspectIssue(null)}
          onStatusChange={(id, status) => {
            onStatusChange(id, status);
            setInspectIssue((prev) => (prev ? { ...prev, status } : null));
          }}
          onDepartmentChange={(id, dept) => {
            onDepartmentChange(id, dept);
            setInspectIssue((prev) => (prev ? { ...prev, assignedDept: dept } : null));
          }}
          onDelete={onDeleteIssue}
        />
      )}

    </div>
  );
};
