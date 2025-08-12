import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat } from 'next/font/google'
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script" // Import Script from next/script

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "HND 68 Timetable",
  description: "Real-time timetable viewer for HND 68 course",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "icons/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "icons/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "manifest",
        url: "icons/site.webmanifest",
      },
    ],
  },
  openGraph: {
    title: "HND 68 Timetable - Your Daily Schedule",
    description:
      "Stay organized with your HND 68 class timetable, real-time Myanmar time, and daily schedule previews.",
    url: "https://hnd68.vercel.app/",
    siteName: "HND 68 Timetable",
    images: [
      {
        url: "/logo.png?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "HND 68 Timetable App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HND 68 Timetable - Your Daily Schedule",
    description:
      "Stay organized with your HND 68 class timetable, real-time Myanmar time, and daily schedule previews.",
    creator: "@vercel",
    images: ["/logo.png?height=630&width=1200"],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  colorScheme: "dark light",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
