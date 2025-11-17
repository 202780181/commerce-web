"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { motion } from "motion/react";
import { getProductById, getCategoryById } from "../../../../lib/productConfig";

export default function ProductDetailPage() {
	const params = useParams();
	const router = useRouter();
	const productId = params.id as string;
	const categoryId = params.categoryId as string;
	const imageId = params.imageId as string;
	
	// Get data from product configuration
	const product = getProductById(productId);
	const category = getCategoryById(productId, categoryId);
	
	// Find the specific image
	const imageIndex = parseInt(imageId);
	const currentImage = category?.images[imageIndex];
	const allImages = category?.images || [];
	
	// State for current image selection
	const [selectedImageIndex, setSelectedImageIndex] = useState(imageIndex);
	const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
	const [displayMode, setDisplayMode] = useState<'image' | 'pdf'>('image'); // 'image' or 'pdf'
	
	// Mock PDF data - replace with actual PDF URLs from your configuration
	const pdfDocuments = [
		{ id: 1, name: "Technical Drawing 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
		{ id: 2, name: "Technical Drawing 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
		{ id: 3, name: "Technical Drawing 3", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
	];
	
	// Mock product specifications - replace with actual data from configuration
	const specifications = [
		{ label: "Model", value: currentImage?.name || "N/A" },
		{ label: "Material", value: "Hardened Steel" },
		{ label: "Precision", value: "±0.005mm" },
		{ label: "Max Load", value: "500kg" },
		{ label: "Weight", value: "25kg" },
		{ label: "Dimensions", value: "300 x 200 x 150mm" },
		{ label: "Surface Treatment", value: "Heat Treated" },
		{ label: "Warranty", value: "2 Years" },
	];
	
	if (!product || !category || !currentImage) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
					<p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
					<Link
						href="/products"
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
					>
						Back to Products
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Breadcrumb */}
			<section className="bg-white border-b">
				<div className="max-w-[1800px] mx-auto px-6 py-4">
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<Link href="/products" className="hover:text-purple-600 transition-colors">
							Products
						</Link>
						<span>/</span>
						<Link href={`/products/${productId}`} className="hover:text-purple-600 transition-colors">
							{product.name}
						</Link>
						<span>/</span>
						<Link href={`/products/${productId}/${categoryId}`} className="hover:text-purple-600 transition-colors">
							{category.name}
						</Link>
						<span>/</span>
						<span className="text-gray-900 font-medium">{currentImage.name}</span>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-12 px-6">
				<div className="max-w-[1800px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Left Column - Image Gallery */}
						<div className="lg:col-span-2">
							{/* Main Display Area - Image or PDF */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
							>
								<div className="relative aspect-[4/3] bg-gray-100">
									{displayMode === 'image' ? (
										<>
											<img
												src={allImages[selectedImageIndex]?.url}
												alt={allImages[selectedImageIndex]?.name}
												className="w-full h-full object-contain"
											/>
											<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
												<span className="text-sm font-bold text-gray-700">
													Image {selectedImageIndex + 1} / {allImages.length}
												</span>
											</div>
										</>
									) : (
										<>
											<iframe
												src={pdfDocuments[selectedPdfIndex]?.url}
												className="w-full h-full"
												title={pdfDocuments[selectedPdfIndex]?.name}
											/>
											<div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full">
												<span className="text-sm font-bold text-white">
													PDF {selectedPdfIndex + 1} / {pdfDocuments.length}
												</span>
											</div>
										</>
									)}
								</div>
							</motion.div>

							{/* Thumbnail Gallery - Images and PDFs Combined */}
							<div className="bg-white rounded-2xl shadow-lg p-6">
								<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
									{/* Product Images */}
									{allImages.map((image, index) => (
										<button
											key={`image-${index}`}
											onClick={() => {
												setSelectedImageIndex(index);
												setDisplayMode('image');
											}}
											className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
												displayMode === 'image' && selectedImageIndex === index
													? 'border-purple-600 shadow-lg scale-105'
													: 'border-gray-200 hover:border-purple-300'
											}`}
										>
											<img
												src={image.url}
												alt={image.name}
												className="w-full h-full object-cover"
											/>
										</button>
									))}
									
									{/* PDF Documents */}
									{pdfDocuments.map((pdf, index) => (
										<button
											key={`pdf-${pdf.id}`}
											onClick={() => {
												setSelectedPdfIndex(index);
												setDisplayMode('pdf');
											}}
											className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
												displayMode === 'pdf' && selectedPdfIndex === index
													? 'border-blue-600 shadow-lg scale-105'
													: 'border-gray-200 hover:border-blue-300'
											}`}
										>
											<div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
												<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
												</svg>
											</div>
											<div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs py-1 text-center font-semibold">
												PDF
											</div>
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Right Column - Product Specifications */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
								<h2 className="text-2xl font-bold text-gray-900 mb-2">
									{allImages[selectedImageIndex]?.name}
								</h2>
								<p className="text-gray-600 mb-6">
									{product.name} - {category.name}
								</p>

								{/* Specifications */}
								<div className="border-t border-gray-200 pt-6">
									<h3 className="text-lg font-bold text-gray-900 mb-4">Specifications</h3>
									<div className="space-y-3">
										{specifications.map((spec, index) => (
											<div key={index} className="flex justify-between py-2 border-b border-gray-100">
												<span className="text-sm font-medium text-gray-600">{spec.label}</span>
												<span className="text-sm font-semibold text-gray-900">{spec.value}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}
