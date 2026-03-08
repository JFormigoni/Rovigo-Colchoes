# Loja de Colchões - Website Completo

Website completo para loja de colchões com Firebase backend.

## Tecnologias Utilizadas

- HTML5, CSS3, JavaScript (ES6+)
- Firebase (Firestore, Storage, Hosting, Authentication)

## Estrutura do Projeto

```
mattress-store/
├── public/
│   ├── index.html          # Página inicial
│   ├── produtos.html       # Lista de produtos
│   ├── sobre.html          # Sobre a loja
│   ├── admin/
│   │   └── index.html      # Painel administrativo
│   ├── css/
│   │   └── style.css       # Estilos
│   └── js/
│       ├── app.js          # Script da home
│       ├── produtos.js     # Script de produtos
│       └── admin.js        # Script do admin
├── firebase.json           # Configuração do Firebase
├── firestore.rules         # Regras do Firestore
├── storage.rules           # Regras do Storage
└── .firebaserc             # Projeto Firebase
```

## Configuração

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative os seguintes serviços:
   - Firestore Database
   - Storage
   - Authentication (Email/Password)
   - Hosting

### 2. Configurar Credenciais

Edite os arquivos JavaScript e substitua as credenciais do Firebase:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};
```

Arquivos a editar:
- `public/js/app.js`
- `public/js/produtos.js`
- `public/js/admin.js`

### 3. Configurar WhatsApp

No arquivo `public/js/produtos.js`, altere o número do WhatsApp:

```javascript
const WHATSAPP_NUMBER = '5511999999999'; // Formato: código país + DDD + número
```

### 4. Criar Usuário Admin

No Firebase Console:
1. Vá em Authentication
2. Adicione um usuário com email e senha
3. Use essas credenciais para fazer login no painel admin

### 5. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 6. Fazer Login no Firebase

```bash
firebase login
```

### 7. Inicializar Projeto

```bash
firebase init
```

Selecione:
- Firestore
- Storage
- Hosting

### 8. Atualizar .firebaserc

Edite `.firebaserc` e substitua `"seu-projeto-id"` pelo ID do seu projeto Firebase.

### 9. Deploy das Regras

```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

### 10. Deploy do Site

```bash
firebase deploy --only hosting
```

## Funcionalidades

### Páginas Públicas

- **Home**: Banner, produtos em destaque, sobre a loja
- **Produtos**: Lista completa de colchões com filtros
- **Sobre Nós**: História, missão, visão e valores

### Página de Produto

- Imagem do produto
- Nome e descrição
- Preço (com preço promocional se houver)
- Seleção de cor
- Seleção de tamanho (Solteiro, Casal, Queen, King)
- Botão para contato via WhatsApp

### Painel Administrativo

- Login protegido com Firebase Authentication
- Dashboard de produtos
- Adicionar novo produto
- Editar produto existente
- Excluir produto
- Upload de imagens para Firebase Storage
- Marcar produto como:
  - Promoção
  - Destaque na home
  - Fora de estoque

### Banco de Dados (Firestore)

Collection: `produtos`

Campos:
- `nome` (string)
- `descricao` (string)
- `preco` (number)
- `precoPromocional` (number, opcional)
- `promocao` (boolean)
- `destaque` (boolean)
- `estoque` (boolean)
- `cores` (array de strings)
- `tamanhos` (array de strings)
- `imagem` (string, URL do Firebase Storage)

## Fluxo de Compra

1. Cliente navega pelos produtos
2. Seleciona um produto de interesse
3. Escolhe cor e tamanho
4. Clica em "Falar com Vendedor no WhatsApp"
5. Mensagem automática é gerada com:
   - Nome do produto
   - Cor selecionada
   - Tamanho selecionado
6. Cliente é redirecionado para WhatsApp com a mensagem pronta

## Comandos Úteis

```bash
# Deploy completo
firebase deploy

# Deploy apenas do hosting
firebase deploy --only hosting

# Deploy apenas das regras
firebase deploy --only firestore:rules,storage:rules

# Testar localmente
firebase serve
```

## Responsividade

O site é totalmente responsivo e otimizado para:
- Desktop
- Tablet
- Mobile

## Segurança

- Leitura pública de produtos
- Escrita apenas para usuários autenticados
- Upload de imagens apenas para admins
- Regras de segurança configuradas no Firestore e Storage

## Suporte

Para dúvidas ou problemas, consulte a [documentação do Firebase](https://firebase.google.com/docs).
