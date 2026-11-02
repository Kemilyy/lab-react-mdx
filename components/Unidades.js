import Link from "next/link";
import { getContent, listContent } from "@/lib/content.mjs";

export default async function Unidades({ title, destaque, lead }) {
    const itens = await listContent("unidades");

    const unidades = (
        await Promise.all(
            itens.map(async ({ slug }) => {
                const doc = await getContent("unidades", slug);
                return doc ? { slug, ...doc.frontmatter } : null;
            })
        )
    )
        .filter(Boolean)
        .sort((a, b) => a.ordem - b.ordem);

    return (
        <section id="unidades" className="unidades">
            <div className="unidades-topo">
                <h2 id="unidades-titulo" className="unidades-titulo">
                    {title} <em>{destaque}</em>
                </h2>
                <p className="unidades-lead">{lead}</p>
            </div>

            <ul className="unidades-lista">
                {unidades.map((u) => (
                    <li key={u.slug}>
                        <Link href={`/unidades/${u.slug}`} className="unidade-card">
                            <span className="unidade-faixa">{u.faixa} · Unidade {u.genero}</span>
                            <h3>{u.title}</h3>
                            <p>{u.resumo}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}