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
import { processUnsubscribe } from '@/lib/unsubscribe-service';

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

        // Procesar desuscripción usando función compartida
        const result = await processUnsubscribe(email, token);

        // Determinar código de estado HTTP
        let statusCode = 200;
        if (!result.success) {
            if (result.error?.includes('inválido') || result.error?.includes('expirado')) {
                statusCode = 403;
            } else if (result.error?.includes('no encontró')) {
                statusCode = 404;
            } else if (result.error?.includes('requeridos')) {
                statusCode = 400;
            } else {
                statusCode = 500;
            }
        }

        return new Response(
            JSON.stringify(result),
            { status: statusCode, headers: { 'Content-Type': 'application/json' } }
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
