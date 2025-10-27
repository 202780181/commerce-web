"use client";

import { motion } from "motion/react";

const integrations = [
  "Amazon Redshift",
  "Snowflake",
  "Salesforce",
  "Zendesk",
  "Braze",
  "TikTok",
  "Meta",
  "Nosto",
  "Shopify",
  "Klaviyo",
  "Dynamic Yield",
  "Google Ads",
];

export default function Integrations() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Integrate with hundreds of the most
            <br />
            popular data and marketing tools
          </h2>
          <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
            See all integrations →
          </button>
        </motion.div>

        {/* Integration logos grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 w-full aspect-square flex items-center justify-center border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group">
                <span className="text-gray-700 font-semibold text-center group-hover:text-purple-600 transition-colors">
                  {integration}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

