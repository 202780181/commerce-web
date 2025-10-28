"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface HeaderProps {
  readonly lightBackground?: boolean; // 如果是浅色背景，文字默认黑色
}

export default function Header({ lightBackground = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 当滚动超过100px时显示背景色
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
      : "bg-transparent border-b border-transparent"
      }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Simon AI
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${isScrolled || lightBackground ? "text-gray-700" : "text-white"
              }`}
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
        <div className="hidden lg:flex lg:gap-x-12">
          <motion.a
            href="/"
            className={`relative text-sm font-semibold leading-6 transition-colors ${isScrolled || lightBackground ? "text-gray-900 hover:text-purple-600" : "text-white hover:text-purple-300"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            HOME
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="/about-us"
            className={`relative text-sm font-semibold leading-6 transition-colors ${isScrolled || lightBackground ? "text-gray-900 hover:text-purple-600" : "text-white hover:text-purple-300"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ABOUT US
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#"
            className={`relative text-sm font-semibold leading-6 transition-colors ${isScrolled || lightBackground ? "text-gray-900 hover:text-purple-600" : "text-white hover:text-purple-300"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            NEWS
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href="#"
            className={`relative text-sm font-semibold leading-6 transition-colors ${isScrolled || lightBackground ? "text-gray-900 hover:text-purple-600" : "text-white hover:text-purple-300"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PRODUCTS
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href="/contact-us"
            className={`relative text-sm font-semibold leading-6 transition-colors ${isScrolled || lightBackground ? "text-gray-900 hover:text-purple-600" : "text-white hover:text-purple-300"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTACT US
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>

        {/* Right side buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">

        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden"
        >
          <div className="space-y-2 px-6 pb-6 pt-2">
            <motion.a
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              HOME
            </motion.a>
            <motion.a
              href="/about-us"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              ABOUT US
            </motion.a>
            <motion.a
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              NEWS
            </motion.a>
            <motion.a
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              PROJECT
            </motion.a>
            <motion.a
              href="/contact-us"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              CONTACT US
            </motion.a>
          </div>
        </motion.div>
      )}
    </header>
  );
}

