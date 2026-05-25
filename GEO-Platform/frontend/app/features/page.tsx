'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Search,
  Target,
  FileText,
  BarChart3,
  Users,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Shield,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layouts/Header"
import { Footer } from "@/components/layouts/Footer"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const allFeatures = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "多平台排名监控",
    description: "实时监控您的内容在ChatGPT、Gemini、Claude等多个AI搜索平台的排名变化",
    details: [
      "实时数据更新",
      "历史趋势图表",
      "竞争对手分析",
      "排名预警通知",
    ],
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "AI内容优化建议",
    description: "基于机器学习算法，为您的内容提供专业的GEO优化建议",
    details: [
      "智能关键词分析",
      "内容质量评估",
      "结构优化建议",
      "AI友好度评分",
    ],
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "推广计划管理",
    description: "一站式管理您的所有GEO推广计划，轻松追踪效果",
    details: [
      "多计划并行管理",
      "自定义目标设置",
      "预算控制",
      "进度追踪",
    ],
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "智能内容生成",
    description: "利用AI自动生成优化后的内容，提升创作效率",
    details: [
      "AI驱动内容创作",
      "多语言支持",
      "内容变体生成",
      "批量内容处理",
    ],
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "数据可视化分析",
    description: "直观的图表和报表，让您随时了解优化效果",
    details: [
      "实时数据仪表盘",
      "自定义时间范围",
      "数据导出功能",
      "趋势预测",
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "团队协作",
    description: "完善的权限管理，高效的团队协作体验",
    details: [
      "多角色权限控制",
      "任务分配",
      "协作编辑",
      "操作日志",
    ],
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "快速集成",
    description: "简单易用的API和SDK，轻松集成到您的现有工作流程",
    details: [
      "RESTful API",
      "多语言SDK",
      "Webhook支持",
      "详细文档",
    ],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "全球覆盖",
    description: "支持全球多个AI平台，帮助您触达更多用户",
    details: [
      "多平台支持",
      "多语言优化",
      "区域化策略",
      "本地化为先",
    ],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "安全可靠",
    description: "企业级安全保障，保护您的数据安全",
    details: [
      "数据加密存储",
      "访问控制",
      "合规认证",
      "数据备份",
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Button variant="ghost" asChild className="gap-2">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4" />
                  返回首页
                </Link>
              </Button>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              强大的功能，助力您的
              <span className="text-primary"> GEO</span>
              优化
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              全方位的生成式搜索引擎优化工具，让您的内容在AI搜索时代占据先机
            </motion.p>
          </motion.div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                准备好开始了吗？
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                立即注册，体验强大的GEO优化功能，让您的内容在AI搜索中脱颖而出
              </p>
              <Button size="lg" asChild className="gap-2">
                <Link href="/register">
                  免费试用14天
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
