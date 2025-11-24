"use client";

import { useState, useRef, MouseEvent } from 'react';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  zoomLevel?: number;
  className?: string;
}

export default function ImageMagnifier({
  src,
  alt,
  zoomLevel = 2.5,
  className = '',
}: ImageMagnifierProps) {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();

    // 计算鼠标在容器中的位置（百分比）
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div className="flex gap-4 items-start">
      {/* 左侧：主图区域 */}
      <div
        ref={containerRef}
        className="relative flex-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={className}
          style={{ display: 'block' }}
        />

        {/* 遮罩层 - 显示当前放大的区域 */}
        {showZoom && (
          <div
            className="absolute border-2 border-red-500 bg-red-500/10 pointer-events-none"
            style={{
              width: '40%',
              height: '40%',
              left: `${Math.min(Math.max(position.x - 20, 0), 60)}%`,
              top: `${Math.min(Math.max(position.y - 20, 0), 60)}%`,
            }}
          />
        )}
      </div>

      {/* 右侧：放大显示区域 */}
      {showZoom && (
        <div 
          className="sticky top-6 bg-white border-2 border-gray-200 shadow-xl overflow-hidden"
          style={{
            width: '500px',
            height: '500px',
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}
    </div>
  );
}
