import React, { useState } from 'react';
import Title from './title';

function Game(props) {

    function generateRandomNumber() {
        return Math.floor(Math.random() * 200) + 1700;
    }

    const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [numTry, setTry] = useState(1)

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
            setTry(numTry + 1)
        } else {
            setFeedback('Слишком высоко! Попробуйте ещё раз.');
            setTry(numTry + 1)
        }
    };

    const handleRestart = () => {
        setTargetNumber(generateRandomNumber());
        setGuess('');
        setFeedback('');
        setTry(1)
    };

    return (
        <div className="game">
            <h4>Игра: Угадай площадь ИПЦ (Ангаров)</h4>
            <form onSubmit={handleGuessSubmit}>
                <input
                    type="number"
                    value={guess}
                    onChange={handleGuessChange}
                />
                <button type="submit">Угадать</button>
            </form>
            <p>{feedback}</p>
            <p>Попытка №{numTry}</p>
            <button onClick={handleRestart}>Начать заново</button>
        </div>)
}

function GuessingGame(props) {

    const [isOpen, setOpenClose] = React.useState(false);
    const handleOpenChange = () => {
        setOpenClose(!isOpen)
        console.log(isOpen)
    }

    const press = () => {
        setOpenClose(!isOpen);
    };


    return (
        <div>
            <Title name={props.name} onClick={handleOpenChange} />

            {isOpen && (
                <Game />
            )}
        </div>
    );
};

export default GuessingGame;