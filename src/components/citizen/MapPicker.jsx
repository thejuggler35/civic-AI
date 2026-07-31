import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default marker icons using reliable CDN URLs to avoid bundling 404s
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Child component to capture click location on map
function LocationMarker({ selectedPos, onSelectLocation }) {
  const map = useMap();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSelectLocation({
        lat: Number(lat.toFixed(5)),
        lng: Number(lng.toFixed(5)),
        address: `Sector Pin (${lat.toFixed(3)}, ${lng.toFixed(3)})`
      });
      map.flyTo(e.latlng, map.getZoom());
    }
  });

  return selectedPos ? (
    <Marker position={[selectedPos.lat, selectedPos.lng]} />
  ) : null;
}

export const MapPicker = ({ selectedLocation, onSelectLocation }) => {
  const defaultCenter = selectedLocation?.lat
    ? [selectedLocation.lat, selectedLocation.lng]
    : [40.7128, -74.0060];

  return (
    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          selectedPos={selectedLocation}
          onSelectLocation={onSelectLocation}
        />
      </MapContainer>

      <div className="absolute bottom-2 left-2 z-[400] bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-200 shadow-md">
        📍 {selectedLocation ? `Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}` : 'Click map to pin exact issue location'}
      </div>
    </div>
  );
};
