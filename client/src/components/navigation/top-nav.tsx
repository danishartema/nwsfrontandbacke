import { useState } from 'react';
import { Search, GraduationCap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface TopNavProps {
  onSearch: (query: string) => void;
  onLearningMode: () => void;
}

export function TopNav({ onSearch, onLearningMode }: TopNavProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe className="text-blue-600 text-2xl" />
            <h1 className="text-xl font-bold text-slate-900">Geo-Political News Mapper</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Educational
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search by country or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Search className="absolute left-3 top-3 text-slate-400 text-sm" size={16} />
          </form>
          
          <Button onClick={onLearningMode} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            <GraduationCap className="mr-2" size={16} />
            Learning Mode
          </Button>
        </div>
      </div>
    </nav>
  );
}
