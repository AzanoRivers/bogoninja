-- ══════════════════════════════════════════════════════════════
--  Migración: Crear tabla ninja_admin + registro de prueba
--  Fecha:     2026-02-23
--  Autor:     AzanoRivers
-- ══════════════════════════════════════════════════════════════

-- ── Crear tabla ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ninja_admin (
  id       SERIAL        PRIMARY KEY,
  correo   VARCHAR(255)  NOT NULL UNIQUE,
  password TEXT          NOT NULL
);

-- ── Registro de prueba ───────────────────────────────────────
-- Algoritmo : scrypt  (Node.js crypto nativo)
-- Formato   : <salt_hex>:<hash_hex>
INSERT INTO ninja_admin (correo, password)
VALUES (
  'email@example.com',
  'pass'
)
ON CONFLICT (correo) DO NOTHING;
