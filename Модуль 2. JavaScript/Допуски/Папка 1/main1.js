
function changePage(id) {
    let element = document.getElementById(id);

    // Потомки
    let htmlCollection = element.getElementsByTagName("*");

    var arr = [...htmlCollection];

    arr = arr.filter(function (item) {
        return ["DIV", "UL", "OL"].indexOf(item.nodeName) != -1;
    });

    arr = arr.sort().reverse();

    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
        let childrens = arr[i].children;
        let newChildren;

        if (childrens.length < 3) {
            if (childrens.length === 0) {
                newChildren = document.createElement("P");
                newChildren.innerHTML = "Новый элемент!";
                // Добавляем три новых элемента
                for (let j = 0; j < 3; j++) {
                    arr[i].appendChild(newChildren.cloneNode(true));
                }
            } else {
                newChildren = childrens[0].cloneNode(true);
                // Добавляем недостающие копии первого ребенка до трех
                let c = childrens.length;
                for (let j = c; j < 3; j++) {
                    arr[i].appendChild(newChildren.cloneNode(true));
                }
            }
        }
    }
}


changePage("test")