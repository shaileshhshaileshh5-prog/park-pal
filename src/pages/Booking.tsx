import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { mockParkingSpaces } from '@/lib/mockData';
import { MapPin, Star, Clock, Shield, User, Phone, MessageCircle, CreditCard, ArrowLeft, Check, Calendar } from 'lucide-react';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });

  const space = mockParkingSpaces.find(s => s.id === id);

  if (!space) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Parking Space Not Found</h1>
          <Button onClick={() => navigate('/search')}>Back to Search</Button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!bookingData.startTime || !bookingData.endTime) return 0;
    const start = parseInt(bookingData.startTime.split(':')[0]);
    const end = parseInt(bookingData.endTime.split(':')[0]);
    const hours = Math.max(0, end - start);
    return hours * space.price;
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book');
      navigate('/auth');
      return;
    }
    if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      toast.error('Please fill in all booking details');
      return;
    }
    setStep('payment');
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('confirmation');
    toast.success('Booking confirmed!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => step === 'details' ? navigate('/search') : setStep('details')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {step === 'details' ? 'Back to Search' : 'Back to Details'}
        </Button>

        {step === 'confirmation' ? (
          <Card className="max-w-lg mx-auto animate-fade-in">
            <CardContent className="py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your parking spot has been reserved. Check your email for details.
              </p>
              <div className="bg-muted rounded-lg p-4 text-left mb-6">
                <p className="font-semibold">{space.title}</p>
                <p className="text-sm text-muted-foreground">{space.address}</p>
                <Separator className="my-3" />
                <div className="flex justify-between text-sm">
                  <span>Date:</span>
                  <span className="font-medium">{bookingData.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time:</span>
                  <span className="font-medium">{bookingData.startTime} - {bookingData.endTime}</span>
                </div>
                <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t">
                  <span>Total Paid:</span>
                  <span className="text-success">${calculateTotal()}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => navigate('/dashboard')}>
                  View Bookings
                </Button>
                <Button className="flex-1" onClick={() => navigate('/search')}>
                  Find More Parking
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Space Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img src={space.image} alt={space.title} className="h-full w-full object-cover" />
              </div>
              
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-2xl font-bold">{space.title}</h1>
                  <div className="flex items-center gap-1 text-warning shrink-0">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="font-medium">{space.rating}</span>
                    <span className="text-sm text-muted-foreground">({space.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{space.address}, {space.city}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <Clock className="h-4 w-4" />
                  <span>Available {space.availableFrom} - {space.availableTo}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {space.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      <Shield className="h-3 w-3 mr-1" />
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Host Info */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{space.ownerName}</p>
                          <p className="text-sm text-muted-foreground">Space Owner</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>${space.price}/hour</span>
                    <Badge className="bg-success">Available</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {step === 'details' ? (
                    <>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="date"
                            type="date"
                            className="pl-10"
                            value={bookingData.date}
                            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={bookingData.startTime}
                            onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endTime">End Time</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={bookingData.endTime}
                            onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                          />
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${calculateTotal()}</span>
                      </div>
                      <Button className="w-full" size="lg" onClick={handleProceedToPayment}>
                        Continue to Payment
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="bg-muted rounded-lg p-4 text-sm">
                        <div className="flex justify-between mb-2">
                          <span>{bookingData.date}</span>
                          <span>{bookingData.startTime} - {bookingData.endTime}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${calculateTotal()}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Payment Method</Label>
                        <div className="border rounded-lg p-4 flex items-center gap-3 bg-muted/50">
                          <CreditCard className="h-5 w-5" />
                          <span className="text-sm">Credit/Debit Card</span>
                          <Badge variant="secondary" className="ml-auto">Demo</Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                        <div className="grid grid-cols-2 gap-3">
                          <Input placeholder="MM/YY" />
                          <Input placeholder="CVC" />
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleConfirmPayment}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : `Pay $${calculateTotal()}`}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        This is a demo payment. No real charges will be made.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
