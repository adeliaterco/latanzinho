export const quizSteps = [
  {
    id: 1,
    question: "NÃO DEIXE A PESSOA QUE VOCÊ AMA SAIR DA SUA VIDA PARA SEMPRE!",
    description:
      "Faça o teste rápido de 2 minutos e descubra como aplicar o PLANO A - RECONQUISTA RÁPIDA no seu caso específico.",
    subtext: "Selecione seu gênero:",
    options: ["MASCULINO", "FEMININO"],
    warning:
      "⚠️ ATENÇÃO: Este método comprovado só deve ser usado se você está 100% comprometido em reconquistar seu amor perdido!",
    elements: {
      heartbeat: true,
      timer: "Teste de 2 minutos",
    },
  },
  {
    id: 2,
    question: "QUAL A SUA IDADE?",
    description: "(Esta informação é crucial para personalizar seu plano de reconquista)",
    options: [
      "18-29 - Fase de descobertas emocionais",
      "29-39 - Período de consolidação de valores",
      "39-49 - Momento de reavaliação de prioridades",
      "50+ - Fase de maturidade emocional",
    ],
    elements: {
      ageIcons: true,
      counter: "pessoas que já fizeram o teste hoje",
    },
  },
  {
    id: 3,
    question: "HÁ QUANTO TEMPO VOCÊS ESTÃO SEPARADOS?",
    description: "(O tempo é um fator crítico para sua estratégia de reconquista)",
    options: {
      masculino: [
        "Há menos de uma semana - Janela de oportunidade máxima!",
        "Há 1 mês - Período ideal para aplicar o Protocolo de 72 horas",
        "2 a 6 meses - Fase que exige os 21 Gatilhos Emocionais",
        "Mais de 6 meses - Requer abordagem de reconexão profunda",
      ],
      feminino: [
        "Há menos de uma semana - Janela de oportunidade máxima!",
        "Há 1 mês - Período ideal para aplicar o Protocolo de 72 horas",
        "2 a 6 meses - Fase que exige os 21 Gatilhos Emocionais",
        "Mais de 6 meses - Requer abordagem de reconexão profunda",
      ],
    },
    bonusUnlock: {
      id: 1,
      title: "GUIA RÁPIDO: 5 ERROS FATAIS QUE IMPEDEM A RECONQUISTA",
      value: 97,
      description: "Manual completo para evitar os erros que 97% das pessoas cometem ao tentar reconquistar seu ex",
    },
  },
  {
    id: 4,
    question: {
      masculino: "COMO FOI A SEPARAÇÃO DE VOCÊS?",
      feminino: "COMO FOI A SEPARAÇÃO DE VOCÊS?",
    },
    description: "(Esta informação é vital para determinar sua estratégia específica)",
    options: {
      masculino: [
        "Ela terminou comigo - Requer técnicas específicas de reposicionamento",
        "Eu terminei com ela - Necessita abordagem de reconexão emocional",
        "Decidimos terminar juntos - Ideal para aplicar o método de transformação mútua",
      ],
      feminino: [
        "Ele terminou comigo - Requer técnicas específicas de reposicionamento",
        "Eu terminei com ele - Necessita abordagem de reconexão emocional",
        "Decidimos terminar juntos - Ideal para aplicar o método de transformação mútua",
      ],
    },
    elements: {
      analysisText: "Calculando taxa de sucesso para seu caso...",
      successRate: "Seu caso tem características promissoras!",
    },
  },
  {
    id: 5,
    question: "QUANTO TEMPO VOCÊS FICARAM JUNTOS?",
    description: "(A duração do relacionamento influencia diretamente sua estratégia)",
    options: [
      "Mais de 3 anos - Conexão profunda que pode ser reacendida rapidamente",
      "De 1 a 3 anos - Período ideal para aplicar os 7 Pilares da Presença Irresistível",
      "De 6 meses a 1 ano - Fase crítica que responde bem aos 21 Gatilhos Emocionais",
      "Menos de 6 meses - Requer técnicas específicas de reconexão rápida",
    ],
    bonusUnlock: {
      id: 2,
      title: {
        masculino: "COMO FAZER ELA SENTIR SUA FALTA EM 72 HORAS",
        feminino: "COMO FAZER ELE SENTIR SUA FALTA EM 72 HORAS",
      },
      value: 147,
      description: "Cronograma hora-a-hora para os 3 dias críticos que determinam o sucesso da sua reconquista",
    },
  },
  {
    id: 6,
    question: "QUAL FOI A PARTE MAIS DOLOROSA DO TÉRMINO?",
    description: "(Identificar sua dor principal é essencial para sua recuperação emocional e reconquista)",
    options: {
      masculino: [
        "😔 Lidar com a solidão e o vazio - O Plano A resolve isso nos primeiros 7 dias",
        "😢 A montanha-russa emocional: raiva, tristeza, arrependimento - Nosso método estabiliza suas emoções",
        "😐 Lidar com lembranças e recordações - Transformamos memórias dolorosas em combustível para reconquista",
        "💔 Imaginar ela com outro homem - Técnicas específicas para reverter este cenário",
        "🤔 Perceber que os planos que fizemos nunca se concretizarão - Aprenda a reconstruir sonhos juntos",
        "⚡ Outro - Temos soluções para qualquer cenário de término",
      ],
      feminino: [
        "😔 Lidar com a solidão e o vazio - O Plano A resolve isso nos primeiros 7 dias",
        "😢 A montanha-russa emocional: raiva, tristeza, arrependimento - Nosso método estabiliza suas emoções",
        "😐 Lidar com lembranças e recordações - Transformamos memórias dolorosas em combustível para reconquista",
        "💔 Imaginar ele com outra mulher - Técnicas específicas para reverter este cenário",
        "🤔 Perceber que os planos que fizemos nunca se concretizarão - Aprenda a reconstruir sonhos juntos",
        "⚡ Outro - Temos soluções para qualquer cenário de término",
      ],
    },
    elements: {
      profileAnalysis: "Personalizando sua estratégia emocional...",
      profileComplete: "46%",
    },
  },
  {
    id: 7,
    question: {
      masculino: "QUAL É A SUA SITUAÇÃO ATUAL COM SUA EX?",
      feminino: "QUAL É A SUA SITUAÇÃO ATUAL COM SEU EX?",
    },
    description: "(Esta informação determinará seu ponto de partida no PLANO A)",
    options: {
      masculino: [
        "🧐 Estou fazendo contato zero - Estratégia perfeita para aplicar o protocolo de 72 horas",
        "😢 Ela só me ignora - Técnicas específicas para quebrar a barreira da indiferença",
        "❌ Ela me bloqueou em todas as redes sociais - Método de reconexão indireta que funciona em 89% dos casos",
        "🤝 Discutimos apenas coisas essenciais - Posição ideal para implementar os 21 Gatilhos Emocionais",
        "🤔 Conversamos às vezes - Cenário perfeito para aplicar os 7 Pilares da Atração",
        "😌 Ainda somos amigos - Como sair da friendzone em 14 dias ou menos",
        "🔥 Transamos algumas vezes depois do término - Como transformar atração física em reconexão emocional",
      ],
      feminino: [
        "🧐 Estou fazendo contato zero - Estratégia perfeita para aplicar o protocolo de 72 horas",
        "😢 Ele só me ignora - Técnicas específicas para quebrar a barreira da indiferença",
        "❌ Ele me bloqueou em todas as redes sociais - Método de reconexão indireta que funciona em 89% dos casos",
        "🤝 Discutimos apenas coisas essenciais - Posição ideal para implementar os 21 Gatilhos Emocionais",
        "🤔 Conversamos às vezes - Cenário perfeito para aplicar os 7 Pilares da Atração",
        "😌 Ainda somos amigos - Como sair da friendzone em 14 dias ou menos",
        "🔥 Transamos algumas vezes depois do término - Como transformar atração física em reconexão emocional",
      ],
    },
    elements: {
      profileComplete: "62%",
      testimonialImage: "",
    },
  },
  {
    id: 8,
    question: {
      masculino: "ELA JÁ ESTÁ SAINDO COM OUTRA PESSOA?",
      feminino: "ELE JÁ ESTÁ SAINDO COM OUTRA PESSOA?",
    },
    description: "(Esta informação é crucial para definir sua abordagem estratégica)",
    options: {
      masculino: [
        "🚫 Não, ela está solteira - Cenário ideal para aplicar o método completo",
        "🤔 Não tenho certeza - Técnicas de investigação discreta incluídas no método",
        "😔 Sim, ela está ficando com alguém - Estratégias específicas para superar a concorrência",
        "💔 Sim, ela está namorando sério - Método avançado de reconquista em relacionamentos estabelecidos",
        "🔄 Ela está conhecendo várias pessoas - Como se destacar em meio à competição",
      ],
      feminino: [
        "🚫 Não, ele está solteiro - Cenário ideal para aplicar o método completo",
        "🤔 Não tenho certeza - Técnicas de investigação discreta incluídas no método",
        "😔 Sim, ele está ficando com alguém - Estratégias específicas para superar a concorrência",
        "💔 Sim, ele está namorando sério - Método avançado de reconquista em relacionamentos estabelecidos",
        "🔄 Ele está conhecendo várias pessoas - Como se destacar em meio à competição",
      ],
    },
    bonusUnlock: {
      id: 3,
      title: "CÓDIGO DA ATRAÇÃO: OS 7 PILARES DA PRESENÇA IRRESISTÍVEL",
      value: 167,
      description: {
        masculino:
          "Transforme-se no homem que ela não consegue resistir, desenvolvendo os 7 fundamentos da atração autêntica",
        feminino:
          "Transforme-se na mulher que ele não consegue resistir, desenvolvendo os 7 fundamentos da atração autêntica",
      },
    },
    elements: {
      profileComplete: "77%",
    },
  },
  {
    id: 9,
    question: {
      masculino: "O QUANTO VOCÊ QUER TER ELA DE VOLTA?",
      feminino: "O QUANTO VOCÊ QUER TER ELE DE VOLTA?",
    },
    description: "(Seu nível de comprometimento determinará seu sucesso)",
    subtext: "91% das pessoas que selecionaram nível 4 reconquistaram seu ex em menos de 21 dias usando o PLANO A.",
    options: ["1 - Não tenho certeza", "2 - Estou considerando", "3 - Quero bastante", "4 - Quero muito"],
    note: "Eu só trabalho com pessoas determinadas a transformar sua situação amorosa. O PLANO A - RECONQUISTA RÁPIDA foi desenvolvido para quem está pronto para agir.",
    bonusUnlock: {
      id: 4,
      title: "101 TEXTOS PRONTOS PARA RECONQUISTAR",
      value: 127,
      description: "Biblioteca completa de mensagens testadas e aprovadas para cada fase da reconquista",
    },
    elements: {
      thermometer: true,
      profileComplete: "85%",
    },
  },
  {
    id: 10,
    question: "EXPERT ANALISANDO SEU CASO...",
    description: "Aguarde enquanto analiso suas respostas para criar sua estratégia personalizada.",
    options: [],
    autoAdvance: true,
    elements: {
      expertPhoto: true,
      expertImage: "https://optimalhealthscout.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-01T212625.544.png",
      autoMessage: "Com base em 7 anos de experiência ajudando pessoas como você...",
      profileComplete: "90%",
    },
  },
  {
    id: 11,
    question: "PARABÉNS! Analisei suas respostas e tenho boas notícias para você.",
    description:
      "Com base no seu perfil e situação específica, o PLANO A - RECONQUISTA RÁPIDA tem 91% de chance de funcionar no seu caso.",
    options: ["VAMOS AO PRÓXIMO PASSO?"],
    note: "Estou aqui para guiá-lo pessoalmente nessa jornada de reconquista. Nos últimos 7 anos, ajudei mais de 3.847 pessoas a recuperarem seus relacionamentos usando este método exclusivo.",
    elements: {
      expertPhoto: true,
      expertImage: "https://optimalhealthscout.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-01T212625.544.png",
      profileComplete: "95%",
      helpedCounter: "Pessoas ajudadas hoje: 17",
      compatibilityCalc: "91%",
    },
  },
  {
    id: 12,
    question: "RESULTADOS COMPROVADOS",
    subtext:
      "91% DOS MEUS ALUNOS VIRAM RESULTADOS EXPRESSIVOS NOS PRIMEIROS 7 DIAS APLICANDO O PLANO A - RECONQUISTA RÁPIDA",
    description: "",
    options: ["EU QUERO ESSES RESULTADOS TAMBÉM!"],
    bonusUnlock: {
      id: 5,
      title: {
        masculino: "COMO IDENTIFICAR SE ELA AINDA TEM SENTIMENTOS POR VOCÊ",
        feminino: "COMO IDENTIFICAR SE ELE AINDA TEM SENTIMENTOS POR VOCÊ",
      },
      value: 97,
      description: "15 sinais inconfundíveis que revelam se existe uma chance real de reconquista",
    },
    elements: {
      bigNumber: "91%",
      profileComplete: "98%",
      testimonialImage: "https://optimalhealthscout.shop/wp-content/uploads/2025/05/1-depoimento-plano.png",
    },
  },
  {
    id: 13,
    question: "SEU PLANO A - RECONQUISTA RÁPIDA DE 21 DIAS",
    description: "Desenvolvido especificamente para o seu caso, baseado nas suas respostas.",
    subtext:
      "Este sistema passo-a-passo já ajudou 3.847 pessoas a reconquistarem seu ex e construírem relacionamentos ainda mais fortes que antes.",
    options: {
      masculino: ["SIM, QUERO RECONQUISTAR ELA AGORA!"],
      feminino: ["SIM, QUERO RECONQUISTAR ELE AGORA!"],
    },
    note: "Inclui os 5 bônus exclusivos (valor total: R$635) que aceleram sua reconquista!",
    elements: {
      plan21Days: true,
      profileComplete: "100%",
      allBonuses: true,
    },
  },
  {
    id: 14,
    question: {
      masculino: "DE REJEITADO A DESEJADO EM 21 DIAS OU MENOS",
      feminino: "DE REJEITADA A DESEJADA EM 21 DIAS OU MENOS",
    },
    description:
      "O único sistema passo-a-passo cientificamente desenvolvido para pessoas determinadas a recuperar o amor de quem deixou um vazio em suas vidas.",
    options: {
      masculino: ["SIM, QUERO RECONQUISTAR ELA AGORA!"],
      feminino: ["SIM, QUERO RECONQUISTAR ELE AGORA!"],
    },
    finalPage: true,
    elements: {
      beforeAfter: true,
      fullSalesPage: true,
    },
  },
]

export const bonuses = [
  {
    id: 1,
    title: "21 GATILHOS EMOCIONAIS INFALÍVEIS",
    value: 197,
    description:
      "Domine os exatos gatilhos psicológicos que ativam atração instantânea e desejo profundo, com exemplos práticos para cada situação.",
  },
  {
    id: 2,
    title: {
      masculino: "COMO FAZER ELA SENTIR SUA FALTA EM 72 HORAS",
      feminino: "COMO FAZER ELE SENTIR SUA FALTA EM 72 HORAS",
    },
    value: 147,
    description: "Cronograma hora-a-hora para os 3 dias críticos que determinam o sucesso da sua reconquista.",
  },
  {
    id: 3,
    title: "CÓDIGO DA ATRAÇÃO: OS 7 PILARES DA PRESENÇA IRRESISTÍVEL",
    value: 167,
    description: {
      masculino:
        "Transforme-se no homem que ela não consegue resistir, desenvolvendo os 7 fundamentos da atração autêntica.",
      feminino:
        "Transforme-se na mulher que ele não consegue resistir, desenvolvendo os 7 fundamentos da atração autêntica.",
    },
  },
  {
    id: 4,
    title: "101 TEXTOS PRONTOS PARA RECONQUISTAR",
    value: 127,
    description: "Biblioteca completa de mensagens testadas e aprovadas para cada fase da reconquista.",
  },
  {
    id: 5,
    title: {
      masculino: "COMO IDENTIFICAR SE ELA AINDA TEM SENTIMENTOS POR VOCÊ",
      feminino: "COMO IDENTIFICAR SE ELE AINDA TEM SENTIMENTOS POR VOCÊ",
    },
    value: 97,
    description: "15 sinais inconfundíveis que revelam se existe uma chance real de reconquista.",
  },
]

export const testimonials = [
  {
    name: "Carlos M., 34 anos",
    text: "Ela voltou a me responder no 3º dia e me chamou para sair no 6º dia!",
    rating: 5,
  },
  {
    name: "Rafael, 32 anos",
    text: "Estava perdido após o término. O Plano A me deu direção e confiança. Hoje estamos mais unidos que nunca!",
    rating: 5,
  },
  {
    name: "André, 28 anos",
    text: "Em apenas 2 semanas seguindo o Plano A, consegui reconquistar minha ex. Os scripts funcionaram perfeitamente!",
    rating: 5,
  },
  {
    name: "Marcelo, 41 anos",
    text: "Depois de 6 meses separados, achei que não tinha mais chance. No 12º dia do Plano A ela me ligou chorando querendo voltar.",
    rating: 5,
  },
]

export const socialProofMessages = [
  "Você está entre os 17% mais determinados a reconquistar!",
  "Seu perfil mostra 91% de compatibilidade com o método!",
  "Você desbloqueou todos os 5 bônus - valor total de R$635!",
  "87% das pessoas na sua situação conseguiram resultados em menos de 14 dias",
  "Você está mais comprometido que 73% das pessoas que fizeram este teste",
]

// Função utilitária para personalizar textos baseado no gênero
export function getPersonalizedContent(content: any, gender: string) {
  if (typeof content === "string") {
    return content
  }

  if (typeof content === "object" && content !== null) {
    if (content.masculino && content.feminino) {
      return gender === "MASCULINO" ? content.masculino : content.feminino
    }
    return content
  }

  return content
}
