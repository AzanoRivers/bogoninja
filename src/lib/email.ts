/**
 * Email Service - Servicio de envío de emails con Resend
 * 
 * @description
 * Maneja el envío de emails transaccionales usando Resend.
 * Soporta emails de bienvenida y actualización de datos.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import { Resend } from 'resend';
import { generateWelcomeEmail } from '@/emails/welcome';
import { generateUpdateEmail } from '@/emails/update';

// Inicializar Resend con la API key desde variables de entorno
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Configuración de emails
const EMAIL_CONFIG = {
	from: import.meta.env.RESEND_SENDER,
	copyTo: import.meta.env.RESEND_COPY,
	subject: 'Ninja Moderno - Bogota.ninja',
	notificationSubject: 'Bogota.ninja - Nuevo Ninja'
} as const;

interface SendWelcomeEmailParams {
	to: string;
}

interface SendUpdateEmailParams {
	to: string;
	data: {
		name: string;
		improve: string;
		experience: string;
		location: string;
	};
}

/**
 * Enviar email de bienvenida a nuevos usuarios
 */
export async function sendWelcomeEmail({ to }: SendWelcomeEmailParams): Promise<{ success: boolean; error?: string }> {
	try {
		const html = generateWelcomeEmail({ email: to });
		
		const { data, error } = await resend.emails.send({
			from: EMAIL_CONFIG.from,
			to,
			subject: EMAIL_CONFIG.subject,
			html
		});

		if (error) {
			console.error('Error enviando email de bienvenida:', error);
			return { success: false, error: error.message };
		}

		console.log('Email de bienvenida enviado:', data);
		return { success: true };

	} catch (error) {
		console.error('Error en sendWelcomeEmail:', error);
		return { 
			success: false, 
			error: error instanceof Error ? error.message : 'Error desconocido'
		};
	}
}

/**
 * Enviar email de confirmación de actualización de datos
 */
export async function sendUpdateEmail({ to, data }: SendUpdateEmailParams): Promise<{ success: boolean; error?: string }> {
	try {
		const html = generateUpdateEmail({
			email: to,
			...data
		});
		
		const { data: responseData, error } = await resend.emails.send({
			from: EMAIL_CONFIG.from,
			to,
			subject: EMAIL_CONFIG.subject,
			html
		});

		if (error) {
			console.error('Error enviando email de actualización:', error);
			return { success: false, error: error.message };
		}

		console.log('Email de actualización enviado:', responseData);
		return { success: true };

	} catch (error) {
		console.error('Error en sendUpdateEmail:', error);
		return { 
			success: false, 
			error: error instanceof Error ? error.message : 'Error desconocido'
		};
	}
}

interface FormNotificationData {
	name: string;
	email: string;
	improve: string;
	experience: string;
	location: string;
	isNew: boolean;
}

/**
 * Enviar notificación con datos del formulario al RESEND_COPY
 */
export async function sendFormNotification(data: FormNotificationData): Promise<{ success: boolean; error?: string }> {
	try {
		const locationNames: Record<string, string> = {
			'modelia': 'Modelia',
			'parque-nacional': 'Parque Nacional',
			'mosquera': 'Mosquera'
		};

		const html = `
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Nuevo Registro - Bogota.ninja</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
	<div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
		<h1 style="color: #AB5BC7; margin: 0 0 20px 0; font-size: 24px;">
			${data.isNew ? '🥷 Nuevo Ninja Registrado' : '🔄 Datos Actualizados'}
		</h1>
		
		<div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
			<h2 style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Nombre / Apodo</h2>
			<p style="color: #666; font-size: 16px; margin: 0 0 20px 0;">${data.name}</p>
			
			<h2 style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Email</h2>
			<p style="color: #666; font-size: 16px; margin: 0 0 20px 0;">${data.email}</p>
			
			<h2 style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Qué quiere mejorar</h2>
			<p style="color: #666; font-size: 16px; margin: 0 0 20px 0;">${data.improve}</p>
			
			${data.experience ? `
			<h2 style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Experiencia previa</h2>
			<p style="color: #666; font-size: 16px; margin: 0 0 20px 0;">${data.experience}</p>
			` : ''}
			
			<h2 style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Lugar preferido</h2>
			<p style="color: #666; font-size: 16px; margin: 0;">${locationNames[data.location] || data.location}</p>
		</div>
		
		<p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
			Bogota.ninja · ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
		</p>
	</div>
</body>
</html>
`;

		const { data: responseData, error } = await resend.emails.send({
			from: EMAIL_CONFIG.from,
			to: EMAIL_CONFIG.copyTo,
			subject: EMAIL_CONFIG.notificationSubject,
			html
		});

		if (error) {
			console.error('Error enviando notificación:', error);
			return { success: false, error: error.message };
		}

		console.log('Notificación enviada:', responseData);
		return { success: true };

	} catch (error) {
		console.error('Error en sendFormNotification:', error);
		return { 
			success: false, 
			error: error instanceof Error ? error.message : 'Error desconocido'
		};
	}
}
