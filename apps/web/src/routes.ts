import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('ofertas', 'routes/offers.tsx'),
	route('product/:handle', 'routes/product.$handle.tsx'),
	route('cart', 'routes/cart.tsx'),
	route('checkout/success', 'routes/checkout.success.tsx'),
	route('checkout/cancelled', 'routes/checkout.cancelled.tsx'),
	route('noticias', 'routes/news.tsx'),
	route('noticias/:id', 'routes/news.$id.tsx'),
	route('privacidade', 'routes/privacy.tsx'),
	route('termos', 'routes/terms.tsx'),
	route('sitemap.xml', 'routes/sitemap.xml.ts'),
	route('robots.txt', 'routes/robots.txt.ts'),
	route('api/health', 'routes/api.health.ts'),
	route('api/*', 'routes/api.$.ts'),
] satisfies RouteConfig;
