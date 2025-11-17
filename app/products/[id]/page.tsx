"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getProductById } from "../../lib/productConfig";
import { motion } from "motion/react";

export default function ProductPage() {
	const params = useParams();
	const productId = params.id as string;
	
	// Get product data from configuration
	const product = getProductById(productId);
	
	// If product doesn't exist, show 404 page
	if (!product) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
					<p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
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
			<section className="relative h-[40vh] min-h-[300px] overflow-hidden">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("${product.coverImage}")`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50" />
				
				<div className="relative h-full flex flex-col items-center justify-center text-center px-6">
					<Link
						href="/products"
						className="text-white/80 hover:text-white mb-6 flex items-center gap-2 transition-colors"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						Back to Products
					</Link>
					<h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
						{product.name}
					</h1>
					<p className="text-xl text-gray-200">
						{product.hasCategories ? 'Select a category to view details' : 'Product Image Gallery'}
					</p>
				</div>
			</section>
			
			{/* Has categories: Display category grid */}
			{product.hasCategories && product.categories && (
				<section className="py-20 px-6">
					<div className="max-w-[1600px] mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Product Categories
							</h2>
							<p className="text-lg text-gray-600">
								Click a category to view all products in this series
							</p>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
							{product.categories.map((category) => {
								// Use the first image in the category as cover
								const coverImage = category.images[0]?.url || product.coverImage;
								
								return (
									<Link
										key={category.id}
										href={`/products/${productId}/${category.id}`}
										className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full block group"
									>
										{/* Category Image */}
										<div className="relative h-64 bg-gray-100 overflow-hidden">
											<img
												src={coverImage}
												alt={category.name}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
												loading="lazy"
												decoding="async"
												style={{ contentVisibility: 'auto' }}
											/>
										</div>
										
										{/* Category Info */}
										<div className="p-6">
											<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
												{category.name}
											</h3>
											<p className="text-sm text-gray-500">
												{category.images.length} {category.images.length === 1 ? 'product' : 'products'}
											</p>
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				</section>
			)}
			
			{/* No categories: Display product images directly */}
			{!product.hasCategories && product.images && (
				<section className="py-20 px-6">
					<div className="max-w-[1600px] mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Product Images
							</h2>
							<p className="text-lg text-gray-600">
								{product.images.length} {product.images.length === 1 ? 'image' : 'images'}
							</p>
						</div>
						
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{product.images.map((image, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.03 }}
									className="group"
								>
									<Link href={`/products/${productId}/direct/${index}`}>
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
					</div>
				</section>
			)}
			
			<Footer />
		</div>
	);
}

