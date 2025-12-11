"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { getAllProducts, Product } from "../lib/productConfig";

interface HeaderProps {
  readonly lightBackground?: boolean; // If light background, text defaults to black
}

export default function Header({ lightBackground = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  
  const loadProducts = useCallback(() => {
    setProducts(prev => {
      if (prev.length > 0) return prev;
      return getAllProducts();
    });
  }, []);

  // 在页面加载后尽快加载数据，但不阻塞首次渲染
  useEffect(() => {
    const timer = setTimeout(loadProducts, 0);
    return () => clearTimeout(timer);
  }, [loadProducts]);
  
  // 获取当前产品ID
  const currentProductId = pathname?.startsWith('/products/') 
    ? pathname.split('/')[2] 
    : null;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初始检查

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };

    if (productsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [productsDropdownOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-200 ${isScrolled ? 'bg-white border-b border-gray-200 shadow-sm' : 'bg-transparent border-b-0 shadow-none'}`}
    >
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8 h-full max-w-[1450px] lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="-m-1.5 p-1.5">
            <span className={`text-2xl font-bold whitespace-nowrap transition-colors duration-200 ${isScrolled || lightBackground ? 'text-gray-900' : 'text-white'}`}>
              CO-Grow Machinery Co.,Ltd
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors duration-200 ${isScrolled || lightBackground ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Search and right side buttons */}
        {/* <div className="hidden lg:flex lg:items-center lg:justify-center">
          <SearchBar />
        </div> */}

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12 justify-center">
          <a href="/" className={`relative font-semibold text-sm transition-colors duration-200 ${isScrolled || lightBackground ? 'text-gray-900' : 'text-white'} hover:text-purple-600`}>
            HOME
            <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/about-us" className={`relative font-semibold text-sm transition-colors duration-200 ${isScrolled || lightBackground ? 'text-gray-900' : 'text-white'} hover:text-purple-600`}>
            ABOUT US
            <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full" />
          </a>
          
          {/* Products Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => {
              setProductsDropdownOpen(true);
              loadProducts();
            }}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <a 
              href="/products" 
              className={`relative font-semibold text-sm transition-colors duration-200 flex items-center gap-1 ${isScrolled || lightBackground ? 'text-gray-900' : 'text-white'} hover:text-purple-600`}
            >
              PRODUCTS
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Dropdown Menu with Bridge */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-5 transition-all duration-300 ease-out ${
                productsDropdownOpen 
                  ? 'opacity-100 pointer-events-auto' 
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <div 
                className={`w-[1000px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out origin-top ${
                  productsDropdownOpen 
                    ? 'scale-100' 
                    : 'scale-95'
                }`}
              >
                <div className="p-6">
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Product Categories</h3>
                    <p className="text-sm text-gray-500">Explore our complete range of precision machinery</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-purple-600 [&::-webkit-scrollbar-thumb]:to-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:from-purple-700 [&::-webkit-scrollbar-thumb]:hover:to-blue-600">
                    {categories.map((category) => {
                      const isActive = currentProductId === String(category.id);
                      return (
                      <a
                        key={category.id}
                        href={`/products/${category.id}`}
                        className={`group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 border ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300 shadow-sm' 
                            : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 border-transparent hover:border-purple-200'
                        }`}
                        onClick={() => setProductsDropdownOpen(false)}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          {category.cover_url ? (
                            <img 
                              src={category.cover_url} 
                              alt={category.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm transition-colors truncate ${
                            isActive ? 'text-purple-600' : 'text-gray-900 group-hover:text-purple-600'
                          }`}>
                            {category.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            click to details
                          </div>
                        </div>
                        <svg 
                          className={`w-4 h-4 transition-all flex-shrink-0 mt-1 ${
                            isActive 
                              ? 'text-purple-600 translate-x-1' 
                              : 'text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1'
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
          </div>

          <a href="/download" className={`relative font-semibold text-sm transition-colors duration-200 ${isScrolled || lightBackground ? 'text-gray-900' : 'text-white'} hover:text-purple-600`}>
            DOWNLOAD
            <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/contact-us" className={`relative font-semibold text-sm transition-colors duration-200 ${isScrolled || lightBackground ? 'text-gray-900' : 'text-white'} hover:text-purple-600`}>
            CONTACT US
            <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-2 px-6 pb-6 pt-2">
          <a
            href="/"
            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 transition-colors duration-200 hover:bg-purple-100 hover:text-purple-600"
          >
            HOME
          </a>
          <a
            href="/about-us"
            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 transition-colors duration-200 hover:bg-purple-100 hover:text-purple-600"
          >
            ABOUT US
          </a>
          <a
            href="/download"
            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 transition-colors duration-200 hover:bg-purple-100 hover:text-purple-600"
          >
            DOWNLOAD
          </a>
          <a
            href="/products"
            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 transition-colors duration-200 hover:bg-purple-100 hover:text-purple-600"
          >
            PRODUCTS
          </a>
          <a
            href="/contact-us"
            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 transition-colors duration-200 hover:bg-purple-100 hover:text-purple-600"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </header>
  );
}