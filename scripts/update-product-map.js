#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const productsDir = './products';
const productMap = {};

// 正确的 COS 域名
const COS_BASE_URL = 'https://work-1251384833.cos.ap-singapore.myqcloud.com/products';

// 读取所有产品目录
const productDirs = fs.readdirSync(productsDir)
  .filter(f => fs.statSync(path.join(productsDir, f)).isDirectory())
  .sort();

productDirs.forEach(productDir => {
  const productPath = path.join(productsDir, productDir);
  
  // 生成 ID (转为 kebab-case)
  const id = productDir
    .toLowerCase()
    .replace(/[()）]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^\d+\s*/, '');
  
  // 获取产品名称
  const name = productDir.replace(/^\d+\s*/, '');
  
  // 查找 cover 图片（优先选择 webp 格式）
  const coverDir = path.join(productPath, 'cover');
  let coverImage = '';
  if (fs.existsSync(coverDir)) {
    const coverFiles = fs.readdirSync(coverDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    // 优先选择 webp 格式
    const webpFile = coverFiles.find(f => f.endsWith('.webp'));
    const selectedFile = webpFile || coverFiles[0];
    if (selectedFile) {
      coverImage = `${COS_BASE_URL}/${encodeURIComponent(productDir)}/cover/${encodeURIComponent(selectedFile)}`;
    }
  }
  
  // 获取所有 detail 文件夹
  const details = [];
  const subDirs = fs.readdirSync(productPath)
    .filter(f => f.startsWith('detail') && fs.statSync(path.join(productPath, f)).isDirectory());
  
  subDirs.forEach(detailDir => {
    const detailPath = path.join(productPath, detailDir);
    const folderName = detailDir;
    
    // 查找不同类型的文件
    const files = fs.readdirSync(detailPath);
    
    // 分类文件
    const webpFiles = files.filter(f => f.endsWith('.webp'));
    const pngFiles = files.filter(f => f.endsWith('.png'));
    const jpgFiles = files.filter(f => f.toLowerCase().match(/\.(jpg|jpeg)$/));
    const txtFiles = files.filter(f => f.endsWith('.txt'));
    
    // 主图：优先 webp，其次 jpg/jpeg，最后 png
    const mainImageFile = webpFiles[0] || jpgFiles[0] || pngFiles[0];
    
    if (mainImageFile) {
      // displayName 使用主图文件名（去掉扩展名）
      const displayName = mainImageFile.replace(/\.(webp|png|jpg|jpeg)$/i, '');
      
      const detail = {
        folderName,
        displayName,
        imageUrl: `${COS_BASE_URL}/${encodeURIComponent(productDir)}/${encodeURIComponent(detailDir)}/${encodeURIComponent(mainImageFile)}`
      };
      
      // 线条图 URL（如果主图不是 png，则使用其他 png 文件作为线条图）
      const lineDrawingFile = mainImageFile.endsWith('.png') ? pngFiles[1] : pngFiles[0];
      if (lineDrawingFile) {
        detail.lineDrawingUrl = `${COS_BASE_URL}/${encodeURIComponent(productDir)}/${encodeURIComponent(detailDir)}/${encodeURIComponent(lineDrawingFile)}`;
      }
      
      // 描述文件 URL（txt 文件）
      if (txtFiles[0]) {
        detail.descriptionUrl = `${COS_BASE_URL}/${encodeURIComponent(productDir)}/${encodeURIComponent(detailDir)}/${encodeURIComponent(txtFiles[0])}`;
      }
      
      details.push(detail);
    }
  });
  
  productMap[id] = {
    name,
    coverImage,
    detailCount: details.length,
    details
  };
});

// 保存到文件
fs.writeFileSync('./app/lib/productMap.json', JSON.stringify(productMap, null, 2));
console.log('✅ productMap.json 已更新！');
console.log(`📊 总共 ${Object.keys(productMap).length} 个产品类别`);
console.log('\n示例 URL:');
console.log(productMap['-modular-5axis-pyramid'].coverImage);
