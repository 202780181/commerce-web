"use client";

const footerLinks = {
  Navigation: [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "NEWS", href: "/news" },
    { name: "PRODUCTS", href: "/products" },
    { name: "CONTACT US", href: "/contact-us" },
  ],
};

export default function Footer() {
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
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">@CO-Grow Machinery Co.,Ltd, 2025</span>
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

