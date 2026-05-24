'use client'

import Link from 'next/link'
import { Sparkles, BookOpen, Search, ArrowLeft, Target, FileText, TrendingUp, Users } from 'lucide-react'

export default function DocsPage() {
  const sections = [
    {
      title: '快速开始',
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        { title: '账户注册与登录', href: '#register' },
        { title: '创建第一个推广计划', href: '#first-campaign' },
        { title: '添加内容', href: '#add-content' },
        { title: '查看排名数据', href: '#view-rankings' }
      ]
    },
    {
      title: '用户指南',
      icon: <FileText className="w-5 h-5" />,
      items: [
        { title: '推广计划管理', href: '#campaign-management' },
        { title: '内容优化技巧', href: '#content-optimization' },
        { title: '关键词研究', href: '#keyword-research' },
        { title: '数据分析与报告', href: '#analytics' }
      ]
    },
    {
      title: '进阶功能',
      icon: <Target className="w-5 h-5" />,
      items: [
        { title: 'AI内容生成', href: '#ai-content' },
        { title: '团队协作', href: '#team-collab' },
        { title: 'API接入', href: '#api-access' },
        { title: '高级配置', href: '#advanced-config' }
      ]
    },
    {
      title: '最佳实践',
      icon: <TrendingUp className="w-5 h-5" />,
      items: [
        { title: 'GEO策略指南', href: '#geo-strategy' },
        { title: '内容创作规范', href: '#content-guidelines' },
        { title: '平台优化技巧', href: '#platform-tips' },
        { title: '成功案例分享', href: '#success-stories' }
      ]
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
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">价格</Link>
            <Link href="/docs" className="text-blue-600 font-medium">文档</Link>
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

      <div className="flex pt-20">
        <aside className="fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-gray-100 overflow-y-auto p-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <nav className="space-y-8">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
                  {section.icon}
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">帮助文档</h1>
            <p className="text-lg text-gray-600 mb-12">
              详细的用户指南和参考文档，帮助您充分利用 GEO Platform 的所有功能
            </p>

            <div className="space-y-12">
              <section id="quick-start">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">快速开始</h2>
                
                <div className="space-y-6">
                  <div id="register" className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">账户注册与登录</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>1. 访问 GEO Platform 官网，点击右上角"免费试用"按钮</p>
                      <p>2. 填写您的邮箱和密码完成注册</p>
                      <p>3. 点击邮箱中的确认链接激活账户</p>
                      <p>4. 使用您的邮箱和密码登录系统</p>
                    </div>
                  </div>

                  <div id="first-campaign" className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">创建第一个推广计划</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>1. 登录后进入用户仪表盘</p>
                      <p>2. 点击"新建推广计划"按钮</p>
                      <p>3. 填写计划名称和描述</p>
                      <p>4. 添加目标关键词</p>
                      <p>5. 选择要优化的AI平台</p>
                      <p>6. 点击"创建"完成设置</p>
                    </div>
                  </div>

                  <div id="add-content" className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">添加内容</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>1. 进入"内容管理"页面</p>
                      <p>2. 点击"添加内容"按钮</p>
                      <p>3. 输入或粘贴您的内容</p>
                      <p>4. 选择内容类型</p>
                      <p>5. 关联到相应的推广计划</p>
                    </div>
                  </div>

                  <div id="view-rankings" className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">查看排名数据</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>1. 进入"排名监控"页面</p>
                      <p>2. 选择要查看的推广计划</p>
                      <p>3. 查看各平台的排名数据</p>
                      <p>4. 点击图表查看详细趋势</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="user-guide">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">用户指南</h2>
                
                <div id="campaign-management" className="bg-white p-6 rounded-xl border border-gray-100 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">推广计划管理</h3>
                  <div className="text-gray-600 space-y-3">
                    <p>您可以创建、编辑、暂停和删除推广计划。每个计划可以配置：</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>目标关键词列表</li>
                      <li>监控的AI平台</li>
                      <li>预算设置</li>
                      <li>优化目标</li>
                    </ul>
                  </div>
                </div>

                <div id="content-optimization" className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">内容优化技巧</h3>
                  <div className="text-gray-600 space-y-3">
                    <p>使用我们的AI分析工具获取优化建议：</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>内容质量评估</li>
                      <li>关键词密度分析</li>
                      <li>结构优化建议</li>
                      <li>AI友好度评分</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="flex items-center justify-center gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3 mx-auto">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-sm">还有问题？</p>
                  <Link href="/about" className="text-blue-600 hover:text-blue-700 font-medium">联系支持</Link>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3 mx-auto">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-sm">加入社区</p>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">讨论论坛</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto ml-64">
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
