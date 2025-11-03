"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // Carousel data
  const slides = [
    {
      id: 1,
      title: "ZPP CNC",
      subtitle: "Zero Point Prince",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-900/90 via-cyan-900/80 to-blue-800/90",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80",
      animationType: "fade",
    },

  ];

  // Three different animation variants
  const getAnimationVariants = (type: string) => {
    switch (type) {
      case "grid":
        // Style 1: Grid flip effect
        return {
          initial: {
            opacity: 0,
            scale: 0.95
          },
          animate: {
            opacity: 1,
            scale: 1
          },
          exit: {
            opacity: 0,
            scale: 1.05
          },
          transition: {
            duration: 0.8,
            ease: "easeInOut" as any
          }
        };
      case "fade":
        // Style 3: Scale fade in/out + Ken Burns
        return {
          initial: {
            scale: 1.2,
            opacity: 0
          },
          animate: {
            scale: 1,
            opacity: 1
          },
          exit: {
            scale: 0.9,
            opacity: 0
          },
          transition: {
            duration: 1,
            ease: "easeInOut" as any
          }
        };

      default:
        return {
          initial: {},
          animate: {},
          exit: {},
          transition: {}
        };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideChange = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const currentAnimation = getAnimationVariants(slides[currentSlide].animationType);

  // Get initial background image scale based on animation type
  const getBackgroundScale = () => {
    const type = slides[currentSlide].animationType;
    if (type === "fade") return 1;
    return 1.2;
  };

  // Generate grid mask keyframe animation
  const gridSize = 8; // 8x8 = 64 grids
  const totalGrids = gridSize * gridSize;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          initial={currentAnimation.initial}
          animate={currentAnimation.animate}
          exit={currentAnimation.exit}
          transition={currentAnimation.transition}
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          {/* Background image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            initial={{
              scale: getBackgroundScale(),
              filter: "blur(0px)"
            }}
            animate={{
              scale: 1,
              filter: "blur(0px)"
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          />

          {/* Grid mask layer - only show for grid animation */}
          {slides[currentSlide].animationType === "grid" && (
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none z-10">
              {Array.from({ length: totalGrids }).map((_, index) => (
                <motion.div
                  key={`grid-${currentSlide}-${index}`}
                  className="bg-black"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{
                    duration: 0.15,
                    delay: (index % gridSize) * 0.03 + Math.floor(index / gridSize) * 0.05,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}


          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient}`} />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center z-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
              {/* Top announcement banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8 flex justify-center"
              >
                <div className="rounded-full bg-white/20 backdrop-blur-md px-6 py-2 text-sm font-medium text-white border border-white/30">
                  Simon Data Is Now Simon AI - Read the Launch Announcement Here
                </div>
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6"
              >
                {slides[currentSlide].title}
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className={`text-4xl font-bold tracking-tight bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent sm:text-5xl lg:text-6xl mb-8`}
                style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
              >
                {slides[currentSlide].subtitle}
              </motion.h2>

              {/* Button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.9,
                  ease: [0.34, 1.56, 0.64, 1] // Spring-like easing
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                Talk to us
              </motion.button>

              {/* Bottom description text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mt-12 text-center text-sm text-white/90 max-w-4xl mx-auto"
              >
                The AI-first composable customer data platform for the fastest-growing
                brands and Fortune 500 leaders
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((slide, index) => (
          <button
            key={`slide-indicator-${slide.id}`}
            onClick={() => handleSlideChange(index)}
            className={`transition-all duration-300 rounded-full ${currentSlide === index
              ? "bg-white w-12 h-3"
              : "bg-white/50 w-3 h-3 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}

