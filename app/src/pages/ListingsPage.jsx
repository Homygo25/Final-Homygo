
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, MapPin, DollarSign, ChevronDown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import { toast } from '@/components/ui/use-toast';
import { SAMPLE_PROPERTIES } from '@/data/constants';


const ListingsPage = ({ favorites, toggleFavorite, handleContact, handleResetFiltersGlobal, barangays, setSelectedLocationGlobal, setBudgetRangeGlobal }) => {
  const locationHook = useLocation();
  const navigate = useNavigate();
  
  const initialProperties = locationHook.state?.properties || SAMPLE_PROPERTIES;
  const initialLocation = locationHook.state?.location || 'All Locations';
  const initialBudget = locationHook.state?.budget || [0, 50000];

  const [properties, setProperties] = useState(initialProperties);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [budgetRange, setBudgetRange] = useState(initialBudget);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filtered = SAMPLE_PROPERTIES.filter(property => {
      const locationMatch = selectedLocation === 'All Locations' || property.location === selectedLocation;
      const budgetMatch = property.price >= budgetRange[0] && property.price <= budgetRange[1];
      return locationMatch && budgetMatch;
    });
    setProperties(filtered);
    setSelectedLocationGlobal(selectedLocation);
    setBudgetRangeGlobal(budgetRange);
  }, [selectedLocation, budgetRange, setSelectedLocationGlobal, setBudgetRangeGlobal]);


  const handleApplyFilters = () => {
    setShowFilters(false);
    toast({
      title: "Filters Applied!",
      description: `Showing ${properties.length} properties.`,
    });
  };
  
  const handleResetLocalFilters = () => {
    setSelectedLocation('All Locations');
    setBudgetRange([0, 50000]);
    handleResetFiltersGlobal(); 
    toast({ title: "Filters Reset!", description: "Showing all properties." });
  };


  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 text-primary border-primary hover:bg-primary/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Property Listings</h1>
            <p className="text-gray-600 mt-2">
              {properties.length} properties found
              {selectedLocation !== 'All Locations' && ` in ${selectedLocation}`}
            </p>
          </motion.div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="filter-button border-primary text-primary hover:bg-primary/10 mt-4 md:mt-0"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 p-6 glass-effect rounded-lg shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </label>
                  <div className="relative">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                    >
                      {barangays.map(barangay => (
                        <option key={barangay} value={barangay}>{barangay}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Min Budget
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={budgetRange[0]}
                    onChange={(e) => setBudgetRange([parseInt(e.target.value) || 0, budgetRange[1]])}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="₱0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Max Budget
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={budgetRange[1]}
                    onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value) || 50000])}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="₱50,000"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleResetLocalFilters}>Reset</Button>
                <Button onClick={handleApplyFilters} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Apply Filters</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {properties.length > 0 ? (
            <motion.div
              className="space-y-8" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {properties.map((property, index) => (
                <div key={property.id} className="w-full md:w-3/4 lg:w-2/3 mx-auto">
                    <PropertyCard
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    toggleFavorite={toggleFavorite}
                    handleContact={handleContact}
                    index={index}
                    />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or budget range.
              </p>
              <Button
                onClick={handleResetLocalFilters}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ListingsPage;
