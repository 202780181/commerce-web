// Article metadata type
export interface ArticleMeta {
	id: number;
	slug: string;
	title: string;
	category: string;
	categorySlug: string;
	date: string;
	image: string;
	excerpt: string;
	tag: string;
	featured?: boolean;
	author?: string;
	readTime?: string;
}

// All articles metadata
export const articlesData: ArticleMeta[] = [
	{
		id: 1,
		slug: "getting-started-guide",
		title: "Getting Started with E-commerce Success",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 28, 2025",
		image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
		excerpt: "A comprehensive guide to launching and scaling your e-commerce business. Learn essential strategies, avoid common mistakes, and achieve success.",
		tag: "Getting Started",
		featured: true,
		author: "Emma Rodriguez",
		readTime: "12 min read",
	},
	{
		id: 2,
		slug: "retail-window-display-ideas",
		title: "20 Retail Window Display Ideas to Boost Sales",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
		excerpt: "Window displays are the first step to attract customers into your store. Great window design can significantly boost store sales.",
		tag: "Retail",
		author: "Sarah Johnson",
		readTime: "5 min read",
	},
	{
		id: 3,
		slug: "kylie-jenner-pop-up-store",
		title: "Kylie Jenner Beauty Pop-Up Store: How E-commerce Brands Create Offline Experiences",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
		excerpt: "Explore how e-commerce brands can create unique offline experiences through pop-up stores to enhance brand awareness.",
		tag: "Getting Started",
		author: "Michael Chen",
		readTime: "7 min read",
	},
	{
		id: 4,
		slug: "brand-design-case-studies",
		title: "12 Excellent Brand Design Case Studies",
		category: "Marketing Guide",
		categorySlug: "marketing",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
		excerpt: "From color schemes to typography, analyzing the design secrets of 12 successful brands.",
		tag: "Marketing Guide",
		author: "Emily Rodriguez",
		readTime: "10 min read",
	},
	{
		id: 5,
		slug: "shopify-protect-fraud-prevention",
		title: "Fight Fraud! Shopify Protect Helps You Fight Back with Free Fraud Protection",
		category: "Platform Updates",
		categorySlug: "platform",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
		excerpt: "Learn how to use Shopify Protect to safeguard your business from fraudulent transactions.",
		tag: "Platform Updates",
		author: "David Kim",
		readTime: "6 min read",
	},
	{
		id: 6,
		slug: "website-monetization-strategies",
		title: "Website Monetization: 10 Smart Strategies",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
		excerpt: "Explore various website monetization models and find the best business strategy for you.",
		tag: "Getting Started",
		author: "Jessica Lee",
		readTime: "8 min read",
	},
	{
		id: 7,
		slug: "ecommerce-insights-2026",
		title: "E-commerce Insights: Key Metrics, Analysis and Trends (2026)",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
		excerpt: "Master e-commerce key metrics and drive business growth with data.",
		tag: "Getting Started",
		author: "Robert Martinez",
		readTime: "12 min read",
	},
	{
		id: 8,
		slug: "b-corp-certification-guide",
		title: "What is B Corp Certification? How to Apply? (2026)",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
		excerpt: "Understand the value of B Corp certification and the complete application process.",
		tag: "Getting Started",
		author: "Amanda Wilson",
		readTime: "9 min read",
	},
	{
		id: 9,
		slug: "llc-vs-s-corporation",
		title: "LLC vs S Corporation: How to Choose?",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
		excerpt: "Compare the pros and cons of two corporate structures and choose the best form for your business.",
		tag: "Getting Started",
		author: "Thomas Anderson",
		readTime: "7 min read",
	},
	{
		id: 10,
		slug: "personal-brand-statement-guide",
		title: "How to Write a Personal Brand Statement? (With Examples)",
		category: "Marketing Guide",
		categorySlug: "marketing",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
		excerpt: "Learn how to create a compelling personal brand statement that showcases your unique value.",
		tag: "Marketing Guide",
		author: "Sophia Taylor",
		readTime: "6 min read",
	},
	{
		id: 11,
		slug: "customer-retention-rate-guide",
		title: "Customer Retention Rate Guide: Calculation Methods, Industry Averages & Improvement Strategies",
		category: "Marketing Guide",
		categorySlug: "marketing",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
		excerpt: "Improve customer retention rates, reduce customer acquisition costs, and achieve sustainable growth.",
		tag: "Marketing Guide",
		author: "Christopher Brown",
		readTime: "11 min read",
	},
	{
		id: 12,
		slug: "tech-business-ideas-2026",
		title: "10 Profitable Tech Business Ideas for 2026: Tech Startup Guide",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
		excerpt: "Discover the most promising tech business opportunities and seize entrepreneurial opportunities.",
		tag: "Getting Started",
		author: "Daniel White",
		readTime: "10 min read",
	},
	{
		id: 13,
		slug: "3d-product-rendering-guide",
		title: "What is 3D Product Rendering? How to Use It for E-commerce?",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
		excerpt: "Use 3D rendering technology to enhance product displays and improve conversion rates.",
		tag: "Getting Started",
		author: "Olivia Harris",
		readTime: "8 min read",
	},
	{
		id: 14,
		slug: "ecommerce-pros-and-cons",
		title: "E-commerce Pros and Cons: Which Businesses and Entrepreneurs is it Suitable For?",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
		excerpt: "Fully understand the advantages and challenges of e-commerce and make informed business decisions.",
		tag: "Getting Started",
		author: "James Thompson",
		readTime: "7 min read",
	},
	{
		id: 15,
		slug: "sba-loan-guide",
		title: "What is SBA Loan? How to Apply?",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
		excerpt: "Understand the Small Business Administration loan program and get financial support for your business.",
		tag: "Getting Started",
		author: "Isabella Garcia",
		readTime: "9 min read",
	},
	{
		id: 15,
		slug: "market-research-tools",
		title: "8 Practical Market Research Tools",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
		excerpt: "Use professional tools to gain deep insights into markets and competitors, and develop better strategies.",
		tag: "Getting Started",
		author: "Matthew Davis",
		readTime: "6 min read",
	},
	{
		id: 16,
		slug: "tiktok-vs-youtube",
		title: "TikTok or YouTube, Which One Should You Choose?",
		category: "Marketing Guide",
		categorySlug: "marketing",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
		excerpt: "Compare the features of the two major video platforms and choose the best marketing channel for your brand.",
		tag: "Marketing Guide",
		author: "Ava Martinez",
		readTime: "8 min read",
	},
	{
		id: 17,
		slug: "facebook-dropshipping-guide",
		title: "Cross-border Dropshipping Guide: How to Do Facebook Dropshipping?",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
		excerpt: "Start an e-commerce business with zero inventory and implement dropshipping model with Facebook.",
		tag: "Getting Started",
		author: "Ethan Robinson",
		readTime: "10 min read",
	},
	{
		id: 18,
		slug: "chatgpt-guide",
		title: "What is ChatGPT? How to Use ChatGPT?",
		category: "Getting Started",
		categorySlug: "beginner",
		date: "October 27, 2025",
		image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
		excerpt: "Explore the application of AI tools in e-commerce and improve work efficiency.",
		tag: "Getting Started",
		author: "Mia Clark",
		readTime: "7 min read",
	},
];

// Get article by slug
export function getArticleBySlug(slug: string): ArticleMeta | undefined {
	return articlesData.find((article) => article.slug === slug);
}

// Get all article slugs (for static generation)
export function getAllArticleSlugs(): string[] {
	return articlesData.map((article) => article.slug);
}

// Get related articles (same category, excluding current)
export function getRelatedArticles(currentSlug: string, limit: number = 3): ArticleMeta[] {
	const currentArticle = getArticleBySlug(currentSlug);
	if (!currentArticle) return [];

	return articlesData
		.filter(
			(article) =>
				article.slug !== currentSlug &&
				article.categorySlug === currentArticle.categorySlug
		)
		.slice(0, limit);
}

