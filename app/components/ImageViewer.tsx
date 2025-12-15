"use client";

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageViewer({ src, alt, isOpen, onClose }: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 重置状态
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // 键盘事件
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, scale]);

  // 放大
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 5));
  };

  // 缩小
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.25));
  };

  // 适应屏幕
  const handleFitScreen = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  // 旋转
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // 下载图片
  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = alt || 'image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // 鼠标滚轮缩放
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.25, Math.min(prev + delta, 5)));
  };

  // 添加滚轮事件监听
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isOpen) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(0.25, Math.min(prev + delta, 5)));
    };

    container.addEventListener('wheel', wheelHandler, { passive: false });
    return () => container.removeEventListener('wheel', wheelHandler);
  }, [isOpen]);
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (scale !== 1) {  // 只要不是默认缩放就允许拖拽
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  // 拖拽移动
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // 拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white flex flex-col"
          onClick={onClose}
        >
          {/* 顶部工具栏 */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-between px-4 z-10 border-b border-gray-200">
            <div className="text-gray-900 text-base font-medium truncate max-w-xl">
              {alt}
            </div>
            <button
              onClick={onClose}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 图片容器 */}
          <div
            ref={containerRef}
            className="flex-1 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : scale !== 1 ? 'grab' : 'default' }}
          >
            <motion.img
              ref={imageRef}
              src={src}
              alt={alt}
              className="max-w-none select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              }}
              draggable={false}
            />
          </div>

          {/* 底部工具栏 */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md flex items-center justify-center gap-3 z-10 border-t border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 缩放比例显示 */}
            <div className="text-gray-900 text-base font-medium min-w-[70px] text-center bg-gray-100 rounded-lg px-3 py-2">
              {Math.round(scale * 100)}%
            </div>

            {/* 分隔线 */}
            <div className="h-8 w-px bg-gray-300"></div>

            {/* 放大 */}
            <button
              onClick={handleZoomIn}
              disabled={scale >= 5}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all flex items-center justify-center group"
              title="Zoom In (+)"
            >
              <svg className="w-5 h-5 text-gray-700 group-disabled:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 8v6m-3-3h6" />
              </svg>
            </button>

            {/* 缩小 */}
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.25}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all flex items-center justify-center group"
              title="Zoom Out (-)"
            >
              <svg className="w-5 h-5 text-gray-700 group-disabled:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M8 11h6" />
              </svg>
            </button>

            {/* 分隔线 */}
            <div className="h-8 w-px bg-gray-300"></div>

            {/* 适应屏幕 */}
            <button
              onClick={handleFitScreen}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center"
              title="Fit Screen"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            {/* 旋转 */}
            <button
              onClick={handleRotate}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center"
              title="Rotate"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* 分隔线 */}
            {/* <div className="h-8 w-px bg-gray-300"></div> */}

            {/* 下载 */}
            {/* <button
              onClick={handleDownload}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center"
              title="Download"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
