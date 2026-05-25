'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

const pricingPlans = [
  {
    name: "入门版",
    price: "¥299",
    period: "/月",
    description: "适合个人创作者和小型项目",
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
    description: "适合成长中的团队和企业",
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
    description: "适合大型企业和机构",
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

const faqs = [
  {
    q: "可以免费试用吗？",
    a: "是的，我们提供14天免费试用，无需信用卡，试用期间可以体验专业版的全部功能。",
  },
  {
    q: "套餐可以随时更换吗？",
    a: "可以，您可以随时升级或降级套餐，费用将按比例计算。",
  },
  {
    q: "支持哪些支付方式？",
    a: "支持支付宝、微信支付、银行卡等多种支付方式。企业版可以提供发票。",
  },
  {
    q: "数据安全如何保障？",
    a: "我们采用银行级加密技术，所有数据都有定期备份。您的数据完全属于您，我们不会分享给第三方。",
  },
  {
    q: "企业版有什么特殊服务？",
    a: "企业版提供专属客户经理、定制化部署、培训服务和SLA保障。",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
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
              简单透明的
              <span className="text-primary"> 价格</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              选择适合您需求的套餐，随时可以升级或降级
            </motion.p>
          </motion.div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
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
                    <CardDescription>{plan.description}</CardDescription>
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
        </section>

        <section className="bg-muted/30 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">常见问题</h2>
              </motion.div>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                还有问题？
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                我们的团队随时为您提供帮助
              </p>
              <Button size="lg" asChild className="gap-2">
                <Link href="/about">
                  联系我们
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
