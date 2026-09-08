import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import HudBackground from '@/components/HudBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0B0F1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://emircan.com'),
  title: 'Emircan Can | AI Developer, Full-Stack Engineer & Test Automation',
  description:
    'Portfolio of Emircan Can — 4th-year Software Engineering student at İnönü University. Autonomous edge-AI, full-stack web, mobile mesh systems, and Playwright test automation.',
  keywords: [
    'Emircan Can',
    'AI Developer',
    'Full-Stack Developer',
    'Playwright Test Engineer',
    'İnönü University',
    'SENTINEL OS',
    'Acil Afet',
    'Software Engineer',
    'Malatya Türkiye',
    'Next.js Portfolio',
  ],
  authors: [{ name: 'Emircan Can', url: 'https://github.com/emir-canswe' }],
  creator: 'Emircan Can',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'tr_TR',
    url: 'https://emircan.com',
    title: 'Emircan Can | AI Developer & Full-Stack Engineer',
    description:
      'Autonomous edge-AI telemetry, offline mesh disaster communications, full-stack platforms, and Playwright E2E automation.',
    siteName: 'Emircan Can Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Emircan Can Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emircan Can | AI Developer & Full-Stack Engineer',
    description:
      'Autonomous edge-AI telemetry, offline mesh disaster communications, full-stack platforms, and Playwright E2E automation.',
    images: ['/og-image.png'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emircan Can',
    jobTitle: 'Software Engineer & AI Developer',
    description:
      'Fourth-year Software Engineering student at İnönü University developing AI systems, full-stack web applications, mobile architectures, and automated testing suites.',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'İnönü University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Malatya',
        addressCountry: 'TR',
      },
    },
    url: 'https://emircan.com',
    sameAs: [
      'https://github.com/emir-canswe',
      'https://www.linkedin.com/in/emircan-can-4034662a1/',
      'https://instagram.com/emir10_can',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Computer Vision',
      'Full-Stack Web Development',
      'Playwright Test Automation',
      'Mobile Development',
      'Offline Mesh Networks',
    ],
  };

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" type="image/svg+xml" href={`${basePath}/icon.svg`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/favicon-16x16.png`} />
        <link rel="apple-touch-icon" href={`${basePath}/icon.svg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0B0F1A] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-white min-h-screen flex flex-col">
        <LanguageProvider>
          <ThemeProvider>
            <HudBackground />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
