import { useState, useEffect } from 'react'
import { supabase, PortfolioData } from '@/lib/supabase'
import { toast } from 'sonner'

const PORTFOLIO_ID = 'main-portfolio' // 固定ID，所有用户共享同一份数据

export function usePortfolioSync() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)

  // 加载数据
  const loadData = async () => {
    try {
      setIsLoading(true)
      
      const { data, error } = await supabase
        .from('portfolio_data')
        .select('*')
        .eq('id', PORTFOLIO_ID)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = 没有找到记录
        throw error
      }

      if (data) {
        // 更新本地存储
        localStorage.setItem('cash', JSON.stringify(data.cash))
        localStorage.setItem('exchangeRates', JSON.stringify(data.exchangeRates))
        localStorage.setItem('aShareFlows', JSON.stringify(data.aShareFlows))
        localStorage.setItem('overseaFlows', JSON.stringify(data.overseaFlows))
        localStorage.setItem('holdings', JSON.stringify(data.holdings))
        setLastSync(new Date(data.updatedAt))
        toast.success('数据已从云端同步')
      }
    } catch (error) {
      console.error('加载数据失败:', error)
      toast.error('加载数据失败，使用本地数据')
    } finally {
      setIsLoading(false)
    }
  }

  // 保存数据
  const saveData = async () => {
    try {
      setIsSaving(true)
      
      // 从本地存储获取数据
      const cash = JSON.parse(localStorage.getItem('cash') || '{}')
      const exchangeRates = JSON.parse(localStorage.getItem('exchangeRates') || '{}')
      const aShareFlows = JSON.parse(localStorage.getItem('aShareFlows') || '[]')
      const overseaFlows = JSON.parse(localStorage.getItem('overseaFlows') || '[]')
      const holdings = JSON.parse(localStorage.getItem('holdings') || '{}')

      const portfolioData: PortfolioData = {
        id: PORTFOLIO_ID,
        cash,
        exchangeRates,
        aShareFlows,
        overseaFlows,
        holdings,
        updatedAt: new Date().toISOString()
      }

      const { error } = await supabase
        .from('portfolio_data')
        .upsert(portfolioData, { onConflict: 'id' })

      if (error) throw error

      setLastSync(new Date())
      toast.success('数据已保存到云端')
    } catch (error) {
      console.error('保存数据失败:', error)
      toast.error('保存数据失败')
    } finally {
      setIsSaving(false)
    }
  }

  // 监听实时更新
  useEffect(() => {
    const channel = supabase
      .channel('portfolio-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_data',
          filter: `id=eq.${PORTFOLIO_ID}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const newData = payload.new as PortfolioData
            // 更新本地存储
            localStorage.setItem('cash', JSON.stringify(newData.cash))
            localStorage.setItem('exchangeRates', JSON.stringify(newData.exchangeRates))
            localStorage.setItem('aShareFlows', JSON.stringify(newData.aShareFlows))
            localStorage.setItem('overseaFlows', JSON.stringify(newData.overseaFlows))
            localStorage.setItem('holdings', JSON.stringify(newData.holdings))
            setLastSync(new Date(newData.updatedAt))
            toast.success('检测到数据更新，已自动同步')
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // 初始加载
  useEffect(() => {
    loadData()
  }, [])

  return {
    isLoading,
    isSaving,
    lastSync,
    loadData,
    saveData
  }
}
