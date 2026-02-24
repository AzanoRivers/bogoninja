/**
 * Sesión Email Template - Convocatoria de próxima sesión de entrenamiento
 *
 * @description
 * Genera el HTML del email de convocatoria con los datos de la sesión.
 * Compatible con clientes de correo Gmail / Outlook.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import { generateUnsubscribeUrl } from '../lib/unsubscribe';

interface SesionEmailData {
	/** Apodo / nombre del destinatario */
	apodo: string;
	/**
	 * Fecha de la sesión en formato DD-MM (ej. '01-03').
	 * Se convierte internamente a '01 de Marzo'.
	 */
	fecha: string;
	/**
	 * Hora de la sesión en formato HH:MM 24h (ej. '07:00').
	 * Se convierte internamente a '07:00 am' / '02:30 pm'.
	 */
	hora: string;
	/** Nombre del lugar de encuentro */
	location: string;
	/** URL del link de Google Maps */
	mapsLink: string;
	/** Email del destinatario — se usa para generar el link de desuscripción */
	email: string;
	/**
	 * URL base para las imágenes. En producción/correos debe ser 'https://bogota.ninja'.
	 * En la preview local se pasa Astro.url.origin para que las imágenes carguen desde el servidor local.
	 * @default 'https://bogota.ninja'
	 */
	baseUrl?: string;
}

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function formatFecha(fechaDDMM: string): string {
	const [dia, mesNum] = fechaDDMM.split('-');
	const mes = MESES[parseInt(mesNum, 10) - 1] ?? '';
	return `${dia} de ${mes}`;
}

function formatHora(horaHHMM: string): string {
	const [hStr, mStr] = horaHHMM.split(':');
	const h = parseInt(hStr, 10);
	const suffix = h < 12 ? 'am' : 'pm';
	return `${horaHHMM} ${suffix}`;
}

export function generateSesionEmail(data: SesionEmailData): string {
	const { apodo, fecha, hora, location, mapsLink, email, baseUrl = 'https://bogota.ninja' } = data;
	const unsubscribeUrl = generateUnsubscribeUrl(email);
	const fechaLarga = formatFecha(fecha);
	const horaFormateada = formatHora(hora);

	return `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bogoninja · Sesión</title>
</head>
<body style="margin:0; padding:0; background-color:#030A0F; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">

	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#030A0F;">
		<tr>
			<td align="center" style="padding:24px 16px;">

				<!-- Contenedor principal -->
				<table role="presentation" width="560" cellpadding="0" cellspacing="0"
					style="max-width:560px; width:100%; background-color:#030A0F; border:1px solid rgba(211,119,244,0.18); border-radius:12px; overflow:hidden;">

					<!-- ══ HEADER ══ -->
					<tr>
						<td style="text-align:center; padding:36px 24px 20px; background: linear-gradient(160deg, rgba(171,91,199,0.12) 0%, rgba(3,10,15,0) 70%);">
							<a href="https://bogota.ninja" style="text-decoration:none; display:inline-block;">
								<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table; border-collapse:collapse; margin:0 auto;">
									<tr>
										<td style="vertical-align:bottom; padding:0; line-height:1;">
											<span style="font-family:Georgia, serif; font-size:46px; color:#e3edf6; font-weight:300; text-shadow:0 0 14px rgba(227,237,246,0.25); display:block; letter-spacing:2px;">
												Bogot
											</span>
										</td>
										<td style="vertical-align:bottom; padding:0 0 0 4px; line-height:0.85;">
											<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
												<tr>
													<td style="font-family:Georgia, serif; font-size:46px; color:#d377f4; text-shadow:0 0 14px rgba(211,119,244,0.6); padding:0; line-height:0.85; text-align:center;">
														忍
													</td>
												</tr>
												<tr>
													<td style="font-family:Georgia, serif; font-size:46px; color:#d377f4; text-shadow:0 0 14px rgba(211,119,244,0.6); padding:0; line-height:0.85; text-align:center;">
														び
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</a>
							<p style="margin:10px 0 0; font-size:12px; color:rgba(211,119,244,0.6); letter-spacing:3px; text-transform:uppercase;">
								Sesión de Entrenamiento
							</p>
						</td>
					</tr>

					<!-- ══ DIVIDER ══ -->
					<tr>
						<td style="padding:0 24px;">
							<div style="height:1px; background:linear-gradient(90deg, transparent, rgba(211,119,244,0.5), transparent);"></div>
						</td>
					</tr>

					<!-- ══ SALUDO ══ -->
					<tr>
						<td style="padding:32px 32px 8px;">
							<p style="margin:0; font-size:30px; color:#d377f4; font-weight:700; letter-spacing:1px; line-height:1.2;">
								Hola ${apodo}!!!
							</p>
						</td>
					</tr>

					<!-- ══ TARJETA DE SESIÓN ══ -->
					<tr>
						<td style="padding:16px 32px;">
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
								style="background:rgba(171,91,199,0.12); border:1px solid rgba(211,119,244,0.3); border-radius:10px; overflow:hidden;">
								<tr>
									<td style="padding:20px 24px;">
										<p style="margin:0 0 6px; font-size:11px; color:rgba(211,119,244,0.7); letter-spacing:3px; text-transform:uppercase;">
											Próxima sesión
										</p>
										<p style="margin:0; font-size:28px; color:#e3edf6; font-weight:700; letter-spacing:1px;">
											${fechaLarga} &nbsp;<span style="color:rgba(227,237,246,0.4); font-weight:300;">·</span>&nbsp; ${horaFormateada}
										</p>
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<!-- ══ PRIMER SESIÓN ══ -->
					<tr>
						<td style="padding:8px 32px 4px;">
							<p style="margin:0; font-size:15px; line-height:1.7; color:#e3edf6;">
								Recuerda que si es tu
								<strong style="color:#d377f4;">primera sesión</strong>
								puedes asistir sin costo.
							</p>
						</td>
					</tr>

					<!-- ══ TELEGRAM CTA (texto) ══ -->
					<tr>
						<td style="padding:8px 32px 16px;">
							<p style="margin:0; font-size:15px; line-height:1.7; color:#e3edf6;">
								Escribe a mi <strong style="color:#d377f4;">Telegram</strong> para confirmar tu asistencia.
							</p>
						</td>
					</tr>

					<!-- ══ DIVIDER ══ -->
					<tr>
						<td style="padding:0 32px;">
							<div style="height:1px; background:linear-gradient(90deg, rgba(211,119,244,0.3), transparent);"></div>
						</td>
					</tr>

					<!-- ══ UBICACIÓN ══ -->
					<tr>
						<td style="padding:20px 32px 8px;">
							<p style="margin:0 0 4px; font-size:11px; color:rgba(211,119,244,0.7); letter-spacing:3px; text-transform:uppercase;">
								Nos vemos en
							</p>
							<p style="margin:0; font-size:18px; color:#e3edf6; font-weight:600;">
								${location}
							</p>
						</td>
					</tr>
					<tr>
						<td style="padding:8px 32px 24px;">
							<a href="${mapsLink}"
								style="display:inline-block; background:rgba(37,123,184,0.15); border:1px solid rgba(37,123,184,0.4); border-radius:6px; padding:9px 18px; text-decoration:none; color:#7ec8f5; font-size:13px; font-weight:600; letter-spacing:0.5px;">
								📍 Abrir en Google Maps
							</a>
						</td>
					</tr>

					<!-- ══ DIVIDER ══ -->
					<tr>
						<td style="padding:0 32px;">
							<div style="height:1px; background:linear-gradient(90deg, transparent, rgba(211,119,244,0.5), transparent);"></div>
						</td>
					</tr>

					<!-- ══ PAGO ══ -->
					<tr>
						<td style="padding:24px 32px 8px;">
							<p style="margin:0 0 12px; font-size:15px; line-height:1.7; color:#e3edf6;">
								Para confirmar tu asistencia recuerda enviar la confirmación del pago a mi
								<strong style="color:#d377f4;">Telegram</strong>.
								Puedes enviarme lo que consideres adecuado.
							</p>
						</td>
					</tr>

					<!-- ══ IMAGEN NEQUI ══ -->
					<tr>
						<td style="padding:4px 32px 8px; text-align:center;">
							<p style="margin:0 0 10px; font-size:11px; color:rgba(211,119,244,0.7); letter-spacing:3px; text-transform:uppercase;">
								Pago con Nequi
							</p>
							<img src="${baseUrl}/images/nequillaveazano.png"
								alt="QR Nequi AzanoRivers"
								width="200" height="200"
								style="display:block; margin:0 auto; width:200px; height:200px; object-fit:contain; border-radius:10px; border:1px solid rgba(211,119,244,0.25);" />
						</td>
					</tr>

					<!-- ══ BOTÓN DÉBITO/CRÉDITO ══ -->
					<tr>
						<td style="padding:16px 32px 8px; text-align:center;">
							<a href="https://www.azanorivers.com/pay"
								style="display:inline-block; background:rgba(171,91,199,0.2); border:1px solid rgba(211,119,244,0.45); border-radius:8px; padding:12px 32px; text-decoration:none; color:#d377f4; font-size:14px; font-weight:700; letter-spacing:0.5px;">
								💳 Pago con Débito / Crédito
							</a>
						</td>
					</tr>

					<!-- ══ TELEGRAM BOTÓN ══ -->
					<tr>
						<td style="padding:12px 32px 32px; text-align:center;">
							<a href="https://t.me/azanorivers"
								style="display:inline-block; background:rgba(171,91,199,0.25); border:2px solid rgba(211,119,244,0.6); border-radius:8px; padding:14px 40px; text-decoration:none; color:#d377f4; font-size:16px; font-weight:700; letter-spacing:0.5px;">
								<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; margin:0 auto;">
									<tr>
										<td style="vertical-align:middle; padding-right:10px;">
											<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" fill="#d377f4"/>
											</svg>
										</td>
										<td style="vertical-align:middle; color:#d377f4; font-size:16px; font-weight:700;">
											Escríbeme a Telegram
										</td>
									</tr>
								</table>
							</a>
						</td>
					</tr>

					<!-- ══ CIERRE ══ -->
					<tr>
						<td style="padding:0 32px 8px;">
							<div style="height:1px; background:linear-gradient(90deg, transparent, rgba(211,119,244,0.5), transparent);"></div>
						</td>
					</tr>
					<tr>
						<td style="padding:24px 32px; text-align:center;">
							<p style="margin:0; font-size:22px; color:#d377f4; font-weight:700; letter-spacing:1px;">
								¡Ya nos vemos!!!
							</p>
						</td>
					</tr>

					<!-- ══ FOOTER ══ -->
					<tr>
						<td style="text-align:center; padding:20px 24px 28px; border-top:1px solid rgba(211,119,244,0.15);">
							<p style="margin:0 0 6px; font-size:13px; color:rgba(227,237,246,0.5); font-style:italic;">
								Bogotá, fría, distópica, pero amada Bogotá
							</p>
							<p style="margin:0 0 10px; font-size:12px; color:rgba(227,237,246,0.35);">
								No contestar este correo
							</p>
							<p style="margin:0 0 12px; font-size:13px;">
								<a href="https://bogota.ninja" style="color:#d377f4; font-weight:700; text-decoration:none;">Bogota.ninja</a>
								<span style="color:rgba(211,119,244,0.4); margin:0 8px;">·</span>
								<a href="https://azanorivers.com" style="color:#d377f4; font-weight:700; text-decoration:none;">AzanoRivers</a>
							</p>
							<p style="margin:0; font-size:12px;">
								<a href="${unsubscribeUrl}" style="color:rgba(227,237,246,0.35); text-decoration:underline;">Dejar de recibir correos de sesiones</a>
							</p>
						</td>
					</tr>

				</table>
				<!-- / Contenedor principal -->

			</td>
		</tr>
	</table>

</body>
</html>`;
}
