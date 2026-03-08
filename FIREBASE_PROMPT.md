# Prompt de Configuração Firebase - Loja de Colchões

## Descrição do Projeto

Website completo para loja de colchões com sistema de catálogo de produtos e integração WhatsApp para vendas. O site não possui carrinho de compras - os clientes selecionam produtos e entram em contato diretamente via WhatsApp.

**IMPORTANTE:** Este projeto NÃO usa Firebase Storage. As imagens são hospedadas em serviços externos gratuitos (Imgur, Cloudinary, etc.).

## Serviços Firebase Necessários

### 1. Firestore Database
- **Modo**: Produção
- **Localização**: southamerica-east1 (São Paulo)
- **Collection**: `produtos`

### 2. Firebase Authentication
- **Método**: Email/Password
- **Usuário Admin**: Criar manualmente no console

### 3. Firebase Hosting
- **Diretório público**: `public`
- **SPA**: Não (site multi-página)

---

## Estrutura do Banco de Dados (Firestore)

### Collection: `produtos`

```javascript
{
  nome: string,              // "Colchão Ortopédico Premium"
  descricao: string,         // Descrição detalhada do produto
  preco: number,             // 1299.90
  precoPromocional: number,  // 999.90 (opcional, null se não houver)
  promocao: boolean,         // true/false
  destaque: boolean,         // true/false (aparece na home)
  estoque: boolean,          // true/false
  cores: array,              // ["Branco", "Cinza", "Azul"]
  tamanhos: array,           // ["Solteiro", "Casal", "Queen", "King"]
  imagem: string             // URL externa (ex: https://i.imgur.com/abc123.jpg)
}
```

### Índices Necessários (Firestore)

```json
{
  "collectionGroup": "produtos",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "destaque", "order": "ASCENDING" },
    { "fieldPath": "estoque", "order": "ASCENDING" }
  ]
}
```

---

## Regras de Segurança

### Firestore Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /produtos/{produto} {
      // Qualquer pessoa pode ler produtos
      allow read: if true;
      
      // Apenas usuários autenticados podem criar/editar/deletar
      allow write: if request.auth != null;
    }
  }
}
```

**Nota:** Não há regras de Storage pois o projeto não usa Firebase Storage.

---

## Configuração do Firebase (firebaseConfig)

Após criar o projeto no Firebase Console, copie as credenciais e substitua nos seguintes arquivos:

### Arquivos que precisam do firebaseConfig:
1. `public/js/app.js` (linha 3-11)
2. `public/js/produtos.js` (linha 3-11)
3. `public/js/admin.js` (linha 4-12)

```javascript
const firebaseConfig = {
    apiKey: "AIza...",                          // Sua API Key
    authDomain: "seu-projeto.firebaseapp.com",  // Seu Auth Domain
    projectId: "seu-projeto-id",                // Seu Project ID
    storageBucket: "seu-projeto.appspot.com",   // Seu Storage Bucket
    messagingSenderId: "123456789",             // Seu Messaging Sender ID
    appId: "1:123456789:web:abc123"            // Seu App ID
};
```

---

## Comandos Firebase CLI

### Instalação
```bash
npm install -g firebase-tools
```

### Login
```bash
firebase login
```

### Inicialização (se necessário)
```bash
firebase init
# Selecione:
# - Firestore
# - Hosting
```

### Deploy Completo
```bash
firebase deploy
```

### Deploy Específico
```bash
# Apenas regras do Firestore
firebase deploy --only firestore:rules

# Apenas Hosting
firebase deploy --only hosting

# Índices do Firestore
firebase deploy --only firestore:indexes
```

### Teste Local
```bash
firebase serve
# Acesse: http://localhost:5000
```

---

## Configurações Adicionais

### 1. Número do WhatsApp

Edite `public/js/produtos.js`, linha 15:

```javascript
const WHATSAPP_NUMBER = '5511999999999';
```

**Formato**: `55` (Brasil) + `11` (DDD) + `999999999` (número)

### 2. ID do Projeto Firebase

Edite `.firebaserc`:

```json
{
  "projects": {
    "default": "seu-projeto-id"
  }
}
```

### 3. Criar Usuário Admin

No Firebase Console:
1. Authentication → Users → Add user
2. Email: `admin@sualoja.com`
3. Password: `senha-segura`

### 4. Hospedar Imagens dos Produtos

As imagens não são armazenadas no Firebase. Use serviços gratuitos como:

- **Imgur** (recomendado): https://imgur.com/upload
- **Cloudinary**: https://cloudinary.com/
- **ImgBB**: https://imgbb.com/

**Consulte o arquivo `HOSPEDAGEM_IMAGENS.md` para instruções detalhadas.**

---

## Estrutura de Arquivos do Projeto

```
loja-colchoes/
├── public/
│   ├── index.html              # Página inicial
│   ├── produtos.html           # Catálogo de produtos
│   ├── sobre.html              # Sobre a loja
│   ├── admin/
│   │   └── index.html          # Painel administrativo
│   ├── css/
│   │   └── style.css           # Estilos globais
│   └── js/
│       ├── app.js              # Lógica da home
│       ├── produtos.js         # Lógica do catálogo
│       └── admin.js            # Lógica do painel admin
├── firebase.json               # Configuração do Firebase
├── firestore.rules             # Regras do Firestore
├── firestore.indexes.json      # Índices do Firestore
├── .firebaserc                 # Projeto Firebase ativo
├── .gitignore                  # Arquivos ignorados pelo Git
├── package.json                # Dependências e scripts
├── README.md                   # Documentação
└── HOSPEDAGEM_IMAGENS.md       # Guia de hospedagem de imagens
```

---

## Fluxo de Uso do Sistema

### Cliente (Público)
1. Acessa o site
2. Navega pelos produtos
3. Clica em um produto para ver detalhes
4. Seleciona cor e tamanho
5. Clica em "Falar com Vendedor no WhatsApp"
6. É redirecionado para WhatsApp com mensagem pré-formatada

### Administrador
1. Acessa `/admin/`
2. Faz login com email/senha
3. Visualiza lista de produtos
4. Pode:
   - Adicionar novo produto (com URL de imagem externa)
   - Editar produto existente
   - Excluir produto
   - Marcar como promoção
   - Marcar como destaque (aparece na home)
   - Marcar como fora de estoque

---

## Mensagem WhatsApp Gerada

Quando o cliente clica no botão, a seguinte mensagem é gerada:

```
Olá, tenho interesse no colchão [NOME DO PRODUTO].
Cor: [COR SELECIONADA]
Tamanho: [TAMANHO SELECIONADO].
Poderia me passar mais informações?
```

**Exemplo real:**
```
Olá, tenho interesse no colchão Ortopédico Premium.
Cor: Branco
Tamanho: Queen.
Poderia me passar mais informações?
```

---

## Checklist de Deploy

- [ ] Criar projeto no Firebase Console
- [ ] Ativar Firestore Database
- [ ] Ativar Firebase Authentication (Email/Password)
- [ ] Ativar Firebase Hosting
- [ ] Criar usuário admin no Authentication
- [ ] Preparar imagens dos produtos (otimizar e hospedar no Imgur/Cloudinary)
- [ ] Copiar credenciais do Firebase
- [ ] Substituir firebaseConfig nos 3 arquivos JS
- [ ] Configurar número do WhatsApp
- [ ] Atualizar .firebaserc com ID do projeto
- [ ] Instalar Firebase CLI
- [ ] Fazer login: `firebase login`
- [ ] Deploy das regras: `firebase deploy --only firestore:rules`
- [ ] Deploy do site: `firebase deploy --only hosting`
- [ ] Testar acesso ao site
- [ ] Testar login no admin
- [ ] Adicionar produtos de teste (com URLs de imagens)
- [ ] Testar fluxo completo de compra via WhatsApp

---

## Custos Estimados (Plano Gratuito)

O Firebase oferece um plano gratuito (Spark) adequado para lojas pequenas/médias:

- **Firestore**: 1 GB armazenamento, 50k leituras/dia, 20k escritas/dia
- **Hosting**: 10 GB transferência/mês
- **Authentication**: Ilimitado

**Nota:** Como não usamos Firebase Storage, você economiza ainda mais. As imagens são hospedadas gratuitamente em serviços externos.

Para uma loja com ~100 produtos e ~1000 visitantes/mês, o plano gratuito é mais que suficiente.

---

## Suporte e Documentação

- **Firebase Console**: https://console.firebase.google.com/
- **Documentação Firebase**: https://firebase.google.com/docs
- **Firestore**: https://firebase.google.com/docs/firestore
- **Hosting**: https://firebase.google.com/docs/hosting
- **Authentication**: https://firebase.google.com/docs/auth

---

## Troubleshooting

### Erro: "Missing or insufficient permissions"
- Verifique se as regras do Firestore foram deployadas
- Comando: `firebase deploy --only firestore:rules`

### Imagens não carregam
- Verifique se a URL da imagem está correta
- Teste a URL em uma nova aba do navegador
- Certifique-se de usar URLs diretas de imagens (terminam com .jpg, .png, etc.)
- Consulte `HOSPEDAGEM_IMAGENS.md` para serviços recomendados

### Login não funciona
- Verifique se o Authentication está ativado
- Verifique se criou um usuário no console
- Verifique se o authDomain está correto

### WhatsApp não abre
- Verifique o formato do número: 5511999999999
- Teste manualmente: https://wa.me/5511999999999

### Site não atualiza após deploy
- Limpe o cache do navegador (Ctrl + Shift + R)
- Aguarde alguns minutos para propagação do CDN

---

## Personalização

### Alterar cores do site
Edite `public/css/style.css` e modifique as variáveis de cor.

### Alterar logo
Substitua o texto "ColchõesTop" por uma imagem ou seu texto personalizado.

### Adicionar mais páginas
Crie novos arquivos HTML em `public/` e adicione links na navbar.

### Modificar tamanhos disponíveis
Edite os selects em `public/produtos.html` e `public/admin/index.html`.

---

## Backup e Manutenção

### Exportar dados do Firestore
```bash
gcloud firestore export gs://seu-bucket/backup
```

### Monitorar uso
Acesse Firebase Console → Usage and billing

### Atualizar regras de segurança
1. Edite `firestore.rules`
2. Deploy: `firebase deploy --only firestore:rules`

---

**Projeto pronto para deploy!** 🚀

Siga o checklist acima e seu site estará no ar em minutos.
