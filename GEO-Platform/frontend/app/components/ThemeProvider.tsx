'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { systemAPI } from '../api/client'

interface ThemeConfig {
  primary_color: string
  secondary_color: string
  accent_color: string
  background_color: string
  text_color: string
  border_color: string
}

interface ThemeContextType {
  theme: ThemeConfig
  updateTheme: (newTheme: Partial<ThemeConfig>) => void
  isLoading: boolean
}

const defaultTheme: ThemeConfig = {
  primary_color: '#2563eb',
  secondary_color: '#3b82f6',
  accent_color: '#a855f7',
  background_color: '#ffffff',
  text_color: '#1f2937',
  border_color: '#e5e7eb'
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {},
  isLoading: false
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTheme()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      applyTheme(theme)
    }
  }, [theme, isLoading])

  const loadTheme = async () => {
    try {
      const response = await systemAPI.getTheme()
      if (response.data) {
        setTheme(response.data)
      }
    } catch (error) {
      console.error('Failed to load theme:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyTheme = (themeConfig: ThemeConfig) => {
    const root = document.documentElement
    root.style.setProperty('--primary-color', themeConfig.primary_color)
    root.style.setProperty('--secondary-color', themeConfig.secondary_color)
    root.style.setProperty('--accent-color', themeConfig.accent_color)
    root.style.setProperty('--background-color', themeConfig.background_color)
    root.style.setProperty('--text-color', themeConfig.text_color)
    root.style.setProperty('--border-color', themeConfig.border_color)
    
    document.body.style.backgroundColor = themeConfig.background_color
    document.body.style.color = themeConfig.text_color
  }

  const updateTheme = async (newTheme: Partial<ThemeConfig>) => {
    const updatedTheme = { ...theme, ...newTheme }
    setTheme(updatedTheme)
    
    try {
      await systemAPI.updateTheme(updatedTheme)
    } catch (error) {
      console.error('Failed to save theme:', error)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}
