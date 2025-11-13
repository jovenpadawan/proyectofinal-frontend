import './tagmain.css';
import logo from '../assets/images/gmLogo.jpeg';

function TagMain() {
    return(
        <div className='mainStyles'>
            <main className='gameContainer'>
                <img src={logo}></img>
            </main>
        </div>
    );
}

export default TagMain