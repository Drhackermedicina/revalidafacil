"use client";
import React, { useState } from 'react';
import { Book, User, Lock, Mail, Home, MessageSquare, BriefcaseMedical, TrendingUp, Compass, Newspaper, ArrowRight, Check, XCircle, PlayCircle } from 'lucide-react';

// Componente do Modal de Mensagem: Usado para exibir informações ao usuário
const MessageModal = ({ message, onClose }) => {
  // Se não houver mensagem, o modal não é renderizado
  if (!message) return null;

  return (
    // Overlay semi-transparente que cobre a tela
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Container principal do modal */}
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative">
        {/* Botão para fechar o modal */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <XCircle className="h-6 w-6" />
        </button>
        {/* Conteúdo central do modal */}
        <div className="text-center">
          <Book className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-800">{message}</p>
          {/* Botão de confirmação para fechar o modal */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente da Página de Vídeo Demonstrativo: Exibe um vídeo da plataforma
const VideoDemoPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800 p-4">
    {/* Cabeçalho da página de vídeo, com o nome do produto e botão de voltar */}
    <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm rounded-b-lg mb-8">
      <div className="flex items-center space-x-2">
        <Book className="h-7 w-7 text-indigo-600" />
        <span className="text-3xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">Revalida Fácil</span>
      </div>
      <button
        onClick={() => onNavigate('home')}
        className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-sm"
      >
        Voltar para o Início
      </button>
    </header>

    {/* Conteúdo principal da página de vídeo */}
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-800">
        Conheça o <span className="text-green-600">Revalida Fácil</span> em Ação!
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Assista ao nosso vídeo demonstrativo e descubra como o <span className="font-bold">Revalida Fácil</span> pode impulsionar a sua preparação para o exame Revalida.
      </p>

      {/* Container responsivo para o vídeo (proporção 16:9) */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // URL do vídeo de demonstração (placeholder)
          title="Vídeo Demonstrativo Revalida Fácil"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Chamada para ação após o vídeo */}
      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Pronto para Começar?</h3>
        <p className="text-gray-600 mb-6">
          Se você gostou do que viu, cadastre-se agora e experimente todas as funcionalidades do Revalida Fácil!
        </p>
        <button
          onClick={() => onNavigate('register')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Cadastre-se Grátis
          <ArrowRight className="inline-block ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

// Componente da Página Inicial (Home Page): O ponto de entrada do site
const HomePage = ({ onNavigate, onShowMessage }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800">
    {/* Cabeçalho de Navegação principal */}
    <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm rounded-b-lg">
      <div className="flex items-center space-x-2">
        <Book className="h-7 w-7 text-indigo-600" />
        {/* Nome do produto "Revalida Fácil" com grande destaque */}
        <span className="text-3xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">Revalida Fácil</span>
      </div>
      {/* Navegação principal para desktop */}
      <nav className="hidden md:flex space-x-6">
        <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Início</button>
        <button onClick={() => onShowMessage('Funcionalidade em desenvolvimento!')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Recursos</button>
        <button onClick={() => onShowMessage('Funcionalidade em desenvolvimento!')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Blog</button>
        {/* Botão para a nova aba de vídeo demonstrativo */}
        <button
          onClick={() => onNavigate('videoDemo')}
          className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center space-x-1"
        >
          <PlayCircle className="h-5 w-5" />
          <span>Vídeo Demo</span>
        </button>
        <button onClick={() => onShowMessage('Funcionalidade em desenvolvimento!')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">Contato</button>
      </nav>
      {/* Botões de Login e Cadastro */}
      <div className="space-x-4">
        <button
          onClick={() => onNavigate('login')}
          className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-sm"
        >
          Login
        </button>
        <button
          onClick={() => onNavigate('register')}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
        >
          Cadastre-se
        </button>
      </div>
    </header>

    {/* Seção Hero: Destaque principal da página inicial */}
    <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center text-white p-6 rounded-b-xl shadow-lg">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Título com "Revalida Fácil" em grande destaque e a frase reformulada */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
          <span className="text-green-300 drop-shadow-lg">Revalida Fácil</span>: Sua Jornada de Aprovação Começa Aqui
        </h1>
        {/* Subtítulo explicando o valor do produto */}
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
          Com o <span className="font-bold">Revalida Fácil</span>, você tem acesso a materiais de estudo, simulados e acompanhamento personalizado para a sua aprovação.
        </p>
        {/* Botão de chamada para ação principal */}
        <button
          onClick={() => onNavigate('register')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
        >
          Comece Grátis
          <ArrowRight className="inline-block ml-2 w-5 h-5" />
        </button>
      </div>
    </section>

    {/* Seção de Destaque de Recursos: Apresenta as funcionalidades chave */}
    <section className="py-16 px-6 md:px-12 bg-white rounded-lg mx-4 mt-8 shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-800">Recursos Que Impulsionam Sua Aprovação com o Revalida Fácil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Bloco de recurso: Simulados Interativos */}
        <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <Book className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Simulados Interativos</h3>
          <p className="text-gray-600">Teste seus conhecimentos com simulados completos e realistas.</p>
        </div>
        {/* Bloco de recurso: Questões Comentadas */}
        <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <MessageSquare className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Questões Comentadas</h3>
          <p className="text-gray-600">Aprenda com explicações detalhadas para cada questão.</p>
        </div>
        {/* Bloco de recurso: Dashboard de Desempenho */}
        <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Dashboard de Desempenho</h3>
          <p className="text-gray-600">Acompanhe seu progresso e identifique pontos fracos.</p>
        </div>
        {/* Bloco de recurso: Resumos Essenciais */}
        <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <BriefcaseMedical className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Resumos Essenciais</h3>
          <p className="text-gray-600">Conteúdo médico direto ao ponto para revisão rápida.</p>
        </div>
        {/* Bloco de recurso: Trilhas de Estudo */}
        <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <Compass className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Trilhas de Estudo</h3>
          <p className="text-gray-600">Caminhos de estudo guiados para otimizar seu tempo.</p>
        </div>
        {/* Bloco de recurso: Comunidade de Estudo */}
        <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <User className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Comunidade de Estudo</h3>
          <p className="text-gray-600">Conecte-se e troque conhecimentos com outros estudantes.</p>
        </div>
      </div>
    </section>

    {/* Seção de Testemunhos: Prova social */}
    <section className="py-16 px-6 md:px-12 bg-white rounded-lg mx-4 mt-8 shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-800">O Que Nossos Estudantes Dizem sobre o Revalida Fácil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Testemunho 1 */}
        <div className="bg-green-50 p-6 rounded-xl shadow-md flex items-center space-x-4">
          <img src="https://placehold.co/80x80/d1fae5/065f46?text=João" alt="Foto de Perfil de João" className="w-20 h-20 rounded-full object-cover border-4 border-green-200" />
          <div>
            <p className="italic text-gray-700 mb-2">"O '<span className="font-bold">Revalida Fácil</span>' foi essencial na minha preparação. Os simulados são incrivelmente realistas!"</p>
            <p className="font-semibold text-green-700">- João Silva, Aprovado no Revalida 2023</p>
          </div>
        </div>
        {/* Testemunho 2 */}
        <div className="bg-green-50 p-6 rounded-xl shadow-md flex items-center space-x-4">
          <img src="https://placehold.co/80x80/d1fae5/065f46?text=Maria" alt="Foto de Perfil de Maria" className="w-20 h-20 rounded-full object-cover border-4 border-green-200" />
          <div>
            <p className="italic text-gray-700 mb-2">"As questões comentadas e os resumos do '<span className="font-bold">Revalida Fácil</span>' me pouparam muito tempo. Recomendo a todos!"</p>
            <p className="font-semibold text-green-700">- Maria Souza, Candidata Revalida</p>
          </div>
        </div>
      </div>
    </section>

    {/* Seção de Blog/Notícias (Simulado) */}
    <section className="py-16 px-6 md:px-12 bg-white rounded-lg mx-4 mt-8 shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-800">Últimas Notícias e Artigos do Revalida Fácil</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Artigo 1 */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <Newspaper className="h-10 w-10 text-blue-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Guia Completo para o Edital Revalida 2024</h3>
          <p className="text-gray-600 text-sm">Fique por dentro das últimas atualizações e dicas para o edital.</p>
          <a href="#" className="text-indigo-600 hover:underline mt-3 block">Ler Mais &rarr;</a>
        </div>
        {/* Artigo 2 */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <Newspaper className="h-10 w-10 text-blue-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">5 Estratégias de Estudo para Otimizar Seu Tempo</h3>
          <p className="text-gray-600 text-sm">Maximize sua eficiência com estas técnicas comprovadas.</p>
          <a href="#" className="text-indigo-600 hover:underline mt-3 block">Ler Mais &rarr;</a>
        </div>
        {/* Artigo 3 */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <Newspaper className="h-10 w-10 text-blue-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Entenda a Importância da Saúde Mental na Preparação</h3>
          <p className="text-gray-600 text-sm">Dicas para manter o equilíbrio durante sua jornada.</p>
          <a href="#" className="text-indigo-600 hover:underline mt-3 block">Ler Mais &rarr;</a>
        </div>
      </div>
    </section>

    {/* Rodapé: Informações de contato e links úteis */}
    <footer className="bg-gray-800 text-white py-10 px-6 md:px-12 mt-12 rounded-t-lg">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Revalida Fácil</h3>
          <p className="text-gray-400 text-sm">Sua plataforma completa para a aprovação no Revalida.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Sobre Nós</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Recursos</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contato</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Termos de Uso</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Política de Privacidade</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10">
        &copy; 2024 Revalida Fácil. Todos os direitos reservados.
      </div>
    </footer>
  </div>
);

// Componente da Página de Login: Formulário para acesso do usuário
const LoginPage = ({ onNavigate, onShowMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Função para lidar com o envio do formulário de login (simulado)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores
    // Lógica de login simulada: credenciais fixas para demonstração
    if (email === 'teste@email.com' && password === '12345') {
      onShowMessage('Login bem-sucedido! (Simulado)');
      onNavigate('home'); // Redireciona para a home após login
    } else {
      setError('Email ou senha incorretos.'); // Mensagem de erro
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 font-sans text-gray-800 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="text-center mb-8">
          <Book className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-indigo-800">Acesse sua Conta do Revalida Fácil</h2>
          <p className="text-gray-500 mt-2">Bem-vindo(a) de volta!</p>
        </div>

        {/* Exibição de mensagens de erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <a href="#" onClick={() => onShowMessage('Em breve você poderá redefinir sua senha!')} className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-200">
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-200"
            >
              Crie uma agora!
            </button>
          </p>
        </div>

        {/* Opção de Login Social (Google) */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou entre com</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google" className="h-5 w-5 mr-3" />
              Entrar com Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente da Página de Cadastro (Registro): Formulário para novos usuários
const RegisterPage = ({ onNavigate, onShowMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  // Função para verificar a força da senha
  const checkPasswordStrength = (pass) => {
    let strength = '';
    if (pass.length < 6) {
      strength = 'Fraca';
    } else if (pass.length < 10) {
      strength = 'Média';
    } else {
      strength = 'Forte';
    }
    setPasswordStrength(strength);
  };

  // Função para lidar com o envio do formulário de cadastro (simulado)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validação das senhas
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    // Validação da aceitação dos termos
    if (!agreeTerms) {
      setError('Você deve concordar com os Termos de Uso e Política de Privacidade.');
      return;
    }

    onShowMessage('Cadastro bem-sucedido! (Simulado)');
    onNavigate('login'); // Redireciona para o login após o cadastro
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 font-sans text-gray-800 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="text-center mb-8">
          <Book className="h-12 w-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-blue-800">Crie sua Conta Grátis no Revalida Fácil</h2>
          <p className="text-gray-500 mt-2">Junte-se à comunidade Revalida Fácil!</p>
        </div>

        {/* Exibição de mensagens de erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        {/* Formulário de Cadastro */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu Nome Completo"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email-register"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password-register"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                placeholder="••••••••"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {/* Feedback da força da senha */}
            {password && (
              <p className={`mt-1 text-xs ${passwordStrength === 'Forte' ? 'text-green-600' : passwordStrength === 'Média' ? 'text-yellow-600' : 'text-red-600'}`}>
                Força da senha: {passwordStrength}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
              />
            </div>
            {/* Mensagem de senhas que não coincidem */}
            {password && confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-xs text-red-600">As senhas não coincidem.</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              Concordo com os{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Termos de Uso</a> e{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Política de Privacidade</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors duration-200"
            >
              Faça Login!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente Principal da Aplicação: Gerencia a navegação entre as páginas
export default function App() {
  // Estado para controlar qual página está sendo exibida (home, login, register, videoDemo)
  const [currentPage, setCurrentPage] = useState('home');
  // Estado para controlar a mensagem a ser exibida no modal
  const [modalMessage, setModalMessage] = useState(null);

  // Função para alterar a página atual
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Função para definir a mensagem e exibir o modal
  const handleShowMessage = (message) => {
    setModalMessage(message);
  };

  // Função para fechar o modal, limpando a mensagem
  const handleCloseMessage = () => {
    setModalMessage(null);
  };

  return (
    <div>
      {/* Renderiza o componente da página atual com base no estado 'currentPage' */}
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} onShowMessage={handleShowMessage} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} onShowMessage={handleShowMessage} />}
      {currentPage === 'register' && <RegisterPage onNavigate={handleNavigate} onShowMessage={handleShowMessage} />}
      {currentPage === 'videoDemo' && <VideoDemoPage onNavigate={handleNavigate} />}

      {/* Renderiza o Modal de Mensagem se houver uma 'modalMessage' */}
      <MessageModal message={modalMessage} onClose={handleCloseMessage} />
    </div>
  );
}
