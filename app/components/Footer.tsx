"use client";

const footerLinks = {
  Platform: [
    "Personalization Studio",
    "AI Agents",
    "Composable CDP",
    "Predict",
    "Identity+",
    "Match+",
    "Integrations",
    "Pricing",
    "Log In",
  ],
  Solutions: [
    "Customer Marketing",
    "Performance Marketing",
    "Data & Technology",
    "Retail",
    "Travel & Hospitality",
    "Subscription",
    "Marketplace",
    "Customer Success",
  ],
  Resources: [
    "Case Studies",
    "Blog",
    "Data Unlocked",
    "Guides",
    "Webinars",
    "Recipes",
    "Documentation",
  ],
  Company: [
    "About Us",
    "Partners",
    "Newsroom",
    "Careers",
    "Contact Us",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Footer links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4 text-gray-300">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
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
            <span className="text-sm text-gray-400">@Guangzhou Xiefeng Machinery, 2025</span>
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

