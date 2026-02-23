-- Alter table: Agregar columna ip_update para tracking de envíos por IP
-- Fecha: 2026-02-23
-- Propósito: Guardar la dirección IP del cliente en cada registro para validación de cooldown

-- Agregar columna ip_update (soporta IPv4 e IPv6)
ALTER TABLE ninja_registrations
ADD COLUMN ip_update VARCHAR(45);

-- Crear índice para optimizar búsquedas por IP
CREATE INDEX idx_ninja_registrations_ip_update 
ON ninja_registrations(ip_update);

-- Crear índice compuesto para búsquedas de cooldown por IP y fecha
CREATE INDEX idx_ninja_registrations_ip_created 
ON ninja_registrations(ip_update, created_at DESC);

-- Comentario sobre la columna (PostgreSQL)
COMMENT ON COLUMN ninja_registrations.ip_update IS 'Client IP Address for tracking submissions and enforcing cooldowns';
