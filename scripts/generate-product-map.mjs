import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";
const PRODUCTS_DIR = path.join(__dirname, '../products');

// 手动编码 URL 组件（包括括号）
function encodeURLComponent(str) {
  return encodeURIComponent(str)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}

// COS 上实际的文件夹名称映射（当本地文件夹名与 COS 不一致时）
const cosFolderNameMap = {
  'detail_TS52-170': 'detail_TS52-170.',
  // 如果发现更多不一致，在这里添加
};

// 产品ID映射
const productIdMap = {
  "01 Modular 5Axis Pyramid": "modular-5axis-pyramid",
  "02 Quick Release Jaws Vise": "quick-release-jaws-vise",
  "03 Manual Vise Series": "manual-vise-series",
  "04Pneumatic Vise Series(With Pressurization）": "pneumatic-vise-serieswith-pressurization",
  "05 Pneumatic Vise Series(Pneumatic Type）": "pneumatic-vise-seriespneumatic-type",
  "06 Zero Point Clamping(Aluminum Base）": "zero-point-clampingaluminum-base",
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

function scanProducts() {
  const productMap = {};
  
  const productFolders = fs.readdirSync(PRODUCTS_DIR)
    .filter(name => {
      const fullPath = path.join(PRODUCTS_DIR, name);
      return fs.statSync(fullPath).isDirectory();
    })
    .sort();

  for (const folderName of productFolders) {
    const match = folderName.match(/^(\d+)/);
    if (!match) continue;
    
    const index = parseInt(match[1]);
    const productId = productIdMap[folderName];
    if (!productId) {
      console.warn(`Warning: No ID mapping for folder "${folderName}"`);
      continue;
    }

    const productPath = path.join(PRODUCTS_DIR, folderName);
    const productName = folderName.replace(/^\d+\s*/, '');
    
    // 扫描 detail_ 文件夹
    const details = [];
    const items = fs.readdirSync(productPath);
    
    for (const item of items) {
      if (!item.startsWith('detail_')) continue;
      
      const detailPath = path.join(productPath, item);
      if (!fs.statSync(detailPath).isDirectory()) continue;
      
      // 查找文件
      const files = fs.readdirSync(detailPath);
      const webpFiles = files.filter(f => f.toLowerCase().endsWith('.webp'));
      const pngFile = files.find(f => f.toLowerCase().endsWith('.png'));
      const txtFile = files.find(f => f.toLowerCase().endsWith('.txt'));
      
      if (webpFiles.length === 0) {
        console.warn(`Warning: No webp file in ${folderName}/${item}`);
        continue;
      }
      
      // displayName 从第一个 webp 文件名提取（去掉 .webp 后缀）
      const displayName = webpFiles[0].replace(/\.webp$/i, '');
      
      // 获取 COS 上实际的文件夹名称
      const cosDetailFolderName = cosFolderNameMap[item] || item;
      
      const encodedFolder = encodeURLComponent(folderName);
      const encodedDetail = encodeURLComponent(cosDetailFolderName);
      
      const detail = {
        folderName: item,
        fileName: webpFiles[0], // 保留第一个文件名作为主文件名
        displayName: displayName,
        imageUrls: webpFiles.map(webpFile => 
          `${COS_BASE_URL}/${encodedFolder}/${encodedDetail}/${encodeURLComponent(webpFile)}`
        ),
      };
      
      if (pngFile) {
        detail.lineDrawingUrl = `${COS_BASE_URL}/${encodedFolder}/${encodedDetail}/${encodeURLComponent(pngFile)}`;
      }
      
      if (txtFile) {
        detail.descriptionUrl = `${COS_BASE_URL}/${encodedFolder}/${encodedDetail}/${encodeURLComponent(txtFile)}`;
      }
      
      details.push(detail);
    }
    
    productMap[productId] = {
      id: productId,
      index: index,
      folderName: folderName,
      name: productName,
      coverImage: `${COS_BASE_URL}/${encodeURIComponent(folderName)}/cover/cover.webp`,
      details: details.sort((a, b) => a.folderName.localeCompare(b.folderName)),
    };
  }
  
  return productMap;
}

// 生成并保存
const productMap = scanProducts();
const outputPath = path.join(__dirname, '../app/lib/productMap.json');
fs.writeFileSync(outputPath, JSON.stringify(productMap, null, 2), 'utf-8');

console.log(`✅ Generated productMap.json with ${Object.keys(productMap).length} products`);
console.log(`Total details: ${Object.values(productMap).reduce((sum, p) => sum + p.details.length, 0)}`);
