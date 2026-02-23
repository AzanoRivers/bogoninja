/**
 * Database Configuration - Neon PostgreSQL
 * 
 * @description
 * Configuración de conexión a la base de datos Neon PostgreSQL usando @neondatabase/serverless.
 * Esta configuración está optimizada para funciones serverless en Vercel.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import { neon } from '@neondatabase/serverless';

// Obtener la URL de la base de datos
// Usa process.env en scripts de Node.js y import.meta.env en Astro/Vite
const DATABASE_URL = typeof process !== 'undefined' && process.env?.DATABASE_URL 
    ? process.env.DATABASE_URL 
    : (import.meta as any).env?.DATABASE_URL;

// Verificar que la URL de la base de datos esté configurada
if (!DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

// Crear la conexión a la base de datos
// neon() retorna una función SQL que ejecuta queries
export const sql = neon(DATABASE_URL);

/**
 * Tipo para los registros de ninja_registrations
 */
export interface NinjaRegistration {
    id: number;
    email: string;
    name: string;
    improve: string;
    experience: string | null;
    location: string;
    ip_update: string | null;
    created_at: Date;
    updated_at: Date;
}
