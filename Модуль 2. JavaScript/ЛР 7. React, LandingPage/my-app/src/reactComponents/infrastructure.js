
import React from "react";

function Infrastructure(props) {
    const [isOpen, setOpenClose] = React.useState(false);

    const cells = props.objects.map((item, id) => (
        <div id={id}>
            <h4>{item.name}</h4>
            <p>{item.discr}</p>
        </div>
    ));

    const press = () => {
        setOpenClose(!isOpen);
    };

    return (
        <div className="infrastructure">
            <h3 onClick={press} className="pointer">
                <span>ИНФРАСТРУКТУРА</span>
				<span className="button-input">{isOpen?"+":"x"}</span>
            </h3>

            {isOpen && (
                <div className="cells infrastructure-content">{cells}</div>
            )}
        </div>
    );
}

export default Infrastructure;
