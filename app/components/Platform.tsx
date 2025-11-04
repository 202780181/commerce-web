"use client";

import { motion } from "motion/react";
import { useState } from "react";

const tabs = [
  {
    id: "studio",
    name: "Personalization Studio",
    title: "Simon AI Personalization Studio",
    description:
      "Set a goal, create a Blueprint that guides agents, and scale adaptive micro-campaigns to reach new audiences with fresh relevance. Deliver high-performing personalization with marketing-ready AI Fields and AI Moments that adapt continuously to new customer signals.",
  },
  {
    id: "agents",
    name: "AI Agents",
    title: "Simon AI Agents",
    description:
      "Your data and execution team, built for speed. Agents surface signals, prepare data, and automate orchestration so marketers launch more campaigns faster and convert at scale.",
  },
  {
    id: "cdp",
    name: "Composable CDP",
    title: "Simon AI Composable CDP",
    description:
      "The AI-first CDP that runs in your cloud with advanced identity resolution, audience matching, and predictive insights. Unlock 100× more customer and contextual data with zero data movement to power personalization everywhere, on live data.",
  },
];

export default function Platform() {
  const [activeTab, setActiveTab] = useState("studio");

  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto px-6 lg:px-8" style={{ maxWidth: '1450px' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore the Simon AI<sup className="text-2xl">TM</sup>
            <br />
            Agentic Marketing Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Agents that work for marketers, powered by the AI-first composable CDP
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-full bg-white p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "text-gray-700 hover:text-gray-900"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white p-8 lg:p-12 shadow-xl"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {activeContent?.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {activeContent?.description}
              </p>
            </div>

            {/* Visual placeholder */}
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Platform Demo</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-600 mt-12 max-w-4xl mx-auto"
        >
          Agentic AI only works as well as the data it operates on. Simon AI combines a
          goal-based workflow, agents that act as your data and execution team, and an
          AI-first composable CDP powered by best-in-class integrations.
        </motion.p>
      </div>
    </section>
  );
}

