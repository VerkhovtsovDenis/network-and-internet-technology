import React, { useState } from 'react';
import Title from './title';

function Slider(props) {

    const [isOpen, setOpenClose] = React.useState(false);
    const handleOpenChange = () =>{
        setOpenClose(!isOpen)
        console.log(isOpen)
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props.listImages.length);
    };
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1) % props.listImages.length);
    };

    return (
        <div>
            <Title name={props.name} onClick={handleOpenChange}/>
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
