"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { motion } from "motion/react";
import { getProductDetailImages } from "../../../lib/productDetailImages";
import productSpecifications from "../../../lib/product-specifications.json";
import { usePageCache } from "../../../hooks/usePageCache";

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

// 产品文件夹映射
const productFolderMap: Record<string, string> = {
  "modular-combined-display": "01 Modular Combined Display",
  "quick-release-jaws-vise": "02 Quick Release Jaws Vise",
  "manual-vise-series": "03 Manual Vise Series",
  "pneumatic-vise-pressurization": "04 Pneumatic Vise Series(With Pressurization",
  "pneumatic-vise-pneumatic": "05 Pneumatic Vise Series(Pneumatic Type",
  "zero-point-aluminum": "06 Zero Point Clamping(Aluminum Base",
  "zero-point-steel": "07 Zero Point Clamping(Steel Base)",
  "high-precision-zero-point": "08 High Precision Zero Point Clamping",
  "high-precision-pneumatic-zero": "09.High Precision Pneumatic Zero Point Clamping",
  "pull-studs-series": "10 Pull Studs Series",
  "dovetail-fixture": "11 Dovetail Fixture",
  "er-clamping-series": "12 ER Clamping Series",
  "modular-combination": "13 Modular Combination Series",
  "modular-set-series": "14 Modular Set Series",
  "bridge-plate-series": "15 L Bridge Plate Series",
  "5axis-pyramid-series": "16 5Axis Pyramid Series",
  "run-out-tester": "17 Run_out Tester",
  "unilateral-positione": "18 Unilateral Positione",
  "cnc-tombstone-series": "19 CNC Tombstone Series",
  "precision-bench-vice": "20 Precision Bench Vice",
  "hydraulic-bite-machine": "21 Hydraulic Bite Machine",
  "pneumatic-single-hole-zero": "22 Pneumatic Single Hole Zero Plate Series",
};

interface FileSystemItem {
  name: string;
  type: 'folder' | 'image';
  path: string;
  url?: string;
  fileName?: string;
  thumbnailUrl?: string;
}

export default function DynamicPathPage() {
  const params = useParams();
  const productId = params.id as string;
  
  // 页面缓存
  usePageCache();
  const pathSegments = params.path as string[];
  
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isImageDetail, setIsImageDetail] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<FileSystemItem[]>([]);
  const [displayMode, setDisplayMode] = useState<'gallery' | 'detail'>('gallery');

  useEffect(() => {
    fetchPathContent();
  }, [productId, pathSegments]);

  const fetchPathContent = async () => {
    try {
      setLoading(true);
      
      // 检查最后一段是否为图片索引（纯数字）
      const lastSegment = pathSegments[pathSegments.length - 1];
      const imageIndex = parseInt(lastSegment);
      
      if (!isNaN(imageIndex)) {
        // 这是图片详情页
        setIsImageDetail(true);
        setCurrentImageIndex(imageIndex);
        
        // 获取父路径的所有图片
        const parentPath = pathSegments.slice(0, -1);
        const response = await fetch(`/api/products/filesystem?productId=${productId}&path=${parentPath.join('/')}`);
        const data = await response.json();
        
        const images = data.items.filter((item: FileSystemItem) => item.type === 'image');
        setAllImages(images);
      } else {
        // 这是文件夹浏览页
        setIsImageDetail(false);
        const response = await fetch(`/api/products/filesystem?productId=${productId}&path=${pathSegments.join('/')}`);
        const data = await response.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching path content:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // 构建面包屑导航
  const buildBreadcrumbs = () => {
    const breadcrumbs = [{ name: 'Products', path: '/products' }];
    
    const productName = productFolderMap[productId]?.replace(/^\d+\s+/, '') || productId;
    breadcrumbs.push({ name: productName, path: `/products/${productId}` });
    
    let currentPath = `/products/${productId}`;
    for (let i = 0; i < pathSegments.length; i++) {
      // 跳过数字索引（图片详情）
      if (isImageDetail && i === pathSegments.length - 1) {
        break;
      }
      currentPath += `/${pathSegments[i]}`;
      breadcrumbs.push({ name: decodeURIComponent(pathSegments[i]), path: currentPath });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  // 如果是图片详情页
  if (isImageDetail && allImages.length > 0) {
    const currentImage = allImages[currentImageIndex];
    const parentPath = `/products/${productId}/${pathSegments.slice(0, -1).join('/')}`;
    
    // 获取产品详情页图片（从 pdf照片_1763725000895 目录）
    const detailImages = getProductDetailImages(productId);
    // 根据当前图片名称匹配详情图片
    const matchedDetailImage = detailImages.find(img => {
      // 移除扩展名并转小写
      const currentName = currentImage.name.replace(/\.(webp|jpg|jpeg|png|gif)$/i, '').toLowerCase();
      const detailName = img.name.toLowerCase();
      
      // 标准化括号：将中文括号替换为英文括号
      const normalizeParentheses = (str: string) => {
        return str.replace(/（/g, '(').replace(/）/g, ')');
      };
      
      const normalizedCurrent = normalizeParentheses(currentName);
      const normalizedDetail = normalizeParentheses(detailName);
      
      // 检查是否匹配
      return normalizedCurrent.includes(normalizedDetail) || normalizedDetail.includes(normalizedCurrent);
    });
    
    // 根据图片名称匹配产品规格参数
    const getProductSpecs = (imageName: string) => {
      // 移除文件扩展名
      const nameWithoutExt = imageName.replace(/\.(webp|jpg|jpeg|png|gif)$/i, '');
      
      // 尝试精确匹配
      if (productSpecifications[nameWithoutExt as keyof typeof productSpecifications]) {
        return productSpecifications[nameWithoutExt as keyof typeof productSpecifications];
      }
      
      // 尝试模糊匹配（去除括号内容）
      const baseName = nameWithoutExt.replace(/\s*\([^)]*\)/g, '').trim();
      for (const [key, specs] of Object.entries(productSpecifications)) {
        const keyBase = key.replace(/\s*\([^)]*\)/g, '').trim();
        if (keyBase === baseName || key.includes(baseName) || baseName.includes(keyBase)) {
          return specs;
        }
      }
      
      return null;
    };
    
    const productSpecs = getProductSpecs(currentImage.name);

    return (
      <div className="min-h-screen bg-gray-50">
        <Header lightBackground={false} />
        
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400">/</span>}
                <Link
                  href={crumb.path}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {crumb.name}
                </Link>
              </div>
            ))}
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{currentImage.name}</span>
          </div>
        </div>

        {/* Image Detail Layout */}
        <section className="py-8 px-6">
          <div className="max-w-[1400px] mx-auto">
            <Link
              href={parentPath}
              className="text-purple-600 hover:text-purple-700 mb-6 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Gallery
            </Link>

            <div className="grid grid-cols-12 gap-6">
              {/* Left: Thumbnail List */}
              <div className="col-span-1">
                <div className="flex flex-col gap-2">
                  {/* Gallery Image Thumbnail */}
                  <button
                    onClick={() => setDisplayMode('gallery')}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      displayMode === 'gallery'
                        ? 'border-purple-600 shadow-md'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    title="Gallery Image"
                  >
                    <img
                      src={currentImage.url}
                      alt="Gallery"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Detail Image Thumbnail */}
                  {matchedDetailImage && (
                    <button
                      onClick={() => setDisplayMode('detail')}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        displayMode === 'detail'
                          ? 'border-blue-600 shadow-md'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      title="Detail Image"
                    >
                      <img
                        src={matchedDetailImage.url}
                        alt="Detail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Main Display Area */}
              <div className="col-span-7">
                <motion.div
                  key={displayMode === 'gallery' ? `gallery-${currentImageIndex}` : 'detail'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200"
                >
                  <div className="relative bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={displayMode === 'gallery' ? currentImage.url : matchedDetailImage?.url || currentImage.url}
                      alt={displayMode === 'gallery' ? currentImage.name : matchedDetailImage?.name || currentImage.name}
                      className="w-full h-auto max-h-[600px] object-contain"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Right: Product Information */}
              <div className="col-span-4">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentImage.name}
                  </h1>
                  
                  {productSpecs ? (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="text-base font-bold text-gray-900 mb-3">Product Specifications</h3>
                      
                      <div className="space-y-2">
                        {Object.entries(productSpecs).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm text-gray-600 font-medium min-w-[100px]">{key}:</span>
                            <span className="text-sm text-gray-900 text-right break-all ml-2 flex-1">
                              {value as string}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="text-base font-bold text-gray-900 mb-3">File Information</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-sm text-gray-600">File name:</span>
                          <span className="text-sm text-gray-900 font-medium text-right break-all ml-2">
                            {currentImage.fileName}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-start">
                          <span className="text-sm text-gray-600">Type:</span>
                          <span className="text-sm text-gray-900 font-medium">
                            {displayMode === 'gallery' ? 'Gallery Image' : 'Detail Image'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // 文件夹浏览页
  const currentPath = breadcrumbs[breadcrumbs.length - 1];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header lightBackground={false} />
      
      {/* 面包屑导航 */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium">{crumb.name}</span>
              ) : (
                <Link
                  href={crumb.path}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hero区域 */}
      <section className="relative py-20 px-6 bg-linear-to-br from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={breadcrumbs[breadcrumbs.length - 2]?.path || '/products'}
              className="text-white/80 hover:text-white mb-6 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {currentPath.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="py-20 px-6">
        <div className="max-w-[1600px] mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Empty Folder</h3>
              <p className="text-gray-600 text-lg">This folder doesn't contain any items.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group"
                >
                  <Link
                    href={
                      item.type === 'folder'
                        ? `/products/${productId}/${pathSegments.join('/')}/${item.fileName}`
                        : `/products/${productId}/${pathSegments.join('/')}/${index - items.filter(i => i.type === 'folder').length}`
                    }
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
                      {item.type === 'folder' ? (
                        // 文件夹显示 - 显示第一张图片作为缩略图
                        <>
                          <div className="relative h-80 overflow-hidden bg-gray-50">
                            {item.thumbnailUrl ? (
                              <img
                                src={item.thumbnailUrl}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                            ) : (
                              // 如果没有图片，显示文件夹图标
                              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                                <svg className="w-32 h-32 text-gray-400 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                </svg>
                              </div>
                            )}
                            {/* 文件夹标识 */}
                            <div className="absolute top-4 left-4 bg-yellow-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                              </svg>
                              <span className="text-xs font-bold text-white">Folder</span>
                            </div>
                          </div>
                          
                          {/* 文件夹名称 */}
                          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-700 truncate text-center">
                              {item.name}
                            </p>
                          </div>
                        </>
                      ) : (
                        // 图片显示
                        <>
                          <div className="relative h-80 overflow-hidden bg-gray-50">
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-sm font-bold text-gray-700">
                                #{index - items.filter(i => i.type === 'folder').length + 1}
                              </span>
                            </div>
                          </div>
                          
                          {/* 图片名称 */}
                          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-700 truncate text-center">
                              {item.name}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
