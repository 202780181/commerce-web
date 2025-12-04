import { NextRequest, NextResponse } from 'next/server';
import { getItemsAtPath } from '@/app/lib/productService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const path = searchParams.get('path');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // 解码并解析路径
    const decodedProductId = decodeURIComponent(productId);
    const pathSegments = path 
      ? decodeURIComponent(path).split('/').filter(Boolean) 
      : [];
    
    // 读取目录内容（缩略图已经在 directoryMap 中）
    const items = getItemsAtPath(decodedProductId, pathSegments);

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error reading filesystem:', error);
    return NextResponse.json(
      { error: 'Failed to read directory' },
      { status: 500 }
    );
  }
}
