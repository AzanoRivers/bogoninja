import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
	return new Response(
		JSON.stringify({ 
			version: 1,
			author: 'AzanoRivers'
		}), 
		{ 
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		}
	);
};
