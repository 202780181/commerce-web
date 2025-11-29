"use client";

import { motion } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePageCache } from "../hooks/usePageCache";

// Download files data
const downloadFiles = [
	{
		id: 1,
		title: "ZPPCNC Zero Point Clamping 2026",
		size: "12.49MB",
		date: "	2025-11-28 10:01:35",
		type: "PDF",
		description: "ZPPCNC Zero Point Clamping 2026",
		url: "https://cdn.gzxfjxyxgs.com/download/ZPPCNC%20Zero%20Point%20Clamping%202026%281%29.pdf"
	},
];

export default function Download() {
	// 保留页面滚动位置
	usePageCache();

	const handleDownload = (url: string) => {
		// 直接使用原始 URL 下载
		window.location.href = url;
	};

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header lightBackground={true} />

			<div className="flex-1 flex flex-col">
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
								Product Download
							</h1>
						</motion.div>
					</div>
				</section>

				{/* Breadcrumb */}
				<div className="py-6 px-6 bg-white border-b">
					<div className="max-w-[1600px] mx-auto">
						<div className="flex items-center gap-2 text-sm text-gray-600">
							<a href="/" className="hover:text-purple-600 transition-colors">Home</a>
							<span>{'>'}</span>
							<span className="text-gray-900 font-semibold">DOWNLOAD</span>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="py-12 px-6 bg-gray-50 flex-1">
					<div className="max-w-[1600px] mx-auto h-full">
						<div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 h-full">
							{/* Sidebar */}
							<aside>
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6 }}
									className="bg-[#1e3a5f] text-white p-6 rounded-lg sticky top-24"
								>
									<h2 className="text-xl font-bold">DOWNLOAD</h2>
								</motion.div>
							</aside>

							{/* Content Area */}
							<main className="flex flex-col">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6 }}
									className="bg-white rounded-lg shadow-sm flex-1 flex flex-col"
								>
									{/* Header */}
									<div className="border-b px-8 py-6">
										<h1 className="text-3xl font-bold text-gray-900">DOWNLOAD</h1>
									</div>

									{/* Download List */}
									<div className="divide-y">
										{downloadFiles.map((file, index) => (
											<motion.div
												key={file.id}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5, delay: index * 0.1 }}
												className="px-8 py-6 hover:bg-gray-50 transition-colors"
											>
												<div className="flex items-center justify-between gap-6">
													{/* Left: Icon and Info */}
													<div className="flex items-center gap-4 flex-1">
														{/* File Icon */}
														<div className="flex-shrink-0">
															<svg
																className="w-10 h-10 text-gray-600"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
																/>
															</svg>
														</div>

														{/* File Details */}
														<div className="flex-1">
															<h3 className="text-lg font-semibold text-gray-900 mb-1">
																{file.title}
															</h3>
															<div className="flex items-center gap-4 text-sm text-gray-500">
																<span>size: {file.size}</span>
																<span>{file.date}</span>
															</div>
														</div>
													</div>

													{/* Right: Download Button */}
													<div className="flex-shrink-0">
														<motion.button
															onClick={() => handleDownload(file.url)}
															whileHover={{ scale: 1.05 }}
															whileTap={{ scale: 0.95 }}
															className="inline-block px-8 py-2.5 bg-[#1e3a5f] text-white font-semibold rounded hover:bg-[#2d4a6f] transition-colors cursor-pointer"
														>
															Download
														</motion.button>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</motion.div>
							</main>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
