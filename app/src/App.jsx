import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ListingsPage from '@/pages/ListingsPage';
import SearchAnimationOverlay from '@/components/SearchAnimationOverlay';
import { BARANGAYS, SAMPLE_PROPERTIES } from '@/data/constants';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [budgetRange, setBudgetRange] = useState([0, 50000]);
  const [filteredProperties, setFilteredProperties] = useState(SAMPLE_PROPERTIES);
  const [favorites, setFavorites] = useState([]);
  const [isAnimatingSearch, setIsAnimatingSearch] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedFavorites = localStorage.getItem('homygo-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('homygo-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const filterProps = () => {
      const filtered = SAMPLE_PROPERTIES.filter(property => {
        const locationMatch = selectedLocation === 'All Locations' || property.location === selectedLocation;
        const budgetMatch = property.price >= budgetRange[0] && property.price <= budgetRange[1];
        return locationMatch && budgetMatch;
      });
      setFilteredProperties(filtered);
    };
    filterProps();
  }, [selectedLocation, budgetRange]);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      
      toast({
        title: newFavorites.includes(propertyId) ? "Added to favorites!" : "Removed from favorites",
        description: "Your wishlist has been updated.",
        variant: newFavorites.includes(propertyId) ? "default" : "destructive",
      });
      return newFavorites;
    });
  };

  const handleContact = (contact, type) => {
    toast({
      title: "🚧 Contact feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: `Would connect to ${type}: ${contact}`,
    });
  };

  const handleSearch = () => {
    setIsAnimatingSearch(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimatingSearch(false); 
    
    setTimeout(() => {
      toast({ 
        title: "Liftoff! 🚀", 
        description: (
          <div className="flex items-center space-x-3">
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/c4f7568c-f729-41c6-87f2-ac8c22ef8c3a/45032f660b5b2544dcc261cec6ee709a.png" 
              alt="Searching mascot" 
              className="w-12 h-12 rounded-md object-contain"
            />
            <span>{`Zooming to your properties!`}</span>
          </div>
        ),
        duration: 3000, 
      });
      navigate('/listings', { state: { properties: filteredProperties, location: selectedLocation, budget: budgetRange } });
    }, 300); 
  };
  

  const handleResetFilters = () => {
    setSelectedLocation('All Locations');
    setBudgetRange([0, 50000]);
    toast({ title: "Filters Reset!", description: "Showing all properties." });
    if (location.pathname === '/listings') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <AnimatePresence>
        {isAnimatingSearch && <SearchAnimationOverlay onComplete={handleAnimationEnd} />}
      </AnimatePresence>
      <Toaster />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                budgetRange={budgetRange}
                setBudgetRange={setBudgetRange}
                handleSearch={handleSearch}
                barangays={BARANGAYS}
                properties={filteredProperties.slice(0,6)} 
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleContact={handleContact}
                handleResetFilters={handleResetFilters}
              />
            } 
          />
          <Route 
            path="/listings" 
            element={
              <ListingsPage 
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleContact={handleContact}
                handleResetFiltersGlobal={handleResetFilters}
                setSelectedLocationGlobal={setSelectedLocation}
                setBudgetRangeGlobal={setBudgetRange}
                barangays={BARANGAYS}
              />
            } 
          />
        </Routes>
      </main>
      <Footer setSelectedLocation={(loc) => {
        setSelectedLocation(loc);
        navigate('/');
      }}/>
    </div>
  );
}

export default App;
