'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Users, TrendingUp, Target, Heart, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'

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

const team = [
  {
    name: '张伟',
    role: '创始人 & CEO',
    avatar: 'ZW',
  },
  {
    name: '李婷',
    role: '技术总监',
    avatar: 'LT',
  },
  {
    name: '王明',
    role: '产品总监',
    avatar: 'WM',
  },
  {
    name: '陈静',
    role: '市场总监',
    avatar: 'CJ',
  },
]

const stats = [
  { number: '5,000+', label: '服务客户' },
  { number: '100,000+', label: '优化内容' },
  { number: '95%', label: '客户满意度' },
  { number: '24/7', label: '技术支持' },
]

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: '用户优先',
    description: '我们始终把用户需求放在第一位',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: '持续创新',
    description: '不断探索新技术，提供更好的产品',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: '真诚服务',
    description: '用真诚和专业为每一位客户服务',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <Button variant="ghost" asChild className="gap-2">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4" />
                  返回首页
                </Link>
              </Button>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              关于我们
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我们致力于帮助内容在 AI 搜索时代脱颖而出
            </motion.p>
          </motion.div>

          <section className="mb-20">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div variants={fadeInUp}>
                  <h2 className="text-3xl font-bold mb-6">我们的使命</h2>
                  <p className="text-muted-foreground mb-4">
                    在 AI 搜索正在改变人们获取信息的方式。我们的使命是帮助企业和内容创作者适应这个新时代，
                    通过专业的生成式搜索引擎优化技术，让优秀的内容在 AI 搜索结果中获得更好的曝光。
                  </p>
                  <p className="text-muted-foreground">
                    我们相信，优质内容应该被更多人看到。通过 GEO 技术，我们帮助客户的内容可以触达更多目标用户，
                    实现长期稳定的增长。
                  </p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <div className="bg-gradient-to-br from-primary/10 to-blue-100 rounded-2xl p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="font-semibold text-lg">让好内容被发现</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <section className="mb-20">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
                我们的团队
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                一群热爱技术和创新的人
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeInUp,
                    transition: { ...fadeInUp.transition, delay: index * 0.1 },
                  }}
                >
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4">
                        {member.avatar}
                      </div>
                      <h3 className="font-semibold mb-1">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20 bg-muted/30 rounded-2xl p-8 md:p-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h2 className="text-3xl font-bold text-center mb-12">我们的价值观</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <motion.div key={index} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
                    <Card className="h-full border-0 shadow-none bg-transparent">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                          {value.icon}
                        </div>
                        <CardTitle className="text-xl">{value.title}</CardTitle>
                        <CardDescription>{value.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="mb-20">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      ...fadeInUp,
                      transition: { ...fadeInUp.transition, delay: index * 0.1 },
                    }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="mb-20">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
                联系我们
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                有任何问题，欢迎随时联系我们
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: '邮箱',
                  content: 'contact@geo-platform.com',
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: '电话',
                  content: '400-888-8888',
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: '地址',
                  content: '北京市朝阳区科技园区',
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
