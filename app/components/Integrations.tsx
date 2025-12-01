"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { getAllProducts } from "../lib/productConfig";
export default function Integrations() {
  const router = useRouter();
  const products = getAllProducts();
  
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
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover our best-selling products, trusted by thousands of customers
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
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div 
                onClick={() => router.push(`/products/${product.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={product.coverImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    style={{ contentVisibility: 'auto' }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.detailCount || 0} items
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

