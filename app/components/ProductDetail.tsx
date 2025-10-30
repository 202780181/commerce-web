"use client";

import { motion } from "motion/react";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

// 产品详情数据类型定义
export interface ProductDetailData {
	// 基本信息
	name: string;
	tagline: string;
	category: string;
	price: number;
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

export default function ProductDetail({ data }: ProductDetailProps) {
	const [selectedImage, setSelectedImage] = useState(data.mainImage);
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState("description");
	
	const theme = data.theme || { primary: "purple", secondary: "blue" };
	const gradientClass = `from-${theme.primary}-600 to-${theme.secondary}-600`;
	const textColorClass = `text-${theme.primary}-600`;
	const borderColorClass = `border-${theme.primary}-500`;
	const bgColorClass = `bg-${theme.primary}-50`;

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Hero Section with Breadcrumb */}
			<section className="relative min-h-[40vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					/>
				</div>

				{/* Animated gradient orbs */}
				<motion.div
					className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
					animate={{
						x: [0, 50, 0],
						y: [0, 30, 0],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
					animate={{
						x: [0, -50, 0],
						y: [0, -30, 0],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

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
							<p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-3xl">
								{data.tagline}
							</p>

							{/* Price & Rating */}
							<div className="flex flex-wrap items-center gap-6">
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

							{/* Quantity Selector */}
							<div className="mb-8">
								<label className="block text-sm font-semibold text-gray-700 mb-3">
									Quantity:
								</label>
								<div className="flex items-center gap-4">
									<div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
										<button
											onClick={() => setQuantity(Math.max(1, quantity - 1))}
											className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
										>
											−
										</button>
										<span className="px-6 py-3 font-semibold">{quantity}</span>
										<button
											onClick={() => setQuantity(quantity + 1)}
											className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
										>
											+
										</button>
									</div>
									<span className="text-gray-600">
										Total: <span className="font-bold text-gray-900">${(data.price * quantity).toFixed(2)}</span>
									</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
								>
									Add to Cart
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all"
								>
									<svg
										className="w-6 h-6 inline"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
								</motion.button>
							</div>

							{/* Trust Badges */}
							<div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
								<div className="text-center">
									<div className="text-3xl mb-2">🚚</div>
									<p className="text-sm font-semibold text-gray-900">Free Shipping</p>
									<p className="text-xs text-gray-600">On orders over $50</p>
								</div>
								<div className="text-center">
									<div className="text-3xl mb-2">🔒</div>
									<p className="text-sm font-semibold text-gray-900">Secure Payment</p>
									<p className="text-xs text-gray-600">100% protected</p>
								</div>
								<div className="text-center">
									<div className="text-3xl mb-2">↩️</div>
									<p className="text-sm font-semibold text-gray-900">Easy Returns</p>
									<p className="text-xs text-gray-600">30-day guarantee</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Detailed Information Tabs */}
			<section className="py-12 px-6 bg-gray-50">
				<div className="max-w-[1200px] mx-auto">
					{/* Tab Navigation */}
					<div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
						<button
							onClick={() => setActiveTab("description")}
							className={`px-6 py-3 font-semibold transition-all ${
								activeTab === "description"
									? "text-purple-600 border-b-2 border-purple-600"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Description
						</button>
						{data.specs && data.specs.length > 0 && (
							<button
								onClick={() => setActiveTab("specs")}
								className={`px-6 py-3 font-semibold transition-all ${
									activeTab === "specs"
										? "text-purple-600 border-b-2 border-purple-600"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								Specifications
							</button>
						)}
						{data.howToUse && (
							<button
								onClick={() => setActiveTab("howto")}
								className={`px-6 py-3 font-semibold transition-all ${
									activeTab === "howto"
										? "text-purple-600 border-b-2 border-purple-600"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								How to Use
							</button>
						)}
						{data.ingredients && (
							<button
								onClick={() => setActiveTab("ingredients")}
								className={`px-6 py-3 font-semibold transition-all ${
									activeTab === "ingredients"
										? "text-purple-600 border-b-2 border-purple-600"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								Ingredients
							</button>
						)}
						{data.faqs && data.faqs.length > 0 && (
							<button
								onClick={() => setActiveTab("faqs")}
								className={`px-6 py-3 font-semibold transition-all ${
									activeTab === "faqs"
										? "text-purple-600 border-b-2 border-purple-600"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								FAQs
							</button>
						)}
					</div>

					{/* Tab Content */}
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="bg-white rounded-xl p-8 shadow-lg"
					>
						{/* Description Tab */}
						{activeTab === "description" && (
							<div className="prose max-w-none">
								<p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
									{data.fullDescription}
								</p>
							</div>
						)}

						{/* Specifications Tab */}
						{activeTab === "specs" && data.specs && (
							<div className="space-y-4">
								{data.specs.map((spec, index) => (
									<div
										key={index}
										className="flex justify-between items-center py-4 border-b border-gray-200 last:border-0"
									>
										<span className="font-semibold text-gray-900">{spec.label}</span>
										<span className="text-gray-700">{spec.value}</span>
									</div>
								))}
							</div>
						)}

						{/* How to Use Tab */}
						{activeTab === "howto" && data.howToUse && (
							<div>
								<h3 className="text-2xl font-bold text-gray-900 mb-6">
									{data.howToUse.title}
								</h3>
								<ol className="space-y-4">
									{data.howToUse.steps.map((step, index) => (
										<li key={index} className="flex gap-4">
											<span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full flex items-center justify-center">
												{index + 1}
											</span>
											<p className="text-gray-700 pt-1">{step}</p>
										</li>
									))}
								</ol>
							</div>
						)}

						{/* Ingredients Tab */}
						{activeTab === "ingredients" && data.ingredients && (
							<div>
								<h3 className="text-2xl font-bold text-gray-900 mb-6">
									{data.ingredients.title}
								</h3>
								<p className="text-gray-700 leading-relaxed whitespace-pre-line">
									{data.ingredients.content}
								</p>
							</div>
						)}

						{/* FAQs Tab */}
						{activeTab === "faqs" && data.faqs && (
							<div className="space-y-6">
								{data.faqs.map((faq, index) => (
									<div key={index} className="pb-6 border-b border-gray-200 last:border-0">
										<h4 className="text-lg font-bold text-gray-900 mb-3">
											{faq.question}
										</h4>
										<p className="text-gray-700 leading-relaxed">{faq.answer}</p>
									</div>
								))}
							</div>
						)}
					</motion.div>
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

