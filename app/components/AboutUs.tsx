"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function AboutUs() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const router = useRouter();

	return (
		<section ref={ref} className="py-16 lg:py-24 bg-white">
			<div className="mx-auto px-6 lg:px-8" style={{ maxWidth: '1450px' }}>
				<div className="relative">
					<div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
						{/* Left side - Image */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="w-full lg:w-[48%]"
						>
							{/* Industrial machinery image */}
							<div className="w-full cursor-pointer" style={{ height: '590px' }} onClick={() => router.push('/products')}>
								<img
									src="/images/products/20251108184713.jpg"
									alt="Industrial steel manufacturing machinery"
									className="w-full h-full object-cover hover:opacity-90 transition-opacity"
								/>
							</div>
						</motion.div>

						{/* Right side - Content */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="w-full lg:w-[48%] space-y-6"
						>
							{/* Title */}
							<div>
								<h2
									className="block text-gray-900 mb-6"
									style={{
										fontSize: '40px',
										fontWeight: 'normal'
									}}
								>
									ABOUT US
								</h2>

								{/* Description */}
								<p
									className="text-gray-600 mb-8"
									style={{
										fontSize: '16px',
										fontFamily: 'Arial !important',
										width: '100%',
										lineHeight: '1.6',
										textAlign: 'justify'
									}}
								>
									Founded in 2012, the company is a manufacturing enterprise specializing in the R&D, production and sales of CNC fixtures. Relying on a professional R&D and design team as well as advanced manufacturing capabilities, it is committed to providing high-precision and high-reliability fixture solutions for global customers.
									Core Products and AdvantagesMain Products: Zero-point quick-change fixtures and self-centering vices, covering multiple models, specifications and modular combinations to meet the precision machining needs of customers in different industries.Product Features: Boasting fast positioning, high repeatability and strong stability,
									they are widely used in CNC machining centers and automated production lines, significantly improving production efficiency.Future Outlook
									The company will continue to invest in R&D, aligning product performance with European and American national standards. It will provide personalized design and production support based on customer needs, implement strict quality control to ensure product durability and consistency, and promote industrial manufacturing upgrading through intelligent fixture technology.
									The goal is to become a world-leading fixture system supplier and create greater value for customers.
								</p>

								{/* Read More Button */}
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => router.push('/about-us')}
									className="bg-slate-700 hover:bg-slate-800 text-white px-8 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer"
									style={{ height: '40px' }}
								>
									Read More
								</motion.button>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
