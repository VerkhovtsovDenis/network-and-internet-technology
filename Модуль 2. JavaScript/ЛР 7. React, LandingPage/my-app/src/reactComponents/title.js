import React from "react";

function Title(props) {
    const [isOpen, setOpenClose] = React.useState(false);
    const press = () => {
        setOpenClose(!isOpen);
        props.onClick()
    };

    return (
        <>
            <div className="block">
                <h3 onClick={press} className="pointer">
                    <span>{props.name}</span>
                    <span className="button-input">{isOpen ? "x" : "+"}</span>
                </h3>
            </div>
        </>
    )
}
export default Title;
