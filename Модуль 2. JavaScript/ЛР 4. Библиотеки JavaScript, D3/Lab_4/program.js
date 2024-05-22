class SVG {
	constructor(width = 600, height = 600) {
		this.width = width;
		this.height = height;
		this.svg = d3.select("svg").attr("width", width).attr("height", height);
	}

	getSVG() {
		return this.svg;
	}
	clearSVG() {
		d3.select("svg").selectAll("*").remove();
	}
}

class SettingsDraw {
	constructor() {
		this.setCX(document.getElementById("cxFrom"));
		this.setCY(document.getElementById("cyFrom"));
		this.setScaleX(document.getElementById("scaleXFrom"));
		this.setScaleY(document.getElementById("scaleYFrom"));
		this.setRotation(document.getElementById("rotateFrom"));
	}

	setCX({ value: number }) {
		this.cx = number;
	}
	setCY({ value: number }) {
		this.cy = number;
	}
	setScaleX({ value: number }) {
		this.scaleX = number;
	}
	setScaleY({ value: number }) {
		this.scaleY = number;
	}
	setRotation({ value: number }) {
		this.rotate = number;
	}

	getName(){
		return "SettingsDraw"
	}
}

class SettingsAnimation {
	static data = {
		linear:d3.easeLinear,
		elastic:d3.easeElastic,
		bounce: d3.easeBounce
	}
	constructor() {
		this.setCXFrom(document.getElementById("cxFrom"));
		this.setCXTo(document.getElementById("cxTo"));

		this.setCYFrom(document.getElementById("cyFrom"));
		this.setCYTo(document.getElementById("cyTo"));

		this.setScaleXFrom(document.getElementById("scaleXFrom"));
		this.setScaleXTo(document.getElementById("scaleXTo"));

		this.setScaleYFrom(document.getElementById("scaleYFrom"));
		this.setScaleYTo(document.getElementById("scaleYTo"));

		this.setRotationFrom(document.getElementById("rotateFrom"));
		this.setRotationTo(document.getElementById("rotateTo"));

		this.setAnimationType(document.getElementById("animationType"))
	}

	setCXFrom({ value: number }) {
		this.cxFrom = number;
	}
	setCXTo({ value: number }) {
		this.cxTo = number;
	}

	setCYFrom({ value: number }) {
		this.cyFrom = number;
	}
	setCYTo({ value: number }) {
		this.cyTo = number;
	}

	setScaleXFrom({ value: number }) {
		this.scaleXFrom = number;
	}
	setScaleXTo({ value: number }) {
		this.scaleXTo = number;
	}

	setScaleYFrom({ value: number }) {
		this.scaleYFrom = number;
	}
	setScaleYTo({ value: number }) {
		this.scaleYTo = number;
	}

	setRotationFrom({ value: number }) {
		this.rotateFrom = number;
	}
	setRotationTo({ value: number }) {
		this.rotateTo = number;
	}

	setAnimationType({value:string}){

		this.animationType = SettingsAnimation.data[string];

	}

	getName(){
		return "SettingsAnimation"
	}
}

class Smile {
	constructor(svg, setting) {
		this.svg = svg;
		this.setting = setting;

		this.setSvg();
		this.createSmile();
		this.drawSmile();

		let className = setting.getName();

		if(className === "SettingsDraw"){
			this.transformSmile();
		}
		if(className === "SettingsAnimation"){
			this.runAnimation();
		}
	}

	setSvg() {
		this.smile = this.svg
			.append("g")
			.style("stroke", "brown")
			.style("stroke-width", 2)
			.style("fill", "brown");
	}
	createSmile() {
		//лицо
		this.smile
			.append("circle")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", 50)
			.style("fill", "yellow");

		//левый глаз
		this.smile
			.append("circle")
			.attr("cx", -20)
			.attr("cy", -10)
			.attr("r", 5);
		//правый глаз
		this.smile.append("circle").attr("cx", 20).attr("cy", -10).attr("r", 5);

		// улыбка
		this.arc = d3.arc().innerRadius(35).outerRadius(35);
	}

	drawSmile() {
		this.smile
			.append("path")
			.attr(
				"d",
				this.arc({
					startAngle: (Math.PI / 3) * 2,
					endAngle: (Math.PI / 3) * 4,
				})
			)
			.style("stroke", "brown");
	}

	transformSmile() {
		this.smile.attr(
			"transform",
			`translate(${this.setting.cx},
                        ${this.setting.cy})
            scale (${this.setting.scaleX},
                ${this.setting.scaleY})
            rotate(${this.setting.rotate})`
		);
	}
	runAnimation() {
		this.smile.attr("transform", `translate(${this.setting.cxFrom}, ${this.setting.cyFrom}`)
			.transition()
			.duration(6000)
			.ease(this.setting.animationType)
			.attr("transform", `translate(${this.setting.cxTo}, ${this.setting.cyTo})`);
	}
}

class Changer {
	static isAnimationActive = false;

	static animationComponent = [];
	static staticComponent = [];

	static setAnimationComponent() {
		Changer.animationComponent = [
			document.getElementById("cxTo"),
			document.getElementById("cyTo"),
			document.getElementById("scaleXTo"),
			document.getElementById("scaleYTo"),
			document.getElementById("rotateTo"),
			document.getElementById("cxToLabel"),
			document.getElementById("cyToLabel"),
			document.getElementById("scaleXToLabel"),
			document.getElementById("scaleYToLabel"),
			document.getElementById("rotateToLabel"),
			document.getElementById("animate"),
		];

		Changer.staticComponent = [document.getElementById("draw")];
		Changer.staticComponent.forEach((element) => {
			element.style.opacity = "0";
		});
	}

	static change() {
		if (Changer.isAnimationActive) {
			Changer.animationComponent.forEach((element) => {
				element.style.opacity = "inherit";
			});
			Changer.staticComponent.forEach((element) => {
				element.style.opacity = "0";
			});
		} else {
			Changer.animationComponent.forEach((element) => {
				element.style.opacity = "0";
			});
			Changer.staticComponent.forEach((element) => {
				element.style.opacity = "inherit";
			});
		}
		Changer.isAnimationActive = !Changer.isAnimationActive;
	}
}

let smilesArray = [];
let my_svg = new SVG(600, 600);

document.getElementById("clear").onclick = my_svg.clearSVG;
document.getElementById("animation").onchange = Changer.change;

document.getElementById("draw").onclick = function () {
	smilesArray.push(new Smile(my_svg.getSVG(), new SettingsDraw()));
};

document.getElementById("animate").onclick = function () {
	smilesArray.push(new Smile(my_svg.getSVG(), new SettingsAnimation()));
};

document.addEventListener("DOMContentLoaded", function () {
	let array = document.getElementsByTagName("label");
	for (const element of array) {
		element.id = `${element.htmlFor}Label`;
	}
	Changer.setAnimationComponent();
});

