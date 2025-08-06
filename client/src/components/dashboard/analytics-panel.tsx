import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Analytics } from '@shared/schema';
import { HotspotsList } from '../dashboard/hotspots-list';
import { RecentEvents } from '../dashboard/recent-events';
import { NewsEvent } from '@shared/schema';

interface AnalyticsPanelProps {
  analytics: Analytics | null;
  isLoading: boolean;
  recentEvents: NewsEvent[];
  onEventSelect: (event: NewsEvent) => void;
}

export function AnalyticsPanel({ analytics, isLoading, recentEvents, onEventSelect }: AnalyticsPanelProps) {
  console.log('AnalyticsPanel - analytics:', analytics, 'isLoading:', isLoading);
  
  if (isLoading) {
    return (
      <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-slate-200 rounded"></div>
            <div className="h-20 bg-slate-200 rounded"></div>
          </div>
          <div className="h-40 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto p-6">
        <div className="text-center text-slate-500">
          <p>Failed to load analytics</p>
          <p className="text-xs mt-2">Check API server connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto">
      {/* Panel Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">News Analysis</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <Card>
            <CardContent className="p-3 bg-slate-50">
              <div className="text-2xl font-bold text-slate-900">{analytics.totalEvents}</div>
              <div className="text-xs text-slate-600">Active Events</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 bg-slate-50">
              <div className="text-2xl font-bold text-slate-900">{analytics.hotspots}</div>
              <div className="text-xs text-slate-600">Global Hotspots</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="p-6 space-y-6">
        {/* AI Analysis Summary */}
        <div>
          <h3 className="font-semibold text-sm text-slate-900 mb-3">AI Analysis Summary</h3>
          <Card>
            <CardContent className="p-4 bg-slate-50">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">High Impact Events</span>
                  <span className="text-lg font-bold text-red-600">
                    {recentEvents.filter(e => e.geopolitical_impact >= 8).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">High Risk Events</span>
                  <span className="text-lg font-bold text-orange-600">
                    {recentEvents.filter(e => e.conflict_escalation_probability >= 0.7).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Innovation Events</span>
                  <span className="text-lg font-bold text-green-600">
                    {recentEvents.filter(e => e.category === 'innovation').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Distribution */}
        <div>
          <h3 className="font-semibold text-sm text-slate-900 mb-3">Event Distribution</h3>
          <div className="space-y-2">
            {Object.entries(analytics.eventDistribution).map(([category, count]) => {
              const percentage = (count / analytics.totalEvents) * 100;
              const colors = {
                'conflict': 'bg-red-500',
                'diplomacy': 'bg-green-500',
                'disaster': 'bg-orange-500',
                'innovation': 'bg-purple-500',
                'politics': 'bg-blue-500',
                'economy': 'bg-teal-500',
                'health': 'bg-pink-500',
                'climate': 'bg-lime-500'
              };
              
              return (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-slate-700 capitalize">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-slate-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${colors[category as keyof typeof colors] || 'bg-gray-500'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-600 w-6 text-right">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geopolitical Hotspots */}
        <div>
          <h3 className="font-semibold text-sm text-slate-900 mb-3">Current Hotspots</h3>
          <HotspotsList hotspots={analytics.topHotspots} />
        </div>

        {/* Recent Events */}
        <div>
          <h3 className="font-semibold text-sm text-slate-900 mb-3">Recent Events</h3>
          <RecentEvents events={recentEvents.slice(0, 5)} onEventSelect={onEventSelect} />
        </div>
      </div>
    </div>
  );
}
