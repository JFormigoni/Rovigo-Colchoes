# Como Corrigir o Erro "supabaseUrl is required"

## Problema

O erro ocorre porque a chave `VITE_SUPABASE_ANON_KEY` no arquivo `.env` está incorreta ou incompleta.

## Solução

### Passo 1: Obter a Chave Correta do Supabase

1. Acesse: **https://app.supabase.com/**
2. Faça login e selecione seu projeto
3. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem)
4. Clique em **"API"**
5. Você verá duas chaves importantes:
   - **Project URL**: `https://tjyaohapvcefpemakaia.supabase.co` ✅ (já está correto)
   - **anon public**: Uma chave longa que começa com `eyJ...` ❌ (precisa ser corrigida)

### Passo 2: Copiar a Chave Anon Public

A chave correta deve ter este formato:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeWFvaGFwdmNlZnBlbWFrYWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTI4NzksImV4cCI6MjA1MjAyODg3OX0.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

É um token JWT (JSON Web Token) que tem 3 partes separadas por pontos.

### Passo 3: Atualizar o Arquivo .env

1. Abra o arquivo `.env` na raiz do projeto
2. Substitua `your_anon_key_here` pela chave completa copiada do Supabase
3. O arquivo deve ficar assim:

```env
VITE_SUPABASE_URL=https://tjyaohapvcefpemakaia.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeWFvaGFwdmNlZnBlbWFrYWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTI4NzksImV4cCI6MjA1MjAyODg3OX0.SUA_CHAVE_COMPLETA_AQUI
```

4. Salve o arquivo

### Passo 4: Rebuild do Projeto

Após atualizar o `.env`, execute:

```bash
npm run build
```

## Por que isso aconteceu?

A chave que estava no arquivo `.env` (`sb_publishable_smlw95brIQjbB_X5U0JEUg_C_AAmmXN`) não é uma chave válida do Supabase. As chaves do Supabase são tokens JWT que começam com `eyJ`.

## Importante

- ⚠️ **NUNCA** compartilhe sua chave anon key publicamente
- ⚠️ **NUNCA** faça commit do arquivo `.env` no Git
- ✅ O arquivo `.env.example` já está configurado como template
- ✅ O arquivo `.gitignore` já está configurado para ignorar `.env`

## Deploy em Produção

Quando fizer deploy (Vercel, Netlify, etc.), você precisará configurar as variáveis de ambiente no painel da plataforma:

- `VITE_SUPABASE_URL` = `https://tjyaohapvcefpemakaia.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = Sua chave completa do Supabase

## Verificar se Funcionou

Após corrigir, execute:

```bash
npm run dev
```

E acesse: `http://localhost:5173`

Se os produtos carregarem, está funcionando! ✅
