'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Home,
  TrendingUp,
  FileText,
  BarChart3,
  Settings,
  Search,
  Plus,
  ArrowRight,
  TrendingDown,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const mockStats = [
  {
    title: "活跃计划",
    value: "12",
    change: "+3",
    trend: "up",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "排名提升",
    value: "+234%",
    change: "+18%",
    trend: "up",
    icon: <Target className="w-5 h-5" />,
  },
  {
    title: "内容数量",
    value: "86",
    change: "+12",
    trend: "up",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "平台覆盖",
    value: "8",
    change: "+1",
    trend: "up",
    icon: <Search className="w-5 h-5" />,
  },
]

const mockCampaigns = [
  {
    name: "产品营销内容优化",
    status: "active",
    progress: 78,
    lastUpdate: "2小时前",
  },
  {
    name: "技术博客SEO优化",
    status: "active",
    progress: 45,
    lastUpdate: "1天前",
  },
  {
    name: "品牌内容推广",
    status: "pending",
    progress: 0,
    lastUpdate: "5天前",
  },
]

const mockContents = [
  {
    title: "如何使用AI提升效率",
    score: 92,
    platform: "ChatGPT",
    status: "优化完成",
  },
  {
    title: "GEO优化最佳实践",
    score: 78,
    platform: "Gemini",
    status: "需要优化",
  },
  {
    title: "产品更新公告",
    score: 85,
    platform: "Claude",
    status: "优化中",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r hidden md:block">
          <div className="p-6">
            <Link href="/dashboard" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">GEO Platform</span>
            </Link>

            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 bg-accent text-accent-foreground"
                asChild
              >
                <Link href="/dashboard">
                  <Home className="w-5 h-5" />
                  仪表板
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                asChild
              >
                <Link href="/campaigns">
                  <TrendingUp className="w-5 h-5" />
                  推广计划
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                asChild
              >
                <Link href="/contents">
                  <FileText className="w-5 h-5" />
                  内容管理
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                asChild
              >
                <Link href="/platforms">
                  <Search className="w-5 h-5" />
                  排名监控
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                asChild
              >
                <Link href="/analytics">
                  <BarChart3 className="w-5 h-5" />
                  数据分析
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                asChild
              >
                <Link href="/settings">
                  <Settings className="w-5 h-5" />
                  设置
                </Link>
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">仪表板</h1>
              <p className="text-muted-foreground">欢迎回来！这是您的 GEO 优化概览。</p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/campaigns/new">
                <Plus className="w-4 h-4" />
                新建计划
              </Link>
            </Button>
          </div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStats.map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {stat.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className={cn(
                        "text-xs flex items-center gap-1",
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      )}>
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {stat.change}
                        <span className="text-muted-foreground ml-1">vs 上周</span>
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Campaigns */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>最近计划</CardTitle>
                      <Button variant="ghost" size="sm" asChild className="gap-1">
                        <Link href="/campaigns">
                          查看全部
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                    <CardDescription>您最近的 GEO 优化计划</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockCampaigns.map((campaign, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{campaign.name}</p>
                            <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                              {campaign.status === "active" ? "进行中" : "待开始"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex-1">
                              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${campaign.progress}%` }}
                                />
                              </div>
                            </div>
                            <span>{campaign.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Contents */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>内容分析</CardTitle>
                      <Button variant="ghost" size="sm" asChild className="gap-1">
                        <Link href="/contents">
                          查看全部
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                    <CardDescription>您内容的 GEO 优化评分</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockContents.map((content, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium mb-1">{content.title}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <Badge variant="outline">{content.platform}</Badge>
                            <span className="text-muted-foreground">{content.status}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn(
                            "text-lg font-bold",
                            content.score >= 80 ? "text-green-500" :
                            content.score >= 60 ? "text-yellow-500" :
                            "text-red-500"
                          )}>
                            {content.score}
                          </div>
                          <p className="text-xs text-muted-foreground">分数</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
