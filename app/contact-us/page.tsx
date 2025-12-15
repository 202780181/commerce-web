"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Banner {
  id: number;
  image_url: string;
  title: string;
  content: string;
  sort: number;
  created_at: string;
  updated_at: string;
}

interface RecommendProduct {
  id: number;
  title: string;
  cover_url: string;
  category_id: number;
}

interface Social {
  id: number;
  platform: string;
  url: string;
  qr_code_url: string;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
}

interface ContactConfig {
  banners?: Banner[]; // Keeping optional for now or removal if confirmed unnecessary
  recommend_products?: RecommendProduct[]; // Keeping optional 
  product_title?: string;
  configs: {
    contact_address: string;
    contact_email: string;
    contact_phone: string;
  };
  socials: Social[];
}

export default function ContactUs() {
	const [config, setConfig] = useState<ContactConfig | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch basic config
		const fetchConfig = async () => {
			try {
				const response = await fetch('/api/proxy/portal/config/basic');
				if (response.ok) {
					const result = await response.json();
					if (result.code === 0 && result.data) {
						setConfig(result.data);
					}
				}
			} catch (error) {
				console.error('Failed to fetch config:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchConfig();

		// 检查URL中是否有hash，如果有则滚动到对应位置
		if (window.location.hash === '#contact-info') {
			setTimeout(() => {
				const element = document.getElementById('contact-info');
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}
			}, 100);
		}
	}, []);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Hero Section */}
			<section className="relative h-[50vh] min-h-[400px] bg-black overflow-hidden">
				{/* Background Image */}
				<div className="absolute inset-0">
					<img
						src={config?.banners?.[0]?.image_url || "/images/products/optimatia-landing-hero.webp"}
						alt="Background"
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Star Pattern Overlay */}
				<div className="absolute inset-0">
					<img
						src="/images/products/footer-star-img.svg"
						alt="Stars"
						className="w-full h-full"
						style={{
							objectFit: 'none',
							objectPosition: 'center',
							transform: 'scale(1)'
						}}
					/>
				</div>

				{/* Content */}
				<div className="relative h-full flex flex-col items-center justify-center text-center px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="mb-4"
					>
						<h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
							{config?.banners?.[0]?.title || "CONTACT US"}
						</h1>
            {config?.banners?.[0]?.content && (
              <p className="text-xl text-gray-200 mt-4 max-w-2xl mx-auto">
                {config.banners[0].content}
              </p>
            )}
						<div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full" />
					</motion.div>

					{/* Breadcrumb */}
					<motion.nav
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="flex items-center gap-2 text-gray-300 text-sm"
					>
						<a href="/" className="hover:text-white transition-colors">
							Home
						</a>
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
						<span className="text-white">CONTACT US</span>
					</motion.nav>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-20 px-6">
				<div className="max-w-[1600px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
						{/* Sidebar */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="lg:col-span-3"
						>
							<div className="bg-slate-800 text-white rounded-lg overflow-hidden sticky top-24">
								<div className="p-6">
									<h2 className="text-xl font-bold mb-6">CONTACT US</h2>
									<div className="space-y-4">
										<button className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-300 font-medium">
											CONTACT US
										</button>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Contact Form & Info */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="lg:col-span-9"
						>
							<div className="bg-white rounded-xl shadow-lg overflow-hidden">
								{/* Header */}
								<div className="border-b border-gray-200 p-10">
									<h2 className="text-3xl font-bold text-gray-900 mb-2">
										CONTACT US
									</h2>
									<div className="h-1 w-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
								</div>

								{/* Google Maps Embed */}
								<motion.div
									className="relative h-[500px] bg-gray-100 overflow-hidden"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 1, delay: 0.5 }}
								>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.375265280759!2d113.63879507577838!3d23.15649997908008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34030eeb1dec9c73%3A0xb6a4a7a48549d89e!2z5Lit5Zu95bm_5Lic55yB5bm_5bee5biC5aKe5Z-O5Yy66YK155m96LevNOWPtyDpgq7mlL_nvJbnoIE6IDUxMTMzOA!5e0!3m2!1szh-CN!2s!4v1761803114452!5m2!1szh-CN!2s"
										width="100%"
										height="100%"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
										title="Google Maps Location"
										className="absolute inset-0"
									/>
								</motion.div>

								{/* Contact Info Cards */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10" id="contact-info">
									{/* Phone */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.6 }}
										whileHover={{ y: -5, transition: { duration: 0.2 } }}
										className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
									>
										<motion.div
											whileHover={{ scale: 1.1, rotate: 5 }}
											transition={{ duration: 0.3 }}
											className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
										>
											<svg
												className="w-7 h-7 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
												/>
											</svg>
										</motion.div>
										<h3 className="text-sm font-semibold text-gray-700 mb-2">
											Contact phone
										</h3>
										<p className="text-gray-900 font-medium">
                      {config?.configs?.contact_phone || "+86 15915853159"}
                    </p>
									</motion.div>

									{/* Email */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.7 }}
										whileHover={{ y: -5, transition: { duration: 0.2 } }}
										className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg"
									>
										<motion.div
											whileHover={{ scale: 1.1, rotate: -5 }}
											transition={{ duration: 0.3 }}
											className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
										>
											<svg
												className="w-7 h-7 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</motion.div>
										<h3 className="text-sm font-semibold text-gray-700 mb-2">
											Contact email
										</h3>
										<p className="text-gray-900 font-medium">
                      {config?.configs?.contact_email || "mkdch@126.com"}
                    </p>
									</motion.div>

									{/* Address */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.8 }}
										whileHover={{ y: -5, transition: { duration: 0.2 } }}
										className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 text-center border border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg"
									>
										<motion.div
											whileHover={{ scale: 1.1, rotate: 5 }}
											transition={{ duration: 0.3 }}
											className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
										>
											<svg
												className="w-7 h-7 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
										</motion.div>
										<h3 className="text-sm font-semibold text-gray-700 mb-2">
											Contact address
										</h3>
										<p className="text-gray-900 font-medium text-sm leading-relaxed">
											{config?.configs?.contact_address || "1-2/F, Building A2, No. 4, Shaobai Road, Shangshao Village, Xintang Town, Zengcheng District, Guangzhou,Guangdong Province,China"}
										</p>
									</motion.div>
								</div>

								{/* QR Code Section */}
								<div className="px-10 pb-10">
									<div className="border-t border-gray-200 pt-10">
										<h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
											Connect With Us
										</h3>
										<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {config?.socials?.map((social, index) => (
                        <motion.div
                          key={social.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                          whileHover={social.url ? { y: -5, scale: 1.02 } : {}}
                          className={`bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 text-center border border-gray-100 transition-all duration-300 ${
                            social.url 
                              ? "hover:border-gray-300 hover:shadow-lg cursor-pointer" 
                              : "cursor-default"
                          }`}
                          onClick={() => {
                            if (social.url) window.open(social.url, '_blank');
                          }}
                        >
                          <div className="w-full aspect-square bg-white rounded-lg p-3 mb-4 shadow-sm relative group">
                            <img
                              src={social.qr_code_url}
                              alt={`${social.platform} QR Code`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h4 className="text-sm font-semibold text-gray-700">{social.platform}</h4>
                        </motion.div>
                      ))}
                    </div>
									</div>
								</div>
							</div>

							{/* Recommended Products */}
							{config?.recommend_products && config.recommend_products.length > 0 && (
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									className="mt-10"
								>
									<h2 className="text-2xl font-bold text-gray-900 mb-6">
										{config.product_title || "Recommended Products"}
									</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										{config.recommend_products.map((product) => (
											<a
												key={product.id}
												href={`/products/${product.id}`}
												className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all block"
											>
												<div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
													<img
														src={product.cover_url}
														alt={product.title}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
													/>
												</div>
												<div className="p-4">
													<h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
														{product.title}
													</h3>
												</div>
											</a>
										))}
									</div>
								</motion.div>
							)}
						</motion.div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

