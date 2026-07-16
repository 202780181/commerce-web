"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

interface SearchResultItem {
  id: number | string;
  type: string;
  title: string;
  content: string;
  cover_url?: string;
  url: string;
}

interface SearchResponse {
  code: number;
  message: string;
  data: {
    products: SearchResultItem[];
    categories: SearchResultItem[];
    pages: SearchResultItem[];
    total: number;
  };
}

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  // Store raw grouped data instead of flattened list
  const [groupedResults, setGroupedResults] = useState<{
    products: SearchResultItem[];
    categories: SearchResultItem[];
    pages: SearchResultItem[];
  }>({ products: [], categories: [], pages: [] });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K or F to open
      if (
        ((e.metaKey || e.ctrlKey) && e.key === "k") ||
        (e.key === "f" &&
          !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName))
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
      // Esc to close
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll and focus input when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setGroupedResults({ products: [], categories: [], pages: [] });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Load search history
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("searchHistory")
        : null;
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query.trim());
      } else {
        setGroupedResults({ products: [], categories: [], pages: [] });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const saveHistory = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const next = [term, ...prev.filter((item) => item !== term)].slice(0, 8);
      if (typeof window !== "undefined") {
        localStorage.setItem("searchHistory", JSON.stringify(next));
      }
      return next;
    });
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      const limit = 10;
      const response = await fetch(
        `/api/proxy/portal/search?keyword=${encodeURIComponent(searchQuery)}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const responseData: SearchResponse = await response.json();
      console.log("Search results raw:", responseData);

      if (responseData.code === 0 && responseData.data) {
        setGroupedResults({
          products: responseData.data.products || [],
          categories: responseData.data.categories || [],
          pages: responseData.data.pages || [],
        });
      } else {
        setGroupedResults({ products: [], categories: [], pages: [] });
      }
    } catch (error) {
      console.error("Search error:", error);
      setGroupedResults({ products: [], categories: [], pages: [] });
    } finally {
      setLoading(false);
    }
  };

  const trendingKeywords = ["Products", "Industrial robot", "CNC", "DeepSeek"];

  const hasResults =
    groupedResults.products.length > 0 ||
    groupedResults.categories.length > 0 ||
    groupedResults.pages.length > 0;

  const renderSection = (title: string, items: SearchResultItem[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4 last:mb-0">
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          {title}
        </div>
        <div className="space-y-1">
          {items.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.url}
              onClick={() => {
                saveHistory(query);
                setIsOpen(false);
              }}
              className="flex items-start px-3 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer group transition-colors mx-1"
            >
              <div className="flex-shrink-0 w-10 h-10 mr-3 rounded-md overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                {item.cover_url ? (
                  <img
                    src={item.cover_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.type === "category" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    )}
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                  {item.title}
                </div>
                {item.content && (
                  <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                    {item.content.replace(/\n/g, " ")}
                  </div>
                )}
              </div>
              <div className="ml-2 pt-2 text-gray-400 group-hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[60]"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative z-[70] h-9 w-[200px]">
        <motion.div
          layoutId="search-container"
          ref={containerRef}
          className={`
            flex flex-col overflow-hidden text-left
            ${
              isOpen
                ? "absolute top-0 left-0 w-[450px] bg-white text-gray-900 shadow-2xl rounded-xl ring-1 ring-black/5 min-h-[56px]"
                : "absolute top-0 left-0 w-full h-full bg-gray-50/50 text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-900 rounded-md cursor-text items-center justify-center border"
            }
          `}
          style={{ transformOrigin: "top left" }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          {/* Top Bar / Trigger Area */}
          <div
            className={`flex items-center w-full ${isOpen ? "p-3 border-b border-gray-100 h-14" : "h-full px-3"}`}
          >
            <motion.svg
              className={`flex-shrink-0 ${isOpen ? "w-5 h-5 text-gray-400 mr-3" : "w-4 h-4 text-gray-400 mr-2"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </motion.svg>

            {isOpen ? (
              <motion.input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find products, documents, more..."
                className="flex-1 text-base bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 h-full min-w-0"
                autoComplete="off"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              />
            ) : (
              <motion.span
                className="text-sm flex-1 truncate select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Find...
              </motion.span>
            )}

            {/* Right side icons/buttons */}
            {isOpen ? (
              <div className="flex items-center gap-2">
                {loading && (
                  <div className="w-4 h-4 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="ml-2 px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded border border-gray-200 transition-colors"
                >
                  ESC
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center">
                <kbd className="h-5 px-1.5 pt-[1px] text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded shadow-sm font-sans flex items-center justify-center">
                  F
                </kbd>
              </div>
            )}
          </div>

          {/* Expanded Content (Results) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 500 }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full bg-white flex flex-col h-[500px]"
              >
                <div className="overflow-y-auto custom-scrollbar flex-1 p-2 border-t border-gray-100">
                  {/* Results */}
                  {!loading && query && hasResults && (
                    <div className="pb-2">
                      {renderSection("Products", groupedResults.products)}
                      {renderSection("Categories", groupedResults.categories)}
                      {renderSection("Pages", groupedResults.pages)}
                    </div>
                  )}

                  {/* Empty State */}
                  {!loading && query && !hasResults && (
                    <div className="py-8 text-center text-gray-500">
                      <p>
                        No results for "
                        <span className="text-gray-900 font-medium">
                          {query}
                        </span>
                        "
                      </p>
                    </div>
                  )}

                  {/* Default State (History & Trending) */}
                  {!query && !loading && (
                    <div className="space-y-4 pt-2">
                      {recentSearches.length > 0 && (
                        <div>
                          <div className="px-3 mb-1 flex items-center justify-between">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Recent
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setRecentSearches([]);
                                localStorage.removeItem("searchHistory");
                              }}
                              className="text-xs text-blue-500 hover:text-blue-600"
                            >
                              Clear
                            </button>
                          </div>
                          <div>
                            {recentSearches.map((item) => (
                              <button
                                key={item}
                                onClick={() => {
                                  setQuery(item);
                                  inputRef.current?.focus();
                                }}
                                className="w-full flex items-center px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors text-left"
                              >
                                <svg
                                  className="w-4 h-4 mr-3 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="px-3 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Suggested
                        </h3>
                        <div>
                          {trendingKeywords.map((keyword) => (
                            <button
                              key={keyword}
                              onClick={() => {
                                setQuery(keyword);
                                inputRef.current?.focus();
                              }}
                              className="w-full flex items-center px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors text-left"
                            >
                              <svg
                                className="w-4 h-4 mr-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                              </svg>
                              {keyword}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex items-center justify-between sticky bottom-0 bg-gray-50">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="font-sans px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm">
                        ↑
                      </kbd>
                      <kbd className="font-sans px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm">
                        ↓
                      </kbd>
                      <span>navigate</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="font-sans px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm">
                        ↵
                      </kbd>
                      <span>select</span>
                    </span>
                  </div>
                  <span>Search by CO-Grow</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
