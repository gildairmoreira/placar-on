import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PLACAR ON',
  description: 'Acompanhe resultados, estatísticas e informações do futebol brasileiro e mundial',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-900 relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/background.png"
              alt="Background"
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
          <div className="relative z-10">
            <Navbar />
            <main className="container mx-auto px-4 py-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
