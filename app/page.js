import { Children } from "react";
import Hero from "./paginas/hero/page";
import Sobre from "./paginas/sobre/page";
import Ideais from "./paginas/ideais/page";
import Unidades from "@/components/CardUnidades";
import CardEventos from "@/components/CardEventos";

const heroData = {
  title: "Uma luz para",
  destaque: "servir.",
  lead: "Fé, aventura e amizade para transformar o mundo — uma boa ação de cada vez.",
  lema: "Formulando cidadãos",
  fundacao: 2008,
  desbravadores: 42,
  unidades: 3,
  image: "/images/paginas/clube/hero.png",
  alt: "Desbravadores caminhando em uma serra com neblina ao amanhecer",
};

const sobreData = {
  titulo: "Mais que um clube",
  destaque: "uma missão.",
  Children: "O Clube de Desbravadores Farol reúne crianças e adolescentes de 10 a 15 anos em uma jornada de crescimento físico, mental e espiritual.",
  pilares: [
    {
      icone: "fisico",
      titulo: "Físico",
      texto: "Desafios e atividades que desenvolvem força, saúde e disposição.",
    },
    {
      icone: "mental",
      titulo: "Mental",
      texto: "Conhecimento e aprendizado que estimulam a criatividade e o raciocínio.",
    },
    {
      icone: "espiritual",
      titulo: "Espiritual",
      texto: "Fé e comunhão com Deus que orientam escolhas e fortalecem valores.",
    },
  ],
};

const ideaisData = {
  title: "Ideais que guiam nossos",
  destaque: "passos",
  ideais: [
    {
      titulo: "Voto",
      texto: "Pela graça de Deus, serei puro, bondoso e leal; guardarei a lei do Desbravador, serei servo de Deus e amigo de todos."
    },
    {
      titulo: "Lei",
      texto: "A Lei do Desbravador ordena-me: observar a devoção matinal, cumprir fielmente a parte que me corresponde, cuidar de meu corpo, manter a consciência limpa, ser cortês e obediente, andar com reverência na casa de Deus, ter sempre um cântico no coração e ir aonde Deus mandar."
    },
    {
      titulo: "Lema",
      texto: "O amor de Deus me motiva",
    },
    {
      titulo: "Alvo",
      texto: "A mensagem do advento a todo mundo em minha geração",
    },
    {
      titulo: "Objetivo",
      texto: "Salvar do pecado e guiar no serviço",
    },
  ],
};

export default function Home() {
  return (
    <>
      <Hero {...heroData} />

      <Sobre titulo={sobreData.titulo} destaque={sobreData.destaque} pilares={sobreData.pilares}>
        <p>{sobreData.Children}</p>
        <p>Somos parte de um movimento mundial da Igreja Adventista do Sétimo Dia, presente em mais de 160 países, que transforma aprendizado em aventura e serviço ao próximo.</p>
      </Sobre>

      <Ideais title={ideaisData.title} destaque={ideaisData.destaque} ideais={ideaisData.ideais}></Ideais>

      <Unidades
        title="Cada idade, uma"
        destaque="nova descoberta."
        lead="Grupos pensados para respeitar cada fase, criar vínculos e desenvolver novas habilidades."
      />

      <section id="eventos" className="eventos">
        <div className="eventos-topo">
          <h2>
            Nossas aventuras,
            <br />
            <em>por evento.</em>
          </h2>

          <p>
            Cada pasta guarda histórias, conquistas e sorrisos que fazem parte da
            nossa caminhada.
          </p>
        </div>

        <CardEventos />
      </section>
    </>
  );
}