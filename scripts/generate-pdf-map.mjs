import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_DIR = path.join(process.cwd(), 'pdf');
const OUTPUT_FILE = path.join(process.cwd(), 'app/lib/product-pdf-map.json');
const BASE_URL = 'https://cdn.gzxfjxyxgs.com/pdf/';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file !== '.DS_Store' && path.extname(file).toLowerCase() === '.pdf') {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

try {
  if (!fs.existsSync(PDF_DIR)) {
    console.error(`Directory not found: ${PDF_DIR}`);
    process.exit(1);
  }

  const allFiles = getAllFiles(PDF_DIR);
  
  // Generate Tree Structure
  const tree = {
    name: 'pdf',
    type: 'directory',
    children: []
  };

  function addToTree(filePath, root) {
    const relativePath = path.relative(PDF_DIR, filePath);
    const parts = relativePath.split(path.sep);
    
    let currentLevel = root.children;
    
    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      
      if (isFile) {
        // It's a file
        const normalizedPath = relativePath.split(path.sep).join('/');
        const urlPath = normalizedPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
        const fullUrl = `${BASE_URL}${urlPath}`;
        
        currentLevel.push({
          name: part,
          type: 'file',
          path: normalizedPath,
          url: fullUrl
        });
      } else {
        // It's a directory
        let existingDir = currentLevel.find(item => item.name === part && item.type === 'directory');
        
        if (!existingDir) {
          existingDir = {
            name: part,
            type: 'directory',
            children: []
          };
          currentLevel.push(existingDir);
        }
        
        currentLevel = existingDir.children;
      }
    });
  }

  allFiles.forEach(filePath => {
    addToTree(filePath, tree);
  });

  // Ensure directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tree, null, 2));
  console.log(`Successfully generated PDF mapping file at ${OUTPUT_FILE}`);
  
  // Count files
  let fileCount = 0;
  function countFiles(node) {
    if (node.type === 'file') fileCount++;
    if (node.children) node.children.forEach(countFiles);
  }
  countFiles(tree);
  console.log(`Total PDF files mapped: ${fileCount}`);

} catch (error) {
  console.error('Error generating PDF mapping:', error);
}
