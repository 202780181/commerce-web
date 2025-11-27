"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { getAllProducts } from "../lib/productConfig";

// 简化的产品路径映射 - 直接映射到产品首页
const productPathMap: Record<string, string> = {
  "5Axix 4Position System": "/products/5axis-pyramid-series",
  "96mm Vertical And Horizontal Modular Combination": "/products/modular-combination-series",
  "96mm Integrated Vertical And Horizontal Zero Point Clamping": "/products/high-precision-zero-point-clamping",
  "96mm to 52mm Schematic Diagram": "/products/modular-combination-series",
  "Hand Type Run_out": "/products/run_out-tester",
  "4Axis Bridge Plate Installed With 3Statio Vise": "/products/l-bridge-plate-series",
  "4Axis Modular Combination Kit": "/products/modular-combination-series",
  "52mm and 96mm Vertical And Horizontal Zero Point Clamping": "/products/high-precision-zero-point-clamping",
  "Hydraulic Bite Machine": "/products/hydraulic-bite-machine",
  "4-axis Double-station Pneumatic Bridge Plate": "/products/l-bridge-plate-series",
  "Precision Bench Vice": "/products/precision-bench-vice",
  "TS96 Type Horizontal Machine Center 4sided Tombstone": "/products/cnc-tombstone-series",
};

// Helper to find product path
const findProductPath = (imageName: string): string => {
  return productPathMap[imageName] || '/products';
};

const integrations = [
  { name: "5Axix 4Position System", image: "/images/products/box1.png" },
  { name: "96mm Vertical And Horizontal Modular Combination", image: "/images/products/box7.png" },
  { name: "96mm Integrated Vertical And Horizontal Zero Point Clamping", image: "/images/products/box3.png" },
  { name: "96mm to 52mm Schematic Diagram", image: "/images/products/box9.png" },
  { name: "Hand Type Run_out", image: "/images/products/box4.png" },
  { name: "4Axis Bridge Plate Installed With 3Statio Vise", image: "/images/products/box2.png" },
  { name: "4Axis Modular Combination Kit", image: "/images/products/box6.png" },
  { name: "52mm and 96mm Vertical And Horizontal Zero Point Clamping", image: "/images/products/box10.png" },
  { name: "Hydraulic Bite Machine", image: "/images/products/box12.png" },
  { name: "4-axis Double-station Pneumatic Bridge Plate", image: "/images/products/box11.png" },
  { name: "Precision Bench Vice", image: "/images/products/box5.png" },
  { name: "TS96 Type Horizontal Machine Center 4sided Tombstone", image: "/images/products/box8.png" },
].map(item => ({
  ...item,
  href: findProductPath(item.name)
}));
export default function Integrations() {
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
            Integrate with hundreds of the most
            <br />
            popular data and marketing tools
          </h2>
          <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
            See all integrations →
          </button>
        </motion.div>

        {/* Integration logos grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <div 
                onClick={() => router.push(integration.href)}
                className="rounded-xl bg-linear-to-br from-gray-50 to-gray-100 p-6 w-full flex flex-col items-center justify-center border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="relative w-full aspect-square mb-4 flex items-center justify-center">
                  <img
                    src={integration.image}
                    alt={integration.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="text-gray-700 font-semibold text-center text-sm group-hover:text-purple-600 transition-colors">
                  {integration.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

