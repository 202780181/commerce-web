/**
 * 生成产品目录映射
 * 从本地 products 文件夹扫描，生成完整的目录结构映射到 JSON 文件
 * 这个映射将用于前端展示多级目录结构
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '../products');
const OUTPUT_FILE = path.join(__dirname, '../app/lib/directoryMap.json');
const COS_BASE_URL = 'https://cdn.gzxfjxyxgs.com/products';

/**
 * 递归扫描目录，生成目录树
 */
function scanDirectory(dirPath, relativePath = []) {
  const items = [];
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      // 跳过隐藏文件、attachments 和其他非产品文件
      if (entry.name.startsWith('.') || entry.name === 'attachments') continue;
      
      if (entry.isDirectory()) {
        const folderPath = [...relativePath, entry.name];
        const subItems = scanDirectory(
          path.join(dirPath, entry.name),
          folderPath
        );
        
        // 查找第一张图片作为缩略图
        const thumbnail = findFirstImage(path.join(dirPath, entry.name), folderPath);
        
        items.push({
          name: entry.name,
          type: 'folder',
          path: folderPath.join('/'),
          thumbnailUrl: thumbnail,
          children: subItems,
          itemCount: subItems.length
        });
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.webp', '.png', '.jpg', '.jpeg'].includes(ext)) {
          const filePath = [...relativePath, entry.name];
          const cosUrl = `${COS_BASE_URL}/${filePath.map(encodeURIComponent).join('/')}`;
          
          items.push({
            name: entry.name.replace(/\.(webp|png|jpg|jpeg)$/i, ''),
            type: 'image',
            path: filePath.join('/'),
            url: cosUrl,
            fileName: entry.name
          });
        } else if (ext === '.txt') {
          const filePath = [...relativePath, entry.name];
          const cosUrl = `${COS_BASE_URL}/${filePath.map(encodeURIComponent).join('/')}`;
          
          items.push({
            name: entry.name.replace(/\.txt$/i, ''),
            type: 'text',
            path: filePath.join('/'),
            url: cosUrl,
            fileName: entry.name
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
  
  return items;
}

/**
 * 递归查找第一张图片（优先选择 webp 格式）
 */
function findFirstImage(dirPath, relativePath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    // 先查找当前目录的 webp 图片
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === '.webp') {
          const filePath = [...relativePath, entry.name];
          return `${COS_BASE_URL}/${filePath.map(encodeURIComponent).join('/')}`;
        }
      }
    }
    
    // 如果没有 webp，再查找其他格式图片
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const filePath = [...relativePath, entry.name];
          return `${COS_BASE_URL}/${filePath.map(encodeURIComponent).join('/')}`;
        }
      }
    }
    
    // 如果当前目录没有图片，递归查找子目录
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      
      if (entry.isDirectory()) {
        const result = findFirstImage(
          path.join(dirPath, entry.name),
          [...relativePath, entry.name]
        );
        if (result) return result;
      }
    }
  } catch (error) {
    // 忽略错误
  }
  
  return null;
}

/**
 * 主函数
 */
function main() {
  console.log('🔍 Scanning products directory...');
  
  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.error('❌ Products directory not found:', PRODUCTS_DIR);
    process.exit(1);
  }
  
  // 扫描根目录下的所有产品文件夹
  const productFolders = fs.readdirSync(PRODUCTS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'attachments');
  
  const directoryMap = {};
  
  for (const folder of productFolders) {
    console.log(`📁 Processing: ${folder.name}`);
    const productId = folder.name;
    const productPath = path.join(PRODUCTS_DIR, folder.name);
    
    // 扫描该产品的目录结构
    const structure = scanDirectory(productPath, [productId]);
    
    // 查找 cover 图片
    let coverImage = null;
    const coverFolder = structure.find(item => item.name === 'cover' && item.type === 'folder');
    if (coverFolder && coverFolder.children && coverFolder.children.length > 0) {
      const firstImage = coverFolder.children.find(item => item.type === 'image');
      if (firstImage) {
        coverImage = firstImage.url;
      }
    }
    
    // 如果没有 cover 文件夹，使用第一张图片
    if (!coverImage) {
      coverImage = findFirstImage(productPath, [productId]);
    }
    
    directoryMap[productId] = {
      name: folder.name,
      coverImage: coverImage,
      structure: structure
    };
  }
  
  // 写入 JSON 文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(directoryMap, null, 2), 'utf-8');
  
  console.log('✅ Directory map generated successfully!');
  console.log(`📄 Output file: ${OUTPUT_FILE}`);
  console.log(`📊 Total products: ${Object.keys(directoryMap).length}`);
}

main();
