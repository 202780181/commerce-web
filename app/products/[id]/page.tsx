"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getProductById } from "../../lib/productConfig";
import { motion } from "motion/react";

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";

interface FileSystemItem {
  name: string;
  type: 'folder' | 'image';
  path: string;
  url?: string;
  fileName?: string;
}

export default function ProductPage() {
	const params = useParams();
	const productId = params.id as string;
	
	const [items, setItems] = useState<FileSystemItem[]>([]);
	const [loading, setLoading] = useState(true);
	
	// Get product data from configuration
	const product = getProductById(productId);
	
	useEffect(() => {
		if (product) {
			fetchProductContent();
		}
	}, [productId]);

	const fetchProductContent = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/products/filesystem?productId=${productId}`);
			const data = await response.json();
			setItems(data.items || []);
		} catch (error) {
			console.error('Error fetching product content:', error);
			setItems([]);
		} finally {
			setLoading(false);
		}
	};
	
	// If product doesn't exist, show 404 page
	if (!product) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
					<p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
					<Link
						href="/products"
						className="px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
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
						{loading ? 'Loading...' : `${items.length} items`}
					</p>
				</div>
			</section>
			
			{/* Dynamic Content Grid */}
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
							<h3 className="text-2xl font-bold text-gray-900 mb-3">No Content Available</h3>
							<p className="text-gray-600 text-lg">This product doesn't have any content yet.</p>
						</div>
					) : (
						<>
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
									{items.some(item => item.type === 'folder') ? 'Product Categories' : 'Product Images'}
								</h2>
								<p className="text-lg text-gray-600">
									{items.filter(item => item.type === 'folder').length > 0 && 
										`${items.filter(item => item.type === 'folder').length} categories, `}
									{items.filter(item => item.type === 'image').length > 0 && 
										`${items.filter(item => item.type === 'image').length} images`}
								</p>
							</div>
							
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
													? `/products/${productId}/${item.fileName}`
													: `/products/${productId}/${index - items.filter(i => i.type === 'folder').length}`
											}
										>
											<div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
												{item.type === 'folder' ? (
													// 文件夹显示
													<div className="relative h-80 bg-linear-to-br flex flex-col items-center justify-center">
														<svg className="w-32 h-32 text-yellow-600 opacity-80 mb-6" fill="currentColor" viewBox="0 0 20 20">
															<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
														</svg>
														<div className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-lg">
															<span className="text-base font-bold text-gray-800">{item.name}</span>
														</div>
													</div>
												) : (
													// 图片显示
													<>
														<div className="relative h-80 overflow-hidden bg-gray-50">
															<img
																src={item.url}
																alt={item.name}
																className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
																loading="lazy"
																decoding="async"
																style={{ contentVisibility: 'auto' }}
															/>
															<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
																<span className="text-sm font-bold text-gray-700">
																	#{index - items.filter(i => i.type === 'folder').length + 1}
																</span>
															</div>
														</div>
														
														{/* 图片名称 */}
														<div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
															<p className="text-sm font-medium text-gray-700 truncate text-center">
																{item.name}
															</p>
														</div>
													</>
												)}
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

