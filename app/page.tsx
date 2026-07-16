"use client";

import Header from "./components/Header";
import Hero from "./components/Hero";
import VideoShowcase, { Video } from "./components/VideoShowcase";
import Integrations from "./components/Integrations";
import Footer from "./components/Footer";
import FloatingSidebar from "./components/FloatingSidebar";
import { useState, useEffect } from "react";

interface Banner {
  id: number;
  image_url: string;
  title: string;
  content: string;
  sort: number;
}

interface HomeData {
  code: number;
  message: string;
  data: {
    banners: Banner[];

    videos: Video[];
    // about_summary?: string; // made optional or removed if API no longer sends it
    // company_image?: string; // made optional
    product_title: string;
    product_content: string;
    recommend_products: any[];
  };
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 在 useEffect 中调用接口，只执行一次
    const fetchData = async () => {
      try {
        const apiUrl = "/api/proxy/portal/home/index";
        console.log("Fetching from:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const res = await response.json();
          setHomeData(res);
          console.log("Home data:", res);
        } else {
          console.error(
            "Response not OK:",
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
        if (error instanceof Error) {
          console.error("Error details:", error.message, error.stack);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 空依赖数组，只在组件挂载时执行一次

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero banners={homeData?.data?.banners || []} />
      <VideoShowcase videos={homeData?.data?.videos || []} />
      <Integrations
        productTitle={homeData?.data?.product_title || ""}
        productContent={homeData?.data?.product_content || ""}
        recommendProducts={homeData?.data?.recommend_products || []}
      />
      <Footer />
      <FloatingSidebar />
    </div>
  );
}
