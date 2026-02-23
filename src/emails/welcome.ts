/**
 * Welcome Email Template - Email de bienvenida para nuevos usuarios
 * 
 * @description
 * Genera el HTML del email de bienvenida compatible con clientes de correo.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

export function generateWelcomeEmail(): string {
	return `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bogoninja - Confirmación de Registro</title>
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
			font-size: 24px;
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
								<div style="display: inline-flex; align-items: flex-end; gap: 4px;">
									<span style="font-family: 'Joti One', Georgia, serif; font-size: 56px; color: #e3edf6; line-height: 1; font-weight: 300; text-shadow: 0 0 10px rgba(227, 237, 246, 0.3);">
										Bogot
									</span>
									<span style="font-family: 'Joti One', Georgia, serif; font-size: 56px; color: #d377f4; line-height: 1; writing-mode: vertical-rl; text-orientation: upright; text-shadow: 0 0 10px rgba(211, 119, 244, 0.5);">
										忍び
									</span>
								</div>
							</a>
						</td>
					</tr>
					
					<!-- Contenido Principal -->
					<tr>
						<td class="content-wrapper" style="padding: 20px 30px;">
							<h1 class="greeting" style="font-family: Georgia, serif; font-size: 24px; color: #d377f4; margin: 0 0 20px 0; text-align: center; font-style: italic;">
								Hola soy Azano, es un honor compartir mi conocimiento contigo.
							</h1>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0;">
								Con este registro te enviaré información de la siguiente sesión de entrenamiento. Como entrenamiento nómada, es posible que algunas sesiones te queden lejos, pero <span class="highlight" style="color: #d377f4; font-weight: bold;">¡ESO ES LO EMOCIONANTE!</span>. Si queremos prepararnos para diferentes situaciones, necesitamos experimentar lugares distintos.
							</p>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0;">
								Cada sesión estará pensada en tu información del formulario, específicamente en <span class="highlight" style="color: #d377f4; font-weight: bold;">"Qué quieres mejorar"</span>. Puedes actualizar tus datos enviándolo nuevamente.
							</p>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0;">
								Para confirmar una sesión de entrenamiento debes escribirme a mi Telegram confirmando la asistencia del fin de semana <span class="highlight" style="color: #d377f4; font-weight: bold;">(Mínimo 1 día antes)</span>. Cada sesión puede ser personal o grupal.
							</p>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0;">
								Las sesiones tienen una duración de <span class="highlight" style="color: #d377f4; font-weight: bold;">2 horas a 3 horas</span>. Los fines de semana tu pones el precio de cada sesión, pueden ser 5mil pesos, o 50mil pesos, para mi lo más importante es darte algo de valor en esta realidad inclemente en la que día a día se vuelve más difícil vivir.
							</p>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0;">
								Si deseas programar una sesión privada escríbeme, estas sesiones tienen un valor de <span class="highlight" style="color: #d377f4; font-weight: bold;">30mil</span>. Depende de lo que desees lograr y el número de clases podemos llegar a un acuerdo.
							</p>
							
							<p class="paragraph" style="font-size: 16px; line-height: 1.6; color: #e3edf6; margin: 0 0 18px 0;">
								Recuerda que esto es una iniciativa en la cual busco desarrollar mi marca <span class="highlight" style="color: #d377f4; font-weight: bold;">AzanoRivers</span> impactando la sociedad con un estilo de vida moderno e inteligente. ¡Aprovecha los conocimientos que te brindo!
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
								<a href="https://bogota.ninja/unsubscribe" style="color: rgba(227, 237, 246, 0.4); text-decoration: underline;">Si quieres dejar de recibir correos de las sesiones próximas, haz clic aquí</a>
							</p>
						</td>
					</tr>
					
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`;
}
