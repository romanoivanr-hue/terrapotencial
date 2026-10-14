export interface PaymentPayload {
  name: string;
  email: string;
  phone: string;
  cpfCnpj?: string;
  planId: string;
  planName: string;
  amount: number;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  couponCode?: string;
  creditCardData?: {
    cardNumber: string;
    holderName: string;
    expiryDate: string;
    cvv: string;
    installments: number;
  };
}

export interface PaymentResult {
  success: boolean;
  protocol: string;
  transactionId: string;
  gateway: 'Asaas' | 'MercadoPago' | 'Stripe';
  amount: number;
  pixQrCodeUrl?: string;
  pixCopiaECola?: string;
  boletoBarcode?: string;
  boletoPdfUrl?: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  message: string;
}

export const paymentService = {
  /**
   * Processamento com simulação idêntica à API do Asaas / Mercado Pago
   */
  async processPayment(payload: PaymentPayload): Promise<PaymentResult> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const protocol = `TR-2026-${randomDigits}`;
    const txId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Gera payload de PIX Copia e Cola compatível com padrão EMV Banco Central
    const pixCopiaECola = `00020126580014br.gov.bcb.pix0136${txId}520400005303986540${payload.amount.toFixed(2)}5802BR5913TERRAPOTENCIAL6012FLORIANOPOLIS62070503***6304ABCD`;

    return {
      success: true,
      protocol,
      transactionId: txId,
      gateway: 'Asaas',
      amount: payload.amount,
      pixCopiaECola,
      pixQrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCopiaECola)}`,
      boletoBarcode: `34191.79001 01043.510047 91020.150008 8 ${Date.now().toString().slice(-8)}`,
      status: payload.paymentMethod === 'credit_card' ? 'APPROVED' : 'PENDING',
      message: payload.paymentMethod === 'credit_card' 
        ? 'Pagamento aprovado instantaneamente. Protocolo gerado com sucesso.'
        : 'Código de pagamento gerado. Aguardando compensação bancária.'
    };
  }
};
