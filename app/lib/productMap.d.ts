// TypeScript 类型定义文件，用于 productMap.json
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

type ProductMap = Record<string, Product>;

declare const productMap: ProductMap;
export default productMap;
