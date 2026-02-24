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
	if (ninjas.length === 0) {
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
				{ninjas.map(ninja => (
					<div key={ninja.id}
						className="border border-ninja-light-pink/15 rounded-lg p-4"
						style={{ background: 'rgba(171,91,199,0.06)' }}>
						<div className="flex items-start justify-between gap-2 mb-2">
							<span className="text-ninja-light-pink font-semibold text-sm truncate">
								{ninja.name}
							</span>
							<span className="text-ninja-white/40 text-xs shrink-0">
								{formatDate(ninja.created_at)}
							</span>
						</div>
						<p className="text-ninja-white/60 text-xs mb-1 truncate">{ninja.email}</p>
						<p className="text-ninja-white/50 text-xs mb-1">
							📍 {LOCATION_NAMES[ninja.location] ?? ninja.location}
						</p>
						<p className="text-ninja-white/60 text-xs line-clamp-2">{ninja.improve}</p>
					</div>
				))}
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
							<th className="text-left text-xs uppercase tracking-[2px] text-ninja-light-pink/60 pb-3 font-medium">Registro</th>
						</tr>
					</thead>
					<tbody>
						{ninjas.map((ninja, idx) => (
							<tr key={ninja.id}
								className={`border-b border-ninja-light-pink/10 ${idx % 2 === 0 ? '' : 'bg-ninja-light-pink/3'}`}>
								<td className="py-3 pr-4 text-ninja-light-pink font-medium">{ninja.name}</td>
								<td className="py-3 pr-4 text-ninja-white/60 text-xs">{ninja.email}</td>
								<td className="py-3 pr-4 text-ninja-white/60 text-xs">{LOCATION_NAMES[ninja.location] ?? ninja.location}</td>
								<td className="py-3 pr-4 text-ninja-white/60 text-xs max-w-55 truncate">{ninja.improve}</td>
								<td className="py-3 text-ninja-white/40 text-xs whitespace-nowrap">{formatDate(ninja.created_at)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
