"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { motion } from "motion/react";
import { getProductById, getCategoryById } from "../../../lib/productConfig";

export default function CategoryPage() {
	const params = useParams();
	const productId = params.id as string;
	const categoryId = params.categoryId as string;
	
	// Get data from product configuration
	const product = getProductById(productId);
	const category = getCategoryById(productId, categoryId);
	
	// If product or category doesn't exist, show 404 page
	if (!product || !category) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						{!product ? 'Product Not Found' : 'Category Not Found'}
					</h1>
					<p className="text-gray-600 mb-8">
						The {!product ? 'product' : 'category'} you're looking for doesn't exist.
					</p>
					<Link
						href="/products"
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
					>
						Back to Products
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Hero Section */}
			<section className="relative py-20 px-6 bg-gradient-to-br from-purple-600 to-blue-600">
				<div className="max-w-7xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<Link
							href={`/products/${productId}`}
							className="text-white/80 hover:text-white mb-6 flex items-center gap-2 transition-colors"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							Back to {product.name}
						</Link>
						<h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
							{category.name}
						</h1>
						<p className="text-xl text-white/90">
							{product.name} - {category.name} Series
						</p>
					</motion.div>
				</div>
			</section>

			{/* Images Grid Section */}
			<section className="py-20 px-6 bg-gray-50">
				<div className="max-w-[1600px] mx-auto">
					{category.images.length === 0 ? (
						<div className="text-center py-20 bg-white rounded-2xl shadow-lg">
							<div className="mb-6">
								<svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">No Images Available</h3>
							<p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
								This category doesn't have any images yet. Check back later.
							</p>
							<Link
								href={`/products/${productId}`}
								className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all inline-block"
							>
								Back to Categories
							</Link>
						</div>
					) : (
						<>
							{/* Gallery Header */}
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
									Product Images
								</h2>
								<p className="text-lg text-gray-600">
									{category.images.length} {category.images.length === 1 ? 'image' : 'images'}
								</p>
							</div>

							{/* Images Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{category.images.map((image, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.03 }}
										className="group"
									>
										<Link href={`/products/${productId}/${categoryId}/${index}`}>
											<div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
												{/* Image Container */}
												<div className="relative h-80 overflow-hidden bg-gray-50">
													<img
														src={image.url}
														alt={image.name}
														className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
														loading="lazy"
														decoding="async"
														style={{ contentVisibility: 'auto' }}
													/>
													{/* Image Number Badge */}
													<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
														<span className="text-sm font-bold text-gray-700">#{index + 1}</span>
													</div>
												</div>
												{/* Image Name */}
												<div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
													<p className="text-sm font-medium text-gray-700 truncate text-center">
														{image.name}
													</p>
												</div>
											</div>
										</Link>
									</motion.div>
								))}
							</div>
						</>
					)}
				</div>
			</section>
			<Footer />
		</div>
	);
}
