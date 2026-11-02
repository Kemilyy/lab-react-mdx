import { notFound } from "next/navigation";
import EditorialContent from "@/components/EditorialContent";
import { getContent, listContent } from "@/lib/content.mjs";
import UnidadeHero from "@/components/UnidadeHero";
import CardUnidades from "@/components/CardUnidades";

export async function generateStaticParams() {
    return (await listContent("unidades")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const doc = await getContent("unidades", slug);
    return doc
        ? { title: `${doc.frontmatter.title} ${doc.frontmatter.destaque ?? ""}`.trim(), description: doc.frontmatter.resumo }
        : { title: "Unidade não encontrada" };
}

export default async function UnidadePage({ params }) {
    const { slug } = await params;
    const doc = await getContent("unidades", slug);
    if (!doc) notFound();

    const { frontmatter, content } = doc;

    return (
        <>
            <UnidadeHero {...frontmatter} />

            <section className="unidade-corpo">
                <div className="unidade-corpo-texto">
                    <EditorialContent source={content} />
                </div>
            </section>

            <CardUnidades
                title="Outras"
                destaque="unidades"
                slugAtual={slug}
            />
        </>
    );
}