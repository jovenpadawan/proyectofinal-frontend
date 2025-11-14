import './components/body.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Header from './components/header';
import TagMain from './components/TagMain';
import GameForm from './components/GameForm';
import List from './components/List'

function App() {

  return (  
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TagMain />} />
        <Route path="/agregar-juego" element={<GameForm />} />
        <Route path="/juegos" element={<List />} />
      </Routes>
    </Router>
  )
}

export default App
