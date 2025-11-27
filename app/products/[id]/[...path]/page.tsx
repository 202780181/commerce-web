"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { motion } from "motion/react";
import { usePageCache } from "../../../hooks/usePageCache";
import ImageViewer from "../../../components/ImageViewer";

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

// 产品文件夹映射
const productFolderMap: Record<string, string> = {
  "modular-combined-display": "01 Modular Combined Display",
  "quick-release-jaws-vise": "02 Quick Release Jaws Vise",
  "manual-vise-series": "03 Manual Vise Series",
  "pneumatic-vise-serieswith-pressurization": "04 Pneumatic Vise Series(With Pressurization",
  "pneumatic-vise-seriespneumatic-type": "05 Pneumatic Vise Series(Pneumatic Type",
  "zero-point-clampingaluminum-base": "06 Zero Point Clamping(Aluminum Base",
  "zero-point-clampingsteel-base": "07 Zero Point Clamping(Steel Base)",
  "high-precision-zero-point-clamping": "08 High Precision Zero Point Clamping",
  "high-precision-pneumatic-zero-point-clamping": "09 High Precision Pneumatic Zero Point Clamping",
  "pull-studs-series": "10 Pull Studs Series",
  "dovetail-fixture": "11 Dovetail Fixture",
  "er-clamping-series": "12 ER Clamping Series",
  "modular-combination-series": "13 Modular Combination Series",
  "modular-set-series": "14 Modular Set Series",
  "l-bridge-plate-series": "15 L Bridge Plate Series",
  "5axis-pyramid-series": "16 5Axis Pyramid Series",
  "run_out-tester": "17 Run_out Tester",
  "unilateral-positione": "18 Unilateral Positione",
  "cnc-tombstone-series": "19 CNC Tombstone Series",
  "precision-bench-vice": "20 Precision Bench Vice",
  "hydraulic-bite-machine": "21 Hydraulic Bite Machine",
  "pneumatic-single-hole-zero-plate-series": "22 Pneumatic Single Hole Zero Plate Series",
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
  const [displayMode, setDisplayMode] = useState<'gallery' | 'detail' | 'pdf'>('gallery');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [productDetail, setProductDetail] = useState<{
    name: string;
    lineDrawing: string;
    productImage: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    fetchPathContent();
  }, [productId, pathSegments]);

  // 获取产品详情（线条图等）
  useEffect(() => {
    if (isImageDetail && pathSegments.length > 0) {
      // 从路径中的最后一段（detail_XXX）获取文件夹名
      const lastSegment = pathSegments[pathSegments.length - 1];
      
      console.log('Fetching product detail for folder:', lastSegment);
      
      fetch(`/api/products/detail?productId=${productId}&detailFolder=${encodeURIComponent(lastSegment)}`)
        .then(res => res.json())
        .then(data => {
          console.log('Product detail response:', data);
          if (data.productDetail) {
            const detail = data.productDetail;
            
            // 如果有 descriptionUrl，从 COS 获取 txt 内容
            if (detail.descriptionUrl) {
              console.log('Fetching description from:', detail.descriptionUrl);
              fetch(detail.descriptionUrl)
                .then(res => res.text())
                .then(text => {
                  console.log('Description loaded:', text.substring(0, 100));
                  setProductDetail({
                    ...detail,
                    description: text
                  });
                })
                .catch(error => {
                  console.error('Error fetching description:', error);
                  setProductDetail(detail);
                });
            } else {
              console.log('No descriptionUrl found');
              setProductDetail(detail);
            }
          }
        })
        .catch(error => {
          console.error('Error fetching product detail:', error);
        });
    }
  }, [isImageDetail, pathSegments, productId]);

  const fetchPathContent = async () => {
    try {
      setLoading(true);
      
      // 检查最后一段路径
      const lastSegment = pathSegments[pathSegments.length - 1];
      
      // 如果是 detail_ 开头的文件夹，直接显示详情页
      if (lastSegment.startsWith('detail_')) {
        setIsImageDetail(true);
        setCurrentImageIndex(0);
        
        // 获取该 detail 文件夹的图片
        const response = await fetch(`/api/products/filesystem?productId=${productId}&path=${pathSegments.join('/')}`);
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
      currentPath += `/${pathSegments[i]}`;
      // 去掉 detail_ 前缀显示
      const displayName = pathSegments[i].replace(/^detail_/i, '').trim();
      breadcrumbs.push({ name: displayName, path: currentPath });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  // 如果是图片详情页
  if (isImageDetail && allImages.length > 0) {
    const currentImage = allImages[currentImageIndex];
    const parentPath = `/products/${productId}`;

    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Header lightBackground={true} />
        
        {/* Breadcrumb Navigation */}
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

                  {/* Line Drawing Thumbnail */}
                  {productDetail?.lineDrawing && (
                    <button
                      onClick={() => setDisplayMode('pdf')}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        displayMode === 'pdf'
                          ? 'border-green-600 shadow-md'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      title="Line Drawing"
                    >
                      <img
                        src={productDetail.lineDrawing}
                        alt="Line Drawing"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Main Display Area */}
              <div className="col-span-7">
                <motion.div
                  key={displayMode === 'gallery' ? `gallery-${currentImageIndex}` : displayMode === 'pdf' ? 'pdf' : 'detail'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer group"
                  onClick={() => setViewerOpen(true)}
                >
                  <div className="relative bg-gray-50 flex items-center justify-center p-4 min-h-[600px]">
                    <img
                      src={
                        displayMode === 'gallery' 
                          ? currentImage.url || ''
                          : displayMode === 'pdf' && productDetail?.lineDrawing
                            ? productDetail.lineDrawing
                            : currentImage.url || ''
                      }
                      alt={
                        displayMode === 'gallery' 
                          ? currentImage.name 
                          : displayMode === 'pdf' && productDetail
                            ? `${productDetail.name} Line Drawing`
                            : currentImage.name
                      }
                      className="w-full h-auto max-h-[600px] object-contain relative z-10"
                      loading="eager"
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = '1';
                        const placeholder = target.nextElementSibling;
                        if (placeholder) (placeholder as HTMLElement).style.display = 'none';
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = '1';
                        const placeholder = target.nextElementSibling;
                        if (placeholder) (placeholder as HTMLElement).style.display = 'none';
                      }}
                      style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                    />
                    {/* 加载占位图 */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-400">Loading image...</p>
                      </div>
                    </div>
                    {/* 点击查看提示 */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 pointer-events-none">
                      <div className="bg-black/60 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        <span>Click to view</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right: Product Information */}
              <div className="col-span-4">
                <div className="bg-linear-to-br from-white to-gray-50 rounded-xl shadow-xl border border-gray-100 overflow-hidden sticky top-6">
                  {/* Header Section */}
                  <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6">
                    <h1 className="text-2xl font-bold text-white">
                      {currentImage.name}
                    </h1>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    {productDetail?.description && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-1 h-6 bg-linear-to-b from-purple-600 to-blue-600 rounded-full"></div>
                          <h3 className="text-lg font-bold text-gray-900">Product Specifications</h3>
                        </div>
                        
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                          <div className="space-y-2.5">
                            {productDetail.description.split('\n').map((line, index) => {
                              const trimmedLine = line.trim();
                              if (!trimmedLine) return null;
                              
                              // 检查是否包含冒号，分割为键值对
                              const colonIndex = trimmedLine.indexOf(':');
                              if (colonIndex > 0) {
                                const key = trimmedLine.substring(0, colonIndex).trim();
                                const value = trimmedLine.substring(colonIndex + 1).trim();
                                return (
                                  <div key={index} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                                    <span className="text-sm font-semibold text-gray-700 min-w-[140px] flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                                      {key}:
                                    </span>
                                    <span className="text-sm text-gray-800 flex-1">{value}</span>
                                  </div>
                                );
                              }
                              
                              return (
                                <div key={index} className="py-1.5">
                                  <span className="text-sm text-gray-800">{trimmedLine}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 图片查看器 */}
        <ImageViewer
          src={
            displayMode === 'gallery' 
              ? currentImage.url || ''
              : displayMode === 'pdf' && productDetail?.lineDrawing
                ? productDetail.lineDrawing
                : currentImage.url || ''
          }
          alt={
            displayMode === 'gallery' 
              ? currentImage.name 
              : displayMode === 'pdf' && productDetail
                ? `${productDetail.name} Line Drawing`
                : currentImage.name
          }
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
        />

        <Footer />
      </div>
    );
  }

  // 文件夹浏览页
  const currentPath = breadcrumbs[breadcrumbs.length - 1];
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header lightBackground={true} />
      
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
                        ? pathSegments.length > 0
                          ? `/products/${productId}/${pathSegments.join('/')}/${item.fileName}`
                          : `/products/${productId}/${item.fileName}`
                        : `/products/${productId}/${pathSegments.join('/')}/${index - items.filter(i => i.type === 'folder').length}`
                    }
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
                      {item.type === 'folder' ? (
                        // 文件夹显示 - 显示第一张图片作为缩略图
                        <>
                          <div className="relative h-80 overflow-hidden bg-gray-50">
                            {item.thumbnailUrl ? (
                              <>
                                <img
                                  src={item.thumbnailUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  loading="lazy"
                                  onLoad={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    const placeholder = target.nextElementSibling;
                                    if (placeholder) placeholder.classList.add('hidden');
                                  }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    const placeholder = target.nextElementSibling;
                                    if (placeholder) placeholder.classList.add('hidden');
                                  }}
                                />
                                {/* 缩略图加载占位符 */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 pointer-events-none">
                                  <svg className="w-20 h-20 text-gray-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              </>
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
                              onLoad={(e) => {
                                const target = e.target as HTMLImageElement;
                                const placeholder = target.nextElementSibling;
                                if (placeholder) placeholder.classList.add('hidden');
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const placeholder = target.nextElementSibling;
                                if (placeholder) placeholder.classList.add('hidden');
                              }}
                            />
                            {/* 图片加载占位符 */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 pointer-events-none">
                              <svg className="w-20 h-20 text-gray-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
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
