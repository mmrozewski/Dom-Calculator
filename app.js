

let buttons = document.getElementsByTagName("span");
let screen = document.getElementById("screen");
let operators = document.getElementsByClassName("operator");
let equals = document.getElementById("equals");
let operatorCount = 0;

let errorStatus = false;


for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].innerText.match(/(\d+)/)) {
        buttons[i].addEventListener("click", () => {
            if (errorStatus == false) {
                let symbol = document.createTextNode(buttons[i].innerText)
                screen.appendChild(symbol)
            }
        })
    }
};

for (let i = 1; i < operators.length - 1; i++) {
    operators[i].addEventListener("click", () => {
        if (errorStatus == false) {
            let symbol = document.createTextNode(operators[i].innerText)
            screen.appendChild(symbol)
        }
    })
}


buttons[0].addEventListener("click", () => {
    screen.innerText = "";
    errorStatus = false;
});

document.addEventListener("keydown", () => {
    let keyCode = event.keyCode;
    let keyChar = String.fromCharCode(keyCode);
    if (keyCode == 192) {
        screen.innerText = "";
        errorStatus = false;
    }
    if (errorStatus == false) {
        if (keyCode >= 48 && keyCode <= 57) {
            let symbol = document.createTextNode(keyChar)
            screen.appendChild(symbol);
        }
        if (keyCode == 187) {
            let symbol = document.createTextNode("+")
            screen.appendChild(symbol);
        }
        if (keyCode == 189) {
            let symbol = document.createTextNode("-")
            screen.appendChild(symbol);
        }
        if (keyCode == 191) {
            let symbol = document.createTextNode("÷")
            screen.appendChild(symbol);
        }
        if (keyCode == 88) {
            let symbol = document.createTextNode("x")
            screen.appendChild(symbol);
        }
        if (keyCode == 13) {
            equalsButton();
        }
    }
});

const mathFunctions = {"+": function(x, y) {return x + y}, "-": function(x, y) {return x - y},
                       "x": function(x, y) {return x * y}, "÷": function(x, y) {if (y == 0) {errorStatus = true; return screen.innerText = "ERROR"} return x / y}};

function equalsButton() {
    let currentScreen = screen.innerText;
    if (!currentScreen.match(/\d+/g) || !currentScreen[0].match(/\d+/g) 
        || !currentScreen[currentScreen.length - 1].match(/\d+/g)) {
        screen.innerText = "ERROR";
        errorStatus = true;
    }
    let onlyNum = currentScreen.match(/\d+/g).map(Number).join("");
    if (currentScreen.length != onlyNum.length + 1 || (currentScreen[0] != onlyNum[0])
        || (currentScreen[currentScreen.length - 1] != onlyNum[onlyNum.length - 1])) {
        screen.innerText = "ERROR";
        errorStatus = true;
    }
    let operator = currentScreen.match(/\D/g,'');
    let operands = currentScreen.split(operator);
    operands[0] = parseInt(operands[0]);
    operands[1] = parseInt(operands[1]);
    let calculatedNum = mathFunctions[operator](operands[0], operands[1]);
    screen.innerText = calculatedNum;
}

equals.addEventListener("click", equalsButton);












