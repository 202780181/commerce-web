// 文件系统工具 - 从 COS 目录映射获取产品数据
import directoryMap from './directoryMap.json';

export interface FileSystemItem {
  name: string;           // 显示名称
  type: 'folder' | 'image' | 'text'; // 类型
  path: string;           // 完整路径
  url?: string;           // 如果是图片或文本，提供COS URL
  fileName?: string;      // 原始文件名
  thumbnailUrl?: string | null;  // 文件夹缩略图URL
  children?: FileSystemItem[]; // 子项（用于文件夹）
  itemCount?: number;     // 项目数量
}

interface DirectoryStructure {
  name: string;
  coverImage: string | null;
  structure: FileSystemItem[];
}

// 类型断言
const directories = directoryMap as Record<string, DirectoryStructure>;

/**
 * 读取指定路径下的所有文件和文件夹
 */
export function readProductDirectory(
  productId: string,
  subPath: string[] = []
): FileSystemItem[] {
  const product = directories[productId];
  if (!product) {
    return [];
  }

  // 如果是根目录，返回产品的顶层结构
  if (subPath.length === 0) {
    return product.structure || [];
  }

  // 遍历路径找到目标文件夹
  let current: FileSystemItem[] = product.structure;
  
  for (const segment of subPath) {
    const folder = current.find(item => item.name === segment && item.type === 'folder');
    if (!folder || !folder.children) {
      return [];
    }
    current = folder.children;
  }

  return current;
}

/**
 * 检查指定路径是否为文件夹
 */
export function isFolder(productId: string, subPath: string[]): boolean {
  if (subPath.length === 0) {
    return true; // 根目录总是文件夹
  }
  
  const items = readProductDirectory(productId, subPath.slice(0, -1));
  const lastSegment = subPath[subPath.length - 1];
  const item = items.find(i => i.name === lastSegment);
  
  return item?.type === 'folder';
}

/**
 * 获取文件夹的缩略图（第一张图片）
 */
export function getFolderThumbnail(productId: string, subPath: string[]): string | null {
  if (subPath.length === 0) {
    return null;
  }

  // 从目录映射中查找该文件夹
  const parentPath = subPath.slice(0, -1);
  const folderName = subPath[subPath.length - 1];
  
  const items = readProductDirectory(productId, parentPath);
  const folder = items.find(item => item.name === folderName && item.type === 'folder');
  
  return folder?.thumbnailUrl || null;
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

  const product = directories[productId];
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
 * 获取产品列表（用于产品总览页）
 */
export function getAllProducts() {
  return Object.entries(directories).map(([id, product]) => ({
    id,
    name: product.name,
    coverImage: product.coverImage,
  }));
}

/**
 * 获取产品封面图
 */
export function getProductCover(productId: string): string {
  const product = directories[productId];
  return product ? product.coverImage || '' : '';
}
