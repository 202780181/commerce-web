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
    const response = await fetch('http://43.139.139.215/api/api/v1/portal/home/index', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (response.ok) {
      homeData = await response.json();
      console.log('Home data:', homeData);
    }
  } catch (error) {
    console.error('Error fetching home data:', error);
  }
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
