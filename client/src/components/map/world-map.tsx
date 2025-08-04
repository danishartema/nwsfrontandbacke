import { useEffect, useRef } from 'react';
import { NewsEvent } from '@shared/schema';
import { EventMarker } from './event-marker';

// Leaflet imports with proper typing
declare global {
  interface Window {
    L: any;
  }
}

interface WorldMapProps {
  events: NewsEvent[];
  selectedEvent: NewsEvent | null;
  onEventSelect: (event: NewsEvent) => void;
  visibleCategories: string[];
}

const categoryColors = {
  'conflict': '#EF4444',
  'diplomacy': '#10B981',
  'disaster': '#F59E0B',
  'innovation': '#8B5CF6',
  'politics': '#3B82F6',
  'economy': '#059669',
  'health': '#EC4899',
  'climate': '#84CC16'
};

export function WorldMap({ events, selectedEvent, onEventSelect, visibleCategories }: WorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      if (!window.L) {
        // Add CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(cssLink);

        // Add JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        document.head.appendChild(script);
        
        await new Promise(resolve => {
          script.onload = resolve;
        });
      }

      // Initialize map
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = window.L.map(mapRef.current).setView([20, 0], 2);
        
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers for visible events
    const filteredEvents = events.filter(event => 
      visibleCategories.includes(event.category)
    );

    filteredEvents.forEach(event => {
      const color = categoryColors[event.category as keyof typeof categoryColors] || '#666666';
      
      const marker = window.L.circleMarker([event.location.latitude, event.location.longitude], {
        radius: 8,
        fillColor: color,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapInstanceRef.current);

      marker.bindPopup(`
        <div class="p-3 max-w-sm">
          <div class="flex items-center space-x-2 mb-2">
            <span class="px-2 py-1 rounded-full text-xs font-medium" style="background-color: ${color}20; color: ${color}">
              ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
            <span class="text-xs text-slate-600">${event.location.city}, ${event.location.country}</span>
          </div>
          <h3 class="font-semibold text-sm text-slate-900 mb-2">${event.title}</h3>
          <p class="text-xs text-slate-700 mb-3">${event.ai_summary}</p>
          <div class="flex justify-between items-center">
            <span class="text-xs text-slate-500">${event.source}</span>
            <button onclick="window.openEventModal(${event.id})" class="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      `);

      marker.on('click', () => {
        onEventSelect(event);
      });

      markersRef.current.push(marker);
    });

    // Global function for popup buttons
    (window as any).openEventModal = (eventId: number) => {
      const event = events.find(e => e.id === eventId);
      if (event) {
        onEventSelect(event);
      }
    };

  }, [events, visibleCategories, onEventSelect]);

  return (
    <div className="flex-1 relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 space-y-2">
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded flex items-center">
          <span className="mr-2">🗺️</span>Heatmap View
        </button>
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded flex items-center">
          <span className="mr-2">⏰</span>Time-lapse Mode
        </button>
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded flex items-center">
          <span className="mr-2">📖</span>Story Mode
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-sm text-slate-900 mb-3">Event Categories</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
              <span className="capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
