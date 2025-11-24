const fs = require('fs');
const path = require('path');

const productsDir = path.join(process.cwd(), 'products');
const outputPath = path.join(process.cwd(), 'app/lib/product-image-map.json');

// Recursively build directory tree
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
            const node = {
                name: item,
                type: 'file',
                path: itemRelativePath,
                url: `https://cdn.gzxfjxyxgs.com/products/${encodeURIComponent(itemRelativePath.split('/')[0])}/${itemRelativePath.split('/').slice(1).map(p => encodeURIComponent(p)).join('/')}`
            };
            children.push(node);
        }
    });
    
    return children;
}

const tree = {
    name: 'products',
    type: 'directory',
    children: buildTree(productsDir)
};

fs.writeFileSync(outputPath, JSON.stringify(tree, null, 2));
console.log('Generated product-image-map.json successfully!');
console.log(`Total categories: ${tree.children.length}`);
