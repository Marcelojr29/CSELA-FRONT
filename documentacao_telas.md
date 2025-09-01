# 📋 Documentação Completa das Telas - Sistema CSELA

## 🏠 **Páginas Públicas (Fora do Dashboard)**

### **1. Página Inicial (`/`)**
**Arquivo:** `app/page.tsx`
**Acesso:** Público (todos os usuários)

**Descrição:**
Página principal do site da ONG CSELA com informações institucionais.

**Conteúdo:**
- **Hero Section:** Banner principal com título "Levando Água Limpa para Comunidades Necessitadas"
- **Seção Sobre:** Apresentação da organização e missão
- **Missão, Visão e Valores:** Cards explicativos sobre os pilares da ONG
- **Galeria de Fotos:** Carrossel com imagens dos projetos
- **Formulário de Contato:** Para visitantes entrarem em contato

**Componentes:**
- `HeroSection` - Banner principal
- `AboutSection` - Seção sobre a ONG
- `MissionVisionValues` - Cards com missão/visão/valores
- `GalleryCarousel` - Carrossel de imagens
- `ContactForm` - Formulário de contato

---

### **2. Nossa História (`/nossa-historia`)**
**Arquivo:** `app/nossa-historia/page.tsx`
**Acesso:** Público (todos os usuários)

**Descrição:**
Página dedicada à história e trajetória da CSELA.

**Conteúdo:**
- **Título Principal:** "Nossa História"
- **Seção "Como Tudo Começou":** Card explicando a origem da ONG em 2005
- **Timeline Interativa:** Marcos importantes de 2005 a 2023
  - 2005: Fundação
  - 2008: Expansão Regional
  - 2012: Reconhecimento Nacional
  - 2015: Ponto Crucial
  - 2018: Internacionalização
  - 2023: Atualidade
- **Seção "Nos Dias Atuais":** Situação atual da organização
- **Eventos Importantes:** Grid com 6 cards de eventos anuais

**Componentes:**
- `Timeline` - Linha do tempo interativa
- Cards informativos

---

### **3. Contato (`/contato`)**
**Arquivo:** `app/contato/page.tsx`
**Acesso:** Público (todos os usuários)

**Descrição:**
Página de contato com formulário e informações da sede.

**Conteúdo:**
- **Formulário de Contato:** Lado esquerdo da tela
- **Informações de Contato:** Lado direito com:
  - Endereço completo
  - Telefones de contato
  - E-mails institucionais
  - Horário de atendimento
- **Mapa:** Localização da sede (placeholder)

**Componentes:**
- `ContactForm` - Formulário de contato
- Cards com informações de contato

---

### **4. Seja Voluntário (`/associe-se`)**
**Arquivo:** `app/associe-se/page.tsx`
**Acesso:** Público (todos os usuários)

**Descrição:**
Página para cadastro de voluntários.

**Conteúdo:**
- **Título:** "Seja Voluntário"
- **Áreas de Atuação:** 3 cards explicando:
  - Campo: Trabalho direto nas comunidades
  - Técnica: Conhecimentos especializados
  - Administrativa: Gestão e organização
- **Formulário de Voluntário:** Cadastro completo

**Componentes:**
- `VolunteerForm` - Formulário de cadastro de voluntário
- Cards explicativos das áreas

---

### **5. Login (`/login`)**
**Arquivo:** `app/login/page.tsx`
**Acesso:** Público (não logados)

**Descrição:**
Página de autenticação para acesso ao dashboard.

**Conteúdo:**
- **Formulário de Login:**
  - Campo de e-mail
  - Campo de senha
  - Link "Esqueceu a senha?"
  - Botão "Entrar"
- **Credenciais de Teste:** Badges informativos mostrando:
  - Admin: admin@csela.org
  - Contador: contador@csela.org
  - Funcionário: funcionario@csela.org
  - Senha: admin123

**Funcionalidades:**
- Autenticação mockada
- Redirecionamento para dashboard após login
- Estados de loading

---

## 🏢 **Dashboard - Área Administrativa**

### **6. Dashboard Principal (`/dashboard`)**
**Arquivo:** `app/dashboard/page.tsx`
**Acesso:** Admin, Contador, Funcionário

**Descrição:**
Tela principal do sistema administrativo com visão geral de todas as métricas.

**Conteúdo:**
- **Header:** Título "Home" + botão de notificações (badge com "5")
- **4 Cards de Estatísticas:**
  1. **Total de Moradores:** 1.234 (+15 no último mês)
  2. **Pagamentos do Mês:** R$ 24.565,00 (+12.5% do mês anterior)
  3. **Pagamentos Pendentes:** R$ 8.350,00 (167 moradores)
  4. **Taxa de Adimplência:** 86.5% (+2.5% do mês anterior)

- **Alerta Importante:** Banner vermelho informando sobre 32 moradores com +3 meses de atraso

- **Abas Principais:**
  - **Visão Geral:** Gráfico de pagamentos dos últimos 6 meses
  - **Notificações:** Tabela com moradores para notificar
  - **Pagamentos Recentes:** Lista dos últimos pagamentos

**Componentes:**
- `Overview` - Gráfico principal
- `NotificationsTable` - Tabela de notificações
- `RecentPayments` - Lista de pagamentos recentes

---

### **7. Moradores (`/dashboard/moradores`)**
**Arquivo:** `app/dashboard/moradores/page.tsx`
**Acesso:** Admin, Contador, Funcionário

**Descrição:**
Gestão completa dos moradores cadastrados no sistema.

**Conteúdo:**
- **Header:** Título "Moradores" + botões "Exportar" e "Novo Morador"
- **4 Abas Principais:**
  1. **Todos:** Lista completa de moradores
  2. **Adimplentes:** Moradores com pagamentos em dia
  3. **Inadimplentes:** Moradores com pagamentos em atraso
  4. **Controle de Pagamento:** Gestão mensal de pagamentos

**Funcionalidades:**
- Tabela com filtros e busca
- Ações por morador: Ver detalhes, Editar, Pagamentos
- Exportação de dados
- Cadastro de novos moradores

**Componentes:**
- `MoradoresTable` - Tabela principal
- `ControlePagamentoTable` - Controle de pagamentos

---

### **8. Cadastro de Morador (`/dashboard/moradores/cadastro`)**
**Arquivo:** `app/dashboard/moradores/cadastro/page.tsx`
**Acesso:** Admin, Contador, Funcionário

**Descrição:**
Formulário completo para cadastro de novos moradores.

**Conteúdo:**
- **Header:** Botão voltar + título "Cadastro de Morador"
- **Formulário Organizado em Seções:**
  1. **Dados Pessoais:**
     - Nome completo*
     - RG*
     - CPF*
     - Data de nascimento*
     - Estado civil*
  
  2. **Endereço:**
     - Rua*
     - Número*
     - Comunidade*
     - CEP*
  
  3. **Contato:**
     - Telefone*
     - E-mail
  
  4. **Informações da Residência:**
     - Tipo de residência*
     - Quantidade de pessoas*
     - Tempo de residência*
  
  5. **Observações:**
     - Campo de texto livre

- **Botões de Ação:** Cancelar e Cadastrar

**Componentes:**
- `CadastroMoradorForm` - Formulário completo

---

### **9. Detalhes do Morador (`/dashboard/moradores/[id]`)**
**Arquivo:** `app/dashboard/moradores/[id]/page.tsx`
**Acesso:** Admin, Contador, Funcionário

**Descrição:**
Visualização completa dos dados de um morador específico.

**Conteúdo:**
- **Header:** Botão voltar + nome do morador + ações (Editar, Pagamentos, Imprimir Ficha)
- **6 Cards Informativos:**
  1. **Informações Pessoais:** Nome, RG, CPF, nascimento, estado civil, e-mail
  2. **Contato:** Telefone e e-mail
  3. **Endereço:** Rua, número, bairro, CEP
  4. **Residência:** Tipo, quantidade de pessoas, tempo de residência
  5. **Informações Financeiras:** Status, valor mensal, último pagamento
  6. **Observações:** (se houver)

**Funcionalidades Especiais:**
- **Impressão de Ficha:** Gera ficha cadastral formatada para impressão
- **Cálculo de Idade:** Automático baseado na data de nascimento
- **Cálculo de Tempo de Residência:** Automático em anos e meses
- **Ícone de Observações:** Mostra ícone se houver observações

---

### **10. Finanças (`/dashboard/financas`)**
**Arquivo:** `app/dashboard/financas/page.tsx`
**Acesso:** Admin, Contador, Funcionário (com restrições)

**Descrição:**
Gestão financeira com diferentes níveis de acesso por perfil.

**Conteúdo por Perfil:**

**Admin/Contador:**
- **4 Cards de Estatísticas:**
  1. Total Arrecadado (Mês): R$ 24.565,00
  2. Total Arrecadado (Ano): R$ 287.350,00
  3. Pagamentos Pendentes: R$ 8.350,00
  4. Taxa de Adimplência: 86.5%
- **2 Abas:**
  - Moradores: Tabela para registrar pagamentos
  - Pagamentos Recentes: Histórico de pagamentos

**Funcionário:**
- **Apenas 1 Aba:**
  - Moradores: Visualização dos dados financeiros (sem cards de estatísticas)

**Componentes:**
- `FinancasMoradoresTable` - Tabela de moradores
- `PagamentosRecentes` - Lista de pagamentos

---

### **11. Pontos de Distribuição (`/dashboard/pontos-distribuicao`)**
**Arquivo:** `app/dashboard/pontos-distribuicao/page.tsx`
**Acesso:** Admin, Contador

**Descrição:**
Gestão dos pontos de distribuição de água.

**Conteúdo:**
- **Header:** Título + botões "Exportar" e "Novo Ponto"
- **Tabela de Pontos:** Lista todos os pontos cadastrados
- **Informações por Ponto:**
  - Nome/Localização
  - Status (Ativo/Inativo)
  - Capacidade
  - Responsável
  - Ações (Ver, Editar, Desativar)

**Componentes:**
- `PontosDistribuicaoTable` - Tabela principal

---

### **12. Cadastro de Ponto (`/dashboard/pontos-distribuicao/cadastro`)**
**Arquivo:** `app/dashboard/pontos-distribuicao/cadastro/page.tsx`
**Acesso:** Admin, Contador

**Descrição:**
Formulário para cadastro de novos pontos de distribuição.

**Conteúdo:**
- **Header:** Botão voltar + título
- **Formulário com Campos:**
  - Nome do ponto
  - Endereço completo
  - Coordenadas GPS
  - Capacidade
  - Responsável
  - Status inicial
  - Observações

**Componentes:**
- `CadastroPontoForm` - Formulário de cadastro

---

### **13. Usuários do Sistema (`/dashboard/admin/usuarios`)**
**Arquivo:** `app/dashboard/admin/usuarios/page.tsx`
**Acesso:** Apenas Admin

**Descrição:**
Gestão de usuários que têm acesso ao sistema.

**Conteúdo:**
- **Header:** Título + botões "Exportar" e "Novo Usuário"
- **Tabela de Usuários:**
  - Nome completo
  - E-mail
  - Perfil (Admin/Contador/Funcionário)
  - Status (Ativo/Inativo)
  - Último acesso
  - Ações (Ver, Editar, Desativar)

**Funcionalidades:**
- Modal para cadastro de usuário
- Modal para edição de usuário
- Controle de perfis e permissões

**Componentes:**
- `UsuariosTable` - Tabela principal
- `CadastroUsuarioModal` - Modal de cadastro

---

### **14. Perfis de Acesso (`/dashboard/admin/perfis`)**
**Arquivo:** `app/dashboard/admin/perfis/page.tsx`
**Acesso:** Apenas Admin

**Descrição:**
Gestão dos perfis de acesso e suas permissões.

**Conteúdo:**
- **Header:** Ícone de escudo + título + botões "Atualizar" e "Novo Perfil"
- **Tabela de Perfis:**
  - Nome do perfil
  - Descrição
  - Permissões
  - Usuários vinculados
  - Status
  - Ações (Ver, Editar, Duplicar)

**Perfis Padrão:**
- **Admin:** Acesso total ao sistema
- **Contador:** Acesso a finanças e relatórios
- **Funcionário:** Acesso limitado a consultas

**Componentes:**
- `PerfisTable` - Tabela de perfis
- `CriarPerfilModal` - Modal de criação

---

### **15. Dashboard Mensal (`/dashboard/dashboards/mensal`)**
**Arquivo:** `app/dashboard/dashboards/mensal/page.tsx`
**Acesso:** Admin, Contador

**Descrição:**
Relatório detalhado dos dados mensais.

**Conteúdo:**
- **Header:** Título + botão "Exportar para Excel"
- **4 Cards de Métricas Mensais:**
  1. Total do Mês: R$ 24.565,00
  2. Moradores Pagantes: 491
  3. Moradores Pendentes: 76
  4. Taxa de Adimplência: 86.5%
- **Gráfico:** Pagamentos diários do mês atual

**Componentes:**
- `DashboardMensal` - Gráfico de pagamentos diários

---

### **16. Dashboard Anual (`/dashboard/dashboards/anual`)**
**Arquivo:** `app/dashboard/dashboards/anual/page.tsx`
**Acesso:** Admin, Contador

**Descrição:**
Relatório detalhado dos dados anuais.

**Conteúdo:**
- **Header:** Título + botão "Exportar para Excel"
- **4 Cards de Métricas Anuais:**
  1. Total Arrecadado (Ano): R$ 287.350,00
  2. Moradores Pagantes: 1.067
  3. Moradores Pendentes: 167
  4. Taxa de Adimplência Anual: 86.5%
- **Gráfico:** Arrecadação mensal durante o ano

**Componentes:**
- `DashboardAnual` - Gráfico de arrecadação anual

---

### **17. Administração (`/dashboard/administracao`)**
**Arquivo:** `app/dashboard/administracao/page.tsx`
**Acesso:** Apenas Admin

**Descrição:**
Painel administrativo com controle financeiro completo.

**Conteúdo:**
- **Header:** Título + seletor de período + botão "Exportar"
- **4 Cards Financeiros:**
  1. Total Arrecadado (Ano): R$ 287.350,00
  2. Total Arrecadado (Mês): R$ 24.565,00
  3. Despesas (Mês): R$ 12.350,00
  4. Saldo Líquido (Mês): R$ 12.215,00

- **2 Abas com Gráficos:**
  - **Ganhos Mensais:** Gráfico de ganhos por mês
  - **Ganhos Anuais:** Gráfico de ganhos por ano

**Componentes:**
- `GanhosMensais` - Gráfico mensal
- `GanhosAnuais` - Gráfico anual
- `DatePickerWithRange` - Seletor de período

---

### **18. Galeria (`/dashboard/galeria`)**
**Arquivo:** `app/dashboard/galeria/page.tsx`
**Acesso:** Admin, Contador

**Descrição:**
Gestão da galeria de fotos do site institucional.

**Conteúdo:**
- **Header:** Título + botão "Adicionar Foto"
- **Grid de Fotos:** Visualização em grade das imagens
- **Ações por Foto:**
  - Visualizar em tamanho completo
  - Editar informações
  - Excluir
  - Definir como destaque

**Funcionalidades:**
- Upload de imagens
- Edição de metadados (título, descrição, tags)
- Organização por categorias
- Controle de visibilidade no site

**Componentes:**
- `GalleryManager` - Gerenciador principal
- `AddPhotoModal` - Modal de adição
- `EditPhotoModal` - Modal de edição

---

## 🔐 **Sistema de Autenticação e Permissões**

### **Perfis de Usuário:**

1. **Admin (Administrador):**
   - Acesso total a todas as funcionalidades
   - Pode gerenciar usuários e perfis
   - Acesso a dados financeiros completos
   - Pode exportar relatórios

2. **Contador:**
   - Acesso a finanças e relatórios
   - Pode gerenciar moradores
   - Pode ver dashboards mensais/anuais
   - Não pode gerenciar usuários

3. **Funcionário:**
   - Acesso limitado a consultas
   - Pode ver dados de moradores
   - Acesso restrito a finanças (apenas visualização)
   - Não pode exportar dados

### **Navegação (Sidebar):**
A sidebar muda conforme o perfil do usuário:

**Admin:** Vê todos os menus
**Contador:** Não vê "Admin" e "Usuários"
**Funcionário:** Vê apenas "Home", "Moradores" e "Finanças" (limitado)

---

## 📊 **Dados Mockados - Localização para APIs**

### **Estatísticas Principais:**
- **Arquivo:** `app/dashboard/page.tsx` (linhas 25-45)
- **Dados:** Total moradores, pagamentos, pendências, adimplência

### **Lista de Moradores:**
- **Arquivo:** `components/dashboard/moradores/moradores-table.tsx`
- **Dados:** Array com moradores completos

### **Dados Financeiros:**
- **Arquivo:** `app/dashboard/financas/page.tsx` (linhas 20-60)
- **Dados:** Valores arrecadados, despesas, saldos

### **Gráficos:**
- **Arquivo:** `components/dashboard/overview.tsx`
- **Dados:** Séries temporais para gráficos

### **Autenticação:**
- **Arquivo:** `components/auth/auth-context.tsx`
- **Dados:** Usuários e credenciais mockadas

---

## 🎯 **Próximos Passos para Integração**

1. **Substituir dados mockados por chamadas de API**
2. **Implementar autenticação real (JWT/OAuth)**
3. **Adicionar validação robusta nos formulários**
4. **Implementar paginação nas tabelas**
5. **Adicionar sistema de notificações em tempo real**
6. **Criar backup e restore de dados**
7. **Implementar logs de auditoria**
8. **Adicionar testes automatizados**

---

*Documentação criada em: Dezembro 2024*
*Versão da aplicação: 1.0.0*
