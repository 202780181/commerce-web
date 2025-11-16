"use client";

import { useState, useEffect } from "react";

interface HeaderProps {
  readonly lightBackground?: boolean; // If light background, text defaults to black
}

export default function Header({ lightBackground = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初始检查
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'header-scrolled' : 'header-top'}`}
      style={{ height: '72px' }}
    >
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8 h-full" style={{ maxWidth: '1450px' }}>
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 mr-8">
            <span className={`text-2xl font-bold whitespace-nowrap logo-text ${isScrolled || lightBackground ? 'logo-dark' : 'logo-light'}`}>
              CO-Grow Machinery Co.,Ltd
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 menu-button ${isScrolled || lightBackground ? 'menu-dark' : 'menu-light'}`}
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
          <a href="/" className={`nav-link ${isScrolled || lightBackground ? 'nav-dark' : 'nav-light'}`}>
            HOME
            <span className="nav-underline" />
          </a>

          <a href="/about-us" className={`nav-link ${isScrolled || lightBackground ? 'nav-dark' : 'nav-light'}`}>
            ABOUT US
            <span className="nav-underline" />
          </a>
          
          <a href="/products" className={`nav-link ${isScrolled || lightBackground ? 'nav-dark' : 'nav-light'}`}>
            PRODUCTS
            <span className="nav-underline" />
          </a>
          
          <a href="/download" className={`nav-link ${isScrolled || lightBackground ? 'nav-dark' : 'nav-light'}`}>
            DOWNLOAD
            <span className="nav-underline" />
          </a>
          
          <a href="/contact-us" className={`nav-link ${isScrolled || lightBackground ? 'nav-dark' : 'nav-light'}`}>
            CONTACT US
            <span className="nav-underline" />
          </a>
        </div>

        {/* Right side buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">

        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
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
        header {
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .header-scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid rgb(229, 231, 235);
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        .header-top {
          background-color: transparent;
          border-bottom: 1px solid transparent;
          box-shadow: none;
        }
        .logo-text {
          transition: color 0.2s ease;
        }
        .logo-dark { color: #111827; }
        .logo-light { color: #ffffff; }
        .menu-dark { color: #374151; }
        .menu-light { color: #ffffff; }
        .nav-link {
          position: relative;
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1.5rem;
          transition: color 0.2s ease;
        }
        .nav-dark { color: #111827; }
        .nav-light { color: #ffffff; }
        .nav-link:hover { color: #9333ea !important; }
        .nav-underline {
          position: absolute;
          bottom: -0.25rem;
          left: 0;
          height: 0.125rem;
          width: 0;
          background: linear-gradient(to right, #9333ea, #3b82f6);
          transition: width 0.3s ease;
        }
        .nav-link:hover .nav-underline {
          width: 100%;
        }
        .mobile-menu {
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }
        .mobile-menu-open {
          max-height: 384px;
          opacity: 1;
        }
        .mobile-menu-closed {
          max-height: 0;
          opacity: 0;
        }
        .mobile-link {
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .mobile-link:hover {
          background-color: #f3e8ff;
          color: #9333ea;
        }
      `}</style>
    </header>
  );
}

