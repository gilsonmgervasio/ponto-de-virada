"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Activity,
  ArrowLeft,
  Moon,
  Zap,
  AlertCircle,
  TrendingUp,
  Calendar,
  Heart
} from "lucide-react"
import Link from "next/link"

export default function SaudePage() {
  const ferramentas = [
    {
      id: 'diario',
      titulo: 'Diário Corporal',
      descricao: 'Registre sinais físicos e emocionais diários',
      icon: Calendar,
      cor: 'from-[#3B82F6] to-[#1E40AF]'
    },
    {
      id: 'sintomas',
      titulo: 'Mapa de Sintomas',
      descricao: 'Conecte sintomas físicos com estados emocionais',
      icon: AlertCircle,
      cor: 'from-[#2563EB] to-[#1E40AF]'
    },
    {
      id: 'historico',
      titulo: 'Histórico de Picos',
      descricao: 'Visualize padrões de energia e quedas',
      icon: TrendingUp,
      cor: 'from-[#1E40AF] to-[#3B82F6]'
    },
    {
      id: 'energia',
      titulo: 'Monitor de Energia',
      descricao: 'Acompanhe níveis de energia ao longo do dia',
      icon: Zap,
      cor: 'from-[#3B82F6] to-[#2563EB]'
    }
  ]

  const sinaisAtuais = [
    { tipo: 'Sono', status: 'Irregular', nivel: 'alto', icon: Moon },
    { tipo: 'Energia', status: 'Baixa', nivel: 'medio', icon: Zap },
    { tipo: 'Tensão', status: 'Elevada', nivel: 'alto', icon: AlertCircle }
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
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Módulo Saúde
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">Tríade da Vida - Corpo</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Status Card */}
          <Card className="bg-gradient-to-br from-[#3B82F6]/20 to-[#1E40AF]/20 border-[#3B82F6]/30 p-6 md:p-8 backdrop-blur-xl">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Estado Atual do Corpo</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sinaisAtuais.map((sinal, idx) => {
                  const Icon = sinal.icon
                  return (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">{sinal.tipo}</p>
                          <p className="text-lg font-bold text-white">{sinal.status}</p>
                        </div>
                      </div>
                      {sinal.nivel === 'alto' && (
                        <div className="flex items-center gap-2 text-[#3B82F6] text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>Requer atenção</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Conexão Corpo-Emoção */}
          <Card className="bg-white/5 border-[#3B82F6]/30 p-6 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#3B82F6]" />
                <h3 className="text-xl font-bold text-white">Conexão Corpo-Emoção</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4 border-l-4 border-l-[#3B82F6]">
                  <p className="text-white font-semibold mb-2">Padrão Identificado</p>
                  <p className="text-gray-300 text-sm">
                    Seu sono irregular está diretamente relacionado a picos de ansiedade financeira. 
                    Nos últimos 7 dias, você dormiu menos de 6 horas em 4 noites após preocupações com dinheiro.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">Reação Corporal</p>
                  <p className="text-gray-300 text-sm">
                    Tensão muscular aumenta 60% após conflitos em relacionamentos. 
                    Seu corpo está sinalizando sobrecarga emocional através de dores nas costas e pescoço.
                  </p>
                </div>
              </div>
            </div>
          </Card>

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

          {/* Recomendações */}
          <Card className="bg-gradient-to-r from-[#3B82F6]/10 to-[#1E40AF]/10 border-[#3B82F6]/30 p-6 backdrop-blur-xl">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Recomendações para Hoje</h3>
              <div className="space-y-3">
                {[
                  "Estabeleça um horário fixo para dormir (sugestão: 23h)",
                  "Faça 3 pausas de 5 minutos durante o dia para respiração profunda",
                  "Evite cafeína após 16h para melhorar qualidade do sono",
                  "Pratique 10 minutos de alongamento antes de dormir"
                ].map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <div className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* CTA Premium */}
          <Card className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] border-none p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Monitoramento Completo de Saúde
            </h3>
            <p className="text-white/90 mb-6">
              Acesse histórico completo, análise de padrões e alertas personalizados
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
