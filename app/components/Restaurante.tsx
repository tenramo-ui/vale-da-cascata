"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const I = {
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  fork: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={18} height={18}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" strokeLinecap="round"/></svg>),
  view: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={18} height={18}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>),
  music: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={18} height={18}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>),
};

const FOTOS = [
  { src: "/restaurante-aerial.webp", label: "Vista para a cascata e a capela", pos: "center" },
  { src: "/restaurante-noite.webp", label: "Jantar ao ar livre, sob as estrelas", pos: "center" },
  { src: "/restaurante-dia.webp", label: "Deck externo com vista para o vale", pos: "center" },
  { src: "/restaurante-interior.webp", label: "Interior em madeira nobre", pos: "center top" },
];

export default function Restaurante() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sectionRef.current?.querySelectorAll(".vc-reveal")?.forEach((el, i) => {
      gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });

    // Parallax on hero photo
    const onScroll = () => {
      if (!mainImgRef.current) return;
      const rect = mainImgRef.current.getBoundingClientRect();
      const offset = (rect.top / window.innerHeight) * 20;
      mainImgRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="restaurante" ref={sectionRef} style={{ background: "var(--bg-dark, var(--forest-950))", padding: "var(--section-y) 0", overflow: "hidden" }}>
      <div className="vc-container vc-container--wide">

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <div>
            <div className="vc-eyebrow vc-reveal" style={{ marginBottom: "0.5rem" }}>Restaurante</div>
            <h2 className="vc-reveal" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h1)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--text-strong)", marginTop: "0.5rem", maxWidth: "18ch" }}>
              À mesa, com a cascata ao fundo
            </h2>
            <p className="vc-reveal" style={{ marginTop: "1rem", fontSize: "var(--text-lg)", lineHeight: 1.65, color: "var(--text-muted)", maxWidth: "46ch" }}>
              O restaurante do Vale da Cascata fica posicionado de frente para a cachoeira e a capelinha branca — uma vista única no interior catarinense. Gastronomia regional em um ambiente de madeira nobre, com deck aberto ao ar livre e iluminação intimista nas noites estreladas.
            </p>
          </div>
          <a href="https://wa.me/5549991832114" target="_blank" rel="noreferrer" className="vc-reveal"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-onGold)", background: "var(--gold-500)", padding: "12px 24px", borderRadius: "var(--radius-pill)", transition: "var(--tr-fast)", flexShrink: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-400)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-500)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            Reservar mesa {I.arrow}
          </a>
        </div>

        {/* Photo grid */}
        <div className="vc-reveal restaurante-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gridTemplateRows: "320px 320px", gap: "1rem" }}>
          {/* Main big — aerial with waterfall + chapel */}
          <div className="restaurante-main-photo" style={{ gridRow: "1 / 3", position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <div ref={mainImgRef} style={{ position: "absolute", inset: "-10% 0", backgroundImage: `url(${FOTOS[0].src})`, backgroundSize: "cover", backgroundPosition: FOTOS[0].pos, willChange: "transform" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,23,17,0.65) 0%, rgba(10,23,17,0) 55%)" }} />
            <div style={{ position: "absolute", left: 20, bottom: 20, padding: "6px 12px", background: "rgba(10,23,17,0.6)", borderRadius: "var(--radius-sm)", backdropFilter: "blur(8px)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-300)" }}>{FOTOS[0].label}</span>
            </div>
          </div>

          {/* Night shot */}
          <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${FOTOS[1].src})`, backgroundSize: "cover", backgroundPosition: FOTOS[1].pos }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,23,17,0.6) 0%, rgba(10,23,17,0) 55%)" }} />
            <div style={{ position: "absolute", left: 16, bottom: 16 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-300)", background: "rgba(10,23,17,0.55)", padding: "4px 8px", borderRadius: 4, backdropFilter: "blur(6px)" }}>{FOTOS[1].label}</span>
            </div>
          </div>

          {/* Day deck */}
          <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${FOTOS[2].src})`, backgroundSize: "cover", backgroundPosition: FOTOS[2].pos }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,23,17,0.55) 0%, rgba(10,23,17,0) 55%)" }} />
            <div style={{ position: "absolute", left: 16, bottom: 16 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-300)", background: "rgba(10,23,17,0.55)", padding: "4px 8px", borderRadius: 4, backdropFilter: "blur(6px)" }}>{FOTOS[2].label}</span>
            </div>
          </div>
        </div>

        {/* Interior strip */}
        <div className="vc-reveal" style={{ marginTop: "1rem", position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", height: 280 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${FOTOS[3].src})`, backgroundSize: "cover", backgroundPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,23,17,0.8) 0%, rgba(10,23,17,0) 50%)" }} />
          <div style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)" }}>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-300)", marginBottom: 8 }}>Interior</span>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(1.2rem, 2vw, 1.8rem)", color: "var(--mist-50)", maxWidth: "28ch", lineHeight: 1.3 }}>
              Mesa de tronco nativo e iluminação artesanal em madeira
            </p>
          </div>
        </div>

        {/* Feature chips */}
        <div className="vc-reveal" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
          {[
            { icon: I.view, label: "Vista para cascata e chapel" },
            { icon: I.fork, label: "Gastronomia regional" },
            { icon: I.music, label: "Ambiente intimista noturno" },
          ].map(f => (
            <div key={f.label} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-gold)", background: "rgba(200,168,106,0.06)", color: "var(--gold-400)", fontSize: "var(--text-sm)", fontFamily: "var(--font-sans)" }}>
              {f.icon} {f.label}
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .restaurante-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .restaurante-main-photo { grid-row: auto !important; height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
