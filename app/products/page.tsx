"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { usePageCache } from "../hooks/usePageCache";
import { useCategories } from "../contexts/CategoriesContext";
import FolderIcon from "../components/FolderIcon";

export default function Products() {
	usePageCache();
	const { categories, loading } = useCategories();
	
	// 只显示顶级分类 (parent_id === 0)
	const topCategories = categories.filter(cat => cat.parent_id === 0);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Hero Section */}
			<section className="relative h-[60vh] min-h-[500px] overflow-hidden">
				{/* Background Image */}
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("/images/products/products.webp")`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>

				{/* Content */}
				<div className="relative h-full flex flex-col items-center justify-center text-center px-6">
					<h1 className="text-6xl md:text-7xl font-bold mb-6">
						<span 
							className="bg-clip-text text-transparent"
							style={{
								backgroundImage: 'linear-gradient(90deg, white, #f24711)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text',
							}}
						>
							Products
						</span>
					</h1>
				</div>
			</section>
			{/* Featured Products Section */}
			<section className="py-20 px-6 bg-gray-50">
				<div className="max-w-[1600px] mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Featured Products
						</h2>
						<p className="text-xl text-gray-600 mb-8">
							Discover our best-selling products, trusted by thousands of customers
						</p>
					</div>

					{/* Products Grid */}
					{loading ? (
						<div className="text-center py-12">
							<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
							<p className="mt-4 text-gray-600">Loading categories...</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
							{topCategories.map((category) => (
								<Link 
									key={category.id}
									href={`/products/${category.id}`}
									className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full block group"
								>
									{/* Category Image */}
									<div className="relative h-48 bg-linear-to-br overflow-hidden flex items-center justify-center">
										{category.cover_url ? (
											<img
												src={category.cover_url}
												alt={category.name}
												className="w-full h-full group-hover:scale-100 transition-transform duration-500"
												loading="lazy"
											/>
										) : (
											<FolderIcon className="w-24 h-24" />
										)}
									</div>
									{/* Category Info */}
									<div className="p-4 border-t border-gray-100">
										<h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 h-12">
											{category.name}
										</h3>
										{category.children && (
											<p className="text-xs text-gray-500 mt-1">
												{category.children.length} subcategories
											</p>
										)}
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</section>
			<Footer />
		</div>
	);
}

