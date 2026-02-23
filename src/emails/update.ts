/**
 * Update Email Template - Email de confirmación de actualización de datos
 * 
 * @description
 * Genera el HTML del email de actualización compatible con clientes de correo.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import { generateUnsubscribeUrl } from '../lib/unsubscribe';

interface UpdateEmailData {
	email: string;
	name: string;
	improve: string;
	experience: string;
	location: string;
}

export function generateUpdateEmail(data: UpdateEmailData): string {
	const unsubscribeUrl = generateUnsubscribeUrl(data.email);
	
	const locationNames: Record<string, string> = {
		'modelia': 'Modelia',
		'parque-nacional': 'Parque Nacional',
		'mosquera': 'Mosquera'
	};

	return `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bogoninja - Datos Actualizados</title>
	<style>
		body {
			margin: 0;
			padding: 0;
			font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}
		table {
			border-collapse: collapse;
			border-spacing: 0;
		}
		img {
			border: 0;
			display: block;
			outline: none;
			text-decoration: none;
		}
		.email-container {
			max-width: 600px;
			margin: 0 auto;
			background-color: #030A0F;
		}
		.header-logo {
			text-align: center;
			padding: 40px 20px 20px;
		}
		.content-wrapper {
			padding: 20px 30px;
		}
		.greeting {
			font-family: 'Georgia', serif;
			font-size: 20px;
			color: #d377f4;
			margin: 0 0 20px 0;
			text-align: center;
			font-style: italic;
		}
		.paragraph {
			font-size: 16px;
			line-height: 1.6;
			color: #e3edf6;
			margin: 0 0 18px 0;
			text-align: left;
		}
		.highlight {
			color: #d377f4;
			font-weight: bold;
		}
		.data-box {
			background-color: rgba(171, 91, 199, 0.1);
			border: 1px solid rgba(211, 119, 244, 0.3);
			border-radius: 8px;
			padding: 20px;
			margin: 20px 0;
		}
		.data-label {
			font-size: 14px;
			color: #d377f4;
			font-weight: bold;
			margin: 0 0 8px 0;
		}
		.data-value {
			font-size: 16px;
			color: #e3edf6;
			margin: 0 0 16px 0;
			line-height: 1.5;
		}
		.data-value:last-child {
			margin-bottom: 0;
		}
		.cta-section {
			text-align: center;
			padding: 30px 20px;
		}
		.telegram-button {
			display: inline-block;
			background-color: rgba(171, 91, 199, 0.3);
			border: 2px solid rgba(211, 119, 244, 0.6);
			border-radius: 8px;
			padding: 15px 40px;
			text-decoration: none;
			color: #d377f4;
			font-size: 18px;
			font-weight: 600;
		}
		.telegram-icon {
			width: 32px;
			height: 32px;
			margin: 0 auto 10px;
		}
		.footer {
			text-align: center;
			padding: 30px 20px;
			border-top: 1px solid rgba(211, 119, 244, 0.2);
		}
		.footer-text {
			font-size: 14px;
			color: rgba(227, 237, 246, 0.6);
			margin: 0;
			font-style: italic;
		}
	</style>
</head>
<body style="margin: 0; padding: 0; background-color: #030A0F;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #030A0F;">
		<tr>
			<td align="center" style="padding: 20px 0;">
				<table class="email-container" role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #030A0F;">
					
					<!-- Header con Logo -->
					<tr>
						<td class="header-logo" style="text-align: center; padding: 40px 20px 20px;">
							<a href="https://bogota.ninja" style="text-decoration: none; display: inline-block;">
							<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display: inline-table; border-collapse: collapse;">
								<tr>
									<td style="vertical-align: bottom; padding: 0; line-height: 1;">
										<span style="font-family: 'Joti One', Georgia, serif; font-size: 56px; color: #e3edf6; font-weight: 300; text-shadow: 0 0 10px rgba(227, 237, 246, 0.3); display: block;">
											Bogot
										</span>
									</td>
									<td style="vertical-align: bottom; padding: 0 0 0 4px; line-height: 0.85;">
										<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
											<tr>
												<td style="font-family: 'Joti One', Georgia, serif; font-size: 56px; color: #d377f4; text-shadow: 0 0 10px rgba(211, 119, 244, 0.5); padding: 0; line-height: 0.85; text-align: center;">
													忍
												</td>
											</tr>
											<tr>
												<td style="font-family: 'Joti One', Georgia, serif; font-size: 56px; color: #d377f4; text-shadow: 0 0 10px rgba(211, 119, 244, 0.5); padding: 0; line-height: 0.85; text-align: center;">
													び
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							</a>
						</td>
					</tr>
					
					<!-- Contenido Principal -->
					<tr>
						<td class="content-wrapper" style="padding: 20px 30px;">
					<h1 class="greeting" style="font-family: Georgia, serif; font-size: 20px; color: #d377f4; margin: 0 0 20px 0; text-align: center; font-style: italic;">
							</h1>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0; text-align: center;">
								Tus nuevos datos han sido guardados correctamente. Aquí está tu registro actualizado:
							</p>
							
							<!-- Datos actualizados -->
							<div class="data-box" style="background-color: rgba(171, 91, 199, 0.1); border: 1px solid rgba(211, 119, 244, 0.3); border-radius: 8px; padding: 20px; margin: 20px 0;">
								<p class="data-label" style="font-size: 14px; color: #d377f4; font-weight: bold; margin: 0 0 8px 0;">
									Nombre / Apodo
								</p>
								<p class="data-value" style="font-size: 16px; color: #e3edf6; margin: 0 0 16px 0; line-height: 1.5;">
									${data.name}
								</p>
								
								<p class="data-label" style="font-size: 14px; color: #d377f4; font-weight: bold; margin: 0 0 8px 0;">
									Qué quieres mejorar
								</p>
								<p class="data-value" style="font-size: 16px; color: #e3edf6; margin: 0 0 16px 0; line-height: 1.5;">
									${data.improve}
								</p>
								
								${data.experience ? `
								<p class="data-label" style="font-size: 14px; color: #d377f4; font-weight: bold; margin: 0 0 8px 0;">
									Experiencia previa
								</p>
								<p class="data-value" style="font-size: 16px; color: #e3edf6; margin: 0 0 16px 0; line-height: 1.5;">
									${data.experience}
								</p>
								` : ''}
								
								<p class="data-label" style="font-size: 14px; color: #d377f4; font-weight: bold; margin: 0 0 8px 0;">
									Lugar que te queda más cómodo
								</p>
								<p class="data-value" style="font-size: 16px; color: #e3edf6; margin: 0; line-height: 1.5;">
									${locationNames[data.location] || data.location}
								</p>
							</div>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0;">
								Con esta actualización, <span class="highlight" style="color: #d377f4; font-weight: bold;">te enviaré información de las siguientes sesiones de entrenamiento</span> teniendo en cuenta tu nueva información. Las próximas sesiones se diseñarán específicamente para lo que quieres mejorar.
							</p>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0;">
								Recuerda que puedes contactarme por Telegram para cualquier consulta o si deseas programar una sesión privada.
							</p>
						</td>
					</tr>
					
					<!-- CTA Telegram -->
					<tr>
						<td class="cta-section" style="text-align: center; padding: 30px 20px;">
							<a href="https://t.me/azanorivers" class="telegram-button" style="display: inline-block; background-color: rgba(171, 91, 199, 0.3); border: 2px solid rgba(211, 119, 244, 0.6); border-radius: 8px; padding: 15px 40px; text-decoration: none; color: #d377f4; font-size: 18px; font-weight: 600;">
								<svg class="telegram-icon" width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 32px; height: 32px; margin: 0 auto 10px; display: block;">
									<path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" fill="#d377f4"/>
								</svg>
								<span style="display: block;">Escríbeme a Telegram</span>
							</a>
						</td>
					</tr>
					
					<!-- Footer -->
					<tr>
						<td class="footer" style="text-align: center; padding: 30px 20px; border-top: 1px solid rgba(211, 119, 244, 0.2);">
							<p class="footer-text" style="font-size: 14px; color: rgba(227, 237, 246, 0.6); margin: 0 0 8px 0; font-style: italic;">
								Bogotá, fría, distópica, pero amada Bogotá
							</p>
							<p style="font-size: 12px; color: rgba(227, 237, 246, 0.5); margin: 0 0 12px 0;">
								No contestar este correo
							</p>
							<p class="footer-text" style="font-size: 14px; color: rgba(227, 237, 246, 0.6); margin: 0 0 16px 0;">
								<a href="https://bogota.ninja" style="color: #d377f4; font-weight: bold; text-decoration: none;">Bogota.ninja</a> · <a href="https://azanorivers.com" style="color: #d377f4; font-weight: bold; text-decoration: none;">AzanoRivers</a>
							</p>
							<p style="font-size: 12px; color: rgba(227, 237, 246, 0.4); margin: 0;">
							<a href="${unsubscribeUrl}" style="color: rgba(227, 237, 246, 0.4); text-decoration: underline;">Si quieres dejar de recibir correos de las sesiones próximas, haz clic aquí</a>
						</td>
					</tr>
					
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`;
}
