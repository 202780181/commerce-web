# 代码重构说明

## 📁 新的代码结构

### 核心层（app/lib/）

1. **types.ts** - 全局类型定义
   - 所有接口统一定义
   - 避免重复定义类型

2. **productService.ts** - 产品数据服务（核心）
   - `getAllProducts()` - 获取所有产品
   - `getProductById()` - 获取单个产品
   - `getItemsAtPath()` - 获取路径下的内容
   - `getFolderThumbnail()` - 获取文件夹缩略图
   - `getBreadcrumbs()` - 生成面包屑导航
   - `isDetailFolder()` - 判断是否详情页
   - `getProductDetail()` - 获取产品详情

3. **urlUtils.ts** - URL 工具函数
   - `buildProductUrl()` - 构建产品 URL
   - `decodePathSegments()` - 解码路径段
   - `buildApiParams()` - 构建 API 参数

### 组件层（app/components/）

1. **ProductCard.tsx** - 统一的产品卡片组件
   - 支持文件夹和图片两种模式
   - 自动处理缩略图加载
   - 统一的样式和交互

2. **BreadcrumbNav.tsx** - 面包屑导航组件
   - 自动生成导航路径
   - 统一的样式

### API 层（app/api/products/）

1. **filesystem/route.ts** - 简化版
   - 直接调用 `getItemsAtPath()`
   - 自动处理 URL 解码

2. **detail/route.ts** - 简化版
   - 直接调用 `getProductDetail()`
   - 无需手动递归查找

## 🎯 使用示例

### 在页面中使用

```typescript
import { getProductById, getBreadcrumbs, getItemsAtPath } from '@/app/lib/productService';
import { buildProductUrl } from '@/app/lib/urlUtils';
import ProductCard from '@/app/components/ProductCard';
import BreadcrumbNav from '@/app/components/BreadcrumbNav';

// 获取产品数据
const product = getProductById(productId);

// 获取路径下的内容
const items = getItemsAtPath(productId, pathSegments);

// 生成面包屑
const breadcrumbs = getBreadcrumbs(productId, pathSegments);

// 渲染
<BreadcrumbNav breadcrumbs={breadcrumbs} />
{items.map((item, index) => (
  <ProductCard
    key={index}
    item={item}
    index={index}
    productId={productId}
    currentPath={pathSegments}
  />
))}
```

### 调用 API

```typescript
import { buildApiParams } from '@/app/lib/urlUtils';

// 构建 API 参数
const params = buildApiParams({ 
  productId: '01 Zero Point Quick Change Fixture', 
  path: ['PM Series', 'Manual Zero Point Clamping'] 
});

// 调用 API
const response = await fetch(`/api/products/filesystem?${params}`);
```

## ✨ 优化点

1. **单一数据源**：所有数据访问通过 `productService.ts`
2. **统一 URL 处理**：编码/解码逻辑集中在 `urlUtils.ts`
3. **类型安全**：全局类型定义，TypeScript 自动提示
4. **组件复用**：ProductCard 和 BreadcrumbNav 可在任何地方使用
5. **简化 API**：API 路由只需调用服务层函数，无业务逻辑
6. **易于维护**：修改逻辑只需改一个地方

## 🔄 迁移步骤

### 现有文件可以删除或废弃

- `app/lib/fileSystem.ts` - 被 productService.ts 替代
- `app/lib/productConfig.ts` - 被 productService.ts 替代
- `app/api/products/detail/route-old.ts` - 旧版本

### 页面更新步骤

1. 导入新的服务和工具函数
2. 替换数据获取逻辑
3. 使用 ProductCard 组件替换重复的卡片代码
4. 使用 BreadcrumbNav 组件替换面包屑代码

## 📝 后续优化建议

1. 添加数据缓存层（Redis/Memory Cache）
2. 将 API 调用封装成 hooks（useProduct, useProductItems）
3. 添加错误边界组件统一处理错误
4. 考虑使用 React Query 管理服务端状态
