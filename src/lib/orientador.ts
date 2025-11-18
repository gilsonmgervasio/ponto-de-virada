// Orientador Interno - Sistema de IA especializado
// Baseado na Tríade da Vida e Sistema de Análise em 4 etapas

export interface AnaliseOrientador {
  acontecendo: string // O que está acontecendo?
  significado: string // O que isso significa?
  padrao: string // Onde isso está se repetindo?
  acao: string // O que fazer agora?
  movimento: 'desequilibrio' | 'compensacao' | 'realinhamento'
  triade: 'dinheiro' | 'corpo' | 'relacoes' | 'multiplas'
  estrategia24h: string
}

export async function analisarMensagem(
  mensagem: string,
  contextoUsuario?: {
    areaFragil?: string
    areaForte?: string
    padraoPredominate?: string
  }
): Promise<AnaliseOrientador> {
  // Aqui você pode integrar com OpenAI ou outra IA
  // Por enquanto, vou criar uma lógica de análise baseada em palavras-chave
  
  const mensagemLower = mensagem.toLowerCase()
  
  // Detectar área da Tríade
  let triade: AnaliseOrientador['triade'] = 'multiplas'
  if (mensagemLower.includes('dinheiro') || mensagemLower.includes('conta') || 
      mensagemLower.includes('gasto') || mensagemLower.includes('financeiro')) {
    triade = 'dinheiro'
  } else if (mensagemLower.includes('corpo') || mensagemLower.includes('saúde') || 
             mensagemLower.includes('cansaço') || mensagemLower.includes('energia')) {
    triade = 'corpo'
  } else if (mensagemLower.includes('relacionamento') || mensagemLower.includes('pessoa') || 
             mensagemLower.includes('família') || mensagemLower.includes('amigo')) {
    triade = 'relacoes'
  }
  
  // Detectar movimento
  let movimento: AnaliseOrientador['movimento'] = 'desequilibrio'
  if (mensagemLower.includes('compensar') || mensagemLower.includes('equilibrar')) {
    movimento = 'compensacao'
  } else if (mensagemLower.includes('melhorar') || mensagemLower.includes('organizar')) {
    movimento = 'realinhamento'
  }
  
  // Análise baseada no contexto
  let analise: AnaliseOrientador
  
  if (triade === 'dinheiro') {
    analise = {
      acontecendo: "Você está enfrentando uma situação financeira que gera ansiedade e preocupação. Isso indica um momento de desequilíbrio na área do dinheiro.",
      significado: "Essa ansiedade revela um padrão de decisões emocionais relacionadas ao dinheiro. Quando as finanças ficam instáveis, sua mente busca compensação através de mais preocupação, criando um ciclo.",
      padrao: "Esse comportamento provavelmente se repete em momentos de pressão financeira. Você tende a reagir com ansiedade antes de agir estrategicamente.",
      acao: "AÇÃO IMEDIATA: Respire fundo e liste 3 ações práticas que você pode fazer HOJE para melhorar essa situação. Não foque no problema, foque na próxima ação.",
      movimento: 'desequilibrio',
      triade: 'dinheiro',
      estrategia24h: "Nas próximas 24h: 1) Identifique a causa raiz do problema financeiro 2) Crie um plano mínimo de ação 3) Execute pelo menos uma ação concreta, mesmo que pequena"
    }
  } else if (triade === 'corpo') {
    analise = {
      acontecendo: "Seu corpo está sinalizando sobrecarga. Isso pode ser físico, mental ou emocional - mas o corpo sempre avisa primeiro.",
      significado: "Quando ignoramos os sinais do corpo, ele intensifica os avisos. Cansaço, tensão e falta de energia são formas do seu corpo pedir atenção.",
      padrao: "Você provavelmente tem um padrão de empurrar seus limites até o corpo forçar uma parada. Isso se repete em ciclos de alta produtividade seguidos de exaustão.",
      acao: "AÇÃO IMEDIATA: Pare por 10 minutos agora. Respire profundamente 5 vezes. Identifique qual área da sua vida está consumindo mais energia e ajuste HOJE.",
      movimento: 'desequilibrio',
      triade: 'corpo',
      estrategia24h: "Nas próximas 24h: 1) Durma pelo menos 7 horas 2) Faça 3 pausas de 5 minutos durante o dia 3) Identifique e elimine 1 atividade desnecessária"
    }
  } else if (triade === 'relacoes') {
    analise = {
      acontecendo: "Você está vivenciando um conflito ou desequilíbrio em seus relacionamentos. Isso afeta diretamente seu estado emocional e suas decisões.",
      significado: "Relacionamentos desequilibrados drenam energia e clareza mental. Quando você não estabelece limites claros, acaba compensando emocionalmente de outras formas.",
      padrao: "Esse padrão provavelmente se repete: você evita confrontos, acumula frustrações e depois reage de forma desproporcional ou se afasta.",
      acao: "AÇÃO IMEDIATA: Identifique qual relacionamento está consumindo mais energia. Escreva 3 limites claros que você precisa estabelecer. Comunique 1 deles hoje.",
      movimento: 'desequilibrio',
      triade: 'relacoes',
      estrategia24h: "Nas próximas 24h: 1) Identifique a pessoa/situação que mais drena sua energia 2) Defina 1 limite claro 3) Comunique esse limite de forma respeitosa mas firme"
    }
  } else {
    analise = {
      acontecendo: "Você está em um momento de múltiplas pressões. Diferentes áreas da sua vida estão demandando atenção simultânea.",
      significado: "Quando várias áreas ficam instáveis ao mesmo tempo, é sinal de que você está operando no limite. Seu sistema está pedindo reorganização.",
      padrao: "Você provavelmente tem um padrão de tentar resolver tudo ao mesmo tempo, o que gera sobrecarga e paralisia. Isso se repete em momentos de transição ou pressão.",
      acao: "AÇÃO IMEDIATA: Escolha UMA área para focar hoje. Não tente resolver tudo. Identifique a área mais crítica e dê um passo concreto nela.",
      movimento: 'desequilibrio',
      triade: 'multiplas',
      estrategia24h: "Nas próximas 24h: 1) Escolha a área mais crítica (Dinheiro, Corpo ou Relações) 2) Defina 1 ação específica nessa área 3) Execute essa ação antes de dormir"
    }
  }
  
  return analise
}

export function gerarRelatorioSemanal(dados: {
  interacoes: number
  areasAbordadas: string[]
  padroesPrincipais: string[]
  progressoEquilibrio: number
}) {
  return {
    titulo: "Relatório Semanal - Constelações de Rotina",
    resumo: `Esta semana você teve ${dados.interacoes} interações com o Orientador Interno.`,
    areas: dados.areasAbordadas,
    padroes: dados.padroesPrincipais,
    progresso: dados.progressoEquilibrio,
    recomendacao: "Continue focando em ações práticas diárias. Pequenos passos consistentes geram grandes transformações."
  }
}
