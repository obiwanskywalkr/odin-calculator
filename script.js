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
const percent = document.getElementById('percent');
const decimal = document.querySelector('.decimal')
let currentValue = [];
let storedValue = currentValue;
let storedOperator = [];
let sum;

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        currentValue.push(e.currentTarget.textContent);
        (currentValue.length >= 7) ?
            display.textContent = parseInt(currentValue.join('')).toExponential(2) :
            display.textContent = currentValue.join('');
    });
});

decimal.addEventListener('click', (e) => {
    const hasDecimal = currentValue.some((i) => i == '.');
    if (hasDecimal) {
        return
    } else {
    currentValue.push(e.currentTarget.textContent)
    display.textContent = currentValue.join('');
    }
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
    clearAll();
});

clear.addEventListener('click', () => {
    clearCurrentValue();
});

percent.addEventListener('click', () => {
    convertPercentage();
});

window.addEventListener('keydown', (e) => {
    if (e.key >=0 || e.key <= 9) {
        currentValue.push(e.key);
        (currentValue.length >= 7) ?
        display.textContent = parseInt(currentValue.join('')).toExponential(2) :
        display.textContent = currentValue.join('');
    } else if (e.key == '.') {
        const hasDecimal = currentValue.some((i) => i == '.');
        if (hasDecimal) {
            return
        } else {
        currentValue.push(e.key)
        display.textContent = currentValue.join('');
        }
    } else if (e.key == '=' || e.key == 'Enter') {
        operate();
    } else if (e.key == 'Backspace') {
        clearCurrentValue();
    } else if (e.key == 'Delete') {
        clearAll();
    } else if (e.key == '%') {
        convertPercentage();
    } else if (e.key == '/') {
        storedOperator.push('divide');
        currentValue = [];
    } else if (e.key == '*' || e.key == 'x') {
        storedOperator.push('multiply');
        currentValue = [];
    } else if (e.key == '-') {
        storedOperator.push('subtract');
        currentValue = [];
    } else if (e.key == '+') {
        storedOperator.push('add');
        currentValue = [];
    }
});

function operate(currentOperator, a, b) {
    if (storedValue.length == 0 || currentValue.length == 0) {
        currentValue = [];
        return display.textContent = 'ERROR';
    }

    (typeof(storedValue) == 'object') ?
        a = parseFloat(storedValue.join('')) :
        a = storedValue;
    b = parseFloat(currentValue.join(''));

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
        if (b == 0) {
            return display.textContent = '😉'
        }
        sum = operator.divide(a, b);
        displaySum();
        storedOperator = [];
    }
}

function displaySum() {
    storedValue = sum;
    if (storedValue > 9999999) {
        display.textContent = storedValue.toExponential(2);
    } else if ((storedValue % 1) != 0) {
        display.textContent = storedValue.toFixed(2);;
    } else {
        display.textContent = storedValue;
    }
}

function clearCurrentValue() {
    currentValue.pop();
    display.textContent = currentValue.join('');
    if (currentValue.length === 0) {
        display.textContent = '0';
    }
}

function clearAll() {
    currentValue = [];
    storedValue = currentValue;
    storedOperator = [];
    display.textContent = '0';
}

function convertPercentage() {
    currentValue = (currentValue.join('')) / 100;
    display.textContent = currentValue;
}