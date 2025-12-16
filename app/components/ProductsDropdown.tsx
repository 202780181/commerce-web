"use client";

import { memo, useRef, useState, useLayoutEffect } from "react";

interface Category {
  id: number;
  parent_id: number;
  name: string;
  cover_url?: string;
  children?: Category[];
  product_count?: number;
  sort?: number;
}

interface ProductsDropdownProps {
  categories: Category[];
  currentProductId: number | null;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductsDropdown = memo(function ProductsDropdown({
  categories,
  currentProductId,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: ProductsDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [xOffset, setXOffset] = useState(0);

  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const rightOverflow = rect.right - windowWidth + 24; // 24px safety margin

      if (rightOverflow > 0) {
        setXOffset(rightOverflow);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute top-full left-1/2 pt-4 z-50"
      style={{ transform: `translateX(calc(-50% - ${xOffset}px))` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-[1000px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Product Categories</h3>
            <p className="text-sm text-gray-500">Explore our complete range of precision machinery</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-purple-600 [&::-webkit-scrollbar-thumb]:to-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full">
            {categories.map((category) => {
              const isActive = Number(currentProductId) === category.id;
              return (
                <a
                  key={category.id}
                  href={`/products/${category.id}`}
                  className={`group/item flex items-start gap-3 p-3 rounded-xl border ${
                    isActive 
                      ? 'bg-purple-50 border-purple-300' 
                      : 'bg-white border-transparent hover:bg-purple-50/50 hover:border-purple-200'
                  }`}
                >
                  {/* 使用CSS background-image代替img标签，性能更好 */}
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${category.cover_url}")`,
                      willChange: 'auto'
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm truncate ${
                      isActive ? 'text-purple-600' : 'text-gray-900 group-hover/item:text-purple-600'
                    }`}>
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      click to details
                    </div>
                  </div>
                  <svg 
                    className={`w-4 h-4 flex-shrink-0 mt-1 ${
                      isActive 
                        ? 'text-purple-600 translate-x-1' 
                        : 'text-gray-400 group-hover/item:text-purple-600 group-hover/item:translate-x-1'
                    }`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductsDropdown;
