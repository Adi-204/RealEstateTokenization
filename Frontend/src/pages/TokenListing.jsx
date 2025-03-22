import React from 'react';
import { motion } from 'framer-motion';
import { Building2, DollarSign, Users, Clock } from 'lucide-react';

const TokenListing = () => {
  const properties = [
    {
      id: 1,
      name: "Luxury Apartment Complex",
      location: "Downtown Manhattan",
      price: "2,500,000",
      tokens: "1,000,000",
      tokenPrice: "2.50",
      occupancy: "95%",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      name: "Commercial Office Space",
      location: "Silicon Valley",
      price: "5,000,000",
      tokens: "2,000,000",
      tokenPrice: "2.50",
      occupancy: "88%",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
  ];

  return (
    <div className="pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Available Properties</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our selection of tokenized properties. Each property has been carefully
            vetted and verified for secure, transparent investment opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm"
            >
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {property.occupancy} Occupied
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{property.name}</h3>
                <p className="text-gray-400 mb-4">{property.location}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">Property Value</p>
                    <p className="text-xl font-semibold">${property.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Token Price</p>
                    <p className="text-xl font-semibold">${property.tokenPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Tokens</p>
                    <p className="text-xl font-semibold">{property.tokens}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Available Tokens</p>
                    <p className="text-xl font-semibold text-green-500">
                      {Math.floor(property.tokens * 0.3).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    Buy Tokens
                  </button>
                  <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TokenListing;