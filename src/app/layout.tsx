import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: "InnovaSci Open Polytechnic - Future-Ready Education",
  description: "Premier online polytechnic offering cutting-edge AI and technology programs. Transform your career with industry-focused courses and certified diplomas.",
  keywords: ["online education", "polytechnic", "AI training", "technology courses", "online diploma"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background antialiased">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#363449',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}