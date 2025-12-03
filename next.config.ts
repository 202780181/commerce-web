import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // 启用 React 严格模式
  reactStrictMode: true,

  // 生产环境保留所有 console 输出
  compiler: {
    removeConsole: false,
  },

  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.gzxfjxyxgs.com',
        port: '',
        pathname: '/**',
      },
    ],
    // 临时禁用优化来测试URL问题
    unoptimized: true,
  },


  // 实验性特性
  experimental: {
    // 优化字体加载
    optimizePackageImports: ["motion", "react-icons"],
  },

  // 输出配置 - 在 Windows 开发环境中暂时禁用
  // output: "standalone", // 适用于 Docker 部署，在 Windows 上可能有权限问题

  // 压缩配置
  compress: true,

  // 页面扩展名
  pageExtensions: ["tsx", "ts", "jsx", "js", "mdx"],

  // 环境变量配置
  env: {
    NEXT_PUBLIC_APP_NAME: "Commerce Web",
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || "0.1.0",
  },

  // Turbopack 配置（Next.js 16+ 默认启用）
  turbopack: {
    // 模块别名配置
    resolveAlias: {
      // '@': './src',
      // '@components': './src/components',
      // '@utils': './src/utils',
    },

    // 自定义 loader 规则
    rules: {
      // SVG 作为 React 组件导入（需要安装 @svgr/webpack）
      // '*.svg': {
      //   loaders: ['@svgr/webpack'],
      //   as: '*.js',
      // },
      
      // 自定义字体加载
      // '*.woff2': {
      //   loaders: ['file-loader'],
      //   as: '*.js',
      // },

      // YAML 文件支持
      // '*.yaml': {
      //   loaders: ['yaml-loader'],
      //   as: '*.js',
      // },
    },

    // 解析扩展名
    resolveExtensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
      '.mdx', // 启用 MDX 支持
    ],

    // Module ID 策略
    // moduleIdStrategy: 'deterministic', // 'named' | 'deterministic' | 'size'
  },

  // Webpack 配置（仅在使用 --webpack 标志时生效）
  webpack: (config, { isServer }) => {
    // 添加自定义 webpack 配置
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // SVG 支持（如需要）
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack"],
    // });

    return config;
  },

  // 重定向配置
  async redirects() {
    return [
      // 示例重定向
      // {
      //   source: "/old-path",
      //   destination: "/new-path",
      //   permanent: true,
      // },
    ];
  },

  // 重写配置
  async rewrites() {
    return [
      // API 代理 - 避免混合内容问题
      {
        source: "/api/proxy/:path*",
        destination: "http://43.139.139.215/api/api/v1/:path*",
      },
    ];
  },

  // Headers 配置
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // TypeScript 配置
  typescript: {
    // 生产构建时不忽略类型错误
    ignoreBuildErrors: false,
  },

  // 性能分析（开发时使用）
  // productionBrowserSourceMaps: true,
} satisfies NextConfig;

// 配置 MDX
const withMDX = createMDX({
  // 添加 markdown 插件
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// 合并 MDX 配置
export default withMDX(nextConfig);
