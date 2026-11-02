import { notFound } from "next/navigation";
import Link from "next/link";
import GaleriaFotos from "@/components/GaleriaFotos";
import { getContent, listContent } from "@/lib/content.mjs";

export async function generateStaticParams() {
    const eventos = await listContent("eventos");
    return eventos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const evento = await getContent("eventos", slug);

    return evento
        ? { title: evento.frontmatter.title }
        : { title: "Evento não encontrado" };
}

export default async function EventoPage({ params }) {
    const { slug } = await params;
    const evento = await getContent("eventos", slug);

    if (!evento) notFound();

    const { frontmatter, content } = evento;
    const imagens = [...content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map(
        ([, alt, src]) => ({ alt, src })
    );

    return (
        <main className="evento-pagina">
            <header
                className="evento-hero"
                style={{
                    backgroundImage: `linear-gradient(90deg, rgba(8, 24, 31, 0.48), rgba(8, 24, 31, 0.04) 78%), linear-gradient(to top, rgba(8, 24, 31, 0.94), rgba(8, 24, 31, 0.08) 70%), url("${frontmatter.image}")`,
                }}
            >
                <nav className="evento-breadcrumb" aria-label="Você está em">
                    <Link href="/#eventos">Galeria</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{frontmatter.title}</span>
                </nav>

                <div className="evento-hero-conteudo">
                    {frontmatter.date && (
                        <p className="evento-data">{frontmatter.date}</p>
                    )}

                    <h1>{frontmatter.title}</h1>

                    <div className="evento-detalhes">
                        {frontmatter.location && (
                            <span className="evento-local">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M3 6.5 8 4l8 2.5L21 4v13.5L16 20l-8-2.5L3 20V6.5Z" />
                                    <path d="M8 4v13.5M16 6.5V20" />
                                </svg>
                                {frontmatter.location}
                            </span>
                        )}
                        {frontmatter.photoCount && (
                            <span className="evento-fotos">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M3 7h6l2 2h10v10H3z" />
                                    <path d="M3 7V5h7l2 2" />
                                </svg>
                                {frontmatter.photoCount} fotos
                            </span>
                        )}
                    </div>
                </div>
            </header>

            <section className="evento-galeria" aria-labelledby="evento-galeria-titulo">
                <div className="evento-galeria-topo">
                    <h2 id="evento-galeria-titulo">Momentos do evento</h2>
                    {frontmatter.photoCount && (
                        <p>Seleção · {frontmatter.photoCount} fotos</p>
                    )}
                </div>
                {imagens.length > 0 ? (
                    <GaleriaFotos imagens={imagens} />
                ) : (
                    <p className="evento-galeria-vazia">As fotos deste evento serão adicionadas em breve.</p>
                )}
            </section>
        </main>
    );
}
