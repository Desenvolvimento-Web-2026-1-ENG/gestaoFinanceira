# gestaoInvestimentos

# 📈 Gestão de Portfólio de Investimentos 

Uma API robusta desenvolvida em Node.js para gerenciamento e simulação de carteira de investimentos. O sistema permite que usuários registrem operações de compra e venda de ativos (ações e criptomoedas), calculando automaticamente o **Preço Médio** e consolidando o lucro ou prejuízo da carteira em tempo real.

---

## 🚀 Tecnologias Utilizadas

* **Ambiente de Execução:** Node.js
* **Framework Backend:** 
* **Linguagem:** 
* **Banco de Dados:** 

---

## 👥 Perfis do Sistema

* **Investidor:** Usuário final que registra suas operações, acompanha o saldo total, histórico de dividendos e a rentabilidade da sua carteira.
* **Analista (Admin):** Responsável por cadastrar e gerenciar a lista de ativos disponíveis na plataforma (tickers, nomes e tipos).

---

## 🎯 Histórias de Usuário (User Stories)

Com base no escopo e no perfil dos usuários, o desenvolvimento foi guiado pelas seguintes histórias:

* **Como** Analista, **quero** cadastrar novos ativos (Ticker, Nome, Tipo) **para que** os investidores possam selecioná-los em suas transações.
* **Como** Investidor, **quero** registrar minhas ordens de Compra e Venda **para que** o sistema recalcule meu Preço Médio e saldo atualizado do ativo.
* **Como** Investidor, **quero** visualizar um painel geral da minha carteira **para saber** meu saldo total acumulado e a porcentagem de lucro ou prejuízo.
* **Como** Investidor, **quero** lançar os dividendos recebidos **para que** esse rendimento extra seja contabilizado no retorno total da minha carteira.

---

## 🧮 Lógica Central: Cálculo do Preço Médio

O core business desta aplicação reside na atualização do custo médio de um ativo a cada nova movimentação:

* **Nas Compras:** O Preço Médio é recalculado somando o custo total da nova compra ao custo total acumulado anteriormente, dividindo pela nova quantidade total de ativos.
* **Nas Vendas:** A quantidade em carteira diminui, mas o Preço Médio permanece o mesmo. O lucro ou prejuízo é realizado no momento da venda (Diferença entre o preço de venda e o Preço Médio atual).

---

## 🛠️ Estrutura de Rotas (Endpoints da API)

### 👮 Perfis & Autenticação
* `POST /api/auth/register` - Cadastro de novos usuários (Investidor/Analista).
* `POST /api/auth/login` - Login e geração de token de acesso.

### 💼 Painel & Carteira (Investidor)
* `GET /api/dashboard` - Retorna o saldo total da carteira e o % geral de lucro/prejuízo.
* `GET /api/wallet` - Lista todos os ativos que o investidor possui, com quantidade, preço médio e valuation atual.

### 🔄 Transações & Dividendos (Investidor)
* `POST /api/transactions` - Registra uma nova ordem (Compra ou Venda).
* `GET /api/transactions/history` - Histórico completo de ordens do usuário.
* `POST /api/dividends` - Lançamento extra de proventos/dividendos recebidos.

### 📊 Ativos (Analista/Admin)
* `POST /api/assets` - Cadastro de um novo ativo (Ex: `PETR4`, `BTC`). *[Apenas Admin]*
* `GET /api/assets` - Lista todos os ativos cadastrados no sistema.

---

## 🏁 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18 ou superior) e o **npm** (ou yarn) instalados em sua máquina.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/invest-portfolio-api.git](https://github.com/seu-usuario/invest-portfolio-api.git)
   cd invest-portfolio-api