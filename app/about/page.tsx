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
  
  interface PageData {
    title: string;
    content: string;
  }

  const [pageData, setPageData] = React.useState<PageData | null>(null);

  React.useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('/api/proxy/portal/pages/about');
        if (!response.ok) throw new Error('Failed to fetch page data');
        const data = await response.json();
        if (data.code === 0 && data.data) {
          setPageData(data.data);
        }
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    };

    fetchPageData();
  }, []);

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
              ABOUT US
            </h1>
          </motion.div>
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
            {pageData ? (
              <>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  {pageData.title || "Founder story"}
                </h2>
                <div 
                  className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap [&>p]:mb-3 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-2 [&>h3]:mt-6 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: pageData.content }}
                />
              </>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

