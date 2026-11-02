"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
    { href: "/#clube", label: "O clube" },
    { href: "/#ideais", label: "Ideais" },
    { href: "/#unidades", label: "Unidades" },
    { href: "/#galeria", label: "Galeria" },
    { href: "/#membros", label: "Membros" },
];

export default function Header() {
    const [rolado, setRolado] = useState(false);

    useEffect(() => {
        const aoRolar = () => setRolado(window.scrollY > 40);
        aoRolar();
        window.addEventListener("scroll", aoRolar, { passive: true });
        return () => window.removeEventListener("scroll", aoRolar);
    }, []);

    return (
        <header className={`site-header${rolado ? " site-header--rolado" : ""}`}>
            <Link href="/" className="site-header-brand">
                <Image
                    src="/images/logo/farol.png"
                    alt=""
                    width={60}
                    height={60}
                    className="site-header-logo"
                />
                <span className="site-header-brand-text">
                    <strong>FAROL</strong>
                    <small>Clube de Desbravadores</small>
                </span>
            </Link>

            <nav>
                <ul className="site-header-nav">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <Link href="/#contato" className="site-header-contato">
                Fale conosco
            </Link>
        </header>
    );
}