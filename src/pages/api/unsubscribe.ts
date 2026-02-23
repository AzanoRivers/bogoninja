/**
 * Unsubscribe API Endpoint - Endpoint para desuscribirse de notificaciones
 * 
 * @description
 * Elimina el registro de un usuario de la base de datos usando un token seguro.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';
import { sql } from '@/db/config';
import { verifyUnsubscribeToken } from '@/lib/unsubscribe';

interface UnsubscribeRequest {
    email: string;
    token: string;
}

interface SuccessResponse {
    success: true;
    message: string;
}

interface ErrorResponse {
    success: false;
    error: string;
}

export const POST: APIRoute = async ({ request }) => {
    try {
        // Parsear body
        let body: UnsubscribeRequest;
        try {
            body = await request.json();
        } catch {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'Datos inválidos' 
                } as ErrorResponse),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { email, token } = body;

        // Validar campos requeridos
        if (!email || !token) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'Email y token son requeridos' 
                } as ErrorResponse),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verificar token
        const isValid = verifyUnsubscribeToken(email, token);
        if (!isValid) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'Token inválido o expirado' 
                } as ErrorResponse),
                { status: 403, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verificar si el registro existe
        const existingRecord = await sql`
            SELECT id, email, name
            FROM ninja_registrations
            WHERE email = ${email.toLowerCase().trim()}
            LIMIT 1
        `;

        if (existingRecord.length === 0) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'No se encontró el registro' 
                } as ErrorResponse),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Eliminar registro
        await sql`
            DELETE FROM ninja_registrations
            WHERE email = ${email.toLowerCase().trim()}
        `;

        return new Response(
            JSON.stringify({ 
                success: true,
                message: 'Te has desuscrito correctamente de las notificaciones de entrenamiento'
            } as SuccessResponse),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error en /api/unsubscribe:', error);
        
        return new Response(
            JSON.stringify({ 
                success: false,
                error: 'Error interno del servidor. Por favor intenta más tarde.'
            } as ErrorResponse),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// Rechazar otros métodos HTTP
export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({ 
            success: false, 
            error: 'Método no permitido' 
        } as ErrorResponse),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
};
