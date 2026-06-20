"use client";
import dynamic from "next/dynamic";
const ChaleDetail = dynamic(() => import("../components/ChaleDetail"), { ssr: false });

const data = {
  name: "Chalé Vale da Cascata",
  emoji: "🌊",
  tagline: "O maior chalé da propriedade — espaço, conforto e vista para o lago para famílias e grupos.",
  desc: [
    "O Chalé do Lago é a maior acomodação da propriedade, ideal para famílias, grupos de amigos e casais que desejam mais espaço sem abrir mão do conforto e da conexão com a natureza.",
    "Com capacidade para até 6 hóspedes e dois quartos, oferece uma experiência completa em um ambiente acolhedor, cercado por belas paisagens e com vista para o lago e para a natureza. Seu principal diferencial é a amplitude dos ambientes, proporcionando mais conforto para quem busca compartilhar momentos especiais com a família ou amigos.",
    "Na área externa, os hóspedes podem relaxar na hidromassagem externa privativa, apreciar o pôr do sol, reunir-se ao redor do fire pit sob um céu estrelado ou aproveitar a churrasqueira para confraternizações ao ar livre.",
    "O chalé conta ainda com varanda, jardim, ar-condicionado, Wi-Fi de alta velocidade, Smart TV com TV a cabo e acesso às principais plataformas de streaming, além de cozinha completa equipada com geladeira, fogão, micro-ondas, chaleira elétrica e utensílios para preparo de refeições. Para maior comodidade, oferece check-in autônomo, estacionamento privativo, aceita pets e disponibiliza cesta de café da manhã.",
  ],
  view: "Vista para o lago",
  heroImg: "/chale-exterior.webp",
  photos: ["/chale-exterior.webp", "/chale-aerial.webp", "/lago.webp", "/quarto-janela.webp", "/quarto-noite.webp", "/cozinha.webp", "/sala.webp"],
  price: 1000,
  capacity: "Até 6 pessoas",
  highlights: [
    "Maior chalé da propriedade",
    "Dois quartos",
    "Capacidade para até 6 hóspedes",
    "Hidromassagem externa privativa",
    "Vista para o lago e para a natureza",
    "Churrasqueira privativa",
    "Fire pit",
    "Varanda e jardim",
    "Cozinha completa",
    "Wi-Fi de alta velocidade",
    "Smart TV com TV a cabo e streaming",
    "Pet friendly",
  ],
  rating: "5.0",
  reviews: 128,
};

export default function Page() { return <ChaleDetail {...data} />; }
