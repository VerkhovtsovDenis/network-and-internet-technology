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

// Сортировка
let compareByTitle = (a, b) => {
    return a.rate < b.rate ? -1 : 1;
};

// Получаем таблицу для манипуляций
let table = d3.select("table");

// добавляем 4 пустых тека в таблицу 
let rows = table
    .select("tbody")
    .selectAll("tr")
    .data(browsers)
    .enter()
    .append("tr");

// 
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





// неверный код
// browsers = [...browsers, ...add];
// rows = table
//     .select("tbody")
//     .selectAll("tr")
//     .data(browsers)
//     .enter()
//     .append("tr");

// cells = rows
//     .selectAll("td")
//     .data((d) => Object.values(d))
//     .enter()
//     .append("td")
//     .text((d) => d)
//     .sort(compareByTitle)

// let sort = d3
//     .select("table")
//     .select("tbody")
//     .selectAll("tr")
//     .sort(compareByTitle);

// browsers = browsers.sort();
