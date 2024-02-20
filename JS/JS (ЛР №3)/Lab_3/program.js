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

// Функция для сброса сортировки
let resetSorting = () => {
    // Восстанавливаем поля формы для настройки сортировки
    // let data = buildings[0]; // Первый элемент массива buildings
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
    createTable(buildings, "list");
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
    resetSorting(); // Сброс уровней сортировки
    let dataForm = document.getElementById("filter");
    filterTable(buildings, "list", dataForm);
});

// Находим кнопку "Очистить фильтры" по ее id
let clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function () {
    resetSorting(); // Сброс уровней сортировки

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

// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect) => {
    let nextSelect = document.getElementById(nextSelectId);

    nextSelect.disabled = false;

    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
};

let fieldsFirstButton = document.getElementById("fieldsFirst");

fieldsFirstButton.onchange = function () {
    changeNextSelect("fieldsSecond", fieldsFirstButton);
};

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

let sortButton = document.getElementById("sortButton");

sortButton.onclick = function () {
    sortTable("list", document.getElementById("sort"));
};



// Пример использования resetSorting:
let resetSortButton = document.getElementById("resetSortButton");

resetSortButton.onclick = function () {
    resetSorting();
};

document.addEventListener("DOMContentLoaded", function () {
    createTable(buildings, "list");

    let data = buildings[0]; // Первый элемент массива buildings
    let dataForm = document.getElementById("sort"); // Форма с настройкой сортировки
    setSortSelects(data, dataForm);
});
