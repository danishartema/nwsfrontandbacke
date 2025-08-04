import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface TimelineSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function TimelineSlider({ 
  value, 
  onChange, 
  min = 1, 
  max = 30, 
  step = 1,
  className = ""
}: TimelineSliderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleValueChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const getTimeLabel = (days: number) => {
    if (days === 1) return "Last 24 hours";
    if (days <= 7) return `Last ${days} days`;
    if (days <= 30) return `Last ${days} days`;
    return `Last ${days} days`;
  };

  const getDateRange = (days: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    
    return {
      start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const dateRange = getDateRange(value);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Clock size={14} />
          Timeline Filter
        </Label>
        <span className="text-xs text-slate-600 font-medium">
          {getTimeLabel(value)}
        </span>
      </div>

      <div 
        className="space-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Slider
          value={[value]}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-slate-500">
          <span>1 day</span>
          <span>30 days</span>
        </div>
      </div>

      {isHovered && (
        <Card className="absolute z-10 mt-2 min-w-48 shadow-lg">
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Date Range</span>
                <Calendar size={14} className="text-slate-500" />
              </div>
              <div className="text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>From: {dateRange.start}</span>
                  <span>To: {dateRange.end}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  Showing events from the last <strong>{value}</strong> {value === 1 ? 'day' : 'days'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick presets */}
      <div className="flex gap-1 flex-wrap">
        {[1, 7, 14, 30].map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-2 py-1 text-xs rounded-full transition-colors ${
              value === preset
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {preset === 1 ? '24h' : `${preset}d`}
          </button>
        ))}
      </div>
    </div>
  );
}
