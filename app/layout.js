import "./globals.css";

export const metadata = {
  title: "Muhammad Jaffier Al Zufri — Network Engineer & NOC Operator",
  description:
    "Portofolio Muhammad Jaffier Al Zufri, Network Engineer & NOC Operator — MikroTik, fiber optic, Linux server, dan monitoring infrastruktur ISP/IPTV.",
  keywords: "Network Engineer, NOC Operator, MikroTik, Fiber Optic, Linux Server, ISP, IPTV",
  authors: [{ name: "Muhammad Jaffier Al Zufri" }],
  metadataBase: new URL("https://jaffier.dev"),
  openGraph: {
    title: "Muhammad Jaffier Al Zufri — Network Engineer & NOC Operator",
    description:
      "Portofolio Muhammad Jaffier Al Zufri, Network Engineer & NOC Operator — MikroTik, fiber optic, Linux server, dan monitoring infrastruktur ISP/IPTV.",
    type: "website",
    locale: "id_ID",
    url: "https://jaffier.dev",
    siteName: "Portofolio Muhammad Jaffier Al Zufri",
    images: [
      {
        url: "/photo.jpg",
        width: 800,
        height: 1060,
        alt: "Muhammad Jaffier Al Zufri - Network Engineer & NOC Operator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Jaffier Al Zufri — Network Engineer & NOC Operator",
    description:
      "Portofolio Muhammad Jaffier Al Zufri, Network Engineer & NOC Operator — MikroTik, fiber optic, Linux server, dan monitoring infrastruktur ISP/IPTV.",
    images: ["/photo.jpg"],
  },
  alternates: {
    canonical: "https://jaffier.dev",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: 1200,
  themeColor: "#0d0e15",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="notranslate" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function adjustViewport() {
                  var targetWidth = 1200;
                  var w = window.screen.width;
                  if (w < targetWidth) {
                    var scale = w / targetWidth;
                    var meta = document.querySelector('meta[name="viewport"]');
                    if (!meta) {
                      meta = document.createElement('meta');
                      meta.name = 'viewport';
                      document.head.appendChild(meta);
                    }
                    meta.setAttribute('content', 'width=' + targetWidth + ', initial-scale=' + scale.toFixed(4) + ', minimum-scale=' + (scale * 0.5).toFixed(4) + ', maximum-scale=3.0, user-scalable=yes');
                  }
                }
                adjustViewport();
                window.addEventListener('resize', adjustViewport);
                window.addEventListener('orientationchange', adjustViewport);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

