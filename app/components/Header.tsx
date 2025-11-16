"use client";

import { useState, useEffect } from "react";

interface HeaderProps {
  readonly lightBackground?: boolean; // If light background, text defaults to black
}

export default function Header({ lightBackground = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 当滚动超过100px时显示背景色
          setIsScrolled(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    // 标记为已加载，触发动画
    setIsLoaded(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgb(229, 231, 235)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none',
      }}>
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8" style={{ maxWidth: '1450px' }}>
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 mr-8">
            <span 
              className="text-2xl font-bold whitespace-nowrap transition-colors duration-300"
              style={{ color: isScrolled || lightBackground ? '#111827' : '#ffffff' }}
            >
              CO-Grow Machinery Co.,Ltd
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{ color: isScrolled || lightBackground ? '#374151' : '#ffffff' }}
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

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12 lg:ml-16">
          <a
            href="/"
            className="nav-link relative text-sm font-semibold leading-6 will-change-auto"
            style={{ 
              color: isScrolled || lightBackground ? '#111827' : '#ffffff',
              transition: 'color 0.2s ease'
            }}
          >
            HOME
            <span className="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300" style={{ background: 'linear-gradient(to right, #9333ea, #3b82f6)' }} />
          </a>

          <a
            href="/about-us"
            className="nav-link relative text-sm font-semibold leading-6 will-change-auto"
            style={{ 
              color: isScrolled || lightBackground ? '#111827' : '#ffffff',
              transition: 'color 0.2s ease'
            }}
          >
            ABOUT US
            <span className="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300" style={{ background: 'linear-gradient(to right, #9333ea, #3b82f6)' }} />
          </a>
          
          <a
            href="/products"
            className="nav-link relative text-sm font-semibold leading-6 will-change-auto"
            style={{ 
              color: isScrolled || lightBackground ? '#111827' : '#ffffff',
              transition: 'color 0.2s ease'
            }}
          >
            PRODUCTS
            <span className="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300" style={{ background: 'linear-gradient(to right, #9333ea, #3b82f6)' }} />
          </a>
          
          <a
            href="/download"
            className="nav-link relative text-sm font-semibold leading-6 will-change-auto"
            style={{ 
              color: isScrolled || lightBackground ? '#111827' : '#ffffff',
              transition: 'color 0.2s ease'
            }}
          >
            DOWNLOAD
            <span className="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300" style={{ background: 'linear-gradient(to right, #9333ea, #3b82f6)' }} />
          </a>
          
          <a
            href="/contact-us"
            className="nav-link relative text-sm font-semibold leading-6 will-change-auto"
            style={{ 
              color: isScrolled || lightBackground ? '#111827' : '#ffffff',
              transition: 'color 0.2s ease'
            }}
          >
            CONTACT US
            <span className="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300" style={{ background: 'linear-gradient(to right, #9333ea, #3b82f6)' }} />
          </a>
        </div>

        {/* Right side buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">

        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileMenuOpen ? '384px' : '0',
          opacity: mobileMenuOpen ? 1 : 0
        }}
      >
        <div className="space-y-2 px-6 pb-6 pt-2">
          <a
            href="#"
            className="mobile-link block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
          >
            HOME
          </a>
          <a
            href="/about-us"
            className="mobile-link block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
          >
            ABOUT US
          </a>
          <a
            href="/download"
            className="mobile-link block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
          >
            DOWNLOAD
          </a>
          <a
            href="/products"
            className="mobile-link block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
          >
            PRODUCTS
          </a>
          <a
            href="/contact-us"
            className="mobile-link block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
          >
            CONTACT US
          </a>
        </div>
      </div>
      <style jsx>{`
        .nav-link:hover .nav-underline {
          width: 100%;
        }
        .nav-link:hover {
          color: #9333ea !important;
        }
        .mobile-link {
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .mobile-link:hover {
          background-color: #f3e8ff;
          color: #9333ea;
        }
        .mobile-link:active {
          transform: scale(0.98);
        }
      `}</style>
    </header>
  );
}

