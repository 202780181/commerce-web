"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import Link from "next/link";

// Product data - 使用字符串ID以匹配详情页面
const products = [
	{
		id: "modular-combined-display",
		index:1,
		name: "Modular Combined Display",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/01%20Modular%20Combined%20Display/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "BEST SELLER",
		description: "Premium grass-fed collagen for hair, skin, and nails.",
	},
	{
		id: "quick-release-jaws-vise",
		index:2,
		name: "Quick Release Jaws Vise",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/02%20Quick%20Release%20Jaws%20Vise/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "POPULAR",
		description: "High-protein, low-carb bars with collagen.",
	},
	{
		id: "manual-vise-series",
		index:3,
		name: "Manual Vise Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/03%20Manual%20Vise%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "NEW",
		description: "Crunchy granola bars with keto-friendly ingredients.",
	},
	{
		id: "pneumatic-vise-pressurization",
		index:4,
		name: "Pneumatic Vise Series(With Pressurization",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/04%20Pneumatic%20Vise%20Series%28With%20Pressurization/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "BEST SELLER",
		description: "Pure exogenous ketones for energy and focus.",
	},
	{
		id: "pneumatic-vise-pneumatic",
		index:5,
		name: "Pneumatic Vise Series(Pneumatic Type",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/05%20Pneumatic%20Vise%20Series%28Pneumatic%20Type/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "POPULAR",
		description: "Clean energy from medium-chain triglycerides.",
	},
	{
		id: "zero-point-aluminum",
		index:6,
		name: "Zero Point Clamping(Aluminum Base",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/06%20Zero%20Point%20Clamping%28Aluminum%20Base/%E5%B0%81%E9%9D%A2/cover.webp",
		badge: "SALE",
		description: "Essential electrolytes for hydration and recovery.",
	},
	{
		id: "zero-point-steel",
		index:7,	
		name: "Zero Point Clamping(Steel Base)",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/07%20Zero%20Point%20Clamping%28Steel%20Base%29/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp",
		description: "Mental clarity and cognitive enhancement.",
	},
	{
		id: "high-precision-zero-point",
		index:8,
		name: "High Precision Zero Point Clamping",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/08%20High%20Precision%20Zero%20Point%20Clamping/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "high-precision-pneumatic-zero",
		index:9,
		name: "High Precision Pneumatic Zero Point Clamping",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/09.High%20Precision%20Pneumatic%20Zero%20Point%20Clamping/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "pull-studs-series",
		index:10,
		name: "Pull Studs Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/10%20Pull%20Studs%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "dovetail-fixture",
		index:11,
		name: "Dovetail Fixture",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/11%20Dovetail%20Fixture/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "er-clamping-series",
		index:12,
		name: "ER Clamping Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/12%20ER%20Clamping%20Series/12%20ER%20Clamping%20Series/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "modular-combination",
		index:13,
		name: "Modular Combination Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/13%20Modular%20Combination%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "modular-set-series",
		index:14,
		name: "Modular Set Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/14%20Modular%20Set%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "bridge-plate-series",
		index:15,
		name: "Bridge Plate Series",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/15%20L%20Bridge%20Plate%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "5Axis-pyramid-series",
		index:16,
		name: "5Axis Pyramid Series",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/16%205Axis%20Pyramid%20Series/%E5%B0%81%E9%9D%A2%E5%9B%BE/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "run_out-tester",
		index:17,
		name: "Run_out Tester",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/17%20Run_out%20Tester/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "Unilateral-Positione",
		index:18,
		name: "Unilateral Positione",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/18%20Unilateral%20Positione/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "cnc-tombstone-series",
		index:19,
		name: "CNC Tombstone Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/19%20CNC%20Tombstone%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "precision-bench-vice",
		index:20,
		name: "Precision Bench Vice",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/20%20Precision%20Bench%20Vice/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "hydraulic-bite-machine",
		index:21,
		name: "Hydraulic Bite Machine",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/21%20Hydraulic%20Bite%20Machine/%E5%B0%81%E9%9D%A2/cover.webp",
		description: "Pure grass-fed whey protein isolate.",
	},
	{
		id: "pneumatic-single-hole-zero",
		index:22,
		name: "Pneumatic Single Hole Zero Plate Series",
		category: "",
		image: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/22%20Pneumatic%20Single%20Hole%20Zero%20Plate%20Series/%E5%B0%81%E9%9D%A2/cover.webp",
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
						{filteredProducts.map((product) => (
							<Link 
								key={product.id}
								href={product.id ? `/products/${product.id}/gallery` : "#"}
								className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full block group"
							>
								{/* Product Image */}
								<div className="relative h-64 bg-gray-100 overflow-hidden">
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										loading="lazy"
										decoding="async"
										style={{ contentVisibility: 'auto' }}
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

