import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      scale: 1.05,
      filter: 'blur(4px)',
    }),
    center: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 1, ease: [0.4, 0, 0.2, 1] },
        filter: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
      transition: {
        opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 1, ease: [0.4, 0, 0.2, 1] },
        filter: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
      }
    },
  };

  const swipeConfidenceThreshold = 5000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  const nextImage = () => paginate(1);
  const previousImage = () => paginate(-1);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl group">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-white/10">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <AnimatePresence 
        initial={false} 
        custom={direction} 
        mode="crossfade"
      >
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 1, ease: [0.4, 0, 0.2, 1] },
            filter: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
          }}
          className="absolute w-full h-full"
        >
          <div className="relative w-full h-full">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover transform transition-all duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Update gradient overlay for smoother transition */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-700" />

            {/* Content with smoother transitions */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2
              }}
              className="absolute bottom-0 left-0 right-0 p-6 text-white"
            >
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-2 text-white transition-all duration-700">
                  {images[currentIndex].title}
                </h3>
                <p className="text-lg text-white/90 mb-3 transition-all duration-700">
                  {images[currentIndex].description}
                </p>
                
                {/* Tags with smoother transitions */}
                <div className="flex flex-wrap gap-2">
                  {images[currentIndex].tags?.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + index * 0.1,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="px-2 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm transition-all duration-700"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="transform -translate-x-2 group-hover:translate-x-0 transition-transform bg-black/20 hover:bg-black/40 backdrop-blur-sm p-2 rounded-full"
          onClick={previousImage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="transform translate-x-2 group-hover:translate-x-0 transition-transform bg-black/20 hover:bg-black/40 backdrop-blur-sm p-2 rounded-full"
          onClick={nextImage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 flex-wrap justify-center max-w-[80%]">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-4 bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel; 