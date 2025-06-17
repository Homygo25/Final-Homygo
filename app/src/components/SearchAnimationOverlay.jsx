import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchAnimationOverlay = ({ onComplete }) => {
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageVisible(true);
    }, 300); 

    return () => clearTimeout(timer);
  }, []);

  const handleImageAnimationComplete = () => {
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-white z-[100] flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence>
        {imageVisible && (
          <motion.div
            initial={{ y: "30vh", x: "-50vw", opacity: 0, scale: 0.8, rotate: -25 }}
            animate={{
              y: "-70vh", 
              x: "70vw",
              opacity: [0, 1, 1, 0], 
              scale: 1.2,
              rotate: 25,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              opacity: { times: [0, 0.2, 0.8, 1], duration: 1.5 },
              rotate: { duration: 1.5, ease: "easeInOut" }
            }}
            onAnimationComplete={handleImageAnimationComplete}
            className="absolute"
          >
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/c4f7568c-f729-41c6-87f2-ac8c22ef8c3a/45032f660b5b2544dcc261cec6ee709a.png"
              alt="Homygo mascot flying"
              className="w-40 h-40 md:w-64 md:h-64 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchAnimationOverlay;
