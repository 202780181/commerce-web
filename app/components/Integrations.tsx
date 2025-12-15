"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface RecommendProduct {
  category_id: number;
  cover_url: string;
  id: number;
  title: string;
}

interface IntegrationsProps {
  productTitle?: string;
  productContent?: string;
  recommendProducts?: RecommendProduct[];
}

export default function Integrations({ 
  productTitle = 'Featured Products', 
  productContent = 'Discover our best-selling products, trusted by thousands of customers',
  recommendProducts = []
}: IntegrationsProps) {
  const router = useRouter();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = document.getElementById('integrations-scroll-container');
    
    const checkScroll = () => {
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 1);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    if (container) {
      checkScroll();
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [recommendProducts]);
  
  return (
    <section className="py-24 bg-white relative z-0">
      <div className="mx-auto px-6 lg:px-8" style={{ maxWidth: '1450px' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {productTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {productContent}
          </p>
        </motion.div>

        {/* Products Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Left Arrow */}
          <button
            onClick={() => {
              const container = document.getElementById('integrations-scroll-container');
              if (container) {
                container.scrollBy({ left: -1216, behavior: 'smooth' });
              }
            }}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-3 transition-all ${
              canScrollLeft 
                ? 'hover:bg-white hover:scale-110 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Products Container Wrapper - 限制宽度只显示4个 */}
          <div className="max-w-[1224px] mx-auto bg-transparent">
            {/* Products Container */}
            <div
              id="integrations-scroll-container"
              className="flex flex-nowrap gap-6 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden p-4 pb-5"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
            {recommendProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex-none w-[280px]"
              >
                <div 
                  onClick={() => router.push(`/products/${product.category_id}/${product.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition-all duration-300 cursor-pointer h-full group hover:-translate-y-2"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={product.cover_url}
                      alt={product.title}
                      className="w-full h-full object-contain scale-[0.9] group-hover:scale-100 transition-transform duration-500 select-none pointer-events-none"
                      loading="lazy"
                      decoding="async"
                      style={{ contentVisibility: 'auto' }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 h-12">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              const container = document.getElementById('integrations-scroll-container');
              if (container) {
                container.scrollBy({ left: 1216, behavior: 'smooth' });
              }
            }}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-3 transition-all ${
              canScrollRight 
                ? 'hover:bg-white hover:scale-110 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

