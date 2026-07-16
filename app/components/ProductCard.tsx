/**
 * 产品文件夹卡片组件 - 可复用的文件夹/图片展示卡片
 */

import Link from "next/link";
import { motion } from "motion/react";
import type { FileSystemItem } from "../lib/types";

interface ProductCardProps {
  item: FileSystemItem;
  index: number;
  productId: string;
  currentPath: string[];
  onImageClick?: (index: number) => void;
}

export default function ProductCard({
  item,
  index,
  productId,
  currentPath,
  onImageClick,
}: ProductCardProps) {
  const isFolder = item.type === "folder";

  // 构建链接
  const href = isFolder
    ? `/products/${encodeURIComponent(productId)}/${[...currentPath, item.name].map(encodeURIComponent).join("/")}`
    : "#"; // 图片点击通过 onImageClick 处理

  const cardContent = (
    <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
      {isFolder ? (
        <>
          <div className="relative h-80 overflow-hidden bg-gray-50">
            {item.thumbnailUrl ? (
              <>
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    const placeholder = target.nextElementSibling;
                    if (placeholder) placeholder.classList.add("hidden");
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const placeholder = target.nextElementSibling;
                    if (placeholder) placeholder.classList.add("hidden");
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 pointer-events-none">
                  <svg
                    className="w-20 h-20 text-gray-300 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <svg
                  className="w-32 h-32 text-gray-400 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-yellow-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span className="text-xs font-bold text-white">Folder</span>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 truncate text-center">
              {item.name}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="relative h-80 overflow-hidden bg-gray-50">
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-bold text-gray-700">
                #{index + 1}
              </span>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 truncate text-center">
              {item.name}
            </p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group"
      onClick={
        !isFolder && onImageClick ? () => onImageClick(index) : undefined
      }
    >
      {isFolder ? <Link href={href}>{cardContent}</Link> : cardContent}
    </motion.div>
  );
}
