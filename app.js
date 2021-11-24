// calculator project built by Mark Akom Ntow


const calDisplay = document.querySelector('.cal-display');
const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');
const equalSign = document.querySelector('.equal-btn');
const clearBtn = document.querySelector('.clear-btn');
const dotBtn = document.querySelector('.dot');
const deleteBtn = document.querySelector('.delete');


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
    let total = 0;
    switch (operator) {
        case '+':
            total = add(num1, num2);
            break;
        case '-':
            total = subtract(num1, num2);
            break;
        case '*':
            total = multiply(num1, num2);         
            break
        case '/':
            total = divide(num1, num2);    
            break;
        default:
            console.log('Invalid operation');
            break;
    }

    if (total % 1 === 0) {
        return total;
    } else {
        return total.toFixed(2);
    }
}

function getDigits(numValue) { // sets the first and second digits for the maths operation
    if (isSginSet) {
        secondDigits += numValue;
        calDisplay.textContent = `${firstDigits} ${operatorSign} ${secondDigits}`;
        return;
    } 
    firstDigits += numValue;
    calDisplay.textContent = `${firstDigits}`;
}

function setSign(signValue) { // set the operator
    operatorSign = signValue;
    isSginSet = true;
}

function addDot() {
    if (isSginSet) {
        if (secondDigits.indexOf('.') < 0) {
            secondDigits += '.';
            calDisplay.textContent += '.'
        }
        return;
    }
    if(firstDigits.indexOf('.') < 0) {
        firstDigits += '.'
        calDisplay.textContent += '.';
    }

}

function deleteInput() {
    if (secondDigits) {
        secondDigits = secondDigits.slice(0, secondDigits.length - 1);
        calDisplay.textContent = `${firstDigits} ${operatorSign} ${secondDigits}`;
    } else if(operatorSign) {
        operatorSign = '';
        isSginSet = false;
        calDisplay.textContent = `${firstDigits}`;
    } else {
        firstDigits = firstDigits.slice(0, firstDigits.length - 1);
        calDisplay.textContent = `${firstDigits}`;

        if (firstDigits === '') {
            calDisplay.textContent = '0';
        }
    }
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
        getDigits(btnValue);
    }   
});

operators.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        if (firstDigits) {
            let btnValue = e.target.textContent;
            calDisplay.textContent = `${firstDigits} ${btnValue}`;
    
            if (firstDigits && secondDigits) {
                total = operate(operatorSign, firstDigits, secondDigits);
                firstDigits = total;
                secondDigits = '';
                calDisplay.textContent = `${firstDigits} ${btnValue}`;
            }
    
            setSign(btnValue);
        }
    }   
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

dotBtn.addEventListener('click', (e) => {
    addDot()
});

deleteBtn.addEventListener('click', (e) => {
    deleteInput();
})
