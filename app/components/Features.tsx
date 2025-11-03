"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";

const features = [
  {
    number: "01.",
    title: "Quick Release Jaws Vise",
    description:
      "The quick-Release self-centering vise jaws require no screws for locking. The jaws are fixed through awedge structure, and can be detached or installed in just seconds. The installation features high positioningaccuracy, with no upward warping of the jaws. Diferent types ofjaws can be quickly switched to meet various machining reguirements.",
    gradient: "from-purple-500 to-pink-500",
    image: "/images/products/one-leve2-1.png",
  },
  {
    number: "02.",
    title: "High Precision Zero Point Clamping",
    description:
      "High-precision manual Zero Point Clamping achieves loosening and locking by rotating the screw. fourpull studs are positioned through tapered holes while simultaneously locking vertically downward,automatically compensating for the center position with zero clearance and high precision.",
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/products/one-leve2-2.png",
  },
  {
    number: "03.",
    title: "Modular Combination Series",
    description:
      "lt can be locked at any angle from 0 ' to 90'.The angle can be calibrated by dragging the watch on themachine tool through the program. The vise can be quickly changed and disassembled, and can be quicklychanged in four directions to achleve 360' fixed-angle processing without dead comers. lt is a rear-pullocking type",
    gradient: "from-violet-500 to-purple-500",
    image: "/images/products/one-level2-3.png",
  },
  {
    number: "04.",
    title: "Modular Set Series",
    description:
      "Modular combination of zero point enables rapid production of samples and small batches, minimizes the time spent on making temporary fixtures, not only improves production efficiency but also ensures product accuracy. The modular combination is flexible and reliable, supporting switching between various forms of combinations for fixtures.",
    gradient: "from-indigo-500 to-blue-500",
    image: "/images/products/one-level2-4.png",
  },
  {
    number: "05.",
    title: "L Plate Series",
    description:
      "The 4axis L plate can be directly installed onto the úaxis rotary table by screwing, or a zero pointclamping can be installed on the 4axis for quick replacement and installation of the l-plate.",
    gradient: "from-indigo-500 to-blue-500",
    image: "/images/products/one-level2-5.png",
  },
  {
    number: "06.",
    title: "5Axis Pyramid Series",
    description:
      "5Axis pyramid types are available in single station,2station, 3station and 4 station configurations.Size and height can be customized, as well as the installation anale of the zero point clamping. Manual orpneumatic zero point clampings can be customized for installation, and the workstation mounting holepositions can be tailored to specific machine requirements.",
    gradient: "from-indigo-500 to-blue-500",
    image: "/images/products/one-level2-6.png",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number; }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showBackground, setShowBackground] = useState(false);

  const toggleBackground = () => {
    if (feature.image) {
      setShowBackground(!showBackground);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative h-full group"
    >
      <div
        className="h-full rounded-3xl hover:shadow-xl transition-all duration-500 p-8 lg:p-12 flex flex-col relative overflow-hidden"
        style={{
          backgroundImage: showBackground && feature.image ? `url(${feature.image})` : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay - only show gradient when no image background */}
        {!showBackground && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100" />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className={`inline-block bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-4`}>
            <span className="text-5xl font-bold">{feature.number}</span>
          </div>

          {/* Title - always in normal flow to maintain height */}
          <h3 className={`text-2xl lg:text-3xl font-bold mb-4 transition-all duration-500 ${showBackground && feature.image
            ? 'opacity-0'
            : 'text-gray-900 opacity-100'
            }`}>
            {feature.title}
          </h3>

          {/* Description - hidden when background is shown */}
          <div className={`transition-all duration-500 ${showBackground && feature.image
            ? 'opacity-0 transform translate-y-4 pointer-events-none'
            : 'opacity-100 transform translate-y-0'
            }`}>
            <p className="text-gray-600 text-lg mb-6 flex-grow">
              {feature.description}
            </p>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-grow" />

          {/* Button - hidden when background is shown */}
          <div className={`transition-all duration-500 ${showBackground && feature.image
            ? 'opacity-0 transform translate-y-4 pointer-events-none'
            : 'opacity-100 transform translate-y-0'
            }`}>
            <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors self-start">
              Learn more →
            </button>
          </div>

          {/* Overlay title for background mode - positioned at bottom aligned with number */}
          {showBackground && feature.image && (
            <div className="absolute bottom-1 left-0">
              <h3 className="text-lg lg:text-xl font-bold text-white transition-all duration-500 inline-block"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)'
                }}>
                {feature.title}
              </h3>
            </div>
          )}
        </div>

        {/* Thumbnail in bottom right corner */}
        {feature.image && (
          <button
            onClick={toggleBackground}
            className="absolute bottom-4 right-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-lg hover:scale-110 transition-all duration-300 z-20 bg-white"
          >
            <img
              src={feature.image}
              alt={`${feature.title} thumbnail`}
              className="w-full h-full object-cover"
            />
            {/* Toggle indicator */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${showBackground ? 'opacity-100' : 'opacity-0 hover:opacity-100'
              }`}>
              <span className="text-white text-xs font-bold">
                {showBackground ? '✕' : '🔍'}
              </span>
            </div>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            GO-Grow Machinery Co.,Lty
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto"
          >
            The company develops zero-point quick-change systems, produces and sellsvarious types of precision vises, zero-point fixtures, self-centering vises, zero-pointpositioning systems, three-four-five-axis professional fixtures, multi-stationvises, multi-station reference seats, etc.
          </motion.p>

          {/* Key metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                100x
              </div>
              <div className="text-sm text-gray-600 mt-2">Actionable Data</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Higher
              </div>
              <div className="text-sm text-gray-600 mt-2">Conversion</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                No More
              </div>
              <div className="text-sm text-gray-600 mt-2">Bottlenecks</div>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

