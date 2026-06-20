"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const I = {
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  star: (<svg viewBox="0 0 24 24" fill="var(--gold-500)" width={14} height={14}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>),
};

const SUITES = [
  {
    id: "lago",
    name: "Chalé do Lago",
    img: "/chale-exterior.webp",
    view: "Vista para o lago",
    viewDesc: "Acorde com o lago refletindo a luz da manhã diante de você.",
    tags: ["Hidromassagem", "Até 6 pessoas", "2 quartos"],
    rating: "5.0",
    badge: "Mais completo",
    badgeSolid: true,
    href: "/chale-lago",
  },
  {
    id: "cascata",
    name: "Chalé da Cascata",
    img: "/cascata-exterior.webp",
    view: "Vista frontal para a cascata",
    viewDesc: "A fachada de vidro enquadra a cachoeira como uma pintura viva.",
    tags: ["Hidromassagem", "Para casal", "Reservado"],
    rating: "4.9",
    badge: "Mais procurado",
    badgeSolid: false,
    href: "/chale-cascata",
  },
  {
    id: "borboleta",
    name: "Chalé das Borboletas",
    img: "/borboletas-aframe.webp", imgPos: "center 30%",
    view: "Vista para o bosque",
    viewDesc: "Cercado por espécies nativas e borboletas num silêncio só seu.",
    tags: ["Aconchegante", "Para casal", "Até 3 pessoas"],
    rating: "4.9",
    badge: null,
    badgeSolid: false,
    href: "/chale-borboletas",
  },
];

export default function Suites() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".suite-card");
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: i * 0.12, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } }
      );
    });
    sectionRef.current?.querySelectorAll(".vc-reveal")?.forEach(el => {
      gsap.fromTo(el, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
  }, []);

  return (
    <section id="chales" ref={sectionRef} className="vc-container vc-container--wide" style={{ padding: "var(--section-y-tight) var(--gutter) var(--section-y)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
        <div>
          <div className="vc-eyebrow vc-reveal" style={{ marginBottom: "0.5rem" }}>Os chalés</div>
          <h2 className="vc-reveal" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h1)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--text-strong)", marginTop: "0.5rem" }}>
            Um vale, três refúgios e infinitas memórias
          </h2>
        </div>
        <a href="#" className="vc-reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-body)", border: "1px solid var(--border-soft)", padding: "10px 20px", borderRadius: "var(--radius-pill)", transition: "var(--tr-fast)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold-500)"; (e.currentTarget as HTMLElement).style.color = "var(--gold-400)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-soft)"; (e.currentTarget as HTMLElement).style.color = "var(--text-body)"; }}>
          Ver todos os chalés {I.arrow}
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(1.2rem, 2vw, 2rem)" }}>
        {SUITES.map(suite => (
          <div key={suite.id} className="suite-card" style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-card)", boxShadow: "var(--card-shadow)", overflow: "hidden", cursor: "pointer", transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)" }}
            onMouseEnter={e => { const c = e.currentTarget as HTMLElement; c.style.transform = "translateY(-2px)"; c.style.boxShadow = "var(--card-shadow-hover)"; const img = c.querySelector(".suite-img") as HTMLElement; if (img) img.style.transform = "scale(1.06)"; }}
            onMouseLeave={e => { const c = e.currentTarget as HTMLElement; c.style.transform = "translateY(0)"; c.style.boxShadow = "var(--card-shadow)"; const img = c.querySelector(".suite-img") as HTMLElement; if (img) img.style.transform = "scale(1)"; }}>

            {/* Media */}
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
              <div className="suite-img" style={{ position: "absolute", inset: 0, backgroundImage: `url(${suite.img})`, backgroundSize: "cover", backgroundPosition: (suite as any).imgPos || "center", transition: "transform var(--dur-slow) var(--ease-out)" }} />
              {suite.badge && (
                <div style={{ position: "absolute", top: 14, left: 14, zIndex: 3, padding: "4px 12px", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", background: suite.badgeSolid ? "var(--gold-500)" : "rgba(200,168,106,0.18)", color: suite.badgeSolid ? "var(--text-onGold)" : "var(--gold-300)", border: suite.badgeSolid ? "none" : "1px solid var(--border-gold)", backdropFilter: "var(--blur-md)" }}>
                  {suite.badge}
                </div>
              )}
              {/* Vista chip */}
              <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, zIndex: 3, padding: "8px 12px", borderRadius: "var(--radius-md)", background: "color-mix(in srgb, var(--forest-950) 65%, transparent)", backdropFilter: "var(--blur-md)", WebkitBackdropFilter: "var(--blur-md)", border: "1px solid var(--border-soft)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-300)" }}>{suite.view}</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h4)", color: "var(--text-strong)", letterSpacing: "-0.01em" }}>{suite.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                  {I.star}<span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--gold-400)", fontWeight: 700 }}>{suite.rating}</span>
                </div>
              </div>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5, marginTop: "-0.3rem" }}>{suite.viewDesc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {suite.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent-green)", background: "rgba(70,144,116,0.1)", border: "1px solid rgba(70,144,116,0.2)", borderRadius: "var(--radius-pill)", padding: "4px 10px" }}>{tag}</span>
                ))}
              </div>
              <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
                <a href={suite.href} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-onGold)", background: "var(--gold-500)", padding: "11px 20px", borderRadius: "var(--radius-pill)", transition: "var(--tr-fast)", textAlign: "center" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-400)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-500)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  Ver este chalé {I.arrow}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
