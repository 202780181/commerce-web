// 产品配置工具
import directoryMap from './directoryMap.json';

// 产品接口定义
export interface Product {
  id: string;
  name: string;
  coverImage: string;
  detailCount?: number; // 详情数量
}

interface DirectoryStructure {
  name: string;
  coverImage: string | null;
  structure: any[];
}

const directories = directoryMap as Record<string, DirectoryStructure>;

/**
 * 获取所有产品列表
 */
export function getAllProducts(): Product[] {
  return Object.entries(directories)
    .map(([id, p]) => ({
      id,
      name: p.name,
      coverImage: p.coverImage || '',
      detailCount: p.structure?.length || 0,
    }));
}

/**
 * 根据ID获取产品
 */
export function getProductById(id: string): Product | null {
  const product = directories[id];
  if (!product) return null;
  
  return {
    id,
    name: product.name,
    coverImage: product.coverImage || '',
    detailCount: product.structure?.length || 0,
  };
}
