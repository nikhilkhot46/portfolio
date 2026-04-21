import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import JsonLd from '@/components/JsonLd'
import { personSchema, websiteSchema, SITE } from '@/lib/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
})

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Nikhil Khot — Full Stack Developer in India | PHP, Node, React',
    template: '%s — Nikhil Khot',
  },
  description:
    'Full Stack Developer in India. 10+ years building scalable web apps with PHP, Node.js, Angular, React, MySQL & AWS. Pune-based. Open to new roles.',
  keywords: [
    'Full Stack Developer India',
    'Full Stack Developer Pune',
    'hire full stack developer India',
    'MERN stack developer India',
    'PHP Node.js developer',
    'React developer India',
    'Angular developer India',
    'MySQL AWS developer',
    'senior full stack engineer India',
    'Nikhil Khot',
  ],
  authors: [{ name: SITE.author.name, url: SITE.url }],
  creator: SITE.author.name,
  alternates: { canonical: 'https://nikhilkhot.com/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nikhilkhot.com/',
    siteName: 'Nikhil Khot — Full Stack Developer',
    title: 'Nikhil Khot — Full Stack Developer in India',
    description:
      '10+ years shipping scalable web apps with PHP, Node.js, Angular, React, MySQL & AWS. Pune-based full stack engineer, open to new roles.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nikhil Khot — Full Stack Developer in India',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nikhilkhot46',
    creator: '@nikhilkhot46',
    title: 'Nikhil Khot — Full Stack Developer in India',
    description:
      '10+ years in PHP, Node.js, Angular, React, MySQL & AWS. Pune-based full stack engineer. Open to new roles.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.ico', sizes: '32x32' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport = {
  themeColor: '#05060a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <JsonLd data={personSchema()} id="person-schema" />
        <JsonLd data={websiteSchema()} id="website-schema" />
      </head>
      <body className="bg-ink-950 text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <div className="relative min-h-screen overflow-x-hidden">
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <ScrollToTop />
          <WhatsAppButton />
        </div>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YYECQQBCF3"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YYECQQBCF3', { transport_type: 'beacon' });
          `}
        </Script>
      </body>
    </html>
  )
}
