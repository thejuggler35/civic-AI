import React, { useState } from 'react';
import { LayoutGrid, Map, PlusCircle, Search, Filter, AlertTriangle } from 'lucide-react';
import { IssueCard } from './IssueCard';
import { IssueMapView } from './IssueMapView';
import { ISSUE_CATEGORIES, ISSUE_STATUSES } from '../../data/initialIssues';

export const IssueFeed = ({
  issues,
  onUpvote,
  onOpenReportModal,
  onSelectIssue
}) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter issues based on search query, category, and status
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || issue.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Hero Section Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-3">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Community-Driven Civic Action</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Spot a Pothole or Broken Light? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Report it directly to City Hall.
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            CityPulse connects residents with municipal field crews. Upvote existing reports to highlight high-impact issues or drop a pin to submit a new complaint.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-400 hover:to-teal-500 transition-all active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Report New Issue</span>
            </button>

            <div className="text-xs text-slate-400 pl-2 border-l border-slate-800">
              <strong className="text-slate-100 font-bold">{issues.length}</strong> Total Reports Logged
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by issue title, ticket ID, address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Filters & View Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Categories</option>
              {ISSUE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Statuses</option>
              {ISSUE_STATUSES.map((st) => (
                <option key={st} value={st} className="bg-slate-900">{st}</option>
              ))}
            </select>
          </div>

          {/* List vs Map Toggle */}
          <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Map className="h-3.5 w-3.5" />
              <span>Map View</span>
            </button>
          </div>

        </div>

      </div>

      {/* Main Content Area */}
      {viewMode === 'list' ? (
        filteredIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onUpvote={onUpvote}
                onSelect={onSelectIssue}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <span className="text-4xl mb-3">🔍</span>
            <h3 className="text-lg font-bold text-slate-200">No issues found matching criteria</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Try adjusting your category/status filters or search query to view active reports.
            </p>
          </div>
        )
      ) : (
        <IssueMapView
          issues={filteredIssues}
          onUpvote={onUpvote}
          onSelectIssue={onSelectIssue}
        />
      )}

    </div>
  );
};
