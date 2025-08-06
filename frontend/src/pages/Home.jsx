import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'

function Home() {
  const navigate = useNavigate();

  const [showButtons, setShowButtons] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  //Mensagens de erro de login sucesso essas coisa ai
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  //ref de registro
  const inputEmail = useRef();
  const inputUsername = useRef();
  const inputSenha = useRef();
  const inputConfirmarSenha = useRef();

  //ref de login
  const inputUsernameLogin = useRef();
  const inputSenhaLogin = useRef();

  const HandleRegister = async function (e){ // REGISTRO
    e.preventDefault();
    setRegisterError('')
    setRegisterSuccess('')
    try{
      await api.post('/register', {
        email: inputEmail.current.value,
        username: inputUsername.current.value,
        senha:  inputSenha.current.value,
        confSenha:  inputConfirmarSenha.current.value
      })

      setRegisterSuccess('Conta criada com sucesso, redirecionando ao login...')

      setTimeout(() => {
        setCurrentView('login')
      }, 2000);
  
    }catch(error){
      if(error.response && error.response.data){
        const mensagem = error.response.data.error || 'Erro interno do servidor.'
        setRegisterError(mensagem);

        if(error.response && error.response.data.erros_encontrados){
        const erros = error.response.data.erros_encontrados.join('.  ');
        setRegisterError(erros);
        }else{
        setRegisterError(mensagem)
      }
      }






      console.log(`Falhou devido a ${error}`)
    }
  }

  const HandleLogin = async function (e){
    e.preventDefault();
    setLoginError('')
    try{
      const response = await api.post('/login', {
        username: inputUsernameLogin.current.value,
        senha:  inputSenhaLogin.current.value,
      })

       if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

       navigate('/lists')


    }catch(error){
       if(error.response && error.response.data){
        const mensagem = error.response.data.error || 'Erro interno do servidor.'
        setLoginError(mensagem);
      }else{
        setLoginError('Erro interno do servidor, Aguarde e tente novamente mais tarde.')
      }

      console.log(`Falhou devido a ${error}`)
    }
  }

  const clearError = () => {
  setLoginError(''); 
  setRegisterError('')
  setRegisterSuccess('');
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const ErrorMessage = ({message}) => {
    if(!message){
     return null
    } 
    return(
    <div className='backdrop-blur-md bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4'>
      {message}
    </div>
    )
  }

   const SuccessMessage = ({message}) => {
    if(!message){
     return null
    } 
    return(
    <div className='backdrop-blur-md bg-indigo-500/20 border border-indigo-500 text-white px-4 py-3 rounded-lg mb-4'>
      {message}
    </div>
    )
  }


  // Componente de Login
  const LoginForm = () => (
    <div className="backdrop-blur-md bg-black rounded-2xl p-8 shadow-2xl border border-slate-700/50 max-w-md w-full mx-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Entrar</h2>
        <p className="text-gray-300">Acesse sua conta</p>
      </div>
      
    <ErrorMessage message={loginError} />

      <form className="space-y-4" onSubmit={HandleLogin} noValidate>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
            ref={inputUsernameLogin}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
            ref={inputSenhaLogin}
            required
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
         onClick={() => { setCurrentView('register'); clearError(); }}
          className="text-gray-300 hover:text-white transition-colors"
        >
          Não tem conta? <span className="underline text-indigo-400">Cadastre-se</span>
        </button>
      </div>
      
      <button
              onClick={() => { setCurrentView('home'); clearError(); }}
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

      <ErrorMessage message={registerError} />
      <SuccessMessage message={registerSuccess} />
      
      <form className="space-y-4" onSubmit={HandleRegister} noValidate>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
            ref={inputUsername}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
            ref={inputEmail}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
            ref={inputSenha}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmar Senha"
            className="w-full px-4 py-3 bg-slate-900/5 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
            ref={inputConfirmarSenha}
            required
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
              onClick={() => { setCurrentView('login'); clearError(); }}
          className="text-gray-300 hover:text-white transition-colors"
        >
          Já tem conta? <span className="underline text-indigo-400">Faça login</span>
        </button>
      </div>
      
      <button
              onClick={() => { setCurrentView('home'); clearError(); }}
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
               <div className="inline-block p-2 rounded-full bg-indigo-600 backdrop-blur-md border border-slate-700/50 shadow-2xl mb-8 overflow-hidden">
                <img src="../src/assets/icons/logo.png" alt="Logo" className="w-20 h-20 rounded-full object-cover" />
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Task <span className=' hover:text-indigo-700 hover:border-b hover:border-indigo-700 hover:transition-all'>Hub</span>
              </h1>
              <p className="text-m1 text-gray-300 max-w-md mx-auto leading-relaxed">
                Organize suas tarefas e objetivos
              </p>
            </div>

            <div className={`space-y-4 transition-all duration-1000 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                        onClick={() => { setCurrentView('login'); clearError(); }}
                  className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[160px]"
                >
                  <span className="relative z-10" >Entrar</span>
                </button>
                
                <button
                        onClick={() => { setCurrentView('register'); clearError(); }}
                  className="group relative px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-slate-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-700/50 min-w-[160px]"
                >
                  <span className="relative z-10">Cadastrar</span>
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mt-8">
                Desenvolvido por <span className="hover:text-indigo-500 transition-colors">whoisleoo</span>
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