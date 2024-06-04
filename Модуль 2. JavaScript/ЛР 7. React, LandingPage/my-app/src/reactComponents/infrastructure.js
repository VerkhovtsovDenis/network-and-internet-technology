
import React from "react";
import Title from "./title";

function Infrastructure(props) {
    const [isOpen, setOpenClose] = React.useState(false);
    const handleOpenChange = () =>{
        setOpenClose(!isOpen)
        console.log(isOpen)
    }

    const cells = props.objects.map((item, id) => (
        <div id={id}>
            <h4>{item.name}</h4>
            <p>{item.discr}</p>
        </div>
    ));

    return (
        <div>
            <Title name={props.name} onClick={handleOpenChange}/>

            {isOpen && (
                <div className="cells infrastructure-content">{cells}</div>
            )}
        </div>
    );
}

export default Infrastructure;
