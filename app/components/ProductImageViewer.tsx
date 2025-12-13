'use client';

import { useState } from 'react';
import { Maximize2, ZoomIn } from 'lucide-react';
import ImageViewer from './ImageViewer';

interface ProductImageViewerProps {
  src: string;
  alt: string;
  maxHeight?: string; // 可选的最大高度，例如 "800px" 或 "100%"
}

export default function ProductImageViewer({ src, alt, maxHeight = "600px" }: ProductImageViewerProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div 
        className="relative w-full bg-white rounded-lg border border-gray-200 overflow-hidden group cursor-zoom-in"
        style={{ height: maxHeight }}
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* Main Image - Fixed Size Container */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <img 
            src={src} 
            alt={alt} 
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Hover Overlay with Tooltip */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn className="w-4 h-4" />
            <span className="text-sm font-medium">Click to view</span>
          </div>
        </div>

        {/* Expand Button (Trigger for Lightbox) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg text-gray-700 hover:text-purple-600 hover:border-purple-200 transition-all transform translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 z-20"
          title="View Fullscreen"
        >
          <Maximize2 className="w-6 h-6" />
        </button>
      </div>

      {/* Lightbox Viewer */}
      <ImageViewer 
        src={src} 
        alt={alt} 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
      />
    </>
  );
}
