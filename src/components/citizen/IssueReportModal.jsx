import React, { useState } from 'react';
import { X, Upload, MapPin, AlertCircle, Camera, CheckCircle2 } from 'lucide-react';
import { MapPicker } from './MapPicker';
import { ISSUE_CATEGORIES, ISSUE_PRIORITIES } from '../../data/initialIssues';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80'
];

export const IssueReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(ISSUE_CATEGORIES[0]);
  const [priority, setPriority] = useState('Medium');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060, address: '5th Ave Municipal District' });
  const [image, setImage] = useState(SAMPLE_IMAGES[0]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please fill in both title and detailed description.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      reporterName: reporterName.trim() || 'Anonymous Resident',
      reporterPhone: reporterPhone.trim() || '+1 (555) 392-1004',
      location,
      image
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span>📢</span> Report Civic Infrastructure Issue
            </h2>
            <p className="text-xs text-slate-400">Help municipal teams detect and fix local hazards faster</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          
          {/* Issue Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Issue Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Deep Pothole near Crosswalk, Overflowing Bin"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Category & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category <span className="text-rose-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
              >
                {ISSUE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Priority Level <span className="text-rose-400">*</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
              >
                {ISSUE_PRIORITIES.map((pri) => (
                  <option key={pri} value={pri}>{pri}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Map Location Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-blue-400" /> Pin Exact Location on Map
              </span>
              <span className="text-[11px] text-slate-400">Click map to adjust pin</span>
            </label>
            <MapPicker
              selectedLocation={location}
              onSelectLocation={(loc) => setLocation(loc)}
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Detailed Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the severity, exact landmark, and any potential hazard to pedestrians or vehicles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Image Drag & Drop Upload Simulation */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Photo Evidence (Upload or Select Sample)
            </label>
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition-all ${
                dragActive
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 bg-slate-950/60 hover:border-slate-600'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Camera className="h-8 w-8 text-slate-400 mb-2" />
              <p className="text-xs text-slate-300 font-medium">
                Drag & drop photo here, or <span className="text-blue-400 underline">browse file</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>

            {/* Quick Sample Image Presets */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 shrink-0">Sample Photos:</span>
              {SAMPLE_IMAGES.map((imgUrl, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImage(imgUrl)}
                  className={`relative h-12 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    image === imgUrl ? 'border-blue-500 ring-2 ring-blue-500/40' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Sample photo option" className="h-full w-full object-cover" />
                  {image === imgUrl && (
                    <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Reporter Contact (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Your Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Phone (Optional)</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={reporterPhone}
                onChange={(e) => setReporterPhone(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95"
            >
              Submit Ticket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
