"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  ["3", "chalés"],
  ["100m", "de cascata"],
  ["530m", "de altitude"],
  ["15km", "de Chapecó"],
];

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".vc-reveal");
    els?.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });
  }, []);

  return (
    <section id="inicio" ref={sectionRef} className="vc-container vc-container--narrow" style={{ padding: "var(--section-y) var(--gutter)", textAlign: "center" }}>
      <p className="vc-reveal" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.6rem, 3.4vw, 2.75rem)", lineHeight: 1.32, letterSpacing: "-0.02em", color: "var(--text-strong)", textWrap: "balance" } as React.CSSProperties}>
        Um refúgio cercado pela natureza, onde o <em style={{ fontStyle: "normal", color: "var(--accent)" }}>conforto encontra paisagens de tirar o fôlego.</em>
      </p>
      <p className="vc-reveal" style={{ marginTop: "1.5rem", fontSize: "var(--text-md)", lineHeight: 1.75, color: "var(--text-muted)", maxWidth: "58ch", margin: "1.5rem auto 0", textWrap: "pretty" } as React.CSSProperties}>
        Localizado em meio a mata nativa, cachoeiras, riachos e belas paisagens, o Vale da Cascata
        oferece uma experiência única para quem deseja desacelerar, descansar e viver momentos inesquecíveis.
        Nossas acomodações foram cuidadosamente preparadas para proporcionar conforto, privacidade e conexão
        com a natureza. Cada espaço possui características próprias, permitindo que você escolha a experiência
        ideal para sua viagem. Aqui, os dias começam com o som da água correndo pela cascata e terminam
        contemplando um céu estrelado, longe da correria e do estresse do cotidiano.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(2rem, 6vw, 5rem)", marginTop: "3.5rem" }}>
        {stats.map(([num, label], i) => (
          <div key={num} className="vc-reveal" style={{ display: "flex", flexDirection: "column", gap: 4, transitionDelay: `${i * 80}ms` }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--text-strong)", letterSpacing: "-0.02em" }}>{num}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-faint)" }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
