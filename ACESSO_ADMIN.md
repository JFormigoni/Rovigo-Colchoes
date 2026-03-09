# Acesso ao Painel Administrativo

## URLs do Admin

O painel administrativo está completamente separado do site público e pode ser acessado através das seguintes URLs:

### Desenvolvimento Local

- **Login**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin`

### Produção (Vercel)

- **Login**: `https://seu-dominio.vercel.app/admin/login`
- **Dashboard**: `https://seu-dominio.vercel.app/admin`

## Como Acessar

### 1. Fazer Login

1. Acesse a URL de login: `/admin/login`
2. Digite o email e senha do usuário admin criado no Supabase
3. Clique em "Entrar"
4. Você será redirecionado automaticamente para `/admin`

### 2. Credenciais de Admin

As credenciais foram criadas no Supabase (conforme `SUPABASE_SETUP.md`):

- **Email**: `admin@sualoja.com` (ou o email que você configurou)
- **Senha**: A senha que você definiu ao criar o usuário

### 3. Criar Novo Usuário Admin

Se você ainda não criou um usuário admin:

1. Acesse: **https://app.supabase.com/**
2. Selecione seu projeto
3. Vá em **Authentication** > **Users**
4. Clique em **"Add user"** > **"Create new user"**
5. Preencha:
   - **Email**: `admin@sualoja.com`
   - **Password**: Crie uma senha forte
   - **Auto Confirm User**: ✅ Marque esta opção
6. Clique em **"Create user"**

## Funcionalidades do Dashboard

No painel admin (`/admin`) você pode:

- ✅ Ver estatísticas dos produtos (Total, Em Estoque, Em Destaque, Em Promoção)
- ✅ Visualizar todos os produtos em formato de tabela
- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Excluir produtos
- ✅ Ações rápidas:
  - 👁️ Ativar/Desativar estoque
  - ⭐ Marcar/Desmarcar como destaque
  - 🏷️ Ativar/Desativar promoção

## Segurança

### Proteção de Rotas

O admin está protegido por autenticação do Supabase. Apenas usuários autenticados podem:
- Acessar o dashboard (`/admin`)
- Adicionar, editar ou excluir produtos
- Ver informações administrativas

### Isolamento

- ❌ O admin NÃO aparece nas navbars públicas
- ❌ Não há links para o admin no site público
- ✅ Apenas quem souber a URL `/admin/login` pode acessar
- ✅ Usa layout separado (AdminLayout) sem navegação pública

## Dicas de Segurança

1. **Senha Forte**: Use uma senha forte para o usuário admin
2. **Email Único**: Use um email que só você tenha acesso
3. **Não Compartilhe**: Não compartilhe as credenciais de admin
4. **HTTPS**: Sempre acesse via HTTPS em produção
5. **Logout**: Sempre faça logout após usar o admin

## Troubleshooting

### Não consigo fazer login

1. Verifique se criou o usuário no Supabase
2. Verifique se marcou "Auto Confirm User"
3. Verifique se as variáveis de ambiente estão configuradas
4. Tente resetar a senha do usuário no Supabase

### Página em branco após login

1. Verifique se as variáveis de ambiente estão configuradas no Vercel
2. Verifique o console do navegador para erros
3. Verifique se o Supabase está funcionando

### Erro ao adicionar/editar produtos

1. Verifique as políticas de RLS no Supabase
2. Verifique se o usuário está autenticado
3. Verifique o console do navegador para erros

## Estrutura de Rotas

```
/                          → Landing Page (público)
/produtos                  → Página de Produtos (público)
/sobre                     → Página Sobre (público)
/admin/login              → Login Admin (protegido)
/admin                    → Dashboard Admin (protegido)
```

## Adicionar Mais Admins

Para adicionar mais usuários admin, repita o processo de criação de usuário no Supabase. Todos os usuários autenticados terão acesso ao painel admin.

Se quiser criar níveis de permissão diferentes (admin, editor, etc.), você precisará:
1. Adicionar uma coluna `role` na tabela de usuários
2. Modificar as políticas de RLS
3. Adicionar verificação de role no código

---

**O painel admin está pronto e seguro!** 🔒
