"use client";

import { motion } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Product data - 使用字符串ID以匹配详情页面
const products = [
	{
		id: "modular-combined-display",
		name: "Modular Combined Display",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/01%20Modular%20Combined%20Display/%E5%B0%81%E9%9D%A2/4Axis%20Single-Side%20L-Bracket%20Assembly.png",
		badge: "BEST SELLER",
		description: "Premium grass-fed collagen for hair, skin, and nails.",
	},
	{
		id: "quick-release-jaws-vise",
		name: "Quick Release Jaws Vise",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/02%20Quick%20Release%20Jaws%20Vise/%E5%B0%81%E9%9D%A2/HP10077%28Steel%20Jaw%29.png",
		badge: "POPULAR",
		description: "High-protein, low-carb bars with collagen.",
	},
	{
		id: "manual-vise-series",
		name: "Manual Vise Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/03%20Manual%20Vise%20Series/%E5%B0%81%E9%9D%A2/CV255125%28Steel%20Jaw%29.png",
		badge: "NEW",
		description: "Crunchy granola bars with keto-friendly ingredients.",
	},
	{
		id: "pneumatic-vise-pressurization",
		name: "Pneumatic Vise Series(With Pressurization",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/04%20Pneumatic%20Vise%20Series%28With%20Pressurization/%E5%B0%81%E9%9D%A2/AH160%28Pneumatic%20Vice%29.png",
		badge: "BEST SELLER",
		description: "Pure exogenous ketones for energy and focus.",
	},
	{
		id: "pneumatic-vise-pneumatic",
		name: "Pneumatic Vise Series(Pneumatic Type",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/05%20Pneumatic%20Vise%20Series%28Pneumatic%20Type/%E5%B0%81%E9%9D%A2/ar155-I.png",
		badge: "POPULAR",
		description: "Clean energy from medium-chain triglycerides.",
	},
	{
		id: "zero-point-aluminum",
		name: "Zero Point Clamping(Aluminum Base",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/06%20Zero%20Point%20Clamping%28Aluminum%20Base/%E5%B0%81%E9%9D%A2/TA9652.png",
		badge: "SALE",
		description: "Essential electrolytes for hydration and recovery.",
	},
	{
		id: "zero-point-steel",
		name: "Zero Point Clamping(Steel Base)",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/07%20Zero%20Point%20Clamping%28Steel%20Base%29/%E5%B0%81%E9%9D%A2%E5%9B%BE/TS52-108_2.png",
		description: "Mental clarity and cognitive enhancement.",
	},
	{
		id: "high-precision-zero-point",
		name: "High Precision Zero Point Clamping",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/08%20High%20Precision%20Zero%20Point%20Clamping/%E5%B0%81%E9%9D%A2/PM52-120.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "high-precision-pneumatic-zero",
		name: "High Precision Pneumatic Zero Point Clamping",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/09.High%20Precision%20Pneumatic%20Zero%20Point%20Clamping/%E5%B0%81%E9%9D%A2/0cd1de325a0cd9b161c22c47503f0126.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "pull-studs-series",
		name: "Pull Studs Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/10%20Pull%20Studs%20Series/%E5%B0%81%E9%9D%A2/PM52-Pull%20Studs.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "dovetail-fixture",
		name: "Dovetail Fixture",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/11%20Dovetail%20Fixture/%E5%B0%81%E9%9D%A2%E5%9B%BE/ts96-v50.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "er-clamping-series",
		name: "ER Clamping Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/12%20ER%20Clamping%20Series/12%20ER%20Clamping%20Series/%E5%B0%81%E9%9D%A2%E5%9B%BE/ts96-er40.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "modular-combination",
		name: "Modular Combination Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/13%20Modular%20Combination%20Series/%E5%B0%81%E9%9D%A2/TS52-120R.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "modular-set-series",
		name: "Modular Set Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/14%20Modular%20Set%20Series/%E5%B0%81%E9%9D%A2/TS52%E7%BB%84%E5%90%88.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "bridge-plate-series",
		name: "Bridge Plate Series",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/15%20L%20Bridge%20Plate%20Series/%E5%B0%81%E9%9D%A2/L255.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "5axis-pyramid-series",
		name: "5Axis Pyramid Series",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/16%205Axis%20Pyramid%20Series/%E5%B0%81%E9%9D%A2%E5%9B%BE/TS96-4P%E5%9B%9B%E5%B7%A5%E4%BD%8D%E5%8A%A0%E9%AB%98%E5%A1%94.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "run-out-tester",
		name: "Run_out Tester",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/17%20Run_out%20Tester/%E5%B0%81%E9%9D%A2/BT40Standard%20Version.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "unilateral-positioner",
		name: "Unilateral Positione",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/18%20Unilateral%20Positione/%E5%B0%81%E9%9D%A2/DW-1.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "cnc-tombstone-series",
		name: "CNC Tombstone Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/19%20CNC%20Tombstone%20Series/%E5%B0%81%E9%9D%A2/TS96-HM400_3p.487.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "precision-bench-vice",
		name: "Precision Bench Vice",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/20%20Precision%20Bench%20Vice/%E5%B0%81%E9%9D%A2/0%E5%BA%A6%E5%89%8D%E8%A7%86%E5%9B%BE-2.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "hydraulic-bite-machine",
		name: "Hydraulic Bite Machine",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/21%20Hydraulic%20Bite%20Machine/%E5%B0%81%E9%9D%A2/YC-M1_2.327.png",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "pneumatic-single-hole-zero",
		name: "Pneumatic Single Hole Zero Plate Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/22%20Pneumatic%20Single%20Hole%20Zero%20Plate%20Series/%E5%B0%81%E9%9D%A2/ZP4036%E5%B8%A6%E6%89%98%E7%9B%98.png",
		description: "Pure grass-fed whey protein isolate.",
	},
];

export default function Products() {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
							<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
								Products
							</span>
						</h1>
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

					</motion.div>

					{/* Products Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{filteredProducts.map((product, index) => (
							<Link 
								key={product.id}
								href={product.id ? `/products/${product.id}` : "#"}
							>
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.05 }}
									whileHover={{ y: -10, transition: { duration: 0.3 } }}
									className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer h-full"
								>
									{/* Product Image */}
									<div className="relative h-64 overflow-hidden bg-gray-100">
										<motion.div
											className="w-full h-full group-hover:scale-110 transition-transform duration-500"
										>
											<Image
												src={product.image}
												alt={product.name}
												fill
												className="object-cover"
												sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
												loading="lazy"
												quality={85}
											/>
										</motion.div>
									</div>

									{/* Product Info */}
									<div className="p-6">
										<p className="text-sm text-purple-600 font-semibold mb-2 uppercase">
											{product.category}
										</p>
										<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
											{product.name}
										</h3>
									</div>
								</motion.div>
							</Link>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}

