/**
 * Dashboard Component - Panel principal del admin Bogoninja
 *
 * @description
 * Shell del panel admin. Muestra:
 * - Header con logo, correo y logout
 * - Tarjeta de estadísticas (total ninjas)
 * - Lista de ninjas registrados
 * - Formulario de nueva sesión (envío masivo)
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import { useState } from 'react';
import NinjasList from './NinjasList';
import SessionEmailForm from './SessionEmailForm';

type Tab = 'ninjas' | 'sesion';

interface Ninja {
	id: number;
	email: string;
	name: string;
	improve: string;
	experience: string | null;
	location: string;
	created_at: string;
}

interface DashboardProps {
	ninjas: Ninja[];
	adminEmail: string;
}

function handleLogout() {
	window.location.href = '/api/auth/logout';
}

export default function Dashboard({ ninjas, adminEmail }: DashboardProps) {
	const [activeTab, setActiveTab] = useState<Tab>('ninjas');

	const tabBase = 'flex-1 py-2 text-xs uppercase tracking-[2px] font-semibold transition-all duration-200 border-b-2';
	const tabActive = 'text-ninja-light-pink border-ninja-light-pink';
	const tabInactive = 'text-ninja-white/40 border-transparent hover:text-ninja-white/70';

	return (
		<div className="min-h-dvh w-full bg-ninja-dark-blue font-lato">

			{/* ── Header ── */}
			<header className="border-b border-ninja-light-pink/15 px-4 py-4 xl:px-8"
				style={{ background: 'rgba(171,91,199,0.05)' }}>
		<div className="max-w-240 mx-auto flex items-center justify-between gap-4">

					{/* Logo */}
					<a href="/" className="no-underline shrink-0">
						<span className="font-joti text-2xl xl:text-3xl text-ninja-white"
							style={{ textShadow: '0 0 10px rgba(227,237,246,0.2)' }}>
							Bogot
						</span>
						<span className="font-joti text-2xl xl:text-3xl text-ninja-light-pink"
							style={{ textShadow: '0 0 10px rgba(211,119,244,0.5)' }}>
							忍び
						</span>
					</a>

					{/* Admin info + logout */}
					<div className="flex items-center gap-3">
						<span className="text-ninja-white/40 text-xs hidden md:block truncate max-w-45">
							{adminEmail}
						</span>
						<button
							onClick={handleLogout}
							className="border border-ninja-light-pink/40 rounded-lg px-3 py-1.5 text-ninja-light-pink/80 text-xs hover:text-ninja-light-pink hover:border-ninja-light-pink/70 transition-colors duration-200">
							Salir
						</button>
					</div>
				</div>
			</header>

			{/* ── Main ── */}
			<main className="max-w-240 mx-auto px-4 xl:px-8 py-6">

				{/* Stat card */}
				<div className="mb-6 border border-ninja-light-pink/20 rounded-xl p-5 xl:p-6 flex items-center gap-5"
					style={{ background: 'linear-gradient(130deg, rgba(171,91,199,0.1) 0%, rgba(3,10,15,0) 70%)' }}>
					<div>
						<p className="text-xs uppercase tracking-[3px] text-ninja-light-pink/60 mb-1">
							Total Ninjas
						</p>
						<p className="text-4xl xl:text-5xl font-bold text-ninja-white tracking-tight">
							{ninjas.length}
						</p>
					</div>
					<div className="ml-auto">
						<span className="font-joti text-5xl xl:text-6xl text-ninja-light-pink/20">
							忍
						</span>
					</div>
				</div>

				{/* Tabs */}
				<div className="flex border-b border-ninja-light-pink/15 mb-6">
					<button
						onClick={() => setActiveTab('ninjas')}
						className={`${tabBase} ${activeTab === 'ninjas' ? tabActive : tabInactive}`}>
						Ninjas registrados
					</button>
					<button
						onClick={() => setActiveTab('sesion')}
						className={`${tabBase} ${activeTab === 'sesion' ? tabActive : tabInactive}`}>
						Nueva sesión
					</button>
				</div>

				{/* Contenido del tab */}
				{activeTab === 'ninjas' && (
					<NinjasList ninjas={ninjas} />
				)}

				{activeTab === 'sesion' && (
					<div className="max-w-120">
						<p className="text-ninja-white/50 text-sm mb-5 leading-relaxed">
							Completa los datos de la próxima sesión. Se enviará el correo personalizado a los{' '}
							<strong className="text-ninja-white">{ninjas.length} ninjas</strong> registrados.
						</p>
						<SessionEmailForm />
					</div>
				)}

			</main>

		</div>
	);
}
