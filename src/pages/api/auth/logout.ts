/**
 * API: POST /api/auth/logout
 *
 * @description
 * Elimina la cookie de sesión y redirige al login.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';
import { COOKIE_NAME } from '@/lib/auth';

function methodNotAllowed(request: Request, allow: string): Response {
	if (request.headers.get('Accept')?.includes('text/html')) {
		return new Response(null, { status: 302, headers: { Location: '/404' } });
	}
	return new Response(
		JSON.stringify({ error: 'Método no permitido' }),
		{ status: 405, headers: { 'Content-Type': 'application/json', 'Allow': allow } }
	);
}

export const ALL: APIRoute = ({ request }) => methodNotAllowed(request, 'GET');

export const GET: APIRoute = async () => {
	const cookieStr = [
		`${COOKIE_NAME}=`,
		'Path=/',
		'Max-Age=0',
		'HttpOnly',
		'SameSite=Strict',
		import.meta.env.PROD ? 'Secure' : '',
	].filter(Boolean).join('; ');

	return new Response(null, {
		status: 302,
		headers: {
			'Location': '/login',
			'Set-Cookie': cookieStr,
		},
	});
};
