/**
 * 面包屑导航组件
 */

import Link from "next/link";
import type { Breadcrumb } from "../lib/types";

interface BreadcrumbNavProps {
  breadcrumbs: Breadcrumb[];
}

export default function BreadcrumbNav({ breadcrumbs }: BreadcrumbNavProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-gray-900">{crumb.name}</span>
            ) : (
              <Link 
                href={crumb.path} 
                className="hover:text-purple-600 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
