"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import ClientWrapper from "@/components/Global/ClientWrapper";
import { usePathname } from "next/navigation";
import { Provider, useDispatch } from "react-redux";
import store from "@/store";
import clsx from "clsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// in /lib/fonts.js

export const metadata = {
  title: "Zendor - Premium Interior Solutions | Designer Wallpapers, Wooden Flooring & Acoustic Panels",
  description: "Transform your space with Zendor's luxury interior solutions. Explore our curated collection of designer wallpapers, premium wooden flooring, and acoustic panels. Visit our Mumbai store or shop online. ☎ +91 84339 00692",
  keywords: ["designer wallpapers", "wooden flooring", "acoustic panels", "interior design mumbai", "luxury wallpapers", "premium flooring", "sound proofing solutions", "custom wall art", "home decor", "interior solutions"],
  openGraph: {
    title: "Zendor - Elevating Interiors with Artistic Precision",
    description: "Discover premium designer wallpapers, wooden flooring & acoustic solutions. Transform your space with our curated collections. Visit our Mumbai store today!",
    url: "https://zendor.vercel.app",
    siteName: "Zendor",
    images: [
      {
        url: "https://i.ibb.co/JwyhCMPB/160995.webp", // Update with your actual OG image
        width: 1200,
        height: 630,
        alt: "Zendor Interior Solutions"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'add-your-verification-code',
  },
  alternates: {
    canonical: 'https://zendor.vercel.app',
  },
  authors: [{ name: 'Zendor' }],
  creator: 'Zendor',
  publisher: 'Zendor',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: 'interior design',
  other: {
    'business:contact_data:street_address': 'Mumbai',
    'business:contact_data:postal_code': '400017',
    'business:contact_data:country_name': 'India',
    'business:contact_data:email': 'myzendor@gmail.com',
    'business:contact_data:phone_number': '+91 84339 00692',
    'business:hours:day_of_week': 'Monday-Sunday',
    'business:hours:start': '10:00',
    'business:hours:end': '20:00',
  }
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Navbar />
          <main className={clsx({
          "mt-25": !isHomePage&&!isAdminPage,
          "mt-15": isAdminPage
        })}>
            <ClientWrapper>{children}</ClientWrapper>
          </main>
        </Provider>
      </body>
    </html>
  );
}
