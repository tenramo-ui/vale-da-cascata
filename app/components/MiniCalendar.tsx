"use client";
import { useState } from "react";

interface MiniCalendarProps {
  occupiedRanges: { start: string; end: string }[]; // ISO dates, end exclusive-ish (checkout day is free)
  selectedStart: string | null;
  selectedEnd: string | null;
  onSelect: (start: string | null, end: string | null) => void;
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function isDateOccupied(iso: string, ranges: { start: string; end: string }[]): boolean {
  // A night is blocked if iso is within [start, end) — checkout day itself is free for new check-in
  return ranges.some(r => iso >= r.start && iso < r.end);
}

export default function MiniCalendar({ occupiedRanges, selectedStart, selectedEnd, onSelect }: MiniCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const todayISO = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const goPrev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const goNext = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const handleDayClick = (iso: string, disabled: boolean) => {
    if (disabled) return;
    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Start a new selection
      onSelect(iso, null);
    } else {
      // We have a start, pick the end
      if (iso <= selectedStart) {
        onSelect(iso, null);
      } else {
        // Verify no occupied date in between
        let blocked = false;
        const s = new Date(selectedStart);
        const e = new Date(iso);
        const cursor = new Date(s);
        while (cursor < e) {
          const cIso = cursor.toISOString().slice(0, 10);
          if (isDateOccupied(cIso, occupiedRanges)) { blocked = true; break; }
          cursor.setDate(cursor.getDate() + 1);
        }
        if (blocked) {
          onSelect(iso, null); // restart selection from this date instead
        } else {
          onSelect(selectedStart, iso);
        }
      }
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={goPrev} type="button" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold-500)", fontSize: 18, padding: 4 }}>‹</button>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", color: "var(--text-strong)" }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={goNext} type="button" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold-500)", fontSize: 18, padding: 4 }}>›</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
        {WEEKDAY_LABELS.map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>{d}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const iso = toISO(viewYear, viewMonth, d);
          const isPast = iso < todayISO;
          const occupied = isDateOccupied(iso, occupiedRanges);
          const disabled = isPast || occupied;

          const inRange = selectedStart && selectedEnd && iso > selectedStart && iso < selectedEnd;
          const isStart = iso === selectedStart;
          const isEnd = iso === selectedEnd;

          let bg = "transparent";
          let color = "var(--text-body)";
          if (disabled) { color = "var(--text-faint)"; }
          if (occupied && !isPast) { bg = "rgba(200,80,80,0.12)"; color = "rgba(200,80,80,0.7)"; }
          if (isStart || isEnd) { bg = "var(--gold-500)"; color = "var(--text-onGold)"; }
          else if (inRange) { bg = "rgba(200,168,106,0.18)"; color = "var(--text-strong)"; }

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(iso, !!disabled)}
              title={occupied ? "Ocupado" : undefined}
              style={{
                aspectRatio: "1/1",
                border: "none",
                borderRadius: "var(--radius-sm)",
                background: bg,
                color,
                fontSize: 13,
                cursor: disabled ? "not-allowed" : "pointer",
                fontWeight: isStart || isEnd ? 700 : 400,
                transition: "background 120ms",
              }}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 14, marginTop: 14, fontSize: 11, color: "var(--text-faint)", flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: "rgba(200,80,80,0.3)", display: "inline-block" }} /> Ocupado
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: "var(--gold-500)", display: "inline-block" }} /> Selecionado
        </span>
      </div>
    </div>
  );
}
