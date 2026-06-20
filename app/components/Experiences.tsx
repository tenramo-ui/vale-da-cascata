"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  { name: "A cascata", meta: "100m de queda", img: "/cachoeira-nova.webp" },
  { name: "Hidromassagem", meta: "Deck com vista", img: "/cascata-hidromassagem.webp" },
  { name: "Arquitetura A-frame", meta: "Vidro e madeira", img: "/cascata-exterior.webp" },
  { name: "Interior aconchegante", meta: "Estar com vista", img: "/cascata-vista.webp" },
];

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".exp-card");
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    });
    const headEls = sectionRef.current?.querySelectorAll(".vc-reveal");
    headEls?.forEach(el => {
      gsap.fromTo(el,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="o-vale" style={{ position: "relative", padding: "var(--section-y) 0", overflow: "hidden" }}
    >
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(/lago.webp)",
        backgroundSize: "cover", backgroundPosition: "center", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg, rgba(10,23,17,0.82), rgba(10,23,17,0.72))",
      }} />

      <div className="vc-container vc-container--wide" style={{ position: "relative", zIndex: 2 }}>
        <div className="vc-eyebrow vc-reveal" style={{ color: "var(--gold-300)", marginBottom: "0.5rem" }}>
          O refúgio
        </div>
        <h2
          className="vc-reveal"
          style={{
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-h1)",
            lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--text-strong)",
            maxWidth: "16ch", marginTop: "0.5rem",
          }}
        >
          Cabanas exclusivas cercadas por mata nativa, trilhas, cachoeira, lago, haras e experiências autênticas para quem busca descanso, aventura e conexão com o essencial
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.1rem",
          marginTop: "3rem",
        }}>
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.name}
              className="exp-card"
              style={{
                position: "relative",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                aspectRatio: "3/4",
                cursor: "pointer",
                border: "1px solid var(--border-soft)",
              }}
              onMouseEnter={e => {
                const img = (e.currentTarget as HTMLElement).querySelector(".exp-img") as HTMLElement;
                if (img) img.style.transform = "scale(1.07)";
              }}
              onMouseLeave={e => {
                const img = (e.currentTarget as HTMLElement).querySelector(".exp-img") as HTMLElement;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <div
                className="exp-img"
                style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${exp.img})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  transition: "transform var(--dur-slow) var(--ease-out)",
                }}
              />
              {/* Veil */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(0deg, rgba(10,23,17,0.92) 0%, rgba(10,23,17,0) 55%)",
              }} />
              {/* Caption */}
              <div style={{
                position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 2,
                display: "flex", flexDirection: "column", gap: 2,
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-md)",
                  color: "var(--mist-50)",
                }}>
                  {exp.name}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--gold-300)",
                }}>
                  {exp.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
