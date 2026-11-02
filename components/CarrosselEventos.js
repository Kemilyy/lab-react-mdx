"use client";

import { useRef } from "react";
import Link from "next/link";

export default function CarrosselEventos({ eventos }) {
    const listaRef = useRef(null);

    function rolar(direcao) {
        const lista = listaRef.current;
        if (!lista) return;

        lista.scrollBy({
            left: direcao * lista.clientWidth * 0.8,
            behavior: "smooth",
        });
    }

    return (
        <div className="eventos-carrossel">
            <div className="eventos-controles">
                <button
                    className="eventos-seta eventos-seta--esquerda"
                    type="button"
                    onClick={() => rolar(-1)}
                    aria-label="Ver eventos anteriores"
                >
                    &lt;
                </button>

                <button
                    className="eventos-seta eventos-seta--direita"
                    type="button"
                    onClick={() => rolar(1)}
                    aria-label="Ver próximos eventos"
                >
                    &gt;
                </button>
            </div>

            <ul className="eventos-lista" ref={listaRef}>
                {eventos.map(({ slug, frontmatter }) => (
                    <li key={slug}>
                        <Link
                            href={`/eventos/${slug}`}
                            className="evento-card"
                            style={{
                                backgroundImage: `linear-gradient(to top, rgba(8, 24, 31, 0.92), rgba(8, 24, 31, 0.05)), url("${frontmatter.image}")`,
                            }}
                        >
                            <span className="evento-card-contagem">
                                ▱ {frontmatter.photoCount ?? "0"} fotos
                            </span>

                            <div className="evento-card-conteudo">
                                {frontmatter.date && (
                                    <p className="evento-card-data">{frontmatter.date}</p>
                                )}

                                <h3>{frontmatter.title}</h3>

                                <span className="evento-card-rodape">
                                    Abrir pasta <span aria-hidden="true">›</span>
                                </span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
