
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';

const PropertyList = ({ 
  properties, 
  favorites, 
  toggleFavorite, 
  handleContact, 
  showFilters, 
  setShowFilters, 
  selectedLocation, 
  handleResetFilters,
  isHomePage = false 
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800">
              {isHomePage ? "Featured Properties" : "Available Properties"}
            </h2>
            {!isHomePage && (
              <p className="text-gray-600 mt-2">
                {properties.length} properties found
                {selectedLocation !== 'All Locations' && ` in ${selectedLocation}`}
              </p>
            )}
             {isHomePage && (
              <p className="text-gray-600 mt-2">
                A glimpse of what Homygo offers. Click search to see more!
              </p>
            )}
          </motion.div>

          {!isHomePage && (
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="filter-button border-primary text-primary hover:bg-primary/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          )}
        </div>

        <AnimatePresence>
          {properties.length > 0 ? (
            <motion.div
              className={`grid grid-cols-1 ${isHomePage ? "md:grid-cols-2 lg:grid-cols-3" : "gap-y-8"} gap-8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {properties.map((property, index) => (
                 <div key={property.id} className={isHomePage ? "" : "w-full md:w-3/4 lg:w-2/3 mx-auto"}>
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
              {!isHomePage && (
                <Button
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                >
                  Reset Filters
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PropertyList;
