/**
 * 全局类型定义
 */

export interface FileSystemItem {
  name: string;
  type: 'folder' | 'image' | 'text';
  path: string;
  url?: string;
  fileName?: string;
  thumbnailUrl?: string | null;
  children?: FileSystemItem[];
  itemCount?: number;
}

export interface Product {
  id: string;
  name: string;
  coverImage: string | null;
  structure: FileSystemItem[];
  itemCount: number;
}

export interface ProductDetail {
  name: string;
  folderName: string;
  productImages: string[];
  lineDrawing?: string;
  descriptionUrl?: string;
  description?: string;
}

export interface Breadcrumb {
  name: string;
  path: string;
}
