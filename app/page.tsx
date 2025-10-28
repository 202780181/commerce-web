"use client";

import Header from "./components/Header";
import Hero from "./components/Hero";
import BrandLogos from "./components/BrandLogos";
import Features from "./components/Features";
import Platform from "./components/Platform";
import Goals from "./components/Goals";
import Testimonials from "./components/Testimonials";
import Integrations from "./components/Integrations";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BrandLogos />
      <Features />
      <Platform />
      <Goals />
      <Testimonials />
      <Integrations />
      <CTA />
      <Footer />
    </div>
  );
}
