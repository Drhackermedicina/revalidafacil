
// Localização: src/app/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { BarChart, Sparkles, Video, Brain, CheckCircle, PlayCircle } from 'lucide-react';

const logoUrl = "https://firebasestorage.googleapis.com/v0/b/appestacoes.firebasestorage.app/o/Gemini_Generated_Image_i9d3fi9d3fi9d3fi.png?alt=media&token=3d5efc89-91be-4954-8a27-c20fd56bcc71";

export default function MarketingHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoUrl} alt="Revalida Fácil Logo" width={48} height={48} className="rounded-md" data-ai-hint="brain logo" />
              <span className="text-2xl font-bold text-primary">Revalida Fácil</span>
            </Link>
            <Link
              href="/login"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-primary/90 transition-colors duration-300"
            >
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Seção Principal (Hero) */}
        <section className="w-full text-center py-20 sm:py-32 bg-gradient-to-b from-white to-slate-100">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Prepare-se para o <span className="text-primary">Revalida</span> com Confiança
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Simule as estações práticas do exame com checklists detalhados e um ambiente interativo que espelha a prova real. Domine cada etapa!
            </p>
            <Link
              href="/login"
              className="mt-10 inline-block bg-primary text-white font-bold text-lg rounded-lg px-10 py-4 hover:bg-primary/90 transition-colors duration-300 shadow-xl transform hover:scale-105"
            >
              Comece a Praticar Agora
            </Link>
          </div>
        </section>

        {/* Seção de Funcionalidades */}
        <section className="w-full text-center py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Plataforma Completa para Sua Aprovação</h2>
            <p className="text-lg text-slate-500 mb-16 max-w-2xl mx-auto">Ferramentas desenvolvidas para otimizar seu estudo e maximizar seu desempenho.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="flex flex-col items-center p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="p-4 bg-primary/10 rounded-full mb-6">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Simulações Interativas</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Ambiente de prova com tempo real e checklists dinâmicos para uma prática eficaz e realista.</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="p-4 bg-primary/10 rounded-full mb-6">
                  <BarChart className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Feedback Detalhado</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Receba sua pontuação e análise de performance ao final de cada estação para focar nos pontos de melhoria.</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="p-4 bg-primary/10 rounded-full mb-6">
                   <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Conteúdo Atualizado</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Estações baseadas nos temas mais recentes do INEP e materiais de estudo complementares.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Seção do Vídeo */}
        <section className="w-full text-center py-16 sm:py-24 bg-slate-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Veja a Plataforma em Ação</h2>
            <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">Descubra como nossa plataforma pode transformar sua preparação para o Revalida.</p>
            <div className="max-w-4xl mx-auto bg-slate-300 aspect-video rounded-xl flex items-center justify-center shadow-2xl overflow-hidden">
              {/* Placeholder for YouTube video embed */}
              <div className="text-slate-500 flex flex-col items-center">
                <PlayCircle className="w-20 h-20 mb-4 opacity-50" />
                <span className="text-lg font-medium">Vídeo Demonstrativo em Breve</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="w-full py-16 sm:py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Pronto para Elevar sua Preparação?</h2>
            <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Junte-se a centenas de médicos que confiam no Revalida Fácil para alcançar a aprovação.
            </p>
            <Link
              href="/login"
              className="inline-block bg-white text-primary font-bold text-lg rounded-lg px-10 py-4 hover:bg-slate-100 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
              Criar Conta ou Acessar
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-slate-800 text-slate-400">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Revalida Fácil. Todos os direitos reservados.</p>
          <p className="mt-1">Feito com <span className="text-red-500">&hearts;</span> para futuros revalidados.</p>
        </div>
      </footer>
    </div>
  );
}
