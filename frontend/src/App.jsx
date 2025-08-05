import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'

function App() {

  return (
     <Router>
      <div className="min-h-screen bg-gray-100">
        <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div className="text-center py-8">Página não encontrada</div>} />
        </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App