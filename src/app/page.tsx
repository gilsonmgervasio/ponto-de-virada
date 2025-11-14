"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, TrendingUp, Heart, Activity } from "lucide-react"

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(true)
  const [quizStep, setQuizStep] = useState(0)
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null)

  const quizQuestions = [
    {
      question: "Como você se sente hoje?",
      options: ["Ansioso", "Confuso", "Sobrecarregado", "Focado"]
    },
    {
      question: "Qual área precisa de mais atenção agora?",
      options: ["Financeiro", "Saúde", "Relacionamentos", "Todas"]
    },
    {
      question: "Qual seu principal objetivo?",
      options: ["Reduzir ansiedade", "Tomar melhores decisões", "Criar rotina", "Ter clareza"]
    }
  ]

  const handleQuizComplete = () => {
    setShowQuiz(false)
  }

  const pillars = [
    {
      id: "financeiro",
      title: "Mapa do Movimento",
      subtitle: "Financeiro",
      icon: TrendingUp,
      color: "from-amber-400 to-yellow-600",
      tools: ["Termômetro Financeiro", "Radar de Gastos Emocionais", "Mapa de Ações Prioritárias"]
    },
    {
      id: "saude",
      title: "Termômetro Vital",
      subtitle: "Saúde",
      icon: Activity,
      color: "from-cyan-400 to-blue-600",
      tools: ["Escaneamento de Energia", "Monitor de Foco", "Gerador de Rotina Essencial"]
    },
    {
      id: "relacionamentos",
      title: "Mapa de Conexões",
      subtitle: "Relacionamentos",
      icon: Heart,
      color: "from-pink-400 to-red-600",
      tools: ["Analisador de Conflitos", "Bússola de Limites", "Escala de Equilíbrio"]
    }
  ]

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border-[#D4AF37] p-8 md:p-12">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#D4AF37] to-yellow-500 bg-clip-text text-transparent">
                Ponto de Virada
              </h1>
              <p className="text-gray-400 text-lg">
                LAPV – Lógica de Autodomínio Ponto de Virada
              </p>
            </div>

            {quizStep < quizQuestions.length ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Pergunta {quizStep + 1} de {quizQuestions.length}
                  </span>
                  <div className="flex gap-2">
                    {quizQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 w-8 rounded-full ${
                          idx <= quizStep ? "bg-[#D4AF37]" : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-white">
                  {quizQuestions[quizStep].question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizQuestions[quizStep].options.map((option, idx) => (
                    <Button
                      key={idx}
                      onClick={() => {
                        if (quizStep === quizQuestions.length - 1) {
                          handleQuizComplete()
                        } else {
                          setQuizStep(quizStep + 1)
                        }
                      }}
                      className="h-20 text-lg bg-gray-800 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-yellow-600 border border-gray-700 hover:border-[#D4AF37] transition-all duration-300"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-yellow-500 bg-clip-text text-transparent">
            Ponto de Virada
          </h1>
          <Button className="bg-gradient-to-r from-[#D4AF37] to-yellow-600 hover:from-yellow-600 hover:to-[#D4AF37] text-black font-semibold">
            Assinar Premium
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-12">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Escolha seu caminho
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Três pilares para transformar sua vida através do autodomínio e clareza
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <Card
                  key={pillar.id}
                  className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer group p-6 space-y-6"
                  onClick={() => setSelectedPillar(pillar.id)}
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-400">{pillar.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {pillar.tools.map((tool, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-500 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        {tool}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gray-800 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-yellow-600 border border-gray-700 hover:border-[#D4AF37]">
                    Acessar
                  </Button>
                </Card>
              )
            })}
          </div>

          {/* Chat CTA */}
          <Card className="bg-gradient-to-r from-[#D4AF37] to-yellow-600 border-none p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-black">
                  Converse com seu Mentor Direto
                </h3>
                <p className="text-black/80 text-lg">
                  Diagnóstico + Ação prática em 3 blocos diretos
                </p>
              </div>
              <Button className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-lg font-semibold flex items-center gap-3 shadow-2xl">
                <MessageCircle className="w-6 h-6" />
                Iniciar Chat
              </Button>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Painel de Autodomínio",
              "Diário com IA",
              "Relatórios Semanais",
              "Radar de Decisões"
            ].map((feature, idx) => (
              <Card
                key={idx}
                className="bg-gray-900 border-gray-800 p-6 text-center hover:border-[#D4AF37] transition-all duration-300"
              >
                <p className="text-white font-semibold">{feature}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500">
          <p className="text-sm">
            7 dias gratuitos • Depois R$ 29,90/mês
          </p>
          <p className="text-xs mt-2">
            Metodologia LAPV – Lógica de Autodomínio Ponto de Virada
          </p>
        </div>
      </footer>
    </div>
  )
}
