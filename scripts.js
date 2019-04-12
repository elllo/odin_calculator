// here go the scripts

function add () {
	return arguments[0] + arguments[1];
}

function subtract () {
	return arguments[0] - arguments[1];
}

function multiply () {
	return arguments[0].reduce((a,b) => a*b, 1);
}

function divide () {
	return arguments[0].reduce((a,b) => a/b, 1);
}

/* function sum () {
	return arguments[0].reduce((a,b) => a+b, 0);
}

function power() {
	return arguments[0]**arguments[1];
}

function factorial() {
	let a = arguments[0];
	if (a === 0) return 1;
	let fac = 1;
	for (let i = a ; i > 0 ; i--){
		fac *= i;
	}
	return fac;
} */

function operate (operator, a, b) {
    switch (operator) {
        case "+":
            return add (a, b);
        case "-":
            return subtract (a, b);
        case "*":
            return multiply ([a, b]);
        case "/":
            return divide ([a, b]);
    }
}

let displayString = "";



function appendDisplay (digit) {
    displayString += ""+digit;
    updateDisplay();
    return displayString;
}

function updateDisplay (){
    document.getElementById("display").innerHTML = displayString;
}

const numberButtons = Array.from(document.querySelectorAll(".number"));
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
      appendDisplay(numberButton.innerHTML);
    });
  });

const opButtons = Array.from(document.querySelectorAll(".operation"));
opButtons.forEach((opButton) => {
    opButton.addEventListener('click', () => {
        if ( isNaN(displayString[displayString.length-1] )) {
            displayString[displayString.length-1] = opButton.innerHTML;
        } else {
            appendDisplay(opButton.innerHTML);
        }
    });
  });

  const clearButton = document.querySelector("#clear");
  clearButton.addEventListener('click', () => {
    displayString = '';
    updateDisplay();
});


console.log(displayString);
console.log(displayString);
console.log(numberButtons);
