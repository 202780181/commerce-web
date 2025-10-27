"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const features = [
  {
    number: "01.",
    title: "Activate the full universe of signals",
    description:
      "Market with 1st, 2nd, and 3rd-party structured and unstructured data, with zero ETL, to unlock mass personalization that performs.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: "02.",
    title: "Personalize with context from live, real-world signals",
    description:
      "Weather shifts, sentiment spikes, social reviews, and cultural events instantly become marketing opportunities.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "03.",
    title: "Launch campaigns 10× faster",
    description:
      "Goal-based workflows and Composable AI Agents handle prep, insights, and execution, multiplying throughput while removing bottlenecks.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    number: "04.",
    title: "Optimize continuously toward your goals",
    description:
      "Blueprints and Adaptive Segments learn and adjust in real time, compounding ROI for every campaign.",
    gradient: "from-indigo-500 to-blue-500",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 hover:shadow-xl transition-shadow">
        <div className={`inline-block bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-4`}>
          <span className="text-5xl font-bold">{feature.number}</span>
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
        <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
          Learn more →
        </button>
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
            Turn on-point personalization into
            <br />
            performance that scales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto"
          >
            Most marketing platforms force a trade-off. As you launch more campaigns,
            performance drops. Simon AI ends that. By combining agentic AI with a
            next-generation composable CDP, brands unlock 100x more data.
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

