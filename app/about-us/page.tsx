"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  const leadership = [
    {
      name: "Jason Davis",
      title: "Chief Executive Officer & Co-Founder",
      linkedin: "#",
    },
    {
      name: "Matt Walker",
      title: "Chief Technology Officer & Co-Founder",
      linkedin: "#",
    },
    {
      name: "Todd McCormick",
      title: "Chief Revenue Officer",
      linkedin: "#",
    },
    {
      name: "Jeffrey Walton",
      title: "Vice President of Product & Strategy",
      linkedin: "#",
    },
    {
      name: "Ernesto Gonzalez",
      title: "Vice President of Engineering",
      linkedin: "#",
    },
    {
      name: "Tara Petre",
      title: "Vice President of Customer Success",
      linkedin: "#",
    },
  ];

  const values = [
    {
      title: "Respect everyone",
      description:
        "We believe in fostering an inclusive and supportive environment where every individual is valued, heard, and appreciated. This extends to our interactions with customers, partners, and the communities we serve.",
      image: "https://cdn.prod.website-files.com/6578982aece0102430a52404/65a99535ffaef8c38ff8de29_value-1.webp",
    },
    {
      title: "Listen and share",
      description:
        "We empower each other to speak and exchange ideas. We listen actively and value the diverse voices within our organization. We are open and flexible to different communication styles.",
      image: "https://cdn.prod.website-files.com/6578982aece0102430a52404/65a99535ffaef8c38ff8de29_value-1.webp",
    },
    {
      title: "Take ownership",
      description:
        "We encourage everyone to take the first stab. We pride ourselves in taking great initiative and accountability in our work. We embrace our mistakes and celebrate our successes.",
      image: "https://cdn.prod.website-files.com/6578982aece0102430a52404/65a995344c73f12fe061fd9c_value-2.webp",
    },
    {
      title: "Learn and develop",
      description:
        "We all have something to bring to the table and we are excited to learn from our peers, customers, and partners. We prioritize the personal and professional growth of every Simon team member.",
      image: "https://cdn.prod.website-files.com/6578982aece0102430a52404/65a995344c73f12fe061fd9c_value-2.webp",
    },
    {
      title: "Build strategically",
      description:
        "We align our efforts around a clear vision and well-defined objectives. We ensure that each brick laid in Simon's framework contributes to our collective success.",
      image: "https://cdn.prod.website-files.com/6578982aece0102430a52404/65c2b5de0b3c2bc2fe5df4de_values-5.webp",
    },
  ];

  const [expandedValue, setExpandedValue] = React.useState(0);
  const [currentAwardIndex, setCurrentAwardIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0); // 1 表示向右，-1 表示向左

  const nextAward = () => {
    setDirection(1);
    setCurrentAwardIndex((prev) => (prev + 1) % awards.length);
  };

  const prevAward = () => {
    setDirection(-1);
    setCurrentAwardIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  const awards = [
    {
      year: "2026",
      image: "https://cdn.prod.website-files.com/657e097a54838aafd27d7a65fa82caa24_mmds-2026-badge_ones-to-watch.png",
      title: "Recognized in Snowflake's Modern Marketing Data Stack Report",
    },
    {
      year: "2025",
      image: "https://cdn.prod.website-files.com/657e097a54838aafd26f0afcca613ab859_Products_Partner_Badge_Elite.png",
      title: "Elite Snowflake AI Data Cloud Partner",
    },
    {
      year: "2024",
      image: "https://cdn.prod.website-files.com/657e097a54838aafd2776743/65ba9a9bd0995aa2a2321c52_award-2024.webp",
      title: "G2 CDP Leader with Over 140 5-Star Reviews",
    },
    {
      year: "2023",
      image: "https://cdn.prod.website-files.com/657e097a54838aafd2776743/6595bc474002516e328ea46f_awards_ag-1.webp",
      title: "Powered by Snowflake Partner of the Year 2023",
    },
    {
      year: "2023",
      image: "https://cdn.prod.website-files.com/657e097a54838aafd2776743/6595bf92deed966af49ee676_awards_gartner.webp",
      title: "Gartner Cool Vendor in Multichannel Marketing",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header lightBackground={true} />

      {/* Hero Section - 第一块 */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl mb-8">
              We are Simon AI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Customers are the heart of your business. We help you serve them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section - 第二块 */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧：图片卡片 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.prod.website-files.com/6578982aece0102430a52404/65a9745637289c0266375ed5_mission.webp"
                  alt="Mission"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* 右侧：Mission 文本 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  MISSION
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                To empower customer marketing teams with the data, tools, and support to drive 1:1 customer personalization across every touchpoint.
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Founder story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Simon AI, formerly known as Simon Data was founded by two data
                scientists-cum-serial entrepreneurs who became deeply disillusioned
                by the inaccessibility of enterprise data systems.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Before founding Simon, Jason Davis (CEO) met Matt Walker (CTO) in
                grad school pursuing their PhDs in machine learning. Since then,
                they've built many startups including Etsy's acquisition of Adtuitive,
                scaled data teams, and worked at large enterprises including Apple and
                Google.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The vision behind Simon was motivated by the challenges that they
                experienced firsthand related to getting value out of data:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="text-gray-700 leading-relaxed flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    Data scientists building ML models that aren't clearly
                    actionable, e.g. focusing on the problem of churn prediction
                    instead of churn prevention
                  </span>
                </li>
                <li className="text-gray-700 leading-relaxed flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    Businesses spending seven or eight figures (or more!) annually on
                    data teams and infrastructure—yet still unable to access the
                    right data to drive business outcomes
                  </span>
                </li>
                <li className="text-gray-700 leading-relaxed flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>
                    Seeing how much upside there is in optimizing ROAS, CAC, and LTV
                    optimization when the right data, use cases, and systems are in
                    place
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                The basic founding vision remains the same today: to provide fast,
                automated, and powerful data access to marketers and business
                stakeholders—and to use this data to drive a next-generation of
                personalized messaging and media targeting to drive incremental
                revenue.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-12"
          >
            Our values
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 左侧：图片 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-32"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={expandedValue}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto"
                >
                  <img
                    src={values[expandedValue].image}
                    alt={values[expandedValue].title}
                    className="w-full h-auto"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* 右侧：手风琴列表 */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-gray-200"
                >
                  <button
                    onClick={() => setExpandedValue(index)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <h3
                      className={`text-xl font-bold transition-colors ${
                        expandedValue === index
                          ? "text-gray-900"
                          : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      {value.title}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedValue === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className={`w-6 h-6 transition-colors ${
                          expandedValue === index
                            ? "text-purple-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedValue === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 leading-relaxed pb-6">
                          {value.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-12"
          >
            Leadership
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-8 hover:shadow-lg transition-all">
                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{leader.title}</p>
                  <a
                    href={leader.linkedin}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Linkedin →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Come work <span className="italic">with us</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              We firmly believe that business success starts and ends with people. We
              all do our best work when we are surrounded by other top performers who
              want to succeed together. When you trust your team, invest in their
              development, and give them ownership, great things happen.
            </p>
            <p className="text-lg text-white/90 mb-8">
              If you're interested in helping enterprises tackle big marketing and
              data challenges, we want to hear from you!
            </p>
            <button className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              View open roles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Awards - 轮播 */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 text-center"
          >
            Top rated by customers, analysts,
            <br />
            and industry leaders
          </motion.h2>
        </div>

        {/* 轮播容器 */}
        <div className="relative max-w-6xl mx-auto px-6">
          {/* 左箭头 */}
          <button
            onClick={prevAward}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* 卡片容器 */}
          <div className="relative h-[550px] flex items-center justify-center overflow-hidden">
            {/* 左侧卡片 */}
            <AnimatePresence initial={false}>
              <motion.div
                key={`left-${currentAwardIndex}`}
                initial={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                animate={{ opacity: 0.6, x: 0, scale: 0.85 }}
                exit={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="absolute -left-24 top-1/2 -translate-y-1/2 w-[480px] z-0"
              >
                <div className="rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 p-6 flex flex-col items-center text-center min-h-[480px]">
                  <div className="bg-white rounded-full px-3 py-1.5 text-xs font-bold text-gray-500 mb-4">
                    {awards[(currentAwardIndex - 1 + awards.length) % awards.length].year}
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full py-4">
                    <img
                      src={awards[(currentAwardIndex - 1 + awards.length) % awards.length].image}
                      alt={awards[(currentAwardIndex - 1 + awards.length) % awards.length].title}
                      className="max-w-full max-h-40 object-contain"
                    />
                  </div>
                  <p className="text-gray-400 font-medium text-xs mt-4 line-clamp-2">
                    {awards[(currentAwardIndex - 1 + awards.length) % awards.length].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 中间卡片（主要卡片） */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentAwardIndex}
                custom={direction}
                initial={{ 
                  opacity: 0, 
                  x: direction > 0 ? 300 : -300,
                  scale: 0.9
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0, 
                  x: direction > 0 ? -300 : 300,
                  scale: 0.9
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1]
                }}
                className="absolute w-[480px] z-20"
              >
                <div className="rounded-3xl bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 p-10 shadow-2xl min-h-[520px] flex flex-col">
                  {/* 年份标签 */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-white rounded-full px-5 py-2 text-base font-bold text-gray-900 shadow-md">
                      {awards[currentAwardIndex].year}
                    </div>
                  </div>

                  {/* 徽章图片 */}
                  <div className="flex-1 flex items-center justify-center py-8 mt-6">
                    <img
                      src={awards[currentAwardIndex].image}
                      alt={awards[currentAwardIndex].title}
                      className="max-w-full max-h-72 object-contain"
                    />
                  </div>

                  {/* 描述文字 */}
                  <div className="mt-6 text-center">
                    <p className="text-gray-900 font-bold text-lg leading-relaxed">
                      {awards[currentAwardIndex].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 右侧卡片 */}
            <AnimatePresence initial={false}>
              <motion.div
                key={`right-${currentAwardIndex}`}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 0.6, x: 0, scale: 0.85 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="absolute -right-24 top-1/2 -translate-y-1/2 w-[480px] z-0"
              >
                <div className="rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 p-6 flex flex-col items-center text-center min-h-[480px]">
                  <div className="bg-white rounded-full px-3 py-1.5 text-xs font-bold text-gray-500 mb-4">
                    {awards[(currentAwardIndex + 1) % awards.length].year}
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full py-4">
                    <img
                      src={awards[(currentAwardIndex + 1) % awards.length].image}
                      alt={awards[(currentAwardIndex + 1) % awards.length].title}
                      className="max-w-full max-h-40 object-contain"
                    />
                  </div>
                  <p className="text-gray-400 font-medium text-xs mt-4 line-clamp-2">
                    {awards[(currentAwardIndex + 1) % awards.length].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 右箭头 */}
          <button
            onClick={nextAward}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* 导航点 */}
          <div className="flex justify-center gap-2 mt-12">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentAwardIndex ? 1 : -1);
                  setCurrentAwardIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentAwardIndex ? "bg-purple-600 w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

