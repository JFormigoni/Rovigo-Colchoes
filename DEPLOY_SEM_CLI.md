# Deploy sem Firebase CLI - Guia Completo para Windows

Se o comando `npm` não é reconhecido ou você não quer instalar o Firebase CLI, pode fazer o deploy diretamente pelo navegador.

---

## Método 1: Deploy Manual pelo Firebase Console (RECOMENDADO)

Este é o método mais simples - tudo pelo navegador, sem instalar nada.

### Passo 1: Criar Projeto Firebase

1. Acesse: **https://console.firebase.google.com/**
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: `loja-colchoes` (ou outro nome de sua preferência)
4. Desabilite Google Analytics (opcional)
5. Clique em **"Criar projeto"**
6. Aguarde a criação (leva alguns segundos)

### Passo 2: Ativar Firestore Database

1. No menu lateral esquerdo, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de produção"**
4. Localização: Escolha **"southamerica-east1 (São Paulo)"**
5. Clique em **"Ativar"**
6. Aguarde a criação do banco de dados

### Passo 3: Configurar Regras do Firestore

1. Ainda na página do Firestore, clique na aba **"Regras"**
2. Apague todo o conteúdo existente
3. Cole o seguinte código:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /produtos/{produto} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Clique em **"Publicar"**
5. Aguarde a confirmação

### Passo 4: Criar Índice do Firestore

1. Clique na aba **"Índices"**
2. Clique em **"Adicionar índice"**
3. Preencha:
   - **ID da coleção**: `produtos`
   - **Campo 1**: `destaque` → Selecione **"Crescente"**
   - **Campo 2**: `estoque` → Selecione **"Crescente"**
   - **Status da consulta**: Deixe como **"Ativado"**
4. Clique em **"Criar"**
5. Aguarde (pode levar alguns minutos)

### Passo 5: Ativar Authentication

1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Começar"**
3. Na lista de provedores, clique em **"E-mail/senha"**
4. Ative a primeira opção **"E-mail/senha"** (toggle para azul)
5. Clique em **"Salvar"**

### Passo 6: Criar Usuário Administrador

1. Clique na aba **"Users"** (ainda no Authentication)
2. Clique em **"Adicionar usuário"**
3. Preencha:
   - **E-mail**: `admin@sualoja.com` (ou outro email)
   - **Senha**: Crie uma senha forte (ex: `Admin@2024`)
4. Clique em **"Adicionar usuário"**
5. Anote o email e senha - você vai precisar para fazer login no painel admin

### Passo 7: Obter Credenciais do Firebase

1. Clique no ícone de **engrenagem ⚙️** ao lado de "Visão geral do projeto" (canto superior esquerdo)
2. Clique em **"Configurações do projeto"**
3. Role a página até a seção **"Seus aplicativos"**
4. Clique no ícone **`</>`** (Web)
5. Preencha:
   - **Apelido do app**: `Loja Colchões Web`
   - **NÃO** marque "Configurar Firebase Hosting"
6. Clique em **"Registrar app"**
7. Você verá um código JavaScript - **COPIE** o objeto `firebaseConfig`

Exemplo do que você vai copiar:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "loja-colchoes.firebaseapp.com",
  projectId: "loja-colchoes",
  storageBucket: "loja-colchoes.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Passo 8: Configurar Credenciais no Código

Agora você precisa colar essas credenciais em 3 arquivos do projeto:

#### Arquivo 1: `public/js/app.js`

1. Abra o arquivo `public/js/app.js`
2. Encontre as linhas 3-11 (onde está escrito `YOUR_API_KEY`, etc.)
3. Substitua pelo seu `firebaseConfig` copiado
4. Salve o arquivo

#### Arquivo 2: `public/js/produtos.js`

1. Abra o arquivo `public/js/produtos.js`
2. Encontre as linhas 3-11
3. Substitua pelo seu `firebaseConfig`
4. Salve o arquivo

#### Arquivo 3: `public/js/admin.js`

1. Abra o arquivo `public/js/admin.js`
2. Encontre as linhas 4-12
3. Substitua pelo seu `firebaseConfig`
4. Salve o arquivo

### Passo 9: Configurar Número do WhatsApp

1. Abra o arquivo `public/js/produtos.js`
2. Encontre a linha 15:
```javascript
const WHATSAPP_NUMBER = '5511999999999';
```
3. Substitua pelo seu número no formato: **código do país + DDD + número**
   - Exemplo Brasil: `5511987654321`
   - 55 = Brasil
   - 11 = DDD de São Paulo
   - 987654321 = seu número
4. Salve o arquivo

### Passo 10: Ativar Firebase Hosting

1. No Firebase Console, clique em **"Hosting"** no menu lateral
2. Clique em **"Começar"**
3. Clique em **"Avançar"** (ignore as instruções do CLI por enquanto)
4. Clique em **"Concluir"**

### Passo 11: Fazer Deploy Manual

Agora vem a parte mais importante - colocar seu site no ar:

#### Opção A: Arrastar e Soltar (Mais Fácil)

1. Na página do Hosting, procure o botão **"Adicionar versão personalizada"** ou os três pontinhos **⋮**
2. Clique em **"Adicionar versão personalizada"**
3. **Arraste a pasta `public`** inteira para a área indicada
   - IMPORTANTE: Arraste a pasta `public`, não os arquivos dentro dela
4. Aguarde o upload (pode levar alguns minutos)
5. Clique em **"Implantar"**
6. Aguarde a implantação

#### Opção B: Usar Firebase CLI (se conseguir instalar)

Se você conseguir instalar o Node.js e Firebase CLI:

```bash
# Instalar Node.js primeiro de: https://nodejs.org/
# Depois no terminal:
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Passo 12: Acessar Seu Site

1. Após o deploy, você verá a URL do seu site
2. Será algo como: **`https://loja-colchoes.web.app`**
3. Clique na URL para abrir seu site
4. Teste a navegação

### Passo 13: Acessar o Painel Admin

1. Acesse: **`https://seu-site.web.app/admin/`**
2. Faça login com o email e senha criados no Passo 6
3. Você verá o painel administrativo
4. Clique em **"Adicionar Novo Produto"** para começar

### Passo 14: Adicionar Produtos

Antes de adicionar produtos, você precisa hospedar as imagens:

1. Acesse **https://imgur.com/upload**
2. Faça upload da foto do colchão
3. Clique com botão direito na imagem → **"Copiar endereço da imagem"**
4. No painel admin, cole essa URL no campo **"URL da Imagem do Produto"**
5. Preencha os outros campos
6. Clique em **"Salvar Produto"**

**Consulte `HOSPEDAGEM_IMAGENS.md` para mais detalhes sobre hospedagem de imagens.**

---

## Método 2: Usar Netlify (Alternativa Simples)

Se o Firebase Hosting não funcionar, use o Netlify:

### Passo 1: Criar Conta no Netlify

1. Acesse: **https://www.netlify.com/**
2. Clique em **"Sign up"**
3. Crie uma conta gratuita (pode usar GitHub, Google, etc.)

### Passo 2: Deploy

1. No dashboard do Netlify, clique em **"Add new site"**
2. Selecione **"Deploy manually"**
3. **Arraste a pasta `public`** para a área indicada
4. Aguarde o upload e deploy
5. Pronto! Seu site estará no ar

### Passo 3: Acessar

Seu site estará em uma URL como: **`https://random-name.netlify.app/`**

**Nota:** O Firebase (Firestore e Authentication) continuará funcionando normalmente, apenas o hosting é diferente.

---

## Método 3: Usar GitHub Pages

### Passo 1: Criar Repositório

1. Acesse: **https://github.com/**
2. Faça login ou crie uma conta
3. Clique em **"New repository"**
4. Nome: `loja-colchoes`
5. Marque como **"Public"**
6. Clique em **"Create repository"**

### Passo 2: Upload dos Arquivos

1. Clique em **"uploading an existing file"**
2. Arraste todos os arquivos da pasta `public`
3. Escreva uma mensagem: "Initial commit"
4. Clique em **"Commit changes"**

### Passo 3: Ativar GitHub Pages

1. Vá em **Settings** → **Pages**
2. Source: **"Deploy from a branch"**
3. Branch: **"main"** → **"/ (root)"**
4. Clique em **"Save"**
5. Aguarde alguns minutos

### Passo 4: Acessar

Seu site estará em: **`https://seu-usuario.github.io/loja-colchoes/`**

---

## Testando Localmente (Antes do Deploy)

Se quiser testar o site no seu computador antes de fazer deploy:

### Opção 1: Live Server (VS Code)

1. Abra o projeto no VS Code
2. Instale a extensão **"Live Server"**
3. Clique com botão direito em `public/index.html`
4. Selecione **"Open with Live Server"**
5. O site abrirá em `http://localhost:5500`

### Opção 2: Python (se tiver instalado)

```bash
cd public
python -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 3: Abrir Diretamente

Simplesmente dê duplo clique no arquivo `public/index.html`

**Nota:** Algumas funcionalidades podem não funcionar localmente devido a restrições de segurança do navegador.

---

## Problemas Comuns e Soluções

### ❌ "npm não é reconhecido como comando"

**Solução:** Você não precisa do npm! Use o Método 1 (deploy manual pelo console).

**Alternativa:** Instale o Node.js de https://nodejs.org/ e reinicie o computador.

### ❌ "firebase não é reconhecido como comando"

**Solução:** Use o Método 1 (deploy manual) ou instale o Firebase CLI:
```bash
npm install -g firebase-tools
```

### ❌ Erro ao fazer upload da pasta public

**Solução:** 
- Certifique-se de arrastar a pasta `public` inteira, não os arquivos dentro dela
- Tente usar um navegador diferente (Chrome funciona melhor)
- Verifique sua conexão com a internet

### ❌ Site não carrega após deploy

**Solução:**
- Aguarde alguns minutos (pode levar até 10 minutos para propagar)
- Limpe o cache do navegador (Ctrl + Shift + Delete)
- Tente em modo anônimo

### ❌ Erro "Missing or insufficient permissions"

**Solução:**
- Verifique se configurou as regras do Firestore corretamente (Passo 3)
- Vá em Firestore → Regras e clique em "Publicar" novamente

### ❌ Login não funciona no admin

**Solução:**
- Verifique se criou o usuário no Authentication
- Verifique se colou o `firebaseConfig` corretamente nos 3 arquivos JS
- Verifique se o `authDomain` está correto

### ❌ Imagens não aparecem

**Solução:**
- Verifique se a URL da imagem está correta
- Teste a URL em uma nova aba do navegador
- Use URLs diretas que terminam com .jpg, .png, etc.
- Use serviços confiáveis como Imgur

### ❌ WhatsApp não abre

**Solução:**
- Verifique o formato do número: `5511987654321`
- Teste manualmente: `https://wa.me/5511987654321`
- Não use espaços, traços ou parênteses

---

## Checklist Completo

Use esta lista para não esquecer nenhum passo:

- [ ] Criar projeto no Firebase Console
- [ ] Ativar Firestore Database
- [ ] Configurar regras do Firestore
- [ ] Criar índice do Firestore
- [ ] Ativar Authentication (Email/Senha)
- [ ] Criar usuário admin
- [ ] Copiar credenciais do Firebase (firebaseConfig)
- [ ] Colar credenciais em `public/js/app.js`
- [ ] Colar credenciais em `public/js/produtos.js`
- [ ] Colar credenciais em `public/js/admin.js`
- [ ] Configurar número do WhatsApp em `public/js/produtos.js`
- [ ] Ativar Firebase Hosting
- [ ] Fazer deploy da pasta `public`
- [ ] Acessar o site e testar
- [ ] Fazer login no admin
- [ ] Hospedar imagens no Imgur
- [ ] Adicionar produtos de teste
- [ ] Testar fluxo completo (selecionar produto → WhatsApp)

---

## Vídeo Tutorial (Recomendado)

Se preferir seguir um vídeo, procure no YouTube por:
- "Firebase Hosting deploy manual"
- "Como fazer deploy no Firebase sem CLI"
- "Firebase Console tutorial português"

---

## Suporte

Se tiver dúvidas:

1. **Documentação Firebase:** https://firebase.google.com/docs
2. **Fórum Firebase:** https://firebase.google.com/support
3. **Stack Overflow:** Pesquise por "firebase hosting manual deploy"

---

## Resumo Rápido

1. ✅ Crie projeto no Firebase Console
2. ✅ Ative Firestore + Authentication + Hosting
3. ✅ Configure regras e índices
4. ✅ Copie credenciais e cole nos arquivos JS
5. ✅ Configure WhatsApp
6. ✅ Arraste pasta `public` para o Hosting
7. ✅ Acesse seu site e adicione produtos

**Pronto! Seu site estará no ar sem precisar instalar nada.** 🚀
