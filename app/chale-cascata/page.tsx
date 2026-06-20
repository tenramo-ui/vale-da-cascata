"use client";
import dynamic from "next/dynamic";
const ChaleDetail = dynamic(() => import("../components/ChaleDetail"), { ssr: false });

const data = {
  name: "Chalé da Cascata",
  emoji: "💧",
  tagline: "Vista exclusiva de frente para a cachoeira — romantismo e natureza em cada detalhe.",
  desc: [
    "O Chalé da Cascata foi criado para casais que desejam viver momentos inesquecíveis em um cenário único. Posicionado de frente para a cachoeira, oferece a vista mais impressionante da propriedade e uma experiência marcada pelo romantismo e pela conexão com a natureza.",
    "O som constante da água, a beleza da cascata e a sensação de exclusividade transformam cada estadia em uma experiência memorável. Seu grande diferencial é a vista privilegiada de frente para a cachoeira, permitindo contemplar a força e a beleza da natureza sem sair do chalé.",
    "Na área externa, a hidromassagem privativa proporciona momentos de relaxamento com uma vista única. O balanço para casal, posicionado de frente para a cascata, é um dos locais mais especiais da propriedade para contemplar a paisagem e criar lembranças inesquecíveis.",
    "O chalé conta com um quarto, ar-condicionado, Wi-Fi de alta velocidade, Smart TV com TV a cabo e acesso às principais plataformas de streaming, além de cozinha completa equipada com geladeira, fogão, micro-ondas, chaleira elétrica e utensílios. Também dispõe de fire pit, estacionamento privativo, check-in autônomo, aceita pets e disponibiliza cesta de café da manhã.",
  ],
  view: "Vista frontal para a cascata",
  heroImg: "/cascata-exterior.webp",
  photos: ["/cascata-exterior.webp", "/cascata-aerial.webp", "/cascata-sala.webp", "/cascata-quarto.webp", "/cascata-estar.webp", "/cascata-vista.webp", "/cascata-vista2.webp", "/cascata-hidromassagem.webp"],
  price: 750,
  capacity: "Para casal",
  highlights: [
    "Vista exclusiva de frente para a cachoeira",
    "Hidromassagem externa privativa",
    "Balanço para casal com vista para a cascata",
    "Ambiente romântico",
    "Fire pit",
    "Cozinha completa",
    "Wi-Fi de alta velocidade",
    "Smart TV com TV a cabo e streaming",
    "Pet friendly",
    "Ideal para casais",
    "Experiência única em meio à natureza",
    "Check-in autônomo",
  ],
  rating: "4.9",
  reviews: 164,
};

export default function Page() { return <ChaleDetail {...data} />; }
