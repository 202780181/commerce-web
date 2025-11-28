import { NextRequest, NextResponse } from 'next/server';
import productMapData from '../../../lib/productMap.json';

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

// 定义类型
interface ProductDetail {
  folderName: string;
  fileName: string;
  displayName: string;
  imageUrls: string[]; // 产品图片 URL 数组
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
  const detailFolderRaw = searchParams.get('detailFolder');

  if (!productId || !detailFolderRaw) {
    return NextResponse.json(
      { error: 'Missing productId or detailFolder' },
      { status: 400 }
    );
  }

  // 解码 detailFolder（URL 可能已经编码了）
  const detailFolder = decodeURIComponent(detailFolderRaw);

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
    
    // 构建文件 URLs - 只使用 productMap.json 中存在的 URL
    const productDetail: any = {
      name: detail.displayName,
      folderName: detailFolder,
      productImages: detail.imageUrls, // 使用 JSON 中的 imageUrls 数组
    };

    // 只有 productMap.json 中有 lineDrawingUrl 时才添加
    if (detail.lineDrawingUrl) {
      productDetail.lineDrawing = detail.lineDrawingUrl;
    }

    // 只有 productMap.json 中有 descriptionUrl 时才添加
    if (detail.descriptionUrl) {
      productDetail.descriptionUrl = detail.descriptionUrl;
    }
    
    return NextResponse.json({ productDetail });
  } catch (error) {
    console.error('Error building product detail:', error);
    return NextResponse.json(
      { error: 'Failed to build product detail' },
      { status: 500 }
    );
  }
}
