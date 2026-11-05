import type { Route } from './+types/privacy';
import { seo } from '@/lib/seo';
import { HERO_IMAGE } from '@/constants/site';
import { PrivacyContent } from '@/components/privacy-content';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Privacidade — Estudo de Loteamento', description: 'Entenda como os dados de contato, inscrições e compras são utilizados e saiba como escolher suas preferências de cookies no site.', image: HERO_IMAGE }); }
export default function PrivacyPage() { return <PrivacyContent/>; }
