/**
 * Auth Library - JWT + Password verification para Bogoninja Admin
 *
 * @description
 * Maneja firma/verificación de JWT con jose y verificación de
 * contraseñas hasheadas con scrypt nativo de Node.js.
 * Formato de hash almacenado: <salt_hex>:<hash_hex>
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import { SignJWT, jwtVerify } from 'jose';
import { scryptSync, timingSafeEqual } from 'crypto';

// ── Configuración ──────────────────────────────────────────────

export const COOKIE_NAME = 'ninja_session';
const SESSION_DURATION = '15m';

function getSecretKey(): Uint8Array {
	const secret =
		(import.meta as any).env?.JWT_SECRET ??
		process.env?.JWT_SECRET ??
		'bogoninja-dev-secret-change-in-production';
	return new TextEncoder().encode(secret);
}

// ── Tipos ──────────────────────────────────────────────────────

export interface AdminSession {
	adminId: number;
	correo: string;
}

// ── JWT ────────────────────────────────────────────────────────

/**
 * Firma un JWT de sesión con expiración de 15 minutos
 */
export async function signSession(payload: AdminSession): Promise<string> {
	return new SignJWT(payload as unknown as Record<string, unknown>)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(SESSION_DURATION)
		.sign(getSecretKey());
}

/**
 * Verifica un JWT de sesión. Retorna el payload o null si es inválido/expirado.
 */
export async function verifySession(token: string): Promise<AdminSession | null> {
	try {
		const { payload } = await jwtVerify(token, getSecretKey());
		return payload as unknown as AdminSession;
	} catch {
		return null;
	}
}

// ── Password ───────────────────────────────────────────────────

/**
 * Verifica una contraseña plana contra el hash almacenado.
 * Hash format: <salt_hex>:<hash_hex> (scrypt, 64 bytes)
 */
export function verifyPassword(plain: string, stored: string): boolean {
	const [salt, hash] = stored.split(':');
	if (!salt || !hash) return false;
	try {
		const attempt = scryptSync(plain, salt, 64).toString('hex');
		return timingSafeEqual(Buffer.from(attempt), Buffer.from(hash));
	} catch {
		return false;
	}
}
