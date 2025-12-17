import { NextResponse } from 'next/server';

// Configure Node.js to ignore self-signed certificates in development
if (process.env.NODE_ENV === 'development') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const keyword = searchParams.get('keyword') || '';
		const limit = searchParams.get('limit') || '10';

		console.log('[API Proxy Search] Fetching search results:', { keyword, limit });
		
		const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/portal/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}`;
		
		const response = await fetch(backendUrl, {
			cache: 'no-store',
		});

		console.log('[API Proxy Search] Backend response status:', response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('[API Proxy Search] Backend error:', errorText);
			throw new Error(`Backend API returned ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		// console.log('[API Proxy Search] Data received:', JSON.stringify(data).substring(0, 200) + '...');
		
		return NextResponse.json(data);
	} catch (error) {
		console.error('[API Proxy Search] Error:', error);
		return NextResponse.json(
			{ code: -1, message: error instanceof Error ? error.message : 'Failed to perform search' },
			{ status: 500 }
		);
	}
}
