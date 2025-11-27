// 产品接口定义
export interface Product {
  id: string;
  index: number;
  name: string;
  folderName: string;
  coverImage: string;
  hasCategories?: boolean;
  categories?: any[];
  images?: any[];
}

// 产品文件夹映射（与 fileSystem.ts 和 productStructure.ts 保持一致）
const productFolderMap: Record<string, string> = {
  "modular-combined-display": "01 Modular Combined Display",
  "quick-release-jaws-vise": "02 Quick Release Jaws Vise",
  "manual-vise-series": "03 Manual Vise Series",
  "pneumatic-vise-serieswith-pressurization": "04 Pneumatic Vise Series(With Pressurization",
  "pneumatic-vise-seriespneumatic-type": "05 Pneumatic Vise Series(Pneumatic Type",
  "zero-point-clampingaluminum-base": "06 Zero Point Clamping(Aluminum Base",
  "zero-point-clampingsteel-base": "07 Zero Point Clamping(Steel Base)",
  "high-precision-zero-point-clamping": "08 High Precision Zero Point Clamping",
  "high-precision-pneumatic-zero-point-clamping": "09 High Precision Pneumatic Zero Point Clamping",
  "pull-studs-series": "10 Pull Studs Series",
  "dovetail-fixture": "11 Dovetail Fixture",
  "er-clamping-series": "12 ER Clamping Series",
  "modular-combination-series": "13 Modular Combination Series",
  "modular-set-series": "14 Modular Set Series",
  "l-bridge-plate-series": "15 L Bridge Plate Series",
  "5axis-pyramid-series": "16 5Axis Pyramid Series",
  "run_out-tester": "17 Run_out Tester",
  "unilateral-positione": "18 Unilateral Positione",
  "cnc-tombstone-series": "19 CNC Tombstone Series",
  "precision-bench-vice": "20 Precision Bench Vice",
  "hydraulic-bite-machine": "21 Hydraulic Bite Machine",
  "pneumatic-single-hole-zero-plate-series": "22 Pneumatic Single Hole Zero Plate Series",
};

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

// 生成产品封面 URL
function getProductCover(productId: string): string {
  const folderName = productFolderMap[productId];
  if (!folderName) return '';
  
  const encodedFolder = encodeURIComponent(folderName);
  return `${COS_BASE_URL}/${encodedFolder}/cover/cover.webp`;
}

// 从配置生成产品列表（客户端安全）
export function getAllProducts(): Product[] {
  return Object.entries(productFolderMap).map(([id, folderName]) => {
    const match = folderName.match(/^(\d+)\s+(.+)$/);
    const index = match ? parseInt(match[1]) : 0;
    const name = match ? match[2] : folderName;
    
    return {
      id,
      index,
      name,
      folderName,
      coverImage: getProductCover(id),
    };
  }).sort((a, b) => a.index - b.index);
}

// 根据ID获取产品
export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find(p => p.id === id);
}
