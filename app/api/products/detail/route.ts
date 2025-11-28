import { NextRequest, NextResponse } from 'next/server';
import productMapData from '../../../lib/productMap.json';

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

// 定义类型
interface ProductDetail {
  folderName: string;
  fileName: string;
  displayName: string;
  imageUrl: string;
  lineDrawingUrl?: string;
  descriptionUrl?: string;
}

interface Product {
  id: string;
  index: number;
  folderName: string;
  name: string;
  coverImage: string;
  details: ProductDetail[];
}

const productMap = productMapData as Record<string, Product>;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('productId');
  const detailFolder = searchParams.get('detailFolder');

  if (!productId || !detailFolder) {
    return NextResponse.json(
      { error: 'Missing productId or detailFolder' },
      { status: 400 }
    );
  }

  try {
    // 从 productMap 获取产品信息
    const product = productMap[productId as keyof typeof productMap];
    if (!product) {
      return NextResponse.json({ productDetail: null });
    }

    // 查找匹配的 detail
    const detail = product.details.find(d => d.folderName === detailFolder);
    if (!detail) {
      return NextResponse.json({ productDetail: null });
    }

    // 去掉扩展名得到基础文件名
    const baseFileName = detail.fileName.replace(/\.(webp|png)$/i, '');
    const encodedFolder = encodeURIComponent(product.folderName);
    const encodedDetailFolder = encodeURIComponent(detailFolder);
    
    // 构建文件 URLs
    const productDetail = {
      name: detail.displayName,
      folderName: detailFolder,
      productImage: detail.imageUrl, // 使用 JSON 中的 imageUrl (webp优先)
      lineDrawing: detail.lineDrawingUrl || `${COS_BASE_URL}/${encodedFolder}/${encodedDetailFolder}/${encodeURIComponent(baseFileName)}.png`, // 使用 lineDrawingUrl 或构建 png URL
      descriptionUrl: detail.descriptionUrl || `${COS_BASE_URL}/${encodedFolder}/${encodedDetailFolder}/${encodeURIComponent(baseFileName)}.txt`, // 使用 descriptionUrl 或构建 txt URL
    };
    
    return NextResponse.json({ productDetail });
  } catch (error) {
    console.error('Error building product detail:', error);
    return NextResponse.json(
      { error: 'Failed to build product detail' },
      { status: 500 }
    );
  }
}
