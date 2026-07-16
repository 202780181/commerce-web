"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Phone, ChevronUp, BookOpen, Download } from "lucide-react";

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
  action?: () => void;
}

export default function FloatingSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 当页面滚动超过300px时显示Top按钮
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const downloadCatalog = () => {
    const pdfUrl =
      "https://cdn.gzxfjxyxgs.com/download/ZPPCNC%20Zero%20Point%20Clamping%202026%281%29.pdf";
    window.open(pdfUrl, "_blank");
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: "phone",
      icon: <Phone size={24} />,
      label: "Phone",
      content: (
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">Contact Phone</p>
          <p className="text-lg font-bold text-blue-600">+86 15915853159</p>
          <p className="text-xs text-gray-500 mt-2">Mon-Fri 9:00-18:00</p>
        </div>
      ),
    },
    {
      id: "email",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      label: "Email",
      content: (
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">Email Us</p>
          <a
            href="mailto:mkdch@126.com"
            className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            mkdch@126.com
          </a>
          <p className="text-xs text-gray-500 mt-2">
            We'll reply within 24 hours
          </p>
        </div>
      ),
      action: () => {
        if (window.location.pathname === "/contact-us") {
          // 如果已经在联系页面，直接滚动
          window.scrollTo({ top: 500, behavior: "smooth" });
        } else {
          // 如果不在联系页面，先导航再滚动
          window.location.href = "/contact-us#contact-info";
        }
      },
    },
    {
      id: "whatsapp",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-label="WhatsApp"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M12.04 2C6.56 2 2.1 6.46 2.1 11.94c0 1.93.5 3.82 1.45 5.49L2 22l4.72-1.51a9.9 9.9 0 0 0 5.32 1.46h.01c5.48 0 9.94-4.46 9.94-9.94C21.99 6.46 17.53 2 12.04 2zm5.8 14.06c-.25.7-1.47 1.36-2.02 1.44-.52.08-1.18.12-1.9-.12-.44-.14-1.01-.33-1.74-.65-3.06-1.32-5.05-4.37-5.2-4.57-.14-.2-1.24-1.65-1.24-3.15 0-1.5.78-2.24 1.06-2.54.27-.3.6-.37.8-.37h.58c.18 0 .42-.07.65.5.25.62.84 2.16.92 2.32.08.16.13.35.02.56-.1.2-.16.35-.33.54-.16.2-.35.43-.5.58-.16.16-.33.33-.14.65.2.33.86 1.42 1.84 2.3 1.27 1.13 2.34 1.49 2.67 1.65.33.16.52.14.72-.08.2-.22.82-.96 1.04-1.29.22-.33.44-.27.74-.16.3.12 1.9.9 2.23 1.06.33.16.55.25.63.39.08.14.08.8-.17 1.5z"
          />
        </svg>
      ),
      label: "WhatsApp",
      content: (
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">WhatsApp</p>
          <p className="text-lg font-bold text-green-600">+86 15915853159</p>
          <p className="text-xs text-gray-500 mt-2">Chat with us on WhatsApp</p>
        </div>
      ),
      action: () => {
        window.open("https://wa.me/8615915853159", "_blank");
      },
    },
    {
      id: "catalog",
      icon: <BookOpen size={24} />,
      label: "Catalog",
      content: (
        <div className="text-center">
          <p className="text-sm font-semibold mb-3">Product Catalog</p>
          <button
            onClick={downloadCatalog}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 w-full flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download PDF
          </button>
          <p className="text-xs text-gray-500 mt-3">2026 Edition</p>
        </div>
      ),
    },
    {
      id: "top",
      icon: <ChevronUp size={24} />,
      label: "Top",
      content: null,
      action: scrollToTop,
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      {/* Sidebar */}
      <div className="bg-slate-700 rounded-l-xl shadow-2xl overflow-visible">
        {sidebarItems.map((item, index) => {
          // 如果是Top按钮，使用AnimatePresence处理动画
          if (item.id === "top") {
            return (
              <AnimatePresence key={item.id}>
                {showTopButton && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.8 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative group overflow-hidden"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <motion.button
                      onClick={item.action}
                      className="w-16 h-16 flex flex-col items-center justify-center text-white hover:bg-slate-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="mb-1">{item.icon}</div>
                      <span className="text-xs font-medium">{item.label}</span>
                    </motion.button>

                    {/* Popup Content for Top button */}
                    <AnimatePresence>
                      {hoveredItem === item.id && item.content && (
                        <motion.div
                          initial={{ opacity: 0, x: 10, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white rounded-lg shadow-2xl p-4 min-w-[200px] z-10"
                        >
                          {/* Arrow */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
                          </div>

                          {item.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          }

          return (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.button
                onClick={item.action}
                className={`w-16 h-16 flex flex-col items-center justify-center text-white hover:bg-slate-600 transition-all duration-300 cursor-pointer ${
                  index < sidebarItems.length - 1
                    ? "border-b border-slate-600"
                    : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="mb-1">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>

              {/* Popup Content */}
              <AnimatePresence>
                {hoveredItem === item.id && item.content && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white rounded-lg shadow-2xl p-4 min-w-[200px] z-10"
                  >
                    {/* Arrow */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
                    </div>

                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
