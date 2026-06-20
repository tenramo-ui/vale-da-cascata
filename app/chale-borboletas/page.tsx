"use client";
import dynamic from "next/dynamic";
const ChaleDetail = dynamic(() => import("../components/ChaleDetail"), { ssr: false });

const data = {
  name: "Chalé das Borboletas",
  emoji: "🌿",
  tagline: "Charmoso, acolhedor e cercado pela natureza — um convite para desacelerar.",
  desc: [
    "Charmoso, acolhedor e cercado pela natureza, o Chalé das Borboletas é um convite para desacelerar e apreciar os pequenos detalhes da vida.",
    "Localizado junto a um bosque visitado por diversas espécies de borboletas, proporciona uma experiência única de tranquilidade, contemplação e conexão com o ambiente natural. Sua varanda voltada para o bosque permite observar a natureza de perto, ouvir o canto dos pássaros e desfrutar de momentos de paz em um cenário encantador.",
    "Embora seja o menor chalé da propriedade, mantém o mesmo padrão de conforto, cuidado e bom gosto presente em todas as acomodações. Seu ambiente aconchegante foi pensado especialmente para casais que buscam descanso e privacidade.",
    "O chalé conta com ar-condicionado, Wi-Fi de alta velocidade, Smart TV com TV a cabo e acesso às principais plataformas de streaming, além de cozinha funcional equipada com frigobar, fogão, micro-ondas, chaleira elétrica e utensílios. Também oferece fire pit, estacionamento privativo, check-in autônomo, aceita pets e disponibiliza cesta de café da manhã.",
  ],
  view: "Vista para o bosque das borboletas",
  heroImg: "/borboletas-aframe.webp",
  photos: ["/borboletas-aframe.webp", "/borboletas-exterior.webp", "/borboletas-aerial.webp", "/borboletas-sala.webp", "/borboletas-quarto.webp", "/borboletas-janela.webp", "/borboletas-detalhe.webp"],
  price: 600,
  capacity: "Para casal · até 3 pessoas",
  highlights: [
    "Vista para o bosque das borboletas",
    "Varanda integrada à natureza",
    "Ambiente acolhedor e intimista",
    "Fire pit",
    "Frigobar",
    "Cozinha funcional",
    "Wi-Fi de alta velocidade",
    "Smart TV com TV a cabo e streaming",
    "Pet friendly",
    "Ideal para casais",
    "Contato direto com a natureza",
    "Check-in autônomo",
  ],
  rating: "4.9",
  reviews: 92,
};

export default function Page() { return <ChaleDetail {...data} />; }
