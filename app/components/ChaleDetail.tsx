"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface ChaleDetailProps {
  name: string;
  emoji: string;
  tagline: string;
  desc: string[];
  view: string;
  heroImg: string;
  photos: string[];
  price: number;
  capacity: string;
  highlights: string[];
  rating: string;
  reviews: number;
}

const I = {
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  back: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}><path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width={13} height={13}><polyline points="20 6 9 17 4 12"/></svg>),
  star: (<svg viewBox="0 0 24 24" fill="var(--gold-500)" width={16} height={16}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>),
  whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>),
  map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={16} height={16}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  pet: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={14} height={14}><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703.383 1.297.95 1.684.83.566 2.068.566 3.1 0 1.35-.783 3.45-.783 4.8 0 1.032.566 2.27.566 3.1 0 .567-.387.87-.981.95-1.684.113-.994-1.177-6.53-4-7-1.923-.321-3.5.782-3.5 2.172"/><path d="M14.5 10c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5"/><circle cx="12" cy="17" r="3"/></svg>),
};

const navLinks = [
  { label: "Início",      href: "/#inicio" },
  { label: "Chalés",      href: "/#chales" },
  { label: "O vale",      href: "/#o-vale" },
  { label: "Eventos",     href: "/#eventos" },
  { label: "Restaurante", href: "/#restaurante" },
  { label: "Haras",       href: "/#haras" },
  { label: "Contato",     href: "/#contato" },
];

function brl(n: number) { return "R$ " + n.toLocaleString("pt-BR"); }

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: "power3.out" });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={navRef} style={{ position: "fixed", inset: "0 0 auto 0", zIndex: 200, padding: scrolled ? "10px clamp(1rem,4vw,2.5rem)" : "18px clamp(1rem,4vw,2.5rem)", transition: "padding 280ms, background 280ms", background: scrolled ? "color-mix(in srgb, var(--forest-950) 88%, transparent)" : "color-mix(in srgb, var(--forest-950) 70%, transparent)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none" }}>
      <div style={{ maxWidth: "var(--container-full)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, textDecoration: "none" }}>
          <Image src="/logo-mark.png" alt="Vale da Cascata" width={36} height={36} style={{ height: 36, width: "auto" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", color: "var(--text-strong)" }}>Vale da Cascata</span>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "1.4rem" }} className="nav-desktop">
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--text-muted)", transition: "color 180ms", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--gold-400)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a href="https://wa.me/5549991832114" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-onGold)", background: "var(--gold-500)", padding: "10px 22px", borderRadius: "var(--radius-pill)", transition: "all 180ms", flexShrink: 0 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-400)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-500)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
          Reservar
        </a>
      </div>
      <style jsx>{`@media (max-width: 900px) { .nav-desktop { display: none !important; } }`}</style>
    </header>
  );
}

export default function ChaleDetail(props: ChaleDetailProps) {
  const { name, emoji, tagline, desc, view, heroImg, photos, price, capacity, highlights, rating, reviews } = props;
  const [activePhoto, setActivePhoto] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" });
    const children = contentRef.current ? Array.from(contentRef.current.children) : [];
    gsap.fromTo(children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.4 });
  }, []);

  return (
    <>
      <NavBar />
      <main style={{ background: "var(--surface-base)", minHeight: "100vh" }}>

        {/* Hero */}
        <div ref={heroRef} style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,23,17,0.92) 0%, rgba(10,23,17,0.2) 60%)" }} />
          <div className="vc-container vc-container--wide" style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "3rem" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "var(--text-sm)", marginBottom: "1.5rem", transition: "color 180ms", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--gold-400)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
              {I.back} Voltar ao início
            </Link>
            <div className="vc-eyebrow" style={{ marginBottom: "0.5rem", color: "var(--gold-300)" }}>{view} · Guatambu-SC</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--text-h1)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--mist-50)" }}>
              {emoji} {name}
            </h1>
            <p style={{ marginTop: "0.75rem", fontSize: "var(--text-lg)", color: "var(--mist-200)", maxWidth: "48ch" }}>{tagline}</p>
          </div>
        </div>

        {/* Body */}
        <div ref={contentRef} className="vc-container vc-container--wide" style={{ padding: "4rem var(--gutter)" }}>
          <div className="chale-content-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }}>

            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              {/* Description paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {desc.map((p, i) => (
                  <p key={i} style={{ fontSize: "var(--text-md)", lineHeight: 1.75, color: i === 0 ? "var(--text-body)" : "var(--text-muted)" }}>{p}</p>
                ))}
              </div>

              {/* Gallery */}
              <div>
                <div style={{ position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "16/9", marginBottom: "0.75rem" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${photos[activePhoto]})`, backgroundSize: "cover", backgroundPosition: "center", transition: "all 0.5s var(--ease-out)" }} />
                  {photos.length > 1 && (
                    <>
                      <button onClick={() => setActivePhoto(p => (p - 1 + photos.length) % photos.length)}
                        style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(10,23,17,0.6)", border: "1px solid var(--border-soft)", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "var(--mist-50)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
                        ‹
                      </button>
                      <button onClick={() => setActivePhoto(p => (p + 1) % photos.length)}
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(10,23,17,0.6)", border: "1px solid var(--border-soft)", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "var(--mist-50)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
                        ›
                      </button>
                    </>
                  )}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {photos.map((p, i) => (
                    <button key={i} onClick={() => setActivePhoto(i)}
                      style={{ width: 64, height: 48, borderRadius: "var(--radius-sm)", overflow: "hidden", border: i === activePhoto ? "2px solid var(--gold-500)" : "2px solid transparent", padding: 0, cursor: "pointer", flexShrink: 0, transition: "border-color 180ms" }}>
                      <div style={{ width: "100%", height: "100%", backgroundImage: `url(${p})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h3)", color: "var(--text-strong)", marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>
                  🌟 Destaques
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                  {highlights.map(h => (
                    <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)", background: "rgba(70,144,116,0.07)", border: "1px solid rgba(70,144,116,0.15)" }}>
                      <span style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: 2 }}>{I.check}</span>
                      <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h4)", color: "var(--text-strong)", marginBottom: "0.75rem" }}>📍 Localização</h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  Vale da Cascata · Guatambu, SC · a 15km de Chapecó
                </p>
                <a href="https://maps.app.goo.gl/38wqgft7NZXYNhvn6?g_st=iw" target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-sm)", color: "var(--gold-400)", fontWeight: 500 }}>
                  {I.map} Ver no mapa {I.arrow}
                </a>
              </div>
            </div>

            {/* Right — sticky booking */}
            <div className="chale-sidebar" style={{ position: "sticky", top: "100px" }}>
              <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-soft)", borderRadius: "var(--radius-xl)", padding: "2rem", boxShadow: "var(--shadow-xl)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: "0.3rem" }}>
                  {[1,2,3,4,5].map(i => <span key={i}>{I.star}</span>)}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--gold-400)", marginLeft: 4 }}>{rating} · {reviews} avaliações</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--text-strong)", letterSpacing: "-0.02em", marginBottom: "0.2rem" }}>
                  {brl(price)}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.75rem" }}>
                  por diária · {capacity}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a href="https://wa.me/5549991832114" target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-base)", color: "var(--text-onGold)", background: "var(--gold-500)", padding: "14px 20px", borderRadius: "var(--radius-pill)", transition: "all 180ms" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-400)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-500)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                    {I.whatsapp} Reservar agora
                  </a>
                  <p style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", fontFamily: "var(--font-mono)" }}>Você ainda não será cobrado</p>
                  <hr style={{ border: "none", borderTop: "1px solid var(--border-subtle)", margin: "0.25rem 0" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {[
                      "Cesta de café da manhã inclusa",
                      "Check-in autônomo",
                      "Estacionamento privativo",
                      "Pet friendly",
                      "Cancelamento flexível (7 dias)",
                    ].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>
                        <span style={{ color: "var(--accent-green)" }}>{I.check}</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer mini */}
      <footer style={{ background: "var(--forest-950)", borderTop: "1px solid var(--border-subtle)", padding: "2rem var(--gutter)", textAlign: "center" }}>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
          © 2026 Vale da Cascata · Guatambu, SC · <a href="https://maps.app.goo.gl/38wqgft7NZXYNhvn6?g_st=iw" target="_blank" rel="noreferrer" style={{ color: "var(--gold-500)" }}>Como chegar</a>
        </p>
      </footer>

      <style jsx global>{`
        @media (max-width: 900px) {
          .chale-content-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .chale-sidebar { position: relative !important; top: 0 !important; }
        }
      `}</style>
    </>
  );
}
