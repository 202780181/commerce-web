// 文件系统工具 - 用于从映射JSON文件读取产品文件夹结构
import productImageMap from './product-image-map.json';

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

// 产品文件夹映射
export const productFolderMap: Record<string, string> = {
  "modular-combined-display": "01 Modular Combined Display",
  "quick-release-jaws-vise": "02 Quick Release Jaws Vise",
  "manual-vise-series": "03 Manual Vise Series",
  "pneumatic-vise-pressurization": "04 Pneumatic Vise Series(With Pressurization",
  "pneumatic-vise-pneumatic": "05 Pneumatic Vise Series(Pneumatic Type",
  "zero-point-aluminum": "06 Zero Point Clamping(Aluminum Base",
  "zero-point-steel": "07 Zero Point Clamping(Steel Base)",
  "high-precision-zero-point": "08 High Precision Zero Point Clamping",
  "high-precision-pneumatic-zero": "09.High Precision Pneumatic Zero Point Clamping",
  "pull-studs-series": "10 Pull Studs Series",
  "dovetail-fixture": "11 Dovetail Fixture",
  "er-clamping-series": "12 ER Clamping Series",
  "modular-combination": "13 Modular Combination Series",
  "modular-set-series": "14 Modular Set Series",
  "bridge-plate-series": "15 L Bridge Plate Series",
  "5axis-pyramid-series": "16 5Axis Pyramid Series",
  "run-out-tester": "17 Run_out Tester",
  "unilateral-positione": "18 Unilateral Positione",
  "cnc-tombstone-series": "19 CNC Tombstone Series",
  "precision-bench-vice": "20 Precision Bench Vice",
  "hydraulic-bite-machine": "21 Hydraulic Bite Machine",
  "pneumatic-single-hole-zero": "22 Pneumatic Single Hole Zero Plate Series",
};

export interface FileSystemItem {
  name: string;           // 显示名称
  type: 'folder' | 'image'; // 类型
  path: string;           // 完整路径
  url?: string;           // 如果是图片，提供COS URL
  fileName?: string;      // 原始文件名
}

interface TreeNode {
  name: string;
  type: 'directory' | 'file';
  path?: string;
  url?: string;
  children?: TreeNode[];
}

/**
 * 从映射JSON文件中查找节点
 */
function findNodeInTree(tree: TreeNode, pathSegments: string[]): TreeNode | null {
  if (pathSegments.length === 0) {
    return tree;
  }

  const [current, ...rest] = pathSegments;
  
  if (!tree.children) {
    return null;
  }

  const child = tree.children.find(c => c.name === current);
  if (!child) {
    return null;
  }

  if (rest.length === 0) {
    return child;
  }

  return findNodeInTree(child, rest);
}

/**
 * 读取指定路径下的所有文件和文件夹（从JSON映射读取）
 * @param productId 产品ID
 * @param subPath 子路径数组（可选）
 * @returns 文件系统项目列表
 */
export function readProductDirectory(
  productId: string,
  subPath: string[] = []
): FileSystemItem[] {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return [];
  }

  // 从JSON映射中查找对应的节点
  const pathSegments = [folderName, ...subPath];
  const node = findNodeInTree(productImageMap as TreeNode, pathSegments);

  if (!node || !node.children) {
    return [];
  }

  const result: FileSystemItem[] = [];

  for (const child of node.children) {
    // 跳过封面文件夹
    if (child.name === '封面' || child.name === '封面图' || child.name.toLowerCase() === 'cover') {
      continue;
    }

    if (child.type === 'directory') {
      // 文件夹
      result.push({
        name: child.name,
        type: 'folder',
        path: [...subPath, child.name].join('/'),
        fileName: child.name,
      });
    } else if (child.type === 'file') {
      // 图片文件
      result.push({
        name: child.name.replace(/\.(webp|jpg|jpeg|png|gif)$/i, ''),
        type: 'image',
        path: child.path || '',
        url: child.url || '',
        fileName: child.name,
      });
    }
  }

  // 排序：文件夹在前，图片在后
  return result.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    }
    return a.type === 'folder' ? -1 : 1;
  });
}

/**
 * 检查指定路径是否为文件夹
 */
export function isFolder(productId: string, subPath: string[]): boolean {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return false;
  }

  const pathSegments = [folderName, ...subPath];
  const node = findNodeInTree(productImageMap as TreeNode, pathSegments);
  
  return node !== null && node.type === 'directory';
}

/**
 * 获取文件夹中的第一张图片
 */
function getFirstImageFromFolder(node: TreeNode): string | null {
  if (!node.children) {
    return null;
  }

  // 递归查找第一张图片
  for (const child of node.children) {
    // 跳过封面文件夹
    if (child.name === '封面' || child.name === '封面图' || child.name.toLowerCase() === 'cover') {
      continue;
    }

    if (child.type === 'file' && child.url) {
      // 检查是否为图片文件
      const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.gif'];
      if (imageExtensions.some(ext => child.name.toLowerCase().endsWith(ext))) {
        return child.url;
      }
    } else if (child.type === 'directory') {
      // 递归查找子文件夹中的第一张图片
      const firstImage = getFirstImageFromFolder(child);
      if (firstImage) {
        return firstImage;
      }
    }
  }

  return null;
}

/**
 * 获取文件夹的缩略图（第一张图片）
 */
export function getFolderThumbnail(productId: string, subPath: string[]): string | null {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return null;
  }

  const pathSegments = [folderName, ...subPath];
  const node = findNodeInTree(productImageMap as TreeNode, pathSegments);

  if (!node || node.type !== 'directory') {
    return null;
  }

  return getFirstImageFromFolder(node);
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

  // 添加产品名称
  const product = getProductNameById(productId);
  if (product) {
    breadcrumbs.push({
      name: product,
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
 * 根据产品ID获取产品名称
 */
function getProductNameById(productId: string): string | null {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return null;
  }
  // 去掉序号前缀
  return folderName.replace(/^\d+\s+/, '');
}

/**
 * 获取产品封面图
 */
export function getProductCover(productId: string): string {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return '';
  }

  // 尝试多个可能的封面路径
  const possibleCoverPaths = [
    '封面/cover.webp',
    '封面图/cover.webp',
    'cover/cover.webp',
  ];

  // 返回第一个可能存在的路径
  const encodedFolder = encodeURIComponent(folderName);
  for (const coverPath of possibleCoverPaths) {
    const url = `${COS_BASE_URL}/${encodedFolder}/${coverPath.split('/').map(p => encodeURIComponent(p)).join('/')}`;
    return url;
  }

  return `${COS_BASE_URL}/${encodedFolder}/%E5%B0%81%E9%9D%A2/cover.webp`;
}
