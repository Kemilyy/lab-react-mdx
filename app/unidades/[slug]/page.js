import { notFound } from "next/navigation";
import EditorialContent from "@/components/EditorialContent";
import { getContent, listContent } from "@/lib/content.mjs";

export async function generateStaticParams() {
    return (await listContent("unidades")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const doc = await getContent("unidades", slug);
    return doc
        ? { title: doc.frontmatter.title, description: doc.frontmatter.resumo }
        : { title: "Unidade não encontrada" };
}

export default async function UnidadePage({ params }) {
    const { slug } = await params;
    const doc = await getContent("unidades", slug);
    if (!doc) notFound();

    return (
        <article>
            <p className="eyebrow">{doc.frontmatter.faixa}</p>
            <h1>{doc.frontmatter.title}</h1>
            <p className="eyebrow">
                {doc.frontmatter.faixa} · Unidade {doc.frontmatter.genero}
            </p>
            <p className="lead">{doc.frontmatter.resumo}</p>
            <EditorialContent source={doc.content} />
        </article>
    );
}