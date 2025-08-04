import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Handshake, AlertTriangle, Lightbulb, Landmark, TrendingUp, Heart, Leaf, Settings } from 'lucide-react';

const categories = [
  { id: 'conflict', label: 'Conflict', icon: Flame, color: 'bg-red-100 text-red-700 hover:bg-red-200' },
  { id: 'diplomacy', label: 'Diplomacy', icon: Handshake, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  { id: 'disaster', label: 'Disaster', icon: AlertTriangle, color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  { id: 'innovation', label: 'Innovation', icon: Lightbulb, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  { id: 'politics', label: 'Politics', icon: Landmark, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  { id: 'economy', label: 'Economy', icon: TrendingUp, color: 'bg-teal-100 text-teal-700 hover:bg-teal-200' },
  { id: 'health', label: 'Health', icon: Heart, color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
  { id: 'climate', label: 'Climate', icon: Leaf, color: 'bg-lime-100 text-lime-700 hover:bg-lime-200' },
];

interface CategoryFiltersProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  timelineDays: number;
  onTimelineChange: (days: number) => void;
}

export function CategoryFilters({ 
  selectedCategories, 
  onCategoryToggle, 
  timelineDays, 
  onTimelineChange 
}: CategoryFiltersProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-slate-700 mr-2">Event Categories:</span>
          {categories.map(category => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.id);
            
            return (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                onClick={() => onCategoryToggle(category.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isSelected ? category.color : 'hover:bg-slate-100'
                }`}
              >
                <Icon className="mr-1" size={12} />
                {category.label}
              </Button>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700">Timeline:</span>
            <input
              type="range"
              min="1"
              max="30"
              value={timelineDays}
              onChange={(e) => onTimelineChange(parseInt(e.target.value))}
              className="w-32 h-2 bg-slate-200 rounded-lg appearance-none slider"
            />
            <span className="text-xs text-slate-600">Last {timelineDays} days</span>
          </div>
          <Button variant="ghost" size="sm">
            <Settings size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
