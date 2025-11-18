"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  DollarSign,
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Target,
  Brain,
  Zap,
  BarChart3
} from "lucide-react"
import Link from "next/link"

export default function FinanceiroPage() {
  const [radarAtivo, setRadarAtivo] = useState<string | null>(null)

  const ferramentas = [
    {
      id: 'radar',
      titulo: 'Radar Financeiro',
      descricao: 'Identifique padrões de gastos e comportamentos financeiros',
      icon: BarChart3,
      cor: 'from-[#3B82F6] to-[#1E40AF]'
    },
    {
      id: 'termometro',
      titulo: 'Termômetro de Ansiedade',
      descricao: 'Meça o nível de ansiedade relacionado às suas finanças',
      icon: AlertTriangle,
      cor: 'from-[#3B82F6] to-[#2563EB]'
    },
    {
      id: 'analisador',
      titulo: 'Analisador de Decisão',
      descricao: 'Avalie decisões financeiras antes de executá-las',
      icon: Brain,
      cor: 'from-[#2563EB] to-[#1E40AF]'
    },
    {
      id: 'metas',
      titulo: 'Planejamento de Metas',
      descricao: 'Defina e acompanhe metas financeiras de curto prazo',
      icon: Target,
      cor: 'from-[#1E40AF] to-[#3B82F6]'
    }
  ]

  const gastosRecentes = [
    { tipo: 'Impulsivo', valor: 'R$ 450', descricao: 'Compras online não planejadas', nivel: 'alto' },
    { tipo: 'Emocional', valor: 'R$ 280', descricao: 'Delivery após dia estressante', nivel: 'medio' },
    { tipo: 'Necessário', valor: 'R$ 1.200', descricao: 'Contas fixas do mês', nivel: 'baixo' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Módulo Financeiro
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">Tríade da Vida - Dinheiro</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Status Card */}
          <Card className="bg-gradient-to-br from-[#3B82F6]/20 to-[#1E40AF]/20 border-[#3B82F6]/30 p-6 md:p-8 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#60A5FA]">
                  <TrendingDown className="w-5 h-5" />
                  <span className="text-sm font-medium">Gastos Emocionais</span>
                </div>
                <p className="text-3xl font-bold text-white">R$ 730</p>
                <p className="text-sm text-gray-400">Últimos 7 dias</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#60A5FA]">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-medium">Nível de Ansiedade</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]" />
                  </div>
                  <span className="text-white font-semibold">Alto</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#60A5FA]">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Meta do Mês</span>
                </div>
                <p className="text-3xl font-bold text-white">45%</p>
                <p className="text-sm text-gray-400">Reduzir gastos impulsivos</p>
              </div>
            </div>
          </Card>

          {/* Análise de Gastos */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Análise de Comportamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gastosRecentes.map((gasto, idx) => (
                <Card 
                  key={idx}
                  className={`bg-white/5 border-[#3B82F6]/30 p-6 backdrop-blur-xl ${
                    gasto.nivel === 'alto' ? 'border-l-4 border-l-[#3B82F6]' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{gasto.tipo}</span>
                      {gasto.nivel === 'alto' && (
                        <AlertTriangle className="w-4 h-4 text-[#3B82F6]" />
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white">{gasto.valor}</p>
                    <p className="text-sm text-gray-300">{gasto.descricao}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Ferramentas */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Ferramentas Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ferramentas.map((ferramenta) => {
                const Icon = ferramenta.icon
                return (
                  <Card 
                    key={ferramenta.id}
                    className="bg-white/5 border-[#3B82F6]/30 hover:border-[#3B82F6] transition-all duration-300 cursor-pointer group p-6 backdrop-blur-xl"
                    onClick={() => setRadarAtivo(ferramenta.id)}
                  >
                    <div className="space-y-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${ferramenta.cor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {ferramenta.titulo}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {ferramenta.descricao}
                        </p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#3B82F6] text-white">
                        Acessar Ferramenta
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Insights */}
          <Card className="bg-gradient-to-r from-[#3B82F6]/10 to-[#1E40AF]/10 border-[#3B82F6]/30 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Insight do Dia</h3>
                <p className="text-gray-300">
                  Seus gastos impulsivos aumentam 40% após dias estressantes. Identifique gatilhos emocionais e crie estratégias de compensação saudáveis antes de gastar.
                </p>
                <Button className="mt-4 bg-white/10 hover:bg-white/20 text-white border border-[#3B82F6]/30">
                  Ver Análise Completa
                </Button>
              </div>
            </div>
          </Card>

          {/* CTA Premium */}
          <Card className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] border-none p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Desbloqueie Análises Avançadas
            </h3>
            <p className="text-white/90 mb-6">
              Acesse relatórios completos, previsões de desequilíbrio e estratégias personalizadas
            </p>
            <Button className="bg-white hover:bg-gray-100 text-[#1E40AF] font-bold px-8 py-6">
              Começar 7 Dias Grátis
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}
