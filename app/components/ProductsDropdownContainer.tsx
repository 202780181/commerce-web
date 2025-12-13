"use client";

import { useState, useRef, useEffect, useMemo, memo } from "react";
import ProductsDropdown from "./ProductsDropdown";

interface Category {
  id: number;
  parent_id: number;
  name: string;
  cover_url?: string;
  children?: Category[];
  product_count?: number;
  sort?: number;
}

interface ProductsDropdownContainerProps {
  isScrolled: boolean;
  lightBackground: boolean;
  pathname: string | null;
  categories: Category[];
}

function ProductsDropdownContainerComponent({ 
  isScrolled, 
  lightBackground,
  pathname,
  categories 
}: ProductsDropdownContainerProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 预先计算currentProductId，不依赖dropdownOpen状态
  const currentProductId = useMemo(() => {
    if (!pathname) return null;
    return pathname.startsWith('/products/') 
      ? Number(pathname.split('/')[2])
      : null;
  }, [pathname]);

  // 处理下拉菜单打开（立即打开，无延迟）
  const handleDropdownOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // 只在dropdown关闭时才设置为true，避免重复渲染
    setDropdownOpen(prev => prev ? prev : true);
  };

  // 处理下拉菜单关闭（带100ms延迟，防止鼠标快速移动时闪烁）
  const handleDropdownClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 100);
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={handleDropdownOpen}
      onMouseLeave={handleDropdownClose}
    >
      <a 
        href="/products" 
        className={`relative font-semibold text-sm flex items-center gap-1 ${isScrolled || lightBackground ? 'text-gray-900' : 'text-white'} hover:text-purple-600`}
      >
        PRODUCTS
        <svg 
          className={`w-4 h-4 ${dropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full" />
      </a>

      {/* Dropdown Menu - 始终渲染，用opacity控制 */}
      <div style={{ 
        opacity: dropdownOpen ? 1 : 0,
        pointerEvents: dropdownOpen ? 'auto' : 'none',
        transition: 'opacity 0.15s ease-out'
      }}>
        <ProductsDropdown
          categories={categories}
          currentProductId={currentProductId}
          isOpen={dropdownOpen}
          onMouseEnter={handleDropdownOpen}
          onMouseLeave={handleDropdownClose}
        />
      </div>
    </div>
  );
}

// 使用memo包裹，只在props改变时才重新渲染
export default memo(ProductsDropdownContainerComponent);
