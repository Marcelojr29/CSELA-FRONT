# Documentação da Aplicação - Sistema de Gestão de Água ONG

## Visão Geral
Sistema web para gestão de distribuição de água comunitária, desenvolvido para o Centro Social e Educacional do Lago do Aleixo (CSELA). A aplicação permite gerenciar moradores, pagamentos, pontos de distribuição e relatórios financeiros.

## Estrutura da Aplicação

### Tecnologias Utilizadas
- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **TypeScript**: Para tipagem estática

## Páginas e Funcionalidades

### 1. Página Inicial (`/`)
**Arquivo**: `app/page.tsx`

**Componentes utilizados**:
- `HeroSection` - Seção principal com apresentação da ONG
- `AboutSection` - Seção sobre a organização
- `MissionVisionValues` - Missão, visão e valores
- `OperationAreas` - Áreas de atuação
- `InstagramCarousel` - Carrossel do Instagram
- `ContactForm` - Formulário de contato

**Dados mockados**: Não possui dados dinâmicos, apenas conteúdo estático.

---

### 2. Dashboard Principal (`/dashboard`)
**Arquivo**: `app/dashboard/page.tsx`

#### Cards de Estatísticas (Header)
\`\`\`typescript
// Dados mockados no arquivo app/dashboard/page.tsx (linhas 15-65)
const stats = {
  totalMoradores: 1234,
  crescimentoMoradores: "+15 no último mês",
  pagamentosMes: "R$ 24.565,00",
  crescimentoPagamentos: "+12.5% do mês anterior",
  pagamentosPendentes: "R$ 8.350,00",
  moradoresPendentes: "167 moradores com pagamentos pendentes",
  taxaAdimplencia: "86.5%",
  crescimentoAdimplencia: "+2.5% do mês anterior"
}
\`\`\`

#### Componentes do Dashboard
- **Cards de Estatísticas**: 4 cards principais com métricas
- **Alert de Atenção**: Aviso sobre moradores em atraso
- **Tabs**: 3 abas (Visão Geral, Notificações, Pagamentos Recentes)
- **Gráfico Overview**: Gráfico de barras dos últimos 6 meses
- **Tabela de Notificações**: Lista de moradores para notificar
- **Pagamentos Recentes**: Lista dos últimos pagamentos

**APIs necessárias**:
- `GET /api/dashboard/stats` - Estatísticas gerais
- `GET /api/dashboard/overview` - Dados para gráfico
- `GET /api/notifications` - Notificações pendentes
- `GET /api/payments/recent` - Pagamentos recentes

---

### 3. Gestão de Moradores (`/dashboard/moradores`)
**Arquivo**: `app/dashboard/moradores/page.tsx`

#### Funcionalidades
- **Listagem de moradores** com filtros (Todos, Adimplentes, Inadimplentes)
- **Busca** por nome, CPF, RG ou endereço
- **Controle de pagamento** mensal
- **Exportação** de dados
- **Cadastro** de novos moradores

#### Dados Mockados
**Arquivo**: `components/dashboard/moradores/moradores-table.tsx` (linhas 18-120)
\`\`\`typescript
const moradoresData = [
  {
    id: "1",
    nome: "João Silva",
    rg: "12.345.678-9",
    cpf: "123.456.789-00",
    nascimento: "1985-03-15",
    estadoCivil: "Casado(a)",
    rua: "Rua das Flores",
    numero: "123",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69000-000",
    telefone: "(92) 98765-4321",
    tipoResidencia: "Alvenaria",
    qtdPessoas: 4,
    tempoResidencia: "2020-01-15",
    observacao: "Morador muito colaborativo...",
    status: "adimplente",
    ultimoPagamento: "2023-06-15"
  }
  // ... mais moradores
]
\`\`\`

**APIs necessárias**:
- `GET /api/moradores` - Lista todos os moradores
- `GET /api/moradores?status=adimplente` - Filtra por status
- `POST /api/moradores` - Cadastra novo morador
- `PUT /api/moradores/:id` - Atualiza morador
- `DELETE /api/moradores/:id` - Remove morador

---

### 4. Cadastro de Morador (`/dashboard/moradores/cadastro`)
**Arquivo**: `app/dashboard/moradores/cadastro/page.tsx`
**Componente**: `components/dashboard/moradores/cadastro-morador-form.tsx`

#### Campos do Formulário
**Dados Pessoais**:
- Nome Completo (obrigatório)
- RG (obrigatório)
- CPF (obrigatório)
- Data de Nascimento (obrigatório)
- Estado Civil (select)

**Endereço**:
- Rua (obrigatório)
- Número (obrigatório)
- Comunidade (fixo: "PURAQUEQUARA (Com. Bela Vista)")
- CEP

**Contato**:
- Telefone (obrigatório)
- E-mail

**Informações da Residência**:
- Tipo de Residência (select: Madeira, Alvenaria, Mista, Estância)
- Quantidade de Pessoas (obrigatório)
- Tempo de Residência (obrigatório)

**Observações**:
- Campo de texto livre

**API necessária**:
- `POST /api/moradores` - Cadastra novo morador

---

### 5. Detalhes do Morador (`/dashboard/moradores/[id]`)
**Arquivo**: `app/dashboard/moradores/[id]/page.tsx`

#### Funcionalidades
- **Visualização completa** dos dados do morador
- **Cálculo automático** de idade e tempo de residência
- **Impressão de ficha** cadastral formatada
- **Botões de ação**: Editar, Ver Pagamentos, Imprimir Ficha

#### Dados Mockados
\`\`\`typescript
// Arquivo: app/dashboard/moradores/[id]/page.tsx (linhas 25-65)
const moradorMock = {
  id: id,
  nome: "Maria Silva Santos",
  rg: "12.345.678-9",
  cpf: "123.456.789-00",
  nascimento: "1985-03-15",
  estadoCivil: "Casado(a)",
  // ... outros campos
}
\`\`\`

**API necessária**:
- `GET /api/moradores/:id` - Busca morador por ID

---

### 6. Finanças (`/dashboard/financas`)
**Arquivo**: `app/dashboard/financas/page.tsx`

#### Funcionalidades por Perfil
**Administrador/Coordenador**:
- Cards de estatísticas financeiras
- Tabela de moradores com valores devidos
- Histórico de pagamentos
- Registro de novos pagamentos

**Funcionário**:
- Apenas visualização dos dados dos moradores
- Sem acesso a estatísticas financeiras

#### Cards de Estatísticas
\`\`\`typescript
// Dados mockados no arquivo (linhas 25-75)
const statsFinanceiras = {
  totalArrecadadoMes: "R$ 24.565,00",
  crescimentoMes: "+12.5% do mês anterior",
  totalArrecadadoAno: "R$ 287.350,00",
  crescimentoAno: "+8.2% do ano anterior",
  pagamentosPendentes: "R$ 8.350,00",
  moradoresPendentes: "167 moradores",
  taxaAdimplencia: "86.5%",
  crescimentoAdimplencia: "+2.5% do mês anterior"
}
\`\`\`

**APIs necessárias**:
- `GET /api/financas/stats` - Estatísticas financeiras
- `GET /api/financas/moradores` - Lista moradores com dados financeiros
- `POST /api/pagamentos` - Registra novo pagamento

---

### 7. Tabela Financeira de Moradores
**Arquivo**: `components/dashboard/financas/financas-moradores-table.tsx`

#### Dados Mockados (linhas 20-120)
\`\`\`typescript
const moradoresData = [
  {
    id: "1",
    nome: "Maria Silva",
    cpf: "123.456.789-00",
    endereco: "Rua das Flores, 123",
    telefone: "(92) 98765-4321",
    status: "adimplente",
    ultimoPagamento: "2023-06-15",
    valorMensal: 250.0,
    valorDevido: 0,
    mesesAtraso: 0,
    observacao: "Morador muito colaborativo..."
  }
  // ... mais moradores
]
\`\`\`

**APIs necessárias**:
- `GET /api/financas/moradores` - Lista com dados financeiros
- `GET /api/moradores/:id/pagamentos` - Histórico de pagamentos

---

### 8. Pagamentos (`/dashboard/pagamentos`)
**Arquivo**: `app/dashboard/pagamentos/page.tsx`
**Componente**: `components/dashboard/payments-list.tsx`

#### Funcionalidades
- **Lista de pagamentos** com filtros
- **Busca** por usuário, método ou status
- **Registro** de novos pagamentos
- **Exportação** de dados
- **Ações**: Ver detalhes, Editar, Emitir recibo, Cancelar

#### Dados Mockados (linhas 15-85)
\`\`\`typescript
const payments = [
  {
    id: "1",
    user: "Maria Silva",
    amount: 250.0,
    date: "2023-06-15",
    status: "pago", // pago, pendente, atrasado
    method: "Cartão de Crédito" // Cartão de Crédito, Boleto, Pix
  }
  // ... mais pagamentos
]
\`\`\`

**APIs necessárias**:
- `GET /api/pagamentos` - Lista todos os pagamentos
- `POST /api/pagamentos` - Registra novo pagamento
- `PUT /api/pagamentos/:id` - Atualiza pagamento
- `DELETE /api/pagamentos/:id` - Cancela pagamento

---

### 9. Pontos de Distribuição (`/dashboard/pontos-distribuicao`)
**Arquivo**: `app/dashboard/pontos-distribuicao/page.tsx`

#### Funcionalidades
- **Mapa** dos pontos de distribuição
- **Lista** de pontos cadastrados
- **Cadastro** de novos pontos
- **Edição** de pontos existentes

#### Dados Mockados
**Arquivo**: `components/dashboard/pontos-distribuicao/pontos-distribuicao-table.tsx`
\`\`\`typescript
const pontosData = [
  {
    id: "1",
    nome: "Ponto Central",
    endereco: "Rua Principal, 100",
    responsavel: "João Silva",
    telefone: "(92) 99999-9999",
    status: "ativo",
    capacidade: "1000L",
    ultimaManutencao: "2023-06-01"
  }
  // ... mais pontos
]
\`\`\`

**APIs necessárias**:
- `GET /api/pontos-distribuicao` - Lista pontos
- `POST /api/pontos-distribuicao` - Cadastra ponto
- `PUT /api/pontos-distribuicao/:id` - Atualiza ponto
- `DELETE /api/pontos-distribuicao/:id` - Remove ponto

---

### 10. Relatórios (`/dashboard/relatorios`)
**Arquivo**: `app/dashboard/relatorios/page.tsx`

#### Tipos de Relatórios
- **Relatório Mensal** de pagamentos
- **Relatório Anual** de arrecadação
- **Relatório de Inadimplência**
- **Relatório de Moradores** por região

**APIs necessárias**:
- `GET /api/relatorios/mensal` - Dados mensais
- `GET /api/relatorios/anual` - Dados anuais
- `GET /api/relatorios/inadimplencia` - Dados de inadimplência
- `GET /api/relatorios/moradores` - Dados de moradores

---

### 11. Administração (`/dashboard/administracao`)
**Arquivo**: `app/dashboard/administracao/page.tsx`

#### Funcionalidades
- **Gestão de usuários** do sistema
- **Configurações** gerais
- **Backup** de dados
- **Logs** do sistema

---

### 12. Galeria (`/dashboard/galeria`)
**Arquivo**: `app/dashboard/galeria/page.tsx`

#### Funcionalidades
- **Upload** de fotos
- **Organização** por categorias
- **Edição** de metadados
- **Exclusão** de imagens

---

## Componentes Principais

### 1. Sidebar de Navegação
**Arquivo**: `components/dashboard/dashboard-sidebar.tsx`

#### Estrutura de Menu
\`\`\`typescript
const menuItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Moradores", url: "/dashboard/moradores", icon: Users },
  { title: "Finanças", url: "/dashboard/financas", icon: DollarSign },
  { title: "Pagamentos", url: "/dashboard/pagamentos", icon: CreditCard },
  { title: "Pontos de Distribuição", url: "/dashboard/pontos-distribuicao", icon: MapPin },
  { title: "Relatórios", url: "/dashboard/relatorios", icon: FileText },
  { title: "Galeria", url: "/dashboard/galeria", icon: Image },
  { title: "Administração", url: "/dashboard/administracao", icon: Settings }
]
\`\`\`

### 2. Gráfico Overview
**Arquivo**: `components/dashboard/overview.tsx`

#### Dados Mockados (linhas 5-35)
\`\`\`typescript
const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Fev", total: Math.floor(Math.random() * 5000) + 1000 },
  // ... outros meses
]
\`\`\`

**API necessária**:
- `GET /api/dashboard/overview?period=6months` - Dados para gráfico

### 3. Tabela de Notificações
**Arquivo**: `components/dashboard/notifications-table.tsx`

#### Dados Mockados
\`\`\`typescript
const notifications = [
  {
    id: "1",
    morador: "João Silva",
    tipo: "Pagamento em Atraso",
    dias: 15,
    valor: "R$ 150,00",
    status: "pendente"
  }
  // ... mais notificações
]
\`\`\`

**API necessária**:
- `GET /api/notifications` - Lista de notificações

---

## Sistema de Autenticação

### Contexto de Autenticação
**Arquivo**: `components/auth/auth-context.tsx`

#### Tipos de Usuário
\`\`\`typescript
enum UserRole {
  ADMIN = "admin",
  COORDINATOR = "coordinator", 
  EMPLOYEE = "employee"
}
\`\`\`

#### Permissões por Perfil
- **Admin**: Acesso total ao sistema
- **Coordinator**: Acesso a relatórios e gestão de moradores
- **Employee**: Acesso limitado apenas à visualização

---

## Tipos e Interfaces

### 1. Tipos de Usuário
**Arquivo**: `types/user.ts`
\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}
\`\`\`

### 2. Tipos de Pagamento
**Arquivo**: `types/payment.ts`
\`\`\`typescript
interface Payment {
  id: string
  moradorId: string
  valor: number
  data: string
  status: "pago" | "pendente" | "atrasado"
  metodo: "cartao" | "boleto" | "pix" | "dinheiro"
}
\`\`\`

---

## Funcionalidades de Impressão

### 1. Ficha Cadastral
**Localização**: `app/dashboard/moradores/[id]/page.tsx` (função `handleImprimirFicha`)

Gera uma ficha cadastral formatada seguindo o modelo oficial da CSELA com:
- Cabeçalho da organização
- Dados pessoais do morador
- Informações de endereço
- Dados da residência
- Campos para assinatura

### 2. Carnê de Pagamento
**Localização**: `components/dashboard/moradores/carne-digital.tsx`

Gera carnês mensais ou anuais com:
- Dados do morador
- Valores e vencimentos
- Código de barras (simulado)
- Instruções de pagamento

---

## Próximos Passos para Integração com API

### 1. Substituir Dados Mockados
Todos os arrays de dados mockados devem ser substituídos por chamadas de API:

\`\`\`typescript
// Antes (mockado)
const moradores = moradoresData.filter(...)

// Depois (API)
const { data: moradores } = await fetch('/api/moradores')
\`\`\`

### 2. Implementar Estados de Loading
Adicionar estados de carregamento em todas as tabelas e listas:

\`\`\`typescript
const [loading, setLoading] = useState(true)
const [data, setData] = useState([])
\`\`\`

### 3. Tratamento de Erros
Implementar tratamento de erros para todas as operações:

\`\`\`typescript
try {
  const response = await fetch('/api/moradores')
  if (!response.ok) throw new Error('Erro ao carregar dados')
  const data = await response.json()
} catch (error) {
  toast({
    title: "Erro",
    description: "Não foi possível carregar os dados",
    variant: "destructive"
  })
}
\`\`\`

### 4. Validação de Formulários
Implementar validação robusta nos formulários usando bibliotecas como Zod ou Yup.

### 5. Paginação
Implementar paginação nas tabelas que podem ter muitos registros.

---

## Estrutura de Arquivos

\`\`\`
app/
├── dashboard/
│   ├── page.tsx                    # Dashboard principal
│   ├── moradores/
│   │   ├── page.tsx               # Lista de moradores
│   │   ├── cadastro/page.tsx      # Cadastro de morador
│   │   └── [id]/page.tsx          # Detalhes do morador
│   ├── financas/page.tsx          # Gestão financeira
│   ├── pagamentos/page.tsx        # Lista de pagamentos
│   └── ...
├── globals.css                    # Estilos globais
└── layout.tsx                     # Layout principal

components/
├── dashboard/
│   ├── dashboard-sidebar.tsx      # Menu lateral
│   ├── overview.tsx              # Gráfico principal
│   ├── moradores/                # Componentes de moradores
│   ├── financas/                 # Componentes financeiros
│   └── ...
├── ui/                           # Componentes shadcn/ui
└── auth/                         # Componentes de autenticação

types/
├── user.ts                      # Tipos de usuário
├── payment.ts                   # Tipos de pagamento
└── ...
\`\`\`

---

## Considerações Técnicas

### Performance
- Implementar lazy loading para componentes pesados
- Usar React.memo para componentes que não precisam re-renderizar
- Implementar cache de dados quando apropriado

### Segurança
- Validar todas as entradas do usuário
- Implementar autenticação JWT
- Controlar acesso baseado em roles
- Sanitizar dados antes de exibir

### Acessibilidade
- Todos os formulários possuem labels apropriados
- Navegação por teclado funcional
- Contraste adequado de cores
- Textos alternativos para imagens

---

Esta documentação serve como guia completo para entender a estrutura da aplicação e facilitar a integração com APIs reais. Cada seção indica claramente onde estão os dados mockados e quais APIs precisam ser implementadas.
