// 产品结构工具 - 基于文件夹命名规则直接推断内容
// 仅限服务器端使用
import fs from 'fs';
import path from 'path';

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
  "high-precision-pneumatic-zero": "09 High Precision Pneumatic Zero Point Clamping",
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

export interface ProductDetail {
  name: string;           // 产品名称（从文件夹名提取）
  folderName: string;     // 完整文件夹名（包含 detail_ 前缀）
  productImage: string;   // 产品图片 URL (.webp)
  lineDrawing: string;    // 线条图 URL (.png)
  description?: string;   // 产品说明内容 (.txt)
  descriptionUrl?: string; // 产品说明文件URL
}

/**
 * 获取产品封面图片
 * 优先获取 webp，如果没有则获取其他格式
 */
export function getProductCover(productId: string): string {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return '';
  }

  const encodedFolder = encodeURIComponent(folderName);
  const encodedCover = encodeURIComponent('cover');
  
  // 优先返回 webp 格式
  return `${COS_BASE_URL}/${encodedFolder}/${encodedCover}/cover.webp`;
}

/**
 * 从本地读取产品的所有详情文件夹
 * 返回所有以 detail_ 开头的文件夹列表
 */
export function getProductDetailFolders(productId: string): string[] {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return [];
  }

  const productPath = path.join(process.cwd(), 'products', folderName);
  
  try {
    if (!fs.existsSync(productPath)) {
      return [];
    }

    const items = fs.readdirSync(productPath);
    
    // 过滤出所有以 detail_ 开头的文件夹
    return items.filter(item => {
      const itemPath = path.join(productPath, item);
      return item.startsWith('detail_') && fs.statSync(itemPath).isDirectory();
    }).sort();
  } catch (error) {
    console.error('Error reading product detail folders:', error);
    return [];
  }
}

/**
 * 从详情文件夹名称提取产品名称
 * 例如: detail_CP155130(RoundBase) -> CP155130(RoundBase)
 */
export function extractProductName(detailFolderName: string): string {
  return detailFolderName.replace(/^detail_/, '');
}

/**
 * 获取详情文件夹中的文件信息
 */
export function getDetailFolderContents(productId: string, detailFolderName: string): ProductDetail | null {
  const folderName = productFolderMap[productId];
  if (!folderName) {
    return null;
  }

  const productName = extractProductName(detailFolderName);
  const detailPath = path.join(process.cwd(), 'products', folderName, detailFolderName);
  
  try {
    if (!fs.existsSync(detailPath)) {
      return null;
    }

    const files = fs.readdirSync(detailPath);
    
    // 查找各类文件
    const webpFile = files.find(f => f.toLowerCase().endsWith('.webp'));
    const pngFile = files.find(f => f.toLowerCase().endsWith('.png'));
    const txtFile = files.find(f => f.toLowerCase().endsWith('.txt'));
    
    const encodedFolder = encodeURIComponent(folderName);
    const encodedDetailFolder = encodeURIComponent(detailFolderName);
    
    const result: ProductDetail = {
      name: productName,
      folderName: detailFolderName,
      productImage: webpFile 
        ? `${COS_BASE_URL}/${encodedFolder}/${encodedDetailFolder}/${encodeURIComponent(webpFile)}`
        : '',
      lineDrawing: pngFile
        ? `${COS_BASE_URL}/${encodedFolder}/${encodedDetailFolder}/${encodeURIComponent(pngFile)}`
        : '',
    };
    
    // 如果有 txt 文件，提供 URL（前端从 COS 获取）
    if (txtFile) {
      result.descriptionUrl = `${COS_BASE_URL}/${encodedFolder}/${encodedDetailFolder}/${encodeURIComponent(txtFile)}`;
    }
    
    return result;
  } catch (error) {
    console.error('Error reading detail folder contents:', error);
    return null;
  }
}

/**
 * 获取产品的所有详情信息
 */
export function getAllProductDetails(productId: string): ProductDetail[] {
  const detailFolders = getProductDetailFolders(productId);
  
  return detailFolders
    .map(folder => getDetailFolderContents(productId, folder))
    .filter((detail): detail is ProductDetail => detail !== null);
}

/**
 * 根据产品名称查找对应的详情信息
 */
export function findProductDetailByName(productId: string, productName: string): ProductDetail | null {
  const allDetails = getAllProductDetails(productId);
  
  // 标准化函数
  const normalize = (str: string) => {
    return str.trim().toLowerCase()
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/\s+/g, '');
  };
  
  const normalizedSearchName = normalize(productName);
  
  // 精确匹配
  for (const detail of allDetails) {
    if (normalize(detail.name) === normalizedSearchName) {
      return detail;
    }
  }
  
  // 模糊匹配（去除括号内容）
  const baseSearchName = normalizedSearchName.replace(/\([^)]*\)/g, '');
  for (const detail of allDetails) {
    const baseName = normalize(detail.name).replace(/\([^)]*\)/g, '');
    if (baseName === baseSearchName) {
      return detail;
    }
  }
  
  // 匹配带有数字后缀的情况（如 CV10075.432 匹配 CV10075）
  const baseSearchNameWithoutSuffix = baseSearchName.replace(/\.\d+$/, '');
  for (const detail of allDetails) {
    const baseName = normalize(detail.name).replace(/\([^)]*\)/g, '').replace(/\.\d+$/, '');
    if (baseName === baseSearchNameWithoutSuffix || baseName.startsWith(baseSearchNameWithoutSuffix)) {
      return detail;
    }
  }
  
  // 匹配括号前的基础名称（忽略括号内容的差异）
  // CP155130(RoundBase) 可以匹配到 CP155130(Round Base)
  const mainNameSearch = normalizedSearchName.split('(')[0];
  for (const detail of allDetails) {
    const mainNameDetail = normalize(detail.name).split('(')[0];
    if (mainNameDetail === mainNameSearch) {
      return detail;
    }
  }
  
  return null;
}

/**
 * 获取所有产品列表（从文件系统）
 */
export function getAllProducts() {
  const productsPath = path.join(process.cwd(), 'products');
  
  try {
    const folders = fs.readdirSync(productsPath);
    
    return folders
      .filter(folder => {
        const folderPath = path.join(productsPath, folder);
        return fs.statSync(folderPath).isDirectory();
      })
      .map(folder => {
        // 提取序号和名称
        const match = folder.match(/^(\d+)\s+(.+)$/);
        if (!match) return null;
        
        const [, index, name] = match;
        
        // 查找对应的 productId
        const productId = Object.entries(productFolderMap).find(
          ([, folderName]) => folderName === folder
        )?.[0];
        
        if (!productId) return null;
        
        return {
          id: productId,
          index: parseInt(index),
          name,
          folderName: folder,
          coverImage: getProductCover(productId),
        };
      })
      .filter(Boolean)
      .sort((a, b) => (a?.index || 0) - (b?.index || 0));
  } catch (error) {
    console.error('Error getting all products:', error);
    return [];
  }
}
