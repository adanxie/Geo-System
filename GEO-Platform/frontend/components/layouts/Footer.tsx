import Link from "next/link"
import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">GEO Platform</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              专业的生成式搜索引擎优化平台，让您的内容脱颖而出。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">产品</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:text-primary transition-colors">
                  功能介绍
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  价格套餐
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  更新日志
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">资源</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-primary transition-colors">
                  帮助文档
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-primary transition-colors">
                  API 文档
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  最佳实践
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">公司</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2026 GEO Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
