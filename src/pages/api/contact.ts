/**
 * Contact Form API Endpoint
 * 
 * @description
 * Endpoint para procesar envíos del formulario de contacto.
 * Maneja INSERT y UPDATE con validación de cooldown por IP (15 minutos).
 * Envía emails de confirmación usando Resend.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import type { APIRoute } from 'astro';
import { sql } from '@/db/config';
import { sendWelcomeEmail, sendUpdateEmail, sendFormNotification } from '@/lib/email';

interface ContactFormData {
    name: string;
    improve: string;
    experience: string;
    email: string;
    location: string;
}

interface ErrorResponse {
    error: string;
    remainingMinutes?: number;
}

interface SuccessResponse {
    success: boolean;
    message: string;
}

/**
 * Obtener la IP del cliente desde los headers de Vercel
 */
function getClientIP(request: Request): string {
    // Vercel proporciona la IP en estos headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    
    let clientIP = 'unknown';
    
    // x-forwarded-for puede contener múltiples IPs (cliente, proxies)
    // Tomamos la primera que es la del cliente original
    if (forwardedFor && forwardedFor.trim()) {
        const ips = forwardedFor.split(',').map(ip => ip.trim()).filter(ip => ip);
        if (ips.length > 0 && ips[0]) {
            clientIP = ips[0];
        }
    } else if (realIp && realIp.trim()) {
        clientIP = realIp.trim();
    }
    
    // Si es localhost (desarrollo local), retornar 'localhost'
    if (clientIP === '127.0.0.1' || 
        clientIP === '::1' || 
        clientIP === '::ffff:127.0.0.1' ||
        clientIP === 'localhost' ||
        clientIP === 'unknown') {
        return 'localhost';
    }
    
    return clientIP;
}

/**
 * Validar datos del formulario
 */
function validateFormData(data: any): ContactFormData | null {
    const { name, improve, experience, email, location } = data;

    // Validar campos requeridos
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return null;
    }
    if (!improve || typeof improve !== 'string' || improve.trim() === '') {
        return null;
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return null;
    }
    if (!location || typeof location !== 'string') {
        return null;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return null;
    }

    return {
        name: name.trim(),
        improve: improve.trim(),
        experience: experience || '',
        email: email.trim().toLowerCase(),
        location: location.trim()
    };
}

export const POST: APIRoute = async ({ request }) => {
    try {
        // Parsear body
        let body;
        try {
            body = await request.json();
        } catch {
            return new Response(
                JSON.stringify({ error: 'Datos del formulario inválidos' } as ErrorResponse),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validar datos
        const formData = validateFormData(body);
        if (!formData) {
            return new Response(
                JSON.stringify({ error: 'Datos del formulario incompletos o inválidos' } as ErrorResponse),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Obtener IP del cliente
        const clientIP = getClientIP(request);

        // Consultar si existe registro por email Y calcular minutos transcurridos desde último update
        const existingRecord = await sql`
            SELECT 
                id, 
                email, 
                ip_update, 
                updated_at,
                EXTRACT(EPOCH FROM (NOW() - updated_at)) / 60 AS elapsed_minutes
            FROM ninja_registrations 
            WHERE email = ${formData.email}
            LIMIT 1
        `;

        if (existingRecord.length > 0) {
            // Registro existe - validar cooldown por IP
            const record = existingRecord[0];
            const elapsedMinutes = Number(record.elapsed_minutes);

            // Si la IP del último update es la misma y no han pasado 15 minutos
            if (record.ip_update === clientIP && elapsedMinutes < 15) {
                const remainingMinutes = Math.ceil(15 - elapsedMinutes);
                return new Response(
                    JSON.stringify({ 
                        error: `Debes esperar ${remainingMinutes} minuto(s) para actualizar tus datos`,
                        remainingMinutes 
                    } as ErrorResponse),
                    { status: 429, headers: { 'Content-Type': 'application/json' } }
                );
            }

            // Actualizar registro existente
            await sql`
                UPDATE ninja_registrations
                SET 
                    name = ${formData.name},
                    improve = ${formData.improve},
                    experience = ${formData.experience},
                    location = ${formData.location},
                    ip_update = ${clientIP},
                    updated_at = NOW()
                WHERE email = ${formData.email}
            `;

            // Enviar emails (garantizar que se completen)
            try {
                // Email al usuario con sus datos actualizados
                await sendUpdateEmail({
                    to: formData.email,
                    data: {
                        name: formData.name,
                        improve: formData.improve,
                        experience: formData.experience,
                        location: formData.location
                    }
                });

                // Notificación al RESEND_COPY
                await sendFormNotification({
                    name: formData.name,
                    email: formData.email,
                    improve: formData.improve,
                    experience: formData.experience,
                    location: formData.location,
                    isNew: false
                });
            } catch (err) {
                console.error('Error enviando emails:', err);
                // No fallar la request por error de email
            }

            return new Response(
                JSON.stringify({ 
                    success: true,
                    message: '¡Datos actualizados correctamente!'
                } as SuccessResponse),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // No existe registro - crear nuevo
        await sql`
            INSERT INTO ninja_registrations 
                (email, name, improve, experience, location, ip_update)
            VALUES 
                (${formData.email}, ${formData.name}, ${formData.improve}, 
                 ${formData.experience}, ${formData.location}, ${clientIP})
        `;

        // Enviar emails (garantizar que se completen)
        try {
            // Email de bienvenida al usuario
            await sendWelcomeEmail({
                to: formData.email
            });

            // Notificación al RESEND_COPY
            await sendFormNotification({
                name: formData.name,
                email: formData.email,
                improve: formData.improve,
                experience: formData.experience,
                location: formData.location,
                isNew: true
            });
        } catch (err) {
            console.error('Error enviando emails:', err);
            // No fallar la request por error de email
        }

        return new Response(
            JSON.stringify({ 
                success: true,
                message: '¡Registro creado exitosamente!'
            } as SuccessResponse),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error en /api/contact:', error);
        
        return new Response(
            JSON.stringify({ 
                error: 'Error interno del servidor. Por favor intenta más tarde.'
            } as ErrorResponse),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// Rechazar otros métodos HTTP
export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({ error: 'Método no permitido' } as ErrorResponse),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
};
