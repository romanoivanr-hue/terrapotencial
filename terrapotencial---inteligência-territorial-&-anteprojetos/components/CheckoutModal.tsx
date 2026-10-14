import React, { useState } from 'react';
import { X, ShieldCheck, Check, CreditCard, QrCode, FileText, ArrowRight, Loader2, Tag, Copy, CalendarCheck, Clock, ExternalLink } from 'lucide-react';
import { CustomerData, PropertyData, PricingPlan } from '../types';
import { paymentService, PaymentResult } from '../services/paymentService';
import { PRICING_PLANS } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyData;
  customer: CustomerData;
  selectedPlan?: PricingPlan;
  onPaymentSuccess: (protocol: string, plan: PricingPlan) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  property,
  customer,
  selectedPlan = PRICING_PLANS[1],
  onPaymentSuccess
}) => {
  const [currentPlan, setCurrentPlan] = useState<PricingPlan>(selectedPlan);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  // Credit Card Form State
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8890');
  const [cardHolder, setCardHolder] = useState(customer.name || 'ROBERTO V MENDONCA');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('742');
  const [installments, setInstallments] = useState(1);

  if (!isOpen) return null;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'LOTEAMENTO10') {
      setDiscount(currentPlan.price * 0.1);
      setCouponApplied(true);
    } else {
      alert('Cupom inválido ou expirado. Tente o cupom de teste: LOTEAMENTO10');
    }
  };

  const finalAmount = Math.max(0, currentPlan.price - discount);

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const res = await paymentService.processPayment({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        cpfCnpj: customer.documentCpfCnpj || '12.345.678/0001-90',
        planId: currentPlan.id,
        planName: currentPlan.name,
        amount: finalAmount,
        paymentMethod,
        couponCode: couponApplied ? coupon : undefined,
        creditCardData: paymentMethod === 'credit_card' ? {
          cardNumber,
          holderName: cardHolder,
          expiryDate: cardExpiry,
          cvv: cardCvv,
          installments
        } : undefined
      });

      setIsProcessing(false);
      setPaymentResult(res);

      if (paymentMethod === 'credit_card') {
        setTimeout(() => {
          onPaymentSuccess(res.protocol, currentPlan);
        }, 1200);
      }
    } catch (err) {
      setIsProcessing(false);
      alert('Falha na conexão com o gateway de pagamento. Tente novamente.');
    }
  };

  const handleCopyPix = () => {
    if (paymentResult?.pixCopiaECola) {
      navigator.clipboard.writeText(paymentResult.pixCopiaECola);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c1424] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ambiente Seguro • Gateway Asaas / Mercado Pago</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              Contratação do Estudo Territorial
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Propriedade: {property.name} ({property.city} - {property.state})
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Plan Selector tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Selecione o Estudo Desejado</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRICING_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => {
                    setCurrentPlan(plan);
                    setDiscount(0);
                    setCouponApplied(false);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    currentPlan.id === plan.id
                      ? 'bg-emerald-500/15 border-emerald-500/60 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                    {plan.price > 0 ? `R$ ${plan.price.toLocaleString('pt-BR')}` : 'Empresarial'}
                  </span>
                  <strong className="text-xs text-white block mt-0.5 truncate">{plan.name}</strong>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {plan.revisionsCount === 99 ? 'Múltiplos estudos' : `${plan.revisionsCount} revisão(ões)`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Corporate Meeting Notice */}
          {currentPlan.id === 'corporate-mensal' ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                Alinhamento Técnico em Videoconferência
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                O plano mensal multi-glebas atende incorporadoras e loteadoras com volume contínuo de análises. Nossa diretoria técnica validará a esteira de geoprocessamento em reunião online.
              </p>
              <button
                type="button"
                onClick={() => {
                  alert('Agendamento enviado para a equipe técnica! Entraremos em contato via WhatsApp com o link do Google Meet.');
                  onPaymentSuccess('MEET-CORP-2026', currentPlan);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider"
              >
                Agendar Reunião Técnica com Especialistas
              </button>
            </div>
          ) : (
            <>
              {/* Payment Success View for PIX / Boleto */}
              {paymentResult && paymentResult.status === 'PENDING' ? (
                <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Protocolo Gerado: #{paymentResult.protocol}</span>
                  </div>

                  {paymentMethod === 'pix' && paymentResult.pixQrCodeUrl && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">
                        Escaneie o QR Code abaixo com o aplicativo do seu banco:
                      </p>
                      <img
                        src={paymentResult.pixQrCodeUrl}
                        alt="QR Code PIX"
                        className="w-48 h-48 mx-auto rounded-xl p-2 bg-white"
                      />
                      <div className="max-w-md mx-auto">
                        <button
                          type="button"
                          onClick={handleCopyPix}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          <span>{copiedPix ? 'Código PIX Copiado!' : 'Copiar Código PIX Copia e Cola'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onPaymentSuccess(paymentResult.protocol, currentPlan)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider"
                  >
                    Já realizei o pagamento • Avançar para Anexos
                  </button>
                </div>
              ) : (
                <>
                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Forma de Pagamento</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('pix')}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === 'pix'
                            ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <QrCode className="w-5 h-5" />
                        <span>PIX</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Aprovação Instantânea</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('credit_card')}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === 'credit_card'
                            ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span>Cartão de Crédito</span>
                        <span className="text-[10px] text-slate-400">Até 12x</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('boleto')}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === 'boleto'
                            ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <FileText className="w-5 h-5" />
                        <span>Boleto Bancário</span>
                        <span className="text-[10px] text-slate-400">À vista</span>
                      </button>
                    </div>
                  </div>

                  {/* Credit Card Inputs if selected */}
                  {paymentMethod === 'credit_card' && (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Número do Cartão</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Validade</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">CVV</label>
                          <input
                            type="text"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Parcelamento</label>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                        >
                          <option value={1}>1x de R$ {finalAmount.toLocaleString('pt-BR')} (sem juros)</option>
                          <option value={3}>3x de R$ {(finalAmount / 3).toFixed(2)} (sem juros)</option>
                          <option value={6}>6x de R$ {(finalAmount / 6).toFixed(2)} (sem juros)</option>
                          <option value={12}>12x de R$ {(finalAmount / 12).toFixed(2)} (sem juros)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Coupon Input */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={coupon}
                        disabled={couponApplied}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Possui cupom? (Ex: LOTEAMENTO10)"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono uppercase focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !coupon}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 disabled:opacity-40"
                    >
                      {couponApplied ? 'Aplicado ✓' : 'Aplicar'}
                    </button>
                  </div>

                  {/* Summary Ledger */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Plano Selecionado:</span>
                      <strong className="text-white">{currentPlan.name}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Revisões Inclusas:</span>
                      <span className="text-emerald-400 font-semibold">{currentPlan.revisionsCount} adequação(ões)</span>
                    </div>
                    {currentPlan.includesMeeting && (
                      <div className="flex justify-between text-slate-400">
                        <span>Reunião Técnica Online:</span>
                        <span className="text-emerald-400 font-semibold">Inclusa com Especialistas</span>
                      </div>
                    )}
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Desconto Cupom:</span>
                        <span>- R$ {discount.toLocaleString('pt-BR')}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline pt-2 border-t border-slate-800 text-white font-bold text-base">
                      <span>Total do Estudo:</span>
                      <span className="font-display text-2xl text-emerald-400">
                        R$ {finalAmount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processando no Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirmar Pagamento e Iniciar Estudo</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};
