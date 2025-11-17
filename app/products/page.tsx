"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { getAllProducts } from "../lib/productConfig";

export default function Products() {
	// 获取所有产品配置
	const products = getAllProducts();

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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{products.map((product) => (
							<Link 
								key={product.id}
								href={`/products/${product.id}`}
								className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full block group"
							>
								{/* Product Image */}
								<div className="relative h-64 bg-gray-100 overflow-hidden">
									<img
										src={product.coverImage}
										alt={product.name}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										loading="lazy"
										decoding="async"
										style={{ contentVisibility: 'auto' }}
									/>
								</div>

								{/* Product Info */}
								<div className="p-6">
									<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
										{product.name}
									</h3>
									{product.hasCategories && (
										<p className="text-sm text-gray-500">
											{product.categories?.length} 分类
										</p>
									)}
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}

