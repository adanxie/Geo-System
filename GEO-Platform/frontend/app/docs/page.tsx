'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Book, FileText, Video, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const docs = [
  {
    icon: <Book className="w-6 h-6" />,
    title: '快速开始',
    description: '了解 GEO Platform 的基本概念和使用方法',
    items: ['什么是 GEO', '创建您的第一个计划', '内容优化入门'],
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: '用户指南',
    description: '详细的功能说明和操作步骤',
    items: ['推广计划管理', '内容优化', '排名监控', '数据分析'],
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: '视频教程',
    description: '通过视频快速学习和上手',
    items: ['入门视频', '进阶教程', '最佳实践'],
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: '社区支持',
    description: '获取帮助和反馈问题',
    items: ['常见问题', '联系我们', '反馈建议'],
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="mb-12"
          >
            <Button variant="ghost" asChild className="gap-2 mb-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </Link>
            </Button>
            <h1 className="text-4xl font-bold mb-4">帮助文档</h1>
            <p className="text-lg text-muted-foreground">
              了解如何使用 GEO Platform 优化您的内容
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {docs.map((doc, index) => (
              <motion.div
                key={index}
                initial="initial"
                animate="animate"
                variants={{
                  ...fadeInUp,
                  transition: { ...fadeInUp.transition, delay: index * 0.1 },
                }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                      {doc.icon}
                    </div>
                    <CardTitle>{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {doc.items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card>
              <CardHeader>
                <CardTitle>快速开始指南</CardTitle>
                <CardDescription>按照以下步骤，快速上手 GEO Platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    step: 1,
                    title: '注册账户',
                    content: '访问我们的网站，点击"免费试用"按钮，填写必要信息完成注册。',
                  },
                  {
                    step: 2,
                    title: '创建第一个推广计划',
                    content: '登录后，进入仪表板，点击"新建计划"，填写计划名称和目标。',
                  },
                  {
                    step: 3,
                    title: '添加内容',
                    content: '在内容管理页面，添加您要优化的内容，选择目标平台。',
                  },
                  {
                    step: 4,
                    title: '查看分析结果',
                    content: '系统会自动分析您的内容，提供优化建议和排名数据。',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
