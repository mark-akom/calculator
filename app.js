// calculator project built by Mark Akom Ntow


const calDisplay = document.querySelector('.cal-display');
const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');
const equalSign = document.querySelector('.equal-btn');
const clearBtn = document.querySelector('.clear-btn');
const dotNegativePlus = document.querySelector('.dot-negative-plus');


let firstDigits = '';
let secondDigits = '';
let isSginSet = false;
let total = 0;
let operatorSign = '';


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num1 === 0 || num2 === 0) {
        return 'Error...';
    }
    return num1 / num2;
}

function operate(operator, num1, num2) { // performs the basic maths operations
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);         
        case '/':
            return divide(num1, num2);    
        default:
            console.log('Invalid operation');
            break;
    }
}

function getDigits(numValue) { // sets the first and second digits for the maths operation
    if (isSginSet) {
        secondDigits += numValue;
        return;
    } 
    firstDigits += numValue;
    return;
}

function setSign(signValue) { // set the operator
    operatorSign = signValue;
    isSginSet = true;
}

function clearAll() { // resests the values
    isSginSet = false;
    firstDigits = '';
    secondDigits = '';
    operatorSign = '';
    total = 0;
}

numbers.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let btnValue = e.target.textContent;

        if (!firstDigits) {
            calDisplay.textContent = '';
        }

        calDisplay.textContent += btnValue;
        getDigits(btnValue);
    }   
    return;
});

operators.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let btnValue = e.target.textContent;
        calDisplay.textContent = firstDigits + btnValue;;

        if (firstDigits && secondDigits) {
            total = operate(operatorSign, firstDigits, secondDigits);
            firstDigits = total;
            secondDigits = '';
            calDisplay.textContent = firstDigits + btnValue;
        }

        setSign(btnValue);
    }   
    return; 
});

equalSign.addEventListener('click', (e) => {

    if (operatorSign && firstDigits && secondDigits) {
        total = operate(operatorSign, firstDigits, secondDigits)
        calDisplay.textContent = total;
        clearAll();
    } 
});

clearBtn.addEventListener('click', (e) => {
    clearAll();
    calDisplay.textContent = '0';
});
