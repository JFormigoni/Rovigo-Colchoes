// Configurações globais da aplicação

// Número do WhatsApp (formato: código do país + DDD + número)
// Exemplo: 5511999999999 (55 = Brasil, 11 = DDD, 999999999 = número)
export const WHATSAPP_NUMBER = '5541995543296'

// Função helper para gerar link do WhatsApp
export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Função helper para abrir WhatsApp em nova aba
export function openWhatsApp(message: string): void {
  window.open(getWhatsAppLink(message), '_blank')
}
