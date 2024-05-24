browsers = [
    { title: "Mozilla Firefox", rate: 5.96 },
    { title: "Google Chrome", rate: 63.33 },
    { title: "Apple Safari", rate: 13.13 },
    { title: "Microsoft Edge", rate: 10.46 },
];

add = [
    { title: "Яндекс.Браузер", rate: 7.47 },
    {
        title: "Firefox",
        rate: 2.2,
    },
];

let compareByTitle = (a, b) => {
    return a.rate < b.rate ? -1 : 1;
};

let table = d3.select("table");

let rows = table
    .select("tbody")
    .selectAll("tr")
    .data(browsers)
    .enter()
    .append("tr");

let cells = rows
    .selectAll("td")
    .data((d) => Object.values(d))
    .enter()
    .append("td")
    .text((d) => d);

let head = table
    .select("thead")
    .selectAll("th")
    .data((d) => Object.keys(browsers[0]))
    .enter()
    .append("td")
    .text((d) => d);

browsers = [...browsers, ...add];
console.log(browsers);

rows = table
    .select("tbody")
    .selectAll("tr")
    .data(browsers)
    .enter()
    .append("tr");

cells = rows
    .selectAll("td")
    .data((d) => Object.values(d))
    .enter()
    .append("td")
    .text((d) => d)
    .sort(compareByTitle)

let sort = d3
    .select("table")
    .select("tbody")
    .selectAll("tr")
    .sort(compareByTitle);

// browsers = browsers.sort();
