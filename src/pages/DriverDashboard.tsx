import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { ParkingCard } from '@/components/parking/ParkingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockParkingSpaces, mockBookings } from '@/lib/mockData';
import { Car, Calendar, CreditCard, Clock, Search, MessageCircle, MapPin } from 'lucide-react';

const DriverDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'favorites'>('overview');

  const userBookings = mockBookings.filter(b => b.userId === 'driver1');
  const recentSpaces = mockParkingSpaces.filter(s => s.available).slice(0, 3);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Driver'}!</h1>
          <p className="text-muted-foreground">Find parking, manage bookings, and save money.</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button onClick={() => navigate('/search')}>
            <Search className="h-4 w-4 mr-2" />
            Find Parking
          </Button>
          <Button variant="outline" onClick={() => setActiveTab('bookings')}>
            <Calendar className="h-4 w-4 mr-2" />
            My Bookings
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Bookings"
            value={userBookings.length}
            subtitle="All time"
            icon={Calendar}
            variant="primary"
          />
          <StatCard
            title="Total Spent"
            value={`$${userBookings.reduce((sum, b) => sum + b.totalAmount, 0)}`}
            subtitle="All time"
            icon={CreditCard}
          />
          <StatCard
            title="Active Bookings"
            value={userBookings.filter(b => b.status === 'confirmed').length}
            subtitle="Upcoming"
            icon={Clock}
            variant="success"
          />
          <StatCard
            title="Money Saved"
            value="$180"
            subtitle="vs. commercial parking"
            icon={Car}
            trend={{ value: 23, isPositive: true }}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {(['overview', 'bookings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors relative ${
                activeTab === tab
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Upcoming Booking */}
            {userBookings.filter(b => b.status === 'confirmed').length > 0 && (
              <Card className="mb-8 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Upcoming Booking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userBookings.filter(b => b.status === 'confirmed').slice(0, 1).map((booking) => (
                    <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-lg">{booking.spaceName}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Host
                        </Button>
                        <Button size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recommended Spots */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recommended for You</h2>
                <Button variant="ghost" onClick={() => navigate('/search')}>
                  View All
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentSpaces.map((space) => (
                  <ParkingCard key={space.id} space={space} />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {userBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No bookings yet</p>
                  <Button onClick={() => navigate('/search')}>Find Parking</Button>
                </CardContent>
              </Card>
            ) : (
              userBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold">{booking.spaceName}</p>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.startTime} - {booking.endTime}
                          </span>
                          <span className="font-medium text-foreground">
                            ${booking.totalAmount}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === 'confirmed' && (
                          <>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                            <Button size="sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              Directions
                            </Button>
                          </>
                        )}
                        {booking.status === 'completed' && (
                          <Button variant="outline" size="sm">Book Again</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
