import { NextResponse } from "next/server";

// 配置 Node.js 忽略自签名证书
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("page_size") || "10";
    const categoryId = searchParams.get("category_id") || "0";

    console.log("[API Proxy Products] Fetching products:", {
      page,
      pageSize,
      categoryId,
    });

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/portal/products?page=${page}&page_size=${pageSize}&category_id=${categoryId}`;

    const response = await fetch(backendUrl, {
      cache: "no-store",
    });

    console.log(
      "[API Proxy Products] Backend response status:",
      response.status,
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[API Proxy Products] Backend error:", errorText);
      throw new Error(`Backend API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("[API Proxy Products] Data received successfully");

    return NextResponse.json(data);
  } catch (error) {
    console.error("[API Proxy Products] Error:", error);
    return NextResponse.json(
      {
        code: -1,
        message:
          error instanceof Error ? error.message : "Failed to fetch products",
      },
      { status: 500 },
    );
  }
}
