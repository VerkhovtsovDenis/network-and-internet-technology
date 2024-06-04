function Head(props) {
    const logoImages = props.logoList.map((img, index) => (
        <img key={index} id={index} src={img} />
    ));
    return <div className="head">{logoImages}</div>;
}
export default Head;
