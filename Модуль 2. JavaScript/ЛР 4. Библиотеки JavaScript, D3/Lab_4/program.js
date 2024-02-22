//инициализация svg элемента

// создаем изображение смайлик
// рисуем его относительно точки (0, 0)

class SVG {
    constructor(width = 600, height = 600) {
        this.width = width;
        this.height = height;
        this.svg = d3.select("svg").attr("width", width).attr("height", height);
    }

    getSVG() {
        return this.svg;
    }
    clearSVG(){
        d3.select("svg").selectAll("*").remove();
    }
}

class Settings {
    constructor() {
        this.cx = 300;
        this.cy = 300;

        this.scaleX = 1;
        this.scaleY = 1;

        this.rotate = 0;
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

    
    setStump() {
        this.setCX(document.getElementById("cx"));
        this.setCY(document.getElementById("cy"));
        this.setScaleX(document.getElementById("scaleX"));
        this.setScaleY(document.getElementById("scaleY"));
        this.setRotation(document.getElementById("rotate"));
    }
}

class Smile {
    constructor(svg, setting) {
        this.svg = svg;
        this.setting = setting;

        this.setSvg();
        this.createSmile();
        this.drawSmile();
        this.transformSmile();
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
}

let smilesArray = [];
let s = new Settings();
let my_svg = new SVG(600, 600);


document.getElementById("draw").onclick = function () {
    s.setStump();
    smilesArray.push(new Smile(my_svg.getSVG(), s));
};

document.getElementById("clear").onclick = my_svg.clearSVG;

