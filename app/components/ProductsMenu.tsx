"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

interface Category {
  id: number;
  parent_id: number;
  name: string;
  cover_url?: string;
  children?: Category[];
  product_count?: number;
  sort?: number;
}

interface ProductsMenuProps {
  isScrolled: boolean;
  lightBackground: boolean;
  pathname: string | null;
  categories: Category[];
}

// 轻量级分类项组件 - 使用 CSS background-image 而不是 Next Image
const CategoryItem = memo(
  ({
    category,
    isActive,
    onSelect,
  }: {
    category: Category;
    isActive: boolean;
    onSelect: () => void;
  }) => {
    return (
      <a
        href={`/products/${category.id}`}
        onClick={onSelect}
        className={`group/item flex items-start gap-3 p-3 rounded-xl border transition-colors ${
          isActive
            ? "bg-purple-50 border-purple-300"
            : "bg-white border-transparent hover:bg-purple-50/50 hover:border-purple-200"
        }`}
      >
        <div
          className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 bg-cover bg-center"
          style={{
            backgroundImage: category.cover_url
              ? `url("${category.cover_url}?x-oss-process=image/quality,Q_50")`
              : undefined,
          }}
        >
          {!category.cover_url && (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs font-bold text-purple-600">
                {category.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`font-semibold text-sm truncate ${
              isActive
                ? "text-purple-600"
                : "text-gray-900 group-hover/item:text-purple-600"
            }`}
          >
            {category.name}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">click to details</div>
        </div>
        <svg
          className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${
            isActive
              ? "text-purple-600 translate-x-1"
              : "text-gray-400 group-hover/item:text-purple-600 group-hover/item:translate-x-1"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    );
  },
);

CategoryItem.displayName = "CategoryItem";

const ProductsMenu = memo(
  ({
    isScrolled,
    lightBackground,
    pathname,
    categories,
  }: ProductsMenuProps) => {
    const currentProductId = useMemo(() => {
      if (!pathname) return null;
      return pathname.startsWith("/products/")
        ? Number(pathname.split("/")[2])
        : null;
    }, [pathname]);

    const closeTimerRef = useRef<number | null>(null);
    const [open, setOpen] = useState(false);

    const closeDelayMs = 220;

    const cancelClose = () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const scheduleClose = () => {
      cancelClose();
      closeTimerRef.current = window.setTimeout(
        () => setOpen(false),
        closeDelayMs,
      );
    };

    useEffect(() => {
      return () => cancelClose();
    }, []);

    const textColorClass =
      isScrolled || lightBackground ? "text-gray-900" : "text-white";

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <a
            href="/products"
            onPointerEnter={() => {
              cancelClose();
              setOpen(true);
            }}
            onPointerLeave={scheduleClose}
            onFocus={() => {
              cancelClose();
              setOpen(true);
            }}
            onBlur={scheduleClose}
            className={cn(
              "group inline-flex h-auto w-max items-center justify-center p-0 bg-transparent hover:bg-transparent focus:bg-transparent",
              "font-semibold text-sm hover:text-purple-600 transition-colors duration-200 relative",
              textColorClass,
            )}
          >
            <span className="flex items-center gap-1">
              PRODUCTS
              <ChevronDown
                className={cn(
                  "relative top-[1px] h-3 w-3 transition duration-300",
                  open ? "rotate-180" : "",
                )}
                aria-hidden="true"
              />
            </span>
            <span className="absolute bottom-[-0.25rem] left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full" />
          </a>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="center"
          sideOffset={10}
          avoidCollisions
          collisionPadding={16}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
          className={cn(
            "relative w-[1000px] max-w-[calc(100dvw-2rem)] rounded-2xl border border-gray-100 bg-white p-0 shadow-xl",
            // Hover bridge to avoid flicker when moving from trigger to content (gap = sideOffset).
            "before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-[''] before:bg-transparent",
          )}
        >
          <div className="p-6">
            <div className="mb-4 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Product Categories
              </h3>
              <p className="text-sm text-gray-500">
                Explore our complete range of precision machinery
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-purple-600 [&::-webkit-scrollbar-thumb]:to-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  isActive={Number(currentProductId) === category.id}
                  onSelect={() => setOpen(false)}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

ProductsMenu.displayName = "ProductsMenu";

export default ProductsMenu;
