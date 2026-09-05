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
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0e15",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

