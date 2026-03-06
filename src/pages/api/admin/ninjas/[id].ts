/**
 * API: DELETE /api/admin/ninjas/:id
 *
 * @description
 * Elimina un ninja registrado por su ID.
 * Ruta protegida — requiere sesión válida (verificado en middleware).
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';
import { sql } from '@/db/config';

function methodNotAllowed(request: Request, allow: string): Response {
	if (request.headers.get('Accept')?.includes('text/html')) {
		return new Response(null, { status: 302, headers: { Location: '/404' } });
	}
	return new Response(
		JSON.stringify({ error: 'Método no permitido' }),
		{ status: 405, headers: { 'Content-Type': 'application/json', 'Allow': allow } }
	);
}

export const ALL: APIRoute = ({ request }) => methodNotAllowed(request, 'DELETE');

export const DELETE: APIRoute = async ({ params }) => {
	try {
		const id = parseInt(params.id ?? '', 10);

		if (isNaN(id)) {
			return new Response(
				JSON.stringify({ error: 'ID inválido' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const result = await sql`
			DELETE FROM ninja_registrations WHERE id = ${id} RETURNING id, name, email
		`;

		if (!result || result.length === 0) {
			return new Response(
				JSON.stringify({ error: 'Ninja no encontrado' }),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			);
		}

		return new Response(
			JSON.stringify({ success: true, deleted: result[0] }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);

	} catch (err) {
		console.error('[admin/ninjas/:id DELETE]', err);
		return new Response(
			JSON.stringify({ error: 'Error eliminando ninja' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
