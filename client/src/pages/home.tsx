import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NewsEvent, Analytics } from '@shared/schema';
import { TopNav } from '@/components/navigation/top-nav';
import { CategoryFilters } from '@/components/filters/category-filters';
import { NewsGrid } from '@/components/news/news-grid';
import { AnalyticsPanel } from '@/components/dashboard/analytics-panel';
import { EventModal } from '@/components/news/event-modal';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'conflict', 'diplomacy', 'disaster', 'innovation', 'politics', 'economy', 'health', 'climate'
  ]);
  const [timelineDays, setTimelineDays] = useState(30);
  const [selectedEvent, setSelectedEvent] = useState<NewsEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { toast } = useToast();

  // Fetch news events
  const { data: events = [], isLoading: eventsLoading, error: eventsError } = useQuery<NewsEvent[]>({
    queryKey: ['/api/news'],
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Fetch analytics
  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics>({
    queryKey: ['/api/analytics'],
    refetchInterval: 300000,
  });

  useEffect(() => {
    if (eventsError) {
      toast({
        title: "Error",
        description: "Failed to load news events. Please try again.",
        variant: "destructive",
      });
    }
  }, [eventsError, toast]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleEventSelect = (event: NewsEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLearningMode = () => {
    toast({
      title: "Learning Mode",
      description: "Educational features are active! Click on any news event to see learning objectives and related topics.",
    });
  };

  // Get related events for modal
  const getRelatedEvents = (event: NewsEvent | null): NewsEvent[] => {
    if (!event || !event.related_events) return [];
    
    return event.related_events
      .map(id => events.find(e => e.id === id))
      .filter(Boolean) as NewsEvent[];
  };

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategories.includes(event.category);
    const searchMatch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  if (eventsLoading && events.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading global news events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav onSearch={handleSearch} onLearningMode={handleLearningMode} />
      
      <CategoryFilters
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        timelineDays={timelineDays}
        onTimelineChange={setTimelineDays}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* News Events Grid */}
          <div className="lg:col-span-2">
            <NewsGrid
              events={filteredEvents}
              onEventSelect={handleEventSelect}
              searchQuery={searchQuery}
            />
          </div>
          
          {/* Analytics Panel */}
          <div className="lg:col-span-1">
            <AnalyticsPanel
              analytics={analytics || null}
              isLoading={analyticsLoading}
              recentEvents={filteredEvents}
              onEventSelect={handleEventSelect}
            />
          </div>
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        relatedEvents={getRelatedEvents(selectedEvent)}
        onEventSelect={handleEventSelect}
      />
    </div>
  );
}
