import {  Lock, Sparkles, Zap, Search } from 'lucide-react'
import imgUrl from '@/images/content-pic.jpg'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12" id="about">
                <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Crie e compartilhe sua galeria de fotos com facilidade no portifol.io</h2>
                    <p className='text-base xl:text-lg'>Um espaço gratuito para fotógrafos, criadores de conteúdo e entusiastas organizarem suas imagens, salvarem favoritas, visualizarem trabalhos de outras pessoas e exibirem suas criações de forma simples e bonita.</p>
                </div>
                <img src={imgUrl.src} alt="team image" height="" width="" loading="lazy" />

                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium xl:text-lg">Upload Rápido</h3>
                        </div>
                        <p className="text-muted-foreground text-sm xl:text-base">
                            Envie suas imagens em segundos com suporte a arquivos de alta qualidade.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Search className="size-4" />
                            <h3 className="text-sm font-medium xl:text-lg">Pesquise Fotos</h3>
                        </div>
                        <p className="text-muted-foreground text-sm xl:text-base">
                            Pesquise facilmente por palavras-chaves.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4" />
                            <h3 className="text-sm font-medium xl:text-lg">Privacidade Garantida</h3>
                        </div>
                        <p className="text-muted-foreground text-sm xl:text-base">
                            Escolha quais imagens manter públicas ou privadas no seu perfil.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />
                            <h3 className="text-sm font-medium xl:text-lg">100% Gratuito</h3>
                        </div>
                        <p className="text-muted-foreground text-sm xl:text-base">
                            Faça login com seu e-mail e aproveite todos os recursos sem pagar nada.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}