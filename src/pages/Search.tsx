import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/parking/SearchBar';
import { ParkingCard } from '@/components/parking/ParkingCard';
import { MapView } from '@/components/parking/MapView';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { mockParkingSpaces, ParkingSpace } from '@/lib/mockData';
import { List, Map, SlidersHorizontal, X } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<ParkingSpace | null>(null);
  
  // Filters
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [sortBy, setSortBy] = useState('distance');
  const [availability, setAvailability] = useState('all');

  const filteredSpaces = useMemo(() => {
    let spaces = [...mockParkingSpaces];
    
    // Price filter
    spaces = spaces.filter(s => s.price >= priceRange[0] && s.price <= priceRange[1]);
    
    // Availability filter
    if (availability === 'available') {
      spaces = spaces.filter(s => s.available);
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        spaces.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        spaces.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        spaces.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order (simulated distance)
        break;
    }
    
    return spaces;
  }, [priceRange, sortBy, availability]);

  const location = searchParams.get('location') || 'Current Location';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Search Header */}
      <div className="bg-card border-b border-border py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Parking near {location}</h1>
              <p className="text-sm text-muted-foreground">
                {filteredSpaces.length} spots available
              </p>
            </div>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-card border-b border-border py-3">
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'map' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('map')}
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-card border-b border-border py-4 animate-fade-in">
          <div className="container">
            <div className="flex flex-wrap gap-6 items-end">
              <div className="space-y-2 min-w-[200px]">
                <label className="text-sm font-medium">Price Range: ${priceRange[0]} - ${priceRange[1]}/hr</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Availability</label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Spots</SelectItem>
                    <SelectItem value="available">Available Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPriceRange([0, 20]);
                  setAvailability('all');
                  setSortBy('distance');
                }}
              >
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 container py-6">
        {viewMode === 'list' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map((space) => (
              <ParkingCard key={space.id} space={space} />
            ))}
            {filteredSpaces.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No parking spots match your filters.</p>
                <Button variant="link" onClick={() => {
                  setPriceRange([0, 20]);
                  setAvailability('all');
                }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
            <div className="h-full rounded-lg overflow-hidden">
              <MapView
                spaces={filteredSpaces}
                selectedSpaceId={selectedSpace?.id}
                onMarkerClick={setSelectedSpace}
              />
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
              {selectedSpace ? (
                <>
                  <div className="flex items-center justify-between">
                    <Badge>Selected</Badge>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSpace(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <ParkingCard space={selectedSpace} />
                </>
              ) : (
                filteredSpaces.map((space) => (
                  <div
                    key={space.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedSpace(space)}
                  >
                    <ParkingCard space={space} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
