# Corrigir Erro de Exclusão no Supabase

## Problema
Erro ao tentar excluir produtos: "cannot delete from table 'produtos' because it does not have a replica identity"

## Solução

Execute o seguinte comando SQL no Supabase:

### Opção 1: Usar a chave primária como identidade de réplica (RECOMENDADO)
```sql
ALTER TABLE produtos REPLICA IDENTITY USING INDEX produtos_pkey;
```

### Opção 2: Usar FULL (todas as colunas)
```sql
ALTER TABLE produtos REPLICA IDENTITY FULL;
```

### Opção 3: Usar DEFAULT (apenas chave primária)
```sql
ALTER TABLE produtos REPLICA IDENTITY DEFAULT;
```

## Como Executar

1. Acesse o painel do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **SQL Editor** no menu lateral
4. Cole um dos comandos SQL acima
5. Clique em **Run** ou pressione `Ctrl+Enter`

## Recomendação

Use a **Opção 1** ou **Opção 3**, pois são mais eficientes. A Opção 1 é a melhor se você já tem uma chave primária definida (que é o caso da coluna `id`).

## Verificar se funcionou

Após executar o comando, tente excluir um produto novamente no painel admin. O erro não deve mais aparecer.

## Explicação Técnica

O Supabase usa replicação em tempo real (Realtime) para sincronizar dados. Quando você habilita Realtime em uma tabela, o PostgreSQL precisa saber quais colunas usar para identificar linhas únicas durante operações de DELETE e UPDATE. Isso é chamado de "replica identity".

Por padrão, se você habilitar Realtime depois de criar a tabela, pode ser necessário definir manualmente a replica identity.
