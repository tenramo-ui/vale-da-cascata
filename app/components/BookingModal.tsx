"use client";
import { useEffect, useState } from "react";
import MiniCalendar from "./MiniCalendar";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

interface OccupiedRange {
  chale: string;
  start: string;
  end: string;
}

const CHALE_LABELS: Record<string, string> = {
  Lago: "Chalé do Lago",
  Cascata: "Chalé da Cascata",
  Borboletas: "Chalé das Borboletas",
};

const WHATSAPP_NUMBER = "5549991832114";

function formatBR(iso: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

type Step = "form" | "checking" | "result";

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [guests, setGuests] = useState(2);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [occupied, setOccupied] = useState<OccupiedRange[]>([]);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [eligibleChales, setEligibleChales] = useState<string[]>([]);
  const [availableChales, setAvailableChales] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    setStep("form");
    setLoadingSheet(true);
    setFetchError(false);
    fetch("/api/disponibilidade")
      .then(r => r.json())
      .then(data => {
        if (data.occupied) setOccupied(data.occupied);
        else setFetchError(true);
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoadingSheet(false));
  }, [open]);

  if (!open) return null;

  // Guest-count eligibility logic, per the rules:
  // up to 3 -> all 3 chalets; 4-6 -> only Lago; 7+ -> direct to Eventos/WhatsApp (max capacity is 6)
  const guestEligibility = (): { chales: string[]; overflow: boolean } => {
    if (guests <= 3) return { chales: ["Cascata", "Lago", "Borboletas"], overflow: false };
    if (guests <= 6) return { chales: ["Lago"], overflow: false };
    return { chales: [], overflow: true };
  };

  const occupiedFor = (chale: string) =>
    occupied.filter(o => o.chale.trim().toLowerCase() === chale.toLowerCase()).map(o => ({ start: o.start, end: o.end }));

  const isRangeFree = (chale: string, s: string, e: string): boolean => {
    const ranges = occupiedFor(chale);
    return !ranges.some(r => s < r.end && e > r.start); // overlap check
  };

  const handleCheck = () => {
    if (!start || !end) return;
    setStep("checking");

    setTimeout(() => {
      const { chales, overflow } = guestEligibility();
      if (overflow) {
        setEligibleChales([]);
        setAvailableChales([]);
        setStep("result");
        return;
      }
      const free = chales.filter(c => isRangeFree(c, start, end));
      setEligibleChales(chales);
      setAvailableChales(free);
      setStep("result");
    }, 700); // small delay for a "checking" feel
  };

  const buildWhatsAppMessage = (chale?: string) => {
    const linhas = [
      `Olá! Gostaria de consultar disponibilidade no Vale da Cascata.`,
      ``,
      `📅 Chegada: ${formatBR(start)}`,
      `📅 Saída: ${formatBR(end)}`,
      `👥 Hóspedes: ${guests}`,
    ];
    if (chale) linhas.push(`🏡 Chalé de interesse: ${CHALE_LABELS[chale] || chale}`);
    return encodeURIComponent(linhas.join("\n"));
  };

  const resetAndClose = () => {
    setStep("form");
    setStart(null);
    setEnd(null);
    setGuests(2);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,23,17,0.72)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={resetAndClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border-soft)",
          borderRadius: "var(--radius-xl)",
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2rem",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h4)", color: "var(--text-strong)" }}>
            Consultar disponibilidade
          </h3>
          <button onClick={resetAndClose} style={{ background: "none", border: "none", color: "var(--text-faint)", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>

        {step === "form" && (
          <>
            {/* Guests */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 8 }}>
                Número de hóspedes
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))}
                  style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border-soft)", background: "none", color: "var(--text-strong)", cursor: "pointer", fontSize: 18 }}>−</button>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-lg)", color: "var(--text-strong)", minWidth: 28, textAlign: "center" }}>{guests}</span>
                <button type="button" onClick={() => setGuests(g => Math.min(12, g + 1))}
                  style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border-soft)", background: "none", color: "var(--text-strong)", cursor: "pointer", fontSize: 18 }}>+</button>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{guests === 1 ? "hóspede" : "hóspedes"}</span>
              </div>
              {guests >= 7 && (
                <p style={{ fontSize: "var(--text-xs)", color: "var(--gold-400)", marginTop: 8, lineHeight: 1.5 }}>
                  Nossa capacidade máxima por chalé é de 6 hóspedes. Para grupos maiores, confira nossa seção de Eventos ou fale direto no WhatsApp.
                </p>
              )}
            </div>

            {/* Calendar */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 8 }}>
                Selecione chegada e saída
              </label>
              {loadingSheet ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-faint)", fontSize: "var(--text-sm)" }}>Carregando agenda…</div>
              ) : (
                <MiniCalendar
                  occupiedRanges={guestEligibility().chales.flatMap(c => occupiedFor(c))}
                  selectedStart={start}
                  selectedEnd={end}
                  onSelect={(s, e) => { setStart(s); setEnd(e); }}
                />
              )}
              {fetchError && (
                <p style={{ fontSize: "var(--text-xs)", color: "var(--gold-400)", marginTop: 8 }}>
                  Não conseguimos carregar a agenda agora, mas você pode seguir e confirmar direto pelo WhatsApp.
                </p>
              )}
            </div>

            {start && end && (
              <div style={{ display: "flex", gap: 16, marginBottom: "1.5rem", fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
                <span><b style={{ color: "var(--gold-400)" }}>Chegada:</b> {formatBR(start)}</span>
                <span><b style={{ color: "var(--gold-400)" }}>Saída:</b> {formatBR(end)}</span>
              </div>
            )}

            <button
              type="button"
              disabled={!start || !end}
              onClick={handleCheck}
              style={{
                width: "100%", padding: "14px", borderRadius: "var(--radius-pill)",
                border: "none", cursor: start && end ? "pointer" : "not-allowed",
                background: start && end ? "var(--gold-500)" : "rgba(200,168,106,0.25)",
                color: "var(--text-onGold)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-base)",
                transition: "var(--tr-fast)",
              }}
            >
              Verificar disponibilidade
            </button>
          </>
        )}

        {step === "checking" && (
          <div style={{ padding: "3rem 0", textAlign: "center" }}>
            <div style={{ width: 32, height: 32, border: "3px solid var(--border-soft)", borderTopColor: "var(--gold-500)", borderRadius: "50%", margin: "0 auto 1rem", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>Consultando a agenda…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {step === "result" && (
          <div>
            {eligibleChales.length === 0 ? (
              // Overflow case: >6 guests
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ color: "var(--text-body)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  Para grupos de <b>{guests} hóspedes</b>, nossa capacidade máxima por chalé (6 pessoas) não é suficiente.
                  Consulte nossa equipe para opções de evento ou grupos maiores.
                </p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`} target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: "var(--radius-pill)", background: "var(--gold-500)", color: "var(--text-onGold)", fontWeight: 600, fontFamily: "var(--font-sans)" }}>
                  Falar no WhatsApp
                </a>
              </div>
            ) : availableChales.length === 0 ? (
              // No chalets free for that date range
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ color: "var(--text-body)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  Infelizmente não encontramos chalés disponíveis para essas datas com {guests} {guests === 1 ? "hóspede" : "hóspedes"}.
                  Fale com a gente — podemos verificar outras opções de data.
                </p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`} target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: "var(--radius-pill)", background: "var(--gold-500)", color: "var(--text-onGold)", fontWeight: 600, fontFamily: "var(--font-sans)" }}>
                  Falar no WhatsApp
                </a>
              </div>
            ) : (
              // Available chalets!
              <div>
                <p style={{ color: "var(--text-body)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
                  Boas notícias! Encontramos {availableChales.length === 1 ? "este chalé disponível" : "estes chalés disponíveis"} para {formatBR(start)} – {formatBR(end)}:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {availableChales.map(c => (
                    <a
                      key={c}
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(c)}`}
                      target="_blank" rel="noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 18px", borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-gold)", background: "rgba(200,168,106,0.06)",
                        color: "var(--text-strong)", textDecoration: "none",
                        fontFamily: "var(--font-sans)", fontWeight: 500,
                      }}
                    >
                      {CHALE_LABELS[c] || c}
                      <span style={{ color: "var(--gold-400)", fontSize: "var(--text-sm)" }}>Prosseguir →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            <button type="button" onClick={() => setStep("form")} style={{ marginTop: "1.25rem", width: "100%", background: "none", border: "none", color: "var(--text-faint)", fontSize: "var(--text-sm)", cursor: "pointer" }}>
              ← Refazer consulta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
