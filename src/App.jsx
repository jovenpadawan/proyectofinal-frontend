import './components/body.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Header from './components/header';
import TagMain from './components/TagMain';
import GameForm from './components/GameForm';

function App() {

  return (  
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TagMain />} />
        <Route path="/agregar-juego" element={<GameForm />} />
      </Routes>
    </Router>
  )
}

export default App
