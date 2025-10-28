"use client";

import { motion } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ContactUs() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Add form submission logic here
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Header lightBackground={false} />

			{/* Hero Section */}
			<section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0" style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}} />
				</div>

				{/* Animated gradient orbs */}
				<motion.div
					className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
					animate={{
						x: [0, 50, 0],
						y: [0, 30, 0],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
					animate={{
						x: [0, -50, 0],
						y: [0, -30, 0],
					}}
					transition={{
						duration: 12,
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
						className="mb-4"
					>
						<h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
							CONTACT US
						</h1>
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
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26833.226466817843!2d103.84082367567373!3d1.3053056530558937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b0d96aac6f%3A0xfca1ad52b1fa5313!2z6IuP5Li55Zue5pWZ5aCC!5e0!3m2!1szh-CN!2shk!4v1761660526408!5m2!1szh-CN!2shk"
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
								<div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
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
										<p className="text-gray-900 font-medium">0513-88888888</p>
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
										<p className="text-gray-900 font-medium">888888@xx.com</p>
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
											No. 58, Chongchuan Road, Nantong City, Jiangsu Province
										</p>
									</motion.div>
								</div>

								{/* Contact Form */}
								<div className="px-10 pb-10">
									<div className="border-t border-gray-200 pt-10">
										<h3 className="text-2xl font-bold text-gray-900 mb-6">
											Send us a message
										</h3>
										<form onSubmit={handleSubmit} className="space-y-6">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<motion.div
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.5, delay: 0.9 }}
												>
													<label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
														Your Name *
													</label>
													<input
														type="text"
														id="name"
														name="name"
														value={formData.name}
														onChange={handleChange}
														required
														className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
														placeholder="John Doe"
													/>
												</motion.div>

												<motion.div
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.5, delay: 0.9 }}
												>
													<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
														Email Address *
													</label>
													<input
														type="email"
														id="email"
														name="email"
														value={formData.email}
														onChange={handleChange}
														required
														className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
														placeholder="john@example.com"
													/>
												</motion.div>

												<motion.div
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.5, delay: 1 }}
												>
													<label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
														Phone Number
													</label>
													<input
														type="tel"
														id="phone"
														name="phone"
														value={formData.phone}
														onChange={handleChange}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
														placeholder="+1 (555) 123-4567"
													/>
												</motion.div>

												<motion.div
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.5, delay: 1 }}
												>
													<label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
														Company
													</label>
													<input
														type="text"
														id="company"
														name="company"
														value={formData.company}
														onChange={handleChange}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
														placeholder="Your Company"
													/>
												</motion.div>
											</div>

											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5, delay: 1.1 }}
											>
												<label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
													Message *
												</label>
												<textarea
													id="message"
													name="message"
													value={formData.message}
													onChange={handleChange}
													required
													rows={6}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
													placeholder="Tell us about your project or inquiry..."
												/>
											</motion.div>

											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5, delay: 1.2 }}
											>
												<motion.button
													type="submit"
													whileHover={{
														scale: 1.02,
														boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
													}}
													whileTap={{ scale: 0.98 }}
													transition={{ duration: 0.2 }}
													className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
												>
													Send Message
												</motion.button>
											</motion.div>
										</form>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

