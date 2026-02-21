// Sticky Header que sube con el scroll en desktop
document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('#desktop-header') as HTMLElement;
	if (!header) return;

	// Solo aplicar en desktop (xl breakpoint: 1366px)
	if (window.innerWidth < 1366) return;

	const headerHeight = header.offsetHeight;
	const viewportHeight = window.innerHeight;
	
	// Distancia que el header debe viajar
	// Desde bottom-4 (16px desde abajo) hasta top-4 (16px desde arriba)
	const startBottom = 16; // bottom-4
	const endTop = 16; // top-4
	const travelDistance = viewportHeight - headerHeight - startBottom - endTop;

	// Función para actualizar la posición del header
	const updateHeaderPosition = () => {
		const scrollY = window.pageYOffset;
		
		// Calcular cuánto debe subir el header basado en el scroll
		const translateAmount = Math.min(scrollY, travelDistance);
		
		// Aplicar transform negativo para subir
		header.style.transform = `translateY(-${translateAmount}px)`;
	};

	// Aplicar posición inicial y mostrar header
	updateHeaderPosition();
	// Hacer visible el header después de posicionarlo
	setTimeout(() => {
		header.style.opacity = '1';
	}, 50);

	// Actualizar en cada scroll
	window.addEventListener('scroll', updateHeaderPosition, { passive: true });
});
