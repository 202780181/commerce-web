"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface PageCacheContextType {
  isRestoringCache: boolean;
}

const PageCacheContext = createContext<PageCacheContextType>({
  isRestoringCache: false,
});

export const usePageCache = () => useContext(PageCacheContext);

interface PageCacheProviderProps {
  children: ReactNode;
}

export function PageCacheProvider({ children }: PageCacheProviderProps) {
  const pathname = usePathname();
  const isRestoringCache = useRef(false);

  useEffect(() => {
    // 监听浏览器的前进/后退
    const handlePopState = () => {
      isRestoringCache.current = true;
      setTimeout(() => {
        isRestoringCache.current = false;
      }, 100);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <PageCacheContext.Provider value={{ isRestoringCache: isRestoringCache.current }}>
      {children}
    </PageCacheContext.Provider>
  );
}
