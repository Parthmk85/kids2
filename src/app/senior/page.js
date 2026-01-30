import Hero from "@/components/Hero";

export default function SeniorHome() {
    return (
        <main className="w-full">
            <Hero />

            {/* Additional sections can go here */}
            <section className="relative py-24 px-6 min-h-screen bg-transparent">
                <div className="container max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Latest Announcements</h2>
                        <div className="grid md:grid-cols-3 gap-8 w-full">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="cursor-target p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-white/20 transition-all">
                                    <div className="text-sm text-white/40 mb-4 font-mono uppercase tracking-widest leading-none">News • Feb 24, 2026</div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Annual Science Fair 2026 Winners</h3>
                                    <p className="text-white/50 leading-relaxed mb-6">Congratulations to all participants! This year's projects showed incredible innovation and creativity.</p>
                                    <button className="cursor-target text-blue-400 font-bold hover:underline underline-offset-4">Read Article →</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
