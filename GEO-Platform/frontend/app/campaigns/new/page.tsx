'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, Plus, X } from 'lucide-react';
import { campaignAPI } from '../api/client';

export default function NewCampaignPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target_keywords: [''],
    target_platforms: ['chatgpt', 'gemini', 'claude'],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const platforms = [
    { id: 'chatgpt', name: 'ChatGPT', icon: '🤖' },
    { id: 'gemini', name: 'Google Gemini', icon: '🔷' },
    { id: 'claude', name: 'Claude', icon: '🧠' },
    { id: 'copilot', name: 'Microsoft Copilot', icon: '💻' },
    { id: 'perplexity', name: 'Perplexity', icon: '🔍' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const keywords = formData.target_keywords.filter(k => k.trim() !== '');
      
      await campaignAPI.create({
        name: formData.name,
        description: formData.description,
        target_keywords: keywords,
        target_platforms: formData.target_platforms,
        status: 'draft',
      });

      router.push('/campaigns');
    } catch (err: any) {
      setError(err.response?.data?.detail || '创建失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = () => {
    setFormData({
      ...formData,
      target_keywords: [...formData.target_keywords, ''],
    });
  };

  const removeKeyword = (index: number) => {
    setFormData({
      ...formData,
      target_keywords: formData.target_keywords.filter((_, i) => i !== index),
    });
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...formData.target_keywords];
    newKeywords[index] = value;
    setFormData({ ...formData, target_keywords: newKeywords });
  };

  const togglePlatform = (platformId: string) => {
    const newPlatforms = formData.target_platforms.includes(platformId)
      ? formData.target_platforms.filter(p => p !== platformId)
      : [...formData.target_platforms, platformId];
    setFormData({ ...formData, target_platforms: newPlatforms });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center gap-4">
          <Link
            href="/campaigns"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GEO Platform</span>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">新建推广计划</h1>
          <p className="text-gray-600">创建一个新的GEO推广计划，开始优化您的内容</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  计划名称 *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例如：产品A GEO推广计划"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  计划描述
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="描述您的推广计划目标和策略..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">目标关键词</h2>
            <p className="text-sm text-gray-600 mb-4">
              添加您希望在AI搜索中优化的关键词
            </p>
            
            <div className="space-y-3">
              {formData.target_keywords.map((keyword, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => updateKeyword(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="输入关键词，例如：人工智能"
                  />
                  {formData.target_keywords.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addKeyword}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                添加关键词
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">目标平台</h2>
            <p className="text-sm text-gray-600 mb-4">
              选择您希望在哪些AI平台进行优化
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => togglePlatform(platform.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.target_platforms.includes(platform.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{platform.icon}</div>
                  <div className="font-medium text-gray-900">{platform.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link
              href="/campaigns"
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? '创建中...' : '创建推广计划'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
