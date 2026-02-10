# Pesquisa - Controle de Vendas | TODO

## Fase 1: Configuração Inicial
- [x] Gerar logo/ícone do app
- [x] Atualizar branding em app.config.ts
- [x] Configurar tema de cores em theme.config.js
- [x] Estruturar navegação (tabs com abas: Pesquisa / Admin)

## Fase 2: Área Pública - Questionário
- [x] Tela inicial (apresentação da pesquisa)
- [x] Componente de pergunta (radio buttons, botões Próximo/Voltar)
- [x] Implementar fluxo de 8 perguntas
- [x] Tela de conclusão (agradecimento)
- [x] Validação de respostas antes de avançar

## Fase 3: Captura Automática de Dados
- [x] Registrar data/hora de acesso
- [x] Registrar status (acessou/concluiu)
- [ ] Capturar localização aproximada (IP → cidade/estado)
- [x] Detectar tipo de dispositivo (iOS/Android/Web)
- [x] Gerar ID de sessão único
- [x] Armazenar dados localmente (AsyncStorage) e sincronizar com servidor

## Fase 4: Área Administrativa - Painel
- [x] Tela de login (email/senha simples)
- [x] Autenticação e persistência de sessão
- [x] Cards de indicadores (acessos, respostas, taxa de conversão)
- [ ] Gráfico de respostas por pergunta
- [ ] Gráfico de intenção de pagamento (Sim/Talvez/Não)
- [ ] Gráfico de faixa de preço
- [ ] Lista/mapa de dados geográficos (cidade/estado)
- [ ] Filtros por data e localidade
- [x] Botão de logout

## Fase 5: Testes e Refinamento
- [x] Testar fluxo completo do questionário (testes unitários)
- [x] Testar captura de dados
- [x] Testar painel administrativo (básico)
- [ ] Validar responsividade (mobile/tablet/web)
- [ ] Corrigir bugs e ajustar UI/UX

## Fase 6: Entrega
- [ ] Criar checkpoint final
- [ ] Preparar documentação
- [ ] Apresentar ao usuário

## Fase 7: Captura de Interessados (NOVO)
- [x] Criar tela de captura de interessados (após conclusão da pesquisa)
- [x] Implementar formulário com campos: Nome, E-mail, WhatsApp
- [x] Validar campos de e-mail e WhatsApp
- [x] Mensagem de confirmação após envio
- [x] Armazenar dados de interessados separadamente no AsyncStorage
- [x] Atualizar painel admin com seção de interessados
- [x] Exibir total de interessados em teste
- [x] Listar nome, e-mail, WhatsApp e localidade dos interessados
- [x] Implementar exportação CSV de interessados
- [x] Adicionar indicador: Respondentes x Interessados

## Fase 8: Geolocalização via IP
- [x] Criar serviço de geolocalização (integração com API de IP)
- [x] Capturar localização na sessão de pesquisa
- [x] Capturar localização no cadastro de interessados
- [x] Exibir dados geográficos no painel admin
- [x] Criar lista/mapa de cidades/estados com quantidade de respostas
- [ ] Adicionar filtro por localidade no painel admin
