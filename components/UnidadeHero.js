import Image from "next/image";
import Link from "next/link";

export default function UnidadeHero({ title, destaque, faixa, genero, lema, image, alt }) {
    return (
        <section className="hero hero--unidade" aria-labelledby="unidade-titulo">

            {image && (
                <div className="hero-midia">
                    <Image
                        src={image}
                        alt={alt ?? ""}
                        fill
                        priority
                        sizes="(max-width: 720px) 100vw, 62vw"
                        className="hero-imagem"
                    />
                </div>
            )}

            <div className="hero-conteudo">
                <nav aria-label="Você está em" className="hero-breadcrumb">
                    <Link href="/#unidades">Unidades</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{title} {destaque} </span>
                </nav>

                <div className="hero-bloco">
                    <h1 id="unidade-titulo" className="hero-titulo">
                        {title} {destaque && <em>{destaque}</em>}
                    </h1>

                    <p className="hero-eyebrow">
                        {faixa}
                        {genero && ` · Unidade ${genero}`}
                    </p>

                    {lema && <p className="hero-lead">{lema}</p>}
                </div>
            </div>
        </section>
    );
}