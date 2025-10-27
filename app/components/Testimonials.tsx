"use client";

import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "Simon makes testing, learning, segmenting, and customizing so much easier. I was doing this work manually in CSVs before, and now we can click, click, click and get a custom email out and not have to worry about undertaking a massive process.",
    author: "Kristen Elmer",
    title: "Sr. Director of eCommerce Sales, BARK",
  },
  {
    quote:
      "With Simon Data, we unlocked the ability to unify all of our customer data and cohesively orchestrate customer experiences across our marketing channels. This allowed us to increase our sales by improving how we interact with our customers.",
    author: "Ash Fisher",
    title: "Head of Technology at ASOS",
  },
  {
    quote:
      "The power really comes from the simple fact that Simon sits on top of our warehouse and has access to all of our data, not just Shopify data or on-site behavior-based data, to drive very specific marketing automation flows.",
    author: "Brendan Hastings",
    title: "SVP of Engineering and Digital Product at Thinx",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Testimonials carousel */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="h-full rounded-2xl bg-white p-8 shadow-md hover:shadow-xl transition-all border border-gray-100">
                <div className="mb-6">
                  <svg
                    className="h-10 w-10 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600 mt-1">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

