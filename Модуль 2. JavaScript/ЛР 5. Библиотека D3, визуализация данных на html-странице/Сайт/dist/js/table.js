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


    function getData(proc, x, y) {
        // raiting
        console.log(proc)

        func = new functionPreprocessing(proc)



        arr = Object.groupBy(raiting, rait => rait[dict[x]])

        for (key in arr) {
            values = {

            }
            y.forEach(element => {
                // console.log(element, typeof element)
                b = arr[key].map((obj) => obj[dict[element]])
                values.add(element, func.function(b))
                // console.log(key, )
            });
            console.log(values)
        }
    }


    [vis, proc, x, y] = getSettings()
    // console.log(vis, proc, x, y)
    getData(proc, x, y)

}


button.on("click", drawT)
