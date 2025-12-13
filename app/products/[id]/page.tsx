'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { useCategories } from '@/app/contexts/CategoriesContext';
import { AlertTriangle } from 'lucide-react';
import FolderIcon from '@/app/components/FolderIcon';

interface Product {
	id: number;
	category_id: number;
	title: string;
	cover_url?: string;
	main_image?: string;
	content?: string;
	sort?: number;
}

export default function CategoryPage() {
	const params = useParams();
	const categoryId = parseInt(params.id as string);

	const {
		findCategoryById,
		getBreadcrumb,
		loading: contextLoading
	} = useCategories();

	const [products, setProducts] = useState<Product[]>([]);
	const [productsLoading, setProductsLoading] = useState(false);
	const [fetched, setFetched] = useState(false);

	const category = useMemo(() => findCategoryById(categoryId), [categoryId, findCategoryById]);
	const breadcrumb = useMemo(() => getBreadcrumb(categoryId), [categoryId, getBreadcrumb]);
	const hasChildren = category?.children && category.children.length > 0;

	// Reset state when category changes
	useEffect(() => {
		setProducts([]);
		setFetched(false);
		setProductsLoading(false);
	}, [categoryId]);

	useEffect(() => {
		if (category && !hasChildren) {
			const fetchProducts = async () => {
				try {
					setProductsLoading(true);
					const startTime = Date.now();
					const minLoadingTime = 500; // Minimum loading time in ms

					// Run fetch and timer in parallel
					const [response] = await Promise.all([
						fetch(`/api/proxy/portal/products?category_id=${categoryId}&page=1&page_size=100`),
						new Promise(resolve => setTimeout(resolve, minLoadingTime))
					]);

					if (!response.ok) throw new Error('Failed to fetch products');

					const data = await response.json();
					console.log('[CategoryPage] Products data:', data);

					if (data.code === 0 && data.data) {
						const productList = data.data.list || [];
						// Sort products by sort field
						const sortedProducts = productList.sort((a: Product, b: Product) => (a.sort || 0) - (b.sort || 0));
						setProducts(sortedProducts);
					}
				} catch (error) {
					console.error('[CategoryPage] Error fetching products:', error);
				} finally {
					setProductsLoading(false);
					setFetched(true);
				}
			};

			fetchProducts();
		} else if (category && hasChildren) {
			// If it has children, we don't need to fetch products, but let's add a small delay for consistency
			setTimeout(() => {
				setFetched(true);
			}, 300);
		}
	}, [category, hasChildren, categoryId]);

	const loading = contextLoading || productsLoading || (!!category && !hasChildren && !fetched);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header lightBackground={true} />

				{/* Breadcrumb Skeleton */}
				<div className="bg-white shadow-sm pt-[72px]">
					<div className="max-w-7xl mx-auto px-6 py-4">
						<div className="flex items-center space-x-2">
							<div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
							<div className="text-gray-300">/</div>
							<div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
							<div className="text-gray-300">/</div>
							<div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
						</div>
					</div>
				</div>

				{/* Title Section Skeleton */}
				<div className="bg-white border-b">
					<div className="max-w-7xl mx-auto px-6 py-12">
						<div className="h-10 w-64 bg-gray-200 rounded mb-4 animate-pulse" />
						<div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
					</div>
				</div>

				{/* Grid Skeleton */}
				<div className="max-w-7xl mx-auto px-6 py-12">
					<div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
								<div className="h-48 bg-gray-200 animate-pulse" />
								<div className="p-4 border-t border-gray-100">
									<div className="h-5 bg-gray-200 rounded w-full mb-2 animate-pulse" />
									<div className="h-5 bg-gray-200 rounded w-2/3 animate-pulse" />
								</div>
							</div>
						))}
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	if (!category) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header lightBackground={true} />
				<div className="flex items-center justify-center py-40 pt-[calc(72px+10rem)]">
					<div className="text-center">
						<AlertTriangle className="text-red-500 w-24 h-24 mx-auto mb-4" />
						<h2 className="text-3xl font-bold text-gray-900 mb-2">Error</h2>
						<p className="text-gray-600">Category not found</p>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	const hasProducts = products && products.length > 0;

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={true} />

			<div className="bg-white shadow-sm pt-[72px]">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<nav className="flex items-center space-x-2 text-sm">
						<Link href="/" className="text-gray-500 hover:text-gray-700">
							Home
						</Link>
						<span className="text-gray-400">/</span>
						<Link href="/products" className="text-gray-500 hover:text-gray-700">
							Products
						</Link>
						{breadcrumb.map((cat) => (
							<div key={cat.id} className="flex items-center space-x-2">
								<span className="text-gray-400">/</span>
								<Link
									href={`/products/${cat.id}`}
									className={cat.id === categoryId ? 'text-purple-600 font-medium' : 'text-gray-500 hover:text-gray-700'}
								>
									{cat.name}
								</Link>
							</div>
						))}
					</nav>
				</div>
			</div>

			<div className="bg-white border-b">
				<div className="max-w-7xl mx-auto px-6 py-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
					<p className="text-lg text-gray-600">
						{hasChildren && `Explore ${category.children?.length} subcategories`}
						{hasProducts && `Browse ${products.length} products`}
					</p>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-12">
				{hasChildren ? (
					<>
						<h2 className="text-2xl font-bold text-gray-900 mb-8">Subcategories</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{category.children?.map((subcat) => (
								<Link
									key={subcat.id}
									href={`/products/${subcat.id}`}
									className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
								>
									<div className="h-48 bg-gradient-to-br flex items-center justify-center overflow-hidden">
										{subcat.cover_url ? (
											<img
												src={subcat.cover_url}
												alt={subcat.name}
												className="w-full h-full object-contain scale-[0.9] group-hover:scale-100 transition-transform duration-300"
											/>
										) : (
											<FolderIcon className="w-24 h-24 group-hover:scale-110 transition-transform duration-300" />
										)}
									</div>
									<div className="p-4 border-t border-gray-100">
										<h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 h-12">
											{subcat.name}
										</h3>
									</div>
								</Link>
							))}
						</div>
					</>
				) : hasProducts ? (
					<>
						<h2 className="text-2xl font-bold text-gray-900 mb-8">Products</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{products.map((product) => (
								<Link
									key={product.id}
									href={`/products/${categoryId}/${product.id}`}
									className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
								>
									<div className="h-48 bg-gradient-to-br flex items-center justify-center overflow-hidden">
										{product.main_image || product.cover_url ? (
											<img
												src={product.main_image || product.cover_url}
												alt={product.title}
												className="w-full h-full object-contain scale-[0.9] group-hover:scale-105 transition-transform duration-300"
											/>
										) : (
											<FolderIcon className="w-24 h-24 group-hover:scale-110 transition-transform duration-300" />
										)}
									</div>
									<div className="p-4 border-t border-gray-100">
										<h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 h-12">
											{product.title}
										</h3>
									</div>
								</Link>
							))}
						</div>
					</>
				) : (
					<div className="text-center py-20">
						<FolderIcon className="w-32 h-32 mx-auto mb-6" />
						<h3 className="text-2xl font-bold text-gray-900 mb-2">No Content Available</h3>
						<p className="text-gray-600">This category is currently empty.</p>
					</div>
				)}
			</div>

			<Footer />
		</div>
	);
}
