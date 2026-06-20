"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BookingModal from "./BookingModal";

const I = {
  cal: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={20} height={20}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round"/></svg>),
  guests: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={20} height={20}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 6M20.5 20a5.5 5.5 0 0 0-3.5-5.1" strokeLinecap="round"/></svg>),
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLCanvasElement>(null);
  const treesRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const bookbarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // ── Ripple / water shimmer on canvas ──────────────────────
    const canvas = waterRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let W = canvas.width = canvas.offsetWidth;
      let H = canvas.height = canvas.offsetHeight;
      let t = 0;
      let animId: number;

      const draw = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);
        // Horizontal ripple bands — simulate water flow
        for (let i = 0; i < 7; i++) {
          const y = H * 0.52 + i * 18 + Math.sin(t * 0.6 + i * 0.9) * 6;
          const alpha = 0.04 + Math.sin(t * 0.4 + i) * 0.02;
          const grad = ctx.createLinearGradient(0, y - 4, 0, y + 4);
          grad.addColorStop(0, `rgba(255,255,255,0)`);
          grad.addColorStop(0.5, `rgba(255,255,255,${alpha})`);
          grad.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          for (let x = 0; x <= W; x += 2) {
            const yOff = Math.sin((x / W) * Math.PI * 4 + t * 1.2 + i) * 4;
            if (x === 0) ctx.moveTo(x, y + yOff);
            else ctx.lineTo(x, y + yOff);
          }
          ctx.lineTo(W, y + 8); ctx.lineTo(0, y + 8);
          ctx.closePath();
          ctx.fill();
        }
        // Sparkle dots on water surface
        for (let s = 0; s < 12; s++) {
          const sx = (Math.sin(t * 0.3 + s * 1.7) * 0.5 + 0.5) * W;
          const sy = H * 0.5 + Math.sin(t * 0.5 + s * 2.3) * 20 + s * 5;
          const sa = (Math.sin(t * 1.1 + s * 0.7) * 0.5 + 0.5) * 0.18;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,200,140,${sa})`;
          ctx.fill();
        }
        t += 0.018;
        animId = requestAnimationFrame(draw);
      };
      draw();

      const onResize = () => {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
      };
      window.addEventListener("resize", onResize);
      return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
    }
  }, []);

  useEffect(() => {
    // ── Parallax scroll ───────────────────────────────────────
    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.28}px) scale(1.08)`;
      if (treesRef.current) treesRef.current.style.transform = `translateY(${y * 0.08}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Mouse parallax on trees layer ────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const dx = (e.clientX / innerWidth - 0.5) * 18;
      const dy = (e.clientY / innerHeight - 0.5) * 8;
      if (treesRef.current) {
        gsap.to(treesRef.current, { x: dx, y: dy, duration: 1.4, ease: "power2.out" });
      }
      if (bgRef.current) {
        gsap.to(bgRef.current, { x: dx * 0.3, duration: 2, ease: "power2.out" });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Entrance animation ────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(eyebrowRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.3")
      .fromTo(leadRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(bookbarRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section id="inicio" ref={sectionRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", paddingBottom: "clamp(3rem,8vh,7rem)", overflow: "hidden" }}>

      {/* BG photo */}
      <div ref={bgRef} style={{ position: "absolute", inset: "-8% 0", backgroundImage: "url(/cachoeira.webp)", backgroundSize: "cover", backgroundPosition: "center", willChange: "transform", zIndex: 0 }} />

      {/* Trees parallax layer — masked overlay of tree tops */}
      <div ref={treesRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", willChange: "transform" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "45%",
          backgroundImage: "url(/cachoeira.webp)",
          backgroundSize: "cover", backgroundPosition: "center top",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          filter: "blur(0px)",
        }} />
      </div>

      {/* Water ripple canvas */}
      <canvas ref={waterRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }} />

      {/* Veil */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, background: `linear-gradient(180deg, rgba(10,23,17,0.45) 0%, rgba(10,23,17,0) 28%), linear-gradient(0deg, rgba(10,23,17,0.95) 4%, rgba(10,23,17,0.35) 38%, rgba(10,23,17,0) 70%)` }} />

      {/* Content */}
      <div className="vc-container vc-container--wide" style={{ position: "relative", zIndex: 4, width: "100%" }}>
        <div ref={eyebrowRef} className="vc-eyebrow" style={{ marginBottom: "1rem" }}>
          Vale particular · Guatambu-SC · 530m
        </div>
        <h1 ref={titleRef} style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--text-hero)", lineHeight: 0.92, letterSpacing: "var(--tracking-tightest)", color: "var(--mist-50)", margin: "0.35em 0 0" }}>
          Vale da Cascata
        </h1>
        <p ref={leadRef} style={{ maxWidth: "42ch", marginTop: "1.4rem", fontSize: "clamp(1.05rem,1.5vw,1.35rem)", lineHeight: 1.55, color: "var(--mist-100)" }}>
          Um refúgio de experiências em meio à natureza.
        </p>

        {/* Booking bar */}
        <div ref={bookbarRef} style={{ marginTop: "2.4rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", padding: "0.7rem 0.7rem 0.7rem 1.1rem", borderRadius: "var(--radius-xl)", background: "color-mix(in srgb, var(--forest-950) 55%, transparent)", backdropFilter: "var(--blur-md)", WebkitBackdropFilter: "var(--blur-md)", border: "1px solid var(--border-soft)", boxShadow: "var(--shadow-lg)" }}>
          {[["Chegada","Sex, 18 jul"],["Saída","Dom, 20 jul"]].map(([lbl,val]) => (
            <div key={lbl} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button onClick={() => setModalOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", background: "none", border: "none", cursor: "pointer", padding: "0.45rem 0.9rem", borderRadius: "var(--radius-md)", transition: "var(--tr-fast)", textAlign: "left" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--field-bg)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "none"}>
                <span style={{ color: "var(--gold-400)", display: "inline-flex" }}>{I.cal}</span>
                <span>
                  <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)" }}>{lbl}</span>
                  <span style={{ display: "block", fontSize: "var(--text-base)", fontWeight: 600, color: "var(--mist-50)", marginTop: 1 }}>{val}</span>
                </span>
              </button>
              <span style={{ width: 1, height: 30, background: "var(--border-soft)" }} />
            </div>
          ))}
          <button onClick={() => setModalOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", background: "none", border: "none", cursor: "pointer", padding: "0.45rem 0.9rem", borderRadius: "var(--radius-md)", transition: "var(--tr-fast)", textAlign: "left" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--field-bg)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "none"}>
            <span style={{ color: "var(--gold-400)", display: "inline-flex" }}>{I.guests}</span>
            <span>
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)" }}>Hóspedes</span>
              <span style={{ display: "block", fontSize: "var(--text-base)", fontWeight: 600, color: "var(--mist-50)", marginTop: 1 }}>2 hóspedes</span>
            </span>
          </button>
          <button onClick={() => setModalOpen(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-base)", color: "var(--text-onGold)", background: "var(--gold-500)", padding: "12px 24px", borderRadius: "var(--radius-pill)", transition: "var(--tr-fast)", border: "none", cursor: "pointer" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-400)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-gold)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold-500)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            Buscar {I.arrow}
          </button>
        </div>
      </div>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Scroll cue */}
      <div style={{ position: "absolute", left: "50%", bottom: 26, transform: "translateX(-50%)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mist-200)" }}>
        <span>Role para explorar</span>
        <i style={{ display: "block", width: 1, height: 38, background: "linear-gradient(var(--gold-400), transparent)", animation: "vc-cue 2s var(--ease-in-out) infinite", transformOrigin: "top" }} />
      </div>
    </section>
  );
}