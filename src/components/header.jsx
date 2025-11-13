import './header.css';
import logo from '../assets/images/gmLogo.jpeg';

function Header() {
    return (
        <header className='headerContainer'>
            <img className='imgContainer' src={logo} alt="GameTraker Logo" />
            <h1>GameTraker Winnian</h1>
            <nav className='headerMenu'>
                <button className='headerButtomMenu'>☰</button>
            </nav>
        </header>
    );
}

export default Header