# Guia de Configuração Rápida

## Passo a Passo para Deploy

### 1. Criar Projeto Firebase

1. Acesse https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Dê um nome ao projeto (ex: "loja-colchoes")
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Ativar Serviços Firebase

#### Firestore Database
1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione "Iniciar no modo de produção"
4. Escolha a localização (ex: southamerica-east1)
5. Clique em "Ativar"

#### Configurar Regras do Firestore
1. Ainda no Firestore, clique na aba "Regras"
2. Substitua o conteúdo por:

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

3. Clique em "Publicar"

#### Criar Índice do Firestore
1. Clique na aba "Índices"
2. Clique em "Adicionar índice"
3. Configuração:
   - Collection ID: `produtos`
   - Campo 1: `destaque` - Crescente
   - Campo 2: `estoque` - Crescente
4. Clique em "Criar"

#### Authentication
1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Na aba "Sign-in method", clique em "E-mail/senha"
4. Ative a opção "E-mail/senha"
5. Clique em "Salvar"
6. Vá na aba "Users"
7. Clique em "Adicionar usuário"
8. Adicione email e senha para o admin (ex: admin@loja.com)

#### Hosting
1. No menu lateral, clique em "Hosting"
2. Clique em "Começar"
3. Siga as instruções (ou use deploy manual - veja DEPLOY_SEM_CLI.md)

### 3. Obter Credenciais do Firebase

1. Clique no ícone de engrenagem ao lado de "Visão geral do projeto"
2. Clique em "Configurações do projeto"
3. Role até "Seus aplicativos"
4. Clique no ícone "</>" (Web)
5. Registre o app (ex: "Loja Colchões Web")
6. Copie o objeto `firebaseConfig`

### 4. Preparar Imagens dos Produtos

**IMPORTANTE:** Este projeto NÃO usa Firebase Storage. As imagens devem ser hospedadas em serviços externos gratuitos.

**Opções recomendadas:**
- **Imgur** (mais fácil): https://imgur.com/upload
- **Cloudinary**: https://cloudinary.com/
- **ImgBB**: https://imgbb.com/

**Como fazer:**
1. Acesse um dos serviços acima
2. Faça upload das fotos dos seus colchões
3. Copie a URL direta da imagem
4. Use essa URL no painel admin ao cadastrar produtos

**Consulte o arquivo `HOSPEDAGEM_IMAGENS.md` para instruções detalhadas.**

### 5. Configurar Credenciais no Código

Substitua as credenciais nos seguintes arquivos:

**public/js/app.js**
**public/js/produtos.js**
**public/js/admin.js**

```javascript
const firebaseConfig = {
    apiKey: "COLE_AQUI",
    authDomain: "COLE_AQUI",
    projectId: "COLE_AQUI",
    storageBucket: "COLE_AQUI",
    messagingSenderId: "COLE_AQUI",
    appId: "COLE_AQUI"
};
```

### 6. Configurar Número do WhatsApp

No arquivo **public/js/produtos.js**, linha 15:

```javascript
const WHATSAPP_NUMBER = '5511999999999'; // Substitua pelo seu número
```

Formato: código do país (55) + DDD + número (sem espaços ou caracteres especiais)

### 7. Atualizar ID do Projeto

No arquivo **.firebaserc**:

```json
{
  "projects": {
    "default": "seu-projeto-id"
  }
}
```

Substitua "seu-projeto-id" pelo ID do seu projeto Firebase (encontrado nas configurações).

### 8. Instalar Firebase CLI (Opcional)

```bash
npm install -g firebase-tools
```

**Se não conseguir instalar o Firebase CLI, consulte `DEPLOY_SEM_CLI.md` para fazer deploy manual pelo navegador.**

### 9. Fazer Login

```bash
firebase login
```

### 10. Deploy

```bash
# Deploy das regras de segurança
firebase deploy --only firestore:rules

# Deploy do site
firebase deploy --only hosting

# Ou deploy completo
firebase deploy
```

**Alternativa sem CLI:** Consulte `DEPLOY_SEM_CLI.md` para fazer deploy manual.

### 11. Acessar o Site

Após o deploy, o Firebase CLI mostrará a URL do seu site:
```
Hosting URL: https://seu-projeto-id.web.app
```

### 12. Acessar Painel Admin

1. Acesse: https://seu-projeto-id.web.app/admin/
2. Faça login com o email e senha criados no passo 2
3. Adicione seus produtos!

## Exemplo de Produto

Ao adicionar um produto no painel admin, preencha:

- **Nome**: Colchão Ortopédico Premium
- **Descrição**: Colchão de molas ensacadas com camada de espuma viscoelástica. Proporciona suporte ideal para a coluna e conforto excepcional.
- **Preço**: 1299.90
- **Preço Promocional**: 999.90 (opcional)
- **Cores**: Branco, Cinza, Azul
- **Tamanhos**: Marque os disponíveis
- **URL da Imagem**: Cole a URL da imagem hospedada (ex: https://i.imgur.com/abc123.jpg)
- **Promoção**: Marque se estiver em promoção
- **Destaque**: Marque para aparecer na home
- **Em Estoque**: Marque se disponível

**Consulte `PRODUTOS_EXEMPLO.md` para mais exemplos prontos com URLs de imagens.**

## Testando Localmente

### Opção 1: Firebase CLI
```bash
firebase serve
```
Acesse: http://localhost:5000

### Opção 2: Live Server (VS Code)
1. Instale a extensão "Live Server"
2. Clique com botão direito em `public/index.html`
3. Selecione "Open with Live Server"

### Opção 3: Python
```bash
cd public
python -m http.server 8000
```
Acesse: http://localhost:8000

## Problemas Comuns

### Erro de permissão no Firestore
- Verifique se as regras foram deployadas: `firebase deploy --only firestore:rules`
- Ou configure manualmente no Firebase Console (Firestore → Regras)

### Imagens não aparecem
- Verifique se a URL da imagem está correta
- Teste a URL em uma nova aba do navegador
- Certifique-se de usar URLs diretas (terminam com .jpg, .png, etc.)
- Use serviços confiáveis como Imgur ou Cloudinary

### Login não funciona
- Verifique se o Authentication está ativado
- Verifique se criou um usuário
- Verifique se o authDomain está correto no firebaseConfig

### WhatsApp não abre
- Verifique se o número está no formato correto: 5511999999999
- Teste o link manualmente: https://wa.me/5511999999999

### Comando npm não é reconhecido
- Você precisa instalar o Node.js primeiro: https://nodejs.org/
- Ou use deploy manual (consulte `DEPLOY_SEM_CLI.md`)

## Custos

O Firebase oferece um plano gratuito (Spark) que inclui:
- **Firestore**: 1 GB de armazenamento, 50k leituras/dia, 20k escritas/dia
- **Hosting**: 10 GB de transferência/mês, 360 MB de armazenamento
- **Authentication**: Ilimitado

**Nota:** Como não usamos Firebase Storage, você economiza ainda mais! As imagens são hospedadas gratuitamente em serviços externos (Imgur, Cloudinary, etc.).

Para uma loja com ~100 produtos e ~1000 visitantes/mês, o plano gratuito é mais que suficiente.

## Próximos Passos

1. Personalize as cores e estilos no `public/css/style.css`
2. Adicione seu logo substituindo o texto "ColchõesTop"
3. Atualize as informações da página "Sobre Nós"
4. Prepare e hospede as imagens dos produtos (Imgur, Cloudinary)
5. Adicione seus produtos no painel admin
6. Configure um domínio personalizado no Firebase Hosting (opcional)

## Arquivos de Ajuda

- **DEPLOY_SEM_CLI.md** - Como fazer deploy sem instalar Firebase CLI
- **HOSPEDAGEM_IMAGENS.md** - Guia completo de hospedagem de imagens
- **PRODUTOS_EXEMPLO.md** - Produtos prontos para teste
- **FIREBASE_PROMPT.md** - Documentação técnica completa

## Suporte

Documentação oficial do Firebase: https://firebase.google.com/docs
