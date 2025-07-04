import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Content Repurposing Tool | Turn One Text Into 7+ Formats Instantly',
  description: 'Paste your content and instantly repurpose it for Twitter, LinkedIn, YouTube, Instagram, Email, TikTok, and more. Powered by advanced AI (GPT-4o). Try for free!',

  icons: {
    icon: '/app-logo.png',
    shortcut: '/app-logo.png',
    apple: '/app-logo.png',
  },

  openGraph: {
    title: 'AI Content Repurposing Tool | Turn One Text Into 7+ Formats Instantly',
    description: 'Paste your content and instantly repurpose it for Twitter, LinkedIn, YouTube, Instagram, Email, TikTok, and more. Powered by advanced AI (GPT-4o). Try for free!',
    url: 'https://yourdomain.com/tool',
    siteName: 'ContentCrane',
    images: [
      {
        url: '/placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'AI Content Repurposing Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Content Repurposing Tool | Turn One Text Into 7+ Formats Instantly',
    description: 'Paste your content and instantly repurpose it for Twitter, LinkedIn, YouTube, Instagram, Email, TikTok, and more. Powered by advanced AI (GPT-4o). Try for free!',
    images: ['/placeholder.svg'],
    creator: '@yourtwitter',
  },
  alternates: {
    canonical: 'https://yourdomain.com/tool',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
