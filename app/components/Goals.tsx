"use client";

import { motion } from "motion/react";

const goals = [
  {
    title: "Prevent Churn Before It Happens",
    description:
      "AI Fields capture churn risk from sentiment and usage data. Trigger retention campaigns that reduce churn and grow LTV.",
  },
  {
    title: "Trigger Contextual Offers That Convert",
    description:
      "Moments created by Insight Agents turn real-world signals like weather and trends into triggers for higher-converting campaigns.",
  },
  {
    title: "Grow Loyalty and Lifetime Value",
    description:
      "Adaptive Segments evolve with customer behavior. Personalize rewards, upsells, and cross-sells that expand revenue per customer.",
  },
  {
    title: "Launch Contextual Personalization 10× Faster",
    description:
      "Blueprints and Automation Agents handle execution based on your goals, so you activate more campaigns without engineering bottlenecks.",
  },
  {
    title: "Adapt Journeys in Real Time",
    description:
      "AI Fields, Moments, and Adaptive Segments update continuously, ensuring every campaign stays relevant to live customer behavior and context.",
  },
  {
    title: "Shift Data Team Work to Higher-Value Tasks",
    description:
      "AI Agents handle insights and data prep, freeing data teams to focus on improving AI performance and enhancing personalization accuracy and scale.",
  },
];

export default function Goals() {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Whatever Your Goal,
            <br />
            Simon AI Delivers the Outcome
          </h2>
        </motion.div>

        {/* Goals grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-8 hover:shadow-lg transition-all hover:border-purple-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {goal.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{goal.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

