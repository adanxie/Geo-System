'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  LayoutDashboard, 
  Target, 
  FileText, 
  TrendingUp, 
  Settings, 
  LogOut,
  Plus,
  BarChart3,
  Eye
} from 'lucide-react';
import { userAPI, campaignAPI, contentAPI } from '../api/client';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalContents: 0,
    avgScore: 0
  });
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [campaignsRes, contentsRes] = await Promise.all([
        campaignAPI.getAll(),
        contentAPI.getAll()
      ]);

      const campaignsData = campaignsRes.data;
      const contentsData = contentsRes.data;

      setCampaigns(campaignsData);
      setContents(contentsData);

      setStats({
        totalCampaigns: campaignsData.length,
        activeCampaigns: campaignsData.filter((c: any) => c.status === 'active').length,
        totalContents: contentsData.length,
        avgScore: contentsData.length > 0 
          ? Math.round(contentsData.reduce((sum: number, c: any) => sum + (c.geo_score || 0), 0) / contentsData.length)
          : 0
      });
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: '仪表盘', href: '/dashboard', active: true },
    { icon: Target, label: '推广计划', href: '/campaigns' },
    { icon: FileText, label: '内容管理', href: '/contents' },
    { icon: TrendingUp, label: '排名监控', href: '/platforms' },
    { icon: BarChart3, label: '数据分析', href: '/analytics' },
    { icon: Settings, label: '设置', href: '/settings' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 侧边栏 */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
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

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="ml-64 p-8">
        {/* 顶部栏 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
            <p className="text-gray-600 mt-1">欢迎回来，{user?.name || user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/campaigns/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              新建推广计划
            </Link>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+12%</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalCampaigns}</h3>
            <p className="text-gray-600 text-sm mt-1">总推广计划</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">活跃</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.activeCampaigns}</h3>
            <p className="text-gray-600 text-sm mt-1">正在执行</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-purple-600 text-sm font-medium">内容</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalContents}</h3>
            <p className="text-gray-600 text-sm mt-1">优化内容</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-orange-600 text-sm font-medium">平均</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.avgScore}</h3>
            <p className="text-gray-600 text-sm mt-1">GEO 评分</p>
          </div>
        </div>

        {/* 近期推广计划 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">近期推广计划</h2>
            <Link href="/campaigns" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              查看全部 →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {campaigns.length === 0 ? (
              <div className="p-12 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无推广计划</h3>
                <p className="text-gray-600 mb-4">创建您的第一个GEO推广计划，开始优化之旅</p>
                <Link
                  href="/campaigns/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  创建推广计划
                </Link>
              </div>
            ) : (
              campaigns.slice(0, 5).map((campaign) => (
                <div key={campaign.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        关键词: {campaign.target_keywords?.join(', ') || '未设置'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-700'
                          : campaign.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {campaign.status === 'active' ? '进行中' : 
                         campaign.status === 'paused' ? '已暂停' : '草稿'}
                      </span>
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        查看 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
