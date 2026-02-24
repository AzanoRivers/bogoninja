/**
 * API: POST /api/admin/session-email
 *
 * @description
 * Envío masivo del correo de sesión a todos los ninjas registrados.
 * Ruta protegida — requiere sesión válida (verificado en middleware).
 *
 * Body esperado:
 * {
 *   fecha:    string  // DD-MM  ej. "01-03"
 *   hora:     string  // HH:MM  ej. "07:00"
 *   location: string  // nombre del lugar
 *   mapsLink: string  // URL de Google Maps
 * }
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { sql } from '@/db/config';
import { generateSesionEmail } from '@/emails/sesion';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface SessionEmailBody {
	fecha: string;
	hora: string;
	location: string;
	mapsLink: string;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const body: SessionEmailBody = await request.json();
		const { fecha, hora, location, mapsLink } = body;

		if (!fecha || !hora || !location || !mapsLink) {
			return new Response(
				JSON.stringify({ error: 'Todos los campos son requeridos' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Obtener todos los ninjas con email y nombre
		const ninjas = await sql`
			SELECT email, name FROM ninja_registrations ORDER BY created_at ASC
		`;

		if (!ninjas || ninjas.length === 0) {
			return new Response(
				JSON.stringify({ error: 'No hay ninjas registrados', sent: 0 }),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Preparar batch de emails (Resend soporta hasta 100 por batch)
		const emails = (ninjas as Array<{ email: string; name: string }>).map(ninja => ({
			from: import.meta.env.RESEND_SENDER,
			to: ninja.email,
			subject: '🥷 Siguiente Sesión - Bogota.ninja!',
			html: generateSesionEmail({
				apodo: ninja.name,
				fecha,
				hora,
				location,
				mapsLink,
				email: ninja.email,
			}),
		}));

		// Enviar en chunks de 100 (límite de Resend batch)
		const CHUNK_SIZE = 100;
		let totalSent = 0;
		const errors: string[] = [];

		for (let i = 0; i < emails.length; i += CHUNK_SIZE) {
			const chunk = emails.slice(i, i + CHUNK_SIZE);
			const { data, error } = await resend.batch.send(chunk);

			if (error) {
				errors.push(error.message);
			} else {
				totalSent += chunk.length;
			}
		}

		return new Response(
			JSON.stringify({
				success: errors.length === 0,
				sent: totalSent,
				total: ninjas.length,
				errors: errors.length > 0 ? errors : undefined,
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);

	} catch (err) {
		console.error('[admin/session-email]', err);
		return new Response(
			JSON.stringify({ error: 'Error enviando emails' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
