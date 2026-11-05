import type { Route } from './+types/news';
import { seo } from '@/lib/seo';
import { getNews } from '@/lib/content.server';
import { NewsList } from '@/components/news-list';
import { HERO_IMAGE } from '@/constants/site';
export async function loader() { return { posts: await getNews(100) }; }
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Atualizações — Estudo de Loteamento', description: 'Acompanhe as notícias e atualizações publicadas sobre o estudo de loteamento. Veja as novidades do projeto e fique por dentro dos próximos passos.', image: HERO_IMAGE, jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Atualizações do estudo' } }); }
export default function NewsPage({ loaderData }: Route.ComponentProps) { return <main className="page-shell"><span className="section-index">NOTÍCIAS DO ESTUDO</span><h1>Cada passo, uma atualização.</h1><p className="page-intro">Acompanhe as novidades publicadas sobre o estudo de loteamento.</p><NewsList posts={loaderData.posts}/></main>; }
