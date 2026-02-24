/**
 * API: POST /api/auth/login
 *
 * @description
 * Verifica las credenciales en ninja_admin, emite JWT de 15min en cookie httpOnly.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';
import { sql } from '@/db/config';
import { verifyPassword, signSession, COOKIE_NAME } from '@/lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
	try {
		const body = await request.json();
		const { correo, password } = body ?? {};

		if (!correo || !password) {
			return new Response(
				JSON.stringify({ error: 'Correo y contraseña requeridos' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const rows = await sql`
			SELECT id, correo, password
			FROM ninja_admin
			WHERE correo = ${correo}
			LIMIT 1
		`;

		// Mismo mensaje de error para usuario no encontrado o password incorrecto (evita user enumeration)
		if (!rows || rows.length === 0 || !verifyPassword(password, rows[0].password)) {
			return new Response(
				JSON.stringify({ error: 'Credenciales inválidas' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const admin = rows[0];
		const token = await signSession({ adminId: admin.id, correo: admin.correo });

		cookies.set(COOKIE_NAME, token, {
			path: '/',
			httpOnly: true,
			secure: import.meta.env.PROD,
			sameSite: 'strict',
			maxAge: 60 * 15, // 15 minutos
		});

		return new Response(
			JSON.stringify({ success: true }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);

	} catch (err) {
		console.error('[auth/login]', err);
		return new Response(
			JSON.stringify({ error: 'Error interno del servidor' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
