'use client'

import Link from 'next/link'
import { Sparkles, ArrowLeft, Mail, MapPin, Phone, Users, TrendingUp, CheckCircle } from 'lucide-react'

export default function AboutPage() {
  const team = [
    { name: '张伟', role: '创始人 & CEO', avatar: 'ZW' },
    { name: '李婷', role: '技术总监', avatar: 'LT' },
    { name: '王明', role: '产品总监', avatar: 'WM' },
    { name: '陈静', role: '市场总监', avatar: 'CJ' }
  ]

  const stats = [
    { number: '5000+', label: '服务客户' },
    { number: '100万+', label: '优化内容' },
    { number: '95%', label: '客户满意度' },
    { number: '24/7', label: '技术支持' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GEO Platform</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">功能</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">价格</Link>
            <Link href="/docs" className="text-gray-600 hover:text-blue-600 transition-colors">文档</Link>
            <Link href="/about" className="text-blue-600 font-medium">关于</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">登录</Link>
            <Link href="/register" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              免费试用
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              关于 <span className="text-blue-600">GEO Platform</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              我们致力于帮助内容在AI搜索时代脱颖而出
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">我们的使命</h2>
            <p className="text-gray-600 mb-6">
              在AI搜索正在改变人们获取信息的方式。我们的使命是帮助企业和内容创作者适应这个新时代，
              通过专业的生成式搜索引擎优化技术，让优秀的内容在AI搜索结果中获得更好的曝光。
            </p>
            <p className="text-gray-600 mb-6">
              我们相信，优质内容应该被更多人看到。通过GEO技术，我们帮助客户的内容可以触达更多目标用户，
              实现长期稳定的增长。
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>数据驱动的优化策略</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>持续迭代的产品设计</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>专业的技术支持</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-blue-600 rounded-2xl aspect-square flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-white opacity-50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">发展历程</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-blue-100"></div>
            <div className="space-y-12">
              {[
                { year: '2024', title: '公司成立', desc: 'GEO Platform 正式成立，开始产品研发' },
                { year: '2025', title: '产品上线', desc: '正式发布 GEO 优化平台，获得首批客户好评' },
                { year: '2026', title: '快速增长', desc: '服务客户超过5000+，成为行业领先' }
              ].map((item, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1 text-right">
                    {index % 2 === 0 ? (
                      <div className="pr-8">
                        <span className="text-blue-600 font-bold text-2xl">{item.year}</span>
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                  <div className="flex-1 text-left">
                    {index % 2 === 1 ? (
                      <div className="pl-8">
                        <span className="text-blue-600 font-bold text-2xl">{item.year}</span>
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">联系我们</h2>
          <p className="text-gray-600 mb-12">有任何问题，欢迎随时联系我们</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Mail className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">邮箱</h3>
              <p className="text-gray-600">contact@geo-platform.com</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Phone className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">电话</h3>
              <p className="text-gray-600">400-888-8888</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">地址</h3>
              <p className="text-gray-600">北京市朝阳区科技园区</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">数据说话</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">GEO Platform</span>
              </div>
              <p className="text-sm">专业的生成式搜索引擎优化平台</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition-colors">功能介绍</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">价格套餐</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">更新日志</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">资源</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/docs" className="hover:text-white transition-colors">帮助文档</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">API文档</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">最佳实践</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">关于我们</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">联系我们</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© 2026 GEO Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
