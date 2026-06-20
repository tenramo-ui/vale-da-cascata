"use client";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });
const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const Intro = dynamic(() => import("./components/Intro"), { ssr: false });
const Suites = dynamic(() => import("./components/Suites"), { ssr: false });
const Experiences = dynamic(() => import("./components/Experiences"), { ssr: false });
const Eventos = dynamic(() => import("./components/Eventos"), { ssr: false });
const Restaurante = dynamic(() => import("./components/Restaurante"), { ssr: false });
const Serra = dynamic(() => import("./components/Serra"), { ssr: false });
const Testimonial = dynamic(() => import("./components/TestimonialCTA").then(m => ({ default: m.Testimonial })), { ssr: false });
const CTA = dynamic(() => import("./components/TestimonialCTA").then(m => ({ default: m.CTA })), { ssr: false });
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Suites />
        <Experiences />
        <Eventos />
        <Restaurante />
        <Serra />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
