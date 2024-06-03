const svg = d3.select("body").insert("svg", "article.l-special")
const button = d3.select("input#draw")

const map = Array.prototype.map;

function drawT() {

    function getSettings() {
        const OX = d3.select("div.base-axis_x").select(":checked").attr("value")
        const OY = Array.from(d3.select("div.base-axis_y").selectAll(":checked")["_groups"][0]).map((num) => num.value)
        const visualizationType = d3.select(`select#visualizationType`)["_groups"][0][0].value
        const processingFunction = d3.select(`select#processingFunction`)["_groups"][0][0].value


        // console.log(1, OX)
        // console.log(2, OY)
        // console.log(3, visualizationType)
        // console.log(4, processingFunction)
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
                // console.log(element, typeof element)
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

    function drawGraph(data, [visType, OX, OY]){
        svg.select("*").remove()
        const [scX, scY] = createAxis(arrGraph, isMin, isMax);

        y.forEach(element => {
            attr = (element === "test1")?   [data, csX, csY, 0, "blue"]:
                                            [data, csX, csY, 1, "red"]
            createChart(attr)                                
        })
    }


    [vis, proc, x, y] = getSettings()
    data = createArrGraph(proc, x, y)
    console.log(data)
}


button.on("click", drawT)
