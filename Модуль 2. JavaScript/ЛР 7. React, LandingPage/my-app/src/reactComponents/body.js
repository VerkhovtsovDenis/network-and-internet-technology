
import Infrastructure from './infrastructure.js'
import Slider from './slider.js'
import GuessingGame from './guessingGame.js'

function Body(props) {
    return (
        <div className="body">
            <h1>ИННОВАЦИОННЫЙ НАУЧНО-ТЕХНОЛОГИЧЕСКИЙ ЦЕНТР «РУССКИЙ»</h1>
            <Infrastructure objects={props.objects} map={props.map} />
			<Slider listImages={props.listImages} />
            <GuessingGame />
		</div>
    );
}
export default Body;
