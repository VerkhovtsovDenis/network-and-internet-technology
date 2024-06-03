const svg = d3.select("body").insert("svg", "article.l-special")
const button = d3.select("input#draw")

const map = Array.prototype.map;

const marginX = 50;
const marginY = 50;
const height = 400;
const width = 1920

function drawT() {

    function getSettings() {
        const OX = d3.select("div.base-axis_x").select(":checked").attr("value")
        const OY = Array.from(d3.select("div.base-axis_y").selectAll(":checked")["_groups"][0]).map((num) => num.value)
        const visualizationType = d3.select(`select#visualizationType`)["_groups"][0][0].value
        const processingFunction = d3.select(`select#processingFunction`)["_groups"][0][0].value

        return [visualizationType, processingFunction, OX, OY]
    }

    class functionPreprocessing {
        constructor(name) {
            if (name == "min")
                this.function = this.min
            if (name == "max")
                this.function = this.max
            if (name == "sum")
                this.function = this.sum
            if (name == "middle")
                this.function = this.middle
        }

        min(array) {
            return Math.min(...array)
        }

        max(array) {
            return Math.max(...array)
        }

        sum(array) {
            return array.reduce((a, b) => a + b, 0)
        }

        middle(array) {
            return this.sum(array) / array.length
        }
    }

    // выполняет группировку по столбцу
    function createArrGraph(proc, x, y) {

        func = new functionPreprocessing(proc)
        array_of_labelX = Object.groupBy(raiting, rait => rait[dict[x]])
        data = []

        for (key in array_of_labelX) {
            this_value_for_labelX = []

            y.forEach(element => {
                array_of_raw_data = array_of_labelX[key].map((obj) => obj[dict[element]])

                value_after_function = func.function(array_of_raw_data)
                this_value_for_labelX.push(value_after_function)
            });

            obj = {
                "labelX": key,
                "values": this_value_for_labelX
            }
            data.push(obj)
        }
        return data
    }

    function createAxis(data, OY) {

        let min = max = 0
        let firstRange, secondRange
        if (OY.length == 2) {
            firstRange = d3.extent(data.map(d => d.values[0]))
            secondRange = d3.extent(data.map(d => d.values[1]))
            min = firstRange[0]
            max = secondRange[1]
        }
        else {
            firstRange = d3.extent(data.map(d => d.values[0]))
            min = firstRange[0]
            max = firstRange[1]
        }
        console.log(data)


        let scaleX = d3.scaleBand()
            .domain(data.map(d => d.labelX))
            .range([0, width - 2 * marginX])

        let scaleY = d3.scaleLinear()
            .domain([min * 0.85, max * 1.1])
            .range([height - 2 * marginY, 0])



        let axisX = d3.axisBottom(scaleX)
        let axisY = d3.axisLeft(scaleY)


        svg.append("g")
            .attr("transform", `translate(${marginX}, ${height - marginY})`)
            .call(axisX)
            .selectAll("text") // подписи на оси - наклонные
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-45)");

        svg.append("g")
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .call(axisY);

        return [scaleX, scaleY]
    }

    function createChart(data, scaleX, scaleY, index, color) {
        const r = 4
        let ident = (index == 0) ? -r / 2 : r / 2;

        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[index]) + ident)
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .style("fill", color)
    }
    function createLine(data, scaleX, scaleY, index, color) {
        const line = d3.line()
            .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .y(d => scaleY(d.values[index]));

        svg.append("path")
            .datum(data)
            .style("stroke", color)
            .attr("stroke-width", 2)
            .attr("d", line)
            .attr("transform", `translate(${marginX}, ${marginY})`)
    }
    function createBarChart(data, scaleX, scaleY, index, color) {
        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX))
            .attr("y", d => scaleY(d.values[index]))
            .attr("width", scaleX.bandwidth())
            .attr("height", d => height - scaleY(d.values[index]))
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .style("fill", color)

    }

    function drawGraph(data, [visType, OX, OY]) {

        function selectFunc(name) {
            if (name == "bar") {
                return createBarChart
            }
            if (name == "line") {
                return createLine
            }
            if (name == "scatter") {
                return createChart
            }
        }
        func = selectFunc(visType)

        svg.selectAll("*").remove()
        const [scX, scY] = createAxis(data, OY);

        y.forEach(element => {
            attr = (element === "test1") ? [data, scX, scY, 0, "blue"] :
                [data, scX, scY, y.length - 1, "red"]
            func(...attr)
        })
    }


    [vis, proc, x, y] = getSettings()
    data = createArrGraph(proc, x, y)
    drawGraph(data, [vis, x, y])
}


button.on("click", drawT)
drawT()