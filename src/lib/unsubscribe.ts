/**
 * Unsubscribe Utility - Utilidad para generar y verificar tokens de desuscripción
 * 
 * @description
 * Genera hashes seguros para links de desuscripción en emails.
 * Usa crypto nativo de Node.js para HMAC SHA256.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import crypto from 'crypto';

const SECRET_KEY = import.meta.env.UNSUBSCRIBE_SECRET || 'bogoninja-secret-key-2026';

/**
 * Genera un hash seguro para un email
 */
export function generateUnsubscribeToken(email: string): string {
    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(email.toLowerCase().trim());
    return hmac.digest('hex');
}

/**
 * Verifica que un token corresponda a un email
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
    const expectedToken = generateUnsubscribeToken(email);
    return crypto.timingSafeEqual(
        Buffer.from(token),
        Buffer.from(expectedToken)
    );
}

/**
 * Genera la URL completa de desuscripción
 */
export function generateUnsubscribeUrl(email: string, baseUrl: string = 'https://bogota.ninja'): string {
    const token = generateUnsubscribeToken(email);
    const encodedEmail = encodeURIComponent(email);
    return `${baseUrl}/unsubscribe?email=${encodedEmail}&token=${token}`;
}
