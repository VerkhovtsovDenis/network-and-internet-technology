const selectElement = document.getElementById("inputType");
const selector = document.getElementById("selectCharacteristics");

const calculateButton = document.getElementById("calculateButton");
const clearButton = document.getElementById("clearButton");

const ErrorMesseges = {
    empty: "Ошибка: поле пусто.",
    negative: "Ошибка: введено отрицательное число.",
    calculation:
        "Ошибка: введены недействительные данные, расчёт невозможно произвести.",
    degree: "Ошибка: число нельзя трактовать как градусы",
    parse: "Ошибка: число нельзя преобразовать в тип с плавающей точкой",
};

class HTMLItem {
    constructor(input, span) {
        this.input = input;
        this.span = span;
    }

    set_null() {
        this.span.textContent = "";
        this.input.value = "";
    }
}

class HTMLParent {
    constructor(div, components) {
        this.div = div;
        this.data = components;
    }

    set_null() {
        for (let i = 0; i < this.data.length; i++) this.data[i].set_null();
    }

    getValue() {
        let result = [];
        for (let i = 0; i < this.data.length; i++)
            result.push(this.data[i].input.value);
        return result;
    }
}

class SideParent extends HTMLParent {
    constructor(div, a, b, side) {
        super(div, [a, b, side]);

        this.a = a;
        this.b = b;
        this.side = side;
    }
}

class AngleParent extends HTMLParent {
    constructor(div, a, b, angle) {
        super(div, [a, b, angle]);
        this.a = a;
        this.b = b;
        this.angle = angle;
    }
}

const side_component = new SideParent(
    document.getElementById("inputs-1"),
    new HTMLItem(
        document.getElementById("1-base1"),
        document.getElementById("error-1-base1")
    ),
    new HTMLItem(
        document.getElementById("1-base2"),
        document.getElementById("error-1-base2")
    ),
    new HTMLItem(
        document.getElementById("side"),
        document.getElementById("error-side")
    )
);

const angle_component = new AngleParent(
    document.getElementById("inputs-2"),
    new HTMLItem(
        document.getElementById("2-base1"),
        document.getElementById("error-2-base1")
    ),
    new HTMLItem(
        document.getElementById("2-base2"),
        document.getElementById("error-2-base2")
    ),
    new HTMLItem(
        document.getElementById("angle"),
        document.getElementById("error-angle")
    )
);

class Changer {
    static isFirstActive = true;
    static SideParent = side_component;
    static AngleParent = angle_component;

    static change() {
        if (this.isFirstActive) {
            this.SideParent.div.style.display = "none";
            this.AngleParent.div.style.display = "grid";

        } else {
            this.SideParent.div.style.display = "grid";
            this.AngleParent.div.style.display = "none";
        }
        this.isFirstActive = !this.isFirstActive;
    }
    static get_isFirstActive() {
        return this.isFirstActive;
    }
}

class Checker {
    static check(number) {
        if (number.length == 0) return ErrorMesseges.empty;
        if (number < 0) return ErrorMesseges.negative;
        if (!parseFloat(number)) return ErrorMesseges.parse;
        return false;
    }
}

class CalculationManager {
    static height_by_side = (a, b, side) => {
        return Math.sqrt(side ** 2 - (a - b) ** 2);
    };

    static diagonalsAngle_by_side = (a, b, side) => {
        return side;
    };

    static diagonals_by_side = (a, b, side) => {
        return [side, side];
    };

    static height_by_angle = (a, b, angle) => {
        return Math.sqrt(angle ** 2 - (a - b) ** 2);
    };

    static diagonalsAngle_by_angle = (a, b, angle) => {
        return angle;
    };

    static diagonals_by_angle = (a, b, angle) => {
        return [angle, angle];
    };

    static calculate_by_side(values) {
        let a = 0,
            b = 0,
            side = 0;
        [a, b, side] = side_component.getValue();

        let error_a = Checker.check(a);
        let error_b = Checker.check(b);
        let error_side = Checker.check(side);

        Error.raise(error_a, side_component.a.span);
        Error.raise(error_b, side_component.b.span);
        Error.raise(error_side, side_component.side.span);

        if (error_a | error_b | error_side) {
            alert("Критическая ошибка");
            return 0;
        }

        a = parseFloat(a);
        b = parseFloat(b);
        side = parseFloat(side);

        for (let i = 0; i < values.length; i++) {
            let func = eval(`CalculationManager.${values[i]}_by_side`);
            let res = func(a, b, side);

            let error = Checker.check(res);
            if (error) {
                alert(error);
                return;
            }

            alert(`${values[i]}: ${res}`);
        }
    }

    static calculate_by_angle(values) {
        let a = 0,
            b = 0,
            angle = 0;
        [a, b, angle] = angle_component.getValue();

        let error_a = Checker.check(a);
        let error_b = Checker.check(b);
        let error_angle = Checker.check(angle);

        Error.raise(error_a, angle_component.a.span);
        Error.raise(error_b, angle_component.b.span);
        Error.raise(error_angle, angle_component.angle.span);

        if (error_a | error_b | error_angle) {
            alert("Критическая ошибка");
            return 0;
        }

        a = parseFloat(a);
        b = parseFloat(b);
        angle = parseFloat(angle);

        for (let i = 0; i < values.length; i++) {
            let func = eval(`CalculationManager.${values[i]}_by_side`);
            let res = func(a, b, angle);

            let error = Checker.check(res);
            if (error) {
                alert(error);
                return;
            }

            alert(`${values[i]}: ${res}`);
        }
    }
}

class Error {
    static raise(message, object) {
        object.textContent = message ? message : "";
    }
}

selectElement.addEventListener("change", (event) => {
    Changer.change();
});

calculateButton.onclick = () => {
    let values = getSelectValues(selector);
    return Changer.get_isFirstActive()
        ? CalculationManager.calculate_by_side(values)
        : CalculationManager.calculate_by_angle(values);
};

clearButton.onclick = () => {
    side_component.set_null();
    angle_component.set_null();
};

function contains(arr, elem) {
    return arr.indexOf(elem) != -1;
}

let round = (number) => {
    return Math.round(number * 100) / 100;
};

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}
