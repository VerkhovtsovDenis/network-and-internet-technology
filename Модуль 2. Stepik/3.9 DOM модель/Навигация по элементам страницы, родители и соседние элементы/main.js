let items = {
        'ручка': [67.35, 20],
        'альбом': [160.00, 15]
};

let table = document.body.getElementsByTagName("table")

    let i = 1;
    for(let key in items) {
        let row = table.rows[key];
        row.cells[0].innerHTML = key;

        for (let j = 1; j < 2; j++) {
            row.cells[j].innerHTML =  1;
        }
    ;
}


let elements = document.getElementsByTagName("*")
for(let i = 0; i < elements.length; i++){
    let descedent = elements[i].getElementsByTagName("*");
    if(descedent.length == 3)
        console.log(elements[i]);
}


let elementsOl = document.getElementsByTagName("ol")
for(let i = 0; i < elements.length; i++){
    let childrenOl = elementsOl[i].children;
    for(let j = 0; j < childrenOl.length; j+=2){
        childrenOl[j].visible = false;
    }
}