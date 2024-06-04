
import Infrastructure from './infrastructure.js'
import Images from './images.js'


function Body(props) {
    return (
        <div className="body">
            <h1>ИННОВАЦИОННЫЙ НАУЧНО-ТЕХНОЛОГИЧЕСКИЙ ЦЕНТР «РУССКИЙ»</h1>
            <Infrastructure objects={props.objects} map={props.map} />
			<Images listImages={props.listImages} />
		</div>
    );
}
export default Body;
