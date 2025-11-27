import { NextRequest, NextResponse } from 'next/server';
import { findProductDetailByName } from '../../../lib/productStructure';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName');

  if (!productId || !productName) {
    return NextResponse.json(
      { error: 'Missing productId or productName' },
      { status: 400 }
    );
  }

  try {
    const productDetail = findProductDetailByName(productId, productName);
    return NextResponse.json({ productDetail });
  } catch (error) {
    console.error('Error finding product detail:', error);
    return NextResponse.json(
      { error: 'Failed to find product detail' },
      { status: 500 }
    );
  }
}
