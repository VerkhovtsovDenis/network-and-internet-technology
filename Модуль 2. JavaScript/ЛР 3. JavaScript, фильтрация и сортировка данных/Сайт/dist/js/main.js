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
    arr = val.split('.');
	DD = arr[2];
	MM = arr[1];
	yyyy = arr[0];
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

            // текстовые поля проверяем на вхождение
            if (typeof val == "string") {
                if (key !== "Возраст") val = item[key].toLowerCase();
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1;
                set.push(val.indexOf(datafilter[correspond[key]]) !== -1);
            } else {
                let from = datafilter[correspond[key][0]];
                let to = datafilter[correspond[key][1]];

				val = change_date(val.toString());
				
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
                    set.push(val <= to);
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

            set.push(val);
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

let changeNextSelect = (nextSelectId, selectArray) => {
    selectArray.forEach((select) => {
        let nextSelect = document.getElementById(nextSelectId);
        nextSelect.disabled = false;

        // Запоминаем текущее выбранное значение в следующем SELECT
        let selectedValue = nextSelect.value;

        // Очищаем следующий SELECT от всех опций
        nextSelect.innerHTML = "";

        // Создаем массив, включающий выбранные значения из предыдущих SELECT
        let selectedValues = selectArray.map((sel) => sel.value);

        // Добавляем опции из предыдущего SELECT, исключая уже выбранные опции
        for (let option of select.options) {
            if (!selectedValues.includes(option.value)) {
                let newOption = document.createElement("option");
                newOption.text = option.text;
                newOption.value = option.value;
                nextSelect.add(newOption);
            }
        }

        // Устанавливаем выбранное значение, если оно осталось в списке
        if (nextSelect.querySelector(`option[value="${selectedValue}"]`)) {
            nextSelect.value = selectedValue;
        } else {
            nextSelect.selectedIndex = 0;
            nextSelect.disabled = true;
        }
    });
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
    setSortSelects(data, dataForm);
});
