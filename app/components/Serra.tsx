"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const I = {
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  horse: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={16} height={16}><path d="M4 16s1-6 4-8c1-1 2-1 3-1l2-3h3l1 3c1 0 2 1 2 3v4l-2 3H9l-2-1-3 2z" strokeLinejoin="round"/><path d="M9 16v3M15 16v3" strokeLinecap="round"/></svg>),
  trail: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={16} height={16}><path d="M3 17c3-3 6-5 9-5s6 2 9-2" strokeLinecap="round"/><path d="M3 7c3 3 6 5 9 5s6-2 9 2" strokeLinecap="round"/></svg>),
  leaf: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={16} height={16}><path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14z" strokeLinejoin="round"/><path d="M9 15c2-2 4-3 7-4" strokeLinecap="round"/></svg>),
};

const HARAS_PHOTOS = [
  { src: "/haras-pony.webp", label: "Haras 8888 — pônei no pasto", pos: "center" },
  { src: "/haras-estabulo.webp", label: "Estábulo moderno", pos: "center" },
  { src: "/haras-area.webp", label: "Área de convivência", pos: "center" },
  { src: "/haras-aerial1.webp", label: "Vista aérea do haras", pos: "center" },
  { src: "/haras-aerial2.webp", label: "Vista aérea — barracão", pos: "center" },
  { src: "/haras-pasto.webp", label: "Cavalos em liberdade no pasto", pos: "center" },
  { src: "/haras-instrutor.webp", label: "Aula de equitação com instrutor", pos: "center" },
];

export default function Serra() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    sectionRef.current?.querySelectorAll(".vc-reveal")?.forEach((el, i) => {
      gsap.fromTo(el, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });

    // Auto-advance gallery
    const timer = setInterval(() => setActivePhoto(p => (p + 1) % HARAS_PHOTOS.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="haras" ref={sectionRef} style={{ background: "var(--mist-50)", padding: "var(--section-y) 0" }}>
      <div className="vc-container vc-container--wide">

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "3.5rem", flexWrap: "wrap" }}>
          <div>
            <div className="vc-eyebrow vc-reveal" style={{ color: "var(--gold-600)", marginBottom: "0.5rem" }}>Haras 8888</div>
            <h2 className="vc-reveal" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h1)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--ink-900)", marginTop: "0.5rem" }}>
              Um pedaço de natureza<br/>preservada.
            </h2>
            <p className="vc-reveal" style={{ fontSize: "var(--text-lg)", lineHeight: 1.65, color: "var(--stone-700)", margin: "1.25rem 0 0", maxWidth: "48ch" }}>
              Em meio a matas nativas, cachoeiras e trilhas, o Vale da Cascata oferece uma experiência rara: sentir a natureza em seu estado mais autêntico. Um refúgio onde o silêncio é interrompido apenas pelo canto dos pássaros e pelo som das águas correndo pelo vale.
            </p>
            <p className="vc-reveal" style={{ fontSize: "var(--text-base)", lineHeight: 1.65, color: "var(--stone-600)", margin: "1rem 0 0", maxWidth: "46ch" }}>
              O Haras 8888 integra a experiência com aulas e passeios a cavalo pelas trilhas do vale — uma das atrações mais marcantes da propriedade.
            </p>
          </div>
          <a href="https://wa.me/5549920019167" target="_blank" rel="noreferrer" className="vc-reveal"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-onGold)", background: "var(--gold-600)", padding: "12px 24px", borderRadius: "var(--radius-pill)", transition: "var(--tr-fast)", flexShrink: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-700)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-600)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            Consultar passeios {I.arrow}
          </a>
        </div>

        {/* Main gallery — auto-slide */}
        <div className="vc-reveal haras-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "start" }}>

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", order: 1 }}>
            {/* Logo — fills the card completely, no frame */}
            <div style={{ position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "1/1" }}>
              <img src="/haras-logo.webp" alt="Haras 8888" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            </div>

            {/* Feature tags */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { icon: I.horse, label: "Aulas e passeios a cavalo" },
                { icon: I.trail, label: "Trilhas guiadas pelo vale" },
                { icon: I.leaf, label: "Contato com a natureza nativa" },
              ].map(f => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: "var(--radius-md)", background: "rgba(11,14,12,0.05)", border: "1px solid rgba(11,14,12,0.1)" }}>
                  <span style={{ color: "var(--gold-600)" }}>{f.icon}</span>
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--stone-700)", fontWeight: 500 }}>{f.label}</span>
                </div>
              ))}
            </div>

            {/* Coord chip */}
            <div style={{ padding: "14px 16px", borderRadius: "var(--radius-md)", background: "rgba(11,14,12,0.04)", border: "1px solid rgba(11,14,12,0.08)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--stone-500)" }}>27°09′S · 52°47′W · ALT 530m</span>
            </div>
          </div>

          {/* Big sliding photo — now on the right, fixed height, cropped from sides to standardize size */}
          <div className="haras-slider" style={{ position: "relative", borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "0 40px 100px -28px rgba(20,24,21,0.22)", order: 2, background: "#0e0c0a", aspectRatio: "16/10" }}>
            {HARAS_PHOTOS.map((photo, i) => (
              <img
                key={i}
                src={photo.src}
                alt={photo.label}
                loading={i === 0 ? "eager" : "lazy"}
                style={{
                  display: "block",
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: activePhoto === i ? 1 : 0,
                  transition: "opacity 0.8s ease",
                  pointerEvents: activePhoto === i ? "auto" : "none",
                }}
              />
            ))}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,23,17,0.6) 0%, rgba(10,23,17,0) 45%)", pointerEvents: "none" }} />
            {/* Caption */}
            <div style={{ position: "absolute", left: 20, bottom: 20, right: 20 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-300)" }}>
                {HARAS_PHOTOS[activePhoto].label}
              </span>
            </div>
            {/* Dots */}
            <div style={{ position: "absolute", right: 16, top: 16, display: "flex", flexDirection: "column", gap: 6 }}>
              {HARAS_PHOTOS.map((_, i) => (
                <button key={i} onClick={() => setActivePhoto(i)}
                  style={{ width: 6, height: i === activePhoto ? 20 : 6, borderRadius: 3, background: i === activePhoto ? "var(--gold-400)" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
              ))}
            </div>
            {/* Haras logo chip */}
            <div style={{ position: "absolute", left: 20, top: 20, padding: "8px 14px", borderRadius: "var(--radius-md)", background: "rgba(10,23,17,0.65)", backdropFilter: "blur(10px)", border: "1px solid rgba(200,168,106,0.3)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-300)" }}>Haras 8888</span>
            </div>
          </div>
        </div>

        {/* Bottom thumbnail strip */}
        <div className="vc-reveal" style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {HARAS_PHOTOS.map((photo, i) => (
            <button key={i} onClick={() => setActivePhoto(i)}
              style={{ flexShrink: 0, width: 110, height: 72, borderRadius: "var(--radius-sm)", overflow: "hidden", border: i === activePhoto ? "2px solid var(--gold-600)" : "2px solid transparent", padding: 0, cursor: "pointer", transition: "border-color 200ms", position: "relative", background: "#1a1410" }}>
              <img src={photo.src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .haras-slider {
          min-height: 200px;
        }
        @media (max-width: 768px) {
          .haras-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
