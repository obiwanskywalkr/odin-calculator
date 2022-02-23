const operator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
}
const display = document.getElementById('display');
const numbers = document.querySelectorAll('.numberButton');
const operators = document.querySelectorAll('.operatorButton');
const equals = document.getElementById('runOperation');
const allClear = document.getElementById('allClear');
const clear = document.getElementById('clear');
let currentValue = [];
let storedValue = currentValue;
let storedOperator = [];
let sum;

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        currentValue.push(e.currentTarget.textContent);
        if (currentValue.length >= 7) {
            display.textContent = parseInt(currentValue.join('')).toExponential(2);
        } else {
            display.textContent = currentValue.join('');
        }
    });
});
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        storedOperator.push(e.currentTarget.value);
        currentValue = [];
    });
});
equals.addEventListener('click', () => {
    operate();
});

function operate(currentOperator, a, b) {
    if ((typeof(storedValue) == 'object')) {
        a = parseInt(storedValue.join(''));
    } else {
        a = storedValue;
    }
    b = parseInt(currentValue.join(''));
    if (storedOperator[0] === 'add') {
        sum = operator.add(a, b);
        storedValue = sum;
        storedOperator = [];
        display.textContent = storedValue;
    } else if (storedOperator[0] === 'subtract') {
        sum = operator.subtract(a, b);
        storedValue = sum;
        storedOperator = [];
        display.textContent = storedValue;
    } else if (storedOperator[0] === 'multiply') {
        sum = operator.multiply(a, b);
        storedValue = sum;
        storedOperator = [];
        display.textContent = storedValue;
    } else if (storedOperator[0] === 'divide') {
        sum = operator.divide(a, b);
        storedValue = sum;
        storedOperator = [];
        display.textContent = storedValue;
    }
}

function displaySum(sum) {
    storedValue = sum;
    if (storedValue > 999999) {
        display.textContent = storedValue.toExponential(2);
    } else {
        display.textContent = storedValue;
    }
}