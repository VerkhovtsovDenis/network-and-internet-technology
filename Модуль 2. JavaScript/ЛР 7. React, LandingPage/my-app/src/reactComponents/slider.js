import React, { useState } from 'react';

function Slider(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setOpenClose] = React.useState(false);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props.listImages.length);
    };
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1) % props.listImages.length);
    };

    const press = () => {
        setOpenClose(!isOpen);
    };


    return (
        <div>
            <div className="block">
                <h3 onClick={press} className="pointer">
                    <span>СЛАЙДЕР</span>
                    <span className="button-input">{isOpen ? "+" : "x"}</span>
                </h3>
            </div>
            {isOpen && (<div className="slider-container">

                <div>
                    <button onClick={prevSlide} className="prev-button">←</button>

                    <div className="slider">
                        {props.listImages.map((item, index) => (
                            <div
                                key={index}
                                className={"slide " + ((index === currentIndex) ? 'active' : '')}
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                <img src={item.src} className="cardimg" alt={item.name} />
                                <h4>{item.name}</h4>
                                <div className="comm">
                                    <h5>Ввод в эксплуатацию:</h5>
                                    <p>{item.commissioning}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                    <button onClick={nextSlide} className="next-button">→</button>
                </div>

            </div>)}
        </div>

    );
}

export default Slider;
