import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import ListPage from './pages/listPage'
import { BrowserRouter } from 'react-router-dom';
import TitleBar from './components/TitleBar'
import { ListProvider } from './contexts/listContext';


function App() {

  return (
    
     <Router>
      <TitleBar />
      <div className="min-h-screen bg-gray-100">
        <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/lists" element={<ListPage />} />
          <Route path="*" element={<div className="text-center py-8">Página não encontrada</div>} />
        </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App