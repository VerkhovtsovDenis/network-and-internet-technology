body = d3.select("body");

svg = d3.select("svg");

class Draw {
    constructor(svg, centerX, centerY) {
        this.svg = svg;
        this.centerX = centerX;
        this.centerY = centerY;
        this.nowX = centerX;
        this.nowY = centerY;
        this.angle = 0

        this.svg.attr("transform-origin", "center,center")

    }

    draw() {
        // To be implemented by subclasses
    }

    animate(duration) {
        const initialY = this.centerY;
        const nowY = this.nowY;

        // this.svg.attr("transform", null)
        var alpha = d3.select('input#rotateValue')._groups[0][0].value
        if (alpha == "")
            alpha = 90
        // this.svg.transition()
        //     .duration(duration)
        //     .attr("transform", `rotate(${this.angle + alpha})`)
        // .attr("transform", `translate(${-200}, ${nowY - initialY}) rotate(-${alpha/4}, ${nowX}, ${nowY})`)

        this.svg.transition()
            .duration(duration * 0.2)
            .attr("transform", `translate(${-200}, ${nowY - initialY})`)
            .transition()
            .duration(duration * 0.3)
            .attr("transform", `translate(${-100}, ${nowY - initialY - 100})`)
            .transition()
            .duration(duration * 0.3)
            .attr("transform", `translate(${-200}, ${nowY - initialY - 100 - 100})`)
            .transition()
            .duration(duration * 0.2)
            .attr("transform", `translate(${0}, ${nowY - initialY - 100 - 100})`)
            .on("end", () => {
                this.nowY = this.nowY - 200;
                this.angle += alpha
            })
        }

}

class Raccoon extends Draw {
    draw() {
        // Голова енота (овал)
        this.svg
            .append("ellipse")
            .attr("cx", this.centerX)
            .attr("cy", this.centerY)
            .attr("rx", 80)
            .attr("ry", 70)
            .style("fill", "gray");

        // Уши енота (два прямоугольных треугольника)
        this.svg
            .append("polygon")
            .attr(
                "points",
                `${this.centerX - 70},${this.centerY - 50} ${this.centerX - 30
                },${this.centerY - 120} ${this.centerX - 30},${this.centerY - 50
                }`
            )
            .style("fill", "gray");

        this.svg
            .append("polygon")
            .attr(
                "points",
                `${this.centerX + 30},${this.centerY - 50} ${this.centerX + 30
                },${this.centerY - 120} ${this.centerX + 70},${this.centerY - 50
                }`
            )
            .style("fill", "gray");

        // Глаза (два овала)
        this.svg
            .append("ellipse")
            .attr("cx", this.centerX - 30)
            .attr("cy", this.centerY - 10)
            .attr("rx", 20)
            .attr("ry", 30)
            .style("fill", "white");

        this.svg
            .append("ellipse")
            .attr("cx", this.centerX + 30)
            .attr("cy", this.centerY - 10)
            .attr("rx", 20)
            .attr("ry", 30)
            .style("fill", "white");

        // Зрачки (два овала)
        this.svg
            .append("ellipse")
            .attr("cx", this.centerX - 30)
            .attr("cy", this.centerY - 10)
            .attr("rx", 10)
            .attr("ry", 15)
            .style("fill", "black");

        this.svg
            .append("ellipse")
            .attr("cx", this.centerX + 30)
            .attr("cy", this.centerY - 10)
            .attr("rx", 10)
            .attr("ry", 15)
            .style("fill", "black");

        // Полосы вокруг глаз (два прямоугольника с радиусом закругления)
        this.svg
            .append("rect")
            .attr("x", this.centerX - 60)
            .attr("y", this.centerY - 30)
            .attr("width", 60)
            .attr("height", 40)
            .attr("rx", 20)
            .attr("ry", 20)
            .style("fill", "black")
            .style("opacity", 0.5);

        this.svg
            .append("rect")
            .attr("x", this.centerX)
            .attr("y", this.centerY - 30)
            .attr("width", 60)
            .attr("height", 40)
            .attr("rx", 20)
            .attr("ry", 20)
            .style("fill", "black")
            .style("opacity", 0.5);

        // Нос (треугольник)
        this.svg
            .append("polygon")
            .attr(
                "points",
                `${this.centerX - 5},${this.centerY + 10} ${this.centerX + 5},${this.centerY + 10
                } ${this.centerX},${this.centerY + 30}`
            )
            .style("fill", "black");

        // Рот (дуга)
        this.svg
            .append("path")
            .attr(
                "d",
                `M${this.centerX - 20},${this.centerY + 30} Q${this.centerX},${this.centerY + 50
                } ${this.centerX + 20},${this.centerY + 30}`
            )
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", 2);

        // Усики (линии)
        var whiskerData = [
            {
                x1: this.centerX - 10,
                y1: this.centerY + 15,
                x2: this.centerX - 50,
                y2: this.centerY + 5,
            },
            {
                x1: this.centerX - 10,
                y1: this.centerY + 20,
                x2: this.centerX - 50,
                y2: this.centerY + 20,
            },
            {
                x1: this.centerX - 10,
                y1: this.centerY + 25,
                x2: this.centerX - 50,
                y2: this.centerY + 35,
            },
            {
                x1: this.centerX + 10,
                y1: this.centerY + 15,
                x2: this.centerX + 50,
                y2: this.centerY + 5,
            },
            {
                x1: this.centerX + 10,
                y1: this.centerY + 20,
                x2: this.centerX + 50,
                y2: this.centerY + 20,
            },
            {
                x1: this.centerX + 10,
                y1: this.centerY + 25,
                x2: this.centerX + 50,
                y2: this.centerY + 35,
            },
        ];

        whiskerData.forEach((d) => {
            this.svg
                .append("line")
                .attr("x1", d.x1)
                .attr("y1", d.y1)
                .attr("x2", d.x2)
                .attr("y2", d.y2)
                .style("stroke", "black")
                .style("stroke-width", 2);
        });
    }
}

class Fox extends Draw {
    draw() {
        // Голова лисы (овал)
        this.svg
            .append("ellipse")
            .attr("cx", this.centerX)
            .attr("cy", this.centerY)
            .attr("rx", 80)
            .attr("ry", 70)
            .style("fill", "orange");

        // Уши лисы (два треугольника)
        this.svg
            .append("polygon")
            .attr(
                "points",
                `${this.centerX - 60},${this.centerY - 20} ${this.centerX - 20
                },${this.centerY - 110} ${this.centerX - 20},${this.centerY - 20
                }`
            )
            .style("fill", "orange");

        this.svg
            .append("polygon")
            .attr(
                "points",
                `${this.centerX + 20},${this.centerY - 20} ${this.centerX + 20
                },${this.centerY - 110} ${this.centerX + 60},${this.centerY - 20
                }`
            )
            .style("fill", "orange");

        // Внутренняя часть ушей (два треугольника)
        this.svg
            .append("polygon")
            .attr(
                "points",
                `${this.centerX - 50},${this.centerY - 20} ${this.centerX - 20
                },${this.centerY - 80} ${this.centerX - 20},${this.centerY - 20
                }`
            )
            .style("fill", "white");

        this.svg
            .append("polygon")
            .attr(
                "points",
                `${this.centerX + 20},${this.centerY - 20} ${this.centerX + 20
                },${this.centerY - 80} ${this.centerX + 50},${this.centerY - 20
                }`
            )
            .style("fill", "white");

        // Глаза (два овала)
        this.svg
            .append("ellipse")
            .attr("cx", this.centerX - 30)
            .attr("cy", this.centerY)
            .attr("rx", 15)
            .attr("ry", 20)
            .style("fill", "white");

        this.svg
            .append("ellipse")
            .attr("cx", this.centerX + 30)
            .attr("cy", this.centerY)
            .attr("rx", 15)
            .attr("ry", 20)
            .style("fill", "white");

        // Зрачки (два овала)
        this.svg
            .append("ellipse")
            .attr("cx", this.centerX - 30)
            .attr("cy", this.centerY)
            .attr("rx", 7)
            .attr("ry", 10)
            .style("fill", "black");

        this.svg
            .append("ellipse")
            .attr("cx", this.centerX + 30)
            .attr("cy", this.centerY)
            .attr("rx", 7)
            .attr("ry", 10)
            .style("fill", "black");

        // Нос (треугольник)
        this.svg
            .append("polygon")
            .attr(
                "points",
                `${this.centerX - 5},${this.centerY + 30} ${this.centerX + 5},${this.centerY + 30
                } ${this.centerX},${this.centerY + 50}`
            )
            .style("fill", "black");

        // Рот (дуга)
        this.svg
            .append("path")
            .attr(
                "d",
                `M${this.centerX - 20},${this.centerY + 50} Q${this.centerX},${this.centerY + 70
                } ${this.centerX + 20},${this.centerY + 50}`
            )
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", 2);

        // Усики (линии)
        var whiskerData = [
            {
                x1: this.centerX - 10,
                y1: this.centerY + 35,
                x2: this.centerX - 50,
                y2: this.centerY + 25,
            },
            {
                x1: this.centerX - 10,
                y1: this.centerY + 40,
                x2: this.centerX - 50,
                y2: this.centerY + 40,
            },
            {
                x1: this.centerX - 10,
                y1: this.centerY + 45,
                x2: this.centerX - 50,
                y2: this.centerY + 55,
            },
            {
                x1: this.centerX + 10,
                y1: this.centerY + 35,
                x2: this.centerX + 50,
                y2: this.centerY + 25,
            },
            {
                x1: this.centerX + 10,
                y1: this.centerY + 40,
                x2: this.centerX + 50,
                y2: this.centerY + 40,
            },
            {
                x1: this.centerX + 10,
                y1: this.centerY + 45,
                x2: this.centerX + 50,
                y2: this.centerY + 55,
            },
        ];

        whiskerData.forEach((d) => {
            this.svg
                .append("line")
                .attr("x1", d.x1)
                .attr("y1", d.y1)
                .attr("x2", d.x2)
                .attr("y2", d.y2)
                .style("stroke", "black")
                .style("stroke-width", 2);
        });
    }
}

var point = {
    x: 500,
    y: 500,
};

svg.on("click", function (event) {
    var [x, y] = d3.pointer(event); // Получаем координаты относительно SVG
    console.log("Координаты клика относительно SVG: ", x, y);
    point = { x: Math.round(x), y: Math.round(y) };

    d3.select('label[for="volume"]').text(`Точка размещения: {${point.x}; ${point.y}}`);
});

var lastFigure = null;

d3.select("#draw").on("click", function () {
    check = d3.select('input[name="figure"]:checked');

    if (check.empty()) {
        return 0;
    } else {
        var selectedValue = check.property("value");
        var svgContainer = svg.append("g");

        if (selectedValue === "fox") {
            lastFigure = new Fox(svgContainer, point.x, point.y);
        } else if (selectedValue === "raccoon") {
            lastFigure = new Raccoon(svgContainer, point.x, point.y);
        }

        lastFigure.draw();
    }
});


d3.select("#animate").on("click", function () {
    if (
        lastFigure != null &&
        (lastFigure.constructor.name == "Raccoon" ||
            lastFigure.constructor.name == "Fox")
    ) {
        var duration = d3.select('input#volume')._groups[0][0].value
        lastFigure.animate(+duration);
    }

});

d3.select("input#volume").on("change", function (event) {
    d = event.target.value
    d3.select('label#volume').text(`Длительность: ${+d} мс.`)

})

d3.select("#clear").on("click", function () {
    svg.selectAll("g").remove();
});

function preset(num) {
    if (num == 1) {
        var svgContainer = svg.append("g");

        lastFigure = new Fox(svgContainer, point.x, point.y)
        lastFigure.draw()

    } else (
        console.log("Ошибка пресета")
    )
}

preset(1)