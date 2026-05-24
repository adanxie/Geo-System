'use client'

import * as React from "react"
import Link from "next/link"
import {
  Sparkles,
  Palette,
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  ArrowLeft,
  Users,
  TrendingUp,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const presets = [
  {
    name: "经典蓝",
    colors: {
      primary: "#2563eb",
      secondary: "#3b82f6",
      accent: "#a855f7",
      background: "#ffffff",
      text: "#1f2937",
      border: "#e5e7eb",
    },
  },
  {
    name: "商务蓝",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#8b5cf6",
      background: "#f8fafc",
      text: "#1e293b",
      border: "#cbd5e1",
    },
  },
  {
    name: "现代蓝",
    colors: {
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      accent: "#ec4899",
      background: "#f0f9ff",
      text: "#0f172a",
      border: "#e2e8f0",
    },
  },
  {
    name: "科技蓝",
    colors: {
      primary: "#0066ff",
      secondary: "#0080ff",
      accent: "#00d4ff",
      background: "#0a0a0f",
      text: "#e5e7eb",
      border: "#1f2937",
    },
  },
]

export default function ThemeConfigPage() {
  const [theme, setTheme] = React.useState({
    primary: "#2563eb",
    secondary: "#3b82f6",
    accent: "#a855f7",
    background: "#ffffff",
    text: "#1f2937",
    border: "#e5e7eb",
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setMessage({ type: "success", text: "主题配置已保存！" })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: "error", text: "保存失败，请重试" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setTheme({
      primary: "#2563eb",
      secondary: "#3b82f6",
      accent: "#a855f7",
      background: "#ffffff",
      text: "#1f2937",
      border: "#e5e7eb",
    })
    setMessage({ type: "success", text: "已重置为默认主题" })
    setTimeout(() => setMessage(null), 3000)
  }

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setTheme(preset.colors)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r hidden md:block">
          <div className="p-6">
            <Link href="/dashboard" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">GEO Platform</span>
            </Link>

            <div className="mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                管理后台
              </p>
              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  asChild
                >
                  <Link href="/admin/users">
                    <Users className="w-5 h-5" />
                    用户管理
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  asChild
                >
                  <Link href="/admin/sales">
                    <TrendingUp className="w-5 h-5" />
                    销售管理
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  asChild
                >
                  <Link href="/admin/finance">
                    <Sparkles className="w-5 h-5" />
                    财务管理
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 bg-accent text-accent-foreground"
                  asChild
                >
                  <Link href="/admin/theme">
                    <Palette className="w-5 h-5" />
                    主题配置
                  </Link>
                </Button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
                返回
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">主题配置</h1>
              <p className="text-muted-foreground">自定义平台的整体外观和配色方案</p>
            </div>
          </div>

          {message && (
            <div className={cn(
              "mb-6 p-4 rounded-lg flex items-center gap-2",
              message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            )}>
              {message.type === "success" ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span>{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    颜色配置
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>主色调</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-muted"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <Input
                          value={theme.primary}
                          onChange={(e) => setTheme(prev => ({ ...prev, primary: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>次要色</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-muted"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <Input
                          value={theme.secondary}
                          onChange={(e) => setTheme(prev => ({ ...prev, secondary: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>强调色</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-muted"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <Input
                          value={theme.accent}
                          onChange={(e) => setTheme(prev => ({ ...prev, accent: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>背景色</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-muted"
                          style={{ backgroundColor: theme.background }}
                        />
                        <Input
                          value={theme.background}
                          onChange={(e) => setTheme(prev => ({ ...prev, background: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>文字色</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-muted"
                          style={{ backgroundColor: theme.text }}
                        />
                        <Input
                          value={theme.text}
                          onChange={(e) => setTheme(prev => ({ ...prev, text: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>边框色</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-muted"
                          style={{ backgroundColor: theme.border }}
                        />
                        <Input
                          value={theme.border}
                          onChange={(e) => setTheme(prev => ({ ...prev, border: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {isLoading ? "保存中..." : "保存配置"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      重置默认
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>预设主题</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {presets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetSelect(preset)}
                      className="w-full p-4 border rounded-lg hover:border-primary hover:bg-accent transition-all text-left"
                    >
                      <p className="font-medium mb-2">{preset.name}</p>
                      <div className="flex gap-1">
                        {Object.values(preset.colors).slice(0, 4).map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>预览效果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="p-4 rounded-lg border-2"
                    style={{ backgroundColor: theme.background, borderColor: theme.border }}
                  >
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: theme.text }}
                    >
                      示例标题
                    </h3>
                    <p
                      className="text-sm mb-4"
                      style={{ color: theme.text, opacity: 0.8 }}
                    >
                      这是一段示例文字，用于预览主题效果。
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded text-white text-sm font-medium"
                        style={{ backgroundColor: theme.primary }}
                      >
                        主按钮
                      </button>
                      <button
                        className="px-3 py-1 rounded text-sm border font-medium"
                        style={{ borderColor: theme.border, color: theme.text }}
                      >
                        次要按钮
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
