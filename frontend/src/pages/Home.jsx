import { useEffect, useState } from 'react';

function Home() {
  const [showButtons, setShowButtons] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Componente de Login
  const LoginForm = () => (
    <div className="backdrop-blur-md bg-black rounded-2xl p-8 shadow-2xl border border-slate-700/50 max-w-md w-full mx-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Entrar</h2>
        <p className="text-gray-300">Acesse sua conta</p>
      </div>
      
      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Usuário"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Entrar
        </button>
      </form>
      
      <div className="text-center mt-6">
        <button
          onClick={() => setCurrentView('register')}
          className="text-gray-300 hover:text-white transition-colors"
        >
          Não tem conta? <span className="underline text-indigo-400">Cadastre-se</span>
        </button>
      </div>
      
      <button
        onClick={() => setCurrentView('home')}
        className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
      >
        ← Voltar
      </button>
    </div>
  );

  // Componente de Registro
  const RegisterForm = () => (
    <div className="backdrop-blur-md bg-black rounded-2xl p-8 shadow-2xl border border-slate-700/50 max-w-md w-full mx-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Cadastrar</h2>
        <p className="text-gray-300">Crie sua conta</p>
      </div>
      
      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Usuário"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmar Senha"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Cadastrar
        </button>
      </form>
      
      <div className="text-center mt-6">
        <button
          onClick={() => setCurrentView('login')}
          className="text-gray-300 hover:text-white transition-colors"
        >
          Já tem conta? <span className="underline text-indigo-400">Faça login</span>
        </button>
      </div>
      
      <button
        onClick={() => setCurrentView('home')}
        className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
      >
        ← Voltar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {currentView === 'home' && (
          // HOME
          <div className="text-center">
            <div className="mb-12">
              <div className="inline-block p-6 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700/50 shadow-2xl mb-8">
                <img src="../assets/icons/logo.png" alt="Logo" className="w-16 h-16" />
              </div>
              
              <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
                Todo List
              </h1>
              <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
                Organize suas tarefas e objetivos
              </p>
            </div>

            <div className={`space-y-4 transition-all duration-1000 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setCurrentView('login')}
                  className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[160px]"
                >
                  <span className="relative z-10">Entrar</span>
                </button>
                
                <button
                  onClick={() => setCurrentView('register')}
                  className="group relative px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-slate-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-700/50 min-w-[160px]"
                >
                  <span className="relative z-10">Cadastrar</span>
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mt-8">
                Desenvolvido por whoisleoo
              </p>
            </div>
          </div>
        )}

        {currentView === 'login' && 
          // LOGIN
          <LoginForm />
        }
        {currentView === 'register' && 
          // REGISTER
          <RegisterForm />
        }
      </div>
    </div>
  );
}

export default Home;