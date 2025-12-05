'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { useCategories } from '@/app/contexts/CategoriesContext';

interface ProductImage {
	id: number;
	product_id: number;
	type: 'main' | 'gallery';
	oss_url: string;
	sort: number;
	created_at: string;
}

interface ProductDetail {
	id: number;
	category_id: number;
	title: string;
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
	attachments: any[];
}

export default function ProductDetailPage() {
	const params = useParams();
	const router = useRouter();
	const categoryId = parseInt(params.id as string);
	const productId = parseInt(params.productId as string);
	
	const { getBreadcrumb, loading: contextLoading } = useCategories();
	const [product, setProduct] = useState<ProductDetail | null>(null);
	const [images, setImages] = useState<ProductImage[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState<string>('');

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
					const { product, images } = data.data;
					setProduct(product);
					setImages(images || []);
					
					// 设置默认选中的图片（优先main类型）
					const mainImage = images?.find((img: ProductImage) => img.type === 'main');
					setSelectedImage(mainImage?.oss_url || images?.[0]?.oss_url || '');
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
				<div className="flex items-center justify-center py-40 pt-[calc(72px+10rem)]">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
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
			<div className="max-w-7xl mx-auto px-6 py-6">
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
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left: Thumbnail List (Vertical) */}
					<div className="lg:col-span-2 grid grid-cols-12 gap-6">
						{/* Vertical Thumbnails */}
						<div className="col-span-12 sm:col-span-2 flex sm:flex-col gap-3">
							{images.map((image) => (
								<button
									key={image.id}
									onClick={() => setSelectedImage(image.oss_url)}
									className={`aspect-square bg-white rounded-lg border-2 transition-all overflow-hidden ${
										selectedImage === image.oss_url
											? 'border-purple-600'
											: 'border-gray-200 hover:border-gray-300'
									}`}
								>
									<img
										src={image.oss_url}
										alt={`${product.title} - ${image.type}`}
										className="w-full h-full object-cover"
									/>
								</button>
							))}
						</div>

						{/* Main Image Display */}
						<div className="col-span-12 sm:col-span-10">
							<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
								<div className="aspect-4/3 flex items-center justify-center bg-gray-50">
									{selectedImage ? (
										<img
											src={selectedImage}
											alt={product.title}
											className="w-full h-full object-contain p-8"
										/>
									) : (
										<div className="text-8xl text-gray-300">📁</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Right: Product Info */}
					<div className="lg:col-span-1 space-y-6">
						{/* Product Title Card */}
						<div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6">
							<h1 className="text-2xl font-bold text-white">{product.title}</h1>
						</div>

						{/* Product Content/Specifications */}
						<div className="bg-white rounded-lg shadow p-6">
							{product.content ? (
								<>
									<h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
									<div className="space-y-3 text-sm">
										{product.content.split('\n').map((line, index) => {
											const trimmedLine = line.trim();
											if (!trimmedLine) return null;
											
											// 检查是否是 "key: value" 格式
											const colonIndex = trimmedLine.indexOf(':');
											if (colonIndex > 0) {
												const key = trimmedLine.substring(0, colonIndex).trim();
												const value = trimmedLine.substring(colonIndex + 1).trim();
												return (
													<div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
														<div className="font-medium text-gray-700">{key}</div>
														<div className="text-gray-600 mt-1">{value}</div>
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
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
