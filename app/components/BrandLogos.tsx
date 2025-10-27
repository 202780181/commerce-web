"use client";

import { motion } from "motion/react";

export default function BrandLogos() {
  const brands = [
    "Travel + Leisure",
    "Asos",
    "Bark",
    "Thinx",
    "Resy",
    "Seat Geek",
    "Equinox Fitness",
    "Travel + Leisure",
    "Asos",
    "Bark",
    "Thinx",
    "Resy",
    "Seat Geek",
    "Equinox Fitness",
  ];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-16 items-center"
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-gray-400 font-semibold text-xl whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

