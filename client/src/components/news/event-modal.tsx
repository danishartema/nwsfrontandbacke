import { NewsEvent } from '@shared/schema';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, MapPin, TrendingUp, AlertTriangle, Brain, Target, BookOpen, Users, Building } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EventModalProps {
  event: NewsEvent | null;
  isOpen: boolean;
  onClose: () => void;
  relatedEvents: NewsEvent[];
  onEventSelect: (event: NewsEvent) => void;
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
  if (escalationProb >= 0.7) return { level: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50' };
  if (escalationProb >= 0.4) return { level: 'Medium Risk', color: 'text-orange-600', bgColor: 'bg-orange-50' };
  return { level: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-50' };
};

export function EventModal({ event, isOpen, onClose, relatedEvents, onEventSelect }: EventModalProps) {
  if (!event) return null;

  const riskLevel = getRiskLevel(event.conflict_escalation_probability);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl leading-tight pr-8">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {new Date(event.published_date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location.city}, {event.location.country}
              </div>
              <Badge className={`${categoryColors[event.category as keyof typeof categoryColors]} text-xs`}>
                {event.category}
              </Badge>
            </div>

            <div className="text-gray-700 leading-relaxed">
              {event.content}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">AI Analysis</span>
              </div>
              <p className="text-blue-800">{event.ai_summary}</p>
            </div>
          </div>

          {/* AI Insights Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Geopolitical Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {event.geopolitical_impact.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Geopolitical Impact</div>
                </div>

                <div className={`text-center p-4 ${riskLevel.bgColor} rounded-lg`}>
                  <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className={`text-2xl font-bold ${riskLevel.color} mb-1`}>
                    {Math.round(event.conflict_escalation_probability * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Escalation Risk</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className={`text-2xl font-bold ${getSentimentColor(event.sentiment)} mb-1`}>
                    {event.sentiment}
                  </div>
                  <div className="text-sm text-gray-600">Sentiment</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {event.economic_impact.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Economic Impact</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Educational Context */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                Educational Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Learning Objectives
                </h4>
                <ul className="space-y-2">
                  {event.educational_context.learning_objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Related Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {event.educational_context.related_topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Entities & Trend Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Key Entities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Countries</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.entities.countries.map((country) => (
                      <Badge key={country} variant="outline" className="text-xs">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </div>

                {event.entities.people && event.entities.people.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key People</h4>
                    <div className="flex flex-wrap gap-1">
                      {event.entities.people.map((person) => (
                        <Badge key={person} variant="outline" className="text-xs bg-purple-50">
                          {person}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {event.entities.organizations && event.entities.organizations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      Organizations
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {event.entities.organizations.map((org) => (
                        <Badge key={org} variant="outline" className="text-xs bg-orange-50">
                          {org}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{event.trend_analysis}</p>
              </CardContent>
            </Card>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedEvents.map((relatedEvent) => (
                    <div
                      key={relatedEvent.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => onEventSelect(relatedEvent)}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{relatedEvent.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{relatedEvent.ai_summary}</p>
                        </div>
                        <Badge className={`${categoryColors[relatedEvent.category as keyof typeof categoryColors]} text-xs flex-shrink-0`}>
                          {relatedEvent.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gray-50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}