"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface Banner {
  id: number;
  image_url: string;
  title: string;
  content: string;
  sort: number;
}

interface HeroProps {
  banners: Banner[];
}

export default function Hero({ banners = [] }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Transform banners to slides format
  const slides = banners.length > 0 ? banners.map(banner => ({
    id: banner.id,
    title: banner.title,
    subtitle: banner.content,
    gradient: "from-blue-600 to-cyan-600",
    bgGradient: "from-blue-900/90 via-cyan-900/80 to-blue-800/90",
    image: banner.image_url,
    animationType: "fade",
  })) : [
    {
      id: 1,
      title: "ZPP CNC",
      subtitle: "Zero Point Prince",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-900/90 via-cyan-900/80 to-blue-800/90",
      image: "https://cdn.gzxfjxyxgs.com/images/banners/homeBanner.webp",
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
    // Mark as loaded after initial render
    const initialTimer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Switch every 5 seconds

    return () => {
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
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
            <div className="mx-auto px-6 lg:px-8 text-center" style={{ maxWidth: '1450px' }}>
              <AnimatePresence mode="wait">
                {!isInitialLoad && (
                  <>
                    {/* Main title */}
                    <motion.h1
                      key={`title-${currentSlide}-${isInitialLoad}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6"
                    >
                      {slides[currentSlide].title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                      key={`subtitle-${currentSlide}-${isInitialLoad}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className={`text-4xl font-bold tracking-tight bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent sm:text-5xl lg:text-6xl mb-8`}
                      style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
                    >
                      {slides[currentSlide].subtitle}
                    </motion.h2>

                    {/* Button */}
                    <motion.a
                      key={`button-${currentSlide}-${isInitialLoad}`}
                      href="/contact-us"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6,
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
                      className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                      Talk to us
                    </motion.a>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel indicators - only show when there are multiple slides */}
      {slides.length > 1 && (
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
      )}
    </section>
  );
}

