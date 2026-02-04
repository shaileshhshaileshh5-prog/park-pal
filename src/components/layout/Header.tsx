import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Car, Menu, X, User, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/auth';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'host': return '/host';
      default: return '/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline">ParkShare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Find Parking
          </Link>
          <Link to="/host" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            List Your Space
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-primary capitalize">{user.role}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* Demo role switcher */}
                <div className="px-2 py-1.5">
                  <p className="text-xs text-muted-foreground mb-1">Demo: Switch Role</p>
                  <div className="flex gap-1">
                    {(['driver', 'host', 'admin'] as const).map(role => (
                      <Button
                        key={role}
                        variant={user.role === role ? 'default' : 'outline'}
                        size="sm"
                        className="text-xs h-6 px-2"
                        onClick={() => switchRole(role)}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Log In
              </Button>
              <Button onClick={() => navigate('/auth?mode=register')}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            <Link
              to="/search"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Parking
            </Link>
            <Link
              to="/host"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              List Your Space
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start text-destructive"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <div className="flex gap-2 px-4 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => navigate('/auth')}>
                  Log In
                </Button>
                <Button className="flex-1" onClick={() => navigate('/auth?mode=register')}>
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
