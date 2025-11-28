// 文件系统工具 - 从 COS 获取产品数据
import productMap from './productMap.json';

export interface FileSystemItem {
  name: string;           // 显示名称
  type: 'folder' | 'image'; // 类型
  path: string;           // 完整路径
  url?: string;           // 如果是图片，提供COS URL
  fileName?: string;      // 原始文件名
  thumbnailUrl?: string;  // 文件夹缩略图URL
}

interface ProductDetail {
  folderName: string;
  fileName: string;
  displayName: string;
  imageUrl: string;
  lineDrawingUrl?: string; // 可选的线条图 URL
  descriptionUrl?: string; // 可选的描述文件 URL
}

interface Product {
  id: string;
  index: number;
  folderName: string;
  name: string;
  coverImage: string;
  details: ProductDetail[];
}

// 类型断言
const products = productMap as Record<string, Product>;

/**
 * 读取指定路径下的所有文件和文件夹
 */
export function readProductDirectory(
  productId: string,
  subPath: string[] = []
): FileSystemItem[] {
  const product = products[productId];
  if (!product) {
    return [];
  }

  const result: FileSystemItem[] = [];

  // 如果是根目录，返回产品的 detail_ 文件夹列表
  if (subPath.length === 0) {
    for (const detail of product.details) {
      result.push({
        name: detail.displayName,
        type: 'folder',
        path: detail.folderName,
        fileName: detail.folderName,
        thumbnailUrl: detail.imageUrl,
      });
    }
  } else {
    // 如果是子路径（进入了某个 detail_ 文件夹），返回该文件夹中的图片
    const detailFolderName = subPath[0];
    const detail = product.details.find(d => d.folderName === detailFolderName);
    
    if (detail) {
      result.push({
        name: detail.displayName,
        type: 'image',
        path: [...subPath, detail.fileName].join('/'),
        url: detail.imageUrl,
        fileName: detail.fileName,
      });
    }
  }

  return result;
}

/**
 * 检查指定路径是否为文件夹
 */
export function isFolder(productId: string, subPath: string[]): boolean {
  if (subPath.length === 0) {
    return true; // 根目录总是文件夹
  }
  
  // 检查是否是 detail_ 文件夹
  const lastSegment = subPath[subPath.length - 1];
  return lastSegment.startsWith('detail_');
}

/**
 * 获取文件夹的缩略图（第一张图片）
 */
export function getFolderThumbnail(productId: string, subPath: string[]): string | null {
  const product = products[productId];
  if (!product || subPath.length === 0) {
    return null;
  }

  const detailFolderName = subPath[subPath.length - 1];
  const detail = product.details.find(d => d.folderName === detailFolderName);
  
  return detail ? detail.imageUrl : null;
}

/**
 * 获取指定路径下的所有图片（用于详情页浏览）
 */
export function getImagesInPath(productId: string, subPath: string[]): FileSystemItem[] {
  const items = readProductDirectory(productId, subPath);
  return items.filter(item => item.type === 'image');
}

/**
 * 获取面包屑导航数据
 */
export function getBreadcrumbs(productId: string, subPath: string[]) {
  const breadcrumbs = [
    { name: 'Products', path: '/products' },
  ];

  const product = products[productId];
  if (product) {
    breadcrumbs.push({
      name: product.name,
      path: `/products/${productId}`,
    });
  }

  // 添加子路径
  let currentPath = `/products/${productId}`;
  for (let i = 0; i < subPath.length; i++) {
    currentPath += `/${subPath[i]}`;
    breadcrumbs.push({
      name: subPath[i],
      path: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * 获取产品封面图
 */
export function getProductCover(productId: string): string {
  const product = products[productId];
  return product ? product.coverImage : '';
}
