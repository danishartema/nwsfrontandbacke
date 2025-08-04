import { NewsEvent } from '@shared/schema';

interface EventMarkerProps {
  event: NewsEvent;
  onClick: () => void;
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

export function EventMarker({ event, onClick }: EventMarkerProps) {
  const color = categoryColors[event.category as keyof typeof categoryColors] || '#666666';
  
  return (
    <div
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
      onClick={onClick}
      style={{
        left: `${((event.location.longitude + 180) / 360) * 100}%`,
        top: `${((90 - event.location.latitude) / 180) * 100}%`
      }}
    >
      <div
        className="w-4 h-4 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
        style={{ backgroundColor: color }}
        title={event.title}
      />
    </div>
  );
}
