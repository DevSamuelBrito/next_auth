import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ContentTwo() {
    return (
        <section className="py-16 md:py-32" id="features">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">Explore as funcionalidades de autenticação, upload de imagens e alteração de perfil no Portifol.io
                    </h2>
                    <div className="space-y-6">
                        <p>Este é um projeto criado para testar recursos de autenticação, cadastro e gerenciamento de usuários com Next.js.</p>
                        <p>
                            Você pode criar uma conta, acessar seu perfil e experimentar as funcionalidades básicas disponíveis. Ideal para quem deseja aprender ou testar novas implementações.
                        </p>
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5">
                            <Link href="https://github.com/DevSamuelBrito/next_auth">
                                <span>Veja a Documentação</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

