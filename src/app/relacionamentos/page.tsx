"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Heart,
  ArrowLeft,
  Users,
  MessageSquare,
  TrendingUp,
  Shield,
  AlertCircle,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function RelacionamentosPage() {
  const ferramentas = [
    {
      id: 'termometro',
      titulo: 'Termômetro de Conexão',
      descricao: 'Avalie a qualidade dos seus relacionamentos',
      icon: Heart,
      cor: 'from-[#3B82F6] to-[#1E40AF]'
    },
    {
      id: 'radares',
      titulo: 'Radares de Comportamento',
      descricao: 'Identifique padrões repetitivos em interações',
      icon: TrendingUp,
      cor: 'from-[#2563EB] to-[#1E40AF]'
    },
    {
      id: 'analisador',
      titulo: 'Analisador de Conversas',
      descricao: 'Entenda dinâmicas e gatilhos emocionais',
      icon: MessageSquare,
      cor: 'from-[#1E40AF] to-[#3B82F6]'
    },
    {
      id: 'limites',
      titulo: 'Mapa de Limites',
      descricao: 'Estabeleça e mantenha limites saudáveis',
      icon: Shield,
      cor: 'from-[#3B82F6] to-[#2563EB]'
    }
  ]

  const relacionamentosChave = [
    { 
      tipo: 'Família', 
      status: 'Tenso', 
      nivel: 'alto',
      descricao: 'Conflitos frequentes drenam energia emocional'
    },
    { 
      tipo: 'Trabalho', 
      status: 'Equilibrado', 
      nivel: 'baixo',
      descricao: 'Relações profissionais estáveis'
    },
    { 
      tipo: 'Amizades', 
      status: 'Distante', 
      nivel: 'medio',
      descricao: 'Falta de conexão genuína'
    }
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
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Módulo Relacionamentos
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">Tríade da Vida - Relações</p>
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
              <h2 className="text-2xl font-bold text-white">Mapa de Conexões</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relacionamentosChave.map((rel, idx) => (
                  <Card 
                    key={idx}
                    className={`bg-white/5 border-[#3B82F6]/30 p-5 backdrop-blur-xl ${
                      rel.nivel === 'alto' ? 'border-l-4 border-l-[#3B82F6]' : ''
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#3B82F6]" />
                          <span className="text-sm text-gray-400">{rel.tipo}</span>
                        </div>
                        {rel.nivel === 'alto' && (
                          <AlertCircle className="w-4 h-4 text-[#3B82F6]" />
                        )}
                      </div>
                      <p className="text-xl font-bold text-white">{rel.status}</p>
                      <p className="text-sm text-gray-300">{rel.descricao}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          {/* Padrões Identificados */}
          <Card className="bg-white/5 border-[#3B82F6]/30 p-6 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#3B82F6]" />
                <h3 className="text-xl font-bold text-white">Padrões Emocionais</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-[#3B82F6]/10 to-[#1E40AF]/10 rounded-lg p-4 border-l-4 border-l-[#3B82F6]">
                  <p className="text-white font-semibold mb-2">Fuga Emocional</p>
                  <p className="text-gray-300 text-sm">
                    Você tende a evitar conversas difíceis com familiares, acumulando frustrações. 
                    Isso gera explosões emocionais após 2-3 semanas de silêncio.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">Compensação Social</p>
                  <p className="text-gray-300 text-sm">
                    Após conflitos, você busca validação em amizades superficiais, 
                    mas isso não resolve o problema emocional de base.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">Limites Fracos</p>
                  <p className="text-gray-300 text-sm">
                    Dificuldade em dizer "não" resulta em sobrecarga emocional. 
                    Você assume responsabilidades de outros, gerando ressentimento.
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

          {/* Ações Recomendadas */}
          <Card className="bg-gradient-to-r from-[#3B82F6]/10 to-[#1E40AF]/10 border-[#3B82F6]/30 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-xl font-bold text-white">Ações para Hoje</h3>
                <div className="space-y-3">
                  {[
                    "Identifique 1 relacionamento que está drenando sua energia",
                    "Defina 1 limite claro que você precisa estabelecer",
                    "Comunique esse limite de forma respeitosa mas firme",
                    "Reserve 15 minutos para reflexão sobre suas necessidades emocionais"
                  ].map((acao, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                      <div className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{idx + 1}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{acao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* CTA Premium */}
          <Card className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] border-none p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Análise Profunda de Relacionamentos
            </h3>
            <p className="text-white/90 mb-6">
              Acesse análise completa de padrões, estratégias de comunicação e guias de limites saudáveis
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
