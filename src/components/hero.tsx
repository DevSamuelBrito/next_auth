import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import HeroImg from '@/images/heroImage.jpg'

export default function HeroSection() {
    return (
        <main className="overflow-x-hidden">
            <section>
                <div className="pb-12 pt-12 md:pb-32 lg:pb-24 lg:pt-22">
                    <div className="relative mx-auto flex max-w-7xl flex-col px-6 gap-10 lg:flex-row lg:items-center">
                        <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                            <h1 className="mt-8 max-w-2xl text-balance text-3xl font-medium md:text-6xl lg:mt-16 xl:text-6xl">
                                Transformando ideias em experiências digitais incríveis.
                            </h1>
                            <p className="mt-8 max-w-2xl text-pretty text-lg">
                                Com interfaces modernas, rápidas e seguras com foco em performance, acessibilidade e experiência do usuário. Minha stack combina tecnologia de ponta com boas práticas de desenvolvimento para a melhor experiência.
                            </p>

                            <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                <Button asChild size="lg" className="px-5 text-base">
                                    <Link href="/">
                                        <span className="text-nowrap">Vamos Começar!</span>
                                    </Link>
                                </Button>
                                
                            </div>
                        </div>

                        <Image
                            className="order-first ml-auto h-56 w-full object-cover sm:h-24 lg:relative lg:top-0 lg:right-0 lg:order-last lg:h-auto lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0 sm:max-h-[600px] rounded-xl"
                            src={HeroImg}
                            alt="Abstract Object"
                            height={3000}
                            width={3000}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}
