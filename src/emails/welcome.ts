/**
 * Welcome Email Template - Email de bienvenida para nuevos usuarios
 *
 * @description
 * Genera el HTML del email de bienvenida compatible con clientes de correo.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import { generateUnsubscribeUrl } from '../lib/unsubscribe';

interface WelcomeEmailData {
	email: string;
}

export function generateWelcomeEmail(data: WelcomeEmailData): string {
	const unsubscribeUrl = generateUnsubscribeUrl(data.email);

	return `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bogoninja · Bienvenida</title>
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
											<span style="font-family:Georgia, serif; font-size:46px; color:#e3edf6; font-weight:300; text-shadow:0 0 14px rgba(227,237,246,0.25); display:block; letter-spacing:2px;">Bogot</span>
										</td>
										<td style="vertical-align:bottom; padding:0 0 0 4px; line-height:0.85;">
											<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
												<tr><td style="font-family:Georgia, serif; font-size:46px; color:#d377f4; text-shadow:0 0 14px rgba(211,119,244,0.6); padding:0; line-height:0.85; text-align:center;">忍</td></tr>
												<tr><td style="font-family:Georgia, serif; font-size:46px; color:#d377f4; text-shadow:0 0 14px rgba(211,119,244,0.6); padding:0; line-height:0.85; text-align:center;">び</td></tr>
											</table>
										</td>
									</tr>
								</table>
							</a>
							<p style="margin:10px 0 0; font-size:12px; color:rgba(211,119,244,0.6); letter-spacing:3px; text-transform:uppercase;">Ninja Moderno</p>
						</td>
					</tr>

					<!-- ══ DIVIDER ══ -->
					<tr><td style="padding:0 24px;"><div style="height:1px; background:linear-gradient(90deg, transparent, rgba(211,119,244,0.5), transparent);"></div></td></tr>

					<!-- ══ SALUDO ══ -->
					<tr>
						<td style="padding:32px 32px 8px;">
							<p style="margin:0; font-size:20px; color:#d377f4; font-weight:700; font-style:italic; line-height:1.4;">
								Hola, soy Azano. Es un honor compartir mi conocimiento contigo.
							</p>
						</td>
					</tr>

					<!-- ══ PÁRRAFO 1 ══ -->
					<tr>
						<td style="padding:8px 32px;">
							<p style="margin:0; font-size:15px; line-height:1.75; color:#e3edf6;">
								Con este registro te enviaré información de la siguiente sesión de entrenamiento.
							</p>
						</td>
					</tr>

					<!-- ══ PÁRRAFO 2 ══ -->
					<tr>
						<td style="padding:8px 32px;">
							<p style="margin:0; font-size:15px; line-height:1.75; color:#e3edf6;">
								Como entrenamiento nómada, es posible que algunas sesiones te queden lejos, pero
								<strong style="color:#d377f4;">¡ESO ES LO EMOCIONANTE!</strong>
								Si queremos prepararnos para diferentes situaciones, necesitamos experimentar lugares distintos.
							</p>
						</td>
					</tr>

					<!-- ══ PÁRRAFO 3 ══ -->
					<tr>
						<td style="padding:8px 32px;">
							<p style="margin:0; font-size:15px; line-height:1.75; color:#e3edf6;">
								Cada sesión estará pensada en tu información del formulario, específicamente en
								<strong style="color:#d377f4;">"Qué quieres mejorar"</strong>.
								Puedes actualizar tus datos enviándolo nuevamente.
							</p>
						</td>
					</tr>

					<!-- ══ TARJETA: CONFIRMACIÓN ══ -->
					<tr>
						<td style="padding:16px 32px;">
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
								style="background:rgba(171,91,199,0.1); border:1px solid rgba(211,119,244,0.28); border-radius:10px;">
								<tr>
									<td style="padding:18px 22px;">
										<p style="margin:0 0 6px; font-size:11px; color:rgba(211,119,244,0.7); letter-spacing:3px; text-transform:uppercase;">Cómo confirmar</p>
										<p style="margin:0; font-size:15px; line-height:1.7; color:#e3edf6;">
											Escríbeme a mi <strong style="color:#d377f4;">Telegram</strong> confirmando tu asistencia para el fin de semana
											<strong style="color:#d377f4;">(mínimo 1 día antes)</strong>. Cada sesión puede ser personal o grupal.
										</p>
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<!-- ══ PÁRRAFO DURACIÓN ══ -->
					<tr>
						<td style="padding:8px 32px;">
							<p style="margin:0; font-size:15px; line-height:1.75; color:#e3edf6;">
								Las sesiones tienen una duración de <strong style="color:#d377f4;">2 a 3 horas</strong>. Los fines de semana
								tú pones el precio. Para mí lo más importante es darte valor real.
							</p>
						</td>
					</tr>

					<!-- ══ PÁRRAFO SESIÓN PRIVADA ══ -->
					<tr>
						<td style="padding:8px 32px;">
							<p style="margin:0; font-size:15px; line-height:1.75; color:#e3edf6;">
								Si deseas una sesión privada escríbeme, valor fijo de
								<strong style="color:#d377f4;">30mil</strong>. Según lo que quieras lograr podemos llegar a un acuerdo.
							</p>
						</td>
					</tr>

					<!-- ══ PÁRRAFO MARCA ══ -->
					<tr>
						<td style="padding:8px 32px 24px;">
							<p style="margin:0; font-size:15px; line-height:1.75; color:#e3edf6;">
								Recuerda que esto es una iniciativa para desarrollar mi marca
								<strong style="color:#d377f4;">AzanoRivers</strong>,
								impactando la sociedad con un estilo de vida moderno e inteligente. ¡Sé un Ninja Moderno!
							</p>
						</td>
					</tr>

					<!-- ══ DIVIDER ══ -->
					<tr><td style="padding:0 32px;"><div style="height:1px; background:linear-gradient(90deg, transparent, rgba(211,119,244,0.5), transparent);"></div></td></tr>

					<!-- ══ BOTÓN TELEGRAM ══ -->
					<tr>
						<td style="padding:28px 32px 32px; text-align:center;">
							<a href="https://t.me/azanorivers"
								style="display:inline-block; background:rgba(171,91,199,0.25); border:2px solid rgba(211,119,244,0.6); border-radius:8px; padding:14px 40px; text-decoration:none; color:#d377f4; font-size:16px; font-weight:700; letter-spacing:0.5px;">
								<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; margin:0 auto;">
									<tr>
										<td style="vertical-align:middle; padding-right:10px;">
											<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" fill="#d377f4"/>
											</svg>
										</td>
										<td style="vertical-align:middle; color:#d377f4; font-size:16px; font-weight:700;">Escríbeme a Telegram</td>
									</tr>
								</table>
							</a>
						</td>
					</tr>

					<!-- ══ FOOTER ══ -->
					<tr>
						<td style="text-align:center; padding:20px 24px 28px; border-top:1px solid rgba(211,119,244,0.15);">
							<p style="margin:0 0 6px; font-size:13px; color:rgba(227,237,246,0.5); font-style:italic;">Bogotá, fría, distópica, pero amada Bogotá</p>
							<p style="margin:0 0 10px; font-size:12px; color:rgba(227,237,246,0.35);">No contestar este correo</p>
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
