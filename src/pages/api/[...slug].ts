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

const NOT_FOUND = new Response(
	JSON.stringify({ error: 'Ruta no encontrada' }),
	{ status: 404, headers: { 'Content-Type': 'application/json' } }
);

export const ALL: APIRoute = () => NOT_FOUND;
