import { INITIAL_ISSUES } from '../data/initialIssues';

const STORAGE_KEY = 'citypulse_issues_v2';
const VIEW_KEY = 'citypulse_current_view';

export const getStoredIssues = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ISSUES));
      return INITIAL_ISSUES;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return INITIAL_ISSUES;
  }
};

export const saveIssues = (issues) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
    window.dispatchEvent(new CustomEvent('citypulse_storage_change', { detail: issues }));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};

export const addIssue = (newIssue) => {
  const issues = getStoredIssues();
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const formattedIssue = {
    id: `CP-${idNum}`,
    title: newIssue.title,
    description: newIssue.description,
    category: newIssue.category || 'Road & Potholes',
    priority: newIssue.priority || 'Medium',
    status: 'Open',
    upvotes: 1,
    hasUpvoted: true,
    location: newIssue.location || { lat: 40.7128, lng: -74.0060, address: 'City Center Sector 1' },
    image: newIssue.image || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    reporterName: newIssue.reporterName || 'Anonymous Citizen',
    reporterPhone: newIssue.reporterPhone || '+1 (555) 000-0000',
    assignedDept: 'Unassigned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const updated = [formattedIssue, ...issues];
  saveIssues(updated);
  return formattedIssue;
};

export const updateIssueStatus = (issueId, newStatus) => {
  const issues = getStoredIssues();
  const updated = issues.map((item) => {
    if (item.id === issueId) {
      return {
        ...item,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
    }
    return item;
  });
  saveIssues(updated);
};

export const updateIssueDepartment = (issueId, newDept) => {
  const issues = getStoredIssues();
  const updated = issues.map((item) => {
    if (item.id === issueId) {
      return {
        ...item,
        assignedDept: newDept,
        // Auto update status to Assigned if currently Open
        status: item.status === 'Open' ? 'Assigned' : item.status,
        updatedAt: new Date().toISOString()
      };
    }
    return item;
  });
  saveIssues(updated);
};

export const toggleUpvote = (issueId) => {
  const issues = getStoredIssues();
  const updated = issues.map((item) => {
    if (item.id === issueId) {
      const alreadyUpvoted = !!item.hasUpvoted;
      return {
        ...item,
        hasUpvoted: !alreadyUpvoted,
        upvotes: alreadyUpvoted ? Math.max(0, item.upvotes - 1) : item.upvotes + 1
      };
    }
    return item;
  });
  saveIssues(updated);
};

export const deleteIssue = (issueId) => {
  const issues = getStoredIssues();
  const updated = issues.filter((item) => item.id !== issueId);
  saveIssues(updated);
};

export const resetToDefaultData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ISSUES));
  window.dispatchEvent(new CustomEvent('citypulse_storage_change', { detail: INITIAL_ISSUES }));
  return INITIAL_ISSUES;
};

export const getStoredView = () => {
  return localStorage.getItem(VIEW_KEY) || 'citizen';
};

export const setStoredView = (viewMode) => {
  localStorage.setItem(VIEW_KEY, viewMode);
};
