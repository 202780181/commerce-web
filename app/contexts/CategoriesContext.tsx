"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Category {
  id: number;
  parent_id: number;
  name: string;
  cover_url?: string;
  children?: Category[];
  product_count?: number;
  sort?: number;
}

interface Product {
  id: number;
  category_id: number;
  name: string;
  cover_url?: string;
  line_drawing_url?: string;
  description_url?: string;
}

interface CategoriesContextType {
  categories: Category[];
  products: Product[];
  loading: boolean;
  error: string | null;
  findCategoryById: (id: number) => Category | null;
  getProductsByCategoryId: (categoryId: number) => Product[];
  getBreadcrumb: (categoryId: number) => Category[];
  categoryProductsCache: Record<number, any[]>;
  setCategoryProductsCache: (categoryId: number, products: any[]) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined,
);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryProductsCache, setCategoryProductsCacheState] = useState<
    Record<number, any[]>
  >({});

  const setCategoryProductsCache = (categoryId: number, products: any[]) => {
    setCategoryProductsCacheState((prev) => ({
      ...prev,
      [categoryId]: products,
    }));
  };

  // 递归排序函数
  const sortCategories = (cats: Category[]): Category[] => {
    return cats
      .sort((a, b) => (a.sort || 0) - (b.sort || 0))
      .map((cat) => ({
        ...cat,
        children: cat.children ? sortCategories(cat.children) : undefined,
      }));
  };

  // 缓存键
  const CACHE_KEY = "COMMERCE_WEB_CATEGORIES_CACHE";
  const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. First trying to load from local storage
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          try {
            const { data, timestamp } = JSON.parse(cachedData);
            const now = Date.now();
            // Only use cache if it's not expired (or use it as stale-while-revalidate)
            // Here we use it immediately to speed up UI, then fetch fresh data
            if (data && Array.isArray(data)) {
              console.log("[CategoriesContext] Loading from cache");
              setCategories(sortCategories(data));
              setProducts([]);
              setLoading(false); // Valid cache found, stop loading
            }
          } catch (e) {
            console.error("[CategoriesContext] Error parsing cache:", e);
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // If no cache or we want to revalidate, continue to fetch
        // Note: We don't set loading=true here if we already showed cached data to avoid flickering
        if (!cachedData) {
          setLoading(true);
        }

        const response = await fetch("/api/proxy/portal/products/categories", {
          // Remove no-store to allow standard browser caching behavior if useful,
          // or keep it if we strictly rely on our localStorage logic.
          // Let's use 'default' or simply omit it to let browser decide,
          // but since we handle app-level cache, 'no-store' ensures we get fresh data from server layer for the update.
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to fetch categories");
        const result = await response.json();

        console.log("[CategoriesContext] Received data from API:", result);

        let categoriesData: Category[] = [];
        let productsData: Product[] = [];

        if (Array.isArray(result)) {
          categoriesData = result;
        } else if (result.code === 0 && result.data) {
          if (Array.isArray(result.data)) {
            categoriesData = result.data;
          } else {
            categoriesData = result.data.categories || [];
            productsData = result.data.products || [];
          }
        } else {
          throw new Error(result.message || "Invalid data format");
        }

        // Update State
        setCategories(sortCategories(categoriesData));
        setProducts(productsData);

        // Update Cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: categoriesData,
            timestamp: Date.now(),
          }),
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const findCategoryById = (id: number): Category | null => {
    const search = (cats: Category[]): Category | null => {
      for (const cat of cats) {
        if (cat.id === id) return cat;
        if (cat.children) {
          const found = search(cat.children);
          if (found) return found;
        }
      }
      return null;
    };
    return search(categories);
  };

  const getProductsByCategoryId = (categoryId: number): Product[] => {
    return products.filter((p) => p.category_id === categoryId);
  };

  const getBreadcrumb = (categoryId: number): Category[] => {
    const breadcrumb: Category[] = [];

    const findPath = (
      cats: Category[],
      targetId: number,
      path: Category[],
    ): boolean => {
      for (const cat of cats) {
        const newPath = [...path, cat];
        if (cat.id === targetId) {
          breadcrumb.push(...newPath);
          return true;
        }
        if (cat.children && findPath(cat.children, targetId, newPath)) {
          return true;
        }
      }
      return false;
    };

    findPath(categories, categoryId, []);
    return breadcrumb.slice(0, -1); // 排除当前分类
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        products,
        loading,
        error,
        findCategoryById,
        getProductsByCategoryId,
        getBreadcrumb,
        categoryProductsCache,
        setCategoryProductsCache,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}
