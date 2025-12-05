# 产品浏览系统完整说明

## 系统架构

### 路由结构
```
/products                          - 顶级分类列表页
/products/[id]                     - 分类页面(显示子分类或产品)
/products/[id]/[productId]         - 产品详情页
```

### API 代理路由
```
/api/proxy/portal/products/categories              - 获取所有分类树
/api/proxy/portal/products/categories/[id]         - 获取单个分类详情
/api/proxy/portal/products?category_id=xxx         - 获取分类下的产品列表
/api/proxy/portal/products/[productId]             - 获取产品详情
```

## 数据流程

### 1. 分类树结构
```typescript
interface Category {
  id: number;
  parent_id: number;
  name: string;
  cover_url?: string;
  children?: Category[];
}
```

### 2. 产品结构
```typescript
interface Product {
  id: number;
  category_id: number;
  name: string;
  cover_url?: string;
  line_drawing_url?: string;
  description_url?: string;
}
```

## 页面逻辑

### /products 页面
- 获取所有分类树 (`/api/proxy/portal/products/categories`)
- 只显示顶级分类 (`parent_id === 0`)
- 显示每个分类的封面图和子分类数量
- 点击分类进入 `/products/[id]`

### /products/[id] 页面
- 获取当前分类详情 (`/api/proxy/portal/products/categories/[id]`)
- 构建面包屑导航(递归查询父分类)
- 判断逻辑:
  - 如果有 `children` → 显示子分类网格
  - 否则获取产品列表 (`/api/proxy/portal/products?category_id=[id]`)
  - 如果有产品 → 显示产品网格
  - 否则显示空状态

### /products/[id]/[productId] 页面
- 获取产品详情 (`/api/proxy/portal/products/[productId]`)
- 构建完整面包屑导航
- 显示产品的三种图片:
  - Cover Image (封面图)
  - Line Drawing (线稿图)
  - Description (说明图)
- 提供图片切换功能
- 显示产品详细信息

## 后端 API 说明

### 基础 URL
```
https://www.leaderprecision.com.cn:8443/portal
```

### API 端点

#### 1. 获取分类树
```
GET /products/categories
Response: {
  code: 0,
  data: Category[]
}
```

#### 2. 获取分类详情
```
GET /products/categories/:id
Response: {
  code: 0,
  data: Category
}
```

#### 3. 获取产品列表
```
GET /products?category_id=xxx
Response: {
  code: 0,
  data: Product[]
}
```

#### 4. 获取产品详情
```
GET /products/:id
Response: {
  code: 0,
  data: Product
}
```

## 导航示例

### 示例 1: 有子分类的分类
```
用户路径: /products → /products/1 → /products/2 → /products/4
显示内容: 顶级分类 → 子分类 → 子子分类 → 产品列表
```

### 示例 2: 直接到产品
```
用户路径: /products → /products/1 → /products/1/123
显示内容: 顶级分类 → 产品列表 → 产品详情
```

## 面包屑导航

每个页面都包含面包屑导航,显示完整的分类层级:
```
Products / Zero Point Quick Change Fixture / PM Series / Manual Zero Point Clamping / Product Name
```

## 特性

### 1. 加载状态
所有页面都有加载动画

### 2. 错误处理
- 分类不存在
- 产品不存在
- 网络请求失败
- 提供友好的错误提示和返回链接

### 3. 响应式设计
- 移动端: 1列
- 平板: 2列
- 桌面: 3-4列

### 4. 交互效果
- 卡片悬停放大
- 图片懒加载
- 平滑过渡动画

## 文件清单

### 页面文件
- `app/products/page.tsx` - 顶级分类列表
- `app/products/[id]/page.tsx` - 动态分类/产品列表页
- `app/products/[id]/[productId]/page.tsx` - 产品详情页

### API 代理文件
- `app/api/proxy/portal/products/categories/route.ts`
- `app/api/proxy/portal/products/categories/[id]/route.ts`
- `app/api/proxy/portal/products/route.ts`
- `app/api/proxy/portal/products/[productId]/route.ts`

## 测试建议

### 1. 测试多级分类
访问不同层级的分类,确保每一级都能正确显示

### 2. 测试产品详情
确保三种图片都能正确加载和切换

### 3. 测试面包屑
确保面包屑能正确构建并可点击跳转

### 4. 测试边界情况
- 空分类(没有子分类和产品)
- 分类不存在
- 产品不存在

## 部署注意事项

### 1. CORS 配置
后端需要允许前端域名的跨域请求

### 2. HTTPS 证书
后端使用自签名证书可能导致开发环境请求失败

### 3. 缓存策略
所有 API 请求都使用 `cache: 'no-store'` 确保数据实时性

### 4. 环境变量
建议将后端 API 地址配置为环境变量:
```env
NEXT_PUBLIC_API_BASE_URL=https://www.leaderprecision.com.cn:8443/portal
```

## 下一步优化建议

1. **缓存优化**: 使用 SWR 或 React Query 进行客户端缓存
2. **图片优化**: 使用 Next.js Image 组件优化图片加载
3. **SEO 优化**: 添加 metadata 和结构化数据
4. **搜索功能**: 添加产品搜索
5. **筛选功能**: 添加产品筛选和排序
6. **收藏功能**: 允许用户收藏产品
7. **分享功能**: 添加社交媒体分享按钮
8. **打印功能**: 添加产品信息打印
