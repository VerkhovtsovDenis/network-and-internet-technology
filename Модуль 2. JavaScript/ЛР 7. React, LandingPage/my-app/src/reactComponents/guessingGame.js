import React, { useState } from 'react';

const GuessingGame = () => {
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isOpen, setOpenClose] = React.useState(false);

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    const handleGuessChange = (event) => {
        setGuess(event.target.value);
    };

    const handleGuessSubmit = (event) => {
        event.preventDefault();
        const playerGuess = parseInt(guess, 10);
        if (playerGuess === targetNumber) {
            setFeedback('Поздравляем! Вы угадали число!');
        } else if (playerGuess < targetNumber) {
            setFeedback('Слишком низко! Попробуйте ещё раз.');
        } else {
            setFeedback('Слишком высоко! Попробуйте ещё раз.');
        }
    };

    const handleRestart = () => {
        setTargetNumber(generateRandomNumber());
        setGuess('');
        setFeedback('');
    };

    const press = () => {
        setOpenClose(!isOpen);
    };


    return (
        <div>
            <div className="block">
                <h3 onClick={press} className="pointer">
                    <span>ИГРА</span>
                    <span className="button-input">{isOpen ? "+" : "x"}</span>
                </h3>
            </div>
            {isOpen && (<>
                <h4>Игра: Угадай число</h4>
                <form onSubmit={handleGuessSubmit}>
                    <input
                        type="number"
                        value={guess}
                        onChange={handleGuessChange}
                    />
                    <button type="submit">Угадать</button>
                </form>
                <p>{feedback}</p>
                <button onClick={handleRestart}>Начать заново</button>
            </>

            )}
        </div>
    );
};

export default GuessingGame;