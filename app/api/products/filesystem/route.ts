import { NextRequest, NextResponse } from 'next/server';
import { readProductDirectory } from '@/app/lib/fileSystem';

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

    // 解析路径
    const pathSegments = path ? path.split('/').filter(Boolean) : [];
    
    // 读取目录内容
    const items = readProductDirectory(productId, pathSegments);

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error reading filesystem:', error);
    return NextResponse.json(
      { error: 'Failed to read directory' },
      { status: 500 }
    );
  }
}
