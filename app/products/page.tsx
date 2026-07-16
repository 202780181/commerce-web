"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { usePageCache } from "../hooks/usePageCache";
import { useCategories } from "../contexts/CategoriesContext";
import FolderIcon from "../components/FolderIcon";

export default function Products() {
  usePageCache();
  const { categories, loading } = useCategories();

  // 只显示顶级分类 (parent_id === 0)
  const topCategories = categories.filter((cat) => cat.parent_id === 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header lightBackground={true} />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-gradient-to-br from-blue-900/90 via-cyan-900/80 to-blue-800/90 mt-[72px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/products/producton-banner.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-cyan-900/30 to-blue-800/40" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center z-20">
          <div
            className="mx-auto px-6 lg:px-8 text-center"
            style={{ maxWidth: "1450px" }}
          >
            {/* You can add title/subtitle here if needed */}
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover our best-selling products, trusted by thousands of
              customers
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg h-full block"
                >
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <div className="p-4 border-t border-gray-100">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {topCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/${category.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full block group"
                >
                  {/* Category Image */}
                  <div className="relative h-48 bg-linear-to-br overflow-hidden flex items-center justify-center">
                    {category.cover_url ? (
                      <img
                        src={category.cover_url}
                        alt={category.name}
                        className="w-full h-full object-contain scale-[0.9] group-hover:scale-100 transition-transform duration-500 select-none pointer-events-none"
                        loading="lazy"
                      />
                    ) : (
                      <FolderIcon className="w-24 h-24" />
                    )}
                  </div>
                  {/* Category Info */}
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 h-12">
                      {category.name}
                    </h3>
                    {category.children && (
                      <p className="text-xs text-gray-500 mt-1">
                        {category.children.length} subcategories
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Hide scrollbar CSS */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
      <Footer />
    </div>
  );
}
