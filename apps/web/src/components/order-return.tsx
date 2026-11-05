import { useEffect } from 'react';
import { Link } from 'react-router';
import { Check, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/use-ecommerce-cart';
export function OrderReturn({ success }: { success: boolean }) {
 const { clear, isLoading } = useCart();
 useEffect(() => { if (success && !isLoading) clear(); }, [success, isLoading, clear]);
 return <main className="page-shell order-return"><div className="order-icon">{success ? <Check size={35} strokeWidth={1.4}/> : <ShoppingBag size={35} strokeWidth={1.4}/>}</div><span className="section-index">{success ? 'OBRIGADO PELA SUA COMPRA' : 'VOCÊ PODE CONTINUAR QUANDO QUISER'}</span><h1>{success ? 'Pedido recebido.' : 'Checkout não concluído.'}</h1><p>{success ? 'Acompanhe a confirmação e o recibo no e-mail informado no checkout. O pagamento segue o status informado pelo provedor.' : 'Nenhum valor foi cobrado. Suas ofertas continuam no carrinho.'}</p><Link to={success ? '/ofertas' : '/cart'} className="button">{success ? 'Voltar às ofertas' : 'Voltar ao carrinho'}<ArrowUpRight size={18}/></Link></main>;
}
