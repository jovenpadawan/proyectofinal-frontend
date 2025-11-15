import { useState } from 'react';
import './rating.css';

 
function Rating({ gameId, isOpen, currentRating, onToggle, onRate }) {
    const [hover, setHover] = useState(0); 

    const handleClick = (value) => {
        onRate(gameId, value);
        onToggle(gameId);
    };

 
    const activeStars = hover || currentRating;

    return (
        <>
            <div 
                className="ratingIcon" 
                onClick={() => onToggle(gameId)} 
                role="button" 
                aria-expanded={isOpen}
            >
              
                {currentRating > 0 ? `⭐ (${currentRating})` : '⭐'}
            </div>

         
            {isOpen && (
                <div className="ratingPopover">
                    <span className="ratingTitle">Puntuar:</span>
                    <div className="ratingStars">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span 
                                key={value} 
                                className="ratingStar"
                               
                                style={{ color: value <= activeStars ? 'gold' : '#ccc' }}
                                onClick={() => handleClick(value)} 
                                onMouseEnter={() => setHover(value)} 
                                onMouseLeave={() => setHover(0)} 
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Rating;