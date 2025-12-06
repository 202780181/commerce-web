import { NextResponse } from 'next/server';

// 配置 Node.js 忽略自签名证书
if (process.env.NODE_ENV === 'development') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const productId = params.id;
		console.log('[API Proxy Product Detail] Fetching product:', productId);
		
		const backendUrl = `http://43.139.139.215/api/api/v1/portal/products/${productId}`;
		
		const response = await fetch(backendUrl, {
			cache: 'no-store',
		});

		console.log('[API Proxy Product Detail] Backend response status:', response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('[API Proxy Product Detail] Backend error:', errorText);
			throw new Error(`Backend API returned ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		console.log('[API Proxy Product Detail] Data received successfully');
		
		return NextResponse.json(data);
	} catch (error) {
		console.error('[API Proxy Product Detail] Error:', error);
		return NextResponse.json(
			{ code: -1, message: error instanceof Error ? error.message : 'Failed to fetch product detail' },
			{ status: 500 }
		);
	}
}
