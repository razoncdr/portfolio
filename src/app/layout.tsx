import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * SEO metadata. `metadataBase` (from lib/site) makes OG/canonical URLs resolve to
 * absolute URLs correctly on localhost, Vercel previews, and production. The
 * `title.template` is forward-looking: future pages (e.g. a blog post) get
 * "Post Title · Rajon". A generated OG card lives in app/opengraph-image.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "Rejwanul Haque Rajon",
    "Software Engineer",
    "Backend Developer",
    "C#",
    "ASP.NET Core",
    "MongoDB",
    "Competitive Programming",
    "Codeforces",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * suppressHydrationWarning: the pre-paint script below may add `dark` to
     * <html> before React hydrates, so the server HTML (no class) and the
     * client DOM can legitimately differ on this one element.
     */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        {/*
          Anti-FOUC theme script. Runs synchronously BEFORE the page paints:
          reads the saved choice (localStorage) or falls back to the OS
          preference, and sets the `dark` class immediately. Without this,
          dark-mode visitors would see a white flash on every load.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        {/* Skip link for keyboard / screen-reader users (WCAG 2.4.1). */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
