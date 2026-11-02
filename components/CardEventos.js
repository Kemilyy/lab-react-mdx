import { listContent } from "@/lib/content.mjs";
import CarrosselEventos from "@/components/CarrosselEventos";

const meses = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    marco: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
};

function obterTimestamp(data) {
    if (data instanceof Date) {
        const timestamp = data.getTime();
        return Number.isNaN(timestamp) ? null : timestamp;
    }

    if (typeof data !== "string" && typeof data !== "number") return null;

    const texto = String(data).trim().toLocaleLowerCase("pt-BR");
    if (!texto || /data a definir|sem data/i.test(texto)) return null;

    const dataNumerica = texto.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (dataNumerica) {
        const [, dia, mes, ano] = dataNumerica;
        return Date.UTC(Number(ano), Number(mes) - 1, Number(dia));
    }

    const timestampDireto = Date.parse(texto);
    if (!Number.isNaN(timestampDireto)) return timestampDireto;

    const ano = texto.match(/\b(\d{4})\b/)?.[1];
    const mes = Object.entries(meses).find(([nome]) => texto.includes(nome))?.[1];
    if (ano && mes !== undefined) return Date.UTC(Number(ano), mes, 1);
    if (ano) return Date.UTC(Number(ano), 0, 1);

    return null;
}

function embaralhar(itens) {
    const resultado = [...itens];
    for (let i = resultado.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
    return resultado;
}

export default async function CardEventos() {
    const eventos = await listContent("eventos");

    if (eventos.length === 0) {
        return <p>Ainda não há eventos cadastrados.</p>;
    }

    const comData = [];
    const semData = [];

    for (const evento of eventos) {
        const timestamp = obterTimestamp(evento.frontmatter.date);
        if (timestamp === null) semData.push(evento);
        else comData.push({ evento, timestamp });
    }

    comData.sort((a, b) => b.timestamp - a.timestamp);
    const ordenados = [
        ...comData.map(({ evento }) => evento),
        ...embaralhar(semData),
    ];

    return <CarrosselEventos eventos={ordenados} />;
}
