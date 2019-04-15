// here go the scripts

let evaluationCache = [];
let lastNumbers = '';
let result = '';

function add () {
	return arguments[0]*1 + arguments[1]*1;
}
function subtract () {
	return arguments[0]*1 - arguments[1]*1;
}
function multiply () {
	return arguments[0]*1 * arguments[1]*1;
}
function divide () {
	return arguments[0]*1 / arguments[1]*1;
}

function operate (operator, a, b) {
    switch (operator) {
        case "+":
            return add (a, b);
        case "-":
            return subtract (a, b);
        case "x":
            return multiply (a, b);
        case "/":
            return divide (a, b);
    }
}

function processInput (char) {
    if (char.match(/[cC]/)) {
        evaluationCache = [];
        lastNumbers = '';
        result = '';
    } else if (char.match(/[0-9]/)) {
        lastNumbers += ''+char;
        result = '';
    } else if (char.match(/[=]/)) {  
        if (lastNumbers !== ''){
            evaluationCache.push(lastNumbers);
        }
        result = Number(evaluate(evaluationCache)).toFixed(2);
        if (isNaN(result) || !isFinite(result)){
            result = "No way :-P";
        }
        evaluationCache = [];
        lastNumbers = '';
    }else if (char.match(/[\+\-\*\x\/]/)) {
        if (lastNumbers !== '') {
            evaluationCache.push(lastNumbers);
            lastNumbers = '';
        }
        if (evaluationCache.length === 0) {
            if (result !== '') {
                evaluationCache.push(result); 
                evaluationCache.push(char);    
            }
        } else {
            if ( evaluationCache[evaluationCache.length-1].match(/[\+\-\*\x\/]/) ) {
                evaluationCache.splice(-1,1);
            }
            evaluationCache.push(char);
        }
        result = '';
    } 
    updateDisplay();
}

function updateDisplay (){
    if (result.length > 11){result = parseInt(result).toString();}
    if (result.length <= 11) {
        document.getElementById("display").innerHTML = (evaluationCache.join('') + lastNumbers + result).slice(-11);
    } else {
        document.getElementById("display").innerHTML = "overfl err";
    }
}

function evaluate (input){
    
    let evaluation = input;
    if (isNaN(evaluation[evaluation.length-1]) ) {
        evaluation.splice(-1,1);
    }


    let operatorIndex;
    let flag = true;
    while (flag) {
        operatorIndex = evaluation.findIndex(item => item === "x" || item === "/");
        if (operatorIndex === -1) {
            flag = false;
        } else {
            let operation = operate ( evaluation[operatorIndex], evaluation[operatorIndex-1], evaluation[operatorIndex+1]);
            evaluation.splice(operatorIndex-1, 3, operation);
        }

    }

    while (evaluation.length > 1) {
        let operation = operate ( evaluation[1], evaluation[0], evaluation[2]);
        evaluation.splice(0, 3, operation);
    }
    return evaluation;
}

const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        processInput(button.innerHTML);
    });
});


let opsi = ["4", "/", "2", "x", "2", "+", "4", "/", "2", "x", "2"];
//  console.log(opsi);
console.log(evaluate(opsi));
