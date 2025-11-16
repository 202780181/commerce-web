"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { motion } from "motion/react";
import { getProductImages } from "../../../lib/productImages";

// 产品文件夹映射
const productFolderMap: Record<string, string> = {
	"modular-combined-display": "01 Modular Combined Display",
	"quick-release-jaws-vise": "02 Quick Release Jaws Vise",
	"manual-vise-series": "03 Manual Vise Series",
	"pneumatic-vise-pressurization": "04 Pneumatic Vise Series(With Pressurization",
	"pneumatic-vise-pneumatic": "05 Pneumatic Vise Series(Pneumatic Type",
	"zero-point-aluminum": "06 Zero Point Clamping(Aluminum Base",
	"zero-point-steel": "07 Zero Point Clamping(Steel Base)",
	"high-precision-zero-point": "08 High Precision Zero Point Clamping",
	"high-precision-pneumatic-zero": "09.High Precision Pneumatic Zero Point Clamping",
	"pull-studs-series": "10 Pull Studs Series",
	"dovetail-fixture": "11 Dovetail Fixture",
	"er-clamping-series": "12 ER Clamping Series",
	"modular-combination": "13 Modular Combination Series",
	"modular-set-series": "14 Modular Set Series",
	"bridge-plate-series": "15 L Bridge Plate Series",
	"5Axis-pyramid-series": "16 5Axis Pyramid Series",
	"run_out-tester": "17 Run_out Tester",
	"Unilateral-Positione": "18 Unilateral Positione",
	"cnc-tombstone-series": "19 CNC Tombstone Series",
	"precision-bench-vice": "20 Precision Bench Vice",
	"hydraulic-bite-machine": "21 Hydraulic Bite Machine",
	"pneumatic-single-hole-zero": "22 Pneumatic Single Hole Zero Plate Series",
};

// 产品名称映射
const productNameMap: Record<string, string> = {
	"modular-combined-display": "Modular Combined Display",
	"quick-release-jaws-vise": "Quick Release Jaws Vise",
	"manual-vise-series": "Manual Vise Series",
	"pneumatic-vise-pressurization": "Pneumatic Vise Series(With Pressurization)",
	"pneumatic-vise-pneumatic": "Pneumatic Vise Series(Pneumatic Type)",
	"zero-point-aluminum": "Zero Point Clamping(Aluminum Base)",
	"zero-point-steel": "Zero Point Clamping(Steel Base)",
	"high-precision-zero-point": "High Precision Zero Point Clamping",
	"high-precision-pneumatic-zero": "High Precision Pneumatic Zero Point Clamping",
	"pull-studs-series": "Pull Studs Series",
	"dovetail-fixture": "Dovetail Fixture",
	"er-clamping-series": "ER Clamping Series",
	"modular-combination": "Modular Combination Series",
	"modular-set-series": "Modular Set Series",
	"bridge-plate-series": "Bridge Plate Series",
	"5Axis-pyramid-series": "5Axis Pyramid Series",
	"run_out-tester": "Run_out Tester",
	"Unilateral-Positione": "Unilateral Positione",
	"cnc-tombstone-series": "CNC Tombstone Series",
	"precision-bench-vice": "Precision Bench Vice",
	"hydraulic-bite-machine": "Hydraulic Bite Machine",
	"pneumatic-single-hole-zero": "Pneumatic Single Hole Zero Plate Series",
};

interface ProductImage {
	name: string;
	url: string;
}

export default function ProductGallery() {
	const params = useParams();
	const router = useRouter();
	const productId = params.id as string;
	const [images, setImages] = useState<ProductImage[]>([]);
	const [loading, setLoading] = useState(true);

	const productName = productNameMap[productId] || "Product";
	const folderName = productFolderMap[productId];

	useEffect(() => {
		// 从产品图片数据库加载图片
		const loadImages = () => {
			try {
				const productImages = getProductImages(productId);
				setImages(productImages);
				setLoading(false);
			} catch (error) {
				console.error("Failed to load images:", error);
				setLoading(false);
			}
		};

		loadImages();
	}, [productId]);

	const handleImageClick = (imageName: string) => {
		// 点击图片跳转到详情页
		router.push(`/products/${productId}?image=${encodeURIComponent(imageName)}`);
	};

	if (!folderName) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
					<p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
					<button
						onClick={() => router.push("/products")}
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
					>
						Back to Products
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Hero Section */}
			<section className="relative py-20 px-6 bg-gradient-to-br from-purple-600 to-blue-600">
				<div className="max-w-7xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<button
							onClick={() => router.push("/products")}
							className="text-white/80 hover:text-white mb-6 flex items-center gap-2 transition-colors"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							Back to Products
						</button>
						<h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
							{productName}
						</h1>
						<p className="text-xl text-white/90">
							Browse product images and click to view details
						</p>
					</motion.div>
				</div>
			</section>

			{/* Gallery Section */}
			<section className="py-20 px-6 bg-gray-50">
				<div className="max-w-[1600px] mx-auto">
					{loading ? (
						<div className="flex flex-col justify-center items-center py-20">
							<div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4"></div>
							<p className="text-gray-600 text-lg">Loading images...</p>
						</div>
					) : images.length === 0 ? (
						<div className="text-center py-20 bg-white rounded-2xl shadow-lg">
							<div className="mb-6">
								<svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">No Images Available</h3>
							<p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
								This product doesn't have any images yet. Check back later or view product details.
							</p>
							<button
								onClick={() => router.push(`/products/${productId}`)}
								className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
							>
								View Product Details
							</button>
						</div>
					) : (
						<>
							{/* Gallery Header */}
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
									Product Gallery
								</h2>
								<p className="text-lg text-gray-600">
									{images.length} {images.length === 1 ? 'image' : 'images'} available • Click to view details
								</p>
							</div>

							{/* Images Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{images.map((image, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.03 }}
										className="group cursor-pointer"
										onClick={() => handleImageClick(image.name)}
									>
										<div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300">
											{/* Image Container */}
											<div className="relative h-80 overflow-hidden bg-gray-50">
												<img
													src={image.url}
													alt={image.name}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
													loading="lazy"
													decoding="async"
													style={{ contentVisibility: 'auto' }}
												/>
												{/* Image Number Badge */}
												<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
													<span className="text-sm font-bold text-gray-700">#{index + 1}</span>
												</div>
											</div>
											{/* Image Name - Inside Card */}
											<div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
												<p className="text-sm font-medium text-gray-700 truncate text-center">
													{image.name}
												</p>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</>
					)}
				</div>
			</section>
			<Footer />
		</div>
	);
}
