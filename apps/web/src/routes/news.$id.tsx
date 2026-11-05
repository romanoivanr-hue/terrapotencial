import type { Route } from './+types/news.$id';
import { ClientResponseError } from 'pocketbase';
import { getNewsPost } from '@/lib/content.server';
import { seo } from '@/lib/seo';
import { HERO_IMAGE } from '@/constants/site';
import { NewsArticle } from '@/components/news-article';
export async function loader({ params }: Route.LoaderArgs) { try { return { post: await getNewsPost(params.id) }; } catch (error) { if (error instanceof ClientResponseError && error.status === 404) throw new Response('Atualização não encontrada', { status: 404 }); throw error; } }
export function meta({ matches, location, loaderData }: Route.MetaArgs) { if (!loaderData) return seo({ matches, location }, { title: 'Atualização não encontrada', description: 'Esta atualização não está disponível.', noindex: true }); const p = loaderData.post; return seo({ matches, location }, { title: p.titulo, description: p.resumo || 'Atualização do estudo de loteamento.', image: HERO_IMAGE, type: 'article', jsonLd: { '@context': 'https://schema.org', '@type': 'Article', headline: p.titulo, datePublished: p.created, dateModified: p.updated, author: { '@type': 'Organization', name: 'Estudo de Loteamento' } } }); }
export default function NewsPostPage({ loaderData }: Route.ComponentProps) { return <NewsArticle post={loaderData.post}/>; }
