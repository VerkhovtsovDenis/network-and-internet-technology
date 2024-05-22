calculateButton = document.getElementById("calculateButton");

calculateButton.onclick = () => {

    args = [
        "first second eeded thered",
        "1 2 3 eee"
    ];

    let F = (...args) => {

        let answer = 0;
        for (i in args[0]) {
            let inputString = args[0][i];
            let words = inputString.split(" ");

            for (j in words) {
                let word = words[j].split('');
                let a = word.filter(function (symbol) {
                    return symbol === "e";
                });
                answer += (a.length == 3)? 1:0;
            }

        }

        return answer;
    };

    alert(F(args))
};


window.addEventListener('load', () => {
    inputString = "12 eft eefet 1";
});

