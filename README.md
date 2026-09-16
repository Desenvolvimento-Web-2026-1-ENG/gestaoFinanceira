# 💰 FinContas — Plataforma de Gestão Financeira Pessoal

> **Projeto Prático da Disciplina de Desenvolvimento Web — Avaliação P2**  
> **Tema:** Gestão Financeira de Gastos Pessoais  
> **Versão:** `v1.0.0-p2`

---

## 📌 1. Visão Geral do Projeto

O **FinContas** é uma aplicação web voltada ao controle, organização e análise de gastos pessoais. O problema que o projeto resolve é claro: muitas pessoas chegam ao fim do mês com uma conta alta sem saber exatamente com o que gastaram o seu dinheiro. O sistema permite registrar despesas de maneira simples, categorizar gastos e fornecer relatórios visuais (Dashboard) para facilitar a tomada de decisões financeiras.

Nesta **Avaliação P2**, o projeto evoluiu para uma **Single Page Application (SPA)** completa, integrando um Front-end dinâmico em **React.js + Vite** com o Back-end **Node.js/Express**, agora utilizando um banco de dados real SQLite por meio do **Prisma ORM**.

---

## 🚀 2. Tecnologias Utilizadas

### 🔙 Back-end
- **Runtime & Linguagem:** Node.js (v18+) e TypeScript
- **Framework Web:** Express.js
- **Banco de Dados & ORM:** SQLite + Prisma ORM (v6)
- **Segurança:** CORS Middleware
- **Documentação da API:** Swagger UI Express & OpenAPI 3.0
- **Ferramenta de Testes de API:** Postman

### 🎨 Front-end
- **Biblioteca Base:** React.js
- **Bundler:** Vite
- **Roteamento:** React Router DOM (v6)
- **Estilização:** Vanilla CSS Moderno (Variáveis, Flexbox, CSS Grid)
- **Ícones:** Lucide React
- **Integração HTTP:** Fetch API Nativa

---

## 🏗️ 3. Arquitetura do Sistema

### Clean Architecture (Back-end)
O back-end segue princípios rígidos de separação de responsabilidades (Clean Architecture):

```text
backend/
├── prisma/             # Schema do Prisma ORM e migrações (SQLite)
├── src/
│   ├── entities/       # Entidades de domínio (Gasto)
│   ├── repositories/   # Interfaces (IGastoRepository)
│   ├── services/       # Casos de uso e regras de negócio
│   ├── interfaces/     # Controladores HTTP (GastoController)
│   ├── factories/      # Injeção de dependências
│   └── infrastructure/
│       ├── database/   # Implementação com PrismaClient
│       └── http/       # Servidor Express, Rotas e Swagger
└── .env                # Variáveis de ambiente (CORS e DB)
```

### Arquitetura Componentizada (Front-end)
O Front-end foi estruturado em páginas e componentes reutilizáveis, seguindo o padrão Vite:

```text
frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis (Layout, Navbar)
│   ├── pages/          # Telas (Dashboard, GastosList, GastoForm)
│   ├── services/       # Módulo de requisições à API (api.js, gastoService.js)
│   ├── App.jsx         # Definição das rotas (React Router)
│   └── main.jsx        # Ponto de entrada do React
└── .env                # Variáveis de ambiente (VITE_API_URL)
```

---

## ⚙️ 4. Pré-requisitos e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) v18+ e NPM instalados.

### 🔙 Passo 1: Executar o Back-end
1. Clone o repositório e acesse a pasta do back-end:
   ```bash
   cd gestaoFinanceira/backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados e gere o Prisma Client:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init_sqlite
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   A API estará rodando em `http://localhost:3000`.

### 🎨 Passo 2: Executar o Front-end SPA
Abra um **novo terminal**, preservando o back-end rodando:
1. Acesse a pasta do front-end:
   ```bash
   cd gestaoFinanceira/frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o SPA:
   ```bash
   npm run dev
   ```
   A aplicação estará rodando em `http://localhost:5173`.

---

## 🌐 5. Acessos Rápidos

- **Aplicação Front-end SPA:** [http://localhost:5173](http://localhost:5173)
- **API Back-end:** [http://localhost:3000/api/v1](http://localhost:3000/api/v1)
- **Documentação Swagger:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- *(Também disponibilizamos a coleção Postman `FinContas.postman_collection.json` na raiz do projeto)*

---

## 🗄️ 6. Modelo de Dados (Prisma Schema)

O banco de dados SQLite é gerado e gerenciado através do Prisma. O modelo principal mapeado no arquivo `schema.prisma` é a tabela **Gasto**:

```prisma
model Gasto {
  id             String   @id @default(uuid())
  descricao      String
  valor          Float
  data           String
  categoria      String
  formaPagamento String
  criadoEm       DateTime @default(now())
}
```
*A data do gasto é armazenada como String `YYYY-MM-DD` para simplicidade de consulta de dashboards, enquanto `criadoEm` utiliza um timestamp real.*

---

## 🔗 7. Tabela de Endpoints da API

Abaixo estão os endpoints disponíveis no Back-end (`http://localhost:3000/api/v1`):

| Método | Endpoint | Descrição | Status Codes |
| :---: | :--- | :--- | :---: |
| `POST` | `/gastos` | Registra uma nova despesa | `201`, `400`, `500` |
| `GET` | `/gastos` | Lista gastos (suporta filtros `mes`, `ano`, `categoria`) | `200`, `500` |
| `GET` | `/gastos/:id` | Detalha um gasto específico | `200`, `400`, `404` |
| `PUT` | `/gastos/:id` | Atualiza dados de um gasto | `200`, `400`, `404` |
| `DELETE` | `/gastos/:id` | Exclui permanentemente um gasto | `200`, `400`, `404` |
| `GET` | `/categorias` | Retorna categorias consolidadas | `200`, `500` |
| `GET` | `/dashboard/resumo` | Retorna totalizadores financeiros | `200`, `500` |

---

## 📱 8. Wireframes

A interface React.js foi desenvolvida com base nos Wireframes iniciais do projeto. A documentação completa e o relacionamento tela-endpoint estão registrados no documento:
👉 **[`docs/WIREFRAMES.md`]([./docs/WIREFRAMES.md](https://github.com/Desenvolvimento-Web-2026-1-ENG/gestaoFinanceira/tree/main/docs/WIreframes))**

---

## 📝 9. Autor e Licença

**Autor:** Isaque
**Licença:** MIT
