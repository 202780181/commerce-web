// PDF 映射工具 - 用于获取产品对应的 PDF 文件
import pdfMapData from './product-pdf-map.json';

interface PdfNode {
  name: string;
  type: 'file' | 'directory';
  path?: string;
  url?: string;
  children?: PdfNode[];
}

// 产品ID和PDF文件夹编号的映射
const productIdToPdfFolder: Record<string, string> = {
  "modular-combined-display": "01",
  "quick-release-jaws-vise": "02",
  "manual-vise-series": "03",
  "pneumatic-vise-pressurization": "04",
  "pneumatic-vise-pneumatic": "05",
  "zero-point-aluminum": "06",
  "zero-point-steel": "07",
  "high-precision-zero-point": "08",
  "high-precision-pneumatic-zero": "09",
  "pull-studs-series": "10",
  "dovetail-fixture": "11",
  "er-clamping-series": "12",
  "modular-combination": "13",
  "modular-set-series": "14",
  "bridge-plate-series": "15",
  "5axis-pyramid-series": "16",
  "run-out-tester": "17",
  "unilateral-positione": "18",
  "cnc-tombstone-series": "19",
  "precision-bench-vice": "20",
  "hydraulic-bite-machine": "21",
  "pneumatic-single-hole-zero": "22",
};

/**
 * 根据产品ID获取对应的PDF文件列表
 * @param productId 产品ID
 * @returns PDF文件数组
 */
export function getPdfsByProductId(productId: string): Array<{ name: string; url: string }> {
  const folderNumber = productIdToPdfFolder[productId];
  if (!folderNumber) {
    return [];
  }

  const pdfMap = pdfMapData as PdfNode;
  const productFolder = pdfMap.children?.find(child => child.name === folderNumber);
  
  if (!productFolder || !productFolder.children) {
    return [];
  }

  return productFolder.children
    .filter(child => child.type === 'file')
    .map(child => ({
      name: child.name.replace('.pdf', ''),
      url: child.url || ''
    }));
}

/**
 * 根据图片名称匹配对应的PDF文件
 * @param productId 产品ID
 * @param imageName 图片名称
 * @returns 匹配的PDF文件数组
 */
export function matchPdfByImageName(productId: string, imageName: string): Array<{ name: string; url: string }> {
  const allPdfs = getPdfsByProductId(productId);
  
  if (allPdfs.length === 0) {
    return [];
  }

  // 清理图片名称以便匹配
  const cleanImageName = imageName
    .replace(/\.(webp|jpg|jpeg|png|gif)$/i, '')
    .replace(/[\s-_()（）]+/g, ' ')
    .toLowerCase()
    .trim();

  // 尝试精确匹配或部分匹配
  const matched = allPdfs.filter(pdf => {
    const cleanPdfName = pdf.name
      .replace(/[\s-_()（）]+/g, ' ')
      .toLowerCase()
      .trim();
    
    // 精确匹配
    if (cleanPdfName === cleanImageName) {
      return true;
    }
    
    // 部分匹配：PDF名称包含图片名称或图片名称包含PDF名称
    return cleanPdfName.includes(cleanImageName) || cleanImageName.includes(cleanPdfName);
  });

  return matched;
}
