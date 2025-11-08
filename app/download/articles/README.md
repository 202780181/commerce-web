# 新闻文章 - MDX 内容指南

本目录包含所有 MDX 格式的新闻文章。MDX 允许你使用 Markdown 编写内容并嵌入 React 组件。

## 如何添加新文章

### 步骤 1：添加文章元数据

编辑 `app/lib/articles.ts` 并将你的文章元数据添加到 `articlesData` 数组中：

```typescript
{
  id: 19, // 从上一篇文章递增
  slug: "your-article-slug", // URL 友好的 slug
  title: "你的文章标题",
  category: "Getting Started", // 或 "Marketing Guide"、"Platform Updates" 等
  categorySlug: "beginner",
  date: "October 28, 2025",
  image: "https://images.unsplash.com/photo-xxx?w=800&q=80",
  excerpt: "文章的简短摘要（1-2 句话）",
  tag: "Getting Started",
  featured: false, // 设置为 true 使其成为特色文章
  author: "你的名字",
  readTime: "8 分钟阅读",
}
```

### 步骤 2：创建 MDX 文件

在此目录中创建一个与 slug 相同的新文件：`your-article-slug.mdx`

```mdx
# 你的文章标题

文章引言段落写在这里...

## 第一部分

第一部分的内容...

### 子章节

更详细的内容...

## 第二部分

更多内容...
```

### 步骤 3：可以使用的 MDX 功能

#### 标题
```mdx
# H1 - 主标题
## H2 - 章节
### H3 - 子章节
```

#### 文本格式
```mdx
**粗体文本**
*斜体文本*
`行内代码`
```

#### 列表
```mdx
- 项目符号 1
- 项目符号 2

1. 编号项目 1
2. 编号项目 2
```

#### 代码块
````mdx
```javascript
const example = "code";
console.log(example);
```
````

#### 引用
```mdx
> "这是一段引用"
```

#### 表格
```mdx
| 列 1 | 列 2 |
|------|------|
| 数据 1 | 数据 2 |
```

#### 链接
```mdx
[链接文本](https://example.com)
```

#### 图片
```mdx
![替代文本](image-url.jpg)
```

### 步骤 4：样式

文章内容会自动使用 Tailwind Typography 样式。样式包括：

- 标题：粗体、深灰色
- 段落：常规文本、良好的行高
- 链接：紫色、悬停时下划线
- 代码：紫色背景
- 表格：带紫色表头的边框
- 引用：紫色左边框、斜体

### 最佳实践

1. **使用清晰的标题**：用 H2 和 H3 标题组织内容结构
2. **保持段落简短**：每段 3-4 句话
3. **添加代码示例**：为技术内容使用代码块
4. **包含列表**：将复杂信息分解为列表
5. **使用表格**：用于比较或结构化数据
6. **添加引用**：用于重要引用或提示

### 文章分类

- **Getting Started**（新手上路）：初学者指南和教程
- **Marketing Guide**（营销指南）：营销策略和技巧
- **Platform Updates**（平台动态）：新功能和公告
- **Success Stories**（成功案例）：案例研究和成功故事
- **Partners**（合作伙伴）：合作伙伴协作和集成
- **Product Selection**（选品攻略）：产品推荐和指南

### Example Structure

```mdx
# Article Title

Brief introduction that hooks the reader...

## Problem Statement

Describe the problem or topic...

## Solution Overview

Explain the solution at a high level...

### Step 1: First Step

Detailed instructions...

### Step 2: Second Step

More detailed instructions...

## Best Practices

List of best practices:

1. Practice 1
2. Practice 2
3. Practice 3

## Code Example

```javascript
// Example code
const implementation = () => {
  // Implementation details
};
```

## Conclusion

Summary and call to action...
```

### Testing Your Article

1. Save your changes
2. Navigate to `http://localhost:3000/news`
3. Find your article in the list
4. Click to view the full article
5. Check formatting, links, and images

### Troubleshooting

**Article not showing up?**
- Check that the slug in `articles.ts` matches the MDX filename
- Restart the development server

**Formatting looks wrong?**
- Ensure proper Markdown syntax
- Check for missing blank lines between elements

**Images not loading?**
- Use valid image URLs
- Consider using Unsplash for high-quality free images

## Need Help?

- [MDX Documentation](https://mdxjs.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)

