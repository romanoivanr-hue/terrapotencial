import type { Route } from './+types/cart';
import { seo } from '@/lib/seo';
import { CartContent } from '@/components/cart-content';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Seu carrinho — Estudo de Loteamento', description: 'Revise as ofertas selecionadas e continue para o pagamento seguro.', noindex: true }); }
export default function CartPage() { return <main className="page-shell"><span className="section-index">SUA SELEÇÃO</span><h1>Seu carrinho.</h1><CartContent/></main>; }
