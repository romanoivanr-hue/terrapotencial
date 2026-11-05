import type { Route } from './+types/checkout.cancelled';
import { seo } from '@/lib/seo';
import { OrderReturn } from '@/components/order-return';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Checkout não concluído — Estudo de Loteamento', description: 'Nenhum valor foi cobrado. Sua seleção continua no carrinho e você pode retomar a compra.', noindex: true }); }
export default function CancelledPage() { return <OrderReturn success={false}/>; }
