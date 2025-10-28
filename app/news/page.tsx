"use client";

import { motion } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import Link from "next/link";
import { articlesData } from "../lib/articles";

// Article categories
const categories = [
	{ id: "all", name: "Latest Articles", slug: "latest" },
	{ id: "beginner", name: "Getting Started", slug: "beginner" },
	{ id: "marketing", name: "Marketing Guide", slug: "marketing" },
	{ id: "platform", name: "Platform Updates", slug: "platform" },
	{ id: "success", name: "Success Stories", slug: "success-stories" },
	{ id: "partner", name: "Partners", slug: "partners" },
	{ id: "selection", name: "Product Selection", slug: "product-selection" },
];

// Use articles from lib
const articles = articlesData;

export default function News() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const articlesPerPage = 12;

	// Filter articles
	const filteredArticles =
		selectedCategory === "all"
			? articles
			: articles.filter((article) => article.categorySlug === selectedCategory);

	// Pagination
	const indexOfLastArticle = currentPage * articlesPerPage;
	const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
	const currentArticles = filteredArticles.slice(
		indexOfFirstArticle,
		indexOfLastArticle
	);
	const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

	// Featured article (first one)
	const featuredArticle = articles.find((article) => article.featured);

	return (
		<div className="min-h-screen bg-white">
			<Header lightBackground={true} />

			{/* Hero Section */}
			<section className="relative pt-32 pb-16 px-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
				<div className="max-w-[1600px] mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-12"
					>
						<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
							Latest Articles
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Explore business strategies, marketing tips, and industry insights to help grow your business
						</p>
					</motion.div>

					{/* Category Navigation */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex flex-wrap gap-3 justify-center mb-12"
					>
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => {
									setSelectedCategory(category.id);
									setCurrentPage(1);
								}}
								className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id
									? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
									: "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
									}`}
							>
								{category.name}
							</button>
						))}
					</motion.div>
				</div>
			</section>

			{/* Featured Article */}
			{featuredArticle && selectedCategory === "all" && (
				<section className="py-16 px-6 bg-white">
					<div className="max-w-[1600px] mx-auto">
						<Link href={`/news/${featuredArticle.slug}`}>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8 }}
								className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
							>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
									{/* Image */}
									<div className="relative h-96 lg:h-auto overflow-hidden">
										<motion.img
											src={featuredArticle.image}
											alt={featuredArticle.title}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
										/>
										<div className="absolute top-6 left-6">
											<span className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-full">
												Featured
											</span>
										</div>
									</div>

									{/* Content */}
									<div className="p-12 flex flex-col justify-center bg-gradient-to-br from-purple-50 to-blue-50">
										<span className="text-purple-600 font-semibold mb-3 text-sm uppercase tracking-wide">
											{featuredArticle.category}
										</span>
										<h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
											{featuredArticle.title}
										</h2>
										<p className="text-gray-600 mb-6 text-lg">
											{featuredArticle.excerpt}
										</p>
										<div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
											<span>{featuredArticle.date}</span>
										</div>
										<motion.button
											whileHover={{ scale: 1.05, x: 10 }}
											whileTap={{ scale: 0.95 }}
											className="self-start px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-xl transition-all flex items-center gap-2"
										>
											Read More
											<svg
												className="w-5 h-5"
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
										</motion.button>
									</div>
								</div>
							</motion.div>
						</Link>
					</div>
				</section>
			)}

			{/* Articles Grid */}
			<section className="py-16 px-6 bg-gray-50">
				<div className="max-w-[1600px] mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{currentArticles.map((article, index) => (
							<Link key={article.id} href={`/news/${article.slug}`}>
								<motion.article
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.05 }}
									whileHover={{ y: -10, transition: { duration: 0.3 } }}
									className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
								>
									{/* Image */}
									<div className="relative h-56 overflow-hidden">
										<motion.img
											src={article.image}
											alt={article.title}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										{article.tag && (
											<div className="absolute top-4 left-4">
												<span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
													{article.tag}
												</span>
											</div>
										)}
									</div>

									{/* Content */}
									<div className="p-6">
										<span className="text-purple-600 font-semibold text-xs uppercase tracking-wide">
											{article.category}
										</span>
										<h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
											{article.title}
										</h3>
										<p className="text-gray-600 text-sm mb-4 line-clamp-3">
											{article.excerpt}
										</p>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-500">{article.date}</span>
											<motion.span
												className="text-purple-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
											>
												Read More
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</motion.span>
										</div>
									</div>
								</motion.article>
							</Link>
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="flex justify-center items-center gap-2 mt-16"
						>
							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === 1
									? "bg-gray-100 text-gray-400 cursor-not-allowed"
									: "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-2 border-gray-200"
									}`}
							>
								Previous
							</button>

							{Array.from({ length: totalPages }).map((_, index) => (
								<button
									key={`page-${index + 1}`}
									onClick={() => setCurrentPage(index + 1)}
									className={`w-10 h-10 rounded-lg font-semibold transition-all ${currentPage === index + 1
										? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
										: "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-2 border-gray-200"
										}`}
								>
									{index + 1}
								</button>
							))}

							<button
								onClick={() =>
									setCurrentPage((prev) => Math.min(prev + 1, totalPages))
								}
								disabled={currentPage === totalPages}
								className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === totalPages
									? "bg-gray-100 text-gray-400 cursor-not-allowed"
									: "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-2 border-gray-200"
									}`}
							>
								Next
							</button>
						</motion.div>
					)}
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-6 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
				<div className="max-w-4xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Learn Business Knowledge Anytime, Anywhere
						</h2>
						<p className="text-xl text-gray-200 mb-8">
							Subscribe to our newsletter to get the latest business insights, marketing strategies, and industry trends
						</p>
						<div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
							<input
								type="email"
								placeholder="Enter your email address"
								className="flex-1 px-6 py-4 rounded-full text-gray-900 outline-none focus:ring-4 focus:ring-purple-300 transition-all"
							/>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:shadow-xl transition-all whitespace-nowrap"
							>
								Subscribe Now
							</motion.button>
						</div>
						<p className="text-sm text-gray-300 mt-4">
							Join over 100,000+ subscribers and get weekly curated content
						</p>
					</motion.div>
				</div>
			</section>

			{/* Topics Section */}
			<section className="py-20 px-6 bg-white">
				<div className="max-w-[1600px] mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Popular Topics
						</h2>
						<p className="text-xl text-gray-600">
							Explore our popular content categories
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								icon: "🚀",
								title: "Startup Guide",
								description: "Build your business empire from scratch",
								color: "from-blue-500 to-cyan-500",
							},
							{
								icon: "📱",
								title: "Social Media Strategy",
								description: "Close deals on social platforms",
								color: "from-purple-500 to-pink-500",
							},
							{
								icon: "💡",
								title: "Business Tools",
								description: "Practical tool recommendations to boost efficiency",
								color: "from-amber-500 to-orange-500",
							},
							{
								icon: "📊",
								title: "Data Analytics",
								description: "Make data-driven business decisions",
								color: "from-green-500 to-emerald-500",
							},
						].map((topic, index) => (
							<motion.div
								key={topic.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								whileHover={{ y: -10, transition: { duration: 0.3 } }}
								className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-purple-200 transition-all cursor-pointer group shadow-lg hover:shadow-xl"
							>
								<div
									className={`text-5xl mb-4 w-16 h-16 rounded-full bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
								>
									{topic.icon}
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-3">
									{topic.title}
								</h3>
								<p className="text-gray-600 mb-4">{topic.description}</p>
								<span className="text-purple-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
									Learn More
									<svg
										className="w-5 h-5"
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
								</span>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

