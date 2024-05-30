let correspond = {
    ФИО: "name",
    Пол: "sex",
    Город: "sity",
    Возраст: ["date_bFrom", "date_bTo"],
    "Результаты теста 1": ["test1From", "test1To"],
    "Результаты теста 2": ["test2From", "test2To"],
    Оценка: "result",
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

changeNextSelect = (nextSelectId, curSelect) => {
    let nextSelect = document.getElementById(nextSelectId);

    if (curSelect.selectedIndex === 0) {
        let nextSelects = [];
        if (curSelect.id === "fieldsFirst") {
            nextSelects.push(document.getElementById("fieldsSecond"));
            nextSelects.push(document.getElementById("fieldsThird"));
        } else if (curSelect.id === "fieldsSecond") {
            nextSelects.push(document.getElementById("fieldsThird"));
        }

        nextSelects.forEach(select => {
            select.disabled = true;
            select.selectedIndex = 0;
        });

    } else {
        nextSelect.disabled = false;
    }

    nextSelect.innerHTML = '';
    nextSelect.appendChild(createOption('Нет', 0));

    Array.from(curSelect.options).forEach(option => {
        if (option.value !== curSelect.value && option.value !== "0") {
            nextSelect.appendChild(createOption(option.text, option.value));
        }
    });
}

let setSortSelects = (idTable) => {
    let head = Object.keys(correspond)
    let allSelect = document.getElementById('sort').getElementsByTagName('select');

    for (let j = 0; j < allSelect.length; j++) {
        setSortSelect(head, allSelect[j]);

        allSelect[j].addEventListener('change', function() {
            if (j + 1 < allSelect.length) {
                changeNextSelect(allSelect[j + 1].id, allSelect[j]);
            }
        });

        if (j > 0 && allSelect[j - 1].selectedIndex === 0) {
            allSelect[j].disabled = true;
        }
    }
}

let setSortSelect = (head, sortSelect) => {
    sortSelect.appendChild(createOption('Нет', 0));
    head.forEach((item, index) => {
        sortSelect.appendChild(createOption(item, index + 1));
    });
}


// Функция для сброса сортировки
let resetSorting = () => {
    // Восстанавливаем поля формы для настройки сортировки
    // let data = raiting[0]; // Первый элемент массива raiting
    let dataForm = document.getElementById("sort"); // Форма с настройкой сортировки
    // setSortSelects(data, dataForm);

    // Обнуляем значения всех select
    let allSelects = dataForm.getElementsByTagName("select");
    for (let i = 0; i < allSelects.length; i++) {
        allSelects[i].selectedIndex = 0; // Устанавливаем выбранный индекс на 0 (первый элемент - "Нет")
    }

    // Восстанавливаем исходную таблицу
    let originalTable = document.getElementById("list");
    originalTable.innerHTML = ""; // Очищаем текущую таблицу

    // Восстанавливаем исходные данные и выводим таблицу на страницу
    createTable(raiting, "list");
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
        if (item.type == "date") {
            if (valInput != "") {
                valInput = valInput;
            } else {
                if (item.id.includes("From")) valInput = "1930-01-01";
                if (item.id.includes("To")) valInput = "2025-01-01";
            }
        }

        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

let change_date = (val) => {
    let DD, MM, yyyy, arr;
    arr = val.split(".");
    DD = arr[0];
    MM = arr[1];
    yyyy = arr[2];
    return `${yyyy}-${MM}-${DD}`;
};

let filterTable = (data, idTable, dataForm) => {
    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter((item) => {
        let result = true;
        console.log(item); // Выводим текущий элемент данных
        let set = [];
        for (let key in item) {
            let val = item[key];
            console.log("Res:", key, val, typeof val);

            if (typeof val == "string") {
                if (key !== "Возраст") {
                    val = item[key].toLowerCase();
                    result &&= val.indexOf(datafilter[correspond[key]]) !== -1;
                    set.push(val.indexOf(datafilter[correspond[key]]) !== -1);
                } else {
                    let from = datafilter[correspond[key][0]];
                    let to = datafilter[correspond[key][1]];

                    val = change_date(val.toString());
					console.log(val);

                    if (from && to) {
                        result &&= val >= from && val <= to;
                        console.log(
                            "->>>>>> ",
                            result,
                            val >= from && val <= to,
                            val,
                            from,
                            to,
                            typeof val,
                            typeof from,
                            typeof to
                        );
                        set.push(val >= from && val <= to);
                    } else if (from) {
                        result &&= val >= from;
                        set.push(val >= from);
                    } else if (to) {
                        result &&= val <= to; 
                    }
                }
            }
            if (typeof val === "number") {
                let from = datafilter[correspond[key][0]];
                let to = datafilter[correspond[key][1]];

                if (from && to) {
                    result &&= val >= parseFloat(from) && val <= parseFloat(to);
                    set.push(val >= parseFloat(from) && val <= parseFloat(to));
                } else if (from) {
                    result &&= val >= parseFloat(from);
                    set.push(val >= parseFloat(from));
                } else if (to) {
                    result &&= val <= parseFloat(to);
                    set.push(val <= parseFloat(to));
                }
            }
        }
        // console.log("Result:", set, datafilter); // Выводим результат фильтрации
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

// Находим кнопку "Очистить фильтры" по ее id
let clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function () {
    resetSorting(); // Сброс уровней сортировки

    let dataForm = document.getElementById("filter");

    let clearFilter = (dataForm, idTable) => {
        dataForm.reset();
        clearTable("list");
        createTable(raiting, "list");
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



let createSortArr = (data) => {
    let sortArr = [];

    let sortSelects = data.getElementsByTagName("select");

    for (let i = 0; i < sortSelects.length; i++) {
        // получаем номер выбранной опции
        let keySort = sortSelects[i].value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем номер значение флажка для порядка сортировки
        // имя флажка сформировано как имя поля SELECT и слова Desc

        let desc = document.getElementById(sortSelects[i].id + "Desc").checked;
        sortArr.push({ column: keySort - 1, order: desc });
    }
    return sortArr;
};

let sortTable = (idTable, data) => {
    let sortArr = createSortArr(data);

    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);
    // преобразуем строки таблицы в массив
    let rowData = Array.from(table.rows);

    // удаляем элемент с заголовками таблицы
    rowData.shift();

    //сортируем данные по возрастанию по всем уровням сортировки
    rowData.sort((first, second) => {
        for (let i in sortArr) {
            let key = sortArr[i].column;

            let order = sortArr[i].order;
            if (first.cells[key].innerHTML > second.cells[key].innerHTML) {
                return order ? -1 : 1;
            } else if (
                first.cells[key].innerHTML < second.cells[key].innerHTML
            ) {
                return order ? 1 : -1;
            }
        }
        return 0;
    });

    //выводим отсортированную таблицу на страницу
    table.innerHTML = table.rows[0].innerHTML;

    rowData.forEach((item) => {
        table.append(item);
    });
};

// Находим кнопку "Найти" по ее id
let searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
    resetSorting(); // Сброс уровней сортировки
    let dataForm = document.getElementById("filter");
    filterTable(raiting, "list", dataForm);
});

let sortButton = document.getElementById("sortButton");
let resetSortButton = document.getElementById("resetSortButton");

sortButton.onclick = function () {
    sortTable("list", document.getElementById("sort"));
};

resetSortButton.onclick = function () {
    resetSorting();
};

let fieldsFirstButton = document.getElementById("fieldsFirst");
let fieldsSecondButton = document.getElementById("fieldsSecond");

fieldsFirstButton.onchange = function () {
    changeNextSelect("fieldsSecond", [fieldsFirstButton]);
};

fieldsSecondButton.onchange = function () {
    changeNextSelect("fieldsThird", [fieldsFirstButton, fieldsSecondButton]);
};

document.addEventListener("DOMContentLoaded", function () {
    createTable(raiting, "list");

    let data = raiting[0]; // Первый элемент массива buildings
    let dataForm = document.getElementById("sort"); // Форма с настройкой сортировки
    setSortSelects("list");
});

function createSVG(){
    d3.select("div.l-settings")
}