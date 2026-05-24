'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { systemAPI } from '../../api/client'
import { 
  Sparkles, 
  Palette, 
  Save, 
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react'

export default function ThemeConfigPage() {
  const router = useRouter()
  const [theme, setTheme] = useState({
    primary_color: '#2563eb',
    secondary_color: '#3b82f6',
    accent_color: '#a855f7',
    background_color: '#ffffff',
    text_color: '#1f2937',
    border_color: '#e5e7eb'
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    try {
      const response = await systemAPI.getTheme()
      if (response.data) {
        setTheme(response.data)
      }
    } catch (error) {
      console.error('Failed to load theme:', error)
      showMessage('error', '加载主题配置失败')
    } finally {
      setIsLoading(false)
    }
  }

  const handleColorChange = (key: string, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await systemAPI.updateTheme(theme)
      showMessage('success', '主题配置已保存')
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error('Failed to save theme:', error)
      showMessage('error', '保存主题配置失败')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setTheme({
      primary_color: '#2563eb',
      secondary_color: '#3b82f6',
      accent_color: '#a855f7',
      background_color: '#ffffff',
      text_color: '#1f2937',
      border_color: '#e5e7eb'
    })
    showMessage('success', '已重置为默认主题')
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const presets = [
    {
      name: '经典蓝',
      colors: {
        primary_color: '#2563eb',
        secondary_color: '#3b82f6',
        accent_color: '#a855f7',
        background_color: '#ffffff',
        text_color: '#1f2937',
        border_color: '#e5e7eb'
      }
    },
    {
      name: '商务蓝',
      colors: {
        primary_color: '#1e40af',
        secondary_color: '#3b82f6',
        accent_color: '#8b5cf6',
        background_color: '#f8fafc',
        text_color: '#1e293b',
        border_color: '#cbd5e1'
      }
    },
    {
      name: '现代蓝',
      colors: {
        primary_color: '#0ea5e9',
        secondary_color: '#06b6d4',
        accent_color: '#ec4899',
        background_color: '#f0f9ff',
        text_color: '#0f172a',
        border_color: '#e2e8f0'
      }
    },
    {
      name: '科技蓝',
      colors: {
        primary_color: '#0066ff',
        secondary_color: '#0080ff',
        accent_color: '#00d4ff',
        background_color: '#0a0a0f',
        text_color: '#e5e7eb',
        border_color: '#1f2937'
      }
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/users" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">GEO Platform</span>
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/admin/users" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">用户管理</Link>
                <Link href="/admin/sales" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">销售管理</Link>
                <Link href="/admin/finance" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">财务管理</Link>
                <Link href="/admin/theme" className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-blue-50">主题配置</Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                返回仪表盘
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">主题配置</h1>
            <p className="mt-2 text-sm text-gray-600">
              自定义平台的整体外观和配色方案
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span>{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  颜色配置
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      主色调
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.primary_color}
                        onChange={(e) => handleColorChange('primary_color', e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.primary_color}
                        onChange={(e) => handleColorChange('primary_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="#2563eb"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">用于按钮、链接和主要强调元素</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      次要色
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.secondary_color}
                        onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.secondary_color}
                        onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      强调色
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.accent_color}
                        onChange={(e) => handleColorChange('accent_color', e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.accent_color}
                        onChange={(e) => handleColorChange('accent_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">用于特殊标记和次要强调</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      背景色
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.background_color}
                        onChange={(e) => handleColorChange('background_color', e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.background_color}
                        onChange={(e) => handleColorChange('background_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      文字颜色
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.text_color}
                        onChange={(e) => handleColorChange('text_color', e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.text_color}
                        onChange={(e) => handleColorChange('text_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      边框颜色
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.border_color}
                        onChange={(e) => handleColorChange('border_color', e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.border_color}
                        onChange={(e) => handleColorChange('border_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? '保存中...' : '保存配置'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重置
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">预设主题</h2>
                <div className="space-y-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setTheme(preset.colors)}
                      className="w-full p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{preset.name}</span>
                      </div>
                      <div className="flex gap-1">
                        {Object.values(preset.colors).slice(0, 4).map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">预览效果</h2>
                <div 
                  className="p-4 rounded-lg border-2"
                  style={{
                    backgroundColor: theme.background_color,
                    borderColor: theme.border_color
                  }}
                >
                  <h3 
                    className="text-lg font-bold mb-2"
                    style={{ color: theme.text_color }}
                  >
                    示例标题
                  </h3>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: theme.text_color }}
                  >
                    这是一段示例文字，用于预览主题效果。
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded text-white text-sm"
                      style={{ backgroundColor: theme.primary_color }}
                    >
                      主按钮
                    </button>
                    <button
                      className="px-3 py-1 rounded text-sm border"
                      style={{ 
                        borderColor: theme.border_color,
                        color: theme.text_color
                      }}
                    >
                      次要按钮
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
