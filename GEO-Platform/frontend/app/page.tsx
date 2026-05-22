'use client'

import { useState } from 'react'
import { Search, TrendingUp, Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`感谢您的关注！我们会尽快联系您: ${email}`)
    setEmail('')
  }

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: '排名提升',
      description: '多平台AI搜索排名监控与优化'
    },
    {
      icon: <Search className="w-8 h-8 text-green-500" />,
      title: '智能分析',
      description: 'AI驱动的内容优化建议'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: '团队协作',
      description: '多角色权限管理'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-orange-500" />,
      title: '持续优化',
      description: '长期稳定的GEO过程'
    }
  ]

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GEO Platform</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">功能</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">价格</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">关于</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">登录</button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              免费试用
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            新一代生成式搜索引擎优化平台
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            让您的内容在
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI 搜索</span>
            中脱颖而出
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            专业的GEO平台，帮助您优化内容在ChatGPT、Gemini、Claude等AI平台的可见度，实现长期稳定的排名提升
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="输入您的邮箱"
              className="flex-1 px-5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              开始体验
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>免费试用14天</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>无需信用卡</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>随时取消</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-gray-600 max-w-xl mx-auto">全方位的GEO优化工具，助您实现内容价值最大化</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">价格套餐</h2>
            <p className="text-gray-600 max-w-xl mx-auto">选择适合您需求的套餐</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: '入门版', price: '¥299', period: '/月', features: ['5个推广计划', '3个平台监控', '基础报告', '邮件支持'] },
              { name: '专业版', price: '¥999', period: '/月', features: ['20个推广计划', '10个平台监控', '高级分析', '优先支持'], highlight: true },
              { name: '企业版', price: '¥2999', period: '/月', features: ['无限推广计划', '全部平台', '专属客户经理', 'API访问'] }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl ${plan.highlight ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white' : 'bg-white border border-gray-200'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-sm rounded-full">
                    最受欢迎
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={plan.highlight ? 'text-blue-100' : 'text-gray-500'}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center gap-2 ${plan.highlight ? 'text-blue-50' : 'text-gray-600'}`}>
                      <CheckCircle className="w-5 h-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  选择套餐
                </button>
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">GEO Platform</span>
              </div>
              <p className="text-sm">专业的生成式搜索引擎优化平台</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">功能介绍</a></li>
                <li><a href="#" className="hover:text-white transition-colors">价格套餐</a></li>
                <li><a href="#" className="hover:text-white transition-colors">更新日志</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">资源</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">帮助文档</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API文档</a></li>
                <li><a href="#" className="hover:text-white transition-colors">最佳实践</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
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