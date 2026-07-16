import "./globals.css";
import { CategoriesProvider } from "./contexts/CategoriesContext";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>CO-Grow Machinery Co.,Ltd</title>
        <meta
          name="description"
          content="CO-Grow Machinery Co.,Ltd;Unleash the Power of Lite Shop the Complete LiteVise™ Family Shop LiteVise™s Shop by Category Vises Automation RockLock™s Top Sellers See What Fits Your Machine Choose a manufacturer, model, and RockLock™ base to download and preview compatible models. Try 3D Tool Elevate your Shop’s Efficiency Self-Centering Vises​ V562X Self-Centering Vise Quick-Change Systems 96mm Low Profile […]"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CO-Grow Machinery Co.,Ltd" />
        <meta
          property="og:description"
          content="CO-Grow Machinery Co.,Ltd;Unleash the Power of Lite Shop the Complete LiteVise™ Family Shop LiteVise™s Shop by Category Vises Automation RockLock™s Top Sellers See What Fits Your Machine Choose a manufacturer, model, and RockLock™ base to download and preview compatible models. Try 3D Tool Elevate your Shop’s Efficiency Self-Centering Vises​ V562X Self-Centering Vise Quick-Change Systems 96mm Low Profile […]"
        />
        <meta property="og:url" content="https://www.zppcnc.com/" />
        <meta property="og:site_name" content="CNC Workholding Solutions" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Icons */}
        <link
          rel="icon"
          href="https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png"
        />
        <link
          rel="shortcut icon"
          href="https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://cdn.prod.website-files.com/6578982aece0102430a52404/68c74328bdac6f28d581c8c6_Simon%20AI%20-%20Webclip.png"
        />
      </head>
      <body className="antialiased">
        <CategoriesProvider>{children}</CategoriesProvider>
      </body>
    </html>
  );
}
