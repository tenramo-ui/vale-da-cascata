"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const I = {
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={18} height={18}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
  users: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={18} height={18}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/></svg>),
  star2: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={18} height={18}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
};

export default function Eventos() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.querySelectorAll(".vc-reveal")?.forEach((el, i) => {
      gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
  }, []);

  return (
    <section ref={sectionRef} id="eventos" style={{ background: "var(--forest-900)", padding: "var(--section-y) 0", overflow: "hidden" }}>
      <div className="vc-container vc-container--wide">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "4rem", flexWrap: "wrap" }}>
          <div>
            <div className="vc-eyebrow vc-reveal" style={{ marginBottom: "0.5rem", color: "var(--gold-300)" }}>Eventos</div>
            <h2 className="vc-reveal" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h1)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--text-strong)", marginTop: "0.5rem", maxWidth: "20ch" }}>
              Diga "sim" ao som da cachoeira
            </h2>
            <p className="vc-reveal" style={{ marginTop: "1rem", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--text-muted)", maxWidth: "44ch" }}>
              Em meio à natureza exuberante do Vale da Cascata, nossa capela oferece um cenário encantador para casamentos, renovação de votos e celebrações exclusivas. Um espaço acolhedor para até 30 pessoas, onde cada detalhe torna o momento ainda mais especial.
            </p>
          </div>
          <a href="https://wa.me/5549991832114" target="_blank" rel="noreferrer" className="vc-reveal"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-onGold)", background: "var(--gold-500)", padding: "12px 24px", borderRadius: "var(--radius-pill)", transition: "var(--tr-fast)", flexShrink: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-400)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-500)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            Consultar datas {I.arrow}
          </a>
        </div>

        {/* Photo grid — masonry columns, photos keep their natural (portrait) ratio */}
        <div className="vc-reveal eventos-masonry">
          <div className="eventos-photo">
            <img src="/capela-exterior.webp" alt="Capela — exterior, luz natural" loading="lazy" />
            <div className="eventos-caption-overlay">
              <span>Exterior · luz natural</span>
            </div>
          </div>
          <div className="eventos-photo">
            <img src="/capela-interior.webp" alt="Capela — interior" loading="lazy" />
            <div className="eventos-caption-overlay">
              <span>Interior</span>
            </div>
          </div>
          <div className="eventos-photo">
            <img src="/capela-noite.webp" alt="Capela — cerimônia noturna" loading="lazy" />
            <div className="eventos-caption-overlay">
              <span>Cerimônia noturna</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "2rem", marginTop: "3rem" }}>
          {[
            { icon: I.users, title: "Até 30 pessoas", desc: "Capacidade íntima para celebrações exclusivas" },
            { icon: I.heart, title: "À beira da cascata", desc: "Ao som constante da água, em meio à mata nativa" },
            { icon: I.star2, title: "Cerimônias & eventos", desc: "Casamentos, renovações de votos e ocasiões especiais" },
          ].map(f => (
            <div key={f.title} className="vc-reveal" style={{ padding: "1.5rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)" }}>
              <span style={{ color: "var(--gold-400)", display: "block", marginBottom: "0.75rem" }}>{f.icon}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h4)", color: "var(--text-strong)", marginBottom: "0.4rem" }}>{f.title}</h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .eventos-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          align-items: start;
        }
        .eventos-photo {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          line-height: 0;
        }
        .eventos-photo img {
          display: block;
          width: 100%;
          height: auto;
        }
        .eventos-caption-overlay {
          position: absolute;
          left: 16px;
          bottom: 16px;
          right: 16px;
          z-index: 2;
        }
        .eventos-caption-overlay span {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-300);
          background: rgba(10,23,17,0.55);
          padding: 4px 10px;
          border-radius: 4px;
          backdrop-filter: blur(6px);
        }
        .eventos-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(10,23,17,0.55) 0%, rgba(10,23,17,0) 40%);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .eventos-masonry { grid-template-columns: 1fr 1fr; }
          .eventos-masonry .eventos-photo:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .eventos-masonry { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
