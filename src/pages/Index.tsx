import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/parking/SearchBar';
import { ParkingCard } from '@/components/parking/ParkingCard';
import { mockParkingSpaces, mallParkingPrices } from '@/lib/mockData';
import { MapPin, Shield, Clock, DollarSign, Users, Building, Car, ArrowRight, Check } from 'lucide-react';

const Index = () => {
  const featuredSpaces = mockParkingSpaces.filter(s => s.available).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Affordable
              <span className="text-primary"> Parking</span> Near You
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
              Connect with local space owners and save up to 70% compared to commercial parking lots.
              Book in seconds, park with confidence.
            </p>
          </div>
          <SearchBar variant="hero" />
          
          {/* Price comparison */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-sm">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Average nearby: <strong className="text-success">$4/hr</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">vs Mall parking: $12-18/hr</span>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">How ParkShare Works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Whether you're looking for parking or have a space to share, we make it simple.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Drivers */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <Car className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">For Drivers</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: MapPin, title: 'Search', desc: 'Find parking spots near your destination' },
                  { icon: DollarSign, title: 'Compare', desc: 'See prices, reviews, and amenities' },
                  { icon: Clock, title: 'Book', desc: 'Reserve your spot in seconds' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start animate-slide-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <step.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6">
                <Link to="/search">Find Parking <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            {/* For Hosts */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <Building className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold">For Space Owners</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Building, title: 'List Your Space', desc: 'Add photos, set your price and availability' },
                  { icon: Users, title: 'Connect', desc: 'Receive booking requests from verified drivers' },
                  { icon: DollarSign, title: 'Earn', desc: 'Get paid for your unused parking space' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start animate-slide-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <step.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/host">List Your Space <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Parking Spots</h2>
              <p className="text-muted-foreground">Top-rated spaces available now</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/search">View All</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpaces.map((space) => (
              <ParkingCard key={space.id} space={space} />
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="py-20 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Save vs. Commercial Parking</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            See how much you can save by using ParkShare instead of traditional parking lots.
          </p>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4">
              {mallParkingPrices.map((mall, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{mall.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground line-through">${mall.price}/hr</span>
                        <div className="flex items-center gap-2 text-success">
                          <span className="font-bold">$3-5/hr</span>
                          <span className="text-xs bg-success/10 px-2 py-1 rounded-full">
                            Save {Math.round((1 - 4/mall.price) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Shield, title: 'Secure Payments', desc: 'All transactions are encrypted and protected' },
              { icon: Users, title: 'Verified Users', desc: 'All hosts and drivers are verified' },
              { icon: Clock, title: '24/7 Support', desc: 'Help available whenever you need it' },
            ].map((item, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Start?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of drivers and hosts already using ParkShare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/search">Find Parking</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/auth?mode=register&role=host">Become a Host</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Car className="h-4 w-4 text-primary-foreground" />
              </div>
              ParkShare
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ParkShare. Smart Parking Slot Sharing Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
