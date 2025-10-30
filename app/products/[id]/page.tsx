"use client";

import { useParams } from "next/navigation";
import ProductDetail from "../../components/ProductDetail";
import { getProductById } from "../../lib/products";

export default function ProductDetailPage() {
	const params = useParams();
	const productId = params.id as string;
	
	// 从产品数据库获取产品数据
	const productData = getProductById(productId);
	
	// 如果产品不存在,显示404页面
	if (!productData) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
					<p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
					<a
						href="/products"
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
					>
						Back to Products
					</a>
				</div>
			</div>
		);
	}
	
	return <ProductDetail data={productData} />;
}

