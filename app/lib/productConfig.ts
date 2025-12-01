// 产品配置工具
import productMap from './productMap.json';

// 产品接口定义
export interface Product {
  id: string;
  name: string;
  coverImage: string;
  detailCount?: number; // 详情数量
}

interface ProductData {
  name: string;
  coverImage: string;
  detailCount: number;
  details: any[];
}

const products = productMap as Record<string, ProductData>;

/**
 * 获取所有产品列表
 */
export function getAllProducts(): Product[] {
  return Object.entries(products)
    .map(([id, p]) => ({
      id,
      name: p.name,
      coverImage: p.coverImage,
      detailCount: p.detailCount || 0,
    }));
}

/**
 * 根据ID获取产品
 */
export function getProductById(id: string): Product | null {
  const product = products[id];
  if (!product) return null;
  
  return {
    id,
    name: product.name,
    coverImage: product.coverImage,
    detailCount: product.detailCount || 0,
  };
}
