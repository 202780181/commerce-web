import pdfImageMap from './pdf-image-map.json';

interface PdfImage {
  name: string;
  originalFileName: string;
  url: string;
  folder: string;
}

/**
 * 获取指定产品的所有 PDF 图片
 */
export function getPdfImagesByProductId(productId: string): PdfImage[] {
  return (pdfImageMap as Record<string, PdfImage[]>)[productId] || [];
}

/**
 * 根据图片名称匹配对应的 PDF 图片
 * 使用模糊匹配算法
 */
export function matchPdfByImageName(productId: string, imageName: string): PdfImage | null {
  const pdfImages = getPdfImagesByProductId(productId);
  if (pdfImages.length === 0) return null;

  // 清理图片名称：移除扩展名、空格、特殊字符
  const cleanImageName = imageName
    .replace(/\.(webp|jpg|jpeg|png|gif)$/i, '')
    .replace(/\s+/g, '')
    .toLowerCase();

  // 1. 精确匹配（忽略大小写和空格）
  let bestMatch = pdfImages.find(pdf => {
    const cleanPdfName = pdf.name.replace(/\s+/g, '').toLowerCase();
    return cleanPdfName === cleanImageName;
  });

  if (bestMatch) return bestMatch;

  // 2. 包含匹配（PDF 名称包含图片名称或反之）
  bestMatch = pdfImages.find(pdf => {
    const cleanPdfName = pdf.name.replace(/\s+/g, '').toLowerCase();
    return cleanPdfName.includes(cleanImageName) || cleanImageName.includes(cleanPdfName);
  });

  if (bestMatch) return bestMatch;

  // 3. 提取型号进行匹配（如 CP155130、HP10077 等）
  const modelPattern = /([A-Z]{2}\d+)/gi;
  const imageModels = cleanImageName.match(modelPattern);
  
  if (imageModels && imageModels.length > 0) {
    const imageModel = imageModels[0].toUpperCase();
    
    bestMatch = pdfImages.find(pdf => {
      const pdfModels = pdf.name.match(modelPattern);
      if (pdfModels && pdfModels.length > 0) {
        return pdfModels[0].toUpperCase() === imageModel;
      }
      return false;
    });

    if (bestMatch) return bestMatch;
  }

  // 4. 相似度匹配（计算字符串相似度）
  let maxSimilarity = 0;
  let similarMatch: PdfImage | null = null;

  pdfImages.forEach(pdf => {
    const cleanPdfName = pdf.name.replace(/\s+/g, '').toLowerCase();
    const similarity = calculateSimilarity(cleanImageName, cleanPdfName);
    
    if (similarity > maxSimilarity && similarity > 0.6) {
      maxSimilarity = similarity;
      similarMatch = pdf;
    }
  });

  return similarMatch;
}

/**
 * 计算两个字符串的相似度（使用 Levenshtein 距离）
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

/**
 * 计算 Levenshtein 距离
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * 获取所有产品的 PDF 图片统计
 */
export function getPdfImageStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  
  Object.entries(pdfImageMap as Record<string, PdfImage[]>).forEach(([productId, pdfs]) => {
    stats[productId] = pdfs.length;
  });
  
  return stats;
}
