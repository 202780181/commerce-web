"use client";

import { motion } from "motion/react";

export default function Hero() {
  const floatingTexts = [
    "Positive TikTok review",
    "Repeat purchase streak",
    "Low stock: only two left",
    "Competitor price drop",
    "Valentine's Day",
    "Frustration in support chat",
    "Browsing spike",
    "Abandoned cart",
    "Rainy day",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white pt-32 pb-20">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top announcement banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="rounded-full bg-purple-100 px-6 py-2 text-sm font-medium text-purple-700">
            Simon Data Is Now Simon AI - Read the Launch Announcement Here
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-6">
            Explore Every Moment.
            <br />
            Launch with 10x Speed.
          </h1>
          <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent sm:text-6xl lg:text-7xl mb-8">
            Personalize Infinitely.
          </h2>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Talk to us
          </motion.button>
        </motion.div>

        {/* Floating text bubbles */}
        <div className="relative mt-16 h-64">
          {floatingTexts.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.1,
              }}
              className="absolute"
              style={{
                left: `${(index * 11) % 90}%`,
                top: `${Math.sin(index) * 30 + 30}%`,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-md border border-gray-200 whitespace-nowrap"
              >
                {text}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-16 text-center text-sm text-gray-600 max-w-4xl mx-auto"
        >
          The AI-first composable customer data platform for the fastest-growing
          brands and Fortune 500 leaders
        </motion.p>
      </div>
    </section>
  );
}

