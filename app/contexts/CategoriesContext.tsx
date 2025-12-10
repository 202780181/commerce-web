'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Category {
	id: number;
	parent_id: number;
	name: string;
	cover_url?: string;
	children?: Category[];
	product_count?: number;
	sort?: number;
}

interface Product {
	id: number;
	category_id: number;
	name: string;
	cover_url?: string;
	line_drawing_url?: string;
	description_url?: string;
}

interface CategoriesContextType {
	categories: Category[];
	products: Product[];
	loading: boolean;
	error: string | null;
	findCategoryById: (id: number) => Category | null;
	getProductsByCategoryId: (categoryId: number) => Product[];
	getBreadcrumb: (categoryId: number) => Category[];
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// 递归排序函数
	const sortCategories = (cats: Category[]): Category[] => {
		return cats
			.sort((a, b) => (a.sort || 0) - (b.sort || 0))
			.map(cat => ({
				...cat,
				children: cat.children ? sortCategories(cat.children) : undefined
			}));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/proxy/portal/products/categories', {
					cache: 'no-store',
				});

				if (!response.ok) throw new Error('Failed to fetch categories');
				const data = await response.json();

				console.log('[CategoriesContext] Received data:', data);

				// 根据实际返回的数据结构处理
				if (Array.isArray(data)) {
					// 直接返回数组的情况
					console.log('[CategoriesContext] Processing as direct array');
					setCategories(sortCategories(data));
					setProducts([]);
				} else if (data.code === 0 && data.data) {
					if (Array.isArray(data.data)) {
						// 返回 {code: 0, data: [...]} 的情况（当前接口格式）
						console.log('[CategoriesContext] Processing as {code: 0, data: array}');
						if (data.data.length > 0) {
							console.log('[CategoriesContext] First category sample:', data.data[0]);
						}
						setCategories(sortCategories(data.data));
						setProducts([]);
					} else {
						// 返回 {code: 0, data: {categories: [], products: []}} 的情况
						console.log('[CategoriesContext] Processing as {code: 0, data: {categories, products}}');
						setCategories(sortCategories(data.data.categories || []));
						setProducts(data.data.products || []);
					}
				} else {
					throw new Error(data.message || 'Invalid data format');
				}
			} catch (err) {
				console.error('Error fetching data:', err);
				setError(err instanceof Error ? err.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const findCategoryById = (id: number): Category | null => {
		const search = (cats: Category[]): Category | null => {
			for (const cat of cats) {
				if (cat.id === id) return cat;
				if (cat.children) {
					const found = search(cat.children);
					if (found) return found;
				}
			}
			return null;
		};
		return search(categories);
	};

	const getProductsByCategoryId = (categoryId: number): Product[] => {
		return products.filter(p => p.category_id === categoryId);
	};

	const getBreadcrumb = (categoryId: number): Category[] => {
		const breadcrumb: Category[] = [];
		
		const findPath = (cats: Category[], targetId: number, path: Category[]): boolean => {
			for (const cat of cats) {
				const newPath = [...path, cat];
				if (cat.id === targetId) {
					breadcrumb.push(...newPath);
					return true;
				}
				if (cat.children && findPath(cat.children, targetId, newPath)) {
					return true;
				}
			}
			return false;
		};

		findPath(categories, categoryId, []);
		return breadcrumb.slice(0, -1); // 排除当前分类
	};

	return (
		<CategoriesContext.Provider
			value={{
				categories,
				products,
				loading,
				error,
				findCategoryById,
				getProductsByCategoryId,
				getBreadcrumb,
			}}
		>
			{children}
		</CategoriesContext.Provider>
	);
}

export function useCategories() {
	const context = useContext(CategoriesContext);
	if (context === undefined) {
		throw new Error('useCategories must be used within a CategoriesProvider');
	}
	return context;
}
