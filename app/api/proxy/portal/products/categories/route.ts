import { NextResponse } from 'next/server';

// 配置 Node.js 忽略自签名证书
if (process.env.NODE_ENV === 'development') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET() {
	try {
		console.log('[API Proxy] Fetching from backend...');
		const backendUrl = 'http://43.139.139.215/api/api/v1/portal/products/categories';
		
		const response = await fetch(backendUrl, {
			cache: 'no-store',
		});

		console.log('[API Proxy] Backend response status:', response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('[API Proxy] Backend error:', errorText);
			throw new Error(`Backend API returned ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		console.log('[API Proxy] Data received successfully');
		console.log('[API Proxy] Data structure:', Array.isArray(data) ? 'Array' : typeof data);
		
		return NextResponse.json(data);
	} catch (error) {
		console.error('[API Proxy] Error:', error);
		return NextResponse.json(
			{ code: -1, message: error instanceof Error ? error.message : 'Failed to fetch categories' },
			{ status: 500 }
		);
	}
}
