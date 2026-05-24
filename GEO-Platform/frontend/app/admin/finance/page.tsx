'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, Users, ShoppingCart, CreditCard, BarChart3, Settings, LogOut, Search, Filter, Download, FileText, TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'

export default function AdminFinancePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('thisMonth')
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const mockTransactions = [
    { id: 1, type: 'subscription', date: '2026-05-21', customer: '科技公司A', amount: 999, status: 'success', method: '支付宝' },
    { id: 2, type: 'subscription', date: '2026-05-20', customer: '医疗科技E', amount: 2999, status: 'success', method: '微信支付' },
    { id: 3, type: 'refund', date: '2026-05-19', customer: '教育机构D', amount: -299, status: 'success', method: '原路退回' },
    { id: 4, type: 'subscription', date: '2026-05-18', customer: '设计工作室B', amount: 299, status: 'success', method: '支付宝' },
    { id: 5, type: 'subscription', date: '2026-05-17', customer: '零售企业F', amount: 999, status: 'pending', method: '银行转账' },
    { id: 6, type: 'addon', date: '2026-05-16', customer: '科技公司A', amount: 499, status: 'success', method: '支付宝' }
  ]

  const stats = {
    totalRevenue: '¥128,500',
    monthlyGrowth: '+12.5%',
    activeSubscriptions: 189,
    avgOrderValue: '¥680',
    newPayments: 12,
    pendingPayments: 3
  }

  const adminNavItems = [
    { icon: Users, label: '用户管理', href: '/admin/users' },
    { icon: ShoppingCart, label: '销售管理', href: '/admin/sales' },
    { icon: CreditCard, label: '财务管理', href: '/admin/finance', active: true },
    { icon: BarChart3, label: '数据统计', href: '/admin/analytics' },
    { icon: Settings, label: '系统设置', href: '/admin/settings' },
  ]

  const typeLabels: Record<string, string> = {
    subscription: '订阅',
    refund: '退款',
    addon: '增值服务'
  }

  const statusColors: Record<string, string> = {
    success: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700'
  }

  const statusLabels: Record<string, string> = {
    success: '成功',
    pending: '待处理',
    failed: '失败'
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">GEO Platform</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">管理后台</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors mb-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>返回客户端</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </div>

      <div className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">财务管理</h1>
            <p className="text-gray-600 mt-1">收入统计与交易记录</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">今天</option>
              <option value="thisWeek">本周</option>
              <option value="thisMonth">本月</option>
              <option value="thisQuarter">本季度</option>
              <option value="thisYear">本年</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              导出报表
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4" />
                {stats.monthlyGrowth}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</h3>
            <p className="text-gray-600 text-sm">总收入</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</h3>
            <p className="text-gray-600 text-sm">活跃订阅</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.avgOrderValue}</h3>
            <p className="text-gray-600 text-sm">平均订单金额</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.newPayments}</h3>
            <p className="text-gray-600 text-sm">新增付款</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</h3>
            <p className="text-gray-600 text-sm">待处理</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">收入趋势</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">收入趋势图表</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">套餐分布</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">套餐分布图表</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">交易记录</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索交易..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">交易日期</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">客户</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">金额</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">支付方式</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{transaction.customer}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{typeLabels[transaction.type] || transaction.type}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount >= 0 ? '+' : ''}¥{Math.abs(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{transaction.method}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[transaction.status]}`}>
                        {statusLabels[transaction.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          详情
                        </button>
                        {transaction.status === 'pending' && (
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            确认
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-gray-900">开具发票</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-gray-900">导出对账单</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-gray-900">手动入账</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <span className="text-gray-900">财务分析</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">套餐收入统计</h2>
            <div className="space-y-4">
              {[
                { plan: '企业版', revenue: '¥78,000', percentage: 60, color: 'purple' },
                { plan: '专业版', revenue: '¥35,000', percentage: 27, color: 'blue' },
                { plan: '入门版', revenue: '¥15,500', percentage: 13, color: 'green' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900">{item.plan}</span>
                      <span className="text-gray-600">{item.revenue}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color === 'purple' ? 'bg-purple-500' : item.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-gray-500 w-12 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
