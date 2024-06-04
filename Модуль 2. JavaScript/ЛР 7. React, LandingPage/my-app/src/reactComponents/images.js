

function Images(props) {
    const [isOpen, setOpenClose] = React.useState(true);

    const imges = props.images.map((item, id) => (
        <div id={id}>
			<img src={item} className="img">
			</img>
        </div>
    ));

    const press = () => {
        setOpenClose(!isOpen);
    };

    return (
        <div className="infrastructure">
            <h3 onClick={press} className="pointer">
                <span>КАРТИНКИ</span>
				<span className="button-input">{!isOpen?"+":"x"}</span>
            </h3>

            {isOpen && (
                <div className="imges">{imges}</div>
            )}
        </div>
    );
}
export default Images;
