/**
 * SessionEmailForm Component - Formulario de nueva sesión de entrenamiento
 *
 * @description
 * Permite configurar los datos de la próxima sesión y dispara el envío masivo
 * a todos los ninjas registrados vía POST /api/admin/session-email.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import { useState } from 'react';
import toast from 'react-hot-toast';

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function previewFecha(ddmm: string): string {
	const [dia, mesNum] = ddmm.split('-');
	if (!dia || !mesNum) return ddmm;
	const mes = MESES[parseInt(mesNum, 10) - 1] ?? '';
	return `${dia} de ${mes}`;
}

function previewHora(hhmm: string): string {
	if (!hhmm) return '';
	const [hStr] = hhmm.split(':');
	const h = parseInt(hStr, 10);
	return `${hhmm} ${h < 12 ? 'am' : 'pm'}`;
}

export default function SessionEmailForm() {
	const [fecha, setFecha] = useState('');
	const [hora, setHora] = useState('');
	const [location, setLocation] = useState('');
	const [mapsLink, setMapsLink] = useState('');
	const [parkingBikesLink, setParkingBikesLink] = useState('');
	const [parkingMotosLink, setParkingMotosLink] = useState('');
	const [sendMode, setSendMode] = useState<'all' | 'one'>('all');
	const [targetEmail, setTargetEmail] = useState('');

	const [loading, setLoading] = useState(false);
	const [confirmStep, setConfirmStep] = useState(false);

	const hasPreview = fecha && hora;

	async function handleSend() {
		setLoading(true);

		try {
			const res = await fetch('/api/admin/session-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fecha,
					hora,
					location,
					mapsLink,
					parkingBikesLink: parkingBikesLink || undefined,
					parkingMotosLink: parkingMotosLink || undefined,
					targetEmail: sendMode === 'one' ? targetEmail : undefined,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.error ?? 'Error enviando correos');
			} else {
				toast.success(`✓ ${data.sent} de ${data.total} correo${data.total !== 1 ? 's' : ''} enviado${data.total !== 1 ? 's' : ''}`);
				setConfirmStep(false);
				setFecha('');
				setHora('');
				setLocation('');
				setMapsLink('');
				setParkingBikesLink('');
				setParkingMotosLink('');
				setTargetEmail('');
			}
		} catch {
			toast.error('No se pudo conectar al servidor');
		} finally {
			setLoading(false);
		}
	}

	const inputClass = 'w-full bg-transparent border-b border-ninja-light-pink/60 text-ninja-white text-sm font-light px-2 py-2 outline-none focus:border-ninja-light-pink transition-colors duration-300 placeholder:text-ninja-white/30';
	const labelClass = 'block text-ninja-white/70 text-xs uppercase tracking-[2px] mb-2';

	const isSendReady = fecha && hora && location && mapsLink && (sendMode === 'all' || (sendMode === 'one' && targetEmail));

	return (
		<div>
			<div className="flex flex-col gap-5">

				{/* Toggle Todos / Uno */}
				<div>
					<label className={labelClass}>Destinatarios</label>
					<div className="flex gap-2 mt-1">
						<button
							type="button"
							onClick={() => { setSendMode('all'); setConfirmStep(false); }}
							className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-[1px] border-2 transition-all duration-200 ${
								sendMode === 'all'
									? 'border-ninja-light-pink text-ninja-light-pink'
									: 'border-ninja-white/20 text-ninja-white/40 hover:border-ninja-white/40 hover:text-ninja-white/60'
							}`}
							style={sendMode === 'all' ? { background: 'rgba(171,91,199,0.15)' } : { background: 'transparent' }}>
							Todos los ninjas
						</button>
						<button
							type="button"
							onClick={() => { setSendMode('one'); setConfirmStep(false); }}
							className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-[1px] border-2 transition-all duration-200 ${
								sendMode === 'one'
									? 'border-ninja-light-pink text-ninja-light-pink'
									: 'border-ninja-white/20 text-ninja-white/40 hover:border-ninja-white/40 hover:text-ninja-white/60'
							}`}
							style={sendMode === 'one' ? { background: 'rgba(171,91,199,0.15)' } : { background: 'transparent' }}>
							Uno solo
						</button>
					</div>
				</div>

				{/* Email individual */}
				{sendMode === 'one' && (
					<div>
						<label className={labelClass}>Correo del ninja</label>
						<input
							type="email"
							value={targetEmail}
							onChange={e => setTargetEmail(e.target.value)}
							placeholder="ninja@correo.com"
							className={inputClass}
						/>
					</div>
				)}

				{/* Fecha DD-MM */}
				<div>
					<label className={labelClass}>Fecha <span className="normal-case tracking-normal text-ninja-white/40">(DD-MM)</span></label>
					<input
						type="text"
						value={fecha}
						onChange={e => setFecha(e.target.value)}
						placeholder="01-03"
						maxLength={5}
						className={inputClass}
					/>
				</div>

				{/* Hora HH:MM */}
				<div>
					<label className={labelClass}>Hora <span className="normal-case tracking-normal text-ninja-white/40">(HH:MM)</span></label>
					<input
						type="text"
						value={hora}
						onChange={e => setHora(e.target.value)}
						placeholder="07:00"
						maxLength={5}
						className={inputClass}
					/>
				</div>

				{/* Lugar */}
				<div>
					<label className={labelClass}>Lugar</label>
					<input
						type="text"
						value={location}
						onChange={e => setLocation(e.target.value)}
						placeholder="Parque El Virrey (Calle 87 con Cra 15)"
						className={inputClass}
					/>
				</div>

				{/* Maps Link */}
				<div>
					<label className={labelClass}>Link Google Maps</label>
					<input
						type="url"
						value={mapsLink}
						onChange={e => setMapsLink(e.target.value)}
						placeholder="https://maps.google.com/?q=..."
						className={inputClass}
					/>
				</div>

				{/* Parqueo Bicicletas */}
				<div>
					<label className={labelClass}>🚲 Parqueo Bicicletas <span className="normal-case tracking-normal text-ninja-white/40">(opcional)</span></label>
					<input
						type="url"
						value={parkingBikesLink}
						onChange={e => setParkingBikesLink(e.target.value)}
						placeholder="https://maps.google.com/?q=..."
						className={inputClass}
					/>
				</div>

				{/* Parqueo Motos */}
				<div>
					<label className={labelClass}>🏍️ Parqueo Motos <span className="normal-case tracking-normal text-ninja-white/40">(opcional)</span></label>
					<input
						type="url"
						value={parkingMotosLink}
						onChange={e => setParkingMotosLink(e.target.value)}
						placeholder="https://maps.google.com/?q=..."
						className={inputClass}
					/>
				</div>

				{/* Preview */}
				{hasPreview && (
					<div className="rounded-lg border border-ninja-light-pink/25 p-4"
						style={{ background: 'rgba(171,91,199,0.08)' }}>
						<p className="text-xs uppercase tracking-[2px] text-ninja-light-pink/60 mb-2">
							Vista previa de la tarjeta
						</p>
						<p className="text-ninja-white font-bold text-xl tracking-wide">
							{previewFecha(fecha)}
							<span className="text-ninja-white/30 mx-2 font-light">·</span>
							{previewHora(hora)}
						</p>
						{location && (
							<p className="text-ninja-white/60 text-sm mt-1">📍 {location}</p>
						)}
					</div>
				)}

				{/* Confirmar / Enviar */}
				{!confirmStep ? (
					<button
						type="button"
						onClick={() => sendMode === 'one' ? handleSend() : setConfirmStep(true)}
						disabled={!isSendReady || loading}
						className="w-full border-2 border-ninja-light-pink/60 rounded-lg py-3 text-ninja-light-pink font-semibold text-sm tracking-[1px] uppercase transition-all duration-300 hover:bg-ninja-dark-pink/20 hover:border-ninja-light-pink disabled:opacity-30 disabled:cursor-not-allowed"
						style={{ background: 'rgba(171,91,199,0.15)' }}>
						{loading ? 'Enviando...' : sendMode === 'one' ? 'Enviar correo' : 'Preparar envío masivo'}
					</button>
				) : (
					<div className="flex flex-col gap-3">
						<div className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-center">
							<p className="text-red-300 text-sm font-semibold mb-1">⚠️ Confirmar envío masivo</p>
							<p className="text-ninja-white/60 text-xs">
								Se enviará el correo de sesión a <strong className="text-ninja-white">todos los ninjas</strong> registrados. Esta acción no se puede deshacer.
							</p>
						</div>
						<div className="flex gap-3">
							<button
								type="button"
								onClick={() => setConfirmStep(false)}
								disabled={loading}
								className="flex-1 border border-ninja-white/20 rounded-lg py-3 text-ninja-white/50 text-sm hover:text-ninja-white/80 hover:border-ninja-white/40 transition-colors duration-200 disabled:opacity-40">
								Cancelar
							</button>
							<button
								type="button"
								onClick={handleSend}
								disabled={loading}
								className="flex-1 border-2 border-ninja-light-pink/70 rounded-lg py-3 text-ninja-light-pink font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:bg-ninja-dark-pink/30 disabled:opacity-40 disabled:cursor-not-allowed"
								style={{ background: 'rgba(171,91,199,0.2)' }}>
								{loading ? 'Enviando...' : 'Confirmar envío'}
							</button>
						</div>
					</div>
				)}

			</div>
		</div>
	);
}
