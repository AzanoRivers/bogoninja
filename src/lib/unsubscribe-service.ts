/**
 * Unsubscribe Service - Servicio de lógica de desuscripción
 * 
 * @description
 * Contiene la lógica principal para procesar desuscripciones.
 * Usado tanto por el API endpoint como por SSR directo.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import { sql } from '@/db/config';
import { verifyUnsubscribeToken } from './unsubscribe';

export interface UnsubscribeResult {
    success: boolean;
    message?: string;
    error?: string;
}

/**
 * Procesa la desuscripción de un usuario
 * @param email - Email del usuario
 * @param token - Token de seguridad
 * @returns Resultado de la operación
 */
export async function processUnsubscribe(
    email: string,
    token: string
): Promise<UnsubscribeResult> {
    try {
        // Validar campos requeridos
        if (!email || !token) {
            return {
                success: false,
                error: 'Email y token son requeridos'
            };
        }

        // Verificar token
        const isValid = verifyUnsubscribeToken(email, token);
        if (!isValid) {
            return {
                success: false,
                error: 'Token inválido o expirado'
            };
        }

        // Verificar si el registro existe
        const existingRecord = await sql`
            SELECT id, email, name
            FROM ninja_registrations
            WHERE email = ${email.toLowerCase().trim()}
            LIMIT 1
        `;

        if (existingRecord.length === 0) {
            return {
                success: false,
                error: 'No se encontró el registro'
            };
        }

        // Eliminar registro
        await sql`
            DELETE FROM ninja_registrations
            WHERE email = ${email.toLowerCase().trim()}
        `;

        return {
            success: true,
            message: 'Te has desuscrito correctamente de las notificaciones de entrenamiento'
        };

    } catch (error) {
        console.error('Error al procesar desuscripción:', error);
        
        return {
            success: false,
            error: 'Error interno del servidor. Por favor intenta más tarde.'
        };
    }
}
