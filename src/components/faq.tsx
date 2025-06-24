'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'


export default function FAQ() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'O que é o Portifol.io?',
            answer: 'É um Projeto de teste que demonstra autenticação de usuários, upload de imagens e gerenciamento de perfil usando Next.js, NextAuth.js, APIs e Cloudinary.',
        },
        {
            id: 'item-2',
            question: 'Preciso pagar para usar?',
            answer: 'Não. O projeto é totalmente gratuito e open source, ideal para quem busca usar a plataforma como uma galaeria e para quem deseja estudar e realizar testes das tecnologias usadas.',
        },
        {
            id: 'item-3',
            question: 'Quais métodos de login estão disponíveis?',
            answer: 'Neste projeto em especifico você pode se autenticar apenas e-mail pois a ideia do projeto é demonstrar o uso de autenticação com NextAuth.js. No entanto, você pode facilmente adicionar outros provedores de autenticação como Google, GitHub, etc.',
        },
        {
            id: 'item-4',
            question: 'Minhas imagens ficam salvas onde?',
            answer: 'As imagens enviadas são armazenadas e otimizadas automaticamente pelo Cloudinary o que é uma plataforma de gerenciamento de mídia baseada em nuvem que oferece soluções para upload, armazenamento, gerenciamento, transformação e entrega de imagens e vídeos para websites e aplicativos.',
        },
        {
            id: 'item-5',
            question: 'Posso editar ou excluir meu perfil?',
            answer: 'Sim, é possível editar suas informações de perfil e caso seja necessário você pode excluir sua conta a qualquer momento.',
        },
    ]

    return (
        <section className="py-16 md:py-24" id="faq">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Perguntas frequentes</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Descubra respostas rápidas e abrangentes para perguntas comuns sobre nossa plataforma, serviços e recursos</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1">
                        {faqItems.map((item) => (
                            <div
                                className="group"
                                key={item.id}>
                                <AccordionItem
                                    value={item.id}
                                    className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm">
                                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-base">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                            </div>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}