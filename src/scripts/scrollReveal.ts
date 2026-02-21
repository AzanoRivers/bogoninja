/**
 * Scroll Reveal - Intersection Observer
 * Reveals elements when they enter the viewport
 * 
 * autor: Claude Sonnete 4.5 - AzanoRivers
 * 
 * Usage in Astro components:
 * <div class="scroll-reveal">Content</div>
 * <div class="scroll-reveal-slow">Content</div>
 * <div class="scroll-reveal-fast">Content</div>
 * <div class="scroll-reveal-left">Content</div>
 * <div class="scroll-reveal-right">Content</div>
 */

const initScrollReveal = () => {
	// Check if user prefers reduced motion
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	
	if (prefersReducedMotion) {
		// Skip animations for users who prefer reduced motion
		return;
	}

	// Select all elements with scroll-reveal classes
	const revealElements = document.querySelectorAll(
		'.scroll-reveal, .scroll-reveal-slow, .scroll-reveal-fast, .scroll-reveal-left, .scroll-reveal-right'
	);

	if (revealElements.length === 0) return;

	// Intersection Observer options
	const observerOptions: IntersectionObserverInit = {
		root: null, // viewport
		rootMargin: '0px 0px -100px 0px', // trigger 100px before element enters viewport
		threshold: 0.1, // 10% of element visible
	};

	// Callback when elements intersect
	const observerCallback: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Add visible class to trigger animation
				entry.target.classList.add('is-visible');
				
				// Optional: stop observing after reveal (one-time animation)
				observer.unobserve(entry.target);
			}
		});
	};

	// Create observer
	const observer = new IntersectionObserver(observerCallback, observerOptions);

	// Observe all reveal elements
	revealElements.forEach((element) => {
		observer.observe(element);
	});
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
	initScrollReveal();
}

// Re-initialize on Astro view transitions (if using)
document.addEventListener('astro:page-load', initScrollReveal);
