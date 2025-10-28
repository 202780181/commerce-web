"use client";

import { motion } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

// Product categories
const categories = [
	{
		id: "collagen",
		name: "Collagen",
		description: "Strengthen hair, skin, nails, and joints with clean collagen peptides.",
		icon: "✨",
		gradient: "from-pink-500 to-rose-500",
	},
	{
		id: "fasting",
		name: "Fasting Support",
		description: "Electrolytes and ketone support to stay energized while fasting.",
		icon: "⚡",
		gradient: "from-blue-500 to-cyan-500",
	},
	{
		id: "bars",
		name: "Bars",
		description: "Delicious low-carb snack bars to keep you fueled on the go.",
		icon: "🍫",
		gradient: "from-amber-500 to-orange-500",
	},
	{
		id: "brain",
		name: "Brain Boost",
		description: "Nootropics and ketones to improve focus, clarity, and mental energy.",
		icon: "🧠",
		gradient: "from-purple-500 to-indigo-500",
	},
];

// Product data
const products = [
	{
		id: 1,
		name: "Grass-Fed Collagen Peptides",
		category: "Collagen",
		price: 43.99,
		reviews: 5979,
		rating: 4.8,
		image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
		badge: "BEST SELLER",
		description: "Premium grass-fed collagen for hair, skin, and nails.",
	},
	{
		id: 2,
		name: "Collagen Protein Bars",
		category: "Bars",
		price: 44.99,
		reviews: 4503,
		rating: 4.7,
		image: "https://images.unsplash.com/photo-1604413191730-db96bf1a4c7b?w=500&q=80",
		badge: "POPULAR",
		description: "High-protein, low-carb bars with collagen.",
	},
	{
		id: 3,
		name: "Nola Bars",
		category: "Bars",
		price: 24.99,
		reviews: 1282,
		rating: 4.9,
		image: "https://images.unsplash.com/photo-1523294587484-bae6cc870010?w=500&q=80",
		badge: "NEW",
		description: "Crunchy granola bars with keto-friendly ingredients.",
	},
	{
		id: 4,
		name: "Base Ketones",
		category: "Exogenous Ketones",
		price: 42.99,
		reviews: 5034,
		rating: 4.8,
		image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&q=80",
		badge: "BEST SELLER",
		description: "Pure exogenous ketones for energy and focus.",
	},
	{
		id: 5,
		name: "MCT Oil Powder",
		category: "MCT",
		price: 40.99,
		reviews: 4500,
		rating: 4.7,
		image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&q=80",
		badge: "POPULAR",
		description: "Clean energy from medium-chain triglycerides.",
	},
	{
		id: 6,
		name: "Daily Electrolytes",
		category: "Powdered Beverage Mixes",
		price: 30.99,
		originalPrice: 37.99,
		reviews: 677,
		rating: 4.9,
		image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
		badge: "SALE",
		description: "Essential electrolytes for hydration and recovery.",
	},
	{
		id: 7,
		name: "Keto Nootropic",
		category: "Brain Boost",
		price: 39.99,
		reviews: 892,
		rating: 4.6,
		image: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=500&q=80",
		description: "Mental clarity and cognitive enhancement.",
	},
	{
		id: 8,
		name: "Whey Protein Isolate",
		category: "Protein",
		price: 45.99,
		reviews: 2341,
		rating: 4.8,
		image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&q=80",
		description: "Pure grass-fed whey protein isolate.",
	},
];

// Bundle data
const bundles = [
	{
		id: 1,
		name: "Starter Bundle",
		description: "Everything you need to begin your keto journey",
		price: 119.99,
		originalPrice: 149.99,
		savings: 30,
		image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80",
	},
	{
		id: 2,
		name: "Overall Wellness",
		description: "Complete nutrition for optimal health",
		price: 139.99,
		originalPrice: 179.99,
		savings: 40,
		image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80",
	},
	{
		id: 3,
		name: "Fasting Support",
		description: "Stay energized during your fasting window",
		price: 99.99,
		originalPrice: 129.99,
		savings: 30,
		image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
	},
	{
		id: 4,
		name: "Mental Clarity",
		description: "Boost focus and cognitive performance",
		price: 109.99,
		originalPrice: 139.99,
		savings: 30,
		image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
	},
];

export default function Products() {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("popular");

	const filteredProducts =
		selectedCategory === "all"
			? products
			: products.filter((p) => p.category === selectedCategory);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Hero Section */}
			<section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
				{/* Animated Background */}
				<motion.div
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
					animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
				/>

				{/* Gradient Orbs */}
				<motion.div
					className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
					animate={{
						x: [0, 100, 0],
						y: [0, 50, 0],
					}}
					transition={{
						duration: 15,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
					animate={{
						x: [0, -100, 0],
						y: [0, -50, 0],
					}}
					transition={{
						duration: 18,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				{/* Content */}
				<div className="relative h-full flex flex-col items-center justify-center text-center px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
							Your Keto Journey
							<br />
							<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
								Made Simple
							</span>
						</h1>
						<p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
							Powerful products to help you stay energized, focused, and on track.
						</p>
						<div className="flex flex-wrap gap-4 justify-center">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
								className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
							>
								Shop All Products
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
								className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all"
							>
								View Bundles
							</motion.button>
						</div>
					</motion.div>
				</div>

				{/* Scroll Indicator */}
				<motion.div
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					<svg
						className="w-6 h-6 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</motion.div>
			</section>

			{/* Categories Section */}
			<section className="py-20 px-6 bg-white">
				<div className="max-w-[1600px] mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Shop by Category
						</h2>
						<p className="text-xl text-gray-600">
							Find the perfect products for your wellness goals
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{categories.map((category, index) => (
							<motion.div
								key={category.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ y: -10, transition: { duration: 0.3 } }}
								className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-300 transition-all cursor-pointer group shadow-lg hover:shadow-2xl"
								onClick={() => setSelectedCategory(category.id)}
							>
								<div
									className={`text-5xl mb-4 bg-gradient-to-br ${category.gradient} w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
								>
									<span>{category.icon}</span>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-3">
									{category.name}
								</h3>
								<p className="text-gray-600 mb-6">{category.description}</p>
								<button className="text-purple-600 font-semibold group-hover:text-purple-700 transition-colors flex items-center gap-2">
									Shop Now
									<svg
										className="w-5 h-5 group-hover:translate-x-2 transition-transform"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										/>
									</svg>
								</button>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			<section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-purple-50">
				<div className="max-w-[1600px] mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Featured Products
						</h2>
						<p className="text-xl text-gray-600 mb-8">
							Discover our best-selling products, trusted by thousands of customers
						</p>

						{/* Filter & Sort */}
						<div className="flex flex-wrap gap-4 justify-center items-center">
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="px-6 py-3 border-2 border-gray-300 rounded-full focus:border-purple-500 outline-none transition-colors"
							>
								<option value="all">All Categories</option>
								<option value="Collagen">Collagen</option>
								<option value="Bars">Bars</option>
								<option value="Exogenous Ketones">Exogenous Ketones</option>
								<option value="MCT">MCT</option>
								<option value="Brain Boost">Brain Boost</option>
							</select>

							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-6 py-3 border-2 border-gray-300 rounded-full focus:border-purple-500 outline-none transition-colors"
							>
								<option value="popular">Most Popular</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
								<option value="rating">Highest Rated</option>
							</select>
						</div>
					</motion.div>

					{/* Products Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{filteredProducts.map((product, index) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.05 }}
								whileHover={{ y: -10, transition: { duration: 0.3 } }}
								className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
							>
								{/* Product Image */}
								<div className="relative h-64 overflow-hidden bg-gray-100">
									<motion.img
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									/>
								</div>

								{/* Product Info */}
								<div className="p-6">
									<p className="text-sm text-purple-600 font-semibold mb-2 uppercase">
										{product.category}
									</p>
									<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
										{product.name}
									</h3>
									<p className="text-gray-600 mb-4 text-sm line-clamp-2">
										{product.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Bundles Section */}
			<section className="py-20 px-6 bg-white">
				<div className="max-w-[1600px] mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Discover Bundle Deals
						</h2>
						<p className="text-xl text-gray-600">
							Save more with our curated product bundles for every lifestyle
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{bundles.map((bundle, index) => (
							<motion.div
								key={bundle.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ y: -10, transition: { duration: 0.3 } }}
								className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
							>
								<div className="relative h-48 overflow-hidden">
									<motion.img
										src={bundle.image}
										alt={bundle.name}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									/>
								</div>

								<div className="p-6">
									<h3 className="text-2xl font-bold text-gray-900 mb-2">
										{bundle.name}
									</h3>
									<p className="text-gray-600 mb-4">{bundle.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-20 px-6 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
				<div className="max-w-[1600px] mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="text-center"
						>
							<div className="text-6xl mb-4">🎯</div>
							<h3 className="text-2xl font-bold mb-3">Support Weight Loss</h3>
							<p className="text-gray-300">
								Achieve your goals with scientifically-backed keto nutrition
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-center"
						>
							<div className="text-6xl mb-4">😋</div>
							<h3 className="text-2xl font-bold mb-3">Enjoy Tasty Food</h3>
							<p className="text-gray-300">
								Delicious products that make healthy eating enjoyable
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-center"
						>
							<div className="text-6xl mb-4">⚡</div>
							<h3 className="text-2xl font-bold mb-3">Feel Energized</h3>
							<p className="text-gray-300">
								Sustained energy throughout the day without crashes
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-6 bg-white">
				<div className="max-w-4xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Join the Internet's Largest{" "}
							<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
								Keto Newsletter
							</span>
						</h2>
						<p className="text-xl text-gray-600 mb-8">
							We'll send you articles, product guides, and exclusive offers customized to your goals.
						</p>
						<div className="flex gap-4 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-full focus:border-purple-500 outline-none transition-colors"
							/>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-all whitespace-nowrap"
							>
								Subscribe
							</motion.button>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

