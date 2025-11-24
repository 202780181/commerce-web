import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 使用绝对路径
const PDF_IMAGES_DIR = '/Users/aaron/WebstormProjects/commerce-web/pdf照片';
const OUTPUT_FILE = path.join(__dirname, '../app/lib/pdf-image-map.json');

// PDF 图片的基础 URL
const BASE_URL = 'https://cdn.gzxfjxyxgs.com/pdf照片';

// 产品编号到文件夹的映射
const folderToProductMap = {
  '02': 'quick-release-jaws-vise',
  '03': 'manual-vise-series',
  '04': 'pneumatic-vise-pressurization',
  '05': 'pneumatic-vise-pneumatic',
  '06': 'zero-point-aluminum',
  '07': 'zero-point-steel',
  '08': 'high-precision-zero-point',
  '09': 'high-precision-pneumatic-zero',
  '10': 'pull-studs-series',
  '11': 'dovetail-fixture',
  '12': 'er-clamping-series',
  '13': 'modular-combination',
  '14': 'modular-set-series',
  '15': 'bridge-plate-series',
  '16': '5axis-pyramid-series',
  '17': 'run-out-tester',
  '18': 'unilateral-positione',
  '19': 'cnc-tombstone-series',
  '20': 'precision-bench-vice',
  '21': 'hydraulic-bite-machine',
  '22': 'pneumatic-single-hole-zero',
};

/**
 * 生成 PDF 图片映射
 */
function generatePdfImageMap() {
  const pdfMap = {};

  // 读取 pdf照片 目录下的所有子文件夹
  const folders = fs.readdirSync(PDF_IMAGES_DIR).filter(item => {
    const fullPath = path.join(PDF_IMAGES_DIR, item);
    return fs.statSync(fullPath).isDirectory();
  });

  folders.forEach(folder => {
    const productId = folderToProductMap[folder];
    if (!productId) {
      console.warn(`No product mapping for folder: ${folder}`);
      return;
    }

    const folderPath = path.join(PDF_IMAGES_DIR, folder);
    const files = fs.readdirSync(folderPath).filter(file => 
      file.toLowerCase().endsWith('.png') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg')
    );

    if (files.length === 0) return;

    pdfMap[productId] = files.map(file => {
      // 提取文件名（不含扩展名）并清理空格
      const nameWithoutExt = file.replace(/\.(png|jpg|jpeg)$/i, '').trim();
      
      // 对文件名进行 URL 编码
      const encodedFileName = encodeURIComponent(file);
      
      return {
        name: nameWithoutExt,
        originalFileName: file,
        url: `${BASE_URL}/${folder}/${encodedFileName}`,
        folder: folder,
      };
    });
  });

  // 写入 JSON 文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pdfMap, null, 2), 'utf-8');
  
  // 统计信息
  const totalProducts = Object.keys(pdfMap).length;
  const totalPdfImages = Object.values(pdfMap).reduce((sum, pdfs) => sum + pdfs.length, 0);
  
  console.log('✅ PDF 图片映射生成成功！');
  console.log(`📊 统计信息：`);
  console.log(`   - 产品类别: ${totalProducts}`);
  console.log(`   - PDF 图片总数: ${totalPdfImages}`);
  console.log(`   - 输出文件: ${OUTPUT_FILE}`);
  
  // 显示每个产品的 PDF 数量
  console.log('\n📁 各产品 PDF 图片数量：');
  Object.entries(pdfMap).forEach(([productId, pdfs]) => {
    console.log(`   - ${productId}: ${pdfs.length} 个`);
  });
}

try {
  generatePdfImageMap();
} catch (error) {
  console.error('❌ 生成失败:', error);
  process.exit(1);
}
