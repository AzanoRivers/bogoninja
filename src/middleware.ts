/**
 * Astro Middleware - Protección de rutas del panel admin
 *
 * @description
 * Intercepta las rutas bajo /dashboard y /api/admin.
 * Verifica el JWT en la cookie ninja_session.
 * Si el token es inválido o expiró → redirige a /login.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import { defineMiddleware } from 'astro:middleware';
import { verifySession, COOKIE_NAME } from '@/lib/auth';

const PROTECTED_PREFIXES = ['/dashboard', '/api/admin'];

export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;

	const isProtected = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
	if (!isProtected) return next();

	const token = context.cookies.get(COOKIE_NAME)?.value;

	if (!token) {
		// Ruta API → 401; página → redirect
		if (pathname.startsWith('/api/')) {
			return new Response(JSON.stringify({ error: 'No autorizado' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			});
		}
		return context.redirect('/login');
	}

	const session = await verifySession(token);

	if (!session) {
		context.cookies.delete(COOKIE_NAME, { path: '/' });
		if (pathname.startsWith('/api/')) {
			return new Response(JSON.stringify({ error: 'Sesión expirada' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			});
		}
		return context.redirect('/login?expired=1');
	}

	// Disponible en todas las páginas/APIs protegidas
	context.locals.admin = session;

	return next();
});
