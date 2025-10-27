"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Simon AI
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
          <div className="relative group">
            <button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Platform
              <svg
                className="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Solutions
              <svg
                className="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Customers
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Resources
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Company
          </a>
        </div>

        {/* Right side buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in
          </a>
          <a
            href="#"
            className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            Talk to us
          </a>
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
            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Platform
            </a>
            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Solutions
            </a>
            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Customers
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}

