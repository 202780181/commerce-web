const fs = require('fs');
const path = require('path');

const productsDir = path.join(process.cwd(), 'products');
const pdfPhotosDir = path.join(process.cwd(), 'pdf照片');
const imageMapOutput = path.join(process.cwd(), 'app/lib/product-image-map.json');
const specsOutput = path.join(process.cwd(), 'app/lib/product-specifications.json');

// ============================================
// 1. Generate product-image-map.json
// ============================================

function buildTree(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath);
    const children = [];
    
    items.forEach(item => {
        if (item.startsWith('.')) return;
        
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);
        const itemRelativePath = relativePath ? `${relativePath}/${item}` : item;
        
        if (stats.isDirectory()) {
            const node = {
                name: item,
                type: 'directory',
                children: buildTree(fullPath, itemRelativePath)
            };
            children.push(node);
        } else {
            const pathParts = itemRelativePath.split('/');
            const encodedPath = pathParts.map(p => encodeURIComponent(p)).join('/');
            
            const node = {
                name: item,
                type: 'file',
                path: itemRelativePath,
                url: `https://cdn.gzxfjxyxgs.com/products/${encodedPath}`
            };
            children.push(node);
        }
    });
    
    return children;
}

const imageMapTree = {
    name: 'products',
    type: 'directory',
    children: buildTree(productsDir)
};

fs.writeFileSync(imageMapOutput, JSON.stringify(imageMapTree, null, 2));
console.log('✅ Generated product-image-map.json');
console.log(`   Total categories: ${imageMapTree.children.length}`);

// ============================================
// 2. Generate product-specifications.json
// ============================================

// Extract specifications from filenames in pdf照片 directory
const specifications = {};

function extractSpecs(dirPath, categoryNumber) {
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
        if (file.startsWith('.') || fs.statSync(path.join(dirPath, file)).isDirectory()) return;
        
        // Extract model name from filename (remove extension)
        const modelName = file.replace(/\.(png|jpg|jpeg|webp)$/i, '');
        
        // Create basic spec entry if it doesn't exist
        if (!specifications[modelName]) {
            specifications[modelName] = {
                "Model": modelName,
                "Category": getCategoryName(categoryNumber),
                "Image": `https://cdn.gzxfjxyxgs.com/pdf%E7%85%A7%E7%89%87/${categoryNumber}/${encodeURIComponent(file)}`
            };
        }
    });
}

function getCategoryName(number) {
    const categoryMap = {
        '02': 'Quick Release Jaws Vise',
        '03': 'Manual Vise Series',
        '04': 'Pneumatic Vise Series (With Pressurization)',
        '05': 'Pneumatic Vise Series (Pneumatic Type)',
        '06': 'Zero Point Clamping (Aluminum Base)',
        '07': 'Zero Point Clamping (Steel Base)',
        '08': 'High Precision Zero Point Clamping',
        '09': 'High Precision Pneumatic Zero Point Clamping',
        '10': 'Pull Studs Series',
        '11': 'Dovetail Fixture',
        '12': 'ER Clamping Series',
        '13': 'Modular Combination Series',
        '14': 'Modular Set Series',
        '15': 'L Bridge Plate Series',
        '16': '5Axis Pyramid Series',
        '17': 'Run_out Tester',
        '18': 'Unilateral Positione',
        '19': 'CNC Tombstone Series',
        '20': 'Precision Bench Vice',
        '21': 'Hydraulic Bite Machine',
        '22': 'Pneumatic Single Hole Zero Plate Series'
    };
    return categoryMap[number] || `Category ${number}`;
}

// Scan all pdf照片 subdirectories
const pdfDirs = fs.readdirSync(pdfPhotosDir);
pdfDirs.forEach(dir => {
    if (dir.startsWith('.')) return;
    const dirPath = path.join(pdfPhotosDir, dir);
    if (fs.statSync(dirPath).isDirectory()) {
        extractSpecs(dirPath, dir);
    }
});

fs.writeFileSync(specsOutput, JSON.stringify(specifications, null, 2));
console.log('✅ Generated product-specifications.json');
console.log(`   Total specifications: ${Object.keys(specifications).length}`);

console.log('\n🎉 All mapping files generated successfully!');
