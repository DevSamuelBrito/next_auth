"use client"
import logo from '@/app/favicon.ico'
import Link from 'next/link'
import { scrollToSection } from '@/lib/scrollTo';

const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
};

const links = [
    {
        title: 'Sobre',
        href: '#about',
    },
    {
        title: 'Funcionalidades',
        href: '#features',
    },
    {
        title: 'Perguntas',
        href: '#faq',
    },
    {
        title: 'Login',
        href: '/',
    }
]

export default function FooterSection() {
    return (
        <footer className="py-16">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8" />
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto size-fit flex items-center justify-center gap-2">
                    <img
                        src={logo.src}
                        alt="Tailark Logo"
                        className="mx-auto size-12 md:size-16 rounded" />
                    <span className="text-xl font-bold">Portifol.io</span>
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        link.href.startsWith('#') ? (
                            <a
                                key={index}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href.replace('#', ''))}
                                className="text-muted-foreground hover:text-primary block duration-150"
                            >
                                <span>{link.title}</span>
                            </a>
                        ) : (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary block duration-150"
                            >
                                <span>{link.title}</span>
                            </Link>
                        )
                    ))}

                </div>

                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Portifol.io, Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}