
import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = ({ selectedLocation, setSelectedLocation, budgetRange, setBudgetRange, handleSearch, barangays, filteredPropertiesCount }) => {
  return (
    <section className="relative py-20 hero-pattern overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Rental Home
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing rental properties in Cagayan de Oro. From cozy studios to spacious family homes, find your ideal place to call home.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-effect rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label htmlFor="location-select" className="text-sm font-medium text-primary flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                <div className="relative">
                  <select
                    id="location-select"
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
                <label htmlFor="min-budget-input" className="text-sm font-medium text-primary flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Min Budget
                </label>
                <input
                  id="min-budget-input"
                  type="number"
                  step="1000"
                  value={budgetRange[0]}
                  onChange={(e) => setBudgetRange([parseInt(e.target.value) || 0, budgetRange[1]])}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="₱0"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="max-budget-input" className="text-sm font-medium text-primary flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Max Budget
                </label>
                <input
                  id="max-budget-input"
                  type="number"
                  step="1000"
                  value={budgetRange[1]}
                  onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value) || 50000])}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="₱50,000"
                />
              </div>
            </div>

            <Button
              className="w-full md:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold pulse-glow"
              onClick={handleSearch}
              aria-label="Search properties based on current filters"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-20 left-10 floating-animation">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full opacity-50"></div>
      </div>
      <div className="absolute bottom-20 right-10 floating-animation" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full opacity-50"></div>
      </div>
    </section>
  );
};

export default HeroSection;
