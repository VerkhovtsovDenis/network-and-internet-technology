import React from "react";

function Images(props) {
    const [isOpen, setOpenClose] = React.useState(true);

    const imges = props.listImages.map((item, id) => (
        <div id={id} className="card justify-center items-center">
            <img src={item.src} className="h-22 w-22 rounded-full">
            </img>
            <p name="name">{item.name}</p>

            <div className="commissioning">
                <strong>
                    <p>Ввод в эксплотацию:</p>
                </strong>
                <p>{item.commissioning}</p>
            </div>
        </div>
    ));

    console.log(props.listImages)

    const press = () => {
        setOpenClose(!isOpen);
    };

    return (
        <div className="infrastructure">
            <h3 onClick={press} className="pointer">
                <span>КАРТИНКИ</span>
                <span className="button-input">{!isOpen ? "+" : "x"}</span>
            </h3>

            {isOpen && (
                <div className="imges">{imges}</div>
            )}
        </div>
    );
}
export default Images;
