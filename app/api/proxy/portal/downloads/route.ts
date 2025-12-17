import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const backendUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/portal/downloads`);
		const search = request.nextUrl.searchParams.get('search');
		
		if (search) {
			backendUrl.searchParams.append('keyword', search);
		}
		
		const response = await fetch(backendUrl.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			// 开发环境禁用 SSL 验证
			...(process.env.NODE_ENV === 'development' && {
				// @ts-ignore
				agent: new (require('https').Agent)({
					rejectUnauthorized: false
				})
			})
		});

		if (!response.ok) {
			throw new Error(`Backend API error: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('[Downloads API] Error:', error);
		return NextResponse.json(
			{ code: -1, message: 'Failed to fetch downloads', data: [] },
			{ status: 500 }
		);
	}
}
