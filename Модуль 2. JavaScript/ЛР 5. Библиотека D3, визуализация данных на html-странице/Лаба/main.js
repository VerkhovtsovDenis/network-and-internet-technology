drawButton = d3.select("button#drawGraphics")
showButton = d3.select("button#showTable")

tableState = {
    show: "Скрыть таблицу",
    hide: "Показать таблицу"
}

function drawSVG(){
    d3.select("#graphics").selectAll("svg").remove()
    svg = d3.select("#graphics").append("svg")

}


function changeTableState() {
    console.log()

    if (showButton.text() == tableState.hide) {

        table = d3.select("#table").append("table")
        table.append("thead")
        table.append("tbody")

        tableHead = table.select("thead")
            .selectAll("th")
            .data((d) => Object.keys(buildings[0]))
            .enter()
            .append("th")
            .text((d) => d)

        tableRows = table
            .select("tbody").selectAll("tr")
            .data(buildings)
            .enter()
            .append("tr")

        tableCells = tableRows.selectAll("td")
            .data(d => Object.values(d))
            .enter()
            .append("td")
            .text((d) => d)

        showButton.text(tableState.show)
    } else {
        table.remove()
        showButton.text(tableState.hide)
    }

}
drawButton.on("click", drawSVG)
showButton.on("click", changeTableState)
