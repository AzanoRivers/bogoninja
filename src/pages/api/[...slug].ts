/**
 * API Catch-all — Ruta no encontrada
 *
 * @description
 * Captura cualquier petición a /api/* que no coincida con un
 * endpoint existente. Retorna 404 en JSON en lugar de crashear.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';

export const ALL: APIRoute = ({ request }) => {
	if (request.headers.get('Accept')?.includes('text/html')) {
		return new Response(null, { status: 302, headers: { Location: '/404' } });
	}
	return new Response(
		JSON.stringify({ error: 'Ruta no encontrada' }),
		{ status: 404, headers: { 'Content-Type': 'application/json' } }
	);
};
