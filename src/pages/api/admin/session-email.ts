/**
 * API: POST /api/admin/session-email
 *
 * @description
 * Envío del correo de sesión — masivo a todos los ninjas o individual a uno.
 * Ruta protegida — requiere sesión válida (verificado en middleware).
 *
 * Body esperado:
 * {
 *   fecha:            string   // DD-MM  ej. "01-03"
 *   hora:             string   // HH:MM  ej. "07:00"
 *   location:         string   // nombre del lugar
 *   mapsLink:         string   // URL de Google Maps
 *   parkingBikesLink?: string  // URL Google Maps parqueo bicicletas (opcional)
 *   parkingMotosLink?: string  // URL Google Maps parqueo motos (opcional)
 *   targetEmail?:     string   // Si se indica, enviar solo a ese correo
 * }
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';

function methodNotAllowed(request: Request, allow: string): Response {
	if (request.headers.get('Accept')?.includes('text/html')) {
		return new Response(null, { status: 302, headers: { Location: '/404' } });
	}
	return new Response(
		JSON.stringify({ error: 'Método no permitido' }),
		{ status: 405, headers: { 'Content-Type': 'application/json', 'Allow': allow } }
	);
}

export const ALL: APIRoute = ({ request }) => methodNotAllowed(request, 'POST');
import { Resend } from 'resend';
import { sql } from '@/db/config';
import { generateSesionEmail } from '@/emails/sesion';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface SessionEmailBody {
	fecha: string;
	hora: string;
	location: string;
	mapsLink: string;
	parkingBikesLink?: string;
	parkingMotosLink?: string;
	targetEmail?: string;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const body: SessionEmailBody = await request.json();
		const { fecha, hora, location, mapsLink, parkingBikesLink, parkingMotosLink, targetEmail } = body;

		if (!fecha || !hora || !location || !mapsLink) {
			return new Response(
				JSON.stringify({ error: 'Todos los campos son requeridos' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// ── ENVÍO INDIVIDUAL ──────────────────────────────────────────────
		if (targetEmail) {
			const rows = await sql`
				SELECT email, name FROM ninja_registrations WHERE email = ${targetEmail} LIMIT 1
			`;
			const ninja = (rows as Array<{ email: string; name: string }>)[0];
			const apodo = ninja?.name ?? 'Ninja';

			const { error } = await resend.emails.send({
				from: import.meta.env.RESEND_SENDER,
				to: targetEmail,
				subject: '🥷 Siguiente Sesión - Bogota.ninja!',
				html: generateSesionEmail({
					apodo,
					fecha,
					hora,
					location,
					mapsLink,
					parkingBikesLink,
					parkingMotosLink,
					email: targetEmail,
				}),
			});

			if (error) {
				return new Response(
					JSON.stringify({ error: error.message }),
					{ status: 500, headers: { 'Content-Type': 'application/json' } }
				);
			}

			return new Response(
				JSON.stringify({ success: true, sent: 1, total: 1 }),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// ── ENVÍO MASIVO ──────────────────────────────────────────────────
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
				parkingBikesLink,
				parkingMotosLink,
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
