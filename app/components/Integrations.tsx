"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface RecommendProduct {
  category_id: number;
  cover_url: string;
  id: number;
  title: string;
  price?: number;
  sale_price?: number;
  price_unit?: string;
}

interface IntegrationsProps {
  productTitle?: string;
  productContent?: string;
  recommendProducts?: RecommendProduct[];
}

export default function Integrations({
  productTitle = "Featured Products",
  productContent = "Discover our best-selling products, trusted by thousands of customers",
  recommendProducts = [],
}: IntegrationsProps) {
  const router = useRouter();

  // 5 sets of products for a much larger buffer
  const displayProducts = [
    ...recommendProducts,
    ...recommendProducts,
    ...recommendProducts,
    ...recommendProducts,
    ...recommendProducts,
  ];

  useEffect(() => {
    const container = document.getElementById("integrations-scroll-container");
    if (!container || recommendProducts.length === 0) return;

    // Set initial position to the start of the 3rd set (index 2)
    const singleWidth = container.scrollWidth / 5;
    container.scrollLeft = singleWidth * 2;

    let isInternalScroll = false;

    const handleScroll = () => {
      if (isInternalScroll) return;

      const { scrollLeft, scrollWidth } = container;
      const singleWidth = scrollWidth / 5;

      // Teleport if we move out of the comfortable middle range (Set 2, 3, 4)
      // If we enter Set 1 (left) or Set 5 (right), jump back to middle
      if (scrollLeft < singleWidth) {
        isInternalScroll = true;
        container.scrollTo({
          left: scrollLeft + singleWidth * 2,
          behavior: "instant",
        });
        setTimeout(() => {
          isInternalScroll = false;
        }, 100);
      } else if (scrollLeft > singleWidth * 3) {
        isInternalScroll = true;
        container.scrollTo({
          left: scrollLeft - singleWidth * 2,
          behavior: "instant",
        });
        setTimeout(() => {
          isInternalScroll = false;
        }, 100);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      const newSingleWidth = container.scrollWidth / 3;
      container.scrollLeft = newSingleWidth;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [recommendProducts.length]);

  const handleManualScroll = (direction: "left" | "right") => {
    const container = document.getElementById("integrations-scroll-container");
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-white relative z-0">
      <div className="mx-auto px-6 lg:px-8" style={{ maxWidth: "1450px" }}>
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
          <p className="text-xl text-gray-600 mb-8">{productContent}</p>
        </motion.div>

        {/* Products Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Products Container Wrapper */}
          <div className="bg-transparent">
            {/* Products Container */}
            <div
              id="integrations-scroll-container"
              className="flex flex-nowrap gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-5"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {displayProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="flex-none w-[280px]"
                >
                  <div
                    onClick={() =>
                      router.push(
                        `/products/${product.category_id}/${product.id}`,
                      )
                    }
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition-all duration-300 cursor-pointer h-full group hover:-translate-y-2 hover:shadow-xl"
                  >
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden flex items-center justify-center p-4">
                      <img
                        src={product.cover_url}
                        alt={product.title}
                        className="w-full h-full object-contain scale-[0.9] group-hover:scale-100 transition-transform duration-500 select-none pointer-events-none"
                        loading="eager"
                        decoding="async"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 border-t border-gray-100">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 h-12 mb-2">
                        {product.title}
                      </h3>
                      {product.price !== undefined && (
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-purple-600 font-bold text-lg">
                            {product.price_unit}{" "}
                            {product.price.toLocaleString()}
                          </span>
                          {product.sale_price !== undefined && (
                            <span className="text-gray-400 text-sm line-through">
                              {product.price_unit}{" "}
                              {product.sale_price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation Controls */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => handleManualScroll("left")}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => handleManualScroll("right")}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
