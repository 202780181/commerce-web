"use client";

import { useState, useEffect, useRef } from 'react';
import { searchProducts } from '../lib/algolia';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

interface SearchResult {
  objectID: string;
  type: 'product' | 'detail';
  id?: string;
  name?: string;
  detailName?: string;
  coverImage?: string;
  imageUrl?: string;
  url: string;
}

interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 搜索防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query.trim());
      } else {
        setResults([]);
        setIsOpen(isFocused);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, isFocused]);

  // 加载搜索记录
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('searchHistory') : null;
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trendingKeywords = [
    'Products',
    'SSL certificate',
    'Server',
    'Object storage',
    'Industrial robot',
    'DeepSeek',
  ];

  const saveHistory = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const next = [term, ...prev.filter((item) => item !== term)].slice(0, 8);
      if (typeof window !== 'undefined') {
        localStorage.setItem('searchHistory', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      const response = await searchProducts(searchQuery);
      setResults(response.hits as SearchResult[]);
      setIsOpen(true);
      if ((response.hits?.length ?? 0) > 0) {
        saveHistory(searchQuery);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    onClose?.();
  };

  const focusInput = () => {
    inputRef.current?.focus();
    setIsFocused(true);
    if (query.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(true);
    }
  };

  const expanded = isFocused || query.trim().length > 0 || isOpen;
  const showHistory = isOpen && !query.trim();

  return (
    <div
      ref={searchRef}
      className={`relative w-full max-w-[260px] lg:max-w-[340px] origin-center transition-transform duration-200 ${expanded ? 'scale-[1.05]' : 'scale-100'}`}
    >
      {/* 搜索输入框 */}
      <div className="relative">
        <button
          type="button"
          aria-label="搜索"
          onClick={() => {
            if (query.trim()) {
              handleSearch(query.trim());
            } else {
              focusInput();
            }
          }}
          className="absolute inset-y-0 left-3 flex h-full items-center text-purple-600 transition hover:text-purple-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" />
          </svg>
        </button>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={focusInput}
          placeholder="搜索产品..."
          className="w-full rounded-none border border-purple-200/80 bg-white/80 pl-12 pr-14 py-2.5 text-sm text-gray-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:ring-offset-1 focus:ring-offset-white placeholder:text-gray-400"
        />
        {loading && (
          <div className="absolute inset-y-0 right-4 flex items-center">
            <div className="h-4 w-4 animate-spin rounded-full border-[2px] border-purple-500/20 border-t-purple-500"></div>
          </div>
        )}
        {!loading && query && (
          <button
            aria-label="清空搜索"
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(true);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 transition hover:text-gray-600"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* 搜索结果下拉框 */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <div className="py-2">
              {results.map((result) => (
                <Link
                  key={result.objectID}
                  href={result.url}
                  onClick={handleResultClick}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 mr-3">
                    {(result.imageUrl || result.coverImage) ? (
                      <img
                        src={result.imageUrl || result.coverImage}
                        alt={result.name || result.detailName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {result.type === 'product' ? result.name : result.detailName}
                    </div>
                    {result.type === 'detail' && (
                      <div className="text-xs text-gray-500 truncate">
                        in {result.name}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      result.type === 'product' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {result.type === 'product' ? 'Product' : 'Detail'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 搜索历史 */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] min-w-[420px] max-w-[96vw] bg-gradient-to-br from-[#eef2ff] via-white to-[#fff7eb] border border-gray-200/70 z-50 rounded-sm shadow-lg"
          >
            <div className="px-6 py-5 space-y-6 text-gray-800">
              <div className="space-y-2">
                <div className="text-base font-semibold text-[#5b6ea7]">Trending searches</div>
                <div className="flex flex-wrap gap-4 leading-7">
                  {trendingKeywords.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setQuery(item);
                        handleSearch(item);
                      }}
                      className="text-base text-gray-800 transition hover:text-purple-700"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold text-[#5b6ea7]">Search history</div>
                    <button
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      onClick={() => {
                        setRecentSearches([]);
                        if (typeof window !== 'undefined') {
                          localStorage.removeItem('searchHistory');
                        }
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {recentSearches.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setQuery(item);
                          handleSearch(item);
                        }}
                        className="rounded border border-gray-200 bg-gray-100 px-3 py-1 text-sm text-gray-800 transition hover:border-purple-200 hover:bg-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 无结果提示 */}
      <AnimatePresence>
        {isOpen && query.trim() && !loading && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div className="px-4 py-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No results found for "{query}"</p>
            </div>
					</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
