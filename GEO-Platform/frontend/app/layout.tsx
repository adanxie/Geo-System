import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  title: 'GEO Platform - Generative Engine Optimization',
  description: '专业的生成式搜索引擎优化平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
