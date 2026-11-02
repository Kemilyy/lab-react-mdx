import { getContent, listContent } from "./content.mjs";

export async function getUnidades() {
    const itens = await listContent("unidades");

    const docs = await Promise.all(
        itens.map(async ({ slug }) => {
            const doc = await getContent("unidades", slug);
            return doc ? { slug, ...doc.frontmatter } : null;
        })
    );

    return docs
        .filter(Boolean)
        .sort((a, b) => a.ordem - b.ordem)
        .map((u, indice) => ({ ...u, indice })); // indice = posição na lista completa
}