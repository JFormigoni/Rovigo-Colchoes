-- Adicionar coluna precos_por_tamanho na tabela produtos
-- Esta coluna permite definir preços diferentes para cada tamanho

ALTER TABLE produtos 
ADD COLUMN IF NOT EXISTS precos_por_tamanho JSONB;

-- Comentário explicativo
COMMENT ON COLUMN produtos.precos_por_tamanho IS 
'Array JSON com preços por tamanho. Formato: [{"tamanho": "Solteiro", "preco": 1000, "preco_promocional": 800}]';

-- Exemplo de como atualizar um produto existente com preços por tamanho:
-- UPDATE produtos 
-- SET precos_por_tamanho = '[
--   {"tamanho": "Solteiro", "preco": 1000, "preco_promocional": 800},
--   {"tamanho": "Casal", "preco": 1200, "preco_promocional": 950},
--   {"tamanho": "Queen", "preco": 1500, "preco_promocional": 1200},
--   {"tamanho": "King", "preco": 1800, "preco_promocional": 1450}
-- ]'::jsonb
-- WHERE id = 'seu-produto-id';
