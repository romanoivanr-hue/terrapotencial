import type { Route } from './+types/checkout.success';
import { seo } from '@/lib/seo';
import { OrderReturn } from '@/components/order-return';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Pedido recebido — Estudo de Loteamento', description: 'Obrigado pela sua compra. Acompanhe as informações do pedido no e-mail informado no checkout.', noindex: true }); }
export default function SuccessPage() { return <OrderReturn success/>; }
