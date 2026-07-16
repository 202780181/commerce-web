// TypeScript 类型定义，用于 CSS 导入
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
