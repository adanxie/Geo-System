'use client'

import Link from 'next/link'
import { Sparkles, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: '入门版',
      price: '¥299',
      period: '/月',
      description: '适合个人创作者和小型项目',
      features: [
        '5个推广计划',
        '3个AI平台监控',
        '基础数据分析',
        '邮件支持',
        '内容分析功能',
        '基础优化建议'
      ],
      cta: '开始试用',
      highlight: false
    },
    {
      name: '专业版',
      price: '¥999',
      period: '/月',
      description: '适合成长中的团队和企业',
      features: [
        '20个推广计划',
        '10个AI平台监控',
        '高级数据分析',
        '优先技术支持',
        'AI内容生成',
        '团队协作功能',
        'API访问',
        '自定义报告'
      ],
      cta: '立即开通',
      highlight: true,
      badge: '最受欢迎'
    },
    {
      name: '企业版',
      price: '¥2999',
      period: '/月',
      description: '适合大型企业和机构',
      features: [
        '无限推广计划',
        '全部AI平台监控',
        '企业级数据分析',
        '专属客户经理',
        '定制化AI模型',
        'SLA保障',
        '私有化部署选项',
        '培训服务',
        'API无限制'
      ],
      cta: '联系销售',
      highlight: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GEO Platform</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">功能</Link>
            <Link href="/pricing" className="text-blue-600 font-medium">价格</Link>
            <Link href="/docs" className="text-gray-600 hover:text-blue-600 transition-colors">文档</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">关于</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">登录</Link>
            <Link href="/register" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              免费试用
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            简单透明的
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> 价格方案</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            选择适合您需求的方案，随时可以升级或降级
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl'
                    : 'bg-white border border-gray-100 hover:shadow-lg'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-sm rounded-full">
                    {plan.badge}
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlight ? 'text-blue-100' : 'text-gray-500'}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-2 ${plan.highlight ? 'text-blue-50' : 'text-gray-600'}`}>
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-green-300' : 'text-green-500'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`w-full py-3 rounded-lg font-medium text-center block transition-colors ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">常见问题</h2>
          <div className="space-y-6">
            {[
              {
                q: '可以免费试用吗？',
                a: '是的，我们提供14天免费试用，无需信用卡，试用期间可以体验专业版的全部功能。'
              },
              {
                q: '套餐可以随时更换吗？',
                a: '可以，您可以随时升级或降级套餐，费用将按比例计算。'
              },
              {
                q: '支持哪些支付方式？',
                a: '支持支付宝、微信支付、银行卡等多种支付方式。企业版可以提供发票。'
              },
              {
                q: '数据安全如何保障？',
                a: '我们采用银行级加密技术，所有数据都有定期备份。您的数据完全属于您，我们不会分享给第三方。'
              },
              {
                q: '企业版有什么特殊服务？',
                a: '企业版提供专属客户经理、定制化部署、培训服务和SLA保障。'
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">还有问题？</h2>
          <p className="text-lg text-gray-600 mb-8">我们的销售团队随时为您提供帮助</p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-lg font-medium"
          >
            联系我们
            <ArrowRight className="w-5 h-5" />
          </Link>
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
