# CSELA - Centro Social e Educacional do Lago do Aleixo

Sistema de gestão para o serviço comunitário de água da CSELA.

## 🚀 Tecnologias

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: JSON Server (desenvolvimento)
- **Charts**: Recharts
- **Icons**: Lucide React

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
\`\`\`bash
git clone <repository-url>
cd csela-water-ngo
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:
\`\`\`bash
cp .env.example .env.local
\`\`\`

## 🚀 Executando o projeto

### Desenvolvimento completo (Frontend + Backend)

\`\`\`bash
npm run dev:full
\`\`\`

Este comando iniciará:
- JSON Server na porta 3001 (API)
- Next.js na porta 3000 (Frontend)

### Apenas Frontend

\`\`\`bash
npm run dev
\`\`\`

### Apenas Backend (JSON Server)

\`\`\`bash
npm run json-server
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
├── app/                    # Páginas Next.js (App Router)
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── dashboard/        # Componentes do dashboard
│   └── home/            # Componentes da home
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── types/               # Definições de tipos TypeScript
├── db.json             # Banco de dados JSON Server
└── public/             # Arquivos estáticos
\`\`\`

## 🔌 API Endpoints

O JSON Server fornece os seguintes endpoints:

- `GET /moradores` - Lista todos os moradores
- `GET /moradores/:id` - Busca morador por ID
- `POST /moradores` - Cria novo morador
- `PUT /moradores/:id` - Atualiza morador
- `DELETE /moradores/:id` - Remove morador

- `GET /pagamentos` - Lista todos os pagamentos
- `GET /pagamentos?moradorId=:id` - Pagamentos por morador
- `POST /pagamentos` - Registra novo pagamento

- `GET /usuarios` - Lista usuários do sistema
- `GET /pontosDistribuicao` - Lista pontos de distribuição
- `GET /perfis` - Lista perfis de acesso
- `GET /notificacoes` - Lista notificações
- `GET /galeria` - Lista fotos da galeria
- `GET /dashboardStats` - Estatísticas do dashboard

## 👥 Perfis de Usuário

- **Administrador**: Acesso total ao sistema
- **Contador**: Acesso a finanças e relatórios
- **Funcionário**: Operações básicas
- **Suporte**: Consultas e relatórios

## 🎯 Funcionalidades

### Dashboard
- Estatísticas gerais
- Gráficos de pagamentos
- Resumo financeiro

### Gestão de Moradores
- Cadastro completo
- Histórico de pagamentos
- Impressão de fichas e carnês
- Controle de inadimplência

### Gestão Financeira
- Registro de pagamentos
- Relatórios financeiros
- Controle de inadimplência
- Dashboards mensais e anuais

### Administração
- Gestão de usuários
- Controle de perfis
- Pontos de distribuição
- Galeria de fotos

### Notificações
- Avisos de pagamento
- Agendamento de cortes
- Comunicação com moradores

## 🔒 Autenticação

O sistema utiliza autenticação simples baseada em sessão. Para fazer login:

- **Admin**: admin@csela.org
- **Contador**: contador@csela.org  
- **Funcionário**: funcionario@csela.org
- **Suporte**: suporte@csela.org

## 📊 Relatórios

- Relatórios de pagamentos
- Estatísticas de inadimplência
- Dashboards interativos
- Exportação de dados

## 🖨️ Impressão

- Fichas cadastrais dos moradores
- Carnês de pagamento
- Relatórios financeiros
- Comprovantes de pagamento

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o frontend
- `npm run json-server` - Inicia o backend
- `npm run dev:full` - Inicia frontend + backend
- `npm run build` - Build de produção
- `npm run start` - Inicia versão de produção
- `npm run lint` - Executa o linter

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
