# Teste do Sistema de Seeds

Este documento mostra como testar o funcionamento dos seeds e o acesso do usuário administrador criado.

## 🧪 **Testando os Seeds**

### 1. Executar o Seed do Administrador
```bash
npm run seed:admin
```

**Saída esperada:**
```
👤 Executando seed do administrador...
🌱 Iniciando seed de administrador...
✅ Perfil Administrador criado com sucesso!
✅ Usuário Administrador criado com sucesso!
📧 Email: admin@csela.com
🔐 Senha: admin123
🎉 Seed de administrador concluído!
🎉 Seed do administrador executado com sucesso!
```

### 2. Verificar se Pode ser Executado Múltiplas Vezes
```bash
npm run seed:admin
```

**Saída esperada (segunda execução):**
```
👤 Executando seed do administrador...
🌱 Iniciando seed de administrador...
ℹ️ Perfil Administrador já existe, utilizando o existente.
ℹ️ Usuário Administrador já existe.
🎉 Seed de administrador concluído!
🎉 Seed do administrador executado com sucesso!
```

## 🔐 **Testando o Login do Administrador**

### 1. Iniciar o Servidor
```bash
npm run start:dev
```

### 2. Fazer Login via API

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@csela.com",
    "senha": "admin123"
  }'
```

**Response esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-do-usuario",
    "nome": "Administrador do Sistema",
    "email": "admin@csela.com",
    "status": true,
    "ultimoAcesso": "2024-12-12T23:55:01.000Z",
    "perfil": {
      "id": "uuid-do-perfil",
      "nome": "Administrador",
      "status": true,
      "permissoes": {
        "user_management": {
          "name": "user_management",
          "permissions": ["cadastro_usuario", "cadastro_perfil"]
        },
        "operation": {
          "name": "operation",
          "permissions": ["cadastro_moradores", "registrar_pagamentos", "gerenciar_pontos"]
        },
        "reports_analytics": {
          "name": "reports_analytics",
          "permissions": ["visualizar_dashboards", "exportar_relatorios"]
        },
        "advanced": {
          "name": "advanced",
          "permissions": ["acesso_financas", "acesso_administracao"]
        }
      }
    }
  }
}
```

### 3. Testar Acesso a Rota Protegida

**Request:**
```bash
curl -X GET http://localhost:3000/api/profiles \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Response esperada:**
```json
{
  "data": [
    {
      "id": "uuid-do-perfil",
      "nome": "Administrador",
      "status": true,
      "permissoes": { ... },
      "createdAt": "2024-12-12T23:55:01.000Z",
      "updatedAt": "2024-12-12T23:55:01.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

## ✅ **Verificação do Banco de Dados**

### Verificar via SQL (Opcional)
```sql
-- Verificar perfil criado
SELECT * FROM profiles WHERE nome = 'Administrador';

-- Verificar usuário criado
SELECT u.*, p.nome as perfil_nome 
FROM users u 
JOIN profiles p ON u.perfil_id = p.id 
WHERE u.email = 'admin@csela.com';
```

## 🔧 **Troubleshooting**

### Problema: Erro de conexão com banco
**Solução:** Verifique se o PostgreSQL está rodando:
```bash
npm run db:up
```

### Problema: "Cannot find module"
**Solução:** Instale as dependências:
```bash
npm install
```

### Problema: Erro de autenticação no teste
**Solução:** Verifique se o JWT_SECRET está configurado no .env

### Problema: Seed falha ao criar usuário
**Possíveis causas:**
1. Banco não está rodando
2. Tabelas não foram criadas (execute migrations)
3. Permissões insuficientes no banco

## 🎯 **Próximos Passos**

Após confirmar que o seed funciona:

1. ✅ **Login bem-sucedido** - Administrador pode acessar o sistema
2. ✅ **Permissões completas** - Acesso a todos os módulos
3. ✅ **Criação de outros usuários** - Use o admin para criar outros usuários
4. ✅ **Criação de perfis customizados** - Configure permissões específicas

**Agora você pode:**
- Criar outros perfis com permissões específicas
- Adicionar novos usuários ao sistema
- Configurar o ambiente de produção
- Alterar a senha padrão do administrador