"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getArticleBySlug, getRelatedArticles } from "../../lib/articles";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "../../components/MDXComponents";

// Placeholder component for articles without MDX files
function ArticlePlaceholder() {
	return (
		<div className="text-center py-12">
			<div className="text-6xl mb-6">📝</div>
			<h2 className="text-3xl font-bold text-gray-900 mb-4">Article Content Coming Soon</h2>
			<p className="text-xl text-gray-600 mb-6">
				This article is being prepared and will be available soon.
			</p>
			<p className="text-gray-500">
				In the meantime, you can check out other articles or return to the news page.
			</p>
		</div>
	);
}

export default function ArticlePage() {
	const params = useParams();
	const slug = params.slug as string;
	const article = getArticleBySlug(slug);
	const relatedArticles = getRelatedArticles(slug, 3);
	const [ArticleContent, setArticleContent] = useState<any>(null);

	useEffect(() => {
		// Dynamically import the MDX content
		import(`../articles/${slug}.mdx`)
			.then((mod) => {
				setArticleContent(() => mod.default);
			})
			.catch(() => {
				// Article MDX file doesn't exist yet, show placeholder
				setArticleContent(() => ArticlePlaceholder);
			});
	}, [slug]);

	if (!article) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<Header lightBackground={true} />
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
					<p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
					<Link
						href="/news"
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
					>
						Back to News
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<Header lightBackground={true} />

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					/>
				</div>

				<div className="max-w-5xl mx-auto relative">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						{/* Breadcrumb */}
						<nav className="flex items-center gap-2 text-sm text-gray-300 mb-10">
							<Link href="/" className="hover:text-white transition-colors">
								Home
							</Link>
							<span>/</span>
							<Link href="/news" className="hover:text-white transition-colors">
								News
							</Link>
							<span>/</span>
							<span className="text-white">{article.category}</span>
						</nav>

						{/* Category Badge */}
						<div className="mb-8">
							<span className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-full">
								{article.tag}
							</span>
						</div>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
							{article.title}
						</h1>

						{/* Meta Info */}
						<div className="flex flex-wrap items-center gap-6 text-gray-300">
							<div className="flex items-center gap-2">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
								<span>{article.author}</span>
							</div>
							<div className="flex items-center gap-2">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<span>{article.date}</span>
							</div>
							<div className="flex items-center gap-2">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>{article.readTime}</span>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Featured Image */}
			<section className="px-6 mb-20 mt-12">
				<div className="max-w-5xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="rounded-2xl overflow-hidden shadow-2xl bg-gray-50"
					>
						<img
							src={article.image}
							alt={article.title}
							className="w-full h-auto object-contain"
						/>
					</motion.div>
				</div>
			</section>

			{/* Article Content */}
			<section className="px-6 pb-20 bg-white">
				<div className="max-w-5xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className="prose prose-lg max-w-none
              prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight
              prose-h1:text-[1.875rem] prose-h1:leading-[2.25rem] prose-h1:text-slate-900 prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-0 prose-h1:pb-0
              first:prose-h1:hidden
              prose-p:first-of-type:text-[1.125rem] prose-p:first-of-type:leading-[1.7] prose-p:first-of-type:text-slate-600 prose-p:first-of-type:mt-0 prose-p:first-of-type:mb-8
              prose-h2:text-[1.5rem] prose-h2:leading-[1.4] prose-h2:text-slate-900 prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-0
              prose-h3:text-[1.25rem] prose-h3:leading-[1.5] prose-h3:text-slate-900 prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-h4:text-[1.125rem] prose-h4:leading-[1.5] prose-h4:text-slate-900 prose-h4:font-medium prose-h4:mt-6 prose-h4:mb-2
              prose-h5:text-[1rem] prose-h5:leading-[1.6] prose-h5:text-slate-700 prose-h5:font-medium prose-h5:mt-6 prose-h5:mb-2 prose-h5:uppercase prose-h5:tracking-wide prose-h5:text-sm
              prose-p:text-[1rem] prose-p:leading-[1.75] prose-p:text-slate-600 prose-p:mb-4 prose-p:mt-0
              prose-a:text-purple-600 prose-a:font-medium prose-a:no-underline prose-a:transition-all hover:prose-a:text-purple-700 prose-a:decoration-purple-300 prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:underline
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-em:text-slate-700
              prose-code:text-[0.875em] prose-code:font-mono prose-code:font-medium prose-code:bg-slate-100 prose-code:text-purple-700 prose-code:px-[0.35em] prose-code:py-[0.15em] prose-code:rounded-md prose-code:before:content-[''] prose-code:after:content-[''] prose-code:border prose-code:border-slate-200
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-pre:shadow-xl prose-pre:my-6 prose-pre:overflow-x-auto prose-pre:text-[0.875rem] prose-pre:leading-[1.6]
              prose-pre>code:bg-transparent prose-pre>code:border-0 prose-pre>code:p-0 prose-pre>code:text-slate-50
              prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:border-l-[3px] prose-blockquote:border-purple-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-purple-50 prose-blockquote:to-transparent prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-700
              prose-ul:my-6 prose-ul:list-none prose-ul:pl-0
              prose-ol:my-6 prose-ol:pl-0
              prose-li:relative prose-li:pl-7 prose-li:my-3 prose-li:text-[1.0625rem] prose-li:leading-[1.75] prose-li:text-slate-700
              prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.6em] prose-li:before:w-1.5 prose-li:before:h-1.5 prose-li:before:rounded-full prose-li:before:bg-purple-500
              prose-ol>li:before:content-[counter(list-item)] prose-ol>li:before:absolute prose-ol>li:before:left-0 prose-ol>li:before:top-0 prose-ol>li:before:w-auto prose-ol>li:before:h-auto prose-ol>li:before:rounded-none prose-ol>li:before:bg-transparent prose-ol>li:before:text-purple-600 prose-ol>li:before:font-semibold prose-ol>li:before:text-sm
              prose-table:w-full prose-table:border-collapse prose-table:text-sm prose-table:my-8 prose-table:shadow-sm prose-table:rounded-xl prose-table:overflow-hidden
              prose-thead:bg-slate-50 prose-thead:border-b prose-thead:border-slate-200
              prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-slate-900 prose-th:text-sm prose-th:border-r prose-th:border-slate-200 prose-th:last:border-r-0
              prose-tbody:divide-y prose-tbody:divide-slate-200
              prose-td:px-4 prose-td:py-3 prose-td:text-slate-700 prose-td:border-r prose-td:border-slate-200 prose-td:last:border-r-0
              prose-tr:transition-colors hover:prose-tr:bg-slate-50
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:border prose-img:border-slate-200
              prose-hr:border-slate-200 prose-hr:my-12"
					>
						<MDXProvider components={MDXComponents}>
							{ArticleContent ? <ArticleContent /> : (
								<div className="flex items-center justify-center py-20">
									<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
								</div>
							)}
						</MDXProvider>
					</motion.div>

					{/* Share Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="mt-12 pt-8 border-t border-gray-200"
					>
						<h3 className="text-xl font-bold text-gray-900 mb-4">Share this article</h3>
						<div className="flex gap-4">
							<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
								Facebook
							</button>
							<button className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
								</svg>
								Twitter
							</button>
							<button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
								LinkedIn
							</button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Related Articles */}
			{relatedArticles.length > 0 && (
				<section className="py-20 px-6 bg-gray-50">
					<div className="max-w-7xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="text-center mb-12"
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-4">Related Articles</h2>
							<p className="text-xl text-gray-600">Continue exploring similar topics</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{relatedArticles.map((related, index) => (
								<motion.article
									key={related.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{ y: -10, transition: { duration: 0.3 } }}
								>
									<Link href={`/news/${related.slug}`}>
										<div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group">
											<div className="relative h-48 overflow-hidden">
												<img
													src={related.image}
													alt={related.title}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
												/>
												<div className="absolute top-4 left-4">
													<span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
														{related.tag}
													</span>
												</div>
											</div>
											<div className="p-6">
												<span className="text-purple-600 font-semibold text-xs uppercase tracking-wide">
													{related.category}
												</span>
												<h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
													{related.title}
												</h3>
												<p className="text-gray-600 text-sm mb-4 line-clamp-3">
													{related.excerpt}
												</p>
												<div className="flex items-center justify-between text-sm">
													<span className="text-gray-500">{related.date}</span>
													<span className="text-purple-600 font-semibold flex items-center gap-1">
														Read More
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M9 5l7 7-7 7"
															/>
														</svg>
													</span>
												</div>
											</div>
										</div>
									</Link>
								</motion.article>
							))}
						</div>

						<div className="text-center mt-12">
							<Link
								href="/news"
								className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
							>
								View All Articles
							</Link>
						</div>
					</div>
				</section>
			)}

			<Footer />
		</div>
	);
}

