const display = document.querySelector('.display');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

const clear = () => {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;
};

const updateDisplay = () => {
    display.innerText = `${previousOperand} ${operation || ''} ${currentOperand === '' ? '0' : currentOperand}`;
};

const appendNumber = (number) => {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand += number;
};

const chooseOperation = (op) => {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  updateDisplay();
  display.innerText = `${previousOperand} ${operation}`;
};

const compute = () => {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      if(current==0){
        currentOperand = 'Syntax Error: Division by zero';
        operation = undefined;
        previousOperand = '';
        return;} 
      computation = prev / current;
      break;
    case '%':
        computation = prev % current;
        break;
    default:
      return;
  }
  currentOperand = computation.toString();
  operation = undefined;
  previousOperand = '';
};

const backspace = () => {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
  };

  const inverse = () => {
    if (currentOperand === '') return;
    const num = parseFloat(currentOperand);
    if (num === 0) {
      currentOperand = 'Syntax Error: Division by zero';
      updateDisplay();
      return;
    }
    const result = 1 / num;
    currentOperand = result.toString();
    updateDisplay();
  };

document.addEventListener('click', (event) => {
  const button = event.target;
  if (button.classList.contains('numButton')) {
    appendNumber(button.innerText);
    updateDisplay();
  } else if (button.classList.contains('opButton')) {
    if (button.innerText === '1/x') {
        inverse();
      } else {
        chooseOperation(button.innerText);
      }
  } else if (button.classList.contains('eqButton')) {
    compute();
    updateDisplay();
  } else if (button.classList.contains('clearButton')) {
    clear();
    updateDisplay();
  } else if (button.classList.contains('backspaceButton')) {
    backspace();
  }
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9.]/.test(key)) {
      event.preventDefault();
      appendNumber(key);
      updateDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key==='.' || key==='%') {
      event.preventDefault();
      chooseOperation(key);
    } else if (key === 'Enter') {
      event.preventDefault();
      compute();
      updateDisplay();
    } else if (key === 'Backspace') {
      event.preventDefault();
      backspace();
    }
  });