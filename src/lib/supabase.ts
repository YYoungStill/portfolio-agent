import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ygjgnojmudttywrsclex.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnamdub2ptdWR0dHl3cnNjbGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNDUyOTgsImV4cCI6MjA3MDgyMTI5OH0.ns-fWBeLJ5vjxp9bSGuoSysTqKWC3n1SkcwNMrR0zwM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库表结构
export interface PortfolioData {
  id: string
  cash: {
    cny: number
    hkd: number
    usd: number
  }
  exchangeRates: {
    HKDCNY: number
    USDCNY: number
  }
  aShareFlows: Array<{
    date: string
    type: string
    amount: number
    note: string
  }>
  overseaFlows: Array<{
    date: string
    type: string
    amountHKD: number
    amountCNY: number
    rate: number
  }>
  holdings: {
    aShare: Array<{
      id: number
      name: string
      code: string
      currentPrice: number
      costPrice: number
      quantity: number
      fees: number
    }>
    hShare: Array<{
      id: number
      name: string
      code: string
      currentPrice: number
      costPrice: number
      quantity: number
      fees: number
    }>
    usShare: Array<{
      id: number
      name: string
      code: string
      currentPrice: number
      costPrice: number
      quantity: number
      fees: number
    }>
  }
  updatedAt: string
}
