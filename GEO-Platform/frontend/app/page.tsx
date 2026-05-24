'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles,
  TrendingUp,
  Search,
  Users,
  Target,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

const features = [
  {
    icon: <TrendingUp className="w-10 h-10 text-primary" />,
    title: "多平台排名监控",
    description: "实时监控您的内容在ChatGPT、Gemini、Claude等多个AI搜索平台的排名变化",
  },
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: "AI内容优化建议",
    description: "基于机器学习算法，为您的内容提供专业的GEO优化建议",
  },
  {
    icon: <Target className="w-10 h-10 text-primary" />,
    title: "推广计划管理",
    description: "一站式管理您的所有GEO推广计划，轻松追踪效果",
  },
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "智能内容生成",
    description: "利用AI自动生成优化后的内容，提升创作效率",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-primary" />,
    title: "数据可视化分析",
    description: "直观的图表和报表，让您随时了解优化效果",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "团队协作",
    description: "完善的权限管理，高效的团队协作体验",
  },
]

const testimonials = [
  {
    name: "张明",
    role: "市场总监",
    company: "科技公司",
    content: "使用GEO Platform后，我们的内容在AI搜索中的曝光率提升了300%，效果超出预期！",
    avatar: "ZM",
  },
  {
    name: "李华",
    role: "内容创作者",
    company: "独立博主",
    content: "专业的优化建议让我的文章更容易被AI发现，流量增长非常显著。",
    avatar: "LH",
  },
  {
    name: "王芳",
    role: "SEO专家",
    company: "咨询公司",
    content: "从SEO到GEO的完美转型工具，监控和优化功能都做得非常棒。",
    avatar: "WF",
  },
]

const pricingPlans = [
  {
    name: "入门版",
    price: "¥299",
    period: "/月",
    features: [
      "5个推广计划",
      "3个平台监控",
      "基础数据分析",
      "邮件支持",
      "内容分析功能",
      "基础优化建议",
    ],
    cta: "开始试用",
    highlight: false,
  },
  {
    name: "专业版",
    price: "¥999",
    period: "/月",
    features: [
      "20个推广计划",
      "10个平台监控",
      "高级数据分析",
      "优先技术支持",
      "AI内容生成",
      "团队协作功能",
      "API访问",
      "自定义报告",
    ],
    cta: "立即开通",
    highlight: true,
    badge: "最受欢迎",
  },
  {
    name: "企业版",
    price: "¥2999",
    period: "/月",
    features: [
      "无限推广计划",
      "全部平台监控",
      "企业级数据分析",
      "专属客户经理",
      "定制化AI模型",
      "SLA保障",
      "私有化部署选项",
      "培训服务",
      "API无限制",
    ],
    cta: "联系销售",
    highlight: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-50/50" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <Badge variant="secondary" className="px-4 py-1 text-sm gap-2">
                  <Sparkles className="w-4 h-4" />
                  新一代生成式搜索引擎优化平台
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                让您的内容在
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                  {" "}AI 搜索
                </span>
                中脱颖而出
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              >
                专业的GEO平台，帮助您优化内容在ChatGPT、Gemini、Claude等AI平台的可见度，实现长期稳定的排名提升。
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/register">
                    开始体验
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/features">查看功能</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>免费试用14天</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>无需信用卡</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>随时取消</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-4">
                强大功能，助力成长
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                全方位的GEO优化工具，让您的内容在AI搜索时代占据先机
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                      <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-4">
                简单透明的价格
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                选择适合您需求的套餐，随时可以升级或降级
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={cn(
                    "h-full relative overflow-hidden transition-all duration-300",
                    plan.highlight ? "border-primary shadow-lg scale-105" : "hover:shadow-md"
                  )}>
                    {plan.badge && (
                      <div className="absolute top-0 right-0 left-0 bg-primary text-primary-foreground text-center text-sm py-1.5 font-medium">
                        {plan.badge}
                      </div>
                    )}
                    <CardHeader className={plan.badge ? "pt-12" : ""}>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="flex items-baseline gap-1 mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={plan.highlight ? "default" : "outline"}
                        className="w-full"
                        asChild
                      >
                        <Link href="/register">{plan.cta}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-4">
                客户评价
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                听听我们的客户怎么说
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <CardDescription className="text-base text-foreground">
                        "{testimonial.content}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} · {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                准备好开始您的GEO优化之旅了吗？
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                现在注册，享受14天免费试用，让您的内容在AI搜索中脱颖而出
              </p>
              <Button size="lg" asChild className="gap-2">
                <Link href="/register">
                  立即开始
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
