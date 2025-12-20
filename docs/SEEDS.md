# Seeds do Sistema CSELA

Este documento descreve o sistema de seeds implementado para popular o banco de dados com dados iniciais necessários para o funcionamento do sistema.

## 📋 **Visão Geral**

Os seeds são responsáveis por criar dados iniciais essenciais no banco de dados, incluindo:
- Perfil de administrador com todas as permissões
- Usuário administrador padrão do sistema

## 🎯 **Seeds Disponíveis**

### 1. AdminSeed
Cria um perfil de administrador e um usuário administrador com acesso total ao sistema.

**Dados criados:**
- **Perfil**: "Administrador" com todas as permissões dos 4 módulos
- **Usuário**: 
  - Nome: "Administrador do Sistema"
  - Email: `admin@csela.com`
  - Senha: `admin123`
  - Status: Ativo

**Permissões do perfil administrador:**
- **user_management**: `cadastro_usuario`, `cadastro_perfil`
- **operation**: `cadastro_moradores`, `registrar_pagamentos`, `gerenciar_pontos`
- **reports_analytics**: `visualizar_dashboards`, `exportar_relatorios`
- **advanced**: `acesso_financas`, `acesso_administracao`

## 🚀 **Como Executar**

### Executar todos os seeds:
```bash
npm run seed
```

### Executar apenas o seed do administrador:
```bash
npm run seed:admin
```

## ⚙️ **Como Funciona**

### 1. Verificação de Dados Existentes
Os seeds verificam se os dados já existem antes de criá-los, evitando duplicação:
- Verifica se existe perfil com nome "Administrador"
- Verifica se existe usuário com email "admin@csela.com"

### 2. Criação Segura
- A senha do usuário administrador é hasheada usando bcrypt
- As permissões são definidas seguindo a estrutura do sistema
- Relacionamentos entre usuário e perfil são estabelecidos corretamente

### 3. Logs Informativos
O sistema fornece feedback durante a execução:
- ✅ Sucesso na criação de dados
- ℹ️ Informação sobre dados já existentes
- ❌ Erros durante a execução

## 📁 **Estrutura dos Arquivos**

```
src/
├── seeds/
│   ├── admin.seed.ts          # Seed específico do administrador
│   └── database.seeder.ts     # Orquestrador principal dos seeds
└── commands/
    ├── seed.command.ts        # Comando para executar todos os seeds
    └── seed-admin.command.ts  # Comando para executar seed do admin
```

## 🔐 **Credenciais de Acesso Padrão**

Após executar os seeds, você pode acessar o sistema com:

- **Email**: `admin@csela.com`
- **Senha**: `admin123`

> ⚠️ **IMPORTANTE**: Altere a senha padrão após o primeiro acesso em produção!

## 🛡️ **Segurança**

- As senhas são hasheadas antes de serem armazenadas
- O sistema verifica dados existentes para evitar duplicação
- Logs não expõem informações sensíveis

## 🔄 **Adicionando Novos Seeds**

Para adicionar novos seeds:

1. Crie um novo arquivo em `src/seeds/nome.seed.ts`
2. Implemente a classe com método estático `run(dataSource: DataSource)`
3. Adicione a execução no `DatabaseSeeder`
4. Crie comando específico se necessário

### Exemplo de estrutura:
```typescript
export class NovoSeed {
  static async run(dataSource: DataSource): Promise<void> {
    // Lógica do seed
  }
}
```

## 📝 **Logs de Execução**

Durante a execução, você verá logs como:
```
🌱 Iniciando seed de administrador...
✅ Perfil Administrador criado com sucesso!
✅ Usuário Administrador criado com sucesso!
📧 Email: admin@csela.com
🔐 Senha: admin123
🎉 Seed de administrador concluído!
```

## 🐛 **Troubleshooting**

### Erro de conexão com banco
- Verifique se o PostgreSQL está rodando
- Confirme as configurações de conexão no `.env`

### Seed já executado
- Os seeds são idempotentes e podem ser executados múltiplas vezes
- Dados existentes não serão duplicados

### Permissões insuficientes
- Verifique se o usuário do banco tem permissões de escrita
- Confirme se as tabelas existem (execute as migrations antes)