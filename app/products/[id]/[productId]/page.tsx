'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { useCategories } from '@/app/contexts/CategoriesContext';
import FolderIcon from '@/app/components/FolderIcon';
import ProductImageViewer from '@/app/components/ProductImageViewer';
import { usePageCache } from '@/app/hooks/usePageCache';

interface ProductImage {
	id: number;
	product_id: number;
	type: 'main' | 'gallery';
	oss_url: string;
	content?: string;
	sort: number;
	created_at: string;
}

interface Attachment {
	id: number;
	product_id: number;
	name: string;
	oss_url: string;
	file_size: number;
	file_type: string;
	sort: number;
	created_at: string;
}

interface ProductDetail {
	id: number;
	category_id: number;
	title: string;
	price?: number;
	sale_price?: number;
	price_unit?: string;
	content: string;
	published_at: string | null;
	status: number;
	sort: number;
	created_at: string;
	updated_at: string;
}

interface ProductResponse {
	product: ProductDetail;
	images: ProductImage[];
	attachments: Attachment[];
}

// 格式化文件大小显示
function formatFileSize(bytes: number): string {
	const kb = bytes / 1024;
	const mb = kb / 1024;

	if (mb >= 1) {
		return `${mb.toFixed(1)} MB`;
	}
	return `${kb.toFixed(0)} KB`;
}

export default function ProductDetailPage() {
	usePageCache();
	const params = useParams();
	const router = useRouter();
	const categoryId = parseInt(params.id as string);
	const productId = parseInt(params.productId as string);

	const { getBreadcrumb, loading: contextLoading } = useCategories();
	const [product, setProduct] = useState<ProductDetail | null>(null);
	const [images, setImages] = useState<ProductImage[]>([]);
	const [attachments, setAttachments] = useState<Attachment[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
	const [downloadsExpanded, setDownloadsExpanded] = useState(false);

	const breadcrumb = getBreadcrumb(categoryId);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/proxy/portal/products/${productId}`);
				if (!response.ok) throw new Error('Failed to fetch product');

				const data = await response.json();
				console.log('[ProductDetail] Product data:', data);

				if (data.code === 0 && data.data) {
					const { product, images, attachments } = data.data;
					setProduct(product);
					setImages(images || []);
					setAttachments(attachments || []);

					// 设置默认选中的图片（优先main类型）
					const mainImage = images?.find((img: ProductImage) => img.type === 'main');
					setSelectedImage(mainImage || images?.[0] || null);
				}
			} catch (error) {
				console.error('[ProductDetail] Error fetching product:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	if (loading || contextLoading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header lightBackground={true} />
				
				{/* Breadcrumb Skeleton */}
				<div className="bg-white border-b pt-[72px]">
					<div className="max-w-7xl mx-auto px-6 py-3">
						<div className="flex items-center space-x-2">
							<div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
							<div className="text-gray-300">/</div>
							<div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
							<div className="text-gray-300">/</div>
							<div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
						</div>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-6 py-6 pt-24">
					<div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
				</div>

				{/* Main Content Skeleton */}
				<div className="max-w-7xl mx-auto px-6 pb-12">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
						{/* Left: Image Gallery Skeleton */}
						<div className="lg:col-span-2 grid grid-cols-12 gap-6">
							{/* Thumbnails */}
							<div className="col-span-12 sm:col-span-2 flex sm:flex-col gap-3">
								{[...Array(4)].map((_, i) => (
									<div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
								))}
							</div>
							
							{/* Main Image */}
							<div className="col-span-12 sm:col-span-10">
								<div className="w-full h-[538px] bg-gray-200 rounded-lg animate-pulse"></div>
							</div>
						</div>

						{/* Right: Info Skeleton */}
						<div className="lg:col-span-1 space-y-6">
							{/* Title Card Skeleton */}
							<div className="bg-gray-200 rounded-lg h-24 w-full animate-pulse"></div>
							
							{/* Parameters Skeleton */}
							<div className="bg-white rounded-lg shadow p-6">
								<div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
								<div className="space-y-4">
									{[...Array(6)].map((_, i) => (
										<div key={i} className="flex justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
											<div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
											<div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
										</div>
									))}
								</div>
							</div>

							{/* Downloads Skeleton */}
							<div className="bg-white rounded-lg shadow h-16 animate-pulse"></div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	if (!product) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header lightBackground={true} />
				<div className="flex items-center justify-center py-40 pt-[calc(72px+10rem)]">
					<div className="text-center">
						<div className="text-red-500 text-6xl mb-4">Warning</div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">Product Not Found</h2>
						<p className="text-gray-600">The product you are looking for does not exist.</p>
						<button
							onClick={() => router.back()}
							className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
						>
							Go Back
						</button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={true} />

			{/* Breadcrumb */}
			<div className="bg-white border-b pt-[72px]">
				<div className="max-w-7xl mx-auto px-6 py-3">
					<nav className="flex items-center space-x-2 text-sm text-gray-500">
						<Link href="/products" className="hover:text-gray-700">
							Products
						</Link>
						{breadcrumb.map((cat) => (
							<div key={cat.id} className="flex items-center space-x-2">
								<span>/</span>
								<Link
									href={`/products/${cat.id}`}
									className="hover:text-gray-700"
								>
									{cat.name}
								</Link>
							</div>
						))}
						<span>/</span>
						<span className="text-gray-900">{product.title}</span>
					</nav>
				</div>
			</div>

			{/* Back to Gallery Link */}
			<div className="max-w-7xl mx-auto px-6 py-6 pt-24">
				<button
					onClick={() => router.back()}
					className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
				>
					<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					Back to Gallery
				</button>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-6 pb-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
					{/* Left: Thumbnail List (Vertical) */}
					<div className="lg:col-span-2 grid grid-cols-12 gap-6">
						{/* Vertical Thumbnails */}
						<div className="col-span-12 sm:col-span-2 flex sm:flex-col gap-3">
							{images.map((image) => (
								<button
									key={image.id}
									onClick={() => setSelectedImage(image)}
									className={`aspect-square bg-white rounded-lg border-2 transition-all overflow-hidden ${selectedImage?.id === image.id
										? 'border-purple-600'
										: 'border-gray-200 hover:border-gray-300'
										}`}
								>
									<img
										src={image.oss_url}
										alt={`${product.title} - ${image.type}`}
										className="w-full h-full object-contain scale-[0.9] select-none pointer-events-none"
									/>
								</button>
							))}
						</div>

						{/* Main Image Display */}
						<div className="col-span-12 sm:col-span-10">
							{selectedImage ? (
								<ProductImageViewer
									src={selectedImage.oss_url}
									alt={product.title}
									maxHeight="538px"
								/>
							) : (
								<div className="w-full h-[420px] bg-white rounded-lg border border-gray-200 flex items-center justify-center">
									<FolderIcon className="w-32 h-32" />
								</div>
							)}
						</div>
					</div>

					{/* Right: Product Info */}
					<div className="lg:col-span-1 space-y-6">
						{/* Product Title Card */}
						<div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 mb-2">
							<h1 className="text-2xl font-bold text-white mb-2">{product.title}</h1>

						</div>



						{/* Product Content/Specifications */}
						<div className="bg-white rounded-lg shadow p-6 mb-2 min-h-[350px]">
							{selectedImage?.content ? (
								<>
									<h3 className="text-lg font-semibold text-gray-900 mb-4">{productId === 117 ? 'Unit Price' : 'Product Parameter'}</h3>
									<div className="space-y-3 text-sm">
										{selectedImage.content.split('\n').map((line, index) => {
											const trimmedLine = line.trim();
											if (!trimmedLine) return null;

											// 检查是否是 "key: value" 格式
											const colonIndex = trimmedLine.indexOf(':');
											if (colonIndex > 0) {
												const key = trimmedLine.substring(0, colonIndex).trim();
												const value = trimmedLine.substring(colonIndex + 1).trim();
												return (
													<div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
														<span className="font-bold text-gray-900">{key}: </span>
														<span className="text-gray-600">{value}</span>
													</div>
												);
											}

											// 如果不是 key:value 格式，直接显示文本
											return (
												<div key={index} className="text-gray-700">
													{trimmedLine}
												</div>
											);
										})}
									</div>
								</>
							) : (
								<div className="text-center py-8">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
										<svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">No Specifications Available</h3>
									<p className="text-sm text-gray-500">Product specifications will be added soon.</p>
								</div>
							)}
						</div>

						{/* Price Card */}
						{product.price !== undefined && productId !== 117 && (
							<div className="bg-white rounded-lg shadow p-4 mb-2">
								<div className="text-lg font-bold text-gray-900 mb-1">Unit Price:</div>
								<div className="flex items-baseline">
									<div className="text-blue-600 font-bold flex items-baseline mr-3">
										<span className="text-lg mr-1">{product.price_unit}</span>
										<span className="text-3xl">{product.price.toLocaleString()}</span>
									</div>
									{product.sale_price !== undefined && (
										<div className="text-gray-400 text-lg line-through font-medium">
											{product.price_unit} {product.sale_price.toLocaleString()}
										</div>
									)}
								</div>
							</div>
						)}

						{/* Downloads Section */}
						<div className="bg-white rounded-lg shadow overflow-hidden">
							{/* Header - Clickable */}
							<button
								onClick={() => setDownloadsExpanded(!downloadsExpanded)}
								className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
							>
								<div className="flex items-center gap-3">
									<svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
									</svg>
									<h3 className="text-lg font-bold text-gray-900">DOWNLOADS</h3>
								</div>
								<svg
									className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${downloadsExpanded ? 'rotate-180' : ''}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>

							{/* Content - Collapsible with Animation */}
							<div
								className={`border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${downloadsExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
									}`}
							>
								{attachments.length > 0 ? (
									<div className="">
										{/* Header Row */}
										<div className="grid grid-cols-[1fr_120px_60px] gap-4 px-4 py-3 bg-gray-50 rounded-t-lg border-b border-gray-200">
											<div className="text-sm font-semibold text-gray-700">File Name</div>
											<div className="text-sm font-semibold text-gray-700 text-center">Size</div>
											<div className="text-sm font-semibold text-gray-700 text-center"></div>
										</div>

										{/* Files */}
										<div className="border border-t-0 border-gray-200 rounded-b-lg overflow-hidden">
											{attachments.map((attachment, index) => (
												<div
													key={attachment.id}
													className={`grid grid-cols-[1fr_120px_60px] gap-4 px-4 py-4 items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
														} ${index !== attachments.length - 1 ? 'border-b border-gray-200' : ''}`}
												>
													<div className="text-sm text-gray-900 truncate font-medium">
														{attachment.name}
													</div>
													<div className="text-sm text-gray-600 text-center">
														{formatFileSize(attachment.file_size)}
													</div>
													<a
														href={attachment.oss_url}
														download={attachment.name}
														target="_blank"
														rel="noopener"
														className="flex items-center justify-center text-red-600 hover:text-red-700 transition-colors"
														title="Download"
													>
														<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
														</svg>
													</a>
												</div>
											))}
										</div>
									</div>
								) : (
									<div className="py-12 text-center bg-gray-50">
										<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
											<svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
										</div>
										<p className="text-gray-600 font-medium">No files available</p>
										<p className="text-gray-400 text-sm mt-1">Check back later for downloadable content</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
