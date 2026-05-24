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
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause
} from 'lucide-react';
import { campaignAPI } from '../api/client';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await campaignAPI.getAll();
      setCampaigns(response.data);
    } catch (error) {
      console.error('获取推广计划失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      if (newStatus === 'active') {
        await campaignAPI.start(id);
      } else if (newStatus === 'paused') {
        await campaignAPI.pause(id);
      }
      fetchCampaigns();
    } catch (error) {
      console.error('更新状态失败:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个推广计划吗？')) return;
    
    try {
      await campaignAPI.delete(id);
      fetchCampaigns();
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const navItems = [
    { icon: LayoutDashboard, label: '仪表盘', href: '/dashboard' },
    { icon: Target, label: '推广计划', href: '/campaigns', active: true },
    { icon: FileText, label: '内容管理', href: '/contents' },
    { icon: TrendingUp, label: '排名监控', href: '/platforms' },
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
            onClick={() => {
              localStorage.removeItem('access_token');
              localStorage.removeItem('user');
              router.push('/');
            }}
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
            <h1 className="text-2xl font-bold text-gray-900">推广计划</h1>
            <p className="text-gray-600 mt-1">管理和监控您的GEO推广活动</p>
          </div>
          <Link
            href="/campaigns/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            新建推广计划
          </Link>
        </div>

        {/* 筛选栏 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索推广计划..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部状态</option>
                <option value="active">进行中</option>
                <option value="paused">已暂停</option>
                <option value="draft">草稿</option>
              </select>
            </div>
          </div>
        </div>

        {/* 推广计划列表 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              全部推广计划 ({filteredCampaigns.length})
            </h2>
          </div>
          
          {filteredCampaigns.length === 0 ? (
            <div className="p-12 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无推广计划</h3>
              <p className="text-gray-600 mb-4">创建您的第一个GEO推广计划</p>
              <Link
                href="/campaigns/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                创建推广计划
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'active' 
                            ? 'bg-green-100 text-green-700'
                            : campaign.status === 'paused'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {campaign.status === 'active' ? '进行中' : 
                           campaign.status === 'paused' ? '已暂停' : '草稿'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {campaign.description || '暂无描述'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>关键词: {campaign.target_keywords?.join(', ') || '未设置'}</span>
                        <span>平台: {campaign.target_platforms?.length || 0} 个</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {campaign.status === 'active' ? (
                        <button
                          onClick={() => handleStatusChange(campaign.id, 'paused')}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="暂停"
                        >
                          <Pause className="w-5 h-5" />
                        </button>
                      ) : campaign.status !== 'draft' ? (
                        <button
                          onClick={() => handleStatusChange(campaign.id, 'active')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="启动"
                        >
                          <Play className="w-5 h-5" />
                        </button>
                      ) : null}
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="查看"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/campaigns/${campaign.id}/edit`}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(campaign.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
