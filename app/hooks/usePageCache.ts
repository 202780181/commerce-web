import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface CachedPageData {
  scrollY: number;
  scrollX: number;
  html: string;
  timestamp: number;
}

const CACHE_KEY = 'page-cache';
const CACHE_EXPIRY = 30 * 60 * 1000; // 30分钟

/**
 * 保存页面缓存
 */
function saveCacheData(key: string, data: CachedPageData) {
  try {
    const cache = sessionStorage.getItem(CACHE_KEY);
    const cacheData = cache ? JSON.parse(cache) : {};
    cacheData[key] = data;
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to save page cache:', error);
  }
}

/**
 * 获取页面缓存
 */
function getCacheData(key: string): CachedPageData | null {
  try {
    const cache = sessionStorage.getItem(CACHE_KEY);
    if (!cache) return null;
    
    const cacheData = JSON.parse(cache);
    const data = cacheData[key];
    
    if (!data) return null;
    
    // 检查是否过期
    if (Date.now() - data.timestamp > CACHE_EXPIRY) {
      delete cacheData[key];
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to get page cache:', error);
    return null;
  }
}

/**
 * 删除页面缓存
 */
function clearCacheData(key: string) {
  try {
    const cache = sessionStorage.getItem(CACHE_KEY);
    if (!cache) return;
    
    const cacheData = JSON.parse(cache);
    delete cacheData[key];
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to clear page cache:', error);
  }
}

interface UsePageCacheOptions {
  enabled?: boolean;
  cacheKey?: string;
}

/**
 * 页面缓存 Hook
 * 用于缓存页面状态和滚动位置，在浏览器前进/后退时恢复
 */
export function usePageCache(options: UsePageCacheOptions = {}) {
  const { enabled = true, cacheKey } = options;
  const pathname = usePathname();
  const router = useRouter();
  const key = cacheKey || pathname;
  
  const isRestoredRef = useRef(false);
  const isNavigatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 保存页面状态
  const savePageState = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return;

    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    saveCacheData(key, {
      scrollY,
      scrollX,
      html: '',
      timestamp: Date.now(),
    });
  }, [key, enabled]);

  // 恢复页面状态
  const restorePageState = useCallback(() => {
    if (!enabled || typeof window === 'undefined' || isRestoredRef.current) return;

    const cachedData = getCacheData(key);
    
    if (cachedData) {
      // 恢复滚动位置
      requestAnimationFrame(() => {
        window.scrollTo({
          left: cachedData.scrollX,
          top: cachedData.scrollY,
          behavior: 'instant' as ScrollBehavior,
        });

        // 二次确认（等待图片加载）
        setTimeout(() => {
          window.scrollTo({
            left: cachedData.scrollX,
            top: cachedData.scrollY,
            behavior: 'instant' as ScrollBehavior,
          });
        }, 300);
      });

      isRestoredRef.current = true;
    } else {
      // 没有缓存，滚动到顶部
      window.scrollTo(0, 0);
    }
  }, [key, enabled]);

  // 监听浏览器前进/后退
  useEffect(() => {
    if (!enabled) return;

    const handlePopState = () => {
      isNavigatingRef.current = true;
      // 标记为未恢复，以便在页面重新渲染时恢复状态
      isRestoredRef.current = false;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled]);

  // 页面加载时恢复状态
  useEffect(() => {
    if (!enabled) return;

    // 检查是否是通过浏览器前进/后退进入的页面
    const isBackForward = window.performance
      ?.getEntriesByType?.('navigation')?.[0]
      ? (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'back_forward'
      : false;

    if (isBackForward || isNavigatingRef.current) {
      restorePageState();
    } else {
      // 新页面访问，清除旧缓存
      clearCacheData(key);
      window.scrollTo(0, 0);
    }

    isNavigatingRef.current = false;
  }, [key, enabled, restorePageState]);

  // 离开页面时保存状态
  useEffect(() => {
    if (!enabled) return;

    // 保存滚动位置（节流）
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(savePageState, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 页面卸载前保存
    const handleBeforeUnload = () => {
      savePageState();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 链接点击前保存
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href) {
        savePageState();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [enabled, savePageState]);

  // 路径变化时重置恢复标志
  useEffect(() => {
    isRestoredRef.current = false;
  }, [pathname]);

  return {
    containerRef,
    clearCache: () => clearCacheData(key),
    saveState: savePageState,
    restoreState: restorePageState,
  };
}
