
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Bed, Bath, Square, Heart, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PropertyCard = ({ property, isFavorite, toggleFavorite, handleContact, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="property-card glass-effect rounded-xl overflow-hidden shadow-lg border border-gray-200 flex flex-col h-full"
    >
      {property.featured && (
        <div className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 text-xs font-semibold absolute top-0 left-0 m-2 rounded-full z-10">
          Featured
        </div>
      )}

      <div className="relative">
        <img 
          className="w-full h-56 object-cover"
          alt={`${property.title} - ${property.type} in ${property.location}`}
         src="https://images.unsplash.com/photo-1585541649862-a3a4632fb1c6" />
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white transition-colors shadow-md"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-500 hover:text-red-400'}`}
          />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight">
            {property.title}
          </h3>
          <div className="flex items-center text-accent ml-2 flex-shrink-0">
            <Star className="w-4 h-4 fill-current mr-1" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span>{property.location}</span>
        </div>

        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed flex-grow">
          {property.description}
        </p>

        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-4 border-t border-b border-gray-200 py-3">
          <div className="flex items-center">
            <Bed className="w-3.5 h-3.5 mr-1.5 text-primary" />
            {property.bedrooms} Beds
          </div>
          <div className="flex items-center">
            <Bath className="w-3.5 h-3.5 mr-1.5 text-primary" />
            {property.bathrooms} Baths
          </div>
          <div className="flex items-center">
            <Square className="w-3.5 h-3.5 mr-1.5 text-primary" />
            {property.area} m²
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold text-primary">
              ₱{property.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">/month</span>
          </div>
        </div>


        <div className="flex space-x-2 mt-auto">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
            onClick={() => handleContact(property.contact, 'phone')}
          >
            <Phone className="w-3.5 h-3.5 mr-1.5" />
            Call
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
            onClick={() => handleContact(property.email, 'email')}
          >
            <Mail className="w-3.5 h-3.5 mr-1.5" />
            Email
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
