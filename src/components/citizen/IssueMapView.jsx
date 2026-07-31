import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ThumbsUp, MapPin } from 'lucide-react';
import { PriorityBadge, StatusBadge } from '../common/Badge';

// Create custom SVG markers for Leaflet based on Priority
const createCustomMarker = (priority, status) => {
  const colorMap = {
    Emergency: '#ef4444',
    High: '#f97316',
    Medium: '#f59e0b',
    Low: '#10b981'
  };
  const color = colorMap[priority] || '#3b82f6';
  const isEmergency = priority === 'Emergency';

  const svgHtml = `
    <div style="position: relative; width: 32px; height: 32px; display: flex; items-center: center; justify-content: center;">
      ${isEmergency ? `<div style="position: absolute; inset: -4px; border-radius: 9999px; background: ${color}; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
      <div style="width: 28px; height: 28px; border-radius: 9999px; background: #0f172a; border: 2px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
        <div style="width: 12px; height: 12px; border-radius: 9999px; background: ${color};"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-pin',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export const IssueMapView = ({ issues, onUpvote, onSelectIssue }) => {
  const center = [40.7128, -74.0060];

  return (
    <div className="relative w-full h-[calc(100vh-14rem)] min-h-[500px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {issues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.location.lat, issue.location.lng]}
            icon={createCustomMarker(issue.priority, issue.status)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="w-64 p-1 text-slate-100">
                <div className="relative h-28 w-full rounded-lg overflow-hidden mb-2.5">
                  <img src={issue.image} alt={issue.title} className="h-full w-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <PriorityBadge priority={issue.priority} />
                  </div>
                </div>

                <div className="mb-2">
                  <StatusBadge status={issue.status} />
                </div>

                <h4 className="text-sm font-bold text-slate-100 line-clamp-1">{issue.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{issue.description}</p>
                
                <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-blue-400" />
                  <span className="truncate">{issue.location.address}</span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between">
                  <button
                    onClick={() => onSelectIssue(issue)}
                    className="text-xs font-semibold text-blue-400 hover:underline"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onUpvote(issue.id)}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      issue.hasUpvoted ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>{issue.upvotes}</span>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-[400] bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 shadow-xl space-y-1.5">
        <p className="font-semibold text-slate-200 border-b border-slate-800 pb-1 mb-1">Priority Legend</p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span>Emergency</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
          <span>High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Low Priority</span>
        </div>
      </div>
    </div>
  );
};
