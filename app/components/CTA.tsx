"use client";

import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            See how leading brands use real-world
            <br />
            signals and launch mass personalization
            <br />
            10× faster with Simon AI.
          </h2>

          {/* Email signup form */}
          <form className="mt-12 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full px-6 py-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-purple-600 shadow-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
            <p className="text-white/80 text-sm mt-4">
              By clicking Sign Up you're confirming that you agree with our Terms and
              Conditions.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

