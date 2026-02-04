import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers, mockParkingSpaces, mockBookings, User, ParkingSpace } from '@/lib/mockData';
import { Users, Car, Calendar, DollarSign, Search, Check, X, Eye, Shield, MapPin, Star } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [spaces] = useState<ParkingSpace[]>(mockParkingSpaces);
  const [searchTerm, setSearchTerm] = useState('');

  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const pendingHosts = users.filter(u => u.role === 'host' && !u.isApproved).length;

  const handleApproveHost = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isApproved: true } : u
    ));
  };

  const handleBlockUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isApproved: false } : u
    ));
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSpaces = spaces.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage users, spaces, and platform operations.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Users"
            value={users.length}
            subtitle={`${users.filter(u => u.role === 'driver').length} drivers, ${users.filter(u => u.role === 'host').length} hosts`}
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Parking Spaces"
            value={spaces.length}
            subtitle={`${spaces.filter(s => s.available).length} active`}
            icon={Car}
            variant="success"
          />
          <StatCard
            title="Total Bookings"
            value={mockBookings.length}
            subtitle="All time"
            icon={Calendar}
          />
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue}`}
            subtitle="Platform earnings"
            icon={DollarSign}
            variant="warning"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Pending Approvals Alert */}
        {pendingHosts > 0 && (
          <Card className="mb-8 border-warning/20 bg-warning/5">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-semibold">{pendingHosts} Host{pendingHosts > 1 ? 's' : ''} Pending Approval</p>
                    <p className="text-sm text-muted-foreground">Review and approve new hosts</p>
                  </div>
                </div>
                <Button variant="outline">Review Now</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users, spaces..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="spaces">Parking Spaces</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.isApproved ? (
                            <Badge className="bg-success">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {user.role === 'host' && !user.isApproved && (
                              <Button
                                size="sm"
                                className="bg-success hover:bg-success/90"
                                onClick={() => handleApproveHost(user.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            )}
                            {user.role !== 'admin' && user.isApproved && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="text-destructive">
                                    <X className="h-4 w-4 mr-1" />
                                    Block
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Block User?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will prevent {user.name} from accessing the platform.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleBlockUser(user.id)}
                                      className="bg-destructive"
                                    >
                                      Block
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spaces">
            <Card>
              <CardHeader>
                <CardTitle>Parking Spaces</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Space</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSpaces.map((space) => (
                      <TableRow key={space.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={space.image}
                              alt={space.title}
                              className="h-10 w-16 rounded object-cover"
                            />
                            <div>
                              <p className="font-medium">{space.title}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {space.city}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{space.ownerName}</TableCell>
                        <TableCell>${space.price}/hr</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-warning fill-current" />
                            <span>{space.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={space.available ? 'bg-success' : ''}>
                            {space.available ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Space</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono text-sm">#{booking.id}</TableCell>
                        <TableCell>{booking.userName}</TableCell>
                        <TableCell>{booking.spaceName}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>${booking.totalAmount}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              booking.status === 'completed'
                                ? 'bg-success'
                                : booking.status === 'confirmed'
                                ? 'bg-primary'
                                : ''
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Revenue</span>
                      <span className="text-2xl font-bold">${totalRevenue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Platform Fee (10%)</span>
                      <span className="font-medium">${(totalRevenue * 0.1).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Host Payouts</span>
                      <span className="font-medium">${(totalRevenue * 0.9).toFixed(0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg. Booking Value</span>
                      <span className="font-medium">${(totalRevenue / mockBookings.length).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium">
                        {((mockBookings.filter(b => b.status === 'completed').length / mockBookings.length) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg. Space Rating</span>
                      <span className="font-medium flex items-center gap-1">
                        <Star className="h-4 w-4 text-warning fill-current" />
                        {(spaces.reduce((sum, s) => sum + s.rating, 0) / spaces.length).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
