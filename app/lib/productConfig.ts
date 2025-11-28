// 产品配置工具
import productMap from './productMap.json';

// 产品接口定义
export interface Product {
  id: string;
  index: number;
  name: string;
  folderName: string;
  coverImage: string;
}

interface ProductData {
  id: string;
  index: number;
  folderName: string;
  name: string;
  coverImage: string;
  details: any[];
}

const products = productMap as Record<string, ProductData>;

/**
 * 获取所有产品列表
 */
export function getAllProducts(): Product[] {
  return Object.values(products)
    .map(p => ({
      id: p.id,
      index: p.index,
      name: p.name,
      folderName: p.folderName,
      coverImage: p.coverImage,
    }))
    .sort((a, b) => a.index - b.index);
}

/**
 * 根据ID获取产品
 */
export function getProductById(id: string): Product | null {
  const product = products[id];
  if (!product) return null;
  
  return {
    id: product.id,
    index: product.index,
    name: product.name,
    folderName: product.folderName,
    coverImage: product.coverImage,
  };
}
