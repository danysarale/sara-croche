import {
  type Product,
  type PackagingOption,
  type CardOption,
  WHATSAPP_NUMBER,
} from "@/data/product";

export interface OrderData {
  product: Product;
  isGift: boolean;
  selectedPackaging: PackagingOption | null;
  selectedCard: CardOption | null;
  giftMessage: string;
}

/* Formata valor em Real */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/* Calcula total (produto + embalagem se for presente) */
export function calculateTotal(order: OrderData): number {
  let total = order.product.price;
  if (order.isGift && order.selectedPackaging) {
    total += order.selectedPackaging.price;
  }
  return total;
}

/*
  Monta a mensagem formatada para WhatsApp.
  Usa *negrito* e _itálico_ que o WhatsApp reconhece.
*/
function buildWhatsAppMessage(order: OrderData): string {
  const total = calculateTotal(order);

  let message = `✨ *Novo Pedido — Sara Crochê* ✨\n\n`;
  message += `🧸 *Produto:* ${order.product.name}\n`;
  message += `📎 *Coleção:* ${order.product.collection}\n`;
  message += `💰 *Valor:* ${formatCurrency(order.product.price)}\n\n`;

  if (order.isGift) {
    message += `🎁 *Para Presente:* Sim\n`;

    if (order.selectedPackaging) {
      message += `📦 *Embalagem:* ${order.selectedPackaging.name} (+${formatCurrency(order.selectedPackaging.price)})\n`;
    }

    if (order.selectedCard) {
      message += `💌 *Cartão:* ${order.selectedCard.name}\n`;
    }

    if (order.giftMessage.trim()) {
      message += `\n✉️ *Mensagem do Cartão:*\n`;
      message += `_"${order.giftMessage.trim()}"_\n`;
    }

    message += `\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💝 *Total: ${formatCurrency(total)}*\n\n`;
  message += `_Pedido enviado pelo site Sara Crochê_`;

  return message;
}

/*
  Abre o WhatsApp com a mensagem pronta.
  
  Como funciona:
  - encodeURIComponent() codifica a mensagem para URL
  - wa.me é a API oficial do WhatsApp
  - No celular: abre o app WhatsApp
  - No desktop: abre o WhatsApp Web
*/
export function sendToWhatsApp(order: OrderData): void {
  const message = buildWhatsAppMessage(order);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}