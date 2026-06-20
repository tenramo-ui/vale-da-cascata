import { NextResponse } from "next/server";

// Public CSV export URL for the booking sheet (read-only, "anyone with link can view")
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1s4vPDuG15-fKGhOecY32eTLJn0lWT9vgo-tQktKIRrE/export?format=csv&gid=0";

// Revalidate the data at most once per request cycle; Next.js caches fetch by default,
// we force no-store so the calendar always reflects the latest sheet state.
export const dynamic = "force-dynamic";

interface OccupiedRange {
  chale: string;
  start: string; // ISO yyyy-mm-dd
  end: string;   // ISO yyyy-mm-dd
}

// Parses dates in dd/mm/yyyy format (as used in the sheet) into ISO yyyy-mm-dd.
// Returns null if the value isn't a valid date (the sheet has some malformed/test rows).
function parseBRDate(value: string): string | null {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const [, d, m, y] = match;
  const day = parseInt(d, 10);
  const month = parseInt(m, 10);
  const year = parseInt(y, 10);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  // Sanity check round-trip
  const d2 = new Date(iso + "T00:00:00Z");
  if (isNaN(d2.getTime())) return null;
  return iso;
}

// Minimal CSV line parser that handles quoted fields with commas/emoji safely.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(field);
        field = "";
      } else if (char === "\r") {
        // skip
      } else if (char === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter(r => r.some(cell => cell.trim().length > 0));
}

export async function GET() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Não foi possível consultar a agenda agora." }, { status: 502 });
    }
    const text = await res.text();
    const rows = parseCSV(text);

    if (rows.length === 0) {
      return NextResponse.json({ occupied: [] });
    }

    const header = rows[0].map(h => h.trim().toLowerCase());
    const idxEntrada = header.indexOf("data entrada");
    const idxSaida = header.indexOf("data saída");
    const idxChale = header.indexOf("chalés");
    const idxSituacao = header.indexOf("situação");

    if (idxEntrada === -1 || idxSaida === -1 || idxChale === -1 || idxSituacao === -1) {
      return NextResponse.json({ error: "Formato da planilha inesperado." }, { status: 500 });
    }

    const occupied: OccupiedRange[] = [];

    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      const situacao = (r[idxSituacao] || "").trim().toUpperCase();
      if (situacao !== "OCUPADO") continue;

      const chale = (r[idxChale] || "").trim();
      const startISO = parseBRDate(r[idxEntrada] || "");
      const endISO = parseBRDate(r[idxSaida] || "");

      // Only emit clean, parseable, non-empty entries. Sensitive columns
      // (Nome, Whatsapp) are intentionally never read into the response.
      if (chale && startISO && endISO) {
        occupied.push({ chale, start: startISO, end: endISO });
      }
    }

    return NextResponse.json(
      { occupied },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    return NextResponse.json({ error: "Erro ao consultar disponibilidade." }, { status: 500 });
  }
}
