'use client'

import Link from 'next/link'
import { Sparkles, Search, TrendingUp, Users, Target, FileText, BarChart3, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
      title: '多平台排名监控',
      description: '实时监控您的内容在ChatGPT、Gemini、Claude等多个AI搜索平台的排名变化',
      details: [
        '实时排名数据更新',
        '排名趋势图表',
        '竞争对手分析',
        '排名预警通知'
      ]
    },
    {
      icon: <Search className="w-10 h-10 text-blue-500" />,
      title: 'AI内容优化建议',
      description: '基于机器学习算法，为您的内容提供专业的GEO优化建议',
      details: [
        '智能关键词分析',
        '内容质量评估',
        '结构优化建议',
        'AI友好度评分'
      ]
    },
    {
      icon: <Target className="w-10 h-10 text-blue-700" />,
      title: '推广计划管理',
      description: '一站式管理您的所有GEO推广计划，轻松追踪效果',
      details: [
        '多计划并行管理',
        '自定义目标设置',
        '预算控制',
        '进度追踪'
      ]
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-400" />,
      title: '智能内容生成',
      description: '利用AI自动生成优化后的内容，提升创作效率',
      details: [
        'AI驱动的内容创作',
        '多语言支持',
        '内容变体生成',
        '批量内容处理'
      ]
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
      title: '数据可视化分析',
      description: '直观的图表和报表，让您随时了解优化效果',
      details: [
        '实时数据仪表盘',
        '自定义时间范围',
        '数据导出功能',
        '趋势预测'
      ]
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: '团队协作',
      description: '完善的权限管理，高效的团队协作体验',
      details: [
        '多角色权限控制',
        '任务分配',
        '协作编辑',
        '操作日志'
      ]
    }
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
            <Link href="/features" className="text-blue-600 font-medium">功能</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">价格</Link>
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

      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            强大的功能，助力您的
            <span className="text-blue-600"> GEO 优化</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            全方位的生成式搜索引擎优化工具，让您的内容在AI搜索中脱颖而出
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">准备好开始您的GEO优化之旅了吗？</h2>
          <p className="text-lg text-gray-600 mb-8">现在就注册，享受14天免费试用</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg font-medium"
          >
            立即开始
            <ArrowRight className="w-5 h-5" />
          </Link>
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
