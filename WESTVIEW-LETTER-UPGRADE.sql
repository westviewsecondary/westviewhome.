-- WESTVIEW: optional online letter text for the EXISTING Supabase project.
-- Paste this whole file into that project's SQL Editor and click Run once.
-- Existing documents, PDFs, users, keys and access policies are retained.
-- This is an additive upgrade, not a fresh-database setup script.
BEGIN;
ALTER TABLE public.documents
  ADD COLUMN IF NOT EXISTS letter_body text NOT NULL DEFAULT '';
COMMENT ON COLUMN public.documents.letter_body IS
  'Optional plain-text letter. Blank lines separate paragraphs. Original PDF remains unchanged.';
COMMIT;

-- Result should say text. Re-running this file is safe.
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'documents'
  AND column_name = 'letter_body';
