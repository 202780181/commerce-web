"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePageCache } from "../hooks/usePageCache";
import { AlertTriangle } from "lucide-react";
import FolderIcon from "../components/FolderIcon";

// Download file interface
interface DownloadFile {
	id: number;
	name: string;
	desc: string;
	oss_url: string;
	size: number;
	format: string;
	uploaded_at: string;
	sort: number;
	enabled: number;
	created_at: string;
	updated_at: string;
}

export default function Download() {
	// 保留页面滚动位置
	usePageCache();
	
	const [downloadFiles, setDownloadFiles] = useState<DownloadFile[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDownloads = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/proxy/portal/downloads');
				if (!response.ok) throw new Error('Failed to fetch downloads');
				
				const data = await response.json();
				console.log('[Download] Downloads data:', data);
				
				if (data.code === 0 && data.data) {
					setDownloadFiles(data.data);
				} else {
					throw new Error(data.msg || 'Failed to load downloads');
				}
			} catch (error) {
				console.error('[Download] Error fetching downloads:', error);
				setError('Failed to load downloads. Please try again later.');
			} finally {
				setLoading(false);
			}
		};
		
		fetchDownloads();
	}, []);

	const handleDownload = (url: string) => {
		// 直接使用原始 URL 下载
		window.open(url, '_blank');
	};

	// 格式化文件大小
	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	};

	// 格式化日期
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col bg-white">
				<Header lightBackground={true} />
				<div className="flex-1 flex items-center justify-center pt-[72px]">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
				</div>
				<Footer />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex flex-col bg-white">
				<Header lightBackground={true} />
				<div className="flex-1 flex items-center justify-center pt-[72px]">
					<div className="text-center">
						<AlertTriangle className="text-red-500 w-24 h-24 mx-auto mb-4" />
						<h2 className="text-3xl font-bold text-gray-900 mb-2">Error</h2>
						<p className="text-gray-600">{error}</p>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header lightBackground={true} />

			<div className="flex-1 flex flex-col">
				{/* Hero Section */}
				<section className="relative pt-32 pb-16 px-6 bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50">
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
										{downloadFiles.length > 0 ? (
											downloadFiles.map((file, index) => (
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
															<div className="shrink-0">
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
																{file.name}
															</h3>
															{file.desc && (
																<p className="text-sm text-gray-600 mb-2">{file.desc}</p>
															)}
															<div className="flex items-center gap-4 text-sm text-gray-500">
																<span>Type: {file.format}</span>
																<span>Size: {formatFileSize(file.size)}</span>
																<span>Uploaded: {formatDate(file.uploaded_at)}</span>
															</div>
														</div>
														</div>

														{/* Right: Download Button */}
														<div className="shrink-0">
															<motion.button
																onClick={() => handleDownload(file.oss_url)}
																whileHover={{ scale: 1.05 }}
																whileTap={{ scale: 0.95 }}
																className="inline-block px-8 py-2.5 bg-[#1e3a5f] text-white font-semibold rounded hover:bg-[#2d4a6f] transition-colors cursor-pointer"
															>
																Download
															</motion.button>
														</div>
													</div>
												</motion.div>
											))
										) : (
											<div className="px-8 py-12 text-center">
												<FolderIcon className="w-24 h-24 mx-auto mb-4" />
												<h3 className="text-xl font-semibold text-gray-900 mb-2">No Downloads Available</h3>
												<p className="text-gray-600">Check back later for downloadable files.</p>
											</div>
										)}
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
