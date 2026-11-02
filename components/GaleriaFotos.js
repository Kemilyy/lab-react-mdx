"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function GaleriaFotos({ imagens }) {
    const [indiceAtivo, setIndiceAtivo] = useState(null);
    const total = imagens.length;
    const aberta = indiceAtivo !== null;

    function anterior() {
        setIndiceAtivo((indice) => (indice - 1 + total) % total);
    }

    function proxima() {
        setIndiceAtivo((indice) => (indice + 1) % total);
    }

    useEffect(() => {
        if (!aberta) return undefined;

        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function lidarComTeclado(event) {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                setIndiceAtivo((indice) => (indice - 1 + total) % total);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                setIndiceAtivo((indice) => (indice + 1) % total);
            } else if (event.key === "Escape") {
                setIndiceAtivo(null);
            }
        }

        window.addEventListener("keydown", lidarComTeclado);
        return () => {
            window.removeEventListener("keydown", lidarComTeclado);
            document.body.style.overflow = overflowAnterior;
        };
    }, [aberta, total]);

    return (
        <>
            <ul className="evento-galeria-grade" aria-label="Fotos do evento">
                {imagens.map(({ alt, src }, indice) => (
                    <li
                        className={`evento-foto evento-foto--${(indice % 8) + 1}`}
                        key={`${src}-${indice}`}
                    >
                        <button
                            className="evento-foto-botao"
                            type="button"
                            onClick={() => setIndiceAtivo(indice)}
                            aria-label={`Ampliar foto ${indice + 1}: ${alt}`}
                        >
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                sizes="(max-width: 700px) 82vw, (max-width: 1000px) 45vw, 40vw"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {aberta && (
                <div
                    className="galeria-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Foto ${indiceAtivo + 1} de ${total}`}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) setIndiceAtivo(null);
                    }}
                >
                    <button
                        className="galeria-modal-fechar"
                        type="button"
                        onClick={() => setIndiceAtivo(null)}
                        aria-label="Fechar foto ampliada"
                    >
                        ×
                    </button>

                    {total > 1 && (
                        <button
                            className="galeria-modal-seta galeria-modal-anterior"
                            type="button"
                            onClick={anterior}
                            aria-label="Ver foto anterior"
                        >
                            ‹
                        </button>
                    )}

                    <div className="galeria-modal-figura">
                        <div className="galeria-modal-imagem">
                            <Image
                                src={imagens[indiceAtivo].src}
                                alt={imagens[indiceAtivo].alt}
                                fill
                                sizes="96vw"
                                priority
                            />
                        </div>
                    </div>

                    {total > 1 && (
                        <button
                            className="galeria-modal-seta galeria-modal-proxima"
                            type="button"
                            onClick={proxima}
                            aria-label="Ver próxima foto"
                        >
                            ›
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
