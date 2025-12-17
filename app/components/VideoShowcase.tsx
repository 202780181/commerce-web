"use client";

import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";

export interface Video {
  id: number;
  title: string;
  video_url: string;
  sort: number;
  created_at: string;
  updated_at: string;
  // properties below are optional or future-proof based on user description
  file_size?: number;
  duration?: number;
  format?: string;
}

interface VideoShowcaseProps {
  videos: Video[];
}

export default function VideoShowcase({ videos = [] }: VideoShowcaseProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  // Scroll state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  useEffect(() => {
    const container = document.getElementById('videos-scroll-container');
    
    const checkScroll = () => {
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 1);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    if (container) {
      checkScroll();
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [videos]);

  // If no videos, don't render content
  if (!videos || videos.length === 0) {
    return null;
  }

  // Modal Content
  const Modal = (
    <AnimatePresence>
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close Button - Top Right */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 z-[10000] p-4 text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <div className="bg-gray-100 rounded-full p-2 group-hover:bg-gray-200 transition-colors">
              <X className="w-6 h-6" />
            </div>
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Apple-like ease
            className="relative w-full max-w-5xl mx-4 aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player Container */}
            <div className="relative w-full h-full group">
               <AppleStylePlayer src={selectedVideo.video_url} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Scroll handler
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('videos-scroll-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden relative z-10">
      <div className="mx-auto px-6 lg:px-8" style={{ maxWidth: '1450px' }}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
        >
             <h2 
                className="block text-gray-900"
                style={{ fontSize: '40px', fontWeight: 'normal' }}
             >
                VIDEOS
            </h2>
        </motion.div>

        <div className="relative">
          <div
            id="videos-scroll-container"
            className="flex gap-8 overflow-x-auto scroll-smooth pb-8 [&::-webkit-scrollbar]:hidden"
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
          >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer min-w-[300px] md:min-w-[400px] flex-shrink-0"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Card Image Area with Overlay Content */}
              <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                {/* Placeholder Cover/Background */}
                <div className="absolute inset-0 bg-slate-200 group-hover:bg-slate-300 transition-colors duration-300" />
                
                {/* Title - Centered */}
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
                   <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                </div>

                {/* Play Button - Bottom Right */}
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 text-gray-900 fill-gray-900 ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>

            {/* Bottom Navigation Controls */}
            <div className="flex justify-end gap-4 mt-4">
                <button
                    onClick={() => scrollContainer('left')}
                    disabled={!canScrollLeft}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        canScrollLeft
                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer shadow-sm'
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => scrollContainer('right')}
                    disabled={!canScrollRight}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        canScrollRight
                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer shadow-sm'
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
      </div>

      {/* Portal Modal */}
      {mounted ? createPortal(Modal, document.body) : null}
    </section>
  );
}

// Separate component to keep logic clean
import { useRef } from "react";
import { Pause, Volume2, VolumeX, Maximize } from "lucide-react";

function AppleStylePlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
        setDuration(videoRef.current.duration);
        // Auto play when loaded
        videoRef.current.play().catch(() => {
            // Handle autoplay policies
            setIsPlaying(false);
        });
        setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
  };
  
  const toggleFullscreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (videoRef.current) {
          if (document.fullscreenElement) {
              document.exitFullscreen();
          } else {
             // Try to make the container fullscreen if possible, or video
             videoRef.current.parentElement?.requestFullscreen();
          }
      }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const widthPercentage = (currentTime / duration) * 100;

  // Auto hide controls
  const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
          if (isPlaying) {
              setShowControls(false);
          }
      }, 3000);
  };

    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, []);

  return (
    <div 
        className="relative w-full h-full bg-black group overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain cursor-pointer"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay} 
        // We handle click on parent to toggle play, prevent double toggle if needed or rely on parent
        // Actually, clicking video usually toggles play too
      />
      
      {/* Click Overlay to toggle play - reusing parent div click but ensure video click doesn't conflict */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           {!isPlaying && (
               <div className="bg-black/30 backdrop-blur-sm rounded-full p-6 text-white/90 animate-in fade-in zoom-in duration-300">
                    <Play className="w-12 h-12 fill-white text-white" />
               </div>
           )}
           {/* We can also show a temporary pause icon when pausing, Apple-style often keeps it clean though */}
           {isPlaying && showControls && (
                <div className="bg-black/30 backdrop-blur-sm rounded-full p-6 text-white/90 animate-in fade-in zoom-in duration-200">
                    <Pause className="w-12 h-12 fill-white text-white" />
                </div>
           )}
      </div>

      {/* Controls Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()} // Prevent click on controls from toggling play
      >
        <div className="flex items-center gap-4 text-white/90 font-medium select-none">
           {/* Volume */}
          <button onClick={toggleMute} className="hover:text-white transition-colors p-1">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          
          {/* Current Time */}
          <span className="text-sm font-mono tracking-wider w-12">{formatTime(currentTime)}</span>
          
          {/* Progress Slider */}
          <div className="flex-1 h-1 bg-white/30 rounded-full relative group/slider cursor-pointer mx-2">
             <div 
                className="absolute left-0 top-0 bottom-0 bg-white rounded-full transition-all duration-100"
                style={{ width: `${widthPercentage || 0}%` }}
             />
             <input 
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
             />
          </div>

          {/* Remaining Time */}
          <span className="text-sm font-mono tracking-wider w-16 text-right text-white/70">
            -{formatTime(duration - currentTime)}
          </span>
          
           {/* Fullscreen */}
           <button onClick={toggleFullscreen} className="hover:text-white transition-colors p-1">
             <Maximize className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
}
