"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getProductById } from "../../lib/productConfig";
import { motion } from "motion/react";
import { usePageCache } from "../../hooks/usePageCache";
import { useParams } from "next/navigation";

const COS_BASE_URL = "https://cdn.gzxfjxyxgs.com/products";
const ITEM_CACHE_KEY = 'product-page-items-cache';

interface FileSystemItem {
  name: string;
  type: 'folder' | 'image';
  path: string;
  url?: string;
  fileName?: string;
  thumbnailUrl?: string;
}

export default function ProductPage() {
	const params = useParams<{ id?: string }>();
	const productId = useMemo(() => params?.id ?? "", [params]);
	
	// 页面缓存
	usePageCache();
	
	const [items, setItems] = useState<FileSystemItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [restoredFromCache, setRestoredFromCache] = useState(false);

	// 每次产品切换时重置缓存状态
	useEffect(() => {
		setRestoredFromCache(false);
	}, [productId]);
	
	// Get product data from configuration
	const product = productId ? getProductById(productId) : null;

	// 尝试从 sessionStorage 恢复当前产品的数据，回退时避免重新加载
	useEffect(() => {
		if (!productId || typeof window === 'undefined') return;
		const cacheRaw = sessionStorage.getItem(ITEM_CACHE_KEY);
		if (!cacheRaw) return;
		try {
			const parsed = JSON.parse(cacheRaw) as Record<string, FileSystemItem[]>;
			if (parsed[productId]) {
				setItems(parsed[productId]);
				setLoading(false);
				setRestoredFromCache(true);
			}
		} catch (error) {
			console.warn('Failed to parse product cache', error);
		}
	}, [productId]);
	
	useEffect(() => {
		if (product && !restoredFromCache) {
			fetchProductContent();
		}
	}, [productId, restoredFromCache, product]);

	const fetchProductContent = async () => {
		try {
			if (restoredFromCache) return;
			setLoading(true);
			const response = await fetch(`/api/products/filesystem?productId=${productId}`);
			const data = await response.json();
			setItems(data.items || []);
			
			// 缓存当前产品的文件数据
			if (typeof window !== 'undefined') {
				const cacheRaw = sessionStorage.getItem(ITEM_CACHE_KEY);
				const cache = cacheRaw ? JSON.parse(cacheRaw) : {};
				cache[productId] = data.items || [];
				sessionStorage.setItem(ITEM_CACHE_KEY, JSON.stringify(cache));
			}
		} catch (error) {
			console.error('Error fetching product content:', error);
			setItems([]);
		} finally {
			setLoading(false);
		}
	};
	
	// If product doesn't exist, show 404 page
	if (!productId || !product) {
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
					<div className="text-xl text-gray-200">
						{loading ? (
							<div className="h-5 w-32 bg-white/30 rounded animate-pulse" />
						) : (
							`${items.length} items`
						)}
					</div>
				</div>
			</section>
			
			{/* Dynamic Content Grid */}
			<section className="py-20 px-6">
				<div className="max-w-[1600px] mx-auto">
					{loading ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{[...Array(8)].map((_, idx) => (
								<div
									key={idx}
									className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100"
								>
									<div className="h-80 bg-gray-100 animate-pulse" />
									<div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
										<div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
									</div>
								</div>
							))}
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
													// 文件夹显示 - 显示第一张图片作为缩略图
													<>
														<div className="relative h-80 overflow-hidden bg-gray-50">
															{item.thumbnailUrl ? (
																<img
																	src={item.thumbnailUrl}
																	alt={item.name}
																	className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
																	loading="lazy"
																	decoding="async"
																	style={{ contentVisibility: 'auto' }}
																/>
															) : (
																// 如果没有图片，显示文件夹图标
																<div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
																	<svg className="w-32 h-32 text-gray-400 opacity-60" fill="currentColor" viewBox="0 0 20 20">
																		<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
																	</svg>
																</div>
															)}
															{/* 文件夹标识 */}
															<div className="absolute top-4 left-4 bg-yellow-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
																<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
																	<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
																</svg>
																<span className="text-xs font-bold text-white">Folder</span>
															</div>
														</div>
														
														{/* 文件夹名称 */}
														<div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
															<p className="text-sm font-medium text-gray-700 truncate text-center">
																{item.name}
															</p>
														</div>
													</>
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
