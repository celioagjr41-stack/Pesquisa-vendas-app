# Guia de Acesso aos Dados da Pesquisa

## 📱 Acessando o Painel Administrativo

### Passo 1: Navegue até a Aba "Admin"
Na tela inicial do aplicativo, você verá duas abas na parte inferior:
- **Pesquisa** (aba esquerda) - Área pública para respondentes
- **Admin** (aba direita) - Painel de controle

Toque na aba **Admin**.

### Passo 2: Faça Login
A tela de login do painel administrativo aparecerá. Digite a senha:
```
admin123
```

Toque em **Entrar**.

---

## 📊 Visualizando os Dados

Após fazer login, você terá acesso a duas abas principais:

### Aba 1: Visão Geral

Exibe os indicadores principais:

| Indicador | O que significa |
|-----------|-----------------|
| **Total de Acessos** | Quantas pessoas iniciaram a pesquisa |
| **Respostas Completas** | Quantas pessoas completaram todas as 8 perguntas |
| **Taxa de Conversão** | Percentual de respondentes que completaram a pesquisa |
| **Taxa de Interesse em Teste** | Percentual de respondentes que deixaram contato para testar |

**Exemplo:**
- Total de Acessos: 50
- Respostas Completas: 35
- Taxa de Conversão: 70%
- Taxa de Interesse: 45% (15 de 35 respondentes)

### Aba 2: Interessados

Lista todos os contatos de pessoas que desejam testar o sistema.

**Informações exibidas para cada interessado:**
- Nome
- E-mail
- WhatsApp
- Data e hora do registro
- Tipo de dispositivo (iOS, Android ou Web)

**Exportar dados em CSV:**
Toque no botão **"Exportar como CSV"** para baixar uma planilha com todos os interessados. Você poderá:
- Abrir em Excel ou Google Sheets
- Enviar e-mails em massa
- Importar em ferramentas de CRM

---

## 💾 Onde os Dados São Armazenados

### Armazenamento Local (No Dispositivo)

Os dados são salvos localmente no aplicativo em dois locais:

#### 1. **Sessões de Pesquisa**
Chave de armazenamento: `survey_sessions`

Cada sessão contém:
```json
{
  "sessionId": "1234567890-abc123",
  "startTime": "2026-02-09T22:50:00.000Z",
  "endTime": "2026-02-09T22:53:00.000Z",
  "completed": true,
  "responses": [
    { "questionId": 1, "answer": "Mercadinho" },
    { "questionId": 2, "answer": "Sim" },
    // ... respostas das 8 perguntas
  ],
  "deviceType": "Web",
  "location": { "city": null, "state": null }
}
```

#### 2. **Contatos de Interessados**
Chave de armazenamento: `interested_contacts`

Cada contato contém:
```json
{
  "id": "1234567890-xyz789",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "whatsapp": "(11) 99999-9999",
  "registeredAt": "2026-02-09T22:55:00.000Z",
  "deviceType": "Web",
  "location": { "city": null, "state": null }
}
```

---

## 🔍 Acessando os Dados Brutos (Para Desenvolvedores)

Se você precisar acessar os dados brutos para análise ou integração:

### Via Browser DevTools (Web)

1. Abra o aplicativo no navegador
2. Pressione **F12** para abrir o DevTools
3. Vá para a aba **Console**
4. Cole um dos comandos abaixo:

**Ver todas as sessões de pesquisa:**
```javascript
localStorage.getItem('survey_sessions')
```

**Ver todos os interessados:**
```javascript
localStorage.getItem('interested_contacts')
```

**Copiar dados em formato JSON:**
```javascript
JSON.parse(localStorage.getItem('survey_sessions'))
```

### Via AsyncStorage (Aplicativo Mobile)

Se você estiver desenvolvendo ou testando o aplicativo:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ver sessões
const sessions = await AsyncStorage.getItem('survey_sessions');
console.log(JSON.parse(sessions));

// Ver interessados
const interested = await AsyncStorage.getItem('interested_contacts');
console.log(JSON.parse(interested));
```

---

## 📈 Interpretando os Dados

### Exemplo de Análise

**Cenário:** Você tem 100 acessos à pesquisa.

```
Total de Acessos: 100
Respostas Completas: 75
Taxa de Conversão: 75%

Interessados em Teste: 30
Taxa de Interesse: 40% (30 de 75 respondentes)
```

**O que isso significa:**
- 25% das pessoas que iniciaram a pesquisa não completaram (possível falta de interesse ou tempo)
- 75% completaram, indicando boa taxa de engajamento
- 40% dos respondentes estão interessados em testar o sistema (potencial cliente)

---

## 🔐 Segurança

### Senha do Painel
- Senha padrão: `admin123`
- **Recomendação:** Altere a senha antes de usar em produção
- Para alterar, edite o arquivo: `app/(tabs)/admin.tsx`

### Dados Sensíveis
- Os dados de e-mail e WhatsApp dos interessados são armazenados localmente
- **Importante:** Faça backup regularmente dos dados antes de limpar o cache do aplicativo

---

## 🚀 Próximos Passos

### Para Usar em Produção

1. **Integrar com Backend:**
   - Sincronizar dados com servidor
   - Armazenar em banco de dados seguro
   - Implementar autenticação robusta

2. **Enviar E-mails Automaticamente:**
   - Quando alguém se registra como interessado
   - Confirmação de participação na pesquisa
   - Notificação quando licenças de teste forem liberadas

3. **Análise Avançada:**
   - Gráficos interativos de respostas
   - Segmentação por tipo de negócio
   - Análise de intenção de pagamento por região

4. **Exportação de Dados:**
   - CSV (já implementado)
   - Excel com formatação
   - Integração com Google Sheets ou Salesforce

---

## ❓ Dúvidas Frequentes

**P: Posso ver as respostas de uma pessoa específica?**
R: Sim! No painel, cada sessão mostra o ID único e a data. Você pode clicar em uma sessão para ver todas as respostas.

**P: Como faço backup dos dados?**
R: Use a função "Exportar como CSV" para interessados. Para sessões, você pode usar o DevTools para copiar os dados JSON.

**P: Os dados são perdidos se eu limpar o cache do aplicativo?**
R: Sim. Os dados são armazenados localmente. Faça backup regularmente ou integre com um servidor backend.

**P: Posso mudar a senha do painel?**
R: Sim! Edite o arquivo `app/(tabs)/admin.tsx` e procure por `ADMIN_PASSWORD = "admin123"`. Altere para sua senha desejada.

---

## 📞 Suporte

Para dúvidas ou problemas ao acessar os dados, verifique:
1. Se você está na aba correta (Admin)
2. Se a senha está correta (admin123)
3. Se há dados registrados (pelo menos 1 pessoa completou a pesquisa)
4. Se o navegador/aplicativo está funcionando corretamente
