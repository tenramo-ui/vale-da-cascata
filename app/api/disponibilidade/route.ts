import { NextResponse } from "next/server";

// Fonte da verdade da disponibilidade: o PMS (reservas.valedacascata.com.br).
// A planilha do Google Sheets não é mais usada — o PMS já controla
// reservas, bloqueios e sincronização com Airbnb/Booking/iLove/Expedia.
const PMS_BASE_URL = "https://reservas.valedacascata.com.br";

// Slugs das propriedades no PMS <-> rótulos usados neste site (BookingModal).
const PROPERTIES: { slug: string; chale: string }[] = [
  { slug: "chale-do-lago", chale: "Lago" },
  { slug: "chale-da-cascata", chale: "Cascata" },
  { slug: "chale-das-borboletas", chale: "Borboletas" },
];

// Revalida a cada requisição — a disponibilidade precisa refletir o PMS em
// tempo real (reservas, holds de pagamento pendente e bloqueios manuais).
export const dynamic = "force-dynamic";

interface OccupiedRange {
  chale: string;
  start: string; // ISO yyyy-mm-dd
  end: string;   // ISO yyyy-mm-dd
}

interface PmsBusyRange {
  start: string; // o PMS devolve ISO datetime, ex: "2026-08-20T00:00:00.000Z"
  end: string;
}

// O calendário do site (MiniCalendar/BookingModal) trabalha só com a parte
// yyyy-mm-dd das datas — aqui cortamos a hora que vem do PMS.
function toDateOnly(iso: string): string {
  return iso.slice(0, 10);
}

export async function GET() {
  try {
    const results = await Promise.all(
      PROPERTIES.map(async ({ slug, chale }) => {
        const res = await fetch(
          `${PMS_BASE_URL}/api/public/availability/${slug}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error(`PMS respondeu ${res.status} para "${slug}"`);
        }
        const busy: PmsBusyRange[] = await res.json();
        return busy.map(
          (b): OccupiedRange => ({
            chale,
            start: toDateOnly(b.start),
            end: toDateOnly(b.end),
          })
        );
      })
    );

    const occupied = results.flat();

    return NextResponse.json(
      { occupied },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    console.error("[disponibilidade] Erro ao consultar o PMS:", err);
    return NextResponse.json(
      { error: "Não foi possível consultar a agenda agora." },
      { status: 502 }
    );
  }
}
