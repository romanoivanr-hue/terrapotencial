import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('privacidade', 'routes/privacy.tsx'),
	route('termos', 'routes/terms.tsx'),
	route('estudo-inicial', 'routes/study.initial.tsx'),
	route('estudo-completo', 'routes/study.complete.tsx'),
] satisfies RouteConfig;
