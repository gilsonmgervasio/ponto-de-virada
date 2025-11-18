"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  MessageCircle, 
  Send,
  Brain,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Target,
  Zap
} from "lucide-react"
import Link from "next/link"
import { analisarMensagem, type AnaliseOrientador } from "@/lib/orientador"

export default function ChatPage() {
  const [mensagem, setMensagem] = useState("")
  const [conversas, setConversas] = useState<Array<{
    tipo: 'usuario' | 'orientador'
    conteudo: string | AnaliseOrientador
  }>>([])
  const [carregando, setCarregando] = useState(false)

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return

    // Adicionar mensagem do usuário
    const novaMensagem = mensagem
    setConversas(prev => [...prev, { tipo: 'usuario', conteudo: novaMensagem }])
    setMensagem("")
    setCarregando(true)

    // Simular processamento da IA
    setTimeout(async () => {
      const analise = await analisarMensagem(novaMensagem)
      setConversas(prev => [...prev, { tipo: 'orientador', conteudo: analise }])
      setCarregando(false)
    }, 1500)
  }

  const exemplos = [
    "Estou ansioso porque uma conta não passou",
    "Não consigo dormir bem ultimamente",
    "Sinto que meus relacionamentos estão me drenando",
    "Estou gastando mais do que ganho"
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
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Orientador Interno
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">Sistema de Análise em 4 Etapas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Intro Card */}
          {conversas.length === 0 && (
            <Card className="bg-gradient-to-br from-[#3B82F6]/20 to-[#1E40AF]/20 border-[#3B82F6]/30 p-8 backdrop-blur-xl">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] mb-4">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Como posso ajudar você hoje?
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Compartilhe o que está acontecendo. Vou analisar e oferecer orientação clara e prática.
                  </p>
                </div>

                {/* Sistema de Análise */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {[
                    { icon: Sparkles, label: "O que está acontecendo?", desc: "Descrição clara" },
                    { icon: Brain, label: "O que isso significa?", desc: "Interpretação" },
                    { icon: TrendingUp, label: "Onde se repete?", desc: "Padrão identificado" },
                    { icon: Target, label: "O que fazer agora?", desc: "Ação direta" }
                  ].map((etapa, idx) => {
                    const Icon = etapa.icon
                    return (
                      <div key={idx} className="bg-white/5 rounded-xl p-4 text-left border border-[#3B82F6]/20">
                        <Icon className="w-6 h-6 text-[#3B82F6] mb-2" />
                        <h3 className="text-white font-semibold mb-1">{etapa.label}</h3>
                        <p className="text-gray-400 text-sm">{etapa.desc}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Exemplos */}
                <div className="space-y-3 pt-4">
                  <p className="text-sm text-gray-400">Exemplos de perguntas:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exemplos.map((exemplo, idx) => (
                      <Button
                        key={idx}
                        onClick={() => setMensagem(exemplo)}
                        variant="outline"
                        className="text-left h-auto py-3 px-4 bg-white/5 border-[#3B82F6]/30 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 text-white text-sm"
                      >
                        {exemplo}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Conversas */}
          <div className="space-y-4">
            {conversas.map((conversa, idx) => (
              <div key={idx}>
                {conversa.tipo === 'usuario' ? (
                  <div className="flex justify-end">
                    <Card className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] border-none p-4 max-w-[80%]">
                      <p className="text-white">{conversa.conteudo as string}</p>
                    </Card>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <Card className="bg-white/5 border-[#3B82F6]/30 p-6 max-w-[90%] backdrop-blur-xl">
                      {typeof conversa.conteudo === 'object' && (
                        <div className="space-y-6">
                          {/* Header da Análise */}
                          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center">
                              <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold">Análise Completa</h3>
                              <p className="text-xs text-gray-400">
                                Tríade: {conversa.conteudo.triade === 'dinheiro' ? 'Dinheiro' : 
                                         conversa.conteudo.triade === 'corpo' ? 'Corpo' : 
                                         conversa.conteudo.triade === 'relacoes' ? 'Relações' : 'Múltiplas Áreas'}
                              </p>
                            </div>
                          </div>

                          {/* 4 Etapas da Análise */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#3B82F6]" />
                                <h4 className="text-white font-semibold">O que está acontecendo?</h4>
                              </div>
                              <p className="text-gray-300 pl-7">{conversa.conteudo.acontecendo}</p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Brain className="w-5 h-5 text-[#3B82F6]" />
                                <h4 className="text-white font-semibold">O que isso significa?</h4>
                              </div>
                              <p className="text-gray-300 pl-7">{conversa.conteudo.significado}</p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
                                <h4 className="text-white font-semibold">Onde isso está se repetindo?</h4>
                              </div>
                              <p className="text-gray-300 pl-7">{conversa.conteudo.padrao}</p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-[#3B82F6]" />
                                <h4 className="text-white font-semibold">O que fazer agora?</h4>
                              </div>
                              <p className="text-gray-300 pl-7 font-semibold">{conversa.conteudo.acao}</p>
                            </div>
                          </div>

                          {/* Estratégia 24h */}
                          <Card className="bg-gradient-to-r from-[#3B82F6]/20 to-[#1E40AF]/20 border-[#3B82F6]/30 p-4">
                            <div className="flex items-start gap-3">
                              <Zap className="w-5 h-5 text-[#60A5FA] mt-1" />
                              <div>
                                <h4 className="text-white font-semibold mb-2">Estratégia 24h</h4>
                                <p className="text-gray-300 text-sm">{conversa.conteudo.estrategia24h}</p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      )}
                    </Card>
                  </div>
                )}
              </div>
            ))}

            {/* Loading */}
            {carregando && (
              <div className="flex justify-start">
                <Card className="bg-white/5 border-[#3B82F6]/30 p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    <span className="text-gray-400 ml-2">Analisando...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Input Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#0F172A]/95 backdrop-blur-xl p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-3">
            <Input
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-white/5 border-[#3B82F6]/30 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
            />
            <Button
              onClick={enviarMensagem}
              disabled={!mensagem.trim() || carregando}
              className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#3B82F6] text-white px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            O Orientador Interno analisa suas mensagens usando a Tríade da Vida
          </p>
        </div>
      </div>
    </div>
  )
}
