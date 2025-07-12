import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portafolio Web de Alexander Tasinchano | Proyectos Fullstack",
  description: "Explora el portafolio profesional de Alexander Dev, desarrollador de software especializado en tecnologías web modernas como Next.js y React.",
  icons: {
    icon: "./logo.ico",
  },
  openGraph: {
    title: "Alexander Tasinchano - Portfolio",
    description: "Estudiante de Ingeniería en Software - Proyectos Fullstack",
    url: "https://portafolio-web-sable-eight.vercel.app",
    siteName: "Alexander Dev",
    images: [
      {
        url: "https://portafolio-web-sable-eight.vercel.app/image.png",
        width: 1200,
        height: 630,
        alt: "Alexander Tasinchano - Imagen de Portafolio",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Tasinchano - Portfolio",
    description: "Estudiante de Ingeniería en Software - Proyectos Fullstack",
    images: ["https://portafolio-web-sable-eight.vercel.app/image.png"],
    creator: "@alexanderdev",
  },
  other: {
    "google-site-verification": "9-w3_icWE-GlHNnMVcVIlGumxtOKtviUqpySxPk6sOQ"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
