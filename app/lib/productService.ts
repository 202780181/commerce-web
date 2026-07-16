/**
 * 产品数据服务 - 统一的数据访问层
 */

import directoryMap from "./directoryMap.json";
import type { Product, FileSystemItem, Breadcrumb } from "./types";

interface DirectoryStructure {
  name: string;
  coverImage: string | null;
  structure: FileSystemItem[];
}

const directories = directoryMap as Record<string, DirectoryStructure>;

/**
 * 获取所有产品列表
 */
export function getAllProducts(): Product[] {
  return Object.entries(directories).map(([id, data]) => ({
    id,
    name: data.name,
    coverImage: data.coverImage,
    structure: data.structure,
    itemCount: data.structure.length,
  }));
}

/**
 * 根据ID获取产品
 */
export function getProductById(productId: string): Product | null {
  const data = directories[productId];
  if (!data) return null;

  return {
    id: productId,
    name: data.name,
    coverImage: data.coverImage,
    structure: data.structure,
    itemCount: data.structure.length,
  };
}

/**
 * 获取指定路径下的内容
 */
export function getItemsAtPath(
  productId: string,
  pathSegments: string[] = [],
): FileSystemItem[] {
  const product = directories[productId];
  if (!product) return [];

  // 根目录
  if (pathSegments.length === 0) {
    return product.structure || [];
  }

  // 遍历路径找到目标
  let current: FileSystemItem[] = product.structure;

  for (const segment of pathSegments) {
    const folder = current.find(
      (item) => item.name === segment && item.type === "folder",
    );
    if (!folder || !folder.children) {
      return [];
    }
    current = folder.children;
  }

  return current;
}

/**
 * 检查路径是否为文件夹
 */
export function isFolder(productId: string, pathSegments: string[]): boolean {
  if (pathSegments.length === 0) return true;

  const items = getItemsAtPath(productId, pathSegments.slice(0, -1));
  const lastSegment = pathSegments[pathSegments.length - 1];
  const item = items.find((i) => i.name === lastSegment);

  return item?.type === "folder";
}

/**
 * 获取文件夹缩略图
 */
export function getFolderThumbnail(
  productId: string,
  pathSegments: string[],
): string | null {
  if (pathSegments.length === 0) return null;

  const parentPath = pathSegments.slice(0, -1);
  const folderName = pathSegments[pathSegments.length - 1];

  const items = getItemsAtPath(productId, parentPath);
  const folder = items.find(
    (item) => item.name === folderName && item.type === "folder",
  );

  return folder?.thumbnailUrl || null;
}

/**
 * 获取面包屑导航
 */
export function getBreadcrumbs(
  productId: string,
  pathSegments: string[],
): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [{ name: "Products", path: "/products" }];

  const product = directories[productId];
  if (!product) return breadcrumbs;

  breadcrumbs.push({
    name: product.name,
    path: `/products/${productId}`,
  });

  // 添加路径段
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    const pathSoFar = pathSegments.slice(0, i + 1);

    breadcrumbs.push({
      name: segment,
      path: `/products/${productId}/${pathSoFar.join("/")}`,
    });
  }

  return breadcrumbs;
}

/**
 * 检查路径是否为详情页（detail_ 开头）
 */
export function isDetailFolder(folderName: string): boolean {
  return folderName.startsWith("detail_");
}

/**
 * 获取产品详情数据
 */
export function getProductDetail(
  productId: string,
  pathSegments: string[],
): {
  name: string;
  folderName: string;
  productImages: string[];
  lineDrawing?: string;
  descriptionUrl?: string;
} | null {
  const items = getItemsAtPath(productId, pathSegments);

  const imageItems = items.filter((item) => item.type === "image");
  const textItems = items.filter((item) => item.type === "text");

  // 分离 PNG 线条图和产品图片
  const lineDrawing = imageItems.find((item) =>
    item.fileName?.endsWith(".png"),
  )?.url;
  const productImages = imageItems
    .filter((item) => !item.fileName?.endsWith(".png"))
    .map((item) => item.url || "");

  const descriptionUrl = textItems.find((item) =>
    item.fileName?.endsWith(".txt"),
  )?.url;

  const folderName = pathSegments[pathSegments.length - 1] || productId;

  return {
    name: folderName.replace(/^detail_/, ""),
    folderName,
    productImages,
    lineDrawing,
    descriptionUrl,
  };
}
