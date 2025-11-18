import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export type Profile = {
  id: string
  nome: string | null
  nivel: string
  assinatura: boolean
  data_criacao: string
  updated_at: string
}

export type QuizResult = {
  id: string
  user_id: string
  area_fraca: string
  area_forte: string
  padrao: string
  tendencia: string
  prioridade: string
  respostas: Record<number, string>
  data_criacao: string
}

export type ChatMessage = {
  id: string
  user_id: string
  mensagem: string
  resposta: string
  data: string
}

export type ModuloDados = {
  id: string
  user_id: string
  tipo: 'financeiro' | 'saude' | 'relacionamentos'
  dados: any
  data: string
}

export type Relatorio = {
  id: string
  user_id: string
  dados_semanais: any
  data: string
}
