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

const METHOD_NOT_ALLOWED = new Response(
	JSON.stringify({ error: 'Método no permitido' }),
	{ status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'GET' } }
);

export const ALL: APIRoute = () => METHOD_NOT_ALLOWED;

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
