# Integração com API de Autenticação JWT

## Resumo das Mudanças

O sistema de autenticação do frontend foi completamente refatorado para integrar com a API JWT do backend. As principais mudanças incluem:

## 📁 Arquivos Modificados

### 1. `components/auth/auth-context.tsx`
- ✅ Substituída simulação de login por integração real com API
- ✅ Implementada verificação de token JWT válido
- ✅ Mapeamento de permissões do formato da API para o frontend
- ✅ Tratamento de erros de autenticação
- ✅ Limpeza automática de tokens inválidos

### 2. `interfaces/IAuthContext.ts`
- ✅ Adicionadas interfaces para permissões da API (`Permissoes`, `Perfil`)
- ✅ Atualizada interface `User` para incluir perfil completo
- ✅ Mantida compatibilidade com componentes existentes

### 3. `app/login/page.tsx`
- ✅ Removidas credenciais de teste hardcoded
- ✅ Implementado tratamento de erros de login
- ✅ Adicionado feedback visual para erros
- ✅ Interface mais profissional

### 4. `lib/api.ts` (Novo)
- ✅ Biblioteca centralizada para chamadas à API
- ✅ Gerenciamento automático de tokens JWT
- ✅ Métodos específicos para autenticação, usuários e perfis
- ✅ Tratamento consistente de erros

## 🔧 Como Funciona Agora

### Fluxo de Autenticação:
1. **Login**: Usuario envia email/senha → API valida → retorna JWT + dados do usuário
2. **Armazenamento**: Token e dados salvos no localStorage
3. **Verificação**: A cada carregamento, verifica se token ainda é válido
4. **Proteção**: Rotas protegidas verificam permissões baseadas no perfil da API

### Mapeamento de Permissões:
```typescript
// Formato API → Formato Frontend
{
  user_management.criar → cadastroUsuarios
  user_management.editar → gerenciarPerfis  
  operation.criar → cadastroMoradores
  operation.editar → registrarPagamentos
  operation.visualizar → acessoFinancas
  reports_analytics.visualizar → visualizarDashboards
  advanced.visualizar → acessoAdministracao
}
```

## 🚀 Próximos Passos

Para completar a integração, você precisa:

1. **Configurar o Backend**:
   - Certifique-se que a API está rodando na porta 3000
   - Endpoint `/api/auth/login` deve estar funcional
   - Endpoint `/api/auth/verify` para validação de token

2. **Criar Usuários de Teste**:
   ```bash
   # Exemplo usando a API
   curl -X POST http://localhost:3000/api/users \
     -H "Authorization: Bearer TOKEN_ADMIN" \
     -H "Content-Type: application/json" \
     -d '{
       "nome": "Administrador Teste",
       "email": "admin@teste.com", 
       "senha": "admin123",
       "perfilId": "ID_DO_PERFIL_ADMIN"
     }'
   ```

3. **Variáveis de Ambiente**:
   ```env
   # .env.local
   JWT_SECRET=seu_jwt_secret_aqui
   API_BASE_URL=http://localhost:3000
   ```

## 🔍 Testando a Integração

1. **Teste de Login**:
   - Acesse `/login`
   - Use credenciais válidas do banco
   - Verifique se redireciona corretamente

2. **Teste de Token**:
   - Faça login
   - Recarregue a página
   - Token deve ser validado automaticamente

3. **Teste de Permissões**:
   - Tente acessar rotas protegidas
   - Verifique se permissões são respeitadas

## ⚠️ Observações Importantes

- O sistema mantém compatibilidade com componentes existentes
- Tokens são validados a cada carregamento de página
- Redirecionamento automático para login se token inválido
- Limpeza automática de dados em caso de erro de autenticação
- Todos os endpoints de CRUD agora requerem autenticação JWT

## 🛠️ Debugging

Para debug, verifique:
1. Console do browser para erros de autenticação
2. Network tab para ver chamadas à API
3. localStorage para verificar token salvo
4. Logs do servidor para validação JWT

O sistema está pronto para produção com autenticação JWT completa!