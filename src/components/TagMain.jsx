import './tagmain.css';
import GameForm from './GameForm';
import './gameform.css';

function TagMain() {
    return(
        <div className='mainStyles'>
            <main className='gameContainer'>
                <GameForm />
            </main>
        </div>
    );
}

export default TagMain