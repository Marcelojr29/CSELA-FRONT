# 🔐 Documentação Completa de Permissões e Níveis de Acesso - Sistema CSELA

## 👥 **Perfis de Usuário e Hierarquia**

### **1. ADMIN (Administrador) - Nível Máximo**
**Credencial de teste:** `admin@csela.org` / `admin123`

#### **Permissões Completas:**
- ✅ **CRUD Completo** em todas as funcionalidades
- ✅ **Gerenciamento de Usuários** (criar, editar, excluir, ativar/desativar)
- ✅ **Gerenciamento de Perfis** (criar novos perfis, editar permissões)
- ✅ **Acesso Total a Finanças** (visualizar, editar, exportar)
- ✅ **Exportação de Dados** (todos os relatórios e listas)
- ✅ **Configurações do Sistema**
- ✅ **Logs e Auditoria**

#### **O que o ADMIN pode fazer:**

**Dashboard Principal (`/dashboard`):**
- ✅ Visualizar todas as estatísticas
- ✅ Acessar todas as abas (Visão Geral, Notificações, Pagamentos)
- ✅ Exportar relatórios

**Moradores (`/dashboard/moradores`):**
- ✅ **CREATE:** Cadastrar novos moradores
- ✅ **READ:** Visualizar todos os moradores e detalhes
- ✅ **UPDATE:** Editar dados de moradores
- ✅ **DELETE:** Excluir moradores (com confirmação)
- ✅ **EXPORT:** Exportar lista de moradores
- ✅ **PRINT:** Imprimir fichas cadastrais
- ✅ Gerenciar pagamentos de moradores

**Finanças (`/dashboard/financas`):**
- ✅ Visualizar todos os cards de estatísticas financeiras
- ✅ Registrar pagamentos
- ✅ Editar valores e datas de pagamento
- ✅ Excluir registros de pagamento
- ✅ Exportar relatórios financeiros
- ✅ Acessar histórico completo

**Pontos de Distribuição (`/dashboard/pontos-distribuicao`):**
- ✅ **CRUD Completo:** Criar, visualizar, editar, excluir pontos
- ✅ Ativar/desativar pontos
- ✅ Exportar lista de pontos

**Usuários (`/dashboard/admin/usuarios`):**
- ✅ **CRUD Completo:** Gerenciar todos os usuários
- ✅ Alterar perfis de usuários
- ✅ Ativar/desativar contas
- ✅ Resetar senhas

**Perfis (`/dashboard/admin/perfis`):**
- ✅ **CRUD Completo:** Criar e editar perfis
- ✅ Definir permissões personalizadas
- ✅ Duplicar perfis existentes

**Dashboards (`/dashboard/dashboards/`):**
- ✅ Acessar dashboards mensais e anuais
- ✅ Exportar todos os relatórios
- ✅ Configurar períodos personalizados

**Administração (`/dashboard/administracao`):**
- ✅ Acesso total ao painel administrativo
- ✅ Visualizar receitas e despesas
- ✅ Configurar parâmetros do sistema
- ✅ Exportar relatórios administrativos

**Galeria (`/dashboard/galeria`):**
- ✅ **CRUD Completo:** Adicionar, editar, excluir fotos
- ✅ Organizar galeria do site
- ✅ Definir fotos de destaque

---

### **2. CONTADOR - Nível Intermediário (Somente Leitura + Exportação)**
**Credencial de teste:** `contador@csela.org` / `admin123`

#### **Permissões Limitadas:**
- ✅ **SOMENTE LEITURA** em todas as funcionalidades
- ✅ **EXPORTAÇÃO** de dados e relatórios
- ✅ **ANÁLISE** de dados financeiros
- ❌ **NENHUM CRUD** (não pode criar, editar ou excluir)
- ❌ **Gerenciamento de Usuários**
- ❌ **Configurações do Sistema**

#### **O que o CONTADOR pode fazer:**

**Dashboard Principal (`/dashboard`):**
- ✅ Visualizar todas as estatísticas (somente leitura)
- ✅ Acessar todas as abas para análise
- ✅ Exportar relatórios do dashboard
- ❌ Não pode alterar dados

**Moradores (`/dashboard/moradores`):**
- ✅ **READ ONLY:** Visualizar lista completa de moradores
- ✅ **READ ONLY:** Ver detalhes de cada morador
- ✅ **EXPORT:** Exportar lista de moradores
- ✅ **PRINT:** Imprimir fichas para análise
- ❌ **Não pode:** Cadastrar, editar ou excluir moradores
- ❌ **Não pode:** Alterar dados de pagamento

**Finanças (`/dashboard/financas`):**
- ✅ Visualizar todos os cards de estatísticas
- ✅ Analisar dados financeiros
- ✅ Visualizar histórico de pagamentos
- ✅ Exportar relatórios financeiros
- ❌ **Não pode:** Registrar ou editar pagamentos
- ❌ **Não pode:** Excluir registros

**Pontos de Distribuição (`/dashboard/pontos-distribuicao`):**
- ✅ **READ ONLY:** Visualizar lista de pontos
- ✅ **EXPORT:** Exportar dados dos pontos
- ❌ **Não pode:** Criar, editar ou excluir pontos

**Usuários (`/dashboard/admin/usuarios`):**
- ❌ **SEM ACESSO** - Menu não aparece na sidebar

**Perfis (`/dashboard/admin/perfis`):**
- ❌ **SEM ACESSO** - Menu não aparece na sidebar

**Dashboards (`/dashboard/dashboards/`):**
- ✅ Acessar dashboards mensais e anuais
- ✅ Analisar gráficos e métricas
- ✅ Exportar relatórios para análise
- ❌ Não pode alterar configurações

**Administração (`/dashboard/administracao`):**
- ✅ Visualizar dados administrativos
- ✅ Analisar receitas e despesas
- ✅ Exportar relatórios administrativos
- ❌ Não pode alterar configurações

**Galeria (`/dashboard/galeria`):**
- ✅ **READ ONLY:** Visualizar galeria
- ❌ **Não pode:** Adicionar, editar ou excluir fotos

---

### **3. FUNCIONÁRIO - Nível Básico (Acesso Limitado)**
**Credencial de teste:** `funcionario@csela.org` / `admin123`

#### **Permissões Muito Limitadas:**
- ✅ **CRUD Limitado** apenas em Moradores
- ✅ **Visualização Restrita** de dados financeiros
- ❌ **SEM EXPORTAÇÃO** de dados
- ❌ **SEM ACESSO** a configurações administrativas
- ❌ **SEM ACESSO** a dashboards completos

#### **O que o FUNCIONÁRIO pode fazer:**

**Dashboard Principal (`/dashboard`):**
- ❌ **SEM ACESSO** - Redirecionado automaticamente para `/dashboard/moradores`

**Moradores (`/dashboard/moradores`):**
- ✅ **CREATE:** Cadastrar novos moradores
- ✅ **READ:** Visualizar lista e detalhes de moradores
- ✅ **UPDATE:** Editar dados básicos de moradores
- ✅ **PRINT:** Imprimir fichas cadastrais
- ❌ **Não pode:** Excluir moradores
- ❌ **Não pode:** Exportar dados
- ❌ **Não pode:** Alterar dados financeiros

**Finanças (`/dashboard/financas`):**
- ✅ **READ ONLY:** Visualizar apenas a aba "Moradores"
- ✅ Consultar status de pagamentos
- ❌ **Não vê:** Cards de estatísticas financeiras
- ❌ **Não pode:** Registrar ou editar pagamentos
- ❌ **Não pode:** Exportar dados
- ❌ **Não tem:** Acesso à aba "Pagamentos Recentes"

**Pontos de Distribuição:**
- ❌ **SEM ACESSO** - Menu não aparece na sidebar

**Usuários:**
- ❌ **SEM ACESSO** - Menu não aparece na sidebar

**Perfis:**
- ❌ **SEM ACESSO** - Menu não aparece na sidebar

**Dashboards:**
- ❌ **SEM ACESSO** - Menu não aparece na sidebar

**Administração:**
- ❌ **SEM ACESSO** - Menu não aparece na sidebar

**Galeria (`/dashboard/galeria`):**
- ✅ **READ ONLY:** Visualizar galeria
- ✅ **CREATE:** Adicionar novas fotos
- ❌ **Não pode:** Editar ou excluir fotos existentes

---

## 🎯 **Resumo de Permissões por Funcionalidade**

| Funcionalidade | Admin | Contador | Funcionário |
|---|---|---|---|
| **Dashboard Principal** | ✅ Total | ✅ Leitura + Export | ❌ Sem Acesso |
| **Moradores - CRUD** | ✅ Total | ❌ Só Leitura | ✅ Limitado (sem Delete) |
| **Moradores - Export** | ✅ Sim | ✅ Sim | ❌ Não |
| **Finanças - Visualizar** | ✅ Total | ✅ Total | ✅ Limitado |
| **Finanças - Editar** | ✅ Sim | ❌ Não | ❌ Não |
| **Finanças - Export** | ✅ Sim | ✅ Sim | ❌ Não |
| **Pontos Distribuição** | ✅ Total | ✅ Leitura + Export | ❌ Sem Acesso |
| **Usuários** | ✅ Total | ❌ Sem Acesso | ❌ Sem Acesso |
| **Perfis** | ✅ Total | ❌ Sem Acesso | ❌ Sem Acesso |
| **Dashboards** | ✅ Total | ✅ Leitura + Export | ❌ Sem Acesso |
| **Administração** | ✅ Total | ✅ Leitura + Export | ❌ Sem Acesso |
| **Galeria** | ✅ Total | ✅ Leitura | ✅ Limitado |

---

## 🔒 **Implementação Técnica das Permissões**

### **Arquivo de Controle:** `hooks/use-perfis.tsx`

\`\`\`typescript
const perfis = [
  {
    id: "1",
    nome: "Administrador",
    role: UserRole.ADMIN,
    permissoes: {
      // CRUD Permissions
      cadastroMoradores: true,
      editarMoradores: true,
      excluirMoradores: true,
      
      // Financial Permissions
      acessoFinancas: true,
      editarFinancas: true,
      
      // Export Permissions
      exportarDados: true,
      
      // Admin Permissions
      cadastroUsuarios: true,
      gerenciarPerfis: true,
      
      // System Permissions
      acessoAdministracao: true,
      visualizarDashboards: true,
      gerenciarPontos: true,
      gerenciarGaleria: true,
    }
  },
  {
    id: "2", 
    nome: "Contador",
    role: UserRole.ACCOUNTANT,
    permissoes: {
      // CRUD Permissions (READ ONLY)
      cadastroMoradores: false,
      editarMoradores: false,
      excluirMoradores: false,
      
      // Financial Permissions (READ ONLY)
      acessoFinancas: true,
      editarFinancas: false,
      
      // Export Permissions
      exportarDados: true,
      
      // Admin Permissions (DENIED)
      cadastroUsuarios: false,
      gerenciarPerfis: false,
      
      // System Permissions (READ ONLY)
      acessoAdministracao: true,
      visualizarDashboards: true,
      gerenciarPontos: false,
      gerenciarGaleria: false,
    }
  },
  {
    id: "3",
    nome: "Funcionário", 
    role: UserRole.EMPLOYEE,
    permissoes: {
      // CRUD Permissions (LIMITED)
      cadastroMoradores: true,
      editarMoradores: true,
      excluirMoradores: false,
      
      // Financial Permissions (READ ONLY)
      acessoFinancas: true,
      editarFinancas: false,
      
      // Export Permissions (DENIED)
      exportarDados: false,
      
      // Admin Permissions (DENIED)
      cadastroUsuarios: false,
      gerenciarPerfis: false,
      
      // System Permissions (DENIED)
      acessoAdministracao: false,
      visualizarDashboards: false,
      gerenciarPontos: false,
      gerenciarGaleria: true, // LIMITED
    }
  }
]
\`\`\`

### **Controle de Acesso na Sidebar:** `components/dashboard/dashboard-sidebar.tsx`

\`\`\`typescript
// Filtra menus baseado nas permissões
const filteredSidebarItems = sidebarItems.filter((item) => {
  // Ocultar Home para funcionários
  if (item.hideForEmployee && user?.role === UserRole.EMPLOYEE) {
    return false
  }
  
  // Verificar permissões específicas
  if (!item.permission) return true
  return hasPermission(item.permission)
})
\`\`\`

### **Controle de Botões e Ações:**

\`\`\`typescript
// Exemplo em componentes
{hasPermission('exportarDados') && (
  <Button>Exportar</Button>
)}

{hasPermission('editarMoradores') && (
  <Button>Editar</Button>
)}

{hasPermission('excluirMoradores') && (
  <Button variant="destructive">Excluir</Button>
)}
\`\`\`

---

## 🚨 **Regras de Segurança Implementadas**

### **1. Redirecionamento Automático:**
- **Funcionário** logado é redirecionado para `/dashboard/moradores`
- **Admin/Contador** vão para `/dashboard`

### **2. Proteção de Rotas:**
- Verificação de permissões em `components/auth/auth-context.tsx`
- Redirecionamento automático se não tem permissão

### **3. Controle de Interface:**
- Botões aparecem/desaparecem baseado nas permissões
- Menus da sidebar filtrados por perfil
- Cards de estatísticas condicionais

### **4. Validação de Ações:**
- Verificação dupla: frontend + backend (quando implementado)
- Logs de auditoria para ações sensíveis
- Confirmação para ações destrutivas

---

## 📋 **Casos de Uso por Perfil**

### **ADMIN - "Gestor Completo"**
- Gerencia toda a operação
- Configura usuários e permissões  
- Controla finanças completamente
- Exporta todos os relatórios
- Toma decisões estratégicas

### **CONTADOR - "Analista Financeiro"**
- Analisa dados financeiros
- Exporta relatórios para análise externa
- Monitora adimplência e inadimplência
- Não altera dados operacionais
- Foco em análise e relatórios

### **FUNCIONÁRIO - "Operador de Campo"**
- Cadastra novos moradores
- Atualiza dados básicos
- Consulta informações para atendimento
- Não acessa dados financeiros sensíveis
- Foco no atendimento direto

---

## 🔄 **Fluxo de Trabalho Sugerido**

1. **FUNCIONÁRIO** cadastra novos moradores
2. **ADMIN** revisa e aprova cadastros
3. **FUNCIONÁRIO** atualiza dados conforme necessário
4. **ADMIN** gerencia pagamentos e finanças
5. **CONTADOR** analisa dados e gera relatórios
6. **ADMIN** toma decisões baseadas nos relatórios

---

*Esta documentação garante que cada perfil tenha acesso apenas ao que precisa para executar suas funções, mantendo a segurança e organização do sistema.*
