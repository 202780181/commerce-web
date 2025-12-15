"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const footerLinks = {
  Navigation: [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "NEWS", href: "/download" },
    { name: "PRODUCTS", href: "/products" },
    { name: "CONTACT US", href: "/contact-us" },
  ],
};

const PLATFORM_STYLES: Record<string, { icon: React.ReactNode; color: string; }> = {
  wechat: {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.5 3C4.358 3 1 5.948 1 9.6c0 2.004 1.053 3.793 2.707 4.997-.122.453-.453 1.657-.578 2.15-.055.22.085.434.308.434.123 0 .262-.055.385-.11l2.16-1.152c.646.164 1.348.262 2.073.262.358 0 .702-.027 1.046-.082-.055-.22-.083-.453-.083-.687 0-3.322 3.002-6.013 6.706-6.013.44 0 .866.041 1.278.11C16.258 5.683 12.756 3 8.5 3zm-.963 3.532c.508 0 .935.426.935.935s-.427.936-.935.936c-.509 0-.936-.427-.936-.936s.427-.935.936-.935zm-4.348 0c.509 0 .936.426.936.935s-.427.936-.936.936c-.508 0-.935-.427-.935-.936s.427-.935.935-.935zM16.723 11c-3.175 0-5.747 2.233-5.747 4.987s2.572 4.986 5.747 4.986c.495 0 .962-.055 1.43-.165l1.65.88c.096.055.22.11.33.11.193 0 .303-.166.303-.385-.11-.44-.385-1.485-.495-1.898C21.043 18.35 22 16.906 22 15.153c0-2.837-2.572-5.153-5.747-5.153h-.03zm-3.255 3.366c.385 0 .715.33.715.715s-.33.715-.715.715c-.385 0-.715-.33-.715-.715s.33-.715.715-.715zm4.621 0c.385 0 .715.33.715.715s-.33.715-.715.715c-.385 0-.715-.33-.715-.715s.33-.715.715-.715z" />
      </svg>
    ),
    color: "from-green-400 to-emerald-500"
  },
  instagram: {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "from-pink-400 to-purple-500"
  },
  tiktok: {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "from-gray-700 to-slate-800"
  },
  youtube: {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "from-red-500 to-orange-500"
  },
  whatsapp: {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    color: "from-green-500 to-teal-500"
  }
};

interface Social {
  id: number;
  platform: string;
  url: string;
  qr_code_url: string;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/proxy/portal/config/basic');
        if (response.ok) {
          const result = await response.json();
          if (result.code === 0 && result.data && result.data.socials) {
            setSocials(result.data.socials);
          }
        }
      } catch (error) {
        console.error('Failed to fetch footer config:', error);
      }
    };
    fetchConfig();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto px-6 py-16 lg:px-8" style={{ maxWidth: '1450px' }}>
        {/* Footer links grid */}
        <div className="mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4 text-gray-300">
                {category}
              </h3>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-gray-400">@CO-Grow Machinery Co.,Ltd, 2025</span>

            {/* Social Media Icons */}
            <div className="flex gap-2">
              {socials.map((social) => {
                const style = PLATFORM_STYLES[social.platform.toLowerCase()] || {
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  ),
                  color: "from-gray-700 to-slate-800"
                };

                return (
                  <div
                    key={social.id}
                    className="relative"
                    onMouseEnter={() => setHoveredSocial(social.id)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    {/* Icon Button */}
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${style.color} flex items-center justify-center shadow-md transition-all text-white ${social.url ? 'cursor-pointer hover:shadow-lg' : 'cursor-default'}`}
                      onClick={() => {
                        if (social.url) window.open(social.url, '_blank');
                      }}
                    >
                      {style.icon}
                    </motion.div>

                  {/* Popup */}
                  <AnimatePresence>
                    {hoveredSocial === social.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50"
                      >
                        <div className="bg-white rounded-xl shadow-2xl p-4 border-2 border-gray-100 w-[180px]">
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2">
                            <div className="w-4 h-4 bg-white border-r-2 border-b-2 border-gray-100 transform rotate-45"></div>
                          </div>

                          {/* Content */}
                          <div className="text-center">
                            <div className="w-full aspect-square bg-gray-50 rounded-lg p-2 mb-2">
                              <img
                                src={social.qr_code_url}
                                alt={`${social.platform} QR Code`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-sm font-semibold text-gray-700">{social.platform}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            </div>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <button className="hover:text-white transition-colors">
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

