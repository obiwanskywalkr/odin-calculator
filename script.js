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
const percent = document.getElementById('percent')
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
allClear.addEventListener('click', () => {
    currentValue = [];
    storedValue = currentValue;
    storedOperator = [];
    display.textContent = '0';
});
clear.addEventListener('click', () => {
    currentValue = [];
    display.textContent = '0';
});
percent.addEventListener('click', () => {
    currentValue = (currentValue.join('')) / 100;
    display.textContent = currentValue;
});

function operate(currentOperator, a, b) {
    (typeof(storedValue) == 'object') ?
        a = parseInt(storedValue.join('')) :
        a = storedValue;

    b = parseInt(currentValue.join(''));

    if (storedOperator[0] === 'add') {
        sum = operator.add(a, b);
        displaySum();
        storedOperator = [];
    } else if (storedOperator[0] === 'subtract') {
        sum = operator.subtract(a, b);
        displaySum();
        storedOperator = [];
    } else if (storedOperator[0] === 'multiply') {
        sum = operator.multiply(a, b);
        displaySum();
        storedOperator = [];
    } else if (storedOperator[0] === 'divide') {
        sum = operator.divide(a, b);
        displaySum();
        storedOperator = [];
    }
}

function displaySum() {
    storedValue = sum;
    if (storedValue > 999999) {
        display.textContent = storedValue.toExponential(2);
    } else {
        display.textContent = storedValue;
    }
}