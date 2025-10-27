"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // 轮播图数据
  const slides = [
    {
      id: 1,
      title: "Explore Every Moment",
      subtitle: "Launch with 10x Speed",
      gradient: "from-purple-600 to-blue-600",
      bgGradient: "from-purple-900/90 via-blue-900/80 to-purple-800/90",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
      animationType: "slide3d", // 3D卡片滑动
    },
    {
      id: 2,
      title: "Personalize Infinitely",
      subtitle: "Power Your Growth",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-900/90 via-cyan-900/80 to-blue-800/90",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80",
      animationType: "ripple", // 水波效果
    },
    {
      id: 3,
      title: "AI-First Platform",
      subtitle: "Transform Your Business",
      gradient: "from-indigo-600 to-purple-600",
      bgGradient: "from-indigo-900/90 via-purple-900/80 to-indigo-800/90",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
      animationType: "fade", // 缩放淡入淡出
    },
  ];

  // 三种不同的动画变体
  const getAnimationVariants = (type: string) => {
    switch (type) {
      case "slide3d":
        // 风格1：3D卡片式滑动（类似酷狗音乐）
        return {
          initial: {
            x: direction > 0 ? "100%" : "-100%",
            scale: 0.9,
            rotateY: direction > 0 ? -15 : 15,
            opacity: 0
          },
          animate: {
            x: 0,
            scale: 1,
            rotateY: 0,
            opacity: 1
          },
          exit: {
            x: direction > 0 ? "-30%" : "30%",
            scale: 0.85,
            rotateY: direction > 0 ? 10 : -10,
            opacity: 0
          },
          transition: {
            duration: 0.9,
            ease: [0.32, 0.72, 0, 1] as any
          }
        };

      case "ripple":
        // 风格2：水波涟漪效果
        return {
          initial: {
            scale: 0.5,
            opacity: 0,
            filter: "blur(20px)"
          },
          animate: {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)"
          },
          exit: {
            scale: 1.1,
            opacity: 0,
            filter: "blur(10px)"
          },
          transition: {
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96] as any
          }
        };

      case "fade":
        // 风格3：缩放淡入淡出 + Ken Burns
        return {
          initial: {
            scale: 1.2,
            opacity: 0
          },
          animate: {
            scale: 1,
            opacity: 1
          },
          exit: {
            scale: 0.9,
            opacity: 0
          },
          transition: {
            duration: 1,
            ease: "easeInOut" as any
          }
        };

      default:
        return {
          initial: {},
          animate: {},
          exit: {},
          transition: {}
        };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 每5秒切换

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideChange = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const currentAnimation = getAnimationVariants(slides[currentSlide].animationType);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          initial={currentAnimation.initial}
          animate={currentAnimation.animate}
          exit={currentAnimation.exit}
          transition={currentAnimation.transition}
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          {/* 背景图片 */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            initial={{ scale: slides[currentSlide].animationType === "fade" ? 1 : 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* 渐变遮罩 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient}`} />

          {/* 内容 */}
          <div className="relative h-full flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
              {/* 顶部公告横幅 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8 flex justify-center"
              >
                <div className="rounded-full bg-white/20 backdrop-blur-md px-6 py-2 text-sm font-medium text-white border border-white/30">
                  Simon Data Is Now Simon AI - Read the Launch Announcement Here
                </div>
              </motion.div>

              {/* 主标题 */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6"
              >
                {slides[currentSlide].title}
              </motion.h1>

              {/* 副标题 */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className={`text-4xl font-bold tracking-tight bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent sm:text-5xl lg:text-6xl mb-8`}
                style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
              >
                {slides[currentSlide].subtitle}
              </motion.h2>

              {/* 按钮 */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg hover:shadow-xl transition-all"
              >
                Talk to us
              </motion.button>

              {/* 底部描述文字 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mt-12 text-center text-sm text-white/90 max-w-4xl mx-auto"
              >
                The AI-first composable customer data platform for the fastest-growing
                brands and Fortune 500 leaders
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 轮播指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`transition-all duration-300 rounded-full ${currentSlide === index
              ? "bg-white w-12 h-3"
              : "bg-white/50 w-3 h-3 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}

