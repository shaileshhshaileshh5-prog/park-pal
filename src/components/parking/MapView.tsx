import { ParkingSpace } from '@/lib/mockData';
import { MapPin, Navigation } from 'lucide-react';

interface MapViewProps {
  spaces: ParkingSpace[];
  onMarkerClick?: (space: ParkingSpace) => void;
  selectedSpaceId?: string;
}

export const MapView = ({ spaces, onMarkerClick, selectedSpaceId }: MapViewProps) => {
  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden bg-muted">
      {/* Map placeholder - simulating Google Maps style */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted to-accent/5">
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-border"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Simulated roads */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted-foreground/10 transform -translate-y-1/2" />
        <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-muted-foreground/10 transform -translate-x-1/2" />
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-muted-foreground/5" />
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-muted-foreground/5" />
      </div>

      {/* User location indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse-soft" />
          <div className="relative z-10 h-6 w-6 bg-primary rounded-full border-2 border-primary-foreground shadow-lg flex items-center justify-center">
            <Navigation className="h-3 w-3 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Parking markers */}
      {spaces.map((space, index) => {
        const positions = [
          { top: '25%', left: '30%' },
          { top: '35%', left: '70%' },
          { top: '60%', left: '25%' },
          { top: '70%', left: '60%' },
          { top: '40%', left: '45%' },
          { top: '55%', left: '80%' },
        ];
        const pos = positions[index % positions.length];
        const isSelected = selectedSpaceId === space.id;

        return (
          <button
            key={space.id}
            className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 hover:scale-110 z-10 ${
              isSelected ? 'scale-125 z-20' : ''
            }`}
            style={{ top: pos.top, left: pos.left }}
            onClick={() => onMarkerClick?.(space)}
          >
            <div className={`relative ${isSelected ? 'animate-pulse-soft' : ''}`}>
              <div
                className={`flex flex-col items-center ${
                  space.available ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`px-2 py-1 rounded-md text-xs font-bold mb-1 shadow-md ${
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : space.available
                      ? 'bg-card text-foreground border border-border'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  ${space.price}/hr
                </div>
                <MapPin className={`h-8 w-8 ${isSelected ? 'fill-primary/30' : ''}`} />
              </div>
            </div>
          </button>
        );
      })}

      {/* Map controls placeholder */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="h-10 w-10 bg-card rounded-lg shadow-card flex items-center justify-center text-foreground hover:bg-muted transition-colors">
          +
        </button>
        <button className="h-10 w-10 bg-card rounded-lg shadow-card flex items-center justify-center text-foreground hover:bg-muted transition-colors">
          −
        </button>
      </div>

      {/* Map type indicator */}
      <div className="absolute bottom-4 left-4">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground shadow-card">
          Map View • {spaces.length} spots nearby
        </div>
      </div>
    </div>
  );
};
