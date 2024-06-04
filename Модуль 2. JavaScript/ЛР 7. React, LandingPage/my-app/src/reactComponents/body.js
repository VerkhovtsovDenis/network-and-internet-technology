
import Infrastructure from './infrastructure.js'
import Slider from './slider.js'
import GuessingGame from './guessingGame.js'
import InputForm from './form.js';
import Info from './info.js';

function Body(props) {
    return (
        <div className="body">
            <h1>{props.listTitles.main}</h1>
            <Infrastructure objects={props.objects} map={props.map} name={props.listTitles.infrastructure}/>
			<Slider listImages={props.listImages} name={props.listTitles.slider}/>
            <GuessingGame name={props.listTitles.guessingGame}/>
            <InputForm arr={[]} helpP="1" name={props.listTitles.inputForm}/>
            <Info name={props.listTitles.info} tableData={props.tableData}/>
		</div>
    );
}
export default Body;
