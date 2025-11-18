"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  MessageCircle, 
  DollarSign, 
  Heart, 
  Activity,
  TrendingUp,
  Brain,
  Target,
  Shield,
  Zap,
  BarChart3,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { getCurrentUser, signOut } from "@/lib/auth"

export default function Home() {
  const router = useRouter()
  const [showQuiz, setShowQuiz] = useState(true)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        // Usar replace em vez de push para evitar problemas de navegação
        router.replace("/login")
        return
      }

      // Buscar perfil do usuário com tratamento de erro
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (!error && profile) {
          setUserName(profile.nome || "")
        }
      } catch (profileError) {
        console.error("Erro ao buscar perfil:", profileError)
        // Continua mesmo se não conseguir buscar o perfil
      }

      // Verificar se já fez o quiz com tratamento de erro
      try {
        const { data: quizResult, error } = await supabase
          .from("quiz_results")
          .select("*")
          .eq("user_id", user.id)
          .order("data_criacao", { ascending: false })
          .limit(1)
          .single()

        if (!error && quizResult) {
          setShowQuiz(false)
        }
      } catch (quizError) {
        console.error("Erro ao buscar quiz:", quizError)
        // Se não encontrar quiz, mantém showQuiz como true
      }

      setLoading(false)
    } catch (error) {
      console.error("Erro ao verificar usuário:", error)
      setLoading(false)
      // Redirecionar para login em caso de erro
      router.replace("/login")
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.replace("/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const quizQuestions = [
    {
      question: "Qual área da sua vida mais exige atenção hoje?",
      options: ["Financeiro", "Saúde", "Relacionamentos", "Todas igualmente"]
    },
    {
      question: "Você toma decisões de forma:",
      options: ["Rápida", "Média", "Lenta", "Depende da situação"]
    },
    {
      question: "Você costuma sentir ansiedade:",
      options: ["Antes das decisões", "Depois das decisões", "Durante o processo", "Raramente sinto"]
    },
    {
      question: "Quando algo dá errado, você tende a:",
      options: ["Evitar", "Confrontar", "Compensar", "Ignorar"]
    },
    {
      question: "Como está sua relação com dinheiro atualmente?",
      options: ["Estável e controlada", "Instável e preocupante", "Em transição", "Não sei avaliar"]
    },
    {
      question: "Como está seu corpo? Sono, energia e rotina?",
      options: ["Excelente", "Razoável", "Precisa melhorar", "Crítico"]
    },
    {
      question: "Qual sua maior dor emocional hoje?",
      options: ["Ansiedade", "Insegurança", "Sobrecarga", "Falta de direção"]
    },
    {
      question: "Qual seu objetivo principal nos próximos 90 dias?",
      options: ["Estabilidade financeira", "Saúde e bem-estar", "Relacionamentos saudáveis", "Clareza e foco"]
    }
  ]

  const analyzeQuizResults = (answers: Record<number, string>) => {
    // Análise simples baseada nas respostas
    const areaFraca = answers[0] || "Financeiro"
    const areaForte = areaFraca === "Financeiro" ? "Saúde" : "Financeiro"
    const padrao = answers[3] === "Evitar" ? "Fuga" : answers[3] === "Confrontar" ? "Enfrentamento" : "Compensação"
    const tendencia = answers[2]?.includes("Antes") ? "Ansiedade antecipatória" : "Reflexão posterior"
    const prioridade = answers[7] || "Clareza e foco"

    return { areaFraca, areaForte, padrao, tendencia, prioridade }
  }

  const handleQuizAnswer = async (answer: string) => {
    const newAnswers = { ...quizAnswers, [quizStep]: answer }
    setQuizAnswers(newAnswers)
    
    if (quizStep === quizQuestions.length - 1) {
      // Quiz completo - salvar no banco
      try {
        const user = await getCurrentUser()
        if (!user) return

        const analysis = analyzeQuizResults(newAnswers)

        await supabase.from("quiz_results").insert({
          user_id: user.id,
          area_fraca: analysis.areaFraca,
          area_forte: analysis.areaForte,
          padrao: analysis.padrao,
          tendencia: analysis.tendencia,
          prioridade: analysis.prioridade,
          respostas: newAnswers
        })

        setTimeout(() => setShowQuiz(false), 500)
      } catch (error) {
        console.error("Erro ao salvar quiz:", error)
      }
    } else {
      setQuizStep(quizStep + 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border-[#3B82F6]/30 p-8 md:p-12 shadow-2xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] mb-4">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                Ponto de Virada
              </h1>
              <p className="text-gray-300 text-lg">
                Diagnóstico Inicial - Constelações de Rotina
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  Pergunta {quizStep + 1} de {quizQuestions.length}
                </span>
                <span className="text-[#3B82F6] font-semibold">
                  {Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] transition-all duration-500 ease-out"
                  style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-white text-center">
                {quizQuestions[quizStep].question}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {quizQuestions[quizStep].options.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleQuizAnswer(option)}
                    className="h-auto py-6 px-6 text-base md:text-lg bg-white/5 hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#1E40AF] border-2 border-gray-700 hover:border-[#3B82F6] transition-all duration-300 text-white font-medium rounded-xl"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 pt-4">
              {quizQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === quizStep 
                      ? "w-8 bg-[#3B82F6]" 
                      : idx < quizStep 
                      ? "w-2 bg-[#3B82F6]" 
                      : "w-2 bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Ponto de Virada
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">
                {userName ? `Olá, ${userName}` : "Constelações de Rotina"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#3B82F6] text-white font-semibold px-6 shadow-lg shadow-[#3B82F6]/30">
              Premium - 7 dias grátis
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-12">
          {/* Welcome Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Bem-vindo ao seu Orientador Interno
            </h2>
            <p className="text-gray-300 text-lg md:text-xl">
              Equilibre Finanças, Emoções e Relacionamentos com orientação inteligente e personalizada
            </p>
          </div>

          {/* Daily Panel */}
          <Card className="bg-gradient-to-br from-[#3B82F6]/20 to-[#1E40AF]/20 border-[#3B82F6]/30 p-6 md:p-8 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#60A5FA]">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Foco do Dia</span>
                </div>
                <p className="text-white font-semibold text-lg">Estabilidade Financeira</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#60A5FA]">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm font-medium">Nível de Equilíbrio</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]" />
                  </div>
                  <span className="text-white font-semibold">65%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#60A5FA]">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">Prioridade</span>
                </div>
                <p className="text-white font-semibold text-lg">Reduzir gastos emocionais</p>
              </div>
            </div>
          </Card>

          {/* Main Modules - Tríade da Vida */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-center">
              Tríade da Vida
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Financeiro */}
              <Link href="/financeiro">
                <Card className="bg-white/5 border-[#3B82F6]/30 hover:border-[#3B82F6] transition-all duration-300 cursor-pointer group p-6 space-y-6 backdrop-blur-xl hover:shadow-2xl hover:shadow-[#3B82F6]/20">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#3B82F6]/30">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Módulo Financeiro
                      </h3>
                      <p className="text-gray-400">Dinheiro</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-300">Ferramentas disponíveis:</p>
                    {[
                      "Radar Financeiro",
                      "Termômetro de Ansiedade",
                      "Analisador de Decisão",
                      "Planejamento de Metas"
                    ].map((tool, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-400 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        {tool}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#3B82F6] text-white font-semibold shadow-lg shadow-[#3B82F6]/30">
                    Acessar Módulo
                  </Button>
                </Card>
              </Link>

              {/* Saúde */}
              <Link href="/saude">
                <Card className="bg-white/5 border-[#3B82F6]/30 hover:border-[#3B82F6] transition-all duration-300 cursor-pointer group p-6 space-y-6 backdrop-blur-xl hover:shadow-2xl hover:shadow-[#3B82F6]/20">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#3B82F6]/30">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Módulo Saúde
                      </h3>
                      <p className="text-gray-400">Corpo</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-300">Ferramentas disponíveis:</p>
                    {[
                      "Diário Corporal",
                      "Mapa de Sintomas Emocionais",
                      "Histórico de Picos e Quedas",
                      "Monitor de Energia"
                    ].map((tool, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-400 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        {tool}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#3B82F6] text-white font-semibold shadow-lg shadow-[#3B82F6]/30">
                    Acessar Módulo
                  </Button>
                </Card>
              </Link>

              {/* Relacionamentos */}
              <Link href="/relacionamentos">
                <Card className="bg-white/5 border-[#3B82F6]/30 hover:border-[#3B82F6] transition-all duration-300 cursor-pointer group p-6 space-y-6 backdrop-blur-xl hover:shadow-2xl hover:shadow-[#3B82F6]/20">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#3B82F6]/30">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Módulo Relacionamentos
                      </h3>
                      <p className="text-gray-400">Relações</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-300">Ferramentas disponíveis:</p>
                    {[
                      "Termômetro de Conexão",
                      "Radares de Comportamento",
                      "Analisador de Conversas",
                      "Mapa de Padrões"
                    ].map((tool, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-400 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        {tool}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#3B82F6] text-white font-semibold shadow-lg shadow-[#3B82F6]/30">
                    Acessar Módulo
                  </Button>
                </Card>
              </Link>
            </div>
          </div>

          {/* Chat CTA - Orientador Interno */}
          <Link href="/chat">
            <Card className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] border-none p-8 md:p-12 shadow-2xl shadow-[#3B82F6]/30 cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3 text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <MessageCircle className="w-8 h-8 text-white" />
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      Orientador Interno
                    </h3>
                  </div>
                  <p className="text-white/90 text-lg max-w-2xl">
                    Converse com a IA especializada. Receba análise completa em 4 etapas: O que está acontecendo • O que isso significa • Onde se repete • O que fazer agora
                  </p>
                </div>
                <Button className="bg-white hover:bg-gray-100 text-[#1E40AF] px-8 py-6 text-lg font-bold flex items-center gap-3 shadow-2xl whitespace-nowrap">
                  <MessageCircle className="w-6 h-6" />
                  Iniciar Conversa
                </Button>
              </div>
            </Card>
          </Link>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: TrendingUp, label: "Relatórios Semanais" },
              { icon: Shield, label: "Alertas Inteligentes" },
              { icon: Target, label: "Metas Personalizadas" },
              { icon: Brain, label: "Análise de Padrões" }
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card
                  key={idx}
                  className="bg-white/5 border-[#3B82F6]/30 p-6 text-center hover:border-[#3B82F6] transition-all duration-300 backdrop-blur-xl group cursor-pointer"
                >
                  <Icon className="w-8 h-8 text-[#3B82F6] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold text-sm">{feature.label}</p>
                </Card>
              )
            })}
          </div>

          {/* Premium Section */}
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-[#3B82F6]/30 p-8 md:p-12 backdrop-blur-xl">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Área Premium
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Desbloqueie todo o potencial do Orientador Interno com acesso ilimitado, relatórios completos e estratégias personalizadas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#3B82F6]">7 dias</p>
                  <p className="text-gray-400">Grátis</p>
                </div>
                <div className="text-gray-500 text-2xl hidden sm:block">→</div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white">R$ 29,90</p>
                  <p className="text-gray-400">Por mês</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#3B82F6] text-white font-bold px-12 py-6 text-lg shadow-2xl shadow-[#3B82F6]/30">
                Começar Teste Grátis
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 bg-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400 text-sm">
            Constelações de Rotina • Orientador Interno • Tríade da Vida
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2024 Ponto de Virada - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}
