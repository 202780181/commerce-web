"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
	Phone,
	QrCode,
	User,
	ChevronUp
} from "lucide-react";

interface SidebarItem {
	id: string;
	icon: React.ReactNode;
	label: string;
	content: React.ReactNode;
	action?: () => void;
}

export default function FloatingSidebar() {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const [showTopButton, setShowTopButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// 当页面滚动超过300px时显示Top按钮
			setShowTopButton(window.scrollY > 300);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const sidebarItems: SidebarItem[] = [
		{
			id: 'phone',
			icon: <Phone size={24} />,
			label: 'Phone',
			content: (
				<div className="text-center">
					<p className="text-sm font-semibold mb-2">Contact Phone</p>
					<p className="text-lg font-bold text-blue-600">+86 15915853159</p>
					<p className="text-xs text-gray-500 mt-2">Mon-Fri 9:00-18:00</p>
				</div>
			)
		},
		{
			id: 'email',
			icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
				<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
			</svg>,
			label: 'Email',
			content: (
				<div className="text-center">
					<p className="text-sm font-semibold mb-2">Email Us</p>
					<a 
						href="mailto:mkdch@126.com"
						className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
					>
						mkdch@126.com
					</a>
					<p className="text-xs text-gray-500 mt-2">We'll reply within 24 hours</p>
				</div>
			)
		},
		{
			id: 'wechat',
			icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
				<path d="M8.5 3C4.358 3 1 5.948 1 9.6c0 2.004 1.053 3.793 2.707 4.997-.122.453-.453 1.657-.578 2.15-.055.22.085.434.308.434.123 0 .262-.055.385-.11l2.16-1.152c.646.164 1.348.262 2.073.262.358 0 .702-.027 1.046-.082-.055-.22-.083-.453-.083-.687 0-3.322 3.002-6.013 6.706-6.013.44 0 .866.041 1.278.11C16.258 5.683 12.756 3 8.5 3zm-.963 3.532c.508 0 .935.426.935.935s-.427.936-.935.936c-.509 0-.936-.427-.936-.936s.427-.935.936-.935zm-4.348 0c.509 0 .936.426.936.935s-.427.936-.936.936c-.508 0-.935-.427-.935-.936s.427-.935.935-.935zM16.723 11c-3.175 0-5.747 2.233-5.747 4.987s2.572 4.986 5.747 4.986c.495 0 .962-.055 1.43-.165l1.65.88c.096.055.22.11.33.11.193 0 .303-.166.303-.385-.11-.44-.385-1.485-.495-1.898C21.043 18.35 22 16.906 22 15.153c0-2.837-2.572-5.153-5.747-5.153h-.03zm-3.255 3.366c.385 0 .715.33.715.715s-.33.715-.715.715c-.385 0-.715-.33-.715-.715s.33-.715.715-.715zm4.621 0c.385 0 .715.33.715.715s-.33.715-.715.715c-.385 0-.715-.33-.715-.715s.33-.715.715-.715z" />
			</svg>,
			label: 'Wechat',
			content: (
				<div className="text-center">
					<p className="text-sm font-semibold mb-2">WeChat ID</p>
					<p className="text-lg font-bold text-green-600">Y15915853159</p>
					<p className="text-xs text-gray-500 mt-2">Add us on WeChat</p>
				</div>
			)
		},
		{
			id: 'customer',
			icon: <User size={24} />,
			label: 'Customer',
			content: (
				<div className="text-center">
					<p className="text-sm font-semibold mb-3">Customer Service</p>
					<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 mb-2 w-full">
						Live Chat
					</button>
					<button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 w-full">
						Leave Message
					</button>
					<p className="text-xs text-gray-500 mt-3">Online 24/7</p>
				</div>
			)
		},
		{
			id: 'top',
			icon: <ChevronUp size={24} />,
			label: 'Top',
			content: null,
			action: scrollToTop
		}
	];

	return (
		<div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
			{/* Sidebar */}
			<div className="bg-slate-700 rounded-l-xl shadow-2xl overflow-visible">
				{sidebarItems.map((item, index) => {
					// 如果是Top按钮，使用AnimatePresence处理动画
					if (item.id === 'top') {
						return (
							<AnimatePresence key={item.id}>
								{showTopButton && (
									<motion.div
										initial={{ opacity: 0, height: 0, scale: 0.8 }}
										animate={{ opacity: 1, height: 'auto', scale: 1 }}
										exit={{ opacity: 0, height: 0, scale: 0.8 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
										className="relative group overflow-hidden"
										onMouseEnter={() => setHoveredItem(item.id)}
										onMouseLeave={() => setHoveredItem(null)}
									>
										<motion.button
											onClick={item.action}
											className="w-16 h-16 flex flex-col items-center justify-center text-white hover:bg-slate-600 transition-all duration-300"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<div className="mb-1">{item.icon}</div>
											<span className="text-xs font-medium">{item.label}</span>
										</motion.button>

										{/* Popup Content for Top button */}
										<AnimatePresence>
											{hoveredItem === item.id && item.content && (
												<motion.div
													initial={{ opacity: 0, x: 10, scale: 0.95 }}
													animate={{ opacity: 1, x: 0, scale: 1 }}
													exit={{ opacity: 0, x: 10, scale: 0.95 }}
													transition={{ duration: 0.2 }}
													className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white rounded-lg shadow-2xl p-4 min-w-[200px] z-10"
												>
													{/* Arrow */}
													<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
														<div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
													</div>

													{item.content}
												</motion.div>
											)}
										</AnimatePresence>
									</motion.div>
								)}
							</AnimatePresence>
						);
					}

					return (
						<div
							key={item.id}
							className="relative group"
							onMouseEnter={() => setHoveredItem(item.id)}
							onMouseLeave={() => setHoveredItem(null)}
						>
							<motion.button
								onClick={item.action}
								className={`w-16 h-16 flex flex-col items-center justify-center text-white hover:bg-slate-600 transition-all duration-300 ${index < sidebarItems.length - 1 ? 'border-b border-slate-600' : ''
									}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<div className="mb-1">{item.icon}</div>
								<span className="text-xs font-medium">{item.label}</span>
							</motion.button>

							{/* Popup Content */}
							<AnimatePresence>
								{hoveredItem === item.id && item.content && (
									<motion.div
										initial={{ opacity: 0, x: 10, scale: 0.95 }}
										animate={{ opacity: 1, x: 0, scale: 1 }}
										exit={{ opacity: 0, x: 10, scale: 0.95 }}
										transition={{ duration: 0.2 }}
										className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white rounded-lg shadow-2xl p-4 min-w-[200px] z-10"
									>
										{/* Arrow */}
										<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
											<div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
										</div>

										{item.content}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>
		</div>
	);
}

