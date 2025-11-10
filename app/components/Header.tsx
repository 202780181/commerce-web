"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface HeaderProps {
  readonly lightBackground?: boolean; // If light background, text defaults to black
}

export default function Header({ lightBackground = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 当滚动超过100px时显示背景色
      setIsScrolled(window.scrollY > 100);
    };

    // 标记为已加载，触发动画
    setIsLoaded(true);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
        : "bg-transparent border-b border-transparent"
      }`}>
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8" style={{ maxWidth: '1450px' }}>
        {/* Logo */}
        <motion.div
          className="flex lg:flex-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <a href="/" className="-m-1.5 p-1.5 mr-8">
            <span className={`text-2xl font-bold whitespace-nowrap transition-colors ${isScrolled || lightBackground ? "text-gray-900" : "text-white"}`}>
              CO-Grow Machinery Co.,Ltd
            </span>
          </a>
        </motion.div>

        {/* Mobile menu button */}
        <motion.div
          className="flex lg:hidden"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12 lg:ml-16">
          <motion.a
            href="/"
            className={`relative text-sm font-semibold leading-6 transition-colors ${isScrolled || lightBackground ? "text-gray-900 hover:text-purple-600" : "text-white hover:text-purple-300"
              }`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
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
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
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
            href="/products"
            className={`relative text-sm font-semibold leading-6 transition-colors ${isScrolled || lightBackground ? "text-gray-900 hover:text-purple-600" : "text-white hover:text-purple-300"
              }`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
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
            href="/download"
            className={`relative text-sm font-semibold leading-6 transition-colors ${isScrolled || lightBackground ? "text-gray-900 hover:text-purple-600" : "text-white hover:text-purple-300"
              }`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DOWNLOAD
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
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
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
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="space-y-2 px-6 pb-6 pt-2">
            <motion.a
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              HOME
            </motion.a>
            <motion.a
              href="/about-us"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileTap={{ scale: 0.98 }}
            >
              ABOUT US
            </motion.a>
            <motion.a
              href="/download"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileTap={{ scale: 0.98 }}
            >
              DOWNLOAD
            </motion.a>
            <motion.a
              href="/products"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              whileTap={{ scale: 0.98 }}
            >
              PRODUCTS
            </motion.a>
            <motion.a
              href="/contact-us"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-colors"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileTap={{ scale: 0.98 }}
            >
              CONTACT US
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

