import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next Solution',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-svh text-foreground bg-background">
        {children}
      </body>
    </html>
  )
}
