"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import BookingModal from "./BookingModal";

const links = [
  { label: "Início",      href: "#inicio" },
  { label: "Chalés",      href: "#chales" },
  { label: "O vale",      href: "#o-vale" },
  { label: "Eventos",     href: "#eventos" },
  { label: "Restaurante", href: "#restaurante" },
  { label: "Haras",       href: "#haras" },
  { label: "Contato",     href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Início");
  const [modalOpen, setModalOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );

    // Scroll-spy: highlight nav link matching the section in view
    const sections = links
      .map(link => ({ label: link.label, el: document.querySelector(link.href) }))
      .filter(s => s.el) as { label: string; el: Element }[];

    const observer = new IntersectionObserver(
      entries => {
        // Pick the entry closest to the top of the viewport that's intersecting
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const match = sections.find(s => s.el === visible[0].target);
          if (match) setActive(match.label);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(s => observer.observe(s.el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    e.preventDefault();
    setActive(label);
    const target = document.querySelector(href);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      ref={navRef}
      style={{
        position: "fixed", inset: "0 0 auto 0", zIndex: "var(--z-nav)",
        padding: scrolled ? "10px clamp(1rem,4vw,2.5rem)" : "18px clamp(1rem,4vw,2.5rem)",
        transition: "padding var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
        background: scrolled ? "color-mix(in srgb, var(--forest-950) 88%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none",
      }}
    >
      <div style={{ maxWidth: "var(--container-full)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        {/* Logo */}
        <a href="#inicio" onClick={e => handleNav(e, "Início", "#inicio")} style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, textDecoration: "none" }}>
          <Image src="/logo-mark.png" alt="Vale da Cascata" width={36} height={36} style={{ height: 36, width: "auto" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-base)", letterSpacing: "-0.01em", color: "var(--text-strong)" }}>
            Vale da Cascata
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.4rem" }} className="nav-desktop">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={e => handleNav(e, link.label, link.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500,
                color: active === link.label ? "var(--gold-400)" : "var(--text-muted)",
                transition: "var(--tr-color)", padding: "4px 0", position: "relative",
                textDecoration: "none",
              }}
              onMouseEnter={e => { if (active !== link.label) (e.currentTarget as HTMLElement).style.color = "var(--text-strong)"; }}
              onMouseLeave={e => { if (active !== link.label) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              {link.label}
              {active === link.label && (
                <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 1, background: "var(--grad-gold-sheen)" }} />
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => setModalOpen(true)}
          style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-onGold)", background: "var(--gold-500)", padding: "10px 22px", borderRadius: "var(--radius-pill)", transition: "var(--tr-fast)", flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-400)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-500)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
        >
          Reservar
        </button>
      </div>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <style jsx>{`
        @media (max-width: 900px) { .nav-desktop { display: none !important; } }
      `}</style>
    </header>
  );
}
