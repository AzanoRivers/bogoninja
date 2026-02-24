/**
 * LoginForm Component - Formulario de acceso al panel admin
 *
 * @description
 * Formulario mobile-first con correo y contraseña.
 * POST a /api/auth/login → redirige a /dashboard.
 * Sigue el design system de Bogoninja.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SumValidate from '../SumValidate/SumValidate';

interface LoginFormProps {
	/** Mostrar aviso de sesión expirada */
	expired?: boolean;
}

export default function LoginForm({ expired = false }: LoginFormProps) {
	const [correo, setCorreo] = useState('');
	const [password, setPassword] = useState('');
	const [captchaValid, setCaptchaValid] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (expired) toast.error('Sesión expirada. Ingresa de nuevo.');
	}, [expired]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ correo, password }),
			});

			const data = await res.json();

			if (res.ok) {
				toast.success('Bienvenido, Ninja.');
				setTimeout(() => { window.location.href = '/dashboard'; }, 800);
			} else {
				toast.error(data.error ?? 'Error al iniciar sesión');
			}
		} catch {
			toast.error('No se pudo conectar al servidor');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-dvh w-full bg-ninja-dark-blue flex items-center justify-center px-4 py-10 font-lato">
			<div className="w-full max-w-85 lg:max-w-100">

				{/* Logo */}
				<div className="text-center mb-8">
					<a href="/" className="inline-block no-underline">
						<span className="font-joti text-4xl lg:text-5xl text-ninja-white tracking-widest"
							style={{ textShadow: '0 0 14px rgba(227,237,246,0.25)' }}>
							Bogot
						</span>
						<span className="font-joti text-4xl lg:text-5xl text-ninja-light-pink"
							style={{ textShadow: '0 0 14px rgba(211,119,244,0.6)' }}>
							忍び
						</span>
					</a>
					<p className="mt-2 text-xs text-ninja-light-pink/60 tracking-[3px] uppercase">
						Panel Ninja
					</p>
				</div>

				{/* Card */}
				<div className="border border-ninja-light-pink/20 rounded-xl p-6 lg:p-8"
					style={{ background: 'rgba(171,91,199,0.05)' }}>

					<h1 className="text-ninja-white text-lg font-semibold mb-6 text-center tracking-wide">
						Iniciar sesión
					</h1>

					<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

						{/* Correo */}
						<div>
							<label htmlFor="correo"
								className="block text-ninja-white/70 text-xs uppercase tracking-[2px] mb-2">
								Correo
							</label>
							<input
								id="correo"
								type="email"
								autoComplete="email"
								required
								value={correo}
								onChange={e => setCorreo(e.target.value)}
								placeholder="admin@bogota.ninja"
								className="w-full bg-transparent border-b border-ninja-light-pink/60 text-ninja-white text-sm font-light px-2 py-2 outline-none focus:border-ninja-light-pink transition-colors duration-300 placeholder:text-ninja-white/30"
							/>
						</div>

						{/* Contraseña */}
						<div>
							<label htmlFor="password"
								className="block text-ninja-white/70 text-xs uppercase tracking-[2px] mb-2">
								Contraseña
							</label>
							<input
								id="password"
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder="••••••••"
								className="w-full bg-transparent border-b border-ninja-light-pink/60 text-ninja-white text-sm font-light px-2 py-2 outline-none focus:border-ninja-light-pink transition-colors duration-300 placeholder:text-ninja-white/30"
							/>
						</div>

						{/* Captcha */}
						<SumValidate
							onValidChange={setCaptchaValid}
							label="Resuelve la suma para continuar"
						/>

						{/* Submit */}
						<button
							type="submit"
							disabled={!captchaValid || loading}
							className="mt-2 w-full border-2 border-ninja-light-pink/60 rounded-lg py-3 text-ninja-light-pink font-semibold text-sm tracking-[1px] uppercase transition-all duration-300 hover:bg-ninja-dark-pink/20 hover:border-ninja-light-pink disabled:opacity-40 disabled:cursor-not-allowed"
							style={{ background: 'rgba(171,91,199,0.15)' }}>
							{loading ? 'Verificando...' : 'Entrar'}
						</button>

					</form>
				</div>

			</div>
		</div>
	);
}
