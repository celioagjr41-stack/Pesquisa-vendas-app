/**
 * Tipos e constantes para o sistema de pesquisa
 */

export type SurveyQuestion = {
  id: number;
  question: string;
  type: "radio" | "checkbox";
  options: string[];
};

export type SurveyResponse = {
  questionId: number;
  answer: string | string[];
};

export type SurveySession = {
  sessionId: string;
  startTime: string;
  endTime?: string;
  completed: boolean;
  responses: SurveyResponse[];
  deviceType: "iOS" | "Android" | "Web";
  location?: {
    city?: string;
    state?: string;
  };
};

export type Interested = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  registeredAt: string;
  deviceType: "iOS" | "Android" | "Web";
  location?: {
    city?: string;
    state?: string;
  };
};

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    question: "Qual é o seu tipo de negócio?",
    type: "radio",
    options: [
      "Mercadinho",
      "Loja de bairro",
      "Profissional liberal",
      "Vendas porta a porta",
      "Outro",
    ],
  },
  {
    id: 2,
    question: "Você vende a prazo ou na confiança hoje?",
    type: "radio",
    options: ["Sim", "Não"],
  },
  {
    id: 3,
    question: "Como você controla essas vendas atualmente?",
    type: "radio",
    options: ["Caderno", "WhatsApp", "Memória", "Planilha", "Não controlo"],
  },
  {
    id: 4,
    question:
      "Você já esqueceu de cobrar alguém ou perdeu dinheiro por falta de controle?",
    type: "radio",
    options: ["Sim", "Não"],
  },
  {
    id: 5,
    question:
      "Um aplicativo simples que organize clientes, valores e vencimentos ajudaria no seu dia a dia?",
    type: "radio",
    options: ["Sim", "Talvez", "Não"],
  },
  {
    id: 6,
    question: "Hoje você já deixou de receber algum valor por falta de controle?",
    type: "radio",
    options: ["Não", "Sim, valores pequenos", "Sim, valores relevantes"],
  },
  {
    id: 7,
    question: "Você pagaria uma mensalidade acessível por um app que resolvesse isso?",
    type: "radio",
    options: ["Sim", "Talvez", "Não"],
  },
  {
    id: 8,
    question: "Qual valor mensal considera justo?",
    type: "radio",
    options: ["Até R$ 20", "R$ 20 a R$ 40", "R$ 40 a R$ 70", "Não pagaria"],
  },
];
