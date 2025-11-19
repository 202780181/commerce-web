"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { motion } from "motion/react";

const COS_BASE_URL = "https://work-1251384833.cos.ap-singapore.myqcloud.com/products";

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
}

export default function DynamicPathPage() {
  const params = useParams();
  const productId = params.id as string;
  const pathSegments = params.path as string[];
  
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isImageDetail, setIsImageDetail] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<FileSystemItem[]>([]);

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

  const [displayMode, setDisplayMode] = useState<'image' | 'pdf'>('image');
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);

  // 如果是图片详情页
  if (isImageDetail && allImages.length > 0) {
    const currentImage = allImages[currentImageIndex];
    const parentPath = `/products/${productId}/${pathSegments.slice(0, -1).join('/')}`;
    
    // 假设PDF文件（待实现：从API获取PDF列表）
    const pdfFiles = [
      {
        name: "Product Specification",
        url: "https://example.com/spec.pdf"
      }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <Header lightBackground={false} />
        
        {/* 面包屑导航 */}
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

        {/* 图片详情 - 新布局 */}
        <section className="py-12 px-6">
          <div className="max-w-[1800px] mx-auto">
            <Link
              href={parentPath}
              className="text-purple-600 hover:text-purple-700 mb-6 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Gallery
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧：大图展示区 */}
              <div className="lg:col-span-2">
                <motion.div
                  key={displayMode === 'image' ? currentImageIndex : `pdf-${selectedPdfIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="relative aspect-4/3 bg-gray-100">
                    {displayMode === 'image' ? (
                      <img
                        src={currentImage.url}
                        alt={currentImage.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <iframe
                        src={pdfFiles[selectedPdfIndex]?.url}
                        className="w-full h-full"
                        title={pdfFiles[selectedPdfIndex]?.name}
                      />
                    )}
                    
                    {/* 类型标签 */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-sm font-bold text-gray-700">
                        {displayMode === 'image' ? '图片' : 'PDF文档'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* 底部：缩略图切换区 */}
                <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">线条图（缩略图）</h3>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
                    {/* 图片缩略图 */}
                    <button
                      onClick={() => {
                        setDisplayMode('image');
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        displayMode === 'image'
                          ? 'border-purple-600 shadow-lg ring-2 ring-purple-300'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <img
                        src={currentImage.url}
                        alt="图片"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center">
                        图片
                      </div>
                    </button>

                    {/* PDF缩略图 */}
                    {pdfFiles.map((pdf, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDisplayMode('pdf');
                          setSelectedPdfIndex(index);
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          displayMode === 'pdf' && selectedPdfIndex === index
                            ? 'border-blue-600 shadow-lg ring-2 ring-blue-300'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="w-full h-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center">
                          PDF
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧：参数信息区 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">参数</h3>
                  
                  {/* 产品名称 */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {currentImage.name}
                    </h4>
                    <p className="text-sm text-gray-500">文件名: {currentImage.fileName}</p>
                  </div>

                  {/* 产品参数 */}
                  <div className="space-y-4">
                    <div className="border-t border-gray-200 pt-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-3">技术规格</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">尺寸:</span>
                          <span className="font-medium text-gray-900">待添加</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">材质:</span>
                          <span className="font-medium text-gray-900">待添加</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">重量:</span>
                          <span className="font-medium text-gray-900">待添加</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-3">产品特点</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          高精度制造
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          耐用可靠
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          易于安装
                        </li>
                      </ul>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <button className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all">
                        联系咨询
                      </button>
                    </div>
                  </div>
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
                        // 文件夹显示
                        <div className="relative h-80 bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                          <svg className="w-32 h-32 text-purple-600 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-sm font-bold text-gray-700">Folder</span>
                          </div>
                        </div>
                      ) : (
                        // 图片显示
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
                      )}
                      
                      {/* 名称 */}
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 truncate text-center">
                          {item.name}
                        </p>
                      </div>
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
