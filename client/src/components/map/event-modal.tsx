import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { NewsEvent } from '@shared/schema';
import { X } from 'lucide-react';

interface EventModalProps {
  event: NewsEvent | null;
  isOpen: boolean;
  onClose: () => void;
  relatedEvents: NewsEvent[];
  onEventSelect: (event: NewsEvent) => void;
}

const categoryColors = {
  'conflict': 'bg-red-100 text-red-700',
  'diplomacy': 'bg-green-100 text-green-700',
  'disaster': 'bg-orange-100 text-orange-700',
  'innovation': 'bg-purple-100 text-purple-700',
  'politics': 'bg-blue-100 text-blue-700',
  'economy': 'bg-teal-100 text-teal-700',
  'health': 'bg-pink-100 text-pink-700',
  'climate': 'bg-lime-100 text-lime-700'
};

const sentimentColors = {
  'Positive': 'text-green-600',
  'Negative': 'text-red-600',
  'Neutral': 'text-yellow-600'
};

export function EventModal({ event, isOpen, onClose, relatedEvents, onEventSelect }: EventModalProps) {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const allEntities = [
    ...event.entities.countries.map(c => ({ type: 'Country', name: c })),
    ...(event.entities.people || []).map(p => ({ type: 'Person', name: p })),
    ...(event.entities.organizations || []).map(o => ({ type: 'Organization', name: o }))
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={categoryColors[event.category as keyof typeof categoryColors]}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </Badge>
                <span className="text-sm text-slate-600">
                  {event.location.city}, {event.location.country}
                </span>
                <span className="text-sm text-slate-500">
                  {formatDate(event.published_date)}
                </span>
              </div>
              <DialogTitle className="text-xl font-semibold text-slate-900 mb-2">
                {event.title}
              </DialogTitle>
              <p className="text-sm text-slate-600">Source: {event.source}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* AI Summary */}
          <div>
            <h3 className="font-semibold text-lg text-slate-900 mb-3">AI Analysis Summary</h3>
            <Card>
              <CardContent className="p-4 bg-blue-50 border border-blue-200">
                <p className="text-slate-700">{event.ai_summary}</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-900 mb-3">Sentiment Analysis</h4>
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${
                  event.sentiment === 'Positive' ? 'bg-green-500' :
                  event.sentiment === 'Negative' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className={`text-sm font-medium ${sentimentColors[event.sentiment as keyof typeof sentimentColors]}`}>
                  {event.sentiment}
                </span>
                <span className="text-sm text-slate-500">
                  (Confidence: {Math.round(event.sentiment_score * 100)}%)
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 mb-3">Geopolitical Impact</h4>
              <div className="flex items-center space-x-2">
                <Progress value={event.geopolitical_impact * 10} className="flex-1" />
                <span className="text-sm font-medium text-slate-900">
                  {event.geopolitical_impact}/10
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 mb-3">Economic Impact</h4>
              <div className="flex items-center space-x-2">
                <Progress value={event.economic_impact * 10} className="flex-1" />
                <span className="text-sm font-medium text-slate-900">
                  {event.economic_impact}/10
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 mb-3">Conflict Risk</h4>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={event.conflict_escalation_probability * 100} 
                  className="flex-1"
                />
                <span className="text-sm font-medium text-slate-900">
                  {Math.round(event.conflict_escalation_probability * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Named Entities */}
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Key Entities</h4>
            <div className="flex flex-wrap gap-2">
              {allEntities.map((entity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {entity.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Educational Context */}
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Educational Context</h4>
            <Card>
              <CardContent className="p-4 bg-slate-50">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm text-slate-700">Learning Objectives:</span>
                    <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                      {event.educational_context.learning_objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-sm text-slate-700">Related Topics:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {event.educational_context.related_topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Analysis */}
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Trend Analysis</h4>
            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
              {event.trend_analysis}
            </p>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-900 mb-3">Related Events</h4>
              <div className="space-y-2">
                {relatedEvents.map(relatedEvent => (
                  <Card 
                    key={relatedEvent.id} 
                    className="cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => onEventSelect(relatedEvent)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          relatedEvent.category === 'conflict' ? 'bg-red-500' :
                          relatedEvent.category === 'diplomacy' ? 'bg-green-500' :
                          relatedEvent.category === 'disaster' ? 'bg-orange-500' :
                          relatedEvent.category === 'innovation' ? 'bg-purple-500' :
                          'bg-blue-500'
                        }`}></div>
                        <span className="text-sm text-slate-900 font-medium flex-1">
                          {relatedEvent.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {relatedEvent.location.city}, {relatedEvent.location.country}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
