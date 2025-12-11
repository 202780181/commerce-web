"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { getProductById } from "../lib/productConfig";
import directoryMap from "../lib/directoryMap.json";

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

        {/* Products Grid - 与 /products 页面相同的样式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {recommendProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div 
                onClick={() => router.push(`/products/${product.category_id}/${product.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full group"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.cover_url}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
        </motion.div>
      </div>
    </section>
  );
}

