/**
 * API: GET /api/admin/ninjas
 *
 * @description
 * Retorna la lista completa de ninjas registrados.
 * Ruta protegida — requiere sesión válida (verificado en middleware).
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';
import { sql } from '@/db/config';

const METHOD_NOT_ALLOWED = new Response(
	JSON.stringify({ error: 'Método no permitido' }),
	{ status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'GET' } }
);

export const ALL: APIRoute = () => METHOD_NOT_ALLOWED;

export const GET: APIRoute = async () => {
	try {
		const ninjas = await sql`
			SELECT id, email, name, improve, experience, location, created_at
			FROM ninja_registrations
			ORDER BY created_at DESC
		`;

		return new Response(
			JSON.stringify({ ninjas, count: ninjas.length }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);

	} catch (err) {
		console.error('[admin/ninjas]', err);
		return new Response(
			JSON.stringify({ error: 'Error consultando ninjas' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
