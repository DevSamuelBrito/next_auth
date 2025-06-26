export default function StatsSection() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-6 px-6 md:space-y-12">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-semibold lg:text-5xl">Portifol.io em números</h2>
                    <p>Veja alguns dados e benefícios do porque você deve dar uma olhada no nosso projeto que usar o NextAuth.js e Cloudinary.</p>
                </div>

                <div className="grid gap-2 *:text-center md:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
                    <div className="bg-muted rounded-(--radius) space-y-4 py-12">
                        <div className="text-5xl font-bold">+10</div>
                        <p>Provedores de login com NextAuth.js</p>
                    </div>
                    <div className="bg-muted rounded-(--radius) space-y-4 py-12">
                        <div className="text-5xl font-bold">50%</div>
                        <p>Imagens mais rápidas com Cloudinary</p>
                    </div>
                    <div className="bg-muted rounded-(--radius) space-y-4 py-12">
                        <div className="text-5xl font-bold">100%</div>
                        <p>Open Source e gratuito</p>
                    </div>
                </div>
            </div>
        </section>
    )
}