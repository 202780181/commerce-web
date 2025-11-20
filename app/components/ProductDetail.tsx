"use client";

import { motion } from "motion/react";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

// 产品详情数据类型定义
export interface ProductDetailData {
	// 基本信息
	name: string;
	tagline?: string;
	category: string;
	price?: number;
	originalPrice?: number;
	rating?: number;
	reviewCount?: number;
	badge?: string; // "NEW", "BEST SELLER", "SALE" 等
	
	// 图片
	mainImage: string;
	galleryImages?: string[];
	
	// 描述
	shortDescription: string;
	fullDescription: string;
	
	// 特性/卖点
	highlights?: string[];
	
	// 产品规格
	specs?: {
		label: string;
		value: string;
	}[];
	
	// 使用说明
	howToUse?: {
		title: string;
		steps: string[];
	};
	
	// 成分/配料
	ingredients?: {
		title: string;
		content: string;
	};
	
	// 常见问题
	faqs?: {
		question: string;
		answer: string;
	}[];
	
	// 相关产品
	relatedProducts?: {
		id: number;
		name: string;
		price: number;
		image: string;
	}[];
	
	// 自定义颜色主题 (可选)
	theme?: {
		primary: string; // 例如: "purple"
		secondary: string; // 例如: "blue"
	};
}

interface ProductDetailProps {
	data: ProductDetailData;
}

// 所有产品数据
const allProducts = [
	{
		id: "modular-combined-display",
		name: "Modular Combined Display",
		image: "https://cdn.gzxfjxyxgs.com/products/01%20Modular%20Combined%20Display/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "BEST SELLER",
	},
	{
		id: "quick-release-jaws-vise",
		name: "Quick Release Jaws Vise",
		image: "https://cdn.gzxfjxyxgs.com/products/02%20Quick%20Release%20Jaws%20Vise/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "POPULAR",
	},
	{
		id: "manual-vise-series",
		name: "Manual Vise Series",
		image: "https://cdn.gzxfjxyxgs.com/products/03%20Manual%20Vise%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "NEW",
	},
	{
		id: "pneumatic-vise-pressurization",
		name: "Pneumatic Vise Series(With Pressurization)",
		image: "https://cdn.gzxfjxyxgs.com/products/04%20Pneumatic%20Vise%20Series%28With%20Pressurization/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "BEST SELLER",
	},
	{
		id: "pneumatic-vise-pneumatic",
		name: "Pneumatic Vise Series(Pneumatic Type)",
		image: "https://cdn.gzxfjxyxgs.com/products/05%20Pneumatic%20Vise%20Series%28Pneumatic%20Type/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "POPULAR",
	},
	{
		id: "zero-point-aluminum",
		name: "Zero Point Clamping(Aluminum Base)",
		image: "https://cdn.gzxfjxyxgs.com/products/06%20Zero%20Point%20Clamping%28Aluminum%20Base/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "SALE",
	},
	{
		id: "zero-point-steel",
		name: "Zero Point Clamping(Steel Base)",
		image: "https://cdn.gzxfjxyxgs.com/products/07%20Zero%20Point%20Clamping%28Steel%20Base%29/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp",
	},
	{
		id: "high-precision-zero-point",
		name: "High Precision Zero Point Clamping",
		image: "https://cdn.gzxfjxyxgs.com/products/08%20High%20Precision%20Zero%20Point%20Clamping/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "high-precision-pneumatic-zero",
		name: "High Precision Pneumatic Zero Point Clamping",
		image: "https://cdn.gzxfjxyxgs.com/products/09.High%20Precision%20Pneumatic%20Zero%20Point%20Clamping/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "pull-studs-series",
		name: "Pull Studs Series",
		image: "https://cdn.gzxfjxyxgs.com/products/10%20Pull%20Studs%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "dovetail-fixture",
		name: "Dovetail Fixture",
		image: "https://cdn.gzxfjxyxgs.com/products/11%20Dovetail%20Fixture/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp",
	},
	{
		id: "er-clamping-series",
		name: "ER Clamping Series",
		image: "https://cdn.gzxfjxyxgs.com/products/12%20ER%20Clamping%20Series/12%20ER%20Clamping%20Series/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp",
	},
	{
		id: "modular-combination",
		name: "Modular Combination Series",
		image: "https://cdn.gzxfjxyxgs.com/products/13%20Modular%20Combination%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "modular-set-series",
		name: "Modular Set Series",
		image: "https://cdn.gzxfjxyxgs.com/products/14%20Modular%20Set%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "bridge-plate-series",
		name: "Bridge Plate Series",
		image: "https://cdn.gzxfjxyxgs.com/products/15%20L%20Bridge%20Plate%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "5Axis-pyramid-series",
		name: "5Axis Pyramid Series",
		image: "https://cdn.gzxfjxyxgs.com/products/16%205Axis%20Pyramid%20Series/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp",
	},
	{
		id: "run_out-tester",
		name: "Run_out Tester",
		image: "https://cdn.gzxfjxyxgs.com/products/17%20Run_out%20Tester/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "Unilateral-Positione",
		name: "Unilateral Positione",
		image: "https://cdn.gzxfjxyxgs.com/products/18%20Unilateral%20Positione/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "cnc-tombstone-series",
		name: "CNC Tombstone Series",
		image: "https://cdn.gzxfjxyxgs.com/products/19%20CNC%20Tombstone%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "precision-bench-vice",
		name: "Precision Bench Vice",
		image: "https://cdn.gzxfjxyxgs.com/products/20%20Precision%20Bench%20Vice/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "hydraulic-bite-machine",
		name: "Hydraulic Bite Machine",
		image: "https://cdn.gzxfjxyxgs.com/products/21%20Hydraulic%20Bite%20Machine/%E5%B0%81%E9%9D%A2/cover.webp",
	},
	{
		id: "pneumatic-single-hole-zero",
		name: "Pneumatic Single Hole Zero Plate Series",
		image: "https://cdn.gzxfjxyxgs.com/products/22%20Pneumatic%20Single%20Hole%20Zero%20Plate%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
	},
];

export default function ProductDetail({ data }: ProductDetailProps) {
	const [selectedImage, setSelectedImage] = useState(data.mainImage);
	const [quantity, setQuantity] = useState(1);
	const [recommendedProducts, setRecommendedProducts] = useState(allProducts.slice(0, 8));
	
	// 在客户端随机选择8个推荐产品
	useEffect(() => {
		const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
		setRecommendedProducts(shuffled.slice(0, 8));
	}, []);
	
	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Hero Section with Breadcrumb */}
			<section className="relative min-h-[40vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">

				{/* Content */}
				<div className="relative pt-32 pb-16 px-6">
					<div className="max-w-[1600px] mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							{/* Breadcrumb */}
							<nav className="flex items-center gap-2 text-sm text-gray-300 mb-8">
								<a href="/" className="hover:text-white transition-colors">
									Home
								</a>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
								<a href="/products" className="hover:text-white transition-colors">
									Products
								</a>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
								<span className="text-white font-medium">{data.name}</span>
							</nav>

							{/* Category Badge */}
							<div className="mb-6">
								{data.badge && (
									<span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-full mr-3">
										{data.badge}
									</span>
								)}
								<span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
									{data.category}
								</span>
							</div>

							{/* Product Name */}
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
								{data.name}
							</h1>

							{/* Tagline */}
							{data.tagline && (
								<p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-3xl">
									{data.tagline}
								</p>
							)}

							{/* Price & Rating */}
							<div className="flex flex-wrap items-center gap-6">
								{data.price && (
									<div className="flex items-center gap-3">
										<span className="text-4xl md:text-5xl font-bold text-white">
											${data.price.toFixed(2)}
										</span>
										{data.originalPrice && (
											<>
												<span className="text-2xl text-gray-400 line-through">
													${data.originalPrice.toFixed(2)}
												</span>
												<span className="px-3 py-1 bg-red-500 text-white font-semibold rounded-full text-sm">
													Save ${(data.originalPrice - data.price).toFixed(2)}
												</span>
											</>
										)}
									</div>
								)}

								{data.rating && data.reviewCount && (
									<div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
										<div className="flex items-center gap-1">
											{[...Array(5)].map((_, i) => (
												<svg
													key={i}
													className={`w-5 h-5 ${
														i < Math.floor(data.rating!)
															? "text-yellow-400"
															: "text-gray-400"
													}`}
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											))}
										</div>
										<span className="text-white font-semibold">
											{data.rating} ({data.reviewCount.toLocaleString()} reviews)
										</span>
									</div>
								)}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Product Overview Section */}
			<section className="py-12 px-6 bg-white">
				<div className="max-w-[1600px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Left: Images */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							{/* Main Image */}
							<div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-square">
								<motion.img
									key={selectedImage}
									src={selectedImage}
									alt={data.name}
									className="w-full h-full object-cover"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								/>
							</div>

							{/* Gallery Thumbnails */}
							{data.galleryImages && data.galleryImages.length > 0 && (
								<div className="flex gap-4 overflow-x-auto pb-2">
									<div
										onClick={() => setSelectedImage(data.mainImage)}
										className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
											selectedImage === data.mainImage
												? "border-purple-600 scale-105"
												: "border-gray-200 hover:border-gray-400"
										}`}
									>
										<img
											src={data.mainImage}
											alt={data.name}
											className="w-full h-full object-cover"
										/>
									</div>
									{data.galleryImages.map((image, index) => (
										<div
											key={index}
											onClick={() => setSelectedImage(image)}
											className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
												selectedImage === image
													? "border-purple-600 scale-105"
													: "border-gray-200 hover:border-gray-400"
											}`}
										>
											<img
												src={image}
												alt={`${data.name} ${index + 1}`}
												className="w-full h-full object-cover"
											/>
										</div>
									))}
								</div>
							)}
						</motion.div>

						{/* Right: Product Info */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							{/* Short Description */}
							<div className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h2>
								<p className="text-gray-700 text-lg leading-relaxed">
									{data.shortDescription}
								</p>
							</div>

							{/* Highlights */}
							{data.highlights && data.highlights.length > 0 && (
								<div className="mb-8">
									<h3 className="text-lg font-bold text-gray-900 mb-4">Key Benefits:</h3>
									<ul className="space-y-3">
										{data.highlights.map((highlight, index) => (
											<motion.li
												key={index}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.4, delay: index * 0.1 }}
												className="flex items-start gap-3"
											>
												<svg
													className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
												<span className="text-gray-700">{highlight}</span>
											</motion.li>
										))}
									</ul>
								</div>
							)}

						</motion.div>
					</div>
				</div>
			</section>

			{/* Product Recommendations */}
			<section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-purple-50">
				<div className="max-w-[1600px] mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Recommended Products
						</h2>
						<p className="text-xl text-gray-600">
							Discover more high-quality products you might like
						</p>
					</div>

					{/* Products Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{recommendedProducts.map((product, index) => (
							<Link 
								key={product.id}
								href={`/products/${product.id}/gallery`}
							>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.05 }}
									className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer h-full"
								>
									{/* Product Image */}
									<div className="relative h-64 overflow-hidden bg-gray-100">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
											loading="lazy"
											decoding="async"
											style={{ contentVisibility: 'auto' }}
										/>
										{product.badge && (
											<div className="absolute top-4 right-4">
												<span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
													{product.badge}
												</span>
											</div>
										)}
									</div>

									{/* Product Info */}
									<div className="p-6">
										<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
											{product.name}
										</h3>
										<div className="flex items-center justify-between mt-4">
											<span className="text-purple-600 font-semibold">View Details</span>
											<svg 
												className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" 
												fill="none" 
												stroke="currentColor" 
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
											</svg>
										</div>
									</div>
								</motion.div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Related Products */}
			{data.relatedProducts && data.relatedProducts.length > 0 && (
				<section className="py-16 px-6 bg-white">
					<div className="max-w-[1600px] mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
							You May Also Like
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{data.relatedProducts.map((product, index) => (
								<motion.div
									key={product.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{ y: -10 }}
									className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
								>
									<div className="relative h-48 bg-gray-100">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="p-6">
										<h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
										<p className="text-purple-600 font-bold text-lg">
											${product.price.toFixed(2)}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			)}

			<Footer />
		</div>
	);
}

