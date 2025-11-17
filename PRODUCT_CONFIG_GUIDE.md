# 产品配置指南

## 概述

这个系统基于你的文件夹结构动态生成产品页面。产品可以有两种层级结构：

1. **无子分类** - 产品直接包含图片（如 01 Modular）
2. **有子分类** - 产品包含多个分类文件夹，每个分类包含图片（如 02 Quick）

## 文件结构

```
app/
├── lib/
│   └── productConfig.ts          # 产品配置文件（核心）
└── products/
    ├── page.tsx                  # 产品列表页
    └── [id]/
        ├── page.tsx              # 产品页（显示分类或图片）
        ├── direct/
        │   └── [imageId]/
        │       └── page.tsx      # 产品详情页（无子分类）
        └── [categoryId]/
            ├── page.tsx          # 分类页（显示图片）
            └── [imageId]/
                └── page.tsx      # 产品详情页（有子分类）
```

## 路由逻辑

### 无子分类的产品（如 01 Modular）
```
/products → 产品列表
  ↓ 点击产品
/products/modular-combined-display → 显示所有产品图片
  ↓ 点击图片
/products/modular-combined-display/direct/0 → 产品详情页
```

### 有子分类的产品（如 02 Quick）
```
/products → 产品列表
  ↓ 点击产品
/products/quick-release-jaws-vise → 显示所有分类
  ↓ 点击分类
/products/quick-release-jaws-vise/hp10077 → 显示该分类的所有图片
  ↓ 点击图片
/products/quick-release-jaws-vise/hp10077/0 → 产品详情页
```

## 产品详情页功能

产品详情页包含以下功能：

1. **左侧大图展示区**
   - 主图显示区域（4:3 比例）
   - 图片计数器显示当前位置

2. **缩略图切换**
   - 显示所有产品图片的缩略图
   - 点击切换主图显示
   - 当前选中图片高亮显示

3. **PDF 技术图纸区域**
   - 显示 PDF 文档缩略图
   - 点击切换不同的 PDF
   - 下载 PDF 按钮

4. **右侧参数信息**
   - 产品名称和分类
   - 详细规格参数表
   - 询价和联系销售按钮
   - 产品特性列表

## 如何添加新产品

### 1. 上传图片到腾讯云 COS

按照以下结构上传：
```
products/
├── [序号] [产品名称]/
│   ├── 封面/
│   │   └── cover.webp           # 产品封面图
│   └── [产品图片].webp          # 无子分类：直接放图片
│   或
│   ├── [分类名称]/               # 有子分类：创建分类文件夹
│   │   ├── [图片1].webp
│   │   └── [图片2].webp
│   └── 封面/
│       └── cover.webp
```

### 2. 在 productConfig.ts 中添加配置

#### 无子分类的产品示例：

```typescript
{
  id: "product-id",                    // URL友好的ID
  index: 1,                            // 产品序号
  name: "Product Name",                // 产品名称
  folderName: "01 Product Folder",     // COS上的文件夹名称
  coverImage: `${COS_BASE_URL}/01%20Product%20Folder/%E5%B0%81%E9%9D%A2/cover.webp`,
  hasCategories: false,                // 没有子分类
  images: [                            // 直接列出所有图片
    {
      name: "Image 1",
      fileName: "image1.webp",
      url: `${COS_BASE_URL}/01%20Product%20Folder/image1.webp`
    },
    {
      name: "Image 2",
      fileName: "image2.webp",
      url: `${COS_BASE_URL}/01%20Product%20Folder/image2.webp`
    }
  ]
}
```

#### 有子分类的产品示例：

```typescript
{
  id: "product-id",
  index: 2,
  name: "Product Name",
  folderName: "02 Product Folder",
  coverImage: `${COS_BASE_URL}/02%20Product%20Folder/%E5%B0%81%E9%9D%A2/cover.webp`,
  hasCategories: true,                 // 有子分类
  categories: [                        // 列出所有分类
    {
      id: "category-1",
      name: "Category 1",
      images: [
        {
          name: "Category 1 Image 1",
          fileName: "image1.webp",
          url: `${COS_BASE_URL}/02%20Product%20Folder/Category%201/image1.webp`
        }
      ]
    },
    {
      id: "category-2",
      name: "Category 2",
      images: [...]
    }
  ]
}
```

## URL 编码注意事项

COS URL 中的特殊字符需要进行 URL 编码：
- 空格 → `%20`
- 括号 `(` → `%28`
- 括号 `)` → `%29`
- 中文字符也需要编码（如 `封面` → `%E5%B0%81%E9%9D%A2`）

## 示例：完整的产品配置

```typescript
// 01 Modular - 无子分类
{
  id: "modular-combined-display",
  index: 1,
  name: "Modular Combined Display",
  folderName: "01 Modular Combined Display",
  coverImage: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/%E5%B0%81%E9%9D%A2/cover.webp`,
  hasCategories: false,
  images: [
    {
      name: "4Axis Bridge Plate",
      fileName: "4Axis Bridge Plate.webp",
      url: `${COS_BASE_URL}/01%20Modular%20Combined%20Display/4Axis%20Bridge%20Plate.webp`
    }
  ]
}

// 02 Quick - 有子分类
{
  id: "quick-release-jaws-vise",
  index: 2,
  name: "Quick Release Jaws Vise",
  folderName: "02 Quick Release Jaws Vise",
  coverImage: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/%E5%B0%81%E9%9D%A2/cover.webp`,
  hasCategories: true,
  categories: [
    {
      id: "hp10077",
      name: "HP10077",
      images: [
        {
          name: "HP10077 Steel Jaw",
          fileName: "HP10077(Steel Jaw).webp",
          url: `${COS_BASE_URL}/02%20Quick%20Release%20Jaws%20Vise/HP10077/HP10077(Steel%20Jaw).webp`
        }
      ]
    }
  ]
}
```

## 维护建议

1. **保持一致性** - 所有产品的封面图都应该放在 `封面/cover.webp`
2. **命名规范** - 使用清晰的文件名和分类名
3. **图片优化** - 使用 WebP 格式以获得更好的性能
4. **测试** - 添加新产品后，测试所有路由是否正常工作

## 当前已配置的产品

目前系统中已配置了 22 个产品系列：
1. Modular Combined Display（无子分类）
2. Quick Release Jaws Vise（有子分类）
3-22. 其他产品系列（需要补充完整的图片配置）

## 下一步工作

1. ✅ 完成产品配置系统
2. ✅ 实现动态路由（无 Gallery 页面）
3. ⏳ 补充所有产品的完整图片配置
4. ⏳ 添加图片点击放大功能
5. ⏳ 添加搜索和筛选功能

## 注意事项

- **已移除 Gallery 路径**：所有产品和分类页面直接显示图片，不再使用 `/gallery` 路径
- 旧的 gallery 文件夹可以删除（`app/products/[id]/gallery/` 和 `app/products/[id]/[categoryId]/gallery/`）
