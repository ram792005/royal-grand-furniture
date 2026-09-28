import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Royal Grand Furniture | Architectural Mastery & Bespoke Living",
  description:
    "Objects with presence. Furniture for rooms that have something to say. Handcrafted bespoke living collections from Vijjeswaram, AP.",
};

export const viewport: Viewport = {
  themeColor: "#1a1918",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Vercel Web Analytics & Speed Insights */}
        <script defer src="/_vercel/insights/script.js" />
        <script defer src="/_vercel/speed-insights/script.js" />
        {/* Google Analytics (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VQ8Q4XM4P7"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VQ8Q4XM4P7');
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
