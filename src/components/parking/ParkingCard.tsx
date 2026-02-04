import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ParkingSpace } from '@/lib/mockData';
import { MapPin, Star, Clock, Shield, Zap, Car } from 'lucide-react';

interface ParkingCardProps {
  space: ParkingSpace;
  showBookButton?: boolean;
}

export const ParkingCard = ({ space, showBookButton = true }: ParkingCardProps) => {
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('security') || feature.toLowerCase().includes('secure')) return Shield;
    if (feature.toLowerCase().includes('ev') || feature.toLowerCase().includes('charging')) return Zap;
    if (feature.toLowerCase().includes('covered')) return Car;
    return null;
  };

  return (
    <Card className="group overflow-hidden border-border hover:shadow-card-hover transition-all duration-300 animate-fade-in">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={space.image}
          alt={space.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {space.available ? (
            <Badge className="bg-success text-success-foreground">Available</Badge>
          ) : (
            <Badge variant="secondary">Unavailable</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-card/90 backdrop-blur-sm">
            {space.distance}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{space.title}</h3>
          <div className="flex items-center gap-1 text-warning shrink-0">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{space.rating}</span>
            <span className="text-xs text-muted-foreground">({space.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm line-clamp-1">{space.address}, {space.city}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Clock className="h-4 w-4" />
          <span>{space.availableFrom} - {space.availableTo}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {space.features.slice(0, 3).map((feature) => {
            const Icon = getFeatureIcon(feature);
            return (
              <Badge key={feature} variant="secondary" className="text-xs font-normal">
                {Icon && <Icon className="h-3 w-3 mr-1" />}
                {feature}
              </Badge>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-primary">${space.price}</span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
          {showBookButton && space.available && (
            <Button asChild>
              <Link to={`/booking/${space.id}`}>Book Now</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
