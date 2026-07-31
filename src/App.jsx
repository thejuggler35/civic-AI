import React, { useState, useEffect } from 'react';
import {
  getStoredIssues,
  getStoredView,
  setStoredView,
  addIssue,
  updateIssueStatus,
  updateIssueDepartment,
  toggleUpvote,
  deleteIssue
} from './utils/storage';
import { Header } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { IssueFeed } from './components/citizen/IssueFeed';
import { IssueReportModal } from './components/citizen/IssueReportModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { IssueDetailModal } from './components/admin/IssueDetailModal';

export function App() {
  const [issues, setIssues] = useState([]);
  const [viewMode, setViewMode] = useState('citizen'); // 'citizen' | 'admin'
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Initialize data and listeners
  useEffect(() => {
    setIssues(getStoredIssues());
    setViewMode(getStoredView());

    const handleStorageChange = (e) => {
      if (e.detail) {
        setIssues(e.detail);
      } else {
        setIssues(getStoredIssues());
      }
    };

    window.addEventListener('citypulse_storage_change', handleStorageChange);
    return () => {
      window.removeEventListener('citypulse_storage_change', handleStorageChange);
    };
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 4000);
  };

  const handleViewChange = (newView) => {
    setViewMode(newView);
    setStoredView(newView);
    showToast(`Switched view to ${newView === 'citizen' ? 'Citizen Portal' : 'Municipal Admin Dashboard'}`, 'info');
  };

  const handleAddIssue = (newIssueData) => {
    const created = addIssue(newIssueData);
    showToast(`Ticket #${created.id} successfully reported to City Hall!`, 'success');
  };

  const handleUpvote = (issueId) => {
    toggleUpvote(issueId);
    showToast('Upvote recorded! Thanks for supporting your community.', 'success');
  };

  const handleStatusChange = (issueId, newStatus) => {
    updateIssueStatus(issueId, newStatus);
    showToast(`Ticket #${issueId} status updated to "${newStatus}"`, 'success');
  };

  const handleDepartmentChange = (issueId, newDept) => {
    updateIssueDepartment(issueId, newDept);
    showToast(`Ticket #${issueId} assigned to "${newDept}"`, 'info');
  };

  const handleDeleteIssue = (issueId) => {
    deleteIssue(issueId);
    showToast(`Ticket #${issueId} removed from registry`, 'error');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Bar Header */}
      <Header
        currentView={viewMode}
        onViewChange={handleViewChange}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        issueCount={issues.length}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {viewMode === 'citizen' ? (
          <IssueFeed
            issues={issues}
            onUpvote={handleUpvote}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onSelectIssue={(issue) => setSelectedIssue(issue)}
          />
        ) : (
          <AdminDashboard
            issues={issues}
            onStatusChange={handleStatusChange}
            onDepartmentChange={handleDepartmentChange}
            onDeleteIssue={handleDeleteIssue}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 CityPulse Municipal Tech Platform. Built for Hackathon Excellence.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Leaflet GIS Enabled</span>
            <span>•</span>
            <span>Zero-Backend LocalStorage Engine</span>
            <span>•</span>
            <span>React 19 + Tailwind v4</span>
          </div>
        </div>
      </footer>

      {/* Modals & Toasts */}
      <IssueReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleAddIssue}
      />

      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onStatusChange={handleStatusChange}
          onDepartmentChange={handleDepartmentChange}
          onDelete={handleDeleteIssue}
        />
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

    </div>
  );
}

export default App;
