import Link from "next/link";
import { getUnidades } from "@/lib/unidades.mjs";

export default async function CardUnidades({
    title = "Outras unidades",
    destaque = "",
    lead = "",
    slugAtual,
}) {
    const unidades = await getUnidades();

    const unidadesExibidas = slugAtual
        ? unidades.filter((unidade) => unidade.slug !== slugAtual)
        : unidades;

    return (
        <section id="unidades" className="unidades">
            <div className="unidades-topo">
                <h2 id="unidades-titulo" className="unidades-titulo">
                    {title} {destaque && <em>{destaque}</em>}
                </h2>

                {lead && <p className="unidades-lead">{lead}</p>}
            </div>

            {unidadesExibidas.length > 0 ? (
                <ul className="unidades-lista">
                    {unidadesExibidas.map((unidade) => (
                        <li key={unidade.slug}>
                            <Link
                                href={`/unidades/${unidade.slug}`}
                                className="unidade-card"
                            >
                                <h3>
                                    {unidade.destaque}
                                </h3>

                                <span className="unidade-faixa">
                                    {unidade.faixa}
                                    {unidade.genero && ` · Unidade ${unidade.genero}`}
                                </span>

                                {unidade.resumo && <p>{unidade.resumo}</p>}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há outras unidades para exibir.</p>
            )}
        </section>
    );
}