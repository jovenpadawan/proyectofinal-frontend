import './header.css';
import logo from '../assets/images/gmLogo.jpeg';

function Header() {
    return (
        <header className='headerContainer'>
            <img className='imgContainer' src={logo}></img>
            <h1>GameTraker Winnian</h1>
        </header>
    );
}

export default Header