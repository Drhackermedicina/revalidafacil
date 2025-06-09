"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Importar Link
import { Book, User, Lock, Mail, Home, MessageSquare, BriefcaseMedical, TrendingUp, Compass, Newspaper, ArrowRight, Check, XCircle, PlayCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Componente da Página de Vídeo Demonstrativo: Exibe um vídeo da plataforma
// Se esta página for complexa, considere movê-la para sua própria rota /video-demo
const VideoDemoPage = ({ onNavigateBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800 p-4">
    <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm rounded-b-lg mb-8">
      <div className="flex items-center space-x-2">
        <Book className="h-7 w-7 text-indigo-600" />
        <span className="text-3xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">Revalida Fácil</span>
      </div>
      <button
        onClick={onNavigateBack}
        className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-sm"
      >
        Voltar para o Início
      </button>
    </header>

    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-800">
        Conheça o <span className="text-green-600">Revalida Fácil</span> em Ação!
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Assista ao nosso vídeo demonstrativo e descubra como o <span className="font-bold">Revalida Fácil</span> pode impulsionar a sua preparação para o exame Revalida.
      </p>

      <div className="relative w-full overflow-hidden rounded-xl shadow-lg" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Vídeo Demonstrativo Revalida Fácil"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Pronto para Começar?</h3>
        <p className="text-gray-600 mb-6">
          Se você gostou do que viu, cadastre-se agora e experimente todas as funcionalidades do Revalida Fácil!
        </p>
        <Link href="/register" passHref>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Cadastre-se Grátis
            <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  </div>
);


// Componente da Página Inicial (Home Page): O ponto de entrada do site
const HomePage = () => {
  const [showVideoDemo, setShowVideoDemo] = useState(false);

  const handleShowMessage = (message: string) => {
    alert(message); // Simplificado para alert
  };

  if (showVideoDemo) {
    return <VideoDemoPage onNavigateBack={() => setShowVideoDemo(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800">
      <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm rounded-b-lg">
        <div className="flex items-center space-x-2">
          <Book className="h-7 w-7 text-indigo-600" />
          <span className="text-3xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">Revalida Fácil</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Início</Link>
          <button onClick={() => handleShowMessage('Funcionalidade em desenvolvimento!')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Recursos</button>
          <button onClick={() => handleShowMessage('Funcionalidade em desenvolvimento!')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Blog</button>
          <button
            onClick={() => setShowVideoDemo(true)}
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center space-x-1"
          >
            <PlayCircle className="h-5 w-5" />
            <span>Vídeo Demo</span>
          </button>
          <button onClick={() => handleShowMessage('Funcionalidade em desenvolvimento!')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Contato</button>
        </nav>
        <div className="space-x-4">
          <Link href="/login" passHref>
            <button
              className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-sm"
            >
              Login
            </button>
          </Link>
          <Link href="/register" passHref>
            <button
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
            >
              Cadastre-se
            </button>
          </Link>
        </div>
      </header>

      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center text-white p-6 rounded-b-xl shadow-lg">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
            <span className="text-green-300 drop-shadow-lg">Revalida Fácil</span>: Sua Jornada de Aprovação Começa Aqui
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
            Com o <span className="font-bold">Revalida Fácil</span>, você tem acesso a materiais de estudo, simulados e acompanhamento personalizado para a sua aprovação.
          </p>
          <Link href="/register" passHref>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              Comece Grátis
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-white rounded-lg mx-4 mt-8 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-800">Recursos Que Impulsionam Sua Aprovação com o Revalida Fácil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <Book className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Simulados Interativos</h3>
            <p className="text-gray-600">Teste seus conhecimentos com simulados completos e realistas.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <MessageSquare className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Questões Comentadas</h3>
            <p className="text-gray-600">Aprenda com explicações detalhadas para cada questão.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Dashboard de Desempenho</h3>
            <p className="text-gray-600">Acompanhe seu progresso e identifique pontos fracos.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <BriefcaseMedical className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Resumos Essenciais</h3>
            <p className="text-gray-600">Conteúdo médico direto ao ponto para revisão rápida.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <Compass className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Trilhas de Estudo</h3>
            <p className="text-gray-600">Caminhos de estudo guiados para otimizar seu tempo.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <User className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Comunidade de Estudo</h3>
            <p className="text-gray-600">Conecte-se e troque conhecimentos com outros estudantes.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-white rounded-lg mx-4 mt-8 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-800">O Que Nossos Estudantes Dizem sobre o Revalida Fácil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-green-50 p-6 rounded-xl shadow-md flex items-center space-x-4">
            <img src="https://placehold.co/80x80/d1fae5/065f46?text=João" alt="Foto de Perfil de João" className="w-20 h-20 rounded-full object-cover border-4 border-green-200" data-ai-hint="profile person" />
            <div>
              <p className="italic text-gray-700 mb-2">"O '<span className="font-bold">Revalida Fácil</span>' foi essencial na minha preparação. Os simulados são incrivelmente realistas!"</p>
              <p className="font-semibold text-green-700">- João Silva, Aprovado no Revalida 2023</p>
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow-md flex items-center space-x-4">
            <img src="https://placehold.co/80x80/d1fae5/065f46?text=Maria" alt="Foto de Perfil de Maria" className="w-20 h-20 rounded-full object-cover border-4 border-green-200" data-ai-hint="profile person" />
            <div>
              <p className="italic text-gray-700 mb-2">"As questões comentadas e os resumos do '<span className="font-bold">Revalida Fácil</span>' me pouparam muito tempo. Recomendo a todos!"</p>
              <p className="font-semibold text-green-700">- Maria Souza, Candidata Revalida</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-white rounded-lg mx-4 mt-8 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-800">Últimas Notícias e Artigos do Revalida Fácil</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <Newspaper className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Guia Completo para o Edital Revalida 2024</h3>
            <p className="text-gray-600 text-sm">Fique por dentro das últimas atualizações e dicas para o edital.</p>
            <a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Em breve: Artigo sobre o Edital Revalida 2024!")}} className="text-indigo-600 hover:underline mt-3 block">Ler Mais &rarr;</a>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <Newspaper className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">5 Estratégias de Estudo para Otimizar Seu Tempo</h3>
            <p className="text-gray-600 text-sm">Maximize sua eficiência com estas técnicas comprovadas.</p>
            <a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Em breve: Artigo sobre Estratégias de Estudo!")}} className="text-indigo-600 hover:underline mt-3 block">Ler Mais &rarr;</a>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <Newspaper className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Entenda a Importância da Saúde Mental na Preparação</h3>
            <p className="text-gray-600 text-sm">Dicas para manter o equilíbrio durante sua jornada.</p>
            <a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Em breve: Artigo sobre Saúde Mental na Preparação!")}} className="text-indigo-600 hover:underline mt-3 block">Ler Mais &rarr;</a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-10 px-6 md:px-12 mt-12 rounded-t-lg">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Revalida Fácil</h3>
            <p className="text-gray-400 text-sm">Sua plataforma completa para a aprovação no Revalida.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Página 'Sobre Nós' em desenvolvimento.")}} className="text-gray-400 hover:text-white transition-colors duration-200">Sobre Nós</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Página de 'Recursos' em desenvolvimento.")}} className="text-gray-400 hover:text-white transition-colors duration-200">Recursos</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Nosso 'Blog' está em desenvolvimento.")}} className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Página de 'Contato' em desenvolvimento.")}} className="text-gray-400 hover:text-white transition-colors duration-200">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Página de 'Termos de Uso' em desenvolvimento.")}} className="text-gray-400 hover:text-white transition-colors duration-200">Termos de Uso</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); handleShowMessage("Página de 'Política de Privacidade' em desenvolvimento.")}} className="text-gray-400 hover:text-white transition-colors duration-200">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-10">
          &copy; {new Date().getFullYear()} Revalida Fácil. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }
    if (user) {
      router.push('/dashboard');
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Book className="h-16 w-16 text-indigo-600 animate-pulse" />
        <p className="ml-4 text-xl text-indigo-700">Carregando sua jornada...</p>
      </div>
    );
  }

  return <HomePage />;
}
