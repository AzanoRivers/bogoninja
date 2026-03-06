-- ══════════════════════════════════════════════════════════════
--  Migración: Ampliar límite de caracteres en campos de texto
--  Fecha:     2026-03-06
--  Autor:     AzanoRivers
-- ══════════════════════════════════════════════════════════════

-- ── improve: VARCHAR(100) → VARCHAR(300) ─────────────────────
-- Motivo: 100 caracteres es insuficiente para que el ninja
-- describa qué quiere mejorar con suficiente detalle.
ALTER TABLE ninja_registrations
ALTER COLUMN improve TYPE VARCHAR(300);

-- ── experience: ya es TEXT, sin cambio en DB ─────────────────
-- El frontend sube su maxLength de 500 → 1500. No se requiere
-- modificar la columna ya que TEXT no tiene límite en PostgreSQL.
