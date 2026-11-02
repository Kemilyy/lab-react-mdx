import Link from "next/link";

const icones = {
    fisico: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
        </svg>
    ),
    mental: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18h6M10 21h4" />
            <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
        </svg>
    ),
    espiritual: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 6c-1.5-1.2-3.5-2-6-2H3v14h3c2.5 0 4.5.8 6 2 1.5-1.2 3.5-2 6-2h3V4h-3c-2.5 0-4.5.8-6 2z" />
            <path d="M12 6v14" />
        </svg>
    ),
};

export default function Sobre({ titulo, destaque, pilares = [], children }) {
    return (
        <section id="clube" className="sobre" aria-labelledby="sobre-titulo">
            <div className="sobre-topo">
                <h2 id="sobre-titulo" className="sobre-titulo">
                    {titulo} <em>{destaque}</em>
                </h2>

                <div className="sobre-texto">
                    {children}
                    <Link href="#ideais" className="sobre-link">
                        Descubra o que nos move
                    </Link>
                </div>
            </div>

            <ul className="sobre-pilares">
                {pilares.map((pilar) => (
                    <li key={pilar.titulo} className="sobre-pilar">
                        <span className="sobre-pilar-icone">{icones[pilar.icone]}</span>
                        <span className="sobre-pilar-numero" aria-hidden="true">{pilar.numero}</span>
                        <h3>{pilar.titulo}</h3>
                        <p>{pilar.texto}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}