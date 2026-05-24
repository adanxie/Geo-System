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
  Upload,
  Eye,
  Edit,
  Trash2,
  Wand2,
  BarChart3
} from 'lucide-react';
import { contentAPI } from '../api/client';

export default function ContentsPage() {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await contentAPI.getAll();
      setContents(response.data);
    } catch (error) {
      console.error('获取内容失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (id: string) => {
    setAnalyzing(id);
    try {
      await contentAPI.analyze(id);
      fetchContents();
    } catch (error) {
      console.error('分析失败:', error);
    } finally {
      setAnalyzing(null);
    }
  };

  const handleOptimize = async (id: string) => {
    try {
      await contentAPI.optimize(id);
      fetchContents();
    } catch (error) {
      console.error('优化失败:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个内容吗？')) return;
    
    try {
      await contentAPI.delete(id);
      fetchContents();
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  const filteredContents = contents.filter(content => 
    content.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navItems = [
    { icon: LayoutDashboard, label: '仪表盘', href: '/dashboard' },
    { icon: Target, label: '推广计划', href: '/campaigns' },
    { icon: FileText, label: '内容管理', href: '/contents', active: true },
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">内容管理</h1>
            <p className="text-gray-600 mt-1">管理和优化您的推广内容</p>
          </div>
          <Link
            href="/contents/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            添加内容
          </Link>
        </div>

        {/* 搜索栏 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索内容..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 内容列表 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              全部内容 ({filteredContents.length})
            </h2>
          </div>
          
          {filteredContents.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无内容</h3>
              <p className="text-gray-600 mb-4">上传您的内容开始GEO优化</p>
              <Link
                href="/contents/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Upload className="w-4 h-4" />
                添加内容
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredContents.map((content) => (
                <div key={content.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{content.title}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {content.content_type || 'article'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {content.content?.substring(0, 150)}...
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        {content.geo_score && (
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">GEO评分: {content.geo_score}</span>
                          </div>
                        )}
                        <span className="text-gray-500">
                          {new Date(content.created_at).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleAnalyze(content.id)}
                        disabled={analyzing === content.id}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="AI分析"
                      >
                        <Wand2 className={`w-5 h-5 ${analyzing === content.id ? 'animate-spin' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleOptimize(content.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="优化"
                      >
                        <Sparkles className="w-5 h-5" />
                      </button>
                      <Link
                        href={`/contents/${content.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="查看"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(content.id)}
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
