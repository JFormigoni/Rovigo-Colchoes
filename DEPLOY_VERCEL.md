# Como Configurar Variáveis de Ambiente no Vercel

## Problema

O erro "supabaseUrl is required" acontece porque as variáveis de ambiente não estão configuradas no Vercel. O arquivo `.env` é apenas para desenvolvimento local e não é enviado para produção.

## Solução: Configurar no Painel do Vercel

### Passo 1: Acessar o Painel do Vercel

1. Acesse: **https://vercel.com/**
2. Faça login
3. Clique no seu projeto (Rovigo-Colchoes ou nome similar)

### Passo 2: Ir para Configurações

1. No menu do projeto, clique em **"Settings"** (Configurações)
2. No menu lateral, clique em **"Environment Variables"** (Variáveis de Ambiente)

### Passo 3: Adicionar as Variáveis

Você precisa adicionar 2 variáveis:

#### Variável 1: VITE_SUPABASE_URL

1. Clique em **"Add New"** ou **"Add"**
2. Preencha:
   - **Key (Nome)**: `VITE_SUPABASE_URL`
   - **Value (Valor)**: `https://tjyaohapvcefpemakaia.supabase.co`
   - **Environment**: Marque todas (Production, Preview, Development)
3. Clique em **"Save"**

#### Variável 2: VITE_SUPABASE_ANON_KEY

1. Clique em **"Add New"** novamente
2. Preencha:
   - **Key (Nome)**: `VITE_SUPABASE_ANON_KEY`
   - **Value (Valor)**: Sua chave do Supabase (começa com `eyJ...`)
   - **Environment**: Marque todas (Production, Preview, Development)
3. Clique em **"Save"**

### Passo 4: Como Obter a Chave do Supabase

Se você não tem a chave:

1. Acesse: **https://app.supabase.com/**
2. Selecione seu projeto
3. Vá em **"Project Settings"** > **"API"**
4. Copie a chave **"anon public"** (é uma chave longa que começa com `eyJ`)

### Passo 5: Fazer Redeploy

Após adicionar as variáveis, você precisa fazer um novo deploy:

**Opção A: Pelo Painel do Vercel**
1. Vá na aba **"Deployments"**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **"Redeploy"**
4. Confirme

**Opção B: Fazer um Novo Commit**
```bash
git add .
git commit -m "Update environment variables"
git push
```

O Vercel vai fazer deploy automaticamente.

### Passo 6: Verificar

1. Aguarde o deploy terminar (1-2 minutos)
2. Acesse seu site no Vercel
3. A página deve carregar normalmente agora! ✅

## Resumo das Variáveis

```
VITE_SUPABASE_URL = https://tjyaohapvcefpemakaia.supabase.co
VITE_SUPABASE_ANON_KEY = eyJ... (sua chave completa do Supabase)
```

## Importante

- ✅ As variáveis devem ter o prefixo `VITE_` para funcionar com Vite
- ✅ Marque todos os ambientes (Production, Preview, Development)
- ✅ Sempre faça redeploy após adicionar/modificar variáveis
- ⚠️ Nunca compartilhe suas chaves publicamente

## Outras Plataformas

### Netlify

1. Vá em **Site Settings** > **Environment Variables**
2. Adicione as mesmas variáveis
3. Faça redeploy

### Outras Plataformas

O processo é similar: procure por "Environment Variables" ou "Variáveis de Ambiente" nas configurações do projeto.

## Troubleshooting

### Ainda aparece erro após configurar

1. Verifique se as variáveis estão escritas corretamente (sem espaços)
2. Verifique se marcou "Production" nas variáveis
3. Certifique-se de que fez redeploy após adicionar as variáveis
4. Limpe o cache do navegador (Ctrl + Shift + R)

### Como verificar se as variáveis estão configuradas

No painel do Vercel, em "Environment Variables", você deve ver:
- ✅ VITE_SUPABASE_URL
- ✅ VITE_SUPABASE_ANON_KEY

Ambas com o ícone verde indicando que estão ativas.

---

**Após seguir estes passos, seu site deve funcionar perfeitamente no Vercel!** 🚀
