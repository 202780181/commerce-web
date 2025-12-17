
import { NextResponse } from 'next/server';

// 配置 Node.js 忽略自签名证书
if (process.env.NODE_ENV === 'development') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET() {
	try {
		console.log('[API Proxy] Fetching basic config from backend...');
		// Assuming the structure follows the pattern but at /config/basic
		// If it fails, we might need to try /portal/config/basic
		const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/portal/config/basic`;
		
		const response = await fetch(backendUrl, {
			cache: 'no-store',
		});

		console.log('[API Proxy] Basic config response status:', response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('[API Proxy] Backend error:', errorText);
			throw new Error(`Backend API returned ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		
		return NextResponse.json(data);
	} catch (error) {
		console.error('[API Proxy] Error:', error);
		return NextResponse.json(
			{ code: -1, message: error instanceof Error ? error.message : 'Failed to fetch basic config' },
			{ status: 500 }
		);
	}
}
