import './header.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/gmLogo.jpeg';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) document.body.classList.add('menuOpen');
        else document.body.classList.remove('menuOpen');
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <div className={`menuOverlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

            <header className='headerContainer'>
                <img className='imgContainer' src={logo} alt="GameTraker Logo" />
                <h1>GameTraker Winnian</h1>

                <button onClick={toggleMenu} className='menuButton'>
                    {menuOpen ? "✖" : "☰"}
                </button>

                <nav className={`menuDeslizante ${menuOpen ? "menuActivo" : ""}`}>
                    <Link to="/" onClick={closeMenu}>Inicio</Link>
                    <Link to="/juegos" onClick={closeMenu}>Juegos</Link>
                    <Link to="/agregar-juego" onClick={closeMenu}>Agregar juegos</Link>
                </nav>
            </header>
        </>
    );
}

export default Header;