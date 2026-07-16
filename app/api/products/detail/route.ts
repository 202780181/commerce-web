import { NextRequest, NextResponse } from "next/server";
import { getProductDetail } from "@/app/lib/productService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const detailFolder = searchParams.get("detailFolder");

    if (!productId || !detailFolder) {
      return NextResponse.json(
        { error: "Product ID and detail folder are required" },
        { status: 400 },
      );
    }

    // 解码参数
    const decodedProductId = decodeURIComponent(productId);
    const decodedFolder = decodeURIComponent(detailFolder);

    // 构建完整路径到 detail 文件夹
    // detailFolder 可能是简单名称或完整路径
    const pathSegments = decodedFolder.split("/").filter(Boolean);

    // 获取产品详情
    const productDetail = getProductDetail(decodedProductId, pathSegments);

    if (!productDetail) {
      return NextResponse.json(
        { error: "Product detail not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ productDetail });
  } catch (error) {
    console.error("Error getting product detail:", error);
    return NextResponse.json(
      { error: "Failed to get product detail" },
      { status: 500 },
    );
  }
}
