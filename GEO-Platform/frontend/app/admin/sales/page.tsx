'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, Users, ShoppingCart, CreditCard, BarChart3, Settings, LogOut, Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail, Calendar, DollarSign, TrendingUp, UserPlus } from 'lucide-react'

export default function AdminSalesPage() {
  const [user, setUser] = useState<any>(null)
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const mockCustomers = [
    { id: 1, name: '科技公司A', contact: '张三', email: 'zhang@tech.com', phone: '13800000001', status: 'active', plan: '专业版', revenue: 9990, joinDate: '2026-01-15', lastContact: '2026-05-20' },
    { id: 2, name: '设计工作室B', contact: '李四', email: 'li@design.com', phone: '13800000002', status: 'active', plan: '入门版', revenue: 2990, joinDate: '2026-02-20', lastContact: '2026-05-18' },
    { id: 3, name: '咨询公司C', contact: '王五', email: 'wang@consult.com', phone: '13800000003', status: 'pending', plan: '-', revenue: 0, joinDate: '2026-05-10', lastContact: '-' },
    { id: 4, name: '教育机构D', contact: '赵六', email: 'zhao@edu.com', phone: '13800000004', status: 'inactive', plan: '入门版', revenue: 5980, joinDate: '2025-12-01', lastContact: '2026-04-15' },
    { id: 5, name: '医疗科技E', contact: '钱七', email: 'qian@med.com', phone: '13800000005', status: 'active', plan: '企业版', revenue: 29990, joinDate: '2026-03-05', lastContact: '2026-05-21' }
  ]

  const stats = {
    totalCustomers: 245,
    activeCustomers: 189,
    monthlyRevenue: '¥128,500',
    newLeads: 18
  }

  const adminNavItems = [
    { icon: Users, label: '用户管理', href: '/admin/users' },
    { icon: ShoppingCart, label: '销售管理', href: '/admin/sales', active: true },
    { icon: CreditCard, label: '财务管理', href: '/admin/finance' },
    { icon: BarChart3, label: '数据统计', href: '/admin/analytics' },
    { icon: Settings, label: '系统设置', href: '/admin/settings' },
  ]

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    inactive: 'bg-gray-100 text-gray-700'
  }

  const statusLabels: Record<string, string> = {
    active: '活跃',
    pending: '待跟进',
    inactive: '已流失'
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
            <h1 className="text-2xl font-bold text-gray-900">销售管理</h1>
            <p className="text-gray-600 mt-1">客户管理与销售跟进</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            添加客户
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</h3>
            <p className="text-gray-600 text-sm">总客户数</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.activeCustomers}</h3>
            <p className="text-gray-600 text-sm">活跃客户</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.monthlyRevenue}</h3>
            <p className="text-gray-600 text-sm">本月收入</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.newLeads}</h3>
            <p className="text-gray-600 text-sm">新增线索</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">客户列表</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索客户..."
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">客户名称</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">联系人</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">套餐</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">收入</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">加入日期</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{customer.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{customer.contact}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{customer.plan}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">¥{customer.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
                        {statusLabels[customer.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{customer.joinDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">最近跟进记录</h2>
            <div className="space-y-4">
              {[
                { customer: '科技公司A', date: '2026-05-21', action: '产品演示' },
                { customer: '医疗科技E', date: '2026-05-20', action: '续约沟通' },
                { customer: '设计工作室B', date: '2026-05-18', action: '问题解答' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.customer}</div>
                    <div className="text-sm text-gray-600">{item.action}</div>
                  </div>
                  <div className="text-sm text-gray-500">{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">待跟进</h2>
            <div className="space-y-4">
              {[
                { customer: '咨询公司C', priority: 'high', note: '跟进合同签署' },
                { customer: '教育机构D', priority: 'medium', note: '了解停用原因' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${item.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.customer}</div>
                    <div className="text-sm text-gray-600">{item.note}</div>
                  </div>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                    跟进
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
