import { algoliasearch } from 'algoliasearch';

// Algolia configuration
const ALGOLIA_APP_ID = 'FAA0RNO4VW';
const ALGOLIA_API_KEY = 'f1083da2731fdd4904bb64b75c0705d3';

// Initialize Algolia client
export const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

// Index names
export const INDICES = {
  PRODUCTS: 'products_index',
  MOVIES: 'movies_index', // 示例索引
} as const;

// Fetch and index sample movies data (示例用途)
export const processMovieRecords = async () => {
  try {
    const datasetRequest = await fetch('https://dashboard.algolia.com/api/1/sample_datasets?type=movie');
    const movies = await datasetRequest.json();
    return await client.saveObjects({ 
      indexName: INDICES.MOVIES, 
      objects: movies 
    });
  } catch (error) {
    console.error('Error processing movie records:', error);
    throw error;
  }
};

// Index product data from your product map
export const indexProductData = async () => {
  try {
    // 导入产品数据
    const productMap = await import('./productMap.json');
    
    // 转换产品数据为 Algolia 可搜索的格式
    const searchableProducts: any[] = [];
    
    Object.entries(productMap.default).forEach(([id, product]: [string, any]) => {
      // 添加产品主信息
      searchableProducts.push({
        objectID: id,
        type: 'product',
        id,
        name: product.name,
        coverImage: product.coverImage,
        detailCount: product.detailCount,
        url: `/products/${id}`,
      });
      
      // 添加产品详情
      if (product.details && Array.isArray(product.details)) {
        product.details.forEach((detail: any, index: number) => {
          searchableProducts.push({
            objectID: `${id}_${detail.folderName}`,
            type: 'detail',
            productId: id,
            productName: product.name,
            detailName: detail.displayName,
            folderName: detail.folderName,
            fileName: detail.fileName,
            imageUrl: detail.imageUrl,
            lineDrawingUrl: detail.lineDrawingUrl,
            descriptionUrl: detail.descriptionUrl,
            url: `/products/${id}/${detail.folderName}`,
          });
        });
      }
    });
    
    // 保存到 Algolia
    return await client.saveObjects({
      indexName: INDICES.PRODUCTS,
      objects: searchableProducts,
    });
    
  } catch (error) {
    console.error('Error indexing product data:', error);
    throw error;
  }
};

// Search function for products
export const searchProducts = async (query: string, filters?: string) => {
  try {
    return await client.searchSingleIndex({
      indexName: INDICES.PRODUCTS,
      searchParams: {
        query,
        filters,
        hitsPerPage: 20,
        attributesToRetrieve: [
          'objectID',
          'type',
          'id',
          'name',
          'detailName',
          'coverImage',
          'imageUrl',
          'url'
        ],
      },
    });
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
