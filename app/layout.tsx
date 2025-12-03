import "./globals.css";

export const metadata = {
  title: "CO-Grow Machinery Co.,Ltd",
  description: "CO-Grow Machinery Co.,Ltd",
  icons: {
    icon: "https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png",
    shortcut: "https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png",
    apple: "https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 调用接口获取数据
  let homeData = null;
  try {
    // 服务端需要完整的 URL，客户端可以使用相对路径
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/proxy/portal/home/index`;
    console.log('Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      homeData = await response.json();
      console.log('Home data:', homeData);
    } else {
      console.error('Response not OK:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching home data:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
  }
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
