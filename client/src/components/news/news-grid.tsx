import { NewsEvent } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, TrendingUp, AlertTriangle, Brain, Target, GraduationCap, BookOpen } from 'lucide-react';
import { StudyGuideModal } from '@/components/study-guide/study-guide-modal';

interface NewsGridProps {
  events: NewsEvent[];
  onEventSelect: (event: NewsEvent) => void;
  searchQuery: string;
}

const categoryColors = {
  conflict: 'bg-red-100 text-red-800 border-red-200',
  diplomacy: 'bg-blue-100 text-blue-800 border-blue-200',
  disaster: 'bg-orange-100 text-orange-800 border-orange-200',
  innovation: 'bg-green-100 text-green-800 border-green-200',
  politics: 'bg-purple-100 text-purple-800 border-purple-200',
  economy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  health: 'bg-pink-100 text-pink-800 border-pink-200',
  climate: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment.toLowerCase()) {
    case 'positive': return 'text-green-600';
    case 'negative': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getRiskLevel = (escalationProb: number) => {
  if (escalationProb >= 0.7) return { level: 'High', color: 'text-red-600' };
  if (escalationProb >= 0.4) return { level: 'Medium', color: 'text-orange-600' };
  return { level: 'Low', color: 'text-green-600' };
};

export function NewsGrid({ events, onEventSelect, searchQuery }: NewsGridProps) {
  console.log('NewsGrid received events:', events.length);
  
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
          <p>
            {searchQuery 
              ? `No news events match your search for "${searchQuery}"`
              : "No news events match your current filters"
            }
          </p>
          <p className="text-sm mt-2 text-gray-400">
            Check if the API server is running on port 5000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Global News Analysis</h2>
        <p className="text-gray-600">
          Discover {events.length} news events with AI-powered insights and educational context
        </p>
      </div>

      <div className="grid gap-4">
        {events.map((event) => {
          const riskLevel = getRiskLevel(event.conflict_escalation_probability);
          
          return (
            <Card 
              key={event.id} 
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500"
            >
              <CardHeader className="pb-3 cursor-pointer" onClick={() => onEventSelect(event)}>
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-lg leading-tight flex-1">
                    {event.title}
                  </CardTitle>
                  <Badge 
                    className={`${categoryColors[event.category as keyof typeof categoryColors]} text-xs`}
                  >
                    {event.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(event.published_date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location.city}, {event.location.country}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="cursor-pointer" onClick={() => onEventSelect(event)}>
                  <p className="text-gray-700 line-clamp-3">
                    {event.ai_summary}
                  </p>
                </div>

                {/* AI Insights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 bg-gray-50 rounded-lg p-3 cursor-pointer" onClick={() => onEventSelect(event)}>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-600">Impact</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {event.geopolitical_impact.toFixed(1)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-xs font-medium text-gray-600">Risk</span>
                    </div>
                    <div className={`text-lg font-bold ${riskLevel.color}`}>
                      {riskLevel.level}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-gray-600">Sentiment</span>
                    </div>
                    <div className={`text-lg font-bold ${getSentimentColor(event.sentiment)}`}>
                      {event.sentiment}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-gray-600">Learning</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {event.educational_context.learning_objectives.length}
                    </div>
                  </div>
                </div>

                {/* Learning Objectives Preview */}
                <div className="border-t pt-3 cursor-pointer" onClick={() => onEventSelect(event)}>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Key Learning Objectives</span>
                  </div>
                  <div className="space-y-1">
                    {event.educational_context.learning_objectives.slice(0, 2).map((objective, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{objective}</span>
                      </div>
                    ))}
                    {event.educational_context.learning_objectives.length > 2 && (
                      <div className="text-sm text-blue-600 font-medium">
                        +{event.educational_context.learning_objectives.length - 2} more objectives
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags and Study Guide Button */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex flex-wrap gap-2">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {event.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs text-gray-500">
                        +{event.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div onClick={(e) => e.stopPropagation()}>
                    <StudyGuideModal eventId={event.id} eventTitle={event.title}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                      >
                        <GraduationCap className="w-4 h-4 mr-1" />
                        Study Guide
                      </Button>
                    </StudyGuideModal>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}