import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ERP System',
  description: 'Minimalistic ERP System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-3">
                <h1 className="text-2xl font-bold text-gray-900">ERP System</h1>
                <nav>
                  <ul className="flex space-x-4">
                    <li><Link href="/" className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded">Dashboard</Link></li>
                    <li><Link href="/sales" className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded">Sales Module</Link></li>
                    <li><Link href="/hr" className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded">HR</Link></li>
                    <li><Link href="/inventory" className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded">Inventory</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

