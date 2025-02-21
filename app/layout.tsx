import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="md:pl-64 transition-all duration-300">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
