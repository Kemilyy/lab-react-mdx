import Link from "next/link";

export default function Ideais({title, destaque, ideais = []}){
    return (
        <section id="ideais" className="ideais">
            <div className="ideais-lado-esquerdo">
                <h2 className="ideais-titulo">
                    {title} <em>{destaque}</em>
                </h2>
            </div>

            <div className="ideais-lado-direito">
                <ul className="ideais-lista">
                    {ideais.map((id) => (
                        <li key={id.titulo} className="ideais-card">
                            <h3>{id.titulo}</h3>
                            <p>{id.texto}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
} 