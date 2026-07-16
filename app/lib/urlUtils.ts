/**
 * URL 工具函数 - 统一处理 URL 编码/解码
 */

/**
 * 构建产品路径 URL
 */
export function buildProductUrl(
  productId: string,
  pathSegments: string[] = [],
): string {
  const encodedId = encodeURIComponent(productId);
  if (pathSegments.length === 0) {
    return `/products/${encodedId}`;
  }
  const encodedPath = pathSegments.map((s) => encodeURIComponent(s)).join("/");
  return `/products/${encodedId}/${encodedPath}`;
}

/**
 * 解码路径段数组
 */
export function decodePathSegments(segments: string[]): string[] {
  return segments.map((s) => decodeURIComponent(s));
}

/**
 * 构建 API URL 参数
 */
export function buildApiParams(
  params: Record<string, string | string[]>,
): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      searchParams.append(key, encodeURIComponent(value.join("/")));
    } else {
      searchParams.append(key, encodeURIComponent(value));
    }
  });
  return searchParams.toString();
}
