import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar, Clock } from 'lucide-react';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  onSearch?: (query: string) => void;
}

export const SearchBar = ({ variant = 'compact', onSearch }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(location);
    } else {
      navigate(`/search?location=${encodeURIComponent(location)}&date=${date}&time=${time}`);
    }
  };

  if (variant === 'hero') {
    return (
      <div className="w-full max-w-4xl mx-auto bg-card rounded-2xl shadow-card-hover p-2 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Where do you need parking?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-12 h-14 text-base border-0 bg-muted/50 focus-visible:ring-0 focus-visible:bg-muted"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-36">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-12 h-14 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:bg-muted"
              />
            </div>
            <div className="relative flex-1 md:w-32">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-12 h-14 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:bg-muted"
              />
            </div>
          </div>
          <Button size="lg" className="h-14 px-8 text-base" onClick={handleSearch}>
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 w-full max-w-2xl">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      <Button onClick={handleSearch}>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
};
