#!/usr/bin/env node

/**
 * Algolia 索引初始化脚本
 * 运行此脚本来将产品数据索引到 Algolia
 */

const { algoliasearch } = require('algoliasearch');
const productMap = require('../app/lib/productMap.json');

// Algolia configuration
const ALGOLIA_APP_ID = 'FAA0RNO4VW';
const ALGOLIA_API_KEY = 'f1083da2731fdd4904bb64b75c0705d3';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const INDICES = {
  PRODUCTS: 'products_index',
  MOVIES: 'movies_index',
};

// Index product data from product map
async function indexProductData() {
  try {
    // 转换产品数据为 Algolia 可搜索的格式
    const searchableProducts = [];
    
    Object.entries(productMap).forEach(([id, product]) => {
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
        product.details.forEach((detail, index) => {
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
}

// Fetch and index sample movies data (示例用途)
async function processMovieRecords() {
  try {
    const datasetRequest = await fetch('https://dashboard.algolia.com/api/1/sample_datasets?type=movie');
    const movies = await datasetRequest.json();
    return await client.saveObjects({
      indexName: INDICES.MOVIES,
      objects: movies,
    });
  } catch (error) {
    console.error('Error processing movie records:', error);
    throw error;
  }
}

async function initializeAlgolia() {
  console.log('🚀 开始初始化 Algolia 索引...');
  
  try {
    // 索引产品数据
    console.log('📦 正在索引产品数据...');
    const productResult = await indexProductData();
    console.log(`✅ 产品数据索引完成! 索引了 ${productResult.objectIDs ? productResult.objectIDs.length : '未知'} 个对象`);
    
    // 可选：索引示例电影数据（用于测试）
    // console.log('🎬 正在索引示例电影数据...');
    // const movieResult = await processMovieRecords();
    // console.log(`✅ 电影数据索引完成! 索引了 ${movieResult.objectIDs ? movieResult.objectIDs.length : '未知'} 个对象`);
    
    console.log('🎉 Algolia 索引初始化完成!');
    
  } catch (error) {
    console.error('❌ 索引初始化失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  initializeAlgolia();
}

module.exports = { initializeAlgolia };
