const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '../products');
const outputFile = path.join(__dirname, '../app/lib/productMap.json');

// 产品ID映射（保持URL友好的ID）
const productIdMap = {
  "01 Modular 5Axis Pyramid": "modular-5axis-pyramid",
  "02 Quick Release Jaws Vise": "quick-release-jaws-vise",
  "03 Manual Vise Series": "manual-vise-series",
  "04 Pneumatic Vise Series(With Pressurization": "pneumatic-vise-serieswith-pressurization",
  "04Pneumatic Vise Series(With Pressurization）": "pneumatic-vise-serieswith-pressurization",
  "05 Pneumatic Vise Series(Pneumatic Type": "pneumatic-vise-seriespneumatic-type",
  "05 Pneumatic Vise Series(Pneumatic Type）": "pneumatic-vise-seriespneumatic-type",
  "06 Zero Point Clamping(Aluminum Base": "zero-point-clampingaluminum-base",
  "07 Zero Point Clamping(Steel Base)": "zero-point-clampingsteel-base",
  "08 High Precision Zero Point Clamping": "high-precision-zero-point-clamping",
  "09 High Precision Pneumatic Zero Point Clamping": "high-precision-pneumatic-zero-point-clamping",
  "10 Pull Studs Series": "pull-studs-series",
  "11 Dovetail Fixture": "dovetail-fixture",
  "12 ER Clamping Series": "er-clamping-series",
  "13 Modular Combination Series": "modular-combination-series",
  "14 Modular Set Series": "modular-set-series",
  "15 L Bridge Plate Series": "l-bridge-plate-series",
  "16 5Axis Pyramid Series": "5axis-pyramid-series",
  "17 Run_out Tester": "run_out-tester",
  "18 Unilateral Positione": "unilateral-positione",
  "19 CNC Tombstone Series": "cnc-tombstone-series",
  "20 Precision Bench Vice": "precision-bench-vice",
  "21 Hydraulic Bite Machine": "hydraulic-bite-machine",
  "22 Pneumatic Single Hole Zero Plate Series": "pneumatic-single-hole-zero-plate-series",
};

function scanProductFolder(productPath, folderName) {
  const items = fs.readdirSync(productPath);
  const detailFolders = [];
  const baseUrl = 'https://cdn.gzxfjxyxgs.com/products';
  
  for (const item of items) {
    const itemPath = path.join(productPath, item);
    const stat = fs.statSync(itemPath);
    
    // 只处理 detail_ 开头的文件夹
    if (stat.isDirectory() && item.startsWith('detail_')) {
      const files = fs.readdirSync(itemPath);
      
      // 分别查找 webp、png 和 txt 文件
      const webpFile = files.find(f => f.toLowerCase().endsWith('.webp'));
      const pngFile = files.find(f => f.toLowerCase().endsWith('.png'));
      const txtFile = files.find(f => f.toLowerCase().endsWith('.txt'));
      
      // 优先使用 webp 作为主图
      const mainImageFile = webpFile || pngFile;
      
      if (mainImageFile) {
        const displayName = mainImageFile.replace(/\.(webp|png)$/i, '');
        const imageUrl = `${baseUrl}/${encodeURIComponent(folderName)}/${encodeURIComponent(item)}/${encodeURIComponent(mainImageFile)}`;
        
        const detailItem = {
          folderName: item,
          fileName: mainImageFile,
          displayName: displayName,
          imageUrl: imageUrl
        };
        
        // 如果有 png 文件，添加线条图 URL
        if (pngFile && webpFile) {
          // 如果既有 webp 又有 png，png 作为线条图
          detailItem.lineDrawingUrl = `${baseUrl}/${encodeURIComponent(folderName)}/${encodeURIComponent(item)}/${encodeURIComponent(pngFile)}`;
        }
        
        // 如果有 txt 文件，添加描述文件 URL
        if (txtFile) {
          detailItem.descriptionUrl = `${baseUrl}/${encodeURIComponent(folderName)}/${encodeURIComponent(item)}/${encodeURIComponent(txtFile)}`;
        }
        
        detailFolders.push(detailItem);
      }
    }
  }
  
  return detailFolders;
}

function generateProductMap() {
  const productMap = {};
  
  const productFolders = fs.readdirSync(productsDir);
  
  for (const folder of productFolders) {
    const folderPath = path.join(productsDir, folder);
    const stat = fs.statSync(folderPath);
    
    if (stat.isDirectory()) {
      const productId = productIdMap[folder];
      
      if (productId) {
        const detailFolders = scanProductFolder(folderPath, folder);
        
        // 提取序号
        const match = folder.match(/^(\d+)/);
        const index = match ? parseInt(match[1]) : 0;
        
        productMap[productId] = {
          id: productId,
          index: index,
          folderName: folder,
          name: folder.replace(/^\d+\s*/, ''),
          coverImage: `https://cdn.gzxfjxyxgs.com/products/${encodeURIComponent(folder)}/cover/cover.webp`,
          details: detailFolders
        };
      }
    }
  }
  
  return productMap;
}

// 生成并保存
const productMap = generateProductMap();
fs.writeFileSync(outputFile, JSON.stringify(productMap, null, 2), 'utf8');

console.log(`✅ Product map generated successfully!`);
console.log(`📁 Output: ${outputFile}`);
console.log(`📊 Total products: ${Object.keys(productMap).length}`);
