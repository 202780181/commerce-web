import { ProductDetailData } from "../components/ProductDetail";

// 产品数据库 - 在这里定义所有产品的详细信息
// 你可以通过产品ID获取对应的产品数据
export const productsDatabase: Record<string, ProductDetailData> = {
	// 产品 1: 草饲胶原蛋白
	"collagen-peptides": {
		name: "Grass-Fed Collagen Peptides",
		tagline: "Premium collagen for radiant skin, strong hair & healthy joints",
		category: "Collagen Supplements",
		price: 43.99,
		originalPrice: 59.99,
		rating: 4.8,
		reviewCount: 5979,
		badge: "BEST SELLER",
		mainImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
		galleryImages: [
			"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
			"https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80",
			"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
		],
		shortDescription: "Our premium grass-fed collagen peptides are sourced from pasture-raised cattle and designed to support healthy skin, hair, nails, and joints.",
		fullDescription: `Experience the transformative power of our Grass-Fed Collagen Peptides, carefully crafted to nourish your body from within.

Our collagen is sourced exclusively from grass-fed, pasture-raised cattle, ensuring the highest quality and purity. Each serving delivers 20g of Types I and III collagen peptides.`,
		highlights: [
			"20g of Types I & III collagen per serving",
			"Sourced from grass-fed, pasture-raised cattle",
			"No hormones, antibiotics, or GMOs",
			"Unflavored and easily dissolves in any liquid",
			"Supports skin, hair, nails, joints & gut health",
		],
		specs: [
			{ label: "Servings Per Container", value: "30" },
			{ label: "Serving Size", value: "2 scoops (20g)" },
			{ label: "Collagen Per Serving", value: "20g" },
		],
		howToUse: {
			title: "How to Use",
			steps: [
				"Add 1-2 scoops to your favorite beverage",
				"Stir until completely dissolved",
				"Consume daily for best results",
			],
		},
		faqs: [
			{
				question: "When will I see results?",
				answer: "Most customers notice improvements within 2-4 weeks of consistent daily use.",
			},
		],
	},

	// 产品 2: MCT 油粉
	"mct-oil-powder": {
		name: "MCT Oil Powder",
		tagline: "Clean energy from premium medium-chain triglycerides",
		category: "Energy & Performance",
		price: 40.99,
		rating: 4.7,
		reviewCount: 4500,
		badge: "POPULAR",
		mainImage: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80",
		galleryImages: [
			"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
			"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
		],
		shortDescription: "Premium MCT oil powder derived from 100% coconuts. Provides sustained energy, supports mental clarity, and helps maintain ketosis.",
		fullDescription: `Our MCT Oil Powder is the perfect addition to your daily routine for sustained energy and mental clarity.

Derived from 100% organic coconuts, our MCT powder contains C8 and C10 medium-chain triglycerides that are rapidly converted to ketones - your brain and body's preferred fuel source.

Benefits:
• Instant, sustained energy without crashes
• Enhanced mental focus and clarity
• Supports weight management goals
• Promotes ketone production
• Creamy texture for coffee and smoothies`,
		highlights: [
			"100% coconut-derived MCTs",
			"C8 & C10 for optimal ketone production",
			"No palm oil or fillers",
			"Creamy, froths easily in beverages",
			"Keto, Paleo, and Vegan friendly",
			"Non-GMO and gluten-free",
		],
		specs: [
			{ label: "Servings Per Container", value: "30" },
			{ label: "Serving Size", value: "1 scoop (14g)" },
			{ label: "MCTs Per Serving", value: "10g" },
			{ label: "Calories Per Serving", value: "100" },
			{ label: "Source", value: "100% Coconut" },
		],
		howToUse: {
			title: "How to Use",
			steps: [
				"Add 1 scoop to your morning coffee, tea, or smoothie",
				"Blend or froth for a creamy texture",
				"Use daily for sustained energy and mental clarity",
				"Start with a half scoop if new to MCTs",
			],
		},
		ingredients: {
			title: "Ingredients",
			content: `Ingredients: Medium Chain Triglycerides (from Coconut), Acacia Fiber, Sunflower Lecithin

100% Pure MCT Oil Powder
• C8 (Caprylic Acid): 60%
• C10 (Capric Acid): 40%
• No C6 or C12
• No palm oil
• Vegan-friendly`,
		},
		faqs: [
			{
				question: "What makes your MCT powder different?",
				answer: "Our MCT powder uses only C8 and C10 MCTs from coconuts, which are the most effective for energy and ketone production. We don't use palm oil or less effective C12.",
			},
			{
				question: "Will this break my fast?",
				answer: "MCT oil powder contains calories, so it will technically break a strict water fast. However, many people use it during intermittent fasting for sustained energy without spiking insulin.",
			},
		],
		theme: {
			primary: "amber",
			secondary: "orange",
		},
	},

	// 产品 3: 酮体补充剂
	"base-ketones": {
		name: "Base Ketones",
		tagline: "Pure exogenous ketones for instant energy and mental clarity",
		category: "Ketone Supplements",
		price: 42.99,
		rating: 4.8,
		reviewCount: 5034,
		badge: "BEST SELLER",
		mainImage: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800&q=80",
		galleryImages: [
			"https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=800&q=80",
			"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
		],
		shortDescription: "The cleanest exogenous ketones on the market. Elevate your ketone levels instantly for enhanced energy, focus, and performance.",
		fullDescription: `Base Ketones delivers pure exogenous ketones (BHB) to rapidly elevate your blood ketone levels.

Whether you're following a ketogenic diet, fasting, or simply looking for clean energy, Base Ketones provides the mental and physical boost you need.

Key Benefits:
• Instant ketone elevation within 30 minutes
• Enhanced mental clarity and focus
• Sustained energy without jitters
• Accelerate transition into ketosis
• Support athletic performance and recovery
• Reduce keto flu symptoms`,
		highlights: [
			"11.7g of BHB ketones per serving",
			"Rapidly absorbed for instant benefits",
			"No artificial sweeteners or colors",
			"Great-tasting natural flavors",
			"Supports mental and physical performance",
			"Perfect for keto, fasting, or pre-workout",
		],
		specs: [
			{ label: "Servings Per Container", value: "20" },
			{ label: "BHB Ketones Per Serving", value: "11.7g" },
			{ label: "Calories Per Serving", value: "50" },
			{ label: "Flavor Options", value: "Lemon, Berry, Unflavored" },
		],
		howToUse: {
			title: "How to Use",
			steps: [
				"Mix 1 scoop with 12-16oz of cold water",
				"Shake or stir until fully dissolved",
				"Consume 30 minutes before desired effect",
				"Use before workouts, during fasts, or for mental clarity",
			],
		},
		faqs: [
			{
				question: "Do I need to be on a keto diet to use this?",
				answer: "No! While Base Ketones work great with a ketogenic diet, anyone can benefit from the clean energy and mental clarity that ketones provide.",
			},
			{
				question: "How quickly will I feel the effects?",
				answer: "Most users feel the effects within 30-60 minutes. You'll experience enhanced focus, steady energy, and improved mental clarity.",
			},
		],
		theme: {
			primary: "blue",
			secondary: "cyan",
		},
	},

	// 产品 4: 电解质补充剂
	"daily-electrolytes": {
		name: "Daily Electrolytes",
		tagline: "Essential hydration support for active lifestyles",
		category: "Hydration & Electrolytes",
		price: 30.99,
		originalPrice: 37.99,
		rating: 4.9,
		reviewCount: 677,
		badge: "SALE",
		mainImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
		galleryImages: [
			"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
			"https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80",
		],
		shortDescription: "Comprehensive electrolyte formula with sodium, potassium, and magnesium. Stay hydrated, energized, and cramp-free all day.",
		fullDescription: `Daily Electrolytes is your complete hydration solution, specially formulated to replenish essential minerals lost through sweat, exercise, and daily activities.

Our balanced blend of sodium, potassium, and magnesium helps:
• Maintain optimal hydration
• Prevent muscle cramps
• Support energy production
• Enhance athletic performance
• Reduce fatigue

Perfect for keto dieters, athletes, and anyone living an active lifestyle.`,
		highlights: [
			"1000mg sodium for optimal hydration",
			"200mg potassium to prevent cramps",
			"120mg magnesium for muscle function",
			"Zero sugar and zero calories",
			"Delicious natural fruit flavors",
			"Keto and fasting friendly",
		],
		specs: [
			{ label: "Servings Per Container", value: "40" },
			{ label: "Sodium Per Serving", value: "1000mg" },
			{ label: "Potassium Per Serving", value: "200mg" },
			{ label: "Magnesium Per Serving", value: "120mg" },
			{ label: "Sugar", value: "0g" },
			{ label: "Calories", value: "0" },
		],
		howToUse: {
			title: "How to Use",
			steps: [
				"Mix 1 scoop with 16-20oz of cold water",
				"Drink upon waking, before/during workouts, or anytime you need hydration",
				"Use 1-2 servings daily depending on activity level",
				"Increase intake during hot weather or intense exercise",
			],
		},
		ingredients: {
			title: "Ingredients",
			content: `Ingredients: Sodium (as Pink Himalayan Salt), Potassium (as Potassium Citrate), Magnesium (as Magnesium Citrate), Natural Flavors, Stevia Leaf Extract, Citric Acid

No artificial colors or sweeteners
Sugar-free and calorie-free
Vegan and gluten-free`,
		},
		faqs: [
			{
				question: "Why do I need electrolytes on a keto diet?",
				answer: "When following a ketogenic diet, your body releases more water and electrolytes. Supplementing helps prevent keto flu symptoms and maintains optimal hydration.",
			},
			{
				question: "Can I drink this while fasting?",
				answer: "Yes! Our electrolytes contain zero calories and won't break your fast. They're perfect for staying hydrated during fasting periods.",
			},
		],
		relatedProducts: [
			{
				id: 1,
				name: "Base Ketones",
				price: 42.99,
				image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&q=80",
			},
			{
				id: 2,
				name: "MCT Oil Powder",
				price: 40.99,
				image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&q=80",
			},
		],
		theme: {
			primary: "emerald",
			secondary: "teal",
		},
	},

	// 机械产品系列
	"modular-combined-display": {
		name: "Modular Combined Display",
		tagline: "Advanced modular display system for versatile machining setups",
		category: "Display Systems",
		price: 1299.99,
		rating: 4.8,
		reviewCount: 156,
		badge: "BEST SELLER",
		mainImage: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/01%20Modular%20Combined%20Display/%E5%B0%81%E9%9D%A2/4Axis%20Single-Side%20L-Bracket%20Assembly.png",
		galleryImages: [
			"https://work-1251384833.cos.ap-singapore.myqcloud.com/products/01%20Modular%20Combined%20Display/%E5%B0%81%E9%9D%A2/4Axis%20Single-Side%20L-Bracket%20Assembly.png",
		],
		shortDescription: "Advanced modular display system with 4-axis single-side L-bracket assembly for versatile machining setups.",
		fullDescription: "Our Modular Combined Display system offers unparalleled flexibility for complex machining operations. Featuring precision-engineered components and robust construction.",
		highlights: [
			"4-axis single-side L-bracket assembly",
			"Modular design for versatile setups",
			"High-precision construction",
			"Compatible with various machining centers",
			"Easy setup and configuration",
		],
		specs: [
			{ label: "Material", value: "Hardened Steel" },
			{ label: "Precision", value: "±0.005mm" },
			{ label: "Max Load", value: "500kg" },
		],
		howToUse: {
			title: "Installation Guide",
			steps: [
				"Mount the base unit to your machine table",
				"Attach the L-bracket assembly",
				"Configure for your specific workpiece",
				"Perform precision alignment check",
			],
		},
		faqs: [
			{
				question: "What machines is this compatible with?",
				answer: "Compatible with most CNC machining centers and milling machines with standard T-slot tables.",
			},
		],
		theme: {
			primary: "blue",
			secondary: "indigo",
		},
	},

	"quick-release-jaws-vise": {
		name: "Quick Release Jaws Vise",
		tagline: "High-performance vise for rapid workpiece changeover",
		category: "Vise Systems",
		price: 899.99,
		rating: 4.7,
		reviewCount: 203,
		badge: "POPULAR",
		mainImage: "https://work-1251384833.cos.ap-singapore.myqcloud.com/products/02%20Quick%20Release%20Jaws%20Vise/%E5%B0%81%E9%9D%A2/HP10077%28Steel%20Jaw%29.png",
		galleryImages: [
			"https://work-1251384833.cos.ap-singapore.myqcloud.com/products/02%20Quick%20Release%20Jaws%20Vise/%E5%B0%81%E9%9D%A2/HP10077%28Steel%20Jaw%29.png",
		],
		shortDescription: "High-performance quick release vise with steel jaws for rapid workpiece changeover and secure clamping.",
		fullDescription: "Engineered for efficiency and precision, this quick release vise system dramatically reduces setup time while maintaining exceptional clamping force and accuracy.",
		highlights: [
			"Quick release mechanism",
			"Hardened steel jaws",
			"High clamping force",
			"Rapid workpiece changeover",
			"Precision ground surfaces",
		],
		specs: [
			{ label: "Jaw Width", value: "150mm" },
			{ label: "Opening", value: "200mm" },
			{ label: "Clamping Force", value: "25kN" },
		],
		howToUse: {
			title: "Operation Guide",
			steps: [
				"Position workpiece between jaws",
				"Engage quick release lever",
				"Apply appropriate clamping pressure",
				"Verify secure positioning before machining",
			],
		},
		faqs: [
			{
				question: "What is the maximum workpiece size?",
				answer: "Maximum workpiece width is 200mm with jaw opening fully extended.",
			},
		],
		theme: {
			primary: "green",
			secondary: "emerald",
		},
	},
};

// 获取单个产品数据的辅助函数
export function getProductById(id: string): ProductDetailData | null {
	return productsDatabase[id] || null;
}

// 获取所有产品ID列表
export function getAllProductIds(): string[] {
	return Object.keys(productsDatabase);
}

// 获取产品简要信息列表(用于产品列表页)
export function getProductSummaries() {
	return Object.entries(productsDatabase).map(([id, product]) => ({
		id,
		name: product.name,
		category: product.category,
		price: product.price,
		originalPrice: product.originalPrice,
		rating: product.rating,
		reviewCount: product.reviewCount,
		image: product.mainImage,
		badge: product.badge,
		shortDescription: product.shortDescription,
	}));
}

