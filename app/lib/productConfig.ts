import productImageMap from './product-image-map.json';

// 产品接口定义
export interface Product {
  id: string;
  index: number;
  name: string;
  folderName: string;
  coverImage: string;
  hasCategories: boolean;
  categories?: any[];
  images?: any[];
}

// 从 product-image-map.json 生成产品列表
export function getAllProducts(): Product[] {
  const products: Product[] = [];
  
  if (productImageMap && productImageMap.children) {
    productImageMap.children.forEach((category: any, index: number) => {
      // 提取序号（如 "01", "02"）
      const match = category.name.match(/^(\d+)/);
      const categoryIndex = match ? parseInt(match[1]) : index + 1;
      
      // 生成产品ID（小写，用连字符）
      const id = category.name
        .replace(/^\d+\s+/, '') // 移除开头的数字
        .toLowerCase()
        .replace(/[()]/g, '') // 移除括号
        .replace(/\s+/g, '-'); // 空格替换为连字符
      
      // 查找封面图片
      const coverFolder = category.children?.find((child: any) => 
        child.name === '封面' || child.name === '封面图'
      );
      const coverImage = coverFolder?.children?.find((file: any) => 
        file.name === 'cover.webp' || file.name === 'cover.png'
      )?.url || '';
      
      // 检查是否有子分类（除了封面文件夹）
      const hasCategories = category.children?.some((child: any) => 
        child.type === 'directory' && child.name !== '封面' && child.name !== '封面图'
      ) || false;
      
      products.push({
        id,
        index: categoryIndex,
        name: category.name.replace(/^\d+\s+/, ''), // 移除序号
        folderName: category.name,
        coverImage,
        hasCategories,
        categories: hasCategories ? category.children?.filter((child: any) => 
          child.type === 'directory' && child.name !== '封面' && child.name !== '封面图'
        ) : undefined,
        images: !hasCategories ? category.children?.filter((child: any) => 
          child.type === 'file'
        ) : undefined,
      });
    });
  }
  
  return products;
}

// 根据ID获取产品
export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find(p => p.id === id);
}

// 根据产品ID和分类ID获取分类
export function getCategoryById(productId: string, categoryId: string): any | undefined {
  const product = getProductById(productId);
  if (!product || !product.hasCategories || !product.categories) {
    return undefined;
  }
  return product.categories.find((c: any) => {
    const catId = c.name.toLowerCase().replace(/\s+/g, '-');
    return catId === categoryId;
  });
}
