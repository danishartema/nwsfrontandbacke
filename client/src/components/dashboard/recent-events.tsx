import { Card, CardContent } from '@/components/ui/card';
import { NewsEvent } from '@shared/schema';

interface RecentEventsProps {
  events: NewsEvent[];
  onEventSelect: (event: NewsEvent) => void;
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

export function RecentEvents({ events, onEventSelect }: RecentEventsProps) {
  const recentEvents = events.slice(0, 5);

  return (
    <div className="space-y-3">
      {recentEvents.map(event => {
        const color = categoryColors[event.category as keyof typeof categoryColors] || '#666666';
        
        return (
          <Card 
            key={event.id}
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => onEventSelect(event)}
          >
            <CardContent className="p-3 bg-slate-50">
              <div className="flex items-start space-x-3">
                <div 
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-slate-900 truncate">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {event.location.city}, {event.location.country}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(event.published_date).toLocaleDateString()}
                  </p>
                </div>
                <div 
                  className="text-xs font-medium px-2 py-1 rounded flex-shrink-0"
                  style={{ 
                    backgroundColor: `${color}20`, 
                    color: color 
                  }}
                >
                  {event.geopolitical_impact}/10
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
