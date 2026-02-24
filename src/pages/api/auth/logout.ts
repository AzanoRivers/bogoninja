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

export const POST: APIRoute = async () => {
	const cookieStr = [
		`${COOKIE_NAME}=`,
		'Path=/',
		'Max-Age=0',
		'HttpOnly',
		'SameSite=Strict',
		import.meta.env.PROD ? 'Secure' : '',
	].filter(Boolean).join('; ');

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Set-Cookie': cookieStr,
		},
	});
};
