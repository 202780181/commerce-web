'use client';

import { ReactNode, useState } from 'react';

// Info/Warning/Tip callout boxes
interface CalloutProps {
	readonly type?: 'info' | 'warning' | 'tip' | 'success';
	readonly children: ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
	const styles = {
		info: {
			container: 'bg-blue-50 border-blue-200',
			icon: '💡',
			iconColor: 'text-blue-600',
		},
		warning: {
			container: 'bg-amber-50 border-amber-200',
			icon: '⚠️',
			iconColor: 'text-amber-600',
		},
		tip: {
			container: 'bg-green-50 border-green-200',
			icon: '✅',
			iconColor: 'text-green-600',
		},
		success: {
			container: 'bg-emerald-50 border-emerald-200',
			icon: '🎉',
			iconColor: 'text-emerald-600',
		},
	};

	const style = styles[type];

	return (
		<div className={`${style.container} border rounded-xl p-4 my-6 flex gap-3`}>
			<div className={`${style.iconColor} text-xl flex-shrink-0`}>
				{style.icon}
			</div>
			<div className="flex-1 text-slate-700 text-[0.9375rem] leading-relaxed">
				{children}
			</div>
		</div>
	);
}

// Code block with copy button
interface CodeBlockProps {
	readonly children: string;
	readonly className?: string;
	readonly tabs?: string[];
}

export function CodeBlock({ children, className, tabs }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const [activeTab, setActiveTab] = useState(0);

	const language = className?.replace('language-', '') || 'text';

	const copyToClipboard = () => {
		navigator.clipboard.writeText(children);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="relative group my-6">
			{tabs && tabs.length > 0 && (
				<div className="flex gap-1 bg-slate-800 pt-3 px-3 rounded-t-xl border border-slate-700 border-b-0">
					{tabs.map((tab, index) => (
						<button
							key={`tab-${tab}-${index}`}
							onClick={() => setActiveTab(index)}
							className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === index
								? 'bg-slate-900 text-white'
								: 'text-slate-400 hover:text-slate-200'
								}`}
						>
							{tab}
						</button>
					))}
				</div>
			)}
			<div className={`relative ${tabs ? 'rounded-t-none' : 'rounded-xl'} rounded-b-xl overflow-hidden`}>
				<div className="absolute right-3 top-3 z-10">
					<button
						onClick={copyToClipboard}
						className="px-3 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1.5"
					>
						{copied ? (
							<>
								<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								Copied
							</>
						) : (
							<>
								<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
								Copy
							</>
						)}
					</button>
				</div>
				<pre className={`bg-slate-900 border border-slate-800 p-4 overflow-x-auto text-sm leading-relaxed ${tabs ? 'rounded-t-none' : ''}`}>
					<code className={`language-${language} text-slate-50`}>{children}</code>
				</pre>
			</div>
		</div>
	);
}

// Step component
interface StepProps {
	readonly number: number;
	readonly title: string;
	readonly children: ReactNode;
}

export function Step({ number, title, children }: StepProps) {
	return (
		<div className="flex gap-4 mb-8">
			<div className="flex-shrink-0">
				<div className="w-8 h-8 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center text-sm">
					{number}
				</div>
			</div>
			<div className="flex-1 pt-0.5">
				<h3 className="text-xl font-semibold text-slate-900 mb-3 mt-0">{title}</h3>
				<div className="text-slate-700">{children}</div>
			</div>
		</div>
	);
}

// Tabs component
interface TabsProps {
	readonly items: string[];
	readonly children: ReactNode[];
}

export function Tabs({ items, children }: TabsProps) {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="my-6">
			<div className="flex gap-1 border-b border-slate-200">
				{items.map((item, index) => (
					<button
						key={`item-${item}-${index}`}
						onClick={() => setActiveTab(index)}
						className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === index
							? 'border-purple-600 text-purple-600'
							: 'border-transparent text-slate-600 hover:text-slate-900'
							}`}
					>
						{item}
					</button>
				))}
			</div>
			<div className="py-4">{children[activeTab]}</div>
		</div>
	);
}

// Card component
interface CardProps {
	readonly title?: string;
	readonly children: ReactNode;
	readonly icon?: string;
}

export function Card({ title, children, icon }: CardProps) {
	return (
		<div className="border border-slate-200 rounded-xl p-6 my-6 bg-white shadow-sm hover:shadow-md transition-shadow">
			{(title || icon) && (
				<div className="flex items-center gap-3 mb-4">
					{icon && <span className="text-2xl">{icon}</span>}
					{title && <h4 className="text-lg font-semibold text-slate-900 m-0">{title}</h4>}
				</div>
			)}
			<div className="text-slate-700">{children}</div>
		</div>
	);
}

// Accordion component
interface AccordionItemProps {
	readonly title: string;
	readonly children: ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border border-slate-200 rounded-lg mb-3 overflow-hidden">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
			>
				<span className="font-medium text-slate-900">{title}</span>
				<svg
					className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			{isOpen && (
				<div className="p-4 pt-0 bg-white border-t border-slate-100">
					<div className="text-slate-700">{children}</div>
				</div>
			)}
		</div>
	);
}

// Check/X marks for feature lists
export function Check() {
	return (
		<svg className="w-5 h-5 text-green-600 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
		</svg>
	);
}

export function Cross() {
	return (
		<svg className="w-5 h-5 text-red-600 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
		</svg>
	);
}

// Image with lightbox/zoom functionality
interface ImageProps {
	readonly src: string;
	readonly alt: string;
	readonly title?: string;
}

export function Image({ src, alt, title }: ImageProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleOpen();
		}
	};
	const handleModalKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			handleClose();
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={handleOpen}
				onKeyDown={handleKeyDown}
				className="border-0 p-0 bg-transparent cursor-zoom-in block w-full"
				aria-label={`View larger image: ${alt}`}
			>
				<img
					src={src}
					alt={alt}
					title={title}
					className="rounded-xl shadow-lg my-8 border border-slate-200 hover:shadow-xl transition-shadow w-full"
				/>
			</button>

			{isOpen && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label="Image viewer"
					className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
					onClick={handleClose}
					onKeyDown={handleModalKeyDown}
					tabIndex={-1}
				>
					<button
						onClick={handleClose}
						className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
						aria-label="Close image viewer"
					>
						<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div className="relative max-w-7xl max-h-full">
						<img
							src={src}
							alt={alt}
							className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
						/>
						{(alt || title) && (
							<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
								<p className="text-sm">{title || alt}</p>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

// Custom img component that wraps all images in MDX
function MDXImage(props: any) {
	return <Image {...props} />;
}

// Export all components
const MDXComponents = {
	Callout,
	CodeBlock,
	Step,
	Tabs,
	Card,
	AccordionItem,
	Check,
	Cross,
	Image,
	img: MDXImage, // Override default img tag
};

export default MDXComponents;

