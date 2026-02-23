/**
 * Database Seed Script - Ninja Registrations Table
 * 
 * @description
 * Script para crear la tabla ninja_registrations en la base de datos.
 * Esta tabla almacena los registros del formulario de contacto.
 * 
 * Estructura de la tabla:
 * - id: clave primaria auto-incremental
 * - email: identificador único del registro (máx 80 caracteres)
 * - name: nombre o apodo del ninja (máx 60 caracteres)
 * - improve: qué quiere mejorar (máx 100 caracteres)
 * - experience: experiencia que quiere compartir (máx 500 caracteres, opcional)
 * - location: ubicación preferida (modelia, parque-nacional, mosquera)
 * - created_at: fecha de creación del registro
 * - updated_at: fecha de última actualización
 * 
 * @usage
 * Para ejecutar este script:
 * ```bash
 * pnpm tsx src/db/seed.ts
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import { sql } from './config';

async function createTable() {
    try {
        console.log('🚀 Creando tabla ninja_registrations...');
        
        // Crear la tabla si no existe
        await sql`
            CREATE TABLE IF NOT EXISTS ninja_registrations (
                id BIGSERIAL PRIMARY KEY,
                email VARCHAR(80) UNIQUE NOT NULL,
                name VARCHAR(60) NOT NULL,
                improve VARCHAR(100) NOT NULL,
                experience TEXT,
                location VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        console.log('✅ Tabla ninja_registrations creada exitosamente');
        
        // Crear índice en email para búsquedas rápidas
        await sql`
            CREATE INDEX IF NOT EXISTS idx_ninja_registrations_email 
            ON ninja_registrations(email)
        `;
        
        console.log('✅ Índice en email creado exitosamente');
        
        // Crear índice en created_at para ordenar por fecha
        await sql`
            CREATE INDEX IF NOT EXISTS idx_ninja_registrations_created_at 
            ON ninja_registrations(created_at DESC)
        `;
        
        console.log('✅ Índice en created_at creado exitosamente');
        
        // Crear trigger para actualizar updated_at automáticamente
        await sql`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql'
        `;
        
        await sql`
            DROP TRIGGER IF EXISTS update_ninja_registrations_updated_at 
            ON ninja_registrations
        `;
        
        await sql`
            CREATE TRIGGER update_ninja_registrations_updated_at 
            BEFORE UPDATE ON ninja_registrations 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column()
        `;
        
        console.log('✅ Trigger para updated_at creado exitosamente');
        
        console.log('\n🎉 Base de datos configurada correctamente');
        console.log('📊 Tabla: ninja_registrations');
        console.log('🔑 Campos: id, email (único), name, improve, experience, location, created_at, updated_at');
        
    } catch (error) {
        console.error('❌ Error al crear la tabla:', error);
        throw error;
    }
}

// Ejecutar la función automáticamente
createTable()
    .then(() => {
        console.log('\n✨ Seed completado');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Error en el seed:', error);
        process.exit(1);
    });

export { createTable };
