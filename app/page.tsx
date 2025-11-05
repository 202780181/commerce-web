"use client";

import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Integrations from "./components/Integrations";
import Footer from "./components/Footer";
import FloatingSidebar from "./components/FloatingSidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <AboutUs />
      <Integrations />
      <Footer />
      <FloatingSidebar />
    </div>
  );
}
