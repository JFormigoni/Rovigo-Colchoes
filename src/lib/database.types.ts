export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      produtos: {
        Row: {
          id: string
          created_at: string
          nome: string
          descricao: string
          preco: number
          preco_promocional: number | null
          promocao: boolean
          destaque: boolean
          estoque: boolean
          cores: string[]
          tamanhos: string[]
          imagem: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          nome: string
          descricao: string
          preco: number
          preco_promocional?: number | null
          promocao?: boolean
          destaque?: boolean
          estoque?: boolean
          cores: string[]
          tamanhos: string[]
          imagem?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          nome?: string
          descricao?: string
          preco?: number
          preco_promocional?: number | null
          promocao?: boolean
          destaque?: boolean
          estoque?: boolean
          cores?: string[]
          tamanhos?: string[]
          imagem?: string | null
        }
      }
    }
  }
}

export type Produto = Database['public']['Tables']['produtos']['Row']
