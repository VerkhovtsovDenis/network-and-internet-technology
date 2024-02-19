let correspond = {
    Название: "structure",
    Тип: "category",
    Страна: "country",
    Город: "city",
    Год: ["yearFrom", "yearTo"],
    Высота: ["heightFrom", "heightTo"],
};

let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);

    let tr = document.createElement("tr");
    for (key in data[0]) {
        let th = document.createElement("th");
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);

    data.forEach((item) => {
        let tr = document.createElement("tr");
        for (const [key, value] of Object.entries(item)) {
            let td = document.createElement("td");
            td.innerHTML = value;
            tr.append(td);
        }
        table.append(tr);
    });
};

let clearTable = (idTable) => {
    let tableElement = document.getElementById(idTable);
    tableElement.innerHTML = "";
};

let dataFilter = (dataForm) => {
    let dictFilter = {};
    // перебираем все элементы формы с фильтрами

    for (let j = 0; j < dataForm.elements.length; j++) {
        // выделяем очередной элемент формы
        let item = dataForm.elements[j];

        // получаем значение элемента
        let valInput = item.value;
        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        }
        if (item.type == "number") {
            if (valInput != "") {
                valInput = Number(valInput);
            } else {
                if (item.id.includes("From")) valInput = -Infinity;
                if (item.id.includes("To")) valInput = Infinity;
            }
        }

        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

let filterTable = (data, idTable, dataForm) => {
    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);

    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter((item) => {
        let result = true;

        for (let key in item) {
            let val = item[key];

            // текстовые поля проверяем на вхождение
            if (typeof val == "string") {
                val = item[key].toLowerCase();
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1;
            }
            if (typeof val === "number") {
                let from = datafilter[correspond[key][0]];
                let to = datafilter[correspond[key][1]];

                if (from && to) {
                    result &&= val >= parseFloat(from) && val <= parseFloat(to);
                } else if (from) {
                    result &&= val >= parseFloat(from);
                } else if (to) {
                    result &&= val <= parseFloat(to);
                }
            }
        }
        return result;
    });

    // создать и вызвать функцию, которая удаляет все строки таблицы с id=idTable
    // показать на странице таблицу с отфильтрованными строками
    let deleteTable = (idTable) => {
        let tableElement = document.getElementById(idTable);
        tableElement.innerHTML = "";
    };

    deleteTable(idTable);
    createTable(tableFilter, idTable);
};

// Находим кнопку "Найти" по ее id
let searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
    let dataForm = document.getElementById("filter");
    filterTable(buildings, "list", dataForm);
});

// Находим кнопку "Найти" по ее id
let clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function () {
    let dataForm = document.getElementById("filter");
    let clearFilter = (dataForm, idTable) => {
        dataForm.reset();
        clearTable("list");
        createTable(buildings, "list");
    };
    clearFilter(dataForm, "list");
});

// формирование полей элемента списка с заданным текстом и значением
let createOption = (str, val) => {
    let item = document.createElement("option");
    item.text = str;
    item.value = val;
    return item;
};

// формирование полей со списком из заголовков таблицы
// параметры – массив из заголовков таблицы и элемент select
8;
let setSortSelect = (head, sortSelect) => {
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption("Нет", 0));

    // перебираем все ключи переданного элемента массива данных
    for (let i in head) {
        // создаем OPTION из очередного ключа и добавляем в SELECT
        // значение атрибута VAL увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(head[i], Number(i) + 1));
    }
};
// формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => {
    // выделяем ключи словаря в массив
    let head = Object.keys(data);
    // находим все SELECT в форме
    let allSelect = dataForm.getElementsByTagName("select");

    for (let j = 0; j < allSelect.length; j++) {
        //формируем опции очередного SELECT
        setSortSelect(head, allSelect[j]);
        //самостоятельно все SELECT, кроме первого, сделать неизменяемыми
        if (j !== 0) {
            allSelect[j].disabled = true;
        }

    }
};

document.addEventListener("DOMContentLoaded", function () {
    createTable(buildings, "list");

    let data = buildings[0]; // Первый элемент массива buildings
    let dataForm = document.getElementById('sort'); // Форма с настройкой сортировки
    setSortSelects(data, dataForm);

});
