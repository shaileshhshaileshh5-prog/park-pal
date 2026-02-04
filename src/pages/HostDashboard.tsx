import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockParkingSpaces, mockBookings, ParkingSpace } from '@/lib/mockData';
import { DollarSign, Car, Calendar, TrendingUp, Plus, Edit, Trash2, Eye, MapPin, Clock, Star } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'spaces' | 'bookings' | 'earnings'>('overview');
  const [spaces, setSpaces] = useState<ParkingSpace[]>(
    mockParkingSpaces.filter(s => s.ownerId === 'host1')
  );

  const hostBookings = mockBookings.filter(b =>
    spaces.some(s => s.id === b.spaceId)
  );

  const totalEarnings = hostBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const handleDeleteSpace = (spaceId: string) => {
    setSpaces(spaces.filter(s => s.id !== spaceId));
  };

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Host Dashboard</h1>
            <p className="text-muted-foreground">Manage your parking spaces and track earnings.</p>
          </div>
          {user?.isApproved === false && (
            <Badge variant="secondary" className="text-sm py-2 px-4">
              ⏳ Pending Approval
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button onClick={() => navigate('/host/add-space')}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Space
          </Button>
          <Button variant="outline" onClick={() => setActiveTab('bookings')}>
            <Calendar className="h-4 w-4 mr-2" />
            View Bookings
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Earnings"
            value={`$${totalEarnings}`}
            subtitle="All time"
            icon={DollarSign}
            variant="success"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Spaces"
            value={spaces.filter(s => s.available).length}
            subtitle={`of ${spaces.length} total`}
            icon={Car}
            variant="primary"
          />
          <StatCard
            title="Total Bookings"
            value={hostBookings.length}
            subtitle="All time"
            icon={Calendar}
          />
          <StatCard
            title="Avg Rating"
            value="4.6"
            subtitle="From 215 reviews"
            icon={TrendingUp}
            variant="warning"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          {(['overview', 'spaces', 'bookings', 'earnings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors relative whitespace-nowrap ${
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
            {/* Pending Bookings */}
            {hostBookings.filter(b => b.status === 'pending').length > 0 && (
              <Card className="mb-8 border-warning/20 bg-warning/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-warning" />
                    Pending Bookings ({hostBookings.filter(b => b.status === 'pending').length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hostBookings.filter(b => b.status === 'pending').map((booking) => (
                    <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-card rounded-lg">
                      <div>
                        <p className="font-semibold">{booking.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.spaceName} • {booking.date} • {booking.startTime}-{booking.endTime}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Decline</Button>
                        <Button size="sm" className="bg-success hover:bg-success/90">Accept</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* My Spaces */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">My Parking Spaces</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('spaces')}>
                  Manage All
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.slice(0, 3).map((space) => (
                  <Card key={space.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img src={space.image} alt={space.title} className="h-full w-full object-cover" />
                      <Badge className={`absolute top-2 right-2 ${space.available ? 'bg-success' : 'bg-muted'}`}>
                        {space.available ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{space.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{space.address}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">${space.price}/hr</span>
                        <div className="flex items-center gap-1 text-warning">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm">{space.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'spaces' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Parking Spaces</h2>
              <Button onClick={() => navigate('/host/add-space')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Space
              </Button>
            </div>
            {spaces.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No parking spaces yet</p>
                  <Button onClick={() => navigate('/host/add-space')}>Add Your First Space</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {spaces.map((space) => (
                  <Card key={space.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <img
                          src={space.image}
                          alt={space.title}
                          className="w-full md:w-40 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{space.title}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {space.address}, {space.city}
                              </p>
                            </div>
                            <Badge className={space.available ? 'bg-success' : ''}>
                              {space.available ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm mb-3">
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              ${space.price}/hr
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {space.availableFrom} - {space.availableTo}
                            </span>
                            <span className="flex items-center gap-1 text-warning">
                              <Star className="h-4 w-4 fill-current" />
                              {space.rating} ({space.reviews})
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Parking Space?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove "{space.title}" from your listings.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteSpace(space.id)}
                                    className="bg-destructive text-destructive-foreground"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Booking Requests</h2>
            {hostBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No bookings yet</p>
                </CardContent>
              </Card>
            ) : (
              hostBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{booking.userName}</p>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{booking.spaceName}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{booking.date}</span>
                          <span>{booking.startTime} - {booking.endTime}</span>
                          <span className="font-medium text-foreground">${booking.totalAmount}</span>
                        </div>
                      </div>
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Decline</Button>
                          <Button size="sm" className="bg-success hover:bg-success/90">Accept</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">This Month</p>
                  <p className="text-3xl font-bold text-success">${totalEarnings}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">Pending Payout</p>
                  <p className="text-3xl font-bold">$100</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                  <p className="text-3xl font-bold">${totalEarnings + 280}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hostBookings.filter(b => b.status === 'completed').map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium">{booking.userName}</p>
                        <p className="text-sm text-muted-foreground">{booking.spaceName} • {booking.date}</p>
                      </div>
                      <span className="font-semibold text-success">+${booking.totalAmount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
