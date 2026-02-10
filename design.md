# Design - Pesquisa de Validação de Vendas a Prazo

## Visão Geral

Aplicativo mobile para pesquisa de validação de um sistema de controle de vendas a prazo. O app possui duas áreas principais: uma área pública para respondentes (questionário) e uma área administrativa (painel de dados).

**Orientação:** Portrait (9:16) | **Uso:** Uma mão | **Plataforma:** iOS/Android com Expo

---

## Paleta de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| Primária | `#0a7ea4` (Azul profissional) | Botões CTA, destaques |
| Fundo | `#ffffff` (Branco) | Fundo principal |
| Superfície | `#f5f5f5` (Cinza claro) | Cards, containers |
| Texto principal | `#11181C` (Cinza escuro) | Títulos, corpo |
| Texto secundário | `#687076` (Cinza médio) | Subtítulos, hints |
| Borda | `#E5E7EB` (Cinza muito claro) | Divisores, bordas |
| Sucesso | `#22C55E` (Verde) | Confirmações |
| Erro | `#EF4444` (Vermelho) | Erros, avisos |

---

## Lista de Telas

### Área Pública (Respondente)

1. **Tela Inicial** — Apresentação da pesquisa
2. **Tela de Pergunta** — Exibição de uma pergunta por tela (8 perguntas)
3. **Tela de Conclusão** — Mensagem de agradecimento

### Área Administrativa

4. **Tela de Login** — Autenticação simples
5. **Painel de Controle** — Indicadores, gráficos e filtros

---

## Tela 1: Inicial (Respondente)

**Objetivo:** Apresentar a pesquisa e motivar o respondente a participar.

**Conteúdo:**
- Título: "Pesquisa rápida – Controle de vendas a prazo"
- Subtítulo: "Leva menos de 3 minutos. Não solicitamos dados bancários."
- Descrição breve (opcional): "Ajude-nos a entender melhor suas necessidades"
- Botão primário: "Responder pesquisa"

**Layout:**
- Conteúdo centralizado verticalmente
- Espaçamento generoso (padding 24px)
- Botão ocupa 100% da largura (com margens)

---

## Tela 2: Pergunta (Respondente)

**Objetivo:** Apresentar uma pergunta por tela com opções de resposta.

**Conteúdo:**
- Indicador de progresso: "Pergunta X de 8"
- Título da pergunta
- Opções de resposta (radio buttons ou botões)
- Botão "Próximo" (desabilitado até selecionar resposta)
- Botão "Voltar" (opcional, para navegação)

**Layout:**
- Pergunta no topo (padding 24px)
- Opções de resposta em lista (cada uma é um item clicável)
- Botões de ação no rodapé

**Perguntas:**
1. Qual é o seu tipo de negócio?
2. Você vende a prazo ou na confiança hoje?
3. Como você controla essas vendas atualmente?
4. Você já esqueceu de cobrar alguém ou perdeu dinheiro por falta de controle?
5. Um aplicativo simples que organize clientes, valores e vencimentos ajudaria no seu dia a dia?
6. Hoje você já deixou de receber algum valor por falta de controle?
7. Você pagaria uma mensalidade acessível por um app que resolvesse isso?
8. Qual valor mensal considera justo?

---

## Tela 3: Conclusão (Respondente)

**Objetivo:** Agradecer o respondente e encerrar a pesquisa.

**Conteúdo:**
- Ícone de sucesso (checkmark)
- Título: "Obrigado por participar!"
- Mensagem: "Sua resposta é muito importante para nós."
- Botão: "Concluir"

**Layout:**
- Conteúdo centralizado
- Ícone grande (64x64px)
- Espaçamento vertical entre elementos

---

## Tela 4: Login (Admin)

**Objetivo:** Autenticar acesso ao painel administrativo.

**Conteúdo:**
- Título: "Painel Administrativo"
- Campo: Email/Usuário
- Campo: Senha
- Botão: "Entrar"
- Link: "Esqueceu a senha?" (opcional para MVP)

**Layout:**
- Formulário centralizado
- Campos com altura mínima de 48px (acessibilidade)
- Botão ocupa 100% da largura

---

## Tela 5: Painel de Controle (Admin)

**Objetivo:** Exibir indicadores, gráficos e dados da pesquisa.

**Conteúdo:**

### Seção 1: Indicadores Principais (Cards)
- **Total de Acessos:** Número de usuários que iniciaram a pesquisa
- **Respostas Completas:** Número de pesquisas concluídas
- **Taxa de Conversão:** Percentual (respostas completas / acessos)

### Seção 2: Gráficos
- **Respostas por Pergunta:** Gráfico de barras (horizontal ou vertical)
- **Intenção de Pagamento:** Gráfico de pizza (Sim / Talvez / Não)
- **Faixa de Preço Mais Escolhida:** Gráfico de barras

### Seção 3: Dados Geográficos
- **Mapa ou Lista:** Cidades/estados com quantidade de respostas
- Tabela com: Localidade | Acessos | Respostas

### Seção 4: Filtros
- Filtro por data (data inicial / data final)
- Filtro por cidade/estado
- Botão: "Aplicar filtros"

**Layout:**
- Header com título "Painel de Controle" e botão logout
- Cards de indicadores em grid (3 colunas em desktop, 1 em mobile)
- Gráficos em seções separadas (scrollable)
- Filtros em collapse/drawer (mobile-friendly)
- Rodapé com informações de última atualização

---

## Fluxo de Usuário Principal

### Respondente
1. Abre o app → Tela Inicial
2. Toca "Responder pesquisa" → Tela de Pergunta (1/8)
3. Seleciona opção → Toca "Próximo" → Tela de Pergunta (2/8)
4. ... (repete até pergunta 8)
5. Toca "Próximo" na pergunta 8 → Tela de Conclusão
6. Toca "Concluir" → Volta à Tela Inicial (ou fecha app)

### Administrador
1. Abre o app → Tela de Login
2. Insere credenciais → Toca "Entrar" → Painel de Controle
3. Visualiza indicadores, gráficos e dados
4. Aplica filtros conforme necessário
5. Toca "Logout" → Volta à Tela de Login

---

## Captura de Dados Automática

O app registra automaticamente (sem solicitar ao usuário):
- **Data e hora** de acesso à pesquisa
- **Status:** Se acessou ou concluiu
- **Localização aproximada:** Cidade/estado (via IP)
- **Tipo de dispositivo:** Android / iOS / Web
- **ID de sessão:** Identificador único para rastrear fluxo

**Não solicita:** Nome, CPF, telefone, e-mail

---

## Componentes Reutilizáveis

- **Card:** Container com fundo, borda e sombra
- **Button:** Primário (azul), secundário (outline), desabilitado
- **ProgressBar:** Indicador visual de progresso (Pergunta X de 8)
- **RadioGroup:** Grupo de opções de resposta
- **Input:** Campo de texto (email, senha)
- **ScreenContainer:** Wrapper com SafeArea

---

## Acessibilidade

- Mínimo de 48px para áreas clicáveis
- Contraste mínimo de 4.5:1 para texto
- Rótulos claros em campos de formulário
- Suporte a leitura de tela (VoiceOver / TalkBack)
- Sem dependência de cor única para comunicar informação

---

## Considerações de Performance

- Perguntas carregadas localmente (sem requisições de rede)
- Dados capturados e sincronizados em background
- Gráficos do painel carregados sob demanda
- Paginação para dados geográficos (se necessário)
