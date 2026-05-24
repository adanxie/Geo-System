'use client'

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowLeft, Sparkles, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 模拟注册请求
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-center px-4 sm:px-6 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">创建账户</CardTitle>
              <CardDescription>开始您的 GEO 优化之旅</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="张三"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm">
                      我同意{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        服务条款
                      </Link>{" "}
                      和{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        隐私政策
                      </Link>
                    </Label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "注册中..." : "创建账户"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    "14天免费试用",
                    "无需信用卡",
                    "随时取消",
                    "专业支持",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    已有账户？{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      立即登录
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
