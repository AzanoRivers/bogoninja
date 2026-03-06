/**
 * NinjasList Component - Lista de ninjas registrados
 *
 * @description
 * Vista mobile: cards apiladas.
 * Vista desktop (xl): tabla compacta.
 *
 * @author AzanoRivers
 * @ai Claude Sonnet 4.6 (GitHub Copilot)
 */

import { useState } from 'react';
import toast from 'react-hot-toast';

const LOCATION_NAMES: Record<string, string> = {
	'modelia': 'Modelia',
	'parque-nacional': 'Parque Nacional',
	'mosquera': 'Mosquera',
};

function formatDate(dateStr: string): string {
	try {
		return new Date(dateStr).toLocaleDateString('es-CO', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			timeZone: 'America/Bogota',
		});
	} catch {
		return dateStr;
	}
}

interface Ninja {
	id: number;
	email: string;
	name: string;
	improve: string;
	experience: string | null;
	location: string;
	created_at: string;
}

interface NinjasListProps {
	ninjas: Ninja[];
}

export default function NinjasList({ ninjas }: NinjasListProps) {
	const [localNinjas, setLocalNinjas] = useState<Ninja[]>(ninjas);
	const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
	const [deletingId, setDeletingId] = useState<number | null>(null);

	function toggleExpand(id: number) {
		setExpandedIds(prev => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	}

	async function handleDelete(id: number) {
		try {
			const res = await fetch(`/api/admin/ninjas/${id}`, { method: 'DELETE' });
			if (!res.ok) throw new Error();
			setLocalNinjas(prev => prev.filter(n => n.id !== id));
			toast.success('Ninja eliminado');
		} catch {
			toast.error('No se pudo eliminar el ninja');
		} finally {
			setDeletingId(null);
		}
	}

	if (localNinjas.length === 0) {
		return (
			<p className="text-ninja-white/40 text-sm text-center py-8">
				No hay ninjas registrados aún.
			</p>
		);
	}

	return (
		<div>
			{/* Mobile: cards */}
			<div className="flex flex-col gap-3 xl:hidden">
				{localNinjas.map(ninja => {
					const isExpanded = expandedIds.has(ninja.id);
					return (
						<div key={ninja.id}
							className="border border-ninja-light-pink/15 rounded-lg p-4"
							style={{ background: 'rgba(171,91,199,0.06)' }}>
							<div className="flex items-start justify-between gap-2 mb-2">
								<span className="text-ninja-light-pink font-semibold text-sm truncate">
									{ninja.name}
								</span>
							<div className="flex items-center gap-2 shrink-0">
								<span className="text-ninja-white/40 text-xs">{formatDate(ninja.created_at)}</span>
								{deletingId === ninja.id ? (
									<div className="flex items-center gap-1">
										<span className="text-red-400/80 text-xs">¿Eliminar?</span>
										<button type="button" onClick={() => handleDelete(ninja.id)}
											className="text-xs px-2 py-0.5 rounded border border-red-500/40 text-red-400 hover:bg-red-500/20 transition-colors duration-150">
											Sí
										</button>
										<button type="button" onClick={() => setDeletingId(null)}
											className="text-xs px-2 py-0.5 rounded border border-ninja-white/15 text-ninja-white/40 hover:text-ninja-white/70 transition-colors duration-150">
											No
										</button>
									</div>
								) : (
									<button type="button" onClick={() => setDeletingId(ninja.id)}
										title="Eliminar ninja"
										className="text-ninja-white/30 hover:text-red-400/80 transition-colors duration-150 text-base leading-none">
										🗑️
									</button>
								)}
							</div>
							</div>
							<p className="text-ninja-white/60 text-xs mb-1 truncate">{ninja.email}</p>
							<p className="text-ninja-white/50 text-xs mb-2">
								📍 {LOCATION_NAMES[ninja.location] ?? ninja.location}
							</p>
							<div>
								<p className={`text-ninja-white/60 text-xs leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
									{ninja.improve}
								</p>
								{ninja.improve.length > 80 && (
									<button
										type="button"
										onClick={() => toggleExpand(ninja.id)}
										className="mt-1 text-ninja-light-pink/60 text-xs hover:text-ninja-light-pink transition-colors duration-150">
										{isExpanded ? '▲ ver menos' : '▼ ver más'}
									</button>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* Desktop: tabla */}
			<div className="hidden xl:block overflow-x-auto">
				<table className="w-full text-sm border-collapse">
					<thead>
						<tr className="border-b border-ninja-light-pink/20">
							<th className="text-left text-xs uppercase tracking-[2px] text-ninja-light-pink/60 pb-3 pr-4 font-medium">Nombre</th>
							<th className="text-left text-xs uppercase tracking-[2px] text-ninja-light-pink/60 pb-3 pr-4 font-medium">Correo</th>
							<th className="text-left text-xs uppercase tracking-[2px] text-ninja-light-pink/60 pb-3 pr-4 font-medium">Zona</th>
							<th className="text-left text-xs uppercase tracking-[2px] text-ninja-light-pink/60 pb-3 pr-4 font-medium">Quiere mejorar</th>
							<th className="text-left text-xs uppercase tracking-[2px] text-ninja-light-pink/60 pb-3 pr-4 font-medium">Registro</th>
							<th className="pb-3 font-medium"></th>
						</tr>
					</thead>
					<tbody>
						{localNinjas.map((ninja, idx) => {
							const isExpanded = expandedIds.has(ninja.id);
							return (
								<tr key={ninja.id}
									className={`border-b border-ninja-light-pink/10 align-top ${idx % 2 === 0 ? '' : 'bg-ninja-light-pink/3'}`}>
									<td className="py-3 pr-4 text-ninja-light-pink font-medium whitespace-nowrap">{ninja.name}</td>
									<td className="py-3 pr-4 text-ninja-white/60 text-xs whitespace-nowrap">{ninja.email}</td>
									<td className="py-3 pr-4 text-ninja-white/60 text-xs whitespace-nowrap">{LOCATION_NAMES[ninja.location] ?? ninja.location}</td>
									<td className="py-3 pr-4 text-ninja-white/60 text-xs max-w-72">
										<p className={`leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
											{ninja.improve}
										</p>
										{ninja.improve.length > 80 && (
											<button
												type="button"
												onClick={() => toggleExpand(ninja.id)}
												className="mt-1 text-ninja-light-pink/50 text-xs hover:text-ninja-light-pink transition-colors duration-150">
												{isExpanded ? '▲ ver menos' : '▼ ver más'}
											</button>
										)}
									</td>
								<td className="py-3 pr-4 text-ninja-white/40 text-xs whitespace-nowrap">{formatDate(ninja.created_at)}</td>
								<td className="py-3 text-right whitespace-nowrap">
									{deletingId === ninja.id ? (
										<div className="flex items-center justify-end gap-1">
											<span className="text-red-400/80 text-xs">¿Eliminar?</span>
											<button type="button" onClick={() => handleDelete(ninja.id)}
												className="text-xs px-2 py-0.5 rounded border border-red-500/40 text-red-400 hover:bg-red-500/20 transition-colors duration-150">
												Sí
											</button>
											<button type="button" onClick={() => setDeletingId(null)}
												className="text-xs px-2 py-0.5 rounded border border-ninja-white/15 text-ninja-white/40 hover:text-ninja-white/70 transition-colors duration-150">
												No
											</button>
										</div>
									) : (
										<button type="button" onClick={() => setDeletingId(ninja.id)}
											title="Eliminar ninja"
											className="text-ninja-white/20 hover:text-red-400/70 transition-colors duration-200 text-sm">
											🗑️
										</button>
									)}
								</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
