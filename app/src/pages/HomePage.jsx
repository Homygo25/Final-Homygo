
import React from 'react';
import HeroSection from '@/components/HeroSection';
import PropertyList from '@/components/PropertyList';

const HomePage = ({
  selectedLocation,
  setSelectedLocation,
  budgetRange,
  setBudgetRange,
  handleSearch,
  barangays,
  properties,
  favorites,
  toggleFavorite,
  handleContact,
  handleResetFilters
}) => {
  return (
    <>
      <HeroSection
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        budgetRange={budgetRange}
        setBudgetRange={setBudgetRange}
        handleSearch={handleSearch}
        barangays={barangays}
        filteredPropertiesCount={properties.length} 
      />
      <PropertyList
        properties={properties}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handleContact={handleContact}
        showFilters={false} 
        setShowFilters={() => {}} 
        selectedLocation={selectedLocation}
        handleResetFilters={handleResetFilters}
        isHomePage={true}
      />
    </>
  );
};

export default HomePage;
