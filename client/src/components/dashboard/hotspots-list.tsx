import { Card, CardContent } from '@/components/ui/card';

interface Hotspot {
  region: string;
  type: string;
  score: number;
  riskLevel: string;
}

interface HotspotsListProps {
  hotspots: Hotspot[];
}

export function HotspotsList({ hotspots }: HotspotsListProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'High':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'Medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getScoreColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {hotspots.map((hotspot, index) => (
        <Card key={index} className={`border ${getRiskColor(hotspot.riskLevel)}`}>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{hotspot.region}</div>
                <div className="text-xs opacity-80">{hotspot.type}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(hotspot.riskLevel)}`}>
                {hotspot.score}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
