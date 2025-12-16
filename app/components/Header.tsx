"use client";

import { useState, useEffect, memo } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import ProductsDropdownContainer from "./ProductsDropdownContainer";
import { useCategories } from "../contexts/CategoriesContext";

interface HeaderProps {
  readonly lightBackground?: boolean; // If light background, text defaults to black
}

// 将导航链接提取为独立组件，避免不必要的重新渲染
const NavLink = memo(({ href, children, isScrolled, lightBackground }: { 
  href: string; 
  children: React.ReactNode; 
  isScrolled: boolean; 
  lightBackground: boolean;
}) => (
  <a 
    href={href} 
    className={`relative font-semibold text-sm ${isScrolled || lightBackground ? 'text-gray-900' : 'text-white'} hover:text-purple-600`}
  >
    {children}
    <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full" />
  </a>
));

export default function Header({ lightBackground = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { categories } = useCategories();

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = lastScrollY > 100;
          // 只在状态真正改变时才更新
          setIsScrolled(prev => {
            if (prev !== scrolled) {
              return scrolled;
            }
            return prev;
          });
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初始检查

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-200 ${
        isScrolled || lightBackground 
          ? 'bg-white border-b border-gray-200 shadow-sm' 
          : 'bg-transparent border-b-0 shadow-none'
      }`}
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
        <div className="hidden lg:flex lg:items-center lg:justify-start">
          <SearchBar />
        </div>
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12 justify-center">
          <NavLink href="/" isScrolled={isScrolled} lightBackground={lightBackground}>
            HOME
          </NavLink>
          <NavLink href="/about" isScrolled={isScrolled} lightBackground={lightBackground}>
            ABOUT US
          </NavLink>
          
          {/* Products Dropdown */}
          <ProductsDropdownContainer 
            isScrolled={isScrolled}
            lightBackground={lightBackground}
            pathname={pathname}
            categories={categories}
          />

          <NavLink href="/download" isScrolled={isScrolled} lightBackground={lightBackground}>
            DOWNLOADS
          </NavLink>
          <NavLink href="/contact-us" isScrolled={isScrolled} lightBackground={lightBackground}>
            CONTACT US
          </NavLink>
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