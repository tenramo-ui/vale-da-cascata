"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const I = {
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  star: (<svg viewBox="0 0 24 24" fill="var(--gold-500)" width={18} height={18}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>),
  whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>),
};

export function Testimonial() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(ref.current?.querySelector(".quote-inner") as Element,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="vc-container vc-container--narrow"
      style={{ padding: "var(--section-y) var(--gutter)", textAlign: "center" }}
    >
      <div className="quote-inner">
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: "1.5rem" }}>
          {[1,2,3,4,5].map(i => <span key={i}>{I.star}</span>)}
        </div>
        <blockquote style={{
          fontFamily: "var(--font-display)", fontWeight: 400,
          fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
          lineHeight: 1.34, letterSpacing: "-0.02em",
          color: "var(--text-strong)",
          margin: "0 auto 2rem", maxWidth: "22ch",
          textWrap: "balance",
        } as React.CSSProperties}>
          "Acordamos com o som da cascata e passamos a tarde no haras. O Chalé do Lago superou tudo o que imaginávamos."
        </blockquote>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "var(--forest-700)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 600,
            color: "var(--gold-400)", fontSize: "var(--text-md)",
            border: "2px solid var(--border-gold)",
          }}>
            M
          </div>
          <div style={{ textAlign: "left" }}>
            <span style={{ display: "block", fontWeight: 600, color: "var(--text-strong)" }}>Marina Alves</span>
            <span style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-faint)" }}>Hóspede · Chalé do Lago</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(ref.current?.querySelector(".cta-inner") as Element,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section
      ref={ref}
      id="restaurante"
      style={{
        padding: "var(--section-y) var(--gutter)",
        background: "radial-gradient(120% 140% at 50% 0%, var(--forest-800) 0%, var(--forest-950) 60%)",
        textAlign: "center",
      }}
    >
      <div className="cta-inner vc-container vc-container--narrow">
        <div className="vc-eyebrow" style={{ color: "var(--gold-300)", marginBottom: "0.5rem" }}>
          Sua estadia começa aqui
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: "var(--text-display)",
          lineHeight: 1.04, letterSpacing: "-0.03em",
          color: "var(--mist-50)", margin: "0.5rem auto 1rem",
          maxWidth: "16ch", textWrap: "balance",
        } as React.CSSProperties}>
          Reserve o seu chalé no vale
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "46ch", margin: "0 auto 2rem" }}>
          Restaurante próprio e haras na propriedade. Cancelamento flexível até 7 dias antes.
        </p>
        <div style={{ display: "inline-flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="https://wa.me/5549991832114"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-md)",
              color: "var(--text-onGold)",
              background: "var(--gold-500)",
              padding: "14px 28px", borderRadius: "var(--radius-pill)",
              transition: "var(--tr-fast)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold-400)";
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold-500)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Verificar datas {I.arrow}
          </a>
          <a
            href="https://wa.me/5549991832114"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "var(--text-md)",
              color: "var(--text-muted)",
              background: "transparent",
              border: "1px solid var(--border-soft)",
              padding: "14px 28px", borderRadius: "var(--radius-pill)",
              transition: "var(--tr-fast)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-strong)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-soft)";
            }}
          >
            {I.whatsapp} (49) 99183-2114
          </a>
        </div>
      </div>
    </section>
  );
}
