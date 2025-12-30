# Refund API

API simples para gerenciamento de pedidos de reembolso.

**Descrição:**
- Projeto exemplo para cadastrar usuários, autenticar sessões e gerenciar pedidos de reembolso com controle de permissões por papel (`employee`, `manager`).

**Tecnologias:**
- Node.js
- Express
- TypeScript
- Prisma (PostgreSQL/SQLite)
- JSON Web Tokens (JWT)

**Pré-requisitos:**
- Node.js >= 16
- npm ou pnpm

**Instalação:**
1. Clone o repositório:

   git clone <repo-url>
2. Instale dependências:

   npm install

**Configuração (variáveis de ambiente):**
- `DATABASE_URL` — string de conexão do banco (ex.: PostgreSQL). Ex: `postgresql://user:pass@localhost:5432/dbname`.
- `PORT` — porta onde a API será executada (opcional, padrão 3000).
- `JWT_SECRET` — segredo para assinar tokens JWT (o projeto atual pode ter um valor de teste no código).

> Observação: o arquivo `src/configs/jwt.ts` contém uma configuração de exemplo com segredo estático.

**Migrações Prisma:**
- Gerar client e aplicar migrações:

  npx prisma generate
  npx prisma migrate dev --name init

**Scripts:**
- `npm start` — inicia o servidor com `tsx` em modo watch (arquivo principal: `src/server.ts`).

**Endpoints principais:**
- POST /users — criar usuário (público)
- POST /sessions — autenticar / gerar token (público)

Rotas protegidas (requer `Authorization: Bearer <token>`):
- POST /refunds — criar reembolso (apenas papel `employee`)
- GET /refunds — listar reembolsos (apenas papel `manager`)
- GET /refunds/:id — visualizar reembolso (papéis `manager`, `employee`)

**Execução local:**
1. Configure `DATABASE_URL` e (opcionalmente) `JWT_SECRET`.
2. Rode migrações como indicado acima.
3. Inicie a API:

   npm start

**Exemplo rápido (login + uso de token):**
1) Autenticar (exemplo curl):

   curl -X POST http://localhost:3000/sessions -H "Content-Type: application/json" -d '{"email":"seu@email.com","password":"senha"}'

Resposta retorna um token JWT.

2) Fazer requisição protegida:

   curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/refunds

**Contribuições:**
- Abra uma issue ou envie um pull request.

**Referências:**
- Prisma: https://www.prisma.io/
- Express: https://expressjs.com/

