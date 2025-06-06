// Localização: src/app/page.tsx

import Link from 'next/link';
import { Sparkles, BarChart, Video } from 'lucide-react'; // Ícones para um visual melhor

export default function MarketingHomePage() {
  return (
    <main className="flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Seção Principal (Hero) */}
      <section className="w-full text-center py-20 sm:py-32 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
            Prepare-se para o Revalida com Confiança
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Simule as estações práticas do exame com checklists detalhados e um ambiente interativo que espelha a prova real.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-block bg-blue-600 text-white font-bold text-lg rounded-lg px-8 py-4 hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            Acessar a Plataforma
          </Link>
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section className="w-full text-center py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Funcionalidades Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="flex flex-col items-center">
              <Sparkles className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Simulações Interativas</h3>
              <p className="text-gray-600">Ambiente de prova com tempo real e checklists dinâmicos.</p>
            </div>
            <div className="flex flex-col items-center">
              <BarChart className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Feedback Detalhado</h3>
              <p className="text-gray-600">Receba sua pontuação e análise de performance ao final de cada estação.</p>
            </div>
            <div className="flex flex-col items-center">
              <Video className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vídeos e Guias</h3>
              <p className="text-gray-600">Acesse materiais de estudo complementares para aprimorar seu desempenho.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção do Vídeo */}
      <section className="w-full text-center py-16 sm:py-24 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Veja a Plataforma em Ação</h2>
          <div className="max-w-4xl mx-auto bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
            <p className="text-gray-500">(Espaço para o seu vídeo do YouTube)</p>
          </div>
        </div>
      </section>
    </main>
  );
}
