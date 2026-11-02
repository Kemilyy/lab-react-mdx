import Image from "next/image";
import Link from "next/link";

export default function Hero({ title, destaque, lead, lema, fundacao, desbravadores, unidades, image, alt, }) {
    const anos = new Date().getFullYear() - Number(fundacao);

    return (
        <section className="hero">
            <Image
                src={image}
                alt={alt}
                fill
                priority
                sizes="(max-width: 720px) 100vw, 62vw"
                className="hero-imagem"
            />

            <div className="hero-conteudo">
                <p className="hero-eyebrow">Desde {fundacao} · {lema}</p>
                <h1 className="hero-titulo">
                    {title} <em>{destaque}</em>
                </h1>

                <p className="hero-lead">{lead}</p>

                <div className="hero-acoes">
                    <Link href="/#clube" className="botao-primario">
                        Conheça o Farol
                    </Link>
                    <Link href="/#galeria" className="hero-link-secundario">
                        Veja nossas aventuras
                    </Link>
                </div>

                <dl className="hero-numeros">
                    <div>
                        <dt>Desbravadores</dt>
                        <dd>{desbravadores}</dd>
                    </div>
                    <div>
                        <dt>Anos de história</dt>
                        <dd>{anos}</dd>
                    </div>
                    <div>
                        <dt>Unidades</dt>
                        <dd>{unidades}</dd>
                    </div>
                </dl>
            </div>
        </section>
    )
}