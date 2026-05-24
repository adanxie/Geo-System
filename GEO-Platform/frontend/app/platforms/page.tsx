'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, LayoutDashboard, Target, FileText, TrendingUp, Settings, LogOut, ChevronUp, ChevronDown, ArrowUp, ArrowDown, ArrowRight, AlertCircle, Search, Filter } from 'lucide-react'
import { platformAPI, rankingAPI } from '../../api/client'

export default function PlatformsPage() {
  const [user, setUser] = useState<any>(null)
  const [platforms, setPlatforms] = useState<any[]>([])
  const [rankings, setRankings] = useState<any[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<string>('7d')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [platformsRes, rankingsRes] = await Promise.all([
        platformAPI.getAll(),
        rankingAPI.getRecords('')
      ])
      setPlatforms(platformsRes.data)
      setRankings(rankingsRes.data)
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const mockRankings = [
    { id: 1, keyword: 'AI营销', rank: 2, platform: 'ChatGPT', change: '+1', changeType: 'up', lastCheck: '2分钟前' },
    { id: 2, keyword: '生成式SEO', rank: 1, platform: 'Gemini', change: '-', changeType: 'same', lastCheck: '5分钟前' },
    { id: 3, keyword: '内容优化', rank: 5, platform: 'Claude', change: '-2', changeType: 'down', lastCheck: '10分钟前' },
    { id: 4, keyword: 'GEO策略', rank: 3, platform: 'ChatGPT', change: '+2', changeType: 'up', lastCheck: '15分钟前' },
    { id: 5, keyword: 'AI搜索', rank: 4, platform: 'Copilot', change: '+1', changeType: 'up', lastCheck: '20分钟前' },
    { id: 6, keyword: '优化技巧', rank: 7, platform: 'Gemini', change: '-1', changeType: 'down', lastCheck: '30分钟前' }
  ]

  const mockStats = {
    totalKeywords: 15,
    top10: 8,
    avgRank: 4.5,
    improved: 5,
    dropped: 3,
    same: 7
  }

  const navItems = [
    { icon: LayoutDashboard, label: '仪表盘', href: '/dashboard' },
    { icon: Target, label: '推广计划', href: '/campaigns' },
    { icon: FileText, label: '内容管理', href: '/contents' },
    { icon: TrendingUp, label: '排名监控', href: '/platforms', active: true },
    { icon: Settings, label: '设置', href: '/settings' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  const displayRankings = selectedPlatform === 'all' 
    ? mockRankings 
    : mockRankings.filter(r => r.platform === selectedPlatform)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GEO Platform</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </div>

      <div className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">排名监控</h1>
            <p className="text-gray-600 mt-1">实时追踪您的关键词在各AI平台的排名</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalKeywords}</h3>
            <p className="text-gray-600 text-sm">关键词总数</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ArrowUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+{mockStats.improved}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.top10}</h3>
            <p className="text-gray-600 text-sm">TOP 10</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.avgRank}</h3>
            <p className="text-gray-600 text-sm">平均排名</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-red-600 text-sm font-medium">-{mockStats.dropped}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.dropped}</h3>
            <p className="text-gray-600 text-sm">排名下降</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">排名趋势</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1d">今天</option>
              <option value="7d">最近7天</option>
              <option value="30d">最近30天</option>
              <option value="90d">最近90天</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">排名趋势图表</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">关键词排名</h2>
            <div className="flex items-center gap-4">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部平台</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="Gemini">Gemini</option>
                <option value="Claude">Claude</option>
                <option value="Copilot">Copilot</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                筛选
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">关键词</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">平台</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">当前排名</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">变化</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">最后检查</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayRankings.map((ranking) => (
                  <tr key={ranking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{ranking.keyword}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{ranking.platform}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-gray-900">#{ranking.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {ranking.changeType === 'up' ? (
                          <><ChevronUp className="w-4 h-4 text-green-500" /><span className="text-green-600 font-medium">{ranking.change}</span></>
                        ) : ranking.changeType === 'down' ? (
                          <><ChevronDown className="w-4 h-4 text-red-500" /><span className="text-red-600 font-medium">{ranking.change}</span></>
                        ) : (
                          <><ArrowRight className="w-4 h-4 text-gray-400" /><span className="text-gray-500 font-medium">{ranking.change}</span></>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{ranking.lastCheck}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">平台概览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'ChatGPT', icon: '🤖', count: 12, avg: 4.2 },
              { name: 'Gemini', icon: '🔷', count: 10, avg: 3.8 },
              { name: 'Claude', icon: '🧠', count: 8, avg: 4.5 },
              { name: 'Copilot', icon: '💻', count: 5, avg: 4.0 }
            ].map((platform, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg text-center">
                <div className="text-3xl mb-2">{platform.icon}</div>
                <h4 className="font-medium text-gray-900">{platform.name}</h4>
                <p className="text-sm text-gray-600">{platform.count} 关键词</p>
                <p className="text-lg font-bold text-blue-600">平均 #{platform.avg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
