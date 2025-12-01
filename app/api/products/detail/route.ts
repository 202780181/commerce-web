import { NextRequest, NextResponse } from 'next/server';
import productMapData from '../../../lib/productMap.json';

// 定义类型
interface ProductDetail {
  folderName: string;
  displayName: string;
  imageUrl: string; // 主图 URL
  lineDrawingUrl?: string; // 线条图 URL
  descriptionUrl?: string; // 描述文件 URL
}

interface Product {
  name: string;
  coverImage: string;
  detailCount: number;
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
    
    // 构建返回数据
    const productDetail: any = {
      name: detail.displayName,
      folderName: detailFolder,
      productImages: [detail.imageUrl], // 主图放在数组中
    };

    // 只有存在时才添加线条图
    if (detail.lineDrawingUrl) {
      productDetail.lineDrawing = detail.lineDrawingUrl;
    }

    // 只有存在时才添加描述文件
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
