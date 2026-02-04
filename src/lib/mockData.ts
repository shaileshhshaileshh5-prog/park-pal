export interface ParkingSpace {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  distance: string;
  available: boolean;
  image: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  features: string[];
  coordinates: { lat: number; lng: number };
  availableFrom: string;
  availableTo: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'driver' | 'host' | 'admin';
  phone: string;
  avatar: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  spaceId: string;
  userId: string;
  userName: string;
  spaceName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export const mockParkingSpaces: ParkingSpace[] = [
  {
    id: '1',
    title: 'Covered Garage Spot',
    address: '123 Main Street',
    city: 'Downtown',
    price: 5,
    rating: 4.8,
    reviews: 124,
    distance: '0.3 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&h=300&fit=crop',
    ownerId: 'host1',
    ownerName: 'John Smith',
    ownerPhone: '+1 234-567-8900',
    features: ['Covered', 'Security Camera', '24/7 Access'],
    coordinates: { lat: 40.7128, lng: -74.006 },
    availableFrom: '06:00',
    availableTo: '22:00',
  },
  {
    id: '2',
    title: 'Private Driveway',
    address: '456 Oak Avenue',
    city: 'Midtown',
    price: 3,
    rating: 4.5,
    reviews: 89,
    distance: '0.5 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400&h=300&fit=crop',
    ownerId: 'host2',
    ownerName: 'Sarah Johnson',
    ownerPhone: '+1 234-567-8901',
    features: ['Private', 'Easy Access'],
    coordinates: { lat: 40.7589, lng: -73.9851 },
    availableFrom: '08:00',
    availableTo: '20:00',
  },
  {
    id: '3',
    title: 'Underground Parking',
    address: '789 Park Lane',
    city: 'Business District',
    price: 8,
    rating: 4.9,
    reviews: 256,
    distance: '0.8 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=300&fit=crop',
    ownerId: 'host3',
    ownerName: 'Mike Chen',
    ownerPhone: '+1 234-567-8902',
    features: ['Underground', 'Security', 'EV Charging', 'Covered'],
    coordinates: { lat: 40.7484, lng: -73.9857 },
    availableFrom: '00:00',
    availableTo: '23:59',
  },
  {
    id: '4',
    title: 'Residential Street Spot',
    address: '321 Elm Street',
    city: 'Suburbs',
    price: 2,
    rating: 4.2,
    reviews: 45,
    distance: '1.2 km',
    available: false,
    image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=400&h=300&fit=crop',
    ownerId: 'host1',
    ownerName: 'John Smith',
    ownerPhone: '+1 234-567-8900',
    features: ['Residential', 'Quiet Area'],
    coordinates: { lat: 40.7282, lng: -73.7949 },
    availableFrom: '09:00',
    availableTo: '18:00',
  },
  {
    id: '5',
    title: 'Secure Lot Space',
    address: '555 Security Blvd',
    city: 'Financial District',
    price: 10,
    rating: 4.7,
    reviews: 178,
    distance: '0.4 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?w=400&h=300&fit=crop',
    ownerId: 'host4',
    ownerName: 'Emily Davis',
    ownerPhone: '+1 234-567-8903',
    features: ['Gated', 'Security Guard', 'CCTV', '24/7 Access'],
    coordinates: { lat: 40.7069, lng: -74.0089 },
    availableFrom: '00:00',
    availableTo: '23:59',
  },
  {
    id: '6',
    title: 'Apartment Complex Spot',
    address: '888 Sunset Drive',
    city: 'West End',
    price: 4,
    rating: 4.4,
    reviews: 67,
    distance: '1.5 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    ownerId: 'host5',
    ownerName: 'David Wilson',
    ownerPhone: '+1 234-567-8904',
    features: ['Covered', 'Secure Building'],
    coordinates: { lat: 40.7614, lng: -73.9776 },
    availableFrom: '07:00',
    availableTo: '21:00',
  },
];

export const mockUsers: User[] = [
  {
    id: 'driver1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'driver',
    phone: '+1 555-123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isApproved: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'host1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'host',
    phone: '+1 234-567-8900',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    isApproved: true,
    createdAt: '2024-01-10',
  },
  {
    id: 'host2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'host',
    phone: '+1 234-567-8901',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isApproved: true,
    createdAt: '2024-01-12',
  },
  {
    id: 'host3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'host',
    phone: '+1 234-567-8902',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    isApproved: false,
    createdAt: '2024-02-01',
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@parkshare.com',
    role: 'admin',
    phone: '+1 555-000-0000',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    isApproved: true,
    createdAt: '2024-01-01',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    spaceId: '1',
    userId: 'driver1',
    userName: 'Alex Thompson',
    spaceName: 'Covered Garage Spot',
    date: '2024-02-10',
    startTime: '09:00',
    endTime: '17:00',
    totalAmount: 40,
    status: 'completed',
    createdAt: '2024-02-08',
  },
  {
    id: 'b2',
    spaceId: '3',
    userId: 'driver1',
    userName: 'Alex Thompson',
    spaceName: 'Underground Parking',
    date: '2024-02-15',
    startTime: '10:00',
    endTime: '14:00',
    totalAmount: 32,
    status: 'confirmed',
    createdAt: '2024-02-12',
  },
  {
    id: 'b3',
    spaceId: '5',
    userId: 'driver1',
    userName: 'Alex Thompson',
    spaceName: 'Secure Lot Space',
    date: '2024-02-20',
    startTime: '08:00',
    endTime: '18:00',
    totalAmount: 100,
    status: 'pending',
    createdAt: '2024-02-18',
  },
];

export const mallParkingPrices = [
  { name: 'City Mall Parking', price: 15 },
  { name: 'Metro Center Garage', price: 12 },
  { name: 'Downtown Plaza', price: 18 },
];
