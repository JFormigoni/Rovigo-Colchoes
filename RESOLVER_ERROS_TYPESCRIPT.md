# Como Resolver Erros de "Cannot find module"

Se você está vendo erros como:
```
Cannot find module '@/lib/config' or its corresponding type declarations.
```

## ✅ Solução Rápida

### Opção 1: Reiniciar TypeScript Server (VS Code)

1. Pressione `Ctrl + Shift + P` (ou `Cmd + Shift + P` no Mac)
2. Digite: `TypeScript: Restart TS Server`
3. Pressione Enter
4. Aguarde alguns segundos

Os erros devem desaparecer!

### Opção 2: Recarregar VS Code

1. Pressione `Ctrl + Shift + P`
2. Digite: `Developer: Reload Window`
3. Pressione Enter

### Opção 3: Fechar e Abrir VS Code

1. Feche completamente o VS Code
2. Abra novamente
3. Aguarde o TypeScript carregar

---

## 🔍 Por que isso acontece?

O TypeScript do VS Code às vezes não detecta mudanças no `tsconfig.json` ou novos arquivos automaticamente. Reiniciar o servidor TypeScript força uma nova leitura das configurações.

---

## ✅ Verificar se Funcionou

Após reiniciar, verifique se:

1. Os imports com `@/` não mostram mais erro
2. O autocomplete funciona ao digitar `@/`
3. Você consegue navegar para os arquivos com Ctrl+Click

---

## 🛠️ Se o Problema Persistir

### 1. Verificar se os arquivos existem

Certifique-se de que estes arquivos existem:
- `src/lib/config.ts` ✅
- `src/lib/supabase.ts` ✅
- `src/lib/database.types.ts` ✅
- `src/components/ProductCard.tsx` ✅
- `src/components/ProductModal.tsx` ✅

### 2. Verificar tsconfig.json

O arquivo `tsconfig.json` deve ter:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 3. Verificar vite.config.ts

O arquivo `vite.config.ts` deve ter:

```typescript
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 4. Reinstalar Dependências

```bash
rm -rf node_modules package-lock.json
npm install
```

### 5. Limpar Cache do TypeScript

No VS Code:
1. `Ctrl + Shift + P`
2. Digite: `TypeScript: Clear Cache and Restart`

---

## 🚀 Executar o Projeto

Mesmo com os erros visuais no VS Code, o projeto deve funcionar:

```bash
npm run dev
```

Acesse: http://localhost:5173

Se o site funcionar normalmente, os erros são apenas do VS Code e podem ser ignorados (mas é melhor resolver reiniciando o TS Server).

---

## 📝 Nota Importante

Estes erros são **apenas visuais** no editor. O código compila e executa normalmente porque:

- ✅ O Vite reconhece o alias `@/`
- ✅ O TypeScript em runtime funciona corretamente
- ✅ O build de produção funciona

Mas é recomendado resolver para ter:
- Autocomplete funcionando
- Navegação entre arquivos (Ctrl+Click)
- Detecção de erros reais

---

**Solução mais comum: Reiniciar TypeScript Server no VS Code!** 🎯
